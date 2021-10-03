// 创建博客管理页面

// 创建博客的展示页面

// 引用express框架
const express = require('express');
// 导入用户集合构造函数

// 创建博客展示页面路由
const admin = express.Router();

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));


admin.post('/login', require('./admin/login'));

// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

// 创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));
// 将路由对象作为模块成员导出

// 用户修改路由
admin.post('/user-modify', require('./admin/user-modify'));

// 用户删除功能路由
admin.get('/delete', require('./admin/user-delete'));

// 文章列表路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))

module.exports = admin;