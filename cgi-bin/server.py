#!d:\Python\python.exe
import cgi;
print('Access-Control-Allow-Origin:*');
print('Content-type: text/html')
print('')
form = cgi.FieldStorage();
print('Hello, world!')
link = form.getvalue('link');#要抓取的地址
fetchType = form.getvalue('fetchType');#要抓取的类型，1:整站抓取,0:单页面抓取
print(link);
print(fetchType);

if fetchType==0:

else if fetchType==1:


#python -m http.server --cgi 8082