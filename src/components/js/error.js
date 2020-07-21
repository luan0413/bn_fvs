let infor = '<strong>系统异常，请联系管理员！！！</strong>';
let title = '系统异常';
let alertObj = {
    confirmButtonText: '确定',
    type: 'warning',
    dangerouslyUseHTMLString: true
}
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI);
let vue = new Vue()
export { infor, title, alertObj, vue }