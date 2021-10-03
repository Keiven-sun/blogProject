const { User } = require('../../model/user')
    // 到诶bcrypt
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    // 接收请求参数
    const { email, password } = req.body;
    // if (email.trim().length == 0 || password.trim().length == 0) {
    //     return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
    // }
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误，3S后自动返回登录页面' });
    let user = await User.findOne({ email });
    // 查询道理用户
    if (user) {
        // 将用户端传递过来的密码和用户信息中的密码进行比对
        let isValid = await bcrypt.compare(password, user.password)

        if (isValid) {
            // 登录成功
            // 将用户名存储在请求对象中
            req.session.username = user.username;
            // 将用户角色存储在请求对象中
            req.session.role = user.role;
            // 重定向到用户列表页面
            req.app.locals.userInfo = user;
            // 对用户的角色进行判断
            if (user.role == 'admin') {
                res.redirect('/admin/user');
            } else {
                res.redirect('/home');
            }
        } else {
            // 登录失败
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
    }
};