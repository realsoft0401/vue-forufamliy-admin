import { ElNotification } from 'element-plus'

//消息提示
export function notification(title, message, type='success', duration = 1000, dangerouslyUseHTMLString = false, position = 'top-right'){
    ElNotification({
        title: title,
        message: message,
        type: type,
        duration: duration,
        dangerouslyUseHTMLString: dangerouslyUseHTMLString,
        position: position
        
    })
}