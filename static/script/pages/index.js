

$.get('/ajax/index',function(d){
	
var windowWidth=$(window).width();
if(windowWidth<320){
	windowWidth=320;
   }
   var index_header_tab_width=windowWidth/4;
	new Vue({
		el:'#app',
		data :{
			top:d.items[0].data.data,
			hot:d.items[1].data.data,
			recommend:d.items[2].data.data,
			female:d.items[3].data.data,
			male:d.items[4].data.data,
			free:d.items[5].data.data,
			topic:d.items[6].data.data,
			screen:"width:"+windowWidth+"px;",
			dp:"width:"+index_header_tab_width+"px;transition-duration:0.5s;transform: translate3d(0px,0px,0px);",
			hdp:"width:"+windowWidth*2+"px;transition-duration:0.5s;transform: translate3d(0px,0px,0px);",
			tab_1_class:'Swipe-tab__on',
			tab_2_class:'',
		},
		methods:{
			readBook:function(id){
				location.href='/book?id='+id;
			},
			tabSwitch:function(pos){
				this.dp="width:"+index_header_tab_width+"px;transition-duration:0.5s;transform: translate3d(0px,0px,0px);";
				if(pos==0){
					this.hdp="width:"+windowWidth*2+"px;transition-duration:0.5s;transform: translate3d(0px,0px,0px);";
					this.dp="width:"+index_header_tab_width+"px;transition-duration:0.5s;transform: translate3d(0px,0px,0px);";
					this.tab_1_class="Swipe-tab__on";
					this.tab_2_class="";
				}else{
                    this.hdp="width:"+windowWidth*2+"px;transition-duration:0.5s;transform: translate3d("+-windowWidth+"px,0px,0px);";
					this.dp="width:"+index_header_tab_width+"px;transition-duration:0.5s;transform: translate3d("+index_header_tab_width+"px,0px,0px);";
					this.tab_2_class="Swipe-tab__on";
					this.tab_1_class="";
				}
			},
			login:function(){
				location.href='/login';
			}
		}
	})
},'json');