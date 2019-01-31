## 介绍
一个练手用的redux小项目，主要涵盖以下的知识点:

- redux的基本使用
  - 怎么创建一个redux
  - 使用redux中间件(redux-thunk)
  - 使用浏览器拓展devtools
  - 合并多个reducer(combineReducers)
  - 使用react-redux的两个API(connect和Provider)
  - reduders的基本写法(一个函数，来处理dispatch过来的信息)
  - 组件通过this.props里面的一些个变量或者函数拿到reducers里面的值
  - 那些个变量主要是通过connect传导过来的

- react-router-dom的基本操作
  - 一些基本的API(Link,Route,Switch,Redirect,BrowserRouter...)
  - 利用redirect设计了一个登录验证的界面(把一些组件抽出来然后根据值来判断是否显示),这里结合了redux,可以仔细研究一下
  - this.props里面的一些个参数可以利用在route上从而使得代码更加精简

- axios库的使用
  - 一些基本的写法例如get和post请求的写法
  - 结合redux的使用(在reducer里面写异步的请求)
  - axios拦截器的使用(请求拦截器和相应拦截器) 

- express框架的使用
  - 采用了node.js里面的一些写法
  - 数据库用的是mongodb，它的启动停止一些基本命令不要忘记
  - 使用了nodemon来运行node.js文件从而使得运行更加方便
  - 用mogoose来链接mongodb数据库 

## 代码
- 前端代码在src目录下面 
- 后端代码在server目录下面 