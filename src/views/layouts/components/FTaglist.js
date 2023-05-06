import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { router } from '~/router';
import { useCookies } from '@vueuse/integrations/useCookies'



export function useTabList() {
    const route = useRoute()
    const activeTab = ref(route.fullPath)
    const cookies = useCookies()
    const tabList = ref([
        {
            title: '系统首页',
            path: "/dashboard/index"
        }
    ])

    //初始化标签导航栏
    function initTabList() {
        var tbs = cookies.get("tabList")
        if (tbs) {
            tabList.value = tbs
        }
    }

    initTabList()

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title, path: to.path
        })
    })
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1

        if (noTab) {
            tabList.value.push(tab)
        }
        cookies.set("tabList", tabList.value)

    }
    const removeTab = (t) => {
        let tabs = tabList.value

        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)
        cookies.set("tabList", tabList.value)
    }

    const changeTab = (t) => {
        activeTab.value = t
        router.push(t)
    }


    const handleClose = (c) => {
        if (c == 'clearAll') {
            activeTab.value = "/dashboard/index"
            tabList.value = [{
                title: '系统首页',
                path: "/dashboard/index"
            }]
        } else if (c == 'clearOther') {
            //过滤只剩首页 和 选中的tab
            tabList.value = tabList.value.filter(tab => tab.path == "/dashboard/index" || tab.path == activeTab.value)
        }
        cookies.set("tabList", tabList.value)
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}