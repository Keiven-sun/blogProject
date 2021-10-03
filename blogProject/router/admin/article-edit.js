module.exports = (req, res) => {
    // 这个是一个标示，标示是用户管理页面
    req.app.locals.currentLink = 'article';

    res.render('admin/article-edit.art');
}