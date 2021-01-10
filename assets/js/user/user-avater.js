/*
 * @Author: your name
 * @Date: 2021-01-06 16:06:34
 * @LastEditTime: 2021-01-08 22:25:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\user\user-avater.js
 */
// ---------------  创建剪裁区 ------------------

// 找到剪裁区的图片 （img#image）
let image = $('#image');
// 设置配置项
let option = {
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
};

// 调用cropper方法，创建剪裁区
image.cropper(option);
// --------------  更换剪裁区的图片 ---------------
// 当文件域的内容改变的时候，更换图片
$('#file').change(function () {
    // console.log(111);
    // 1. 找到选择的图片（文件对象）
    // console.dir(this);
    let fileObj = this.files[0]; // 我们选择的图片的文件对象
    
    // 2. 根据文件对象，生成一个临时的url，用于访问被选择的图片
    let url = URL.createObjectURL(fileObj);
    // console.log(url);
    
    // 3. 更换剪裁区的图片的src属性
    // - 销毁原理的剪裁区
    // - 更换图片
    // - 重新创建剪裁区
    image.cropper('destroy').attr('src', url).cropper(option);
});