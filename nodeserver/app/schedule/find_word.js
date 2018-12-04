'use strict';
module.exports = {
  schedule: {
    interval: '1m',
    type: 'worker',
  },
  async task(ctx) {
    // 总共分为8个阶段，
    // 1． 第一个记忆周期：5分钟
    // 2． 第二个记忆周期：30分钟
    // 3． 第三个记忆周期：12小时
    // 4． 第四个记忆周期：1天
    // 5． 第五个记忆周期：2天
    // 6． 第六个记忆周期：4天
    // 7． 第七个记忆周期：7天
    // 8． 第八个记忆周期：15天
    const date = new Date();
    const time = date.getTime();
    // 5分钟300000
    const newTime = time - 300000;
    const newDate = new Date(newTime);
    // const result = await ctx.app.mysql.query();
    // console.log(ctx.app.mysql);
    // 将从来没记过的单词设置为需要记忆
    const result = await ctx.app.mysql.query(`update dictionary set needRemember=1 where rememberNum=0`);
    // 将只记到了一次且过了5分钟的单词设置为需要记忆
    const queryTime = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDay() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    const result2 = await ctx.app.mysql.query(`update dictionary set needRemember=1 where rememberNum=1 and updateTime<'${queryTime}'`);
    // console.log(result);
  }
}
