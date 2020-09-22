var funs = {
	// 验证用户输入的车牌号
	tests:function(){
		var me = this;
		// var province = $('.wh-input-province').text();
		var carnum = $('.wh-input').val().toUpperCase();
		// console.log(province+carnum)
		// var str = '浙AABDSS';
		var regexp = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
		var iscarnum = regexp.test(carnum);
		// console.log(iscarnum)
		if(carnum==''){
			me.showmsg('您输入的车牌号为空',1000);
			$('.wh-input').focus();

			// console.log('您输入的车牌号为空')
		}else{
			if(iscarnum){
				console.log('登陆')
				//发送给后台
				me.ajaxcarnum(carnum)
			}else{
				me.showmsg('您输入的车牌号不正确，请确认车牌号',1000);
				$('.wh-input').focus();
			// console.log('您输入的车牌号不正确，请确认车牌号')
			}
		}
	},
	// 获取url里面的参数
	geturldatas:function(){
		// var keys=[],vals=[];
		var objs = {};
		var url = location.search.slice(1);
		if(url!=''){
			var arr = url.split('&');
			arr.forEach(function(ele,i){
				objs[ele.split('=')[0]] = ele.split('=')[1];
			})
			console.log(objs)
			return objs
		}else{
			return;
		}
	},
	// 从url中获取参数拼接成obj格式，如果没有，返回空{}，这个是被人代码里拉出来的，可以替换上面代码
	param2Obj(url) {
	  const search = url.split('?')[1]
	  if (!search) {
	    return {}
	  }
	  return JSON.parse(
	    '{"' +
	      decodeURIComponent(search)
		.replace(/"/g, '\\"')
		.replace(/&/g, '","')
		.replace(/=/g, '":"')
		.replace(/\+/g, ' ') +
	      '"}'
	  )
	},
	//显示提示框
	showmsg:function(msg,time){
		time = time||500;
		var showtime = 500;
		var $div = $('<div>');
		$div.html(msg);
		$div.css({
			'background':'#474747',
			'position':'fixed',
			'fontSize':'14px',
			'padding':'10px 15px',
			'left':'50%',
			'color':'#fff',
			'transform':'translate(-50%,0)',
			'textAlign':'center',
			'fontFamily':'PingFang',
			'borderRadius':'6px',
			'bottom':'100px',
			'display':'none'
		});

		$div.fadeIn(showtime);

		setTimeout(function(){
			$div.fadeOut(showtime)
			setTimeout(function(){
				$div.remove()
			},showtime)
		},time);
		$('body').append($div);
		return $div;
	},
  	clickcheck:function(cls,id){
		var isall = '';
		isall = $(cls+':checked').length == $(cls).length?true:false;
		$(id)[0].checked = (isall?true:false);
	},
	//全选
	//例子
	//all('#sall','.shengao input');
	all:function(id,cls){
		$(id).click(function(){
			var ischecked = this.checked;
			// console.log(ischecked)
			if(ischecked==true){
				$(cls).each(function(i,e){
					this.checked=true;
				})
			}else{
				$(cls).each(function(i,e){
					this.checked=false;
				})
			}
		})
	},
	getsystem:function(){
	    var u = navigator.userAgent;
	    var system,channel;
	    if(/Alipay/i.test(u)){
		channel = 'ali';
	    }else if(/MicroMessenger/i.test(u)){
		channel = 'weixin';
	    }else{
		channel = 'other';
	    }
	    if(/iPhone/i.test(u)){
		system = 'iPhone';
	    }else if(/Android/i.test(u)){
		system = 'Android';
	    }else{
		system = 'pc';
	    }
	    return [system,channel];
	}
	async getExcel () {
	     // 1充值 2提现
	     let res = await getExcelData(1)
	     // console.log(" getExcel res: ", res)
	     let blob = new Blob([res.data], {
		type: 'application/vnd.ms-excel'
	     })
	     let fileName = '充值列表' + Date.parse(new Date()) + '.xlsx'
	     if (window.navigator.msSaveOrOpenBlob) {
		navigator.msSaveBlob(blob, fileName)
	     } else {
		var link = document.createElement('a')
		link.href = window.URL.createObjectURL(blob)
		link.download = fileName
		link.click()
		// 释放内存
		window.URL.revokeObjectURL(link.href)
	     }
	},
}
