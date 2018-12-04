'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); // 抓取数据
  router.get('/loadSource', controller.home.loadSource); // 加载资源列表
  router.get('/addSource', controller.home.addSource); // 添加资源
  router.get('/updateSource', controller.home.updateSource); // 修改资源
  router.get('/deleteSource', controller.home.deleteSource); // 删除资源
  router.post('/saveWord', controller.home.saveWord); // 保存单词
  router.get('/loadWordsNeedRemember', controller.home.loadWordsNeedRemember);// 查询所有需要记忆的单词
  router.get('/loadWordsList', controller.home.loadWordsList); // 查询所有单词
  router.get('/deleteWord', controller.home.deleteWord); // 删除单词
  router.get('/getReviewWord', controller.home.getReviewWord); // 获取需要复习的单词
  router.post('/login', controller.home.login); // 登录
  router.get('/logout', controller.home.logout); // 退出
  router.post('/addWord', controller.home.addWord); // 添加单词
  router.post('/remembered', controller.home.remembered);// 记住
  router.post('/forget', controller.home.forget);// 记住
  router.get('/getNewWord', controller.home.getNewWord); // 获取词库里没有但是单词本里有的单词
  router.post('/addWordToStardict', controller.home.addWordToStardict); // 添加单词到词库
  router.get('/toogleState', controller.home.toogleState); // 切换单词是否加入记忆列表
};
