const Fs = require('fs')
const http = require("http");
const { MoleculerError } = require("moleculer").Errors;

const dir = "../localData/";

module.exports = {
  name: "healthcheck",
  
  /**
   * Actions
   */
  actions: {
    /**
     * Say a 'Hello'
     *
     * @returns
     */
    async getData() {
      const data = await getDataDirNumber()
      const msBetweenDates = Math.abs(Fs.statSync(dir+data.dataD).birthtime.getTime() - new Date().getTime());
      const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
      console.log("lol");
      if ( data.count != 1 || hoursBetweenDates > 24) {
        throw new MoleculerError("Count Or date is wrong", 500, "ERR_COMPACT", {
          name: data.DataD,
          date: Fs.statSync(dir+DataDirs).birthtime,
          count: data.count,
        });
      }
      return {
        code: 200,
        data: {
          name: data.DataD,
          date: Fs.statSync(dir+DataDirs).birthtime,
          count: data.count,
        }
      };
    }
  },
  started() {
    this.broker.waitForServices(["api"]).then(() => {
        this.broker.call('api.addRoute', { route: 
            {
                path: "/api",
                aliases: {
                "healthcheck":"healthcheck.getData"
                }
            }
        });       
    });
}     
}

let getDataDirNumber = () => {
  return new Promise((resolve) => {
    Fs.readdir(dir, function (err, files) {
      count = 0
      DataDirs = "";
  
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      //listing all files using forEach
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          if (file.includes("Data-")){
            count = count + 1
  
            if (DataDirs == "" || Fs.statSync(dir+DataDirs).birthtime < Fs.statSync(dir+file).birthtime) {
              DataDirs = file;
            }
          }
      });

      data = {
        dataD: DataDirs,
        count: count
      }

      resolve(data);
    });
  })
}