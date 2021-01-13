/*
 * @Author: your name
 * @Date: 2021-01-10 19:53:48
 * @LastEditTime: 2021-01-13 16:43:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent-2\assets\js\ajaxBase.js
 */
$.ajaxPrefilter(function(options){
    // 处理路径
    options.url='http://api-breakingnews-web.itheima.net'+options.url

   
})