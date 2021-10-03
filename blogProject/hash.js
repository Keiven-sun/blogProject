// 到诶bcrypt
const bcrypt = require('bcrypt');

async function run() {
    // 生随机字符串
    // genSalt方法接收一个数值作为参数
    // 数值越大 生成的随机字符串复杂度越高 反之则反
    //  默认值是 10
    // 返回生成随机的字符串
    const salt = await bcrypt.genSalt(10);
    // 对密码进行加密
    // 1。要进行价目的明文
    // 2. 随机字符串
    // 返回值是加密后的密码
    const result = await bcrypt.hash('12345678', salt);
    console.log(salt);
    console.log(result);
}

run();