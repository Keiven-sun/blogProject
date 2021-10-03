// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 获取页码
    const page = req.query.page
        // 从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    let str = JSON.stringify(result);
    let json = JSON.parse(str);

    // 测试代码
    // console.log(json);

    // res.send(result)
    // 渲染文章列表页面模板
    res.render('home/default', {
        result: json
    });
}