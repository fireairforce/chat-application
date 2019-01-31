/**
 * 在 express 里面只要和 mongoDB 有关的就直接拆分到 model 里面去
 */


const mongoose = require('mongoose');
// 链接mongo,并且使用imooc这个集合
const DB_URL  =  'mongodb://127.0.0.1:27017'
mongoose.connect(DB_URL);

const models = {  //生成一个用户的模型
    user:{
       'user':{'type':String,'require':true},
       'pwd':{'type':String,'require':true},
       'type':{'type':String,'require':true},
        // 头像
       'avatar':{'type':String},
        // 个人简介
       'desc':{'type':String},
        // 职位
       'title':{'type':String},
        // 如果你是Boss 还有两个字段
        'company':{'type':String},
        'money':{'type':String}
    },
    chat:{

    }
}

// 批量动态生成，Schema 和 model 新建模型
for (let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}