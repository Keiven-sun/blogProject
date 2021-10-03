// 导入文章结合构造函数
const { Article } = require('../../model/article')
    // 导入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // 接收客户端传递过来的文章id值
    const id = req.query.id;
    // 根据id 查询出文章的具体信息
    let article = await Article.findOne({ _id: id }).populate('author');
    // 查询当前文章所对应的评论信息
    let comments = await Comment.find({ aid: id }).populate('uid');

    // res.send(comments);


    // 此模块非常重要
    let str_f = JSON.stringify(comments);
    let comments_json = JSON.parse(str_f);


    let str = JSON.stringify(article);
    let json = JSON.parse(str);

    // res.send("欢迎来到博客文章详情页面")
    res.render('home/article', {
        article: json,
        comments: comments_json
    });

}