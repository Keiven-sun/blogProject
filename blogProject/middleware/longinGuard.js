const guard = (req, res, next) => {
    // 判断用户访问的是否登录页面
    // 判断用户的登录状态
    // 如果用户是登录的 请求放行
    // 如果用户是未登录 则从定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        // 如果用户是登录状态， 并且是普通用户
        if (req.session.role == 'normal') {
            // 让重定向到主页页面
            return res.redirect('/home/');
        }
        // 用户是登录状态，将用户放行
        next()
    }
}
module.exports = guard;