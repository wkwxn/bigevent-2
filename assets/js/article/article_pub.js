/*
 * @Author: your name
 * @Date: 2021-01-08 21:50:32
 * @LastEditTime: 2021-01-10 11:50:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\article\article_pub.js
 */
$(function () {
    let form = layui.form;
  
  // =============== 获取文章类别数据 ===============
        // 获取下拉框的内容
        $.ajax({
            url:'/my/article/cates',
            success:function (res) {
                // console.log(res);
                res.data.forEach(function (item) {
                    // console.log(item);
                    $(`<option value="${item.Id}">${item.name}</option>`).appendTo('#category')
                    form.render();//更新全部
                })
            }
        })
  
    // =============== 初始化富文本编辑器 ===============
    initEditor();
  
    // =============== 图片裁剪 ===============
    // 1. 初始化图片裁剪器
    let $image = $("#image");
  
    // 2. 裁剪选项
    let options = {
      aspectRatio: 400 / 280,
      preview: ".img-preview",
    };
  
    // 3. 初始化裁剪区域
    $image.cropper(options);
  
    // =============== 选择图片按钮功能 ===============
   $('#chooseBtn').on('click',function () {
       $('#file').click()

   })
   $('#file').on('change',function () {
       let fileObj=this.files[0]
      //  console.log(this.files);
      // ？？？？？？？？？？
    let url = URL.createObjectURL(fileObj);

    // 3. 更换剪裁区的图片的src属性
    // - 销毁原理的剪裁区
    // - 更换图片
    // - 重新创建剪裁区
    $image.cropper('destroy').attr('src', url).cropper(options);

   })
    // ==================== 表单的submit事件 ==================
    let state
    $("#pubBtn").click(function () {
        state = "已发布";
      });
    
      $("#saveBtn").click(function () {
        state = "草稿";
      });
  $('#form').submit(function (e) {
      e.preventDefault()
    // 将裁切的图片转成文件对象
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob((blob) => {

        let fd=new FormData(this)
        

        fd.append('state',state)
        fd.append('cover_img',blob)
        fd.forEach(function (item,val) {
          console.log(item,val);
      })
        pubArt(fd)
        
      })


  })
  function pubArt(msg) {
      $.ajax({
          type:'POST',
          url:'/my/article/add',
          data:msg,
          // 发送fd这个FormData数据的时候，需要有以下两个配置
         contentType: false,
         processData: false,
         success:function (res) {
            //  console.log(res);
             if (res.status !==0) {
                 return layer.msg('发布失败！')
             }
             layer.msg('发布成功！')

             location.href='/article/article_list.html'       
         }
      })   
  }   
});
  