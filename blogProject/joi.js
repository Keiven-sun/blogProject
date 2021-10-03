// 引入joi模块
const Joi = require('joi');

module.exports = async(req, res) => {
    //  定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(5).required.error(new Error("usernam属性没有通过验证")),
        birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3.30}$/).requied().error(new Error("用户密码不符合要求")),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色不符合要求')),
        state: Joi.number().valid(0, 1).reuiqred().error(new Error('状态非法'))
    }
};