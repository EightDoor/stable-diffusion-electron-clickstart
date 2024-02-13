const log = require("electron-log/main")

log.initialize()

// MainLog.prototype.error = function (txt) {
//     log.error(txt)
// }
//
// MainLog.prototype.warn = function (txt) {
//     log.warn(txt)
// }
//
// MainLog.prototype.info = function (txt) {
//     log.info(txt)
// }
//
// MainLog.prototype.verbose = function (txt) {
//     log.verbose(txt)
// }
// MainLog.prototype.debug = function (txt) {
//     log.debug(txt)
// }
// MainLog.prototype.silly = function (txt) {
//     log.silly(txt)
// }

module.exports = log
