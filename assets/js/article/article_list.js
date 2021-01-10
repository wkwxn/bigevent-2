/*
 * @Author: your name
 * @Date: 2021-01-08 11:38:45
 * @LastEditTime: 2021-01-10 12:50:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigevent\assets\js\article\article_list.js
 */

$(function () {

    let form = layui.form
    //  定义参数对象
    let pardata = {
        pagenum: 1,  //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '',  //文章分类的 Id
        state: ''   //文章的状态，可选值有：已发布、草稿
        
    }

    // ============================筛选功能============================
    // 给form表单注册submit事件
    $('#form').on('submit', function (e) {
        e.preventDefault()
        // 不要使用serialize，汉字会自动转码
        // let data=$('#form').serialize()
        // console.log(data);

        // console.log($('#classify').val());
        // console.log($('#state').val());
        pardata.cate_id = $('#classify').val()
        pardata.state = $('#state').val()
        getList()

    })

    // 获取下拉框的内容
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            res.data.forEach(function (item) {
                // console.log(item);

                // 遍历数据，创建对象
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo('#classify')
                // 动态创建的option添加到select下拉框中，不会自动的更新下拉框的界面，
                // 需要手动调用以下方法来实现表单的重新渲染
                form.render();//更新全部

            })
        }
    })

    //======================  获取文章列表信息渲染页面 =======================
    getList()
    function getList() {
        $.ajax({
            url: '/my/article/list',
            data: pardata,
            success: function (res) {
                // console.log(res);

                let htmlstr = template('getList', res)
                // console.log(htmlstr);
                // 注意使用html，解析标签
                $('.list').html(htmlstr)
                renderPage(res.total)

            }
        })
    }

    //  定义函数处理时间格式
    template.defaults.imports.formatTime = function (msg) {
        let D = new Date(msg)
        let y = D.getFullYear()
        //注意月份需要 +1
        let m = repZero(D.getMonth() + 1)
        let d = repZero(D.getDate())
        let hh = repZero(D.getHours())
        let mm = repZero(D.getMinutes())
        let ss = repZero(D.getSeconds())
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    // 补零函数
    function repZero(n) {
        return n < 10 ? '0' + n : n
    }

    // ========================== 分页功能 ==========================
    let laypage = layui.laypage;
    function renderPage(msg) {
        //执行一个laypage实例
        laypage.render({
            elem: 'paging', //注意，这里的 test1 是 ID，不用加 # 号
            count: msg, //数据总数，从服务端得到
            limit: pardata.pagesize, //每页显示的条数
            limits: [1, 2, 3, 5, 6, 8, 10], //每页条数的选择项。
            curr: pardata.pagenum, //起始页，默认页1
            layout: ['count', 'prev', 'limit', 'page', 'skip'],
            jump: function (obj, first) {
                //   console.log(obj);
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                pardata.pagesize = obj.limit
                pardata.pagenum = obj.curr

                //注意：首次不执行，不然会出现函数调用函数的死循环
                if (!first) {
                    //do something
                    getList()
                }
            }
        });
    }

    // ========================= 编辑功能 ============================
    $('.list').on('click', '#editBtn', function () {
        // console.log($(this).attr('edit-Index'));
        let id = $(this).attr('edit-Index')
        // console.log(id);
        location.href = '/article/article_edit.html?id=' + id
        
        // console.log(location.search);
        
        // let fd=new FormData(this)
        // console.log(fd);
        // $.ajax({
        //     url:'/my/article/edit',
        // })
    })

    // ========================= 删除功能 ============================
    $('.list').on('click', '#delBtn', function () {
        // console.log($(this).attr('del-Index'));
        // 注意有坑： 这里来必须要用箭头函数，因为函数里面有一个this，箭头函数里面的this没有指向，会向外层查找
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, (index) => {
            //do something
            // 关闭询问窗口
            layer.close(index);
            // console.log(index);
            if ($('#delBtn').length === 1) {
                // if (pardata.pagenum===1) {
                //     pardata.pagenum=1
                // }else{
                //     pardata.pagenum=pardata.pagenum -1 
                // }
                // 使用三元 优化
                pardata.pagenum = pardata.pagenum === 1 ? 1 : pardata.pagenum - 1

            }
            let id = $(this).attr('del-Index')
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log("🚀 ~ file: article_list.js ~ line 134 ~ res", res)

                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    getList()
                }
            })
        });


    })
    
})