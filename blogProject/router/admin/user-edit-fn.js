// 引入joi模块
const Joi = require('joi')
    // 引入密码加密模块
const bcrypt = require('bcrypt');
// 引入用户集合构造函数
const { User, validateUser } = require('../../model/user');

module.exports = async(req, res, next) => {

    try {
        // 实施验证
        await validateUser(req.body);
    } catch (e) {
        // 验证没有通过
        // e.message
        console.log(e.message);
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        // JSON。stringify() 将对象转换为字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    // res.send(user);
    // 如果用户已经存在，邮箱地址已经被接人占用
    if (user) {
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }));
    }
    // 对密码进行加密处理
    // 生成随机数字
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    // 将信息添加到数据库中
    await User.create(req.body);
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user');
}