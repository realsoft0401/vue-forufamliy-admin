import { ElMessage, ElMessageBox } from 'element-plus'

export function showMessageBox(title="", content="提示内容", type="warning"){
   return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type,
        }
      )
}

export function showPrompt(tip,value = ''){
  return   ElMessageBox.prompt(tip, '请输入', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
  })
}