/*
 * @Author: your name
 * @Date: 2021-01-10 19:14:40
 * @LastEditTime: 2021-01-13 17:18:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent-2\assets\js\login.js
 */

let form=layui.form
let layer=layui.layer
//=========================点击切换登录/注册=========================
$('#logBtn').click(function(){
    // console.log(111);
    $('.register').show()
    $('.login').hide()
    // 原生的
    // document.querySelector('.register').style.display='block'
    // document.querySelector('.login').style.display='none'
})
$('#regBtn').click(function(){
    $('.register').hide()
    $('.login').show()
})

//=========================登录功能=========================
$('#loginform').on('submit',function(e){
    e.preventDefault()
    // console.log(111);
    let data= $(this).serialize()
 console.log(data);

    $.ajax({
        type:'POST',
        url:'/api/login',
        data,
        success:function(res){
            console.log(res);
            if (res.status !==0) {
                return layer.msg('账号密码错误,请重新输入！')
            }
            layer.msg('登录成功！',function(){
                location.href='/home/index.html'
            })
        }
    })
})

//=========================注册功能=========================
$('#register').on('submit',function(e){
    e.preventDefault()
    let data=$(this).serialize()
    // console.log(data);

    // 判单
    $.ajax({
        url:'/api/reguser',
        type:'POST',
        data,
        success:function(res){
            console.log(res);
            if (res.status !==0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message+'稍后自动跳转到登录页面',function(){
                $('.register').hide()
                $('.login').show()
            })
        }
    })

})


//=========================表单验证=========================

 // 注册页面表单验证规则

 form.verify({
     username: function(value, item){ //value：表单的值、item：表单的DOM对象
       if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
         return '用户名不能有特殊字符';
       }
       if(/(^\_)|(\__)|(\_+$)/.test(value)){
         return '用户名首尾不能出现下划线\'_\'';
       }
       if(/^\d+\d+\d$/.test(value)){
         return '用户名不能全为数字';
       }
     },

    //  判断两次密码输入是否一致
    verify:function(value,item){
        // let one=$('#one').val()
        // let two=$('#two').val()
        // console.log(one,two);
        if ( $('#one').val() !== $('#two').val()) {
            return '两次密码输入不一致！'
        }
    },

     //我们既支持上述函数式的方式，也支持下述数组的形式
     //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
     pass: [
       /^[\S]{6,12}$/
       ,'密码必须6到12位，且不能出现空格'
     ] 
   });  