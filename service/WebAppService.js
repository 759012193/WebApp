var fs=require('fs');

exports.get_test_data=function(){
	var content=fs.readFileSync('./mock/reader/test.json','utf-8');
	return content;
}
exports.get_rank_data=function(){
	
return function(cb){
		var http=require('http');
		var qs=require('querystring');
		
		var http_request={
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/ad/ranks'
		}
		req_obj=http.request(http_request,function(_res){
			var content='';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content+=chunk;


			});
			_res.on('end',function(){
				cb(null,content);
			});


		});
		req_obj.on('error',function(){

		});
		req_obj.end();
	}
		
}
exports.get_rankdetail_data=function(start,count,id){
	console.log(start+","+count+","+id);
return function(cb){
		var http=require('http');
		var qs=require('querystring');
		var data={
			start:start,
			count:count,
			r:id
		};
		var content=qs.stringify(data);
		
		var http_request={
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/fiction/rank?'+content
		}
		req_obj=http.request(http_request,function(_res){
			var content='';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content+=chunk;


			});
			_res.on('end',function(){
				cb(null,content);
			});


		});
		req_obj.on('error',function(){

		});
		req_obj.end();
	}
		
}
exports.get_book_data=function(id){
	
return function(cb){
		var http=require('http');
		var qs=require('querystring');
		
		var http_request={
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/hs/v0/android/fiction/book/'+id
		}
		req_obj=http.request(http_request,function(_res){
			var content='';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content+=chunk;


			});
			_res.on('end',function(){
				cb(null,content);
			});


		});
		req_obj.on('error',function(){

		});
		req_obj.end();
	}
		
}
exports.get_chapter_data=function(){
	var content=fs.readFileSync('./mock/reader/chapter.json','utf-8');

	return content;
}
exports.get_chapter_content_data=function(id){
	if(!id){
		id="1";
	}
	var content=fs.readFileSync('./mock/reader/data/data'+id+'.json','utf-8');

	return content;
}
exports.get_index_data=function(){
	var content=fs.readFileSync('./mock/home.json','utf-8');
	return content;
}

exports.get_search_data=function(start,end,keyword){
	return function(cb){
		var http=require('http');
		var qs=require('querystring');
		var data={
			s:keyword,
			start:start,
			end:end
		};
		var content=qs.stringify(data);
		var http_request={
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/lib/query/onebox?'+content
		}
		req_obj=http.request(http_request,function(_res){
			var content='';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content+=chunk;


			});
			_res.on('end',function(){
				cb(null,content);
			});


		});
		req_obj.on('error',function(){

		});
		req_obj.end();
	}
}