//  引入bode-parser模块
// const bodyPaser = require('body-parser');
// 创建网站服务器
const express = require('express');
// 创建网站服务器
const app = express();
// 数据连接
require('./model/connect');

// express-session功能
const session = require('express-session');
// 导入art-template
const template = require('art-template');
// 导入dateformat
const dateFormat =
    import ('dateformat');

// 导入morgan这个第三方模块
const morgan = require('morgan');
// 导入config模块
const config = require('config');

// 导入path
const path = require('path');
// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 高数express框架模板的默认后缀
app.set('view engine', 'art');
// 当渲染后缀为art的模板是，所室友的模板引擎是什么
app.engine('art', require('express-art-template'));

// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

const home = require('./router/home');
const admin = require('./router/admin');
// 配置session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret key'
}));
// 处理post请求参数
app.use(express.urlencoded({ extended: false }))
    // 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
// 引入路由模块

console.log(config.get('title'));

// 获取系统环境变量，返回值是一个对象
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log("当前是开发环境");
    // 在开发环境中，将客户端请求的信息打印到
    app.use(morgan('dev'));

} else {
    console.log("当前是生产环境");
}

//  拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/longinGuard'));
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON。parse()
    const result = JSON.parse(err)
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
    // return res.redirect(`${result.path}}?message=${result.message}`);

})


// 监听端口
app.listen(80);
console.log('网站服务器启动成功， 请访问localhost...');