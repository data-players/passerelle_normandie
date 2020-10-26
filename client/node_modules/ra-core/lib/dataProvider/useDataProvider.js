"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var DataProviderContext_1 = __importDefault(require("./DataProviderContext"));
var validateResponseFormat_1 = __importDefault(require("./validateResponseFormat"));
var undoableEventEmitter_1 = __importDefault(require("./undoableEventEmitter"));
var getFetchType_1 = __importDefault(require("./getFetchType"));
var defaultDataProvider_1 = __importDefault(require("./defaultDataProvider"));
var replyWithCache_1 = require("./replyWithCache");
var undoActions_1 = require("../actions/undoActions");
var fetchActions_1 = require("../actions/fetchActions");
var notificationActions_1 = require("../actions/notificationActions");
var uiActions_1 = require("../actions/uiActions");
var useLogoutIfAccessDenied_1 = __importDefault(require("../auth/useLogoutIfAccessDenied"));
var getDataProviderCallArguments_1 = require("./getDataProviderCallArguments");
// List of dataProvider calls emitted while in optimistic mode.
// These calls get replayed once the dataProvider exits optimistic mode
var optimisticCalls = [];
var undoableOptimisticCalls = [];
/**
 * Hook for getting a dataProvider
 *
 * Gets a dataProvider object, which behaves just like the real dataProvider
 * (same methods returning a Promise). But it's actually a Proxy object, which
 * dispatches Redux actions along the process. The benefit is that react-admin
 * tracks the loading state when using this hook, and stores results in the
 * Redux store for future use.
 *
 * In addition to the 2 usual parameters of the dataProvider methods (resource,
 * payload), the Proxy supports a third parameter for every call. It's an
 * object literal which may contain side effects, or make the action optimistic
 * (with undoable: true).
 *
 * @return dataProvider
 *
 * @example Basic usage
 *
 * import * as React from 'react';
import { useState } from 'react';
 * import { useDataProvider } from 'react-admin';
 *
 * const PostList = () => {
 *      const [posts, setPosts] = useState([])
 *      const dataProvider = useDataProvider();
 *      useEffect(() => {
 *          dataProvider.getList('posts', { filter: { status: 'pending' }})
 *            .then(({ data }) => setPosts(data));
 *      }, [])
 *
 *      return (
 *          <Fragment>
 *              {posts.map((post, key) => <PostDetail post={post} key={key} />)}
 *          </Fragment>
 *     }
 * }
 *
 * @example Handling all states (loading, error, success)
 *
 * import { useState, useEffect } from 'react';
 * import { useDataProvider } from 'react-admin';
 *
 * const UserProfile = ({ userId }) => {
 *     const dataProvider = useDataProvider();
 *     const [user, setUser] = useState();
 *     const [loading, setLoading] = useState(true);
 *     const [error, setError] = useState();
 *     useEffect(() => {
 *         dataProvider.getOne('users', { id: userId })
 *             .then(({ data }) => {
 *                 setUser(data);
 *                 setLoading(false);
 *             })
 *             .catch(error => {
 *                 setError(error);
 *                 setLoading(false);
 *             })
 *     }, []);
 *
 *     if (loading) return <Loading />;
 *     if (error) return <Error />
 *     if (!user) return null;
 *
 *     return (
 *         <ul>
 *             <li>Name: {user.name}</li>
 *             <li>Email: {user.email}</li>
 *         </ul>
 *     )
 * }
 *
 * @example Action customization
 *
 * dataProvider.getOne('users', { id: 123 });
 * // will dispatch the following actions:
 * // - CUSTOM_FETCH
 * // - CUSTOM_FETCH_LOADING
 * // - FETCH_START
 * // - CUSTOM_FETCH_SUCCESS
 * // - FETCH_END
 *
 * dataProvider.getOne('users', { id: 123 }, { action: CRUD_GET_ONE });
 * // will dispatch the following actions:
 * // - CRUD_GET_ONE
 * // - CRUD_GET_ONE_LOADING
 * // - FETCH_START
 * // - CRUD_GET_ONE_SUCCESS
 * // - FETCH_END
 */
var useDataProvider = function () {
    var dispatch = react_redux_1.useDispatch();
    var dataProvider = react_1.useContext(DataProviderContext_1.default) || defaultDataProvider_1.default;
    var isOptimistic = react_redux_1.useSelector(function (state) { return state.admin.ui.optimistic; });
    var store = react_redux_1.useStore();
    var logoutIfAccessDenied = useLogoutIfAccessDenied_1.default();
    var dataProviderProxy = react_1.useMemo(function () {
        return new Proxy(dataProvider, {
            get: function (target, name) {
                if (typeof name === 'symbol') {
                    return;
                }
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var _a = getDataProviderCallArguments_1.getDataProviderCallArguments(args), resource = _a.resource, payload = _a.payload, allArguments = _a.allArguments, options = _a.options;
                    var type = name.toString();
                    var _b = options || {}, _c = _b.action, action = _c === void 0 ? 'CUSTOM_FETCH' : _c, _d = _b.undoable, undoable = _d === void 0 ? false : _d, _e = _b.onSuccess, onSuccess = _e === void 0 ? undefined : _e, _f = _b.onFailure, onFailure = _f === void 0 ? undefined : _f, rest = __rest(_b, ["action", "undoable", "onSuccess", "onFailure"]);
                    if (typeof dataProvider[type] !== 'function') {
                        throw new Error("Unknown dataProvider function: " + type);
                    }
                    if (onSuccess && typeof onSuccess !== 'function') {
                        throw new Error('The onSuccess option must be a function');
                    }
                    if (onFailure && typeof onFailure !== 'function') {
                        throw new Error('The onFailure option must be a function');
                    }
                    if (undoable && !onSuccess) {
                        throw new Error('You must pass an onSuccess callback calling notify() to use the undoable mode');
                    }
                    var params = {
                        action: action,
                        dataProvider: dataProvider,
                        dispatch: dispatch,
                        logoutIfAccessDenied: logoutIfAccessDenied,
                        onFailure: onFailure,
                        onSuccess: onSuccess,
                        payload: payload,
                        resource: resource,
                        rest: rest,
                        store: store,
                        type: type,
                        allArguments: allArguments,
                        undoable: undoable,
                    };
                    if (isOptimistic) {
                        // in optimistic mode, all fetch calls are stacked, to be
                        // executed once the dataProvider leaves optimistic mode.
                        // In the meantime, the admin uses data from the store.
                        if (undoable) {
                            undoableOptimisticCalls.push(params);
                        }
                        else {
                            optimisticCalls.push(params);
                        }
                        return Promise.resolve();
                    }
                    return doQuery(params);
                };
            },
        });
    }, [dataProvider, dispatch, isOptimistic, logoutIfAccessDenied, store]);
    return dataProviderProxy;
};
var doQuery = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, onFailure = _a.onFailure, dataProvider = _a.dataProvider, dispatch = _a.dispatch, store = _a.store, undoable = _a.undoable, logoutIfAccessDenied = _a.logoutIfAccessDenied, allArguments = _a.allArguments;
    var resourceState = store.getState().admin.resources[resource];
    if (replyWithCache_1.canReplyWithCache(type, payload, resourceState)) {
        return answerWithCache({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            resourceState: resourceState,
            dispatch: dispatch,
        });
    }
    return undoable
        ? performUndoableQuery({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            onFailure: onFailure,
            dataProvider: dataProvider,
            dispatch: dispatch,
            logoutIfAccessDenied: logoutIfAccessDenied,
            allArguments: allArguments,
        })
        : performQuery({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            onFailure: onFailure,
            dataProvider: dataProvider,
            dispatch: dispatch,
            logoutIfAccessDenied: logoutIfAccessDenied,
            allArguments: allArguments,
        });
};
/**
 * In undoable mode, the hook dispatches an optimistic action and executes
 * the success side effects right away. Then it waits for a few seconds to
 * actually call the dataProvider - unless the user dispatches an Undo action.
 *
 * We call that "optimistic" because the hook returns a resolved Promise
 * immediately (although it has an empty value). That only works if the
 * caller reads the result from the Redux store, not from the Promise.
 */
var performUndoableQuery = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, onFailure = _a.onFailure, dataProvider = _a.dataProvider, dispatch = _a.dispatch, logoutIfAccessDenied = _a.logoutIfAccessDenied, allArguments = _a.allArguments;
    dispatch(undoActions_1.startOptimisticMode());
    if (window) {
        window.addEventListener('beforeunload', warnBeforeClosingWindow, {
            capture: true,
        });
    }
    dispatch({
        type: action,
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    dispatch({
        type: action + "_OPTIMISTIC",
        payload: payload,
        meta: {
            resource: resource,
            fetch: getFetchType_1.default(type),
            optimistic: true,
        },
    });
    onSuccess && onSuccess({});
    undoableEventEmitter_1.default.once('end', function (_a) {
        var isUndo = _a.isUndo;
        dispatch(undoActions_1.stopOptimisticMode());
        if (isUndo) {
            dispatch(notificationActions_1.showNotification('ra.notification.canceled'));
            dispatch(uiActions_1.refreshView());
            if (window) {
                window.removeEventListener('beforeunload', warnBeforeClosingWindow, {
                    capture: true,
                });
            }
            return;
        }
        dispatch({
            type: action + "_LOADING",
            payload: payload,
            meta: __assign({ resource: resource }, rest),
        });
        dispatch({ type: fetchActions_1.FETCH_START });
        try {
            dataProvider[type]
                .apply(dataProvider, typeof resource !== 'undefined'
                ? [resource, payload]
                : allArguments)
                .then(function (response) {
                if (process.env.NODE_ENV !== 'production') {
                    validateResponseFormat_1.default(response, type);
                }
                dispatch({
                    type: action + "_SUCCESS",
                    payload: response,
                    requestPayload: payload,
                    meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_END }),
                });
                dispatch({ type: fetchActions_1.FETCH_END });
                if (window) {
                    window.removeEventListener('beforeunload', warnBeforeClosingWindow, {
                        capture: true,
                    });
                }
                replayOptimisticCalls();
            })
                .catch(function (error) {
                if (window) {
                    window.removeEventListener('beforeunload', warnBeforeClosingWindow, {
                        capture: true,
                    });
                }
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                return logoutIfAccessDenied(error).then(function (loggedOut) {
                    if (loggedOut)
                        return;
                    dispatch({
                        type: action + "_FAILURE",
                        error: error.message ? error.message : error,
                        payload: error.body ? error.body : null,
                        requestPayload: payload,
                        meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_ERROR }),
                    });
                    dispatch({ type: fetchActions_1.FETCH_ERROR, error: error });
                    onFailure && onFailure(error);
                    throw error;
                });
            });
        }
        catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(e);
            }
            throw new Error('The dataProvider threw an error. It should return a rejected Promise instead.');
        }
    });
    return Promise.resolve({});
};
// event listener added as window.onbeforeunload when starting optimistic mode, and removed when it ends
var warnBeforeClosingWindow = function (event) {
    event.preventDefault(); // standard
    event.returnValue = ''; // Chrome
    return 'Your latest modifications are not yet sent to the server. Are you sure?'; // Old IE
};
// Replay calls recorded while in optimistic mode
var replayOptimisticCalls = function () { return __awaiter(void 0, void 0, void 0, function () {
    var clone;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(undoableOptimisticCalls.length > 0)) return [3 /*break*/, 2];
                clone = __spreadArrays(undoableOptimisticCalls);
                undoableOptimisticCalls.splice(0, undoableOptimisticCalls.length);
                return [4 /*yield*/, Promise.all(clone.map(function (params) { return Promise.resolve(doQuery.call(null, params)); }))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                clone = __spreadArrays(optimisticCalls);
                optimisticCalls.splice(0, optimisticCalls.length);
                return [4 /*yield*/, Promise.all(clone.map(function (params) { return Promise.resolve(doQuery.call(null, params)); }))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * In normal mode, the hook calls the dataProvider. When a successful response
 * arrives, the hook dispatches a SUCCESS action, executes success side effects
 * and returns the response. If the response is an error, the hook dispatches
 * a FAILURE action, executes failure side effects, and throws an error.
 */
var performQuery = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, onFailure = _a.onFailure, dataProvider = _a.dataProvider, dispatch = _a.dispatch, logoutIfAccessDenied = _a.logoutIfAccessDenied, allArguments = _a.allArguments;
    dispatch({
        type: action,
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    dispatch({
        type: action + "_LOADING",
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    dispatch({ type: fetchActions_1.FETCH_START });
    try {
        return dataProvider[type]
            .apply(dataProvider, typeof resource !== 'undefined'
            ? [resource, payload]
            : allArguments)
            .then(function (response) {
            if (process.env.NODE_ENV !== 'production') {
                validateResponseFormat_1.default(response, type);
            }
            dispatch({
                type: action + "_SUCCESS",
                payload: response,
                requestPayload: payload,
                meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_END }),
            });
            dispatch({ type: fetchActions_1.FETCH_END });
            onSuccess && onSuccess(response);
            return response;
        })
            .catch(function (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
            return logoutIfAccessDenied(error).then(function (loggedOut) {
                if (loggedOut)
                    return;
                dispatch({
                    type: action + "_FAILURE",
                    error: error.message ? error.message : error,
                    payload: error.body ? error.body : null,
                    requestPayload: payload,
                    meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_ERROR }),
                });
                dispatch({ type: fetchActions_1.FETCH_ERROR, error: error });
                onFailure && onFailure(error);
                throw error;
            });
        });
    }
    catch (e) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(e);
        }
        throw new Error('The dataProvider threw an error. It should return a rejected Promise instead.');
    }
};
var answerWithCache = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, resourceState = _a.resourceState, dispatch = _a.dispatch;
    dispatch({
        type: action,
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    var response = replyWithCache_1.getResultFromCache(type, payload, resourceState);
    dispatch({
        type: action + "_SUCCESS",
        payload: response,
        requestPayload: payload,
        meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_END, fromCache: true }),
    });
    onSuccess && onSuccess(response);
    return Promise.resolve(response);
};
exports.default = useDataProvider;
