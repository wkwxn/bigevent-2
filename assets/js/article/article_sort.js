/*
 * @Author: your name
 * @Date: 2021-01-06 19:55:43
 * @LastEditTime: 2021-01-08 11:50:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\article\article_sort.js
 */
let layer=layui.layer
let form=layui.form

let index
getSort()
// 发送请求渲染页面
 function getSort(){
     $.ajax({
         url:'/my/article/cates',
         success:function(res){
             console.log(res);
            //  将模板 + 数据 进行结合得到需要展示的页面结构
            let htmlstr=template('getmsg',res)
            // 渲染到页面中
            $('.list').html(htmlstr)
         }
     })
 }

//  ====================添加类别====================

$('#addBtn').on('click',function(e){
    // e.preventDefault()
     index = layer.open({
        type:1,
        title:'添加文章分类',
        area:'500px',
        // 内容获取
        content: $('#addForm').html(),
        // btn:['yes', 'no']
      });

})

 //   点击确定添加信息
    // 1.给foem注册submit事件
    // 2.获取表单信息
    // 3.带数据发送ajax请求
    // 4.调用getSort()函数渲染页面
    // 5.关闭弹窗

// 因为form不是页面本来就存在的，所以需要事件委托
$('body').on('submit','#form',function(e){
    e.preventDefault()

    // 2.
    let data=$(this).serialize()
    // console.log(data);

    // 3.
    $.ajax({
        type:'POST',
        url:'/my/article/addcates',
        data,
        success:function (res) {
            // console.log(res);

            if (res.status !==0) {
                return layer.msg('添加失败！')
            }
            layer.msg('添加成功！')
            layer.close(index)
            getSort()
        }
    })

})

//  ====================编辑功能====================

$('body').on('click','#editBtn',function () {
    // 触发点击事件，调出弹出框
    index = layer.open({
        type:1,
        title:'修改文章分类',
        area:'500px',
        // 内容获取
        content: $('#editForm').html(),
        // btn:['yes', 'no']
      });
    //获取id 
      let editindex=$(this).attr('edit-Index')
        // console.log(editindex);

    //   发送ajax请求
    $.ajax({
        url:'/my/article/cates/'+editindex,
        success:function (res) {
            // console.log(res);

            // 给表单赋值
            //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
            form.val("editform",res.data);
        }
    })

// 点击确定求改信息
// 注册submit事件
$('body').on('submit','#editForm',function (e) {
    e.preventDefault()
    // 获取表单信息
    let data=$(this).serialize()
    // console.log(data);

    // 
    $.ajax({
        type:'POST',
        url:'/my/article/updatecate',
        data,
        success:function (res) {
            // console.log(res);
            if (res.status !==0) {
                return layer.msg('修改失败！')
            }
            layer.close(index)
            layer.msg('修改成功！')
            getSort()
        }
    })
    
  })
})

// =========================删除按钮=====================
$('body').on('click','#delBtn',function () {

    let id=$(this).attr('del-Index')
    // console.log(id);
    
    $.ajax({
        url:'/my/article/deletecate/'+id,
        success:function (res) {
            // console.log(res);
            if (res.status !==0) {
                return layer.msg('删除失败！')
            }
            layer.msg('删除成功！')
            getSort()
        }
    })
    
})
