# mywords
提取英文文档中的单词，花最少的时间，学最有用的单词
目前已经使用node.js重构
还在开发中，你可以克隆下去看看
后续可能还想搞一个微信端的界面

# 在线示例：
[http://120.79.223.26/words/#/Login](http://120.79.223.26/words/#/Login)
测试用户名：test
测试密码：222
    
# 启动方式：
    1.导入sql文件夹中的sql到mysql数据库，修改egg和前端代码配置
    2.cmd在根目录，执行yarn run dev启动开发环境的前端
    3.cmd进入nodeserve目录，执行yarn run dev启动开发环境的后端
    <!-- 1. 在filterWords主目录下运行python -m http.server --cgi 8082
    2. 在浏览器地址栏输入http://localhost:8082/dist/index.html 即可打开管理界面 -->


# 其它技术相关
    python3
    BeautifulSoup
    requests
    re
    json
    os
    time
    node.js
    egg.js
    webpack
    vue.js
    mysql

# 目录结构
    <!-- cgi-bin：python代码
    fetchData: 抓取下来的数据
    data: 成果数据 -->
    nodeserver后端代码
    config: webpack的配置文件
    src: 前端代码文件
    style:前端通用样式文件
    images:前端所需图片
    sql:数据库脚本
    
    

