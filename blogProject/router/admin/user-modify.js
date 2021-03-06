// 导入bcrypt模块
const bcrypt = require('bcrypt');

// 引入用户集合模块
const { User } = require('../../model/user');
module.exports = async(req, res, next) => {
    // res.send('ok');
    // 接收客户端发送来的参数
    const { username, email, role, state, password } = req.body;

    // 即将要修改的用户ID
    const id = req.query.id;

    // res.send(bpdy.password);
    let user = await User.findOne({ _id: id });

    // 密码比对
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        // 密码比对成功
        // res.send('密码比对成功');
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 将页面重定向到用户页面
        res.redirect('/admin/user');

    } else {
        // 密码比对失败
        // res.send('密码比对失败');
        let obj = { path: '/admin/user-edit', message: '密码比对失败， 不能对哟农户信息进行修改', id: id };
        next(JSON.stringify(obj));
    }




}