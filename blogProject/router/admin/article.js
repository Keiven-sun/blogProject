// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    const page = req.query.page;
    // 这个是一个标示，标示是用户管理页面
    req.app.locals.currentLink = 'article';
    // 查询文章数据
    // page指定当前页
    // size指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询
    // 查询所有文章数据

    // let articles = await pagination(Article).find().page(1).size(2).display(3).populate('author').exec();
    // 测试代码
    // res.send(articles);

    // 渲染文章集合列表页面模板
    // res.render('admin/article.art', {
    //     articles: articles
    // });

    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str);
    // console.log(json);
    // res.send(articles)
    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: json
    });
}