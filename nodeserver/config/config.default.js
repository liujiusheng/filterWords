'use strict';

module.exports = appInfo => {
  const config = exports = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost', // localhost
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '222',
        // 数据库名
        database: 'word',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    security: {
      csrf: {
        enable: true,
        useSession: true,
        ignoreJSON: true,
      },
      domainWhiteList: [ 'http://localhost:8080', 'http://localhost:8081', 'http://192.168.1.103:8080', 'http://localhost' ],
    },
    cors: {
      enable: true,
      origin: 'http://localhost:8080',
      allowMethods: 'GET,POST,OPTIONS',
      credentials: true,
    },
    session: {
      key: 'EGG_SESS',
      maxAge: 24 * 3600 * 1000, // 1 天
      httpOnly: true,
      encrypt: true,
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538017319900_5662';

  // add your config here
  config.middleware = [];

  return config;
};
