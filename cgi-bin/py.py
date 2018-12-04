#from urllib.request import urlopen
import requests
from bs4 import BeautifulSoup
import re
import json
import os
import time
#
#http://www.pythonscraping.com/pages/page1.html
#https://www.crummy.com/software/BeautifulSoup/bs4/doc/

#读取原字典
myoldWords = {};
isExists=os.path.exists('mywords.json');
if isExists==False:
	dictfile = open('mywords.json','w');
	initdata = {};
	dictfile.write(json.dumps(initdata));
	dictfile.close();
	with open('mywords.json', 'r') as f:
		myoldWords = json.load(f);

session = requests.Session();
headers = {
	"user-agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
	"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
}
url = "https://github.com/mr-mig/every-programmer-should-know";
html = session.get(url,headers=headers)
bsObj = BeautifulSoup(html.text,"html.parser")
print('get page successful.');

#过滤掉代码
if bsObj.pre:
	bsObj.pre.clear();
if bsObj.code:
	bsObj.code.clear();

alltext = bsObj.get_text(strip=True);
alltext = re.sub('\n+',' ',alltext)
#去除标点符号
alltext = re.sub('[\s+\.\!\/_,$%^*()\[\]\<\>?;\\\{\}\|\:\#=+\"\']+|[+——！，。？、~@#￥%……&*（）]+',' ',alltext);
alltext = re.sub(' +',' ',alltext)
alltext = re.sub('[0-9]*','',alltext)

alltext = re.sub("\A\s+", "",alltext)
alltext = re.sub("\s+\Z", "", alltext)

alltext = bytes(alltext,'UTF-8')
alltext = alltext.decode('ascii','ignore')
alltextArray = alltext.split(' ')
list = {};
for i in alltextArray:
	#过滤掉单词前后的-
	i = re.sub('-*$','',i)
	i = re.sub('^-*','',i)
	#长度大于1的才做统计，以排除空格和单字符
	if len(i)>1:
		if list.get(i):
			list[i]["num"] += 1;
		else:
			#与原字典做对比，并标记各单词情况
			if myoldWords.get(i):
				list[i] = {"num":1,"remembered":myoldWords[i]['remembered'],"exist":True};
			else:
				list[i] = {"num":1,"remembered":False,"exist":False};
				
#倒排序
newlist = sorted(list.items(),key=lambda item:item[1]["num"],reverse=True);

	
#验证是否有数据目录,没有则创建
isExists=os.path.exists('fetchData');
if isExists==False:
	os.makedirs('fetchData');

#写成一个新文件
currentTime = time.strftime("%Y-%m-%d-%H-%M-%S");
currentPath = 'fetchData/cacheData-'+currentTime+'.json';
f = open(currentPath, 'w');
f.write(json.dumps(newlist));
f.close();
print('write to file successful.');	



