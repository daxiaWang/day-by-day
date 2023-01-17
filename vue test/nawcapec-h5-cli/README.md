# newcapec-h5-template

# v2.0.0

### 更新日志

1.【重要】 新增调试模式
    因为我们的h5都是多宿主的，因为兼容或者其他原因引起报错时，往往需要增加调试工具，打包，发布，排查问题，再去掉调试工具，打包，发布这一系列流程，并且增加的调试工具所有客户均可以看到，开发体验和使用体验较差，所以尝试增加了调试模式，当H5地址url新增参数outidConsole=XXX时会在工号为XXX的客户端开启调试模式。

2.【重要】 新增自动读取项目文件夹名称，打包自动压缩为zip。
    将打包，修改文件夹名称，压缩为zip再上传这个过程自动化。

3.【重要】优化请求拦截器
    1.进一步封装post和get请求，减少api列表的代码量，增加可读性
    2.优化响应拦截器的错误捕捉，因为业务接口层层包装转发，以往经常出现只弹窗不显示错误信息的问题，这次优化了各个层级报错的捕捉，抛出，再统一弹窗提示。

3.新增svg-loader和svg-icon组件来处理svg。

4.新增全局css变量处理
例如：:root{--example-coloe:#000}，使用：.a{color:var(--example-coloe:#000)}。同时去除less全局mixin和vant的主题配置。

5.封装公共头部，细化配置，包括指定路由显示头部，指定路由显示返回按钮等。

6.去掉全局配置config.js
    开发中如果有需要开发者自己再增加吧

7.兼容性
    使用useBuiltIns: "entry"导入所有polyfill来保证对ES6+的彻底编译

8.网页tab图标favicon.icon更新为新开普logo




#备注 脚手架使用方法
1).npm要先切到私有源地址 npm config set registry http://192.168.116.237:4873/，推荐使用nrm管理npm源
2).全局安装项目脚手架 npm install -g ncp-h5-cli
3).运行ncp(newcapec缩写) 可查看命令，目前只有create和list两个命令，分别用来创建项目和查看所有模板列表
4).运行ncp create <projectName> 即可创建项目 此时会从git上拉取模板并初始化package.json
5).运行cd projectName&&yarn install&&yarn serve即可启动项目进行开发