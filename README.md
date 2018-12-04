# mywords
提取英文文档中的单词，快速提高英文文档的阅读能力
目前已经使用node.js重构
还在开发中，你可以克隆下去看看

# 在线示例：
[http://120.79.223.26/words/#/Login](http://120.79.223.26/words/#/Login)
测试用户名：test
测试密码：222
    
# 启动方式：
    1. 在filterWords主目录下运行python -m http.server --cgi 8082
    2. 在浏览器地址栏输入http://localhost:8082/dist/index.html 即可打开管理界面


# 其它技术相关
    python3
    BeautifulSoup
    requests
    re
    json
    os
    time

# 目录结构
    cgi-bin：python代码
    fetchData: 抓取下来的数据
    data: 成果数据
    config: webpack的配置文件
    src: 前端代码文件
    
    

