var koa=require('koa');
var controller=require('koa-route');
var app=koa();

var test2="master";

var views=require('co-views');
var render=views('./view',{
	map:{html:'ejs'}
});
var koa_static=require('koa-static-server');
var service=require('./service/WebAppService.js')
var querystring=require('querystring');
app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/static/',
	maxage:0
}));
app.use(controller.get('/route',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('test',{title:'dasd'});
})); 
app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('index',{title:'書城首頁'});
})); 
app.use(controller.get('/book',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var bookId=params.id;
	this.body=yield render('book',{bookId:bookId});
})); 
app.use(controller.get('/rank',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var rankid=params.id;
	this.body=yield render('rank',{rankid:rankid});
})); 
app.use(controller.get('/classifiction',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var rankid=params.id;
	this.body=yield render('classification',{rankid:rankid});
})); 
app.use(controller.get('/male',function*(){
	this.set('Cache-Control','no-cache');
	
	this.body=yield render('male',{title:'男生频道'});
})); 
app.use(controller.get('/female',function*(){
	this.set('Cache-Control','no-cache');
	
	this.body=yield render('female',{title:'女生频道'});
})); 
app.use(controller.get('/login',function*(){
	this.set('Cache-Control','no-cache');
	
	this.body=yield render('login',{title:'登录'});
})); 
app.use(controller.get('/category',function*(){
	this.set('Cache-Control','no-cache');
	
	this.body=yield render('category',{title:'分类'});
})); 
app.use(controller.get('/rankdetail',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var rankid=params.id;
	this.body=yield render('rank-detail',{rankid:rankid});
})); 
app.use(controller.get('/search',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var keyword=params.keyword;
	this.body=yield render('search',{keyword:keyword});
})); 
app.use(controller.get('/reader',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('reader',{title:'搜索'});
})); 
app.use(controller.get('/menu',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('menu',{title:'目录'});
})); 
app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_test_data();
}));
app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');
	
	this.body=service.get_index_data();
}));
app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id="";
	}
	this.body=yield  service.get_book_data(id);
}));
app.use(controller.get('/ajax/male',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id="";
	}
	this.body=yield  service.get_male_data(id);
}));
app.use(controller.get('/ajax/female',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id="";
	}
	this.body=yield  service.get_female_data(id);
}));
app.use(controller.get('/ajax/menu',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id="";
	}
	this.body=yield  service.get_menu_data(id);
}));
app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id="";
	}
	this.body=yield service.get_rank_data(id);
}));

app.use(controller.get('/ajax/chapter',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_chapter_data();
}));
app.use(controller.get('/ajax/chapter/data',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id="";
	}
	this.body=service.get_chapter_content_data(id);
}));
app.use(controller.get('/ajax/rankdetail',function*(){
	this.set('Cache-Control','no-cache');
	var querystring=require('querystring');
	var params=querystring.parse(this.req._parsedUrl.query);
	var start=params.start;
	var count=params.count;
	var id=params.id;
	
	this.body=yield service.get_rankdetail_data(start,count,id);
}));
app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-cache');
	var querystring=require('querystring');
	var params=querystring.parse(this.req._parsedUrl.query);
	var start=params.start;
	var end=params.end;
	var keyword=params.keyword;
	this.body=yield service.get_search_data(start,end,keyword);
}));
app.listen(3001);
console.log('koa server is started!');