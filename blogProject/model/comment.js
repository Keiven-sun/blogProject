// 引入mongoose模块
const mongoose = require('mongoose');
// 创建评论结合规则
const commentSchema = new mongoose.Schema({
    // 文章id 
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 评论人id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 评论时间
    time: {
        type: Date
    },
    // 评论内容
    content: {
        type: String
    }
});
// 创建文章结合
const Comment = mongoose.model('Comment', commentSchema);

// 导出模块
module.exports = {
    Comment
}