## 介绍
一个前后端分离聊天项目

## 代码
- 前端代码在src目录下面 
- 后端代码在server目录下面 

## 事项记录
- 遇见antd-design的样式无法覆盖，设置了样式优先级为!import才解决。
- 完成聊天功能的实现，建议开两种不同的浏览器(例如firefox和chrome)进行尬聊
- 聊天窗口里面有个antd-mobile Card组件的显示问题，利用官方给的办法解决
- // console.log(Object.values({ name:'zoomdong',age:18 }));把数组拼接为一个对象
- js里面的排序
```js
console.log([6,4,5,9,7,8].sort((a,b)=>{
    return a-b; //根据从小到大的顺序排序
}));
```

1. eslint
2. react16的错误机制
3. react性能优化