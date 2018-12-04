'use strict';
const Service = require('egg').Service;
class HomeService extends Service {


  // 添加一个缓存
  async addCache(data) {
    const result = await this.app.mysql.insert('cache', data);
    if (result.affectedRows === 1) {
      return result.insertId;
    }
    return false;
  }


  // 加载资源库
  async loadSource(pageNum, pageSize, userId) {
    const result = await this.app.mysql.query(`select * from source where userId=${userId} limit ${(pageNum - 1) * pageSize},${pageSize}`);
    const count = await this.app.mysql.query(`select count(id) as total from source where userId=${userId}`);
    return {
      total: count[0].total,
      list: result,
      pageNum: pageNum,
      pageSize: pageSize
    };
  }


  // 添加资源
  async addSource(data) {
    const result = await this.app.mysql.insert('source', data);
    return result;
  }


  // 修改资源
  async updateSource(data) {
    const result = await this.app.mysql.query(`update source set name='${data.name}', links='${data.links}' where id=${data.id}`);
    return result;
  }


  // 删除资源
  async deleteSource(id) {
    const result = await this.app.mysql.query(`delete from source where id=${id}`);
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }


  // 保存单词
  // 查找原来的数据，如果有则累加，如果没有则新增
  async saveWord(data, userId) {
    let words = [];
    for (const i in data) {
      words.push('"' + i + '"');
    }
    words = words.join(',');
    // const sql = 'create temporary table `tmp` (
    //   'id' INT(11) AUTO_INCREMENT,
    //   'word' VARCHAR(50),
    //   'markNum' INT(11),
    //   PRIMARY KEY ('id')
    // );
    // insert into tmp (id,word,markNum) values  ();
    // update dictionary, tmp set dictionary.markNum=tmp.markNum+dictionary.markNum where dictionary.word=tmp.word;';
    const result = await this.app.mysql.query(`select * from dictionary where word in (${words}) and  userId=${userId}`);
    
    // 提取所有已经存有的单词
    let savedWords = {};
    for (const i in result) {
      savedWords[result[i].word] = result[i];
    }
    // 比对哪些单词还没有加入库中的
    // 先暂时用循环更新，后面需要修改为批量更新
    for (const i in data) {
      if (!savedWords[i]) {
        // 添加还没有的单词
        await this.app.mysql.insert('dictionary', { word: i, markNum: data[i], userId: userId });
      } else {
        // 更新已有的单词
        await this.app.mysql.query(`update dictionary set markNum=markNum+${data[i]} where id=${savedWords[i].id}`);
      }
    }
    return true;
  }


  // 获取需要记忆的单词
  /**
   * 0-5：1小时
   * 5-10：1天
   * 10-20：7天
   * 20-24：30天
   * 24以上：不需要记忆了
   */
  async loadWordsNeedRemember(userId) {
    const result = await this.app.mysql.query(`select * from dictionary where userId=${userId} and state=1`);
    let newResult = [];
    if (result.length > 0) {
      const currentTime = new Date().getTime();
      const hour = 60 * 60 * 1000;
      const day = hour * 24;
      const day7 = day * 7;
      const month = day * 30;
      for (const i in result) {
        const currentWordTime = new Date(result[i].updateTime).getTime();
        const number = result[i].rememberNum - result[i].forgetNum;
        if (number < 1) {
          newResult.push(result[i]);
        } else if (number > 0 && number < 5) {
          if (currentWordTime < currentTime - hour) {
            newResult.push(result[i]);
          }
        } else if ((number === 5 || number > 5) && number < 10) {
          if (currentWordTime < currentTime - day) {
            newResult.push(result[i]);
          }
        } else if ((number === 10 || number > 10) && number < 20) {
          if (currentWordTime < currentTime - day7) {
            newResult.push(result[i]);
          }
        } else if ((number === 20 || number > 20) && number < 24) {
          if (currentWordTime < currentTime - month) {
            newResult.push(result[i]);
          }
        } else {
          // 超过24次的就不纳入记忆范围了
        }
      }
      if (newResult.length > 0) {
        let words = '';
        for (const i in newResult) {
          words += "'" + newResult[i].word + "',";
        }
        words = words.substr(0, words.length - 1);
        const result2 = await this.app.mysql.query(`select word,translation from stardict where word in(${words})`);
        let wordsObj = {};
        for (const i in result2) {
          wordsObj[result2[i].word] = result2[i].translation;
        }
        for (const i in newResult) {
          if (newResult[i].translation === '0' || newResult[i].translation === '') {
            newResult[i].translation = wordsObj[newResult[i].word];
          }
        }
      }
    }
    return newResult;
  }


  // 查询单词列表
  async loadWordsList(pageNum, pageSize, userId) {
    // translation
    const result = await this.app.mysql.query(`select * from dictionary where userId=${userId} limit ${(pageNum - 1) * pageSize},${pageSize}`);
    let count = [{ total: 0 }];
    if (result.length > 0) {
      count = await this.app.mysql.query(`select count(id) as total from dictionary where userId=${userId}`);
      let words = '';
      for (const i in result) {
        words += "'" + result[i].word + "',";
      }
      words = words.substr(0, words.length - 1);
      const result2 = await this.app.mysql.query(`select word,translation from stardict where word in(${words})`);
      let wordsObj = {};
      for (const i in result2) {
        wordsObj[result2[i].word] = result2[i].translation;
      }
      for (const i in result) {
        if (result[i].translation === '0' || result[i].translation === '') {
          result[i].translation = wordsObj[result[i].word];
        }
      }
    }
    return {
      total: count[0].total,
      list: result,
      pageNum,
      pageSize,
    };
  }


  // 删除单词
  async deleteWord(id) {
    const result = await this.app.mysql.query(`delete from dictionary where id=${id}`);
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }


  // 获取需要复习的单词
  async getReviewWord(userId) {
    const result = await this.app.mysql.query(`select * from dictionary where needRemember=1 and userId=${userId}`);
    return result;
  }


  // 登录
  async login(param) {
    const username = param.username;
    const password = param.password;
    let result = await this.app.mysql.query(`select * from user where username='${username}'`);
    if (result[0].password === password) {
      result[0].password = '';
      return result[0];
    }
    return false;
  }


  // 添加单个单词
  async addWord(param, userId) {
    const word = param.word;
    const translation = param.translation;
    const id = param.id;
    // const data = await this.app.mysql.query(`select word from dictionary where word='${word}'`);
    if (id) {
      const result = await this.app.mysql.query(`update dictionary set word='${word}',translation='${translation}' where id='${id}' and userId=${userId}`);
      if (result.affectedRows === 1) {
        return true;
      }
      return false;
    }
    const result = await this.app.mysql.query(`insert into dictionary (word,translation,userId) values ('${word}','${translation}',${userId})`);
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }


  // 记住了
  async remembered(param) {
    let result = await this.app.mysql.query(`update dictionary set rememberNum=rememberNum+1 where id=${param.id}`);
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }


  // 忘记了
  async forget(param) {
    let result = await this.app.mysql.query(`update dictionary set forgetNum=forgetNum+1 where id=${param.id}`);
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }


  // 获取词库里没有但用户单词本中有的单词
  async getNewWord(pageNum, pageSize) {
    let result = await this.app.mysql.query(`select DISTINCT word from dictionary where word not in (select word from stardict) limit ${(pageNum - 1) * pageSize},${pageSize}`);
    const count = await this.app.mysql.query(`select count(DISTINCT word) as total from dictionary where word not in (select word from stardict)`);  
    if (result.length > 0) {
      let words = '';
      for (const i in result) {
        words += "'" + result[i].word + "',";
      }
      words = words.substr(0, words.length - 1);
      result = await this.app.mysql.query(`select word,count(word) as count,sum(markNum) as markNum from dictionary where word in (${words}) group by word`);
    }
    return {
      total: count[0].total,
      list: result,
      pageNum,
      pageSize,
    };
  }


  // 添加单个单词到词库
  async addWordToStardict(param) {
    const word = param.word;
    const translation = param.translation;
    const id = param.id;
    // const data = await this.app.mysql.query(`select word from dictionary where word='${word}'`);
    if (id) {
      const result = await this.app.mysql.query(`update stardict set word='${word}','${word}',translation='${translation}' where id='${id}'`);
      if (result.affectedRows === 1) {
        return true;
      }
      return false;
    }
    const result = await this.app.mysql.query(`insert into stardict (word,sw,translation) values ('${word}','${word}','${translation}')`);
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }


  // 切换单词是否加入记忆列表的状态
  async toogleState(id, state) {
    const result = await this.app.mysql.query(`update dictionary set state=${state} where id=${id}`);
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }
}
module.exports = HomeService;
