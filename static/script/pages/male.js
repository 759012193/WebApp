
$.get('/ajax/male',function(d){
	

	new Vue({
		el:'#app',
		data :{
			hot:d.items[0].data.data,
			recommend:d.items[1].data.data,
			newbooks:d.items[2].data.data,
			overbooks:d.items[3].data.data
		},
		methods:{
			readBook:function(id){
				location.href='/book?id='+id;
			}
			
		}
	})
},'json');