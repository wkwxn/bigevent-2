/*
 * @Author: your name
 * @Date: 2021-01-06 00:01:31
 * @LastEditTime: 2021-01-06 19:36:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\user\user.js
 */
// 设置昵称自定义格式
// $('.layui-input').text(res.data.username)
let form=layui.form
form.verify({
    nickname: function(value){ //value：表单的值、item：表单的DOM对象
      // if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      //   return '用户名不能有特殊字符';
      // }
      // if(/(^\_)|(\__)|(\_+$)/.test(value)){
      //   return '用户名首尾不能出现下划线\'_\'';
      // }
      // if(/^\d+\d+\d$/.test(value)){
      //   return '用户名不能全为数字';
      // }
      if (value.length>6) {
          return '请输入1~6个字符'
      }
    }
    })
// ========================获取用户信息========================
$.ajax({
    url:'/my/userinfo',
    success:function(res){
        // console.log(res);
        //给表单赋值
        // form.val("formTest", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        form.val("form", res.data);
  
    },
});