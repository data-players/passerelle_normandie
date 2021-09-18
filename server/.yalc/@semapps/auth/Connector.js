const jwt = require('jsonwebtoken');
const { MoleculerError } = require('moleculer').Errors;
const passport = require('passport');
const session = require('express-session');
const E = require('moleculer-web').Errors;
const fs = require('fs');

class Connector {
  constructor(passportId, settings) {
    this.passport = passport;
    this.passportId = passportId;

    if (!fs.existsSync(settings.privateKeyPath) || !fs.existsSync(settings.publicKeyPath)) {
      throw new Error('Public or private JWT key not found. Did you generate them ?');
    }

    this.settings = {
      privateKey: fs.readFileSync(settings.privateKeyPath),
      publicKey: fs.readFileSync(settings.publicKeyPath),
      sessionSecret: settings.sessionSecret || 's€m@pps',
      selectProfileData: settings.selectProfileData,
      findOrCreateProfile: settings.findOrCreateProfile,
      redirectUri: settings.redirectUri,
      ...settings
    };
  }
  async verifyToken(token) {
    try {
      return jwt.verify(token, this.settings.publicKey, { algorithms: ['RS256'] });
    } catch (err) {
      return false;
    }
  }
  saveRedirectUrl(req, res, next) {
    // Persist referer on the session to get it back after redirection
    // If the redirectUrl is already in the session, use it as default value
    req.session.redirectUrl =
      req.query.redirectUrl || (req.session && req.session.redirectUrl) || req.headers.referer || '/';
    next();
  }
  async findOrCreateProfile(req, res, next) {
    // Select profile data amongst all the data returned by the connector
    const profileData = this.settings.selectProfileData ? await this.settings.selectProfileData(req.user) : req.user;
    try {
      const { webId, newUser } = await this.settings.findOrCreateProfile(profileData, req.user);
      req.user.webId = webId;
      req.user.newUser = newUser;
      next();
    } catch (e) {
      this.redirectWithError(res, req, e);
    }
  }
  async generateToken(req, res, next) {
    // If token is already provided by the connector, skip this step.
    if (!req.user.token) {
      const profileData = this.settings.selectProfileData ? await this.settings.selectProfileData(req.user) : req.user;
      const payload = { webId: req.user.webId, ...profileData };
      req.user.token = jwt.sign(payload, this.settings.privateKey, { algorithm: 'RS256' });
    }
    next();
  }
  localLogout(req, res, next) {
    req.logout(); // Passport logout
    next();
  }
  globalLogout(req, res, next) {
    // Must be implemented in extended class
    next();
  }
  redirectToFront(req, res, next) {
    // Redirect browser to the redirect URL pushed in session
    let redirectUrl = new URL(req.session.redirectUrl);
    if (req.user) {
      // If a token was stored, add it to the URL so that the client may use it
      if (req.user.token) redirectUrl.searchParams.set('token', req.user.token);
      redirectUrl.searchParams.set('new', req.user.newUser ? 'true' : 'false');
    }
    // Redirect using NodeJS HTTP
    res.writeHead(302, { Location: redirectUrl.toString() });
    res.end();
    next();
  }
  redirectWithError(res, req, error) {
    let redirectUrl = new URL(req.session.redirectUrl);
    redirectUrl.searchParams.set('error', error.message);
    res.writeHead(302, { Location: redirectUrl.toString() });
    res.end();
  }
  login() {
    return async (req, res) => {
      const middlewares = [
        this.saveRedirectUrl.bind(this),
        this.passport.authenticate(this.passportId, {
          session: false
        }),
        this.findOrCreateProfile.bind(this),
        this.generateToken.bind(this),
        this.redirectToFront.bind(this)
      ];

      await this.runMiddlewares(middlewares, req, res);
    };
  }
  signup() {
    // By default, signup and login are the same.
    return this.login();
  }
  logout() {
    return async (req, res) => {
      let middlewares = [
        this.saveRedirectUrl.bind(this),
        this.localLogout.bind(this),
        req.query.global === 'true' ? this.globalLogout.bind(this) : this.redirectToFront.bind(this)
      ];

      await this.runMiddlewares(middlewares, req, res);
    };
  }
  async runMiddlewares(middlewares, req, res) {
    for (const middleware of middlewares) {
      let asyncRes;
      let error = await new Promise(resolve => {
        try {
          asyncRes = middleware(req, res, resolve);
        } catch (e) {
          console.log(e);
          resolve(e);
        }
      });
      if (error) {
        this.redirectWithError(res, req, error);
      }
      await asyncRes;
    }
  }
  async getWebId(ctx) {
    return ctx.meta.tokenPayload.webId;
  }
  getRouteMiddlewares(passport) {
    const sessionMiddleware = session({
      secret: this.settings.sessionSecret,
      maxAge: null
    });

    if (passport) {
      return [sessionMiddleware, this.passport.initialize(), this.passport.session()];
    } else {
      return [sessionMiddleware];
    }
  }
  // See https://moleculer.services/docs/0.13/moleculer-web.html#Authentication
  async authenticate(ctx, route, req, res) {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (token) {
        const payload = await this.verifyToken(token);
        ctx.meta.tokenPayload = payload;
        ctx.meta.webId = (await this.getWebId(ctx)) || 'anon';
        return Promise.resolve(payload);
      } else {
        ctx.meta.webId = 'anon';
        return Promise.resolve(null);
      }
    } catch (err) {
      ctx.meta.webId = 'anon';
      return Promise.reject(err);
    }
  }
  // See https://moleculer.services/docs/0.13/moleculer-web.html#Authorization
  async authorize(ctx, route, req, res) {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (token) {
        ctx.meta.tokenPayload = await this.verifyToken(token);
        ctx.meta.webId = (await this.getWebId(ctx)) || 'anon';
        return Promise.resolve(ctx);
      } else {
        ctx.meta.webId = 'anon';
        return Promise.reject(new E.UnAuthorizedError(E.ERR_NO_TOKEN));
      }
    } catch (err) {
      ctx.meta.webId = 'anon';
      return Promise.reject(new E.UnAuthorizedError(E.ERR_INVALID_TOKEN));
    }
  }
}

module.exports = Connector;
