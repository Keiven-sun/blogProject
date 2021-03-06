// 引入用户集合
const { User } = require('../../model/user');

module.exports = async(req, res) => {

    // 这个是一个标示，标示是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传递过来的当前页参数 
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize = 10;
    // 查询用户数据的总数
    let count = await User.countDocuments({})
        // 总页数
    let total = Math.ceil(count / pagesize);

    // 页码对应数据查询开始位置
    let start = (page - 1) * pagesize;

    // 调试代码
    // res.send('总页数为' + total);

    // 将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start);
    // 将用户信息冲数据库中查询出来
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });

    // res.send(users)
}