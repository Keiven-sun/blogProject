// 导入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // 测试代码
    // res.send('ok');

    // 接收客户端发送来的请求参数
    const { content, uid, aid } = req.body;

    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });

    // 将页面重定向回文章详情页面
    res.redirect('/home/article?id=' + aid);

}