import log from 'electron-log/renderer';
// 关闭控制台打印
// log.transports.console.level = false
// 有六个日志级别error, warn, info, verbose, debug, silly。默认是silly
export default {
    info(param, title) {
        log.info(this._comm(param, title, 'info'))
    },
    warn(param, title) {
        log.warn(this._comm(param, title, 'warn'))
    },
    error(param, title) {
        log.error(this._comm(param, title, 'error'))
    },
    debug(param, title) {
        log.debug(this._comm(param, title, 'debug'))
    },
    verbose(param, title) {
        log.verbose(this._comm(param, title, 'verbose'))
    },
    silly(param, title) {
        log.silly(this._comm(param, title, 'silly'))
    },
    _comm(param, title, type) {
        return {title: title ?? type, data: param}
    }
}
