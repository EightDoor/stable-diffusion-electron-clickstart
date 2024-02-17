import {createI18n} from 'vue-i18n';

function getLangAll() {
    const files = import.meta.globEager("./*.json")
    let modules = {};
    getLangFiles(files, modules)
    return modules
}

/**   
 * 获取所有语言文件
 */
function getLangFiles(files, modules) {
    for (const key in files) {
        let fileName = key.match(/[^\/]*?(?=\.\w+$)/)[0]
        modules[fileName] = files[key].default || files[key]
    }  
}

const locale = localStorage.getItem("lang") || "zh-CN";

const i18n = createI18n({
    legacy: false,
    locale,
    globalInjection: true,
    messages: getLangAll()
})
   
export default i18n
