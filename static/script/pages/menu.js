var id=location.href.split('?id=').pop();
$.get('/ajax/menu?id='+id,function(d){
	
	new Vue({
		el:'#app',
		data:{
			items:d.item.toc
		},
		methods:{
			readBook:function(){
				location.href='/reader';
			}

		}
	});

},'json');