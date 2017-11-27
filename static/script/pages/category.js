
$.get('/ajax/rank',function(d){
	
	new Vue({
		el:'#app',
		data:{
			items:d.items
		},
		methods:{
			readdetail:function(){
				location.href='/classifiction';
			}

		}
	});

},'json');