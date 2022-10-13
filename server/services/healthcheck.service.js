const Fs = require('fs')
const path = require('path');
const http = require("http");

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
    getData() {
      getDataDirNumber()
      if (DataDirs == "") {
        return "refresh";
      }
      return {
        name: DataDirs,
        date: Fs.statSync(dir+"/"+DataDirs).birthtime,
        count: count,
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

const dir = '../localData'
let count = 0;
let DataDirs = "";

const directoryPath = path.join(dir, '/');

function getDataDirNumber() {
  Fs.readdir(directoryPath, function (err, files) {
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

          if (DataDirs == "" || Fs.statSync(dir+"/"+DataDirs).birthtime < Fs.statSync(dir+"/"+file).birthtime) {
            DataDirs = file;
          }
        }
    });
    return count;
  });
}