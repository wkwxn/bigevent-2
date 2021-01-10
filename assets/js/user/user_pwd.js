/*
 * @Author: your name
 * @Date: 2021-01-06 13:16:46
 * @LastEditTime: 2021-01-06 14:08:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\user\user_pwd.js
 */
let form=layui.form
let layer=layui.layer
form.verify({
    pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
      // 判断新密码不能与原密码一直
    newPwd: function(value){ //value：表单的值、item：表单的DOM对象
        // console.log(value);
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    let oldpwd=$('[name=oldPwd]').val()
    // console.log(oldpwd);
    if(value===oldpwd){
        return '新密码不能与原密码相同'
    }
        },
  // 判断两次新密码是否一致
  afpwd:function(value){
      let newpwd=$('[name=newPwd]').val()
    //   console.log(newpwd);
      if (value !==newpwd ) {
          return '两次密码输入不一致'
      }
      
  }
});  

// =================
$('#form').submit(function(e){
    e.preventDefault()
// 获取数据
let data=$(this).serialize()
console.log("🚀 ~ file: user_pwd.js ~ line 42 ~ $ ~ data", data)

$.ajax({
    url:'/my/updatepwd',
    type:'POST',
    data,
    success:function(res){
        console.log(res);
        if (res.status !==0) {
            return layer.msg(res.message)
        }
        layer.msg(res.message)
        $('#form')[0].reset()
        
        // 修改密码后，重新登录
    }
  })
})
//  

