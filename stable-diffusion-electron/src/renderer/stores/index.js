import {defineStore} from "pinia";
import {ref} from 'vue';

export const useChangeTheme = defineStore("changeTheme", () => {
    const isDark = ref(false)

    function change(val) {
        isDark.value = val;
    }

    return {isDark, change}
})
