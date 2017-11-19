var id=location.href.split('?id=').pop();
var idm=parseInt(id)+1;
var idt=parseInt(id)-2;
var get_rankdetail_data=function(start,count,id){
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
$.get('/ajax/rankdetail?id='+id,function(d){
	
	new Vue({
		el:'#app',
		data:{
			items:d.items,
			select1_class:'-selected',
			select2_class:'',
			select3_class:''
		},
		methods:{
			readBook:function(id){
				location.href='/book?id='+id;
			},
			getRank:function(id){
				location.href='/rankdetail?id='+id;
			},
			tabSwitch:function(pos){
				
				if(pos==0){
                    //异步修改items数据；待完成
					this.select1_class="-selected";
					this.select2_class="";
					this.select3_class="";
					
				}else if(pos==1){
					//异步修改items数据；待完成
                    this.select1_class="";
					this.select2_class="-selected";
					this.select3_class="";
					
				}else{
					//异步修改items数据；待完成
                    this.select1_class="";
					this.select2_class="";
					this.select3_class="-selected";
					
				}
			}

		}
	});

},'json');