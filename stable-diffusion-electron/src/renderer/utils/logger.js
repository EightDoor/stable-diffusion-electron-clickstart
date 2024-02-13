import log from 'electron-log/renderer';
// 关闭控制台打印
// log.transports.console.level = false
// 有六个日志级别error, warn, info, verbose, debug, silly。默认是silly
export default {
    info(param) {
        log.info(param)
    },
    warn(param) {
        log.warn(param)
    },
    error(param) {
        log.error(param)
    },
    debug(param) {
        log.debug(param)
    },
    verbose(param) {
        log.verbose(param)
    },
    silly(param) {
        log.silly(param)
    }
}
