//全局性指令
import store from "~/store"
function hasDirectives(val,el=false)
{
    if(!Array.isArray(val)){
        throw new Error(`需要配置权限：例如 v-directives="['getStatisticsLine,GET']"`)
    }
    const hasAuth = val.findIndex(v=>store.state.ruleNames.includes(v)) != -1
    if(el && !hasAuth){
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}

export default{
    install(app){
        app.directive("directives",{
            mounted(el, binding) {
                // binding.value
                // console.log({el, binding});
                hasDirectives(binding.value, el)
            },
        })
    }
}