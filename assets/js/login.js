/*
 * @Author: your name
 * @Date: 2021-01-03 16:29:23
 * @LastEditTime: 2021-01-05 22:11:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\login.js
 */
$(function(){

    // 点击去注册
    $('#goregister').on('click',function(){
        $('.login').hide()
        $('.register').show()
    })
    // 点击去登录
    $('#gologin').on('click',function(){
        $('.login').show()
        $('.register').hide()
    })


// =========================表单验证=========================
    let form=layui.form;

    // 自定义验证规则
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,

        // 验证注册页面两次密码输入
        // 需要获取注册表单的第二个密码框
        respwd: function(value,item){ //value：表单的值、item：表单的DOM对象
        // console.log(value);
        // console.log(item);
        
        let pwd=  $('.register [name=password]').val();
        //   console.log(pwd);
            if (value !== pwd) {
            // console.log(111);
                 return '密码输入不一致，请重新输入';
            }
        }
    })  

// =========================实现注册功能=========================
let layer = layui.layer;
$('#regisform').on('submit',function(e){
    // 1.阻止默认行为
    // 2.获取data数据
    // 3.发送ajax请求
    // 4.弹出提示信息
    e.preventDefault()
    let data= $(this).serialize()
    // console.log(data);
    $.ajax({
        type:'POST',
        url:'/api/reguser',
        data,
        success:function(res){
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }else{  
                layer.msg('注册成功，即将跳转到登录页面', function(){
                    //do something
                    $('#gologin').click()
                  });                
            }   
        }
    })
  })


// =========================实现登录功能=========================
    $('#loginform').on('submit',function(e){
    // 1.
        e.preventDefault()

        let data=$(this).serialize()
         // console.log(data);
        // 发送ajax请求
        $.ajax({
            type:'POST',
            url:'/api/login',
            data,
            success:function(res){
                // console.log(res);
                if (res.status !==0) {
                    return layer.msg('账号密码错误，请重新输入');
                }
                
                localStorage.setItem('token',res.token)

                layer.msg('登录成功', function(){
                //do something
                
                    location.href='/home/index.html'
                });
            }
        })
    })
})