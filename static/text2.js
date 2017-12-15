function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Model = function(){
		this.callParent();
		this.randNum = "";
		this.ti=60;
	};
	Model.prototype.regBtnClick = function(event){
       
       var name=this.comp("name").val();
       var pw1=this.comp("password1").val();
       var pw2=this.comp("password2").val();
       var phone=this.comp("regPhoneNum").val();
       var regVerifyCode=this.comp("regVerifyCode").val();
       
       if (name===""){
              justep.Util.hint("用户名不能为空", {"type" : "danger"});
			   $(this.comp("name").domNode).focus();
			  return;
       }
       if (pw1===""){
              justep.Util.hint("密码不能为空", {"type" : "danger"});
			   $(this.comp("password1").domNode).focus();
			  return;
       }
       if (phone===""){
               justep.Util.hint("电话号码不能为空", {"type" : "danger"});
			   $(this.comp("regPhoneNum").domNode).focus();
			  return;
       }
       if (regVerifyCode===""){
              justep.Util.hint("验证码不能为空", {"type" : "danger"});
			   $(this.comp("regVerifyCode").domNode).focus();
			  return;
       }
      if  (pw1!=pw2){
            justep.Util.hint("两次输入的密码不一致！", {"type" : "danger"});
			$(this.comp("password1").domNode).focus();
			return;
		 }
     if (regVerifyCode!=this.randNum) {
          justep.Util.hint("验证码不正确！", {"type" : "danger"});
          $(this.comp("regVerifyCode").domNode).focus();
          return;      
        } 
      this.comp("K_userData").newData({
		"defaultValues" : [ {
			"K_NAME":name,
			"K_USERPHONE" : phone,
			"K_CREATEDATE" : new Date(),
			"K_PASSWD":pw1,
			"K_USERTRUST":0			
		} ]
	}); 
	this.comp("K_userData").saveData();     
	this.ti=0;
	this.comp("button4").set({
         "disabled":false,
         "label":"获取验证码"  
      });
      this.comp("timer1").set({"enabled":false});  
	justep.Util.hint("注册成功！", {"type" : "info"});
	
	};
	 
    Model.prototype.checkphone = function(eve){
        var data=this.comp("K_userData");
        var row=data.find(['K_USERPHONE'],[eve]);     
        if (row.length===0) return 0;    
        else return 1;
      };

	Model.prototype.button4Click = function(event){    
      	var self = this;
       	if (!justep.Browser.isX5App) {
			var phoneInput = this.comp("regPhoneNum").val();
			var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			if (phoneInput==="" || phoneInput==null){
				justep.Util.hint("手机不能为空", {
					"type" : "danger"
				});
				$(this.comp("regPhoneNum").domNode).focus();
				return;
			}
			if (!reg.test(phoneInput)) {
				justep.Util.hint("手机号码不正确", {
					"type" : "danger"
				});
				 $(this.comp("regPhoneNum").domNode).focus();
				return;
			}
			 //this.comp("userData").refreshData();
			if (this.checkphone(phoneInput)===1) {
				justep.Util.hint("手机号码已注册", {
					"type" : "danger"
				});
				return;
			}
			this.ti=60;
	        this.comp("timer1").set({"enabled":true});  			
			justep.Baas.sendRequest({
				"url" : "/kdbs/kdbs_action",  //baas目录，请根据自己的配置进行修改
				"action" : "GetCode",
				"async" : false,
				"params" : {
					"phoneNum" : phoneInput
				},
				"success" : function(res) {
					if (res !== null && res !== "" && res !== "[]" && res !== "undefined"){
						self.randNum = res.NumRand;
					}
				}
			});
		}

	};
	 

	Model.prototype.modelLoad = function(event){
          $(this.comp("name").domNode).focus();
          this.comp("timer1").set({"enabled":false});  
          };
	
	Model.prototype.timer1Timer = function(event){
    this.ti=this.ti-1 ; 
    this.comp("button4").set({
         "disabled":  true,
         "label":"("+this.ti+"s)后重新获取"  
      });
    if (this.ti===0){
        this.comp("button4").set({
         "disabled":false,
         "label":"重新获取验证码"  
      });
      this.comp("timer1").set({"enabled":false});  
   }
 
    };	 


	Model.prototype.button3Click = function(event){
      this.ti=60;
	  this.comp("timer1").set({"enabled":true});  
	};
	 
	 


	Model.prototype.SSwap = function(event){
	   //this.c3.set(!this.c3.get());
	   //this.c4.set(!this.c4.get());
	   //alert(justep.Shell.c1.get());
	   //alert(justep.Shell.c2.get());
	   justep.Shell.c1.set(false);
	   justep.Shell.c2.set(true);
	   //this.getParentModel();
	};
	 
	 


	return Model;
}