
$.get('/ajax/rank',function(d){
	
	new Vue({
		el:'#app',
		data:{
			items:d.items
		},
		methods:{
			getRank:function(){
				location.href='/rankdetail';
			}

		}
	});

},'json');