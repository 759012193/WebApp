var keyword=location.href.split('?keyword=').pop();
$.get('/ajax/search?keyword='+keyword,function(d){
	
	new Vue({
		el:'#app',
		data:{
			items:d.items
		},
		methods:{
			readBook:function(id){
				location.href='/book?id='+id;
			}

		}
	});

},'json');