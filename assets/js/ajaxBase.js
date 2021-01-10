/*
 * @Author: your name
 * @Date: 2021-01-05 10:33:03
 * @LastEditTime: 2021-01-06 16:48:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\ajaxBase.js
 */
$.ajaxPrefilter(function(options){
    // console.log(options);
    options.url= 'http://api-breakingnews-web.itheima.net'+options.url

// 判断 需要身份认证信息的时候 ，地址携带‘/my’的时候
    if (options.url.indexOf('/my') !==-1) {
        options.headers={
            Authorization:localStorage.getItem('token')
        }
    }
    // 限制用户访问权限
    options.complete=function(xhr){
        if (xhr.responseJSON.status===1&&xhr.responseJSON.message==='身份认证失败！') {
            location.href='/home/login.html' 
        }
    }

})