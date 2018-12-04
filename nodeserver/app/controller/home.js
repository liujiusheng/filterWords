'use strict';


const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const param = ctx.query;
    const url = param.url;
    const type = param.type;
    const result = await ctx.curl(url);
    let html = result.res.data.toString();
    html = html.replace(/<script[^>]*?>[\s\S]*?<\/script>/ig, ' ');// 去除style
    html = html.replace(/<style[^>]*?>[\s\S]*?<\/style>/ig, ' ');// 去除style
    html = html.replace(/<!--[\s\S]*?-->/ig, ' ');// 去除注释
    html = html.replace(/<[^>]+>/g, ' ');// 去除html标签
    // html = html.replace(/\n+/g, ' ');// 去除换行
    // html = html.replace(/[\s+\.\!\/_,$%^*()\[\]\<\>?;\\\{\}\|\:\#=+\"\']+|[+——！，。？、~@#&￥%……&*（）`-]+/g, ' ');// 去除标点符号
    // html = html.replace(/[0-9]+/g, ' '); // 去除数字
    html = html.replace(/[^A-Z]/ig, ' ');// 去除中文，只保留英文单词,其它语言的字符也会被过滤掉
    html = html.replace(/(\s+[a-z]\s+)/ig, ' '); // 去除前后是空格单个字母的单词
    html = html.replace(/nbsp/ig, '');// 去除nbsp
    html = html.replace(/\s+/g, ' ');// 去除中间多余的空格
    
    html = html.replace(/(^\s*)|(\s*$)/g, '');// 去除两端的空格
    // console.log(html);
    // 统计每个单词出现的次数
    const words = html.toLowerCase().split(' ');
    const newWord = {};
    for (const i in words) {
      const word = words[i];
      if (newWord[word]) {
        newWord[word] += 1;
      } else {
        newWord[word] = 1;
      }
    }
    // html = word.join(' ');
    const data = {
      words: html,
    };
    const response = await ctx.service.home.addCache(data);
    ctx.body = newWord;
  }


  // 加载资源列表
  async loadSource() {
    const ctx = this.ctx;
    const pageNum = ctx.query.pageNum;
    const pageSize = ctx.query.pageSize;
    const userId = ctx.session.userInfo.id;
    const response = await ctx.service.home.loadSource(pageNum, pageSize, userId);
    ctx.body = response;
  }


  // 添加资源
  async addSource() {
    const ctx = this.ctx;
    let param = ctx.query;
    param.userId = ctx.session.userInfo.id;
    const response = await ctx.service.home.addSource(param);
    ctx.body = response;
  }


  // 修改资源
  async updateSource() {
    const ctx = this.ctx;
    let param = ctx.query;
    const response = await ctx.service.home.updateSource(param);
    ctx.body = response;
  }


  // 删除资源
  async deleteSource() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const response = await ctx.service.home.deleteSource(id);
    ctx.body = response;
  }


  // 保存单词
  async saveWord() {
    const ctx = this.ctx;
    const param = ctx.request.body;
    const userId = ctx.session.userInfo.id;
    const response = await ctx.service.home.saveWord(param, userId);
    ctx.body = '成功！';
  }


  // 加载需要记忆的单词列表
  async loadWordsNeedRemember() {
    const ctx = this.ctx;
    const userId = ctx.session.userInfo.id;
    ctx.body = await ctx.service.home.loadWordsNeedRemember(userId);
  }


  // 加载单词列表
  async loadWordsList() {
    const ctx = this.ctx;
    const pageNum = ctx.query.pageNum;
    const pageSize = ctx.query.pageSize;
    const userId = ctx.session.userInfo.id;
    ctx.body = await ctx.service.home.loadWordsList(pageNum, pageSize, userId);
  }


  // 删除单词
  async deleteWord() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    ctx.body = await ctx.service.home.deleteWord(id);
  }


  // 查询需要复习的单词
  async getReviewWord() {
    const ctx = this.ctx;
    const userId = ctx.session.userInfo.id;
    ctx.body = await ctx.service.home.getReviewWord(userId);
  }


  // 登录
  async login() {
    const ctx = this.ctx;
    const param = ctx.request.body;
    const userInfo = await ctx.service.home.login(param);
    ctx.session.userInfo = userInfo;
    ctx.body = userInfo;
  }


  // 退出
  async logout() {
    const ctx = this.ctx;
    ctx.session = null;
    ctx.body = '退出成功！';
  }


  // 添加单词
  async addWord() {
    const ctx = this.ctx;
    const param = ctx.request.body;
    const userId = ctx.session.userInfo.id;
    ctx.body = await ctx.service.home.addWord(param, userId);
  }


  // 记住了
  async remembered() {
    const ctx = this.ctx;
    const param = ctx.request.body;
    ctx.body = await ctx.service.home.remembered(param);
  }


  // 忘记了
  async forget() {
    const ctx = this.ctx;
    const param = ctx.request.body;
    ctx.body = await ctx.service.home.forget(param);
  }


  // 获取词库里没有但用户单词本中有的单词
  async getNewWord() {
    const ctx = this.ctx;
    const pageNum = ctx.query.pageNum;
    const pageSize = ctx.query.pageSize;
    ctx.body = await ctx.service.home.getNewWord(pageNum, pageSize);
  }


  // 添加单词到词库
  async addWordToStardict() {
    const ctx = this.ctx;
    const param = ctx.request.body;
    ctx.body = await ctx.service.home.addWordToStardict(param);
  }


  // 切换单词是否加入记忆列表
  async toogleState() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const state = ctx.query.state;
    ctx.body = await ctx.service.home.toogleState(id, state);
  }
}

module.exports = HomeController;
