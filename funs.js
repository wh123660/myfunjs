
	'use strict'
var funs = {
	//输入框中的placeholder的颜色设置
	/*例子：
	inputplaceholder('#inputid','label',{'color':'blue'},{'opacity':0.5},{'opacity':1});
					  inputid    fontele    fontcolor       focuscolor      blurcolor
	*/
	inputplaceholder:function(inputid,fontele,fontcolor,focuscolor,blurcolor){
		$(fontele).css(fontcolor);
		$(inputid).on('focus',function(){
			if(this.value == ''){
				$(fontele).css(focuscolor);
			}else{
				$(fontele).css('display','none');
			}
		}).on('blur',function(){
			if($(this).val() == ''){
				$(fontele).css(blurcolor);
			}else{
				$(fontele).css('display','none');
			}
		}).bind('input propertychange',function(){
			var text = $(this).val();
			if(text == ''){
				$(fontele).css(focuscolor);
			}else{
				$(fontele).css('display','none');
			}
		})
	},
	//获取cookie
	getCookie:function(name) {
	  var nameEQ = name + "=";
	  var ca = document.cookie.split(';'); //把cookie分割成组
	  for(var i=0;i < ca.length;i++) {
	    var c = ca[i]; //取得字符串
	    while (c.charAt(0)==' ') { //判断一下字符串有没有前导空格
	      c = c.substring(1,c.length); //有的话，从第二位开始取
	    }
	    if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name
	      return unescape(c.substring(nameEQ.length,c.length)); //解码并截取我们要值
	    }
	  }
	  return false;
	},
	//清除cookie
	clearCookie:function(name) {
	  setCookie(name, "", -1);
	},
	//设置cookie
	setCookie:function(name, value, seconds) {
	  seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
	  var expires = "";
	  if (seconds != 0 ) { //设置cookie生存时间
	    var date = new Date();
	    date.setTime(date.getTime()+(seconds*1000));
	    expires = "; expires="+date.toGMTString();
	  }
	  document.cookie = name+"="+escape(value)+expires+"; path=/"; //转码并赋值
	},
	//获取16位随机字符串
	getnonceStr:function (num){
		var noncstr = '';
		if(!num){
			num = 16;
		}
		var arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
				   'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
					1,2,3,4,5,6,7,8,9,0];
		for(var i = 0;i<num;i++){
			var s = parseInt(Math.random()*arr.length);
			noncstr+=arr[s];
		}
		return noncstr;
	},
	//判断是否是类数组
	isArrayLike:function(o){
		if(o&&
			typeof 0 === 'object'&&
			isFinite(o.length)&&
			o.length >=0 &&
			o.length ===Math.floor(o.length)&&
			o.length<4294967296
			)
			return true;
		else 
			return false;
	},
	//判断是否是数组
	isArray:function(o){
		return typeof o === 'object'&&
		Object.prototype.toString.call(o) === '[object Array]';
	},
	//查找数组中出现的x，返回包含索引的和数组
	findall:function(a,x){
		var results = [],
			len = a.length,
			pos = 0;
		while(pos<len){
			pos = a.indexOf(x,pos);
			if(pos === -1) break;
			results.push(pos);
			pos = pos+1;
		}
		return results;
	},
	//可以接收任何实参，可以递归处理实参
	flexisum:function(a){
		var total = 0;
		for(var i = 0; i<arguments.length; i++){
			var element = arguments[i],n;
			if(element == null) continue;
			if(isArray(element))
				n = flexisum.apply(this,element);
			else if(typeof element === 'function')
				n = Number(element());
			else
				n = Number(element);
			if(isNaN(n))
				throw Error("flexisum(): can't convert "+element+" to number");
			total += n;
		}
		return total;
	},
	/*cookie*/
	setCookie:function (c_name,value,expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	},
	//取回cookie
	getCookie:function (c_name){
		if (document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1){
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end))
			}
		}
		return ""
	}

}

