/*
 * @Author: your name
 * @Date: 2021-01-09 20:54:55
 * @LastEditTime: 2021-01-10 16:11:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\article\article_edit.js
 */
// const path= require('path')
let form=layui.form
let str=location.href
// console.log(location.href);
let id=str.slice(str.length-4)
// console.log(id);
// ====================给文章类别下拉框赋值=================
$.ajax({
    url:'/my/article/cates',
    success:function (res) {
        // console.log(res);
        res.data.forEach(function (item) {
            // console.log(1);
            $(`<option value="${item.Id}">${item.name}</option>`).appendTo('#category')
        })
    }
})



// =============== 初始化富文本编辑器 ===============
    initEditor();
  
// ================== 图片裁剪 ==================
    // 1. 初始化图片裁剪器
    let $image = $("#image");
  
    // 2. 裁剪选项
    let options = {
      aspectRatio: 400 / 280,
      preview: ".img-preview",
    };
  
    // 3. 初始化裁剪区域
    $image.cropper(options);

// =================从主页面跳转之后,发送请求,获得数据,赋值给表单======
    $.ajax({
        url: '/my/article/' + id,
        success: function (res) {
            // console.log(res.data);
            //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
            form.val("form", res.data);
          let pic='http://api-breakingnews-web.itheima.net'+ res.data.cover_img
        //   console.log(pic);
          $image.cropper('destroy').attr('src', pic).cropper(options)
        }
    })

// ======================文件域选择图片======================
$('#chooseBtn').click(function () {
    $('#file').click()
})
// 注册 change事件，监听文件域的变化
$('#file').change(function () {
    // files是文件域的内置属性，是一个对象；第一项是我们所选择的文件的所有信息.
    
    let fileObj=this.files[0]
    // console.dir(this); //可以查找到files的信息
    // console.log(fileObj);

    let url = URL.createObjectURL(fileObj);

    // 3. 更换剪裁区的图片的src属性
    // - 销毁原理的剪裁区
    // - 更换图片
    // - 重新创建剪裁区
    $image.cropper('destroy').attr('src', url).cropper(options);


})
// ===========================更新文章信息===========================
let state
    $('#pubBtn').on('click',function () {
        state='已发布'
        // console.log(state);
    })
    $('#saveBtn').click(function () {
        state='草稿'
        // console.log(state);
    })

    $('#form').submit(function (e) {
        e.preventDefault()

        $image
        .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob((blob) => {
        let fd=new FormData(this)
        // console.log(fd); //打印为空，需要遍历fd才能打印
        // 给fd里面追加数据
        fd.append('state',state)
        fd.append('cover_img',blob)
        fd.append('Id',id)
        // fd.forEach(function (item,val) {
        //     console.log(item,val); //val 是键名，要根据接口来定义
        // })
        update(fd)
      })
    })

// ======================发ajax请求进行更改信息==================

function update(msg) {
    $.ajax({
        type:'POST',
        url:'/my/article/edit',
        data:msg,
        contentType:false,
        processData:false,
        success:function (res) {
            console.log(res);
            if (res.status !==0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            location.href='/article/article_list.html'
        }

    })
}