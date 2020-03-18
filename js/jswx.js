js.wx={};
js.wx.alert=function(msg,fun,tit, cof1){
	$('#weui_dialog_alert_div').remove();
	var s='';
	//if(!tit)tit='系统提示';
	s+='<div id="weui_dialog_alert_div">';
    s+='<div class="weui-mask"></div>';
    s+='<div class="weui-dialog">';
    if(tit)s+='    <div class="weui-dialog__hd"><strong class="weui-dialog__title">'+tit+'</strong></div>';
    s+='    <div class="weui-dialog__hd">'+msg+'</div>';
    s+='    <div class="weui-dialog__ft">';
	s+='        <a href="javascript:;" id="confirm_btn" sattr="yes" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>';
    if(cof1==1)s+='       <a href="javascript:;" id="confirm_btn1" sattr="no" class="weui-dialog__btn weui-dialog__btn_default">取消</a>';
    s+='   </div>';
    s+='</div>';
	s+='</div>';
	$('body').append(s);
	function backl(e){
		var jg	= $(this).attr('sattr');
		if(typeof(fun)=='function')fun(jg,this);
		$('#weui_dialog_alert_div').remove();
		return false;
	}
	$('#confirm_btn1').click(backl);
	$('#confirm_btn').click(backl);
}
js.wx.confirm=function(msg,fun,tit){
	this.alert(msg,fun,tit, 1);
}
js.wx.prompt=function(tit,msg,fun,nr){
	if(!nr)nr='';
	var msg = '<div align="left">'+msg+'</div><div align="left"><input value="'+nr+'" class="r-input" id="prompttxt" type="text"></div>';
	function func(lx){
		if(lx=='yes')fun(get('prompttxt').value);
	}
	this.alert(msg,func,tit, 1);
}
js.wx.load=function(txt){
	this.unload();
	if(txt=='none')return;
	if(!txt)txt='';
	var s='';
	var t = winHb()-150;
	s+='<div id="loadingToastsss">'+
    '<div class="weui-mask_transparent"></div>'+
    '<div class="weui-toast" style="top:'+(t*0.5)+'px">'+
    '   <i class="weui-loading weui-icon_toast"></i>'+
    '   <p class="weui-toast__content">'+txt+'</p>'+
    '</div>'+
	'</div>';
	$('body').append(s);
}
js.wx.unload=function(){
	$('#loadingToastsss').remove();
}
js.loading=function(txt){
	this.wx.load(txt);
}
js.unloading=function(){
	this.wx.unload();
}
js.wx.msgok=function(txt,fun,ms, lx){
	$('#toastssss').remove();
	clearTimeout(this.msgtime);
	if(txt=='none')return;
	if(!ms)ms=3;
	var t = winHb()-150;
	var s='<div id="toastssss" onclick="$(this).remove()">';
	s+='<div class="weui-mask_transparent"></div>';
	s+=	'<div class="weui-toast" style="top:'+(t*0.5)+'px;">';
	if(!lx){
		s+=	'	<i class="weui-icon-success-no-circle weui-icon_toast"></i>';
		s+=		'<p class="weui-toast_content" style="padding:5px">'+txt+'</p>';
	}else{
		var icss = 'weui-icon-cancel',col='red';
		if(typeof(lx)=='string'){icss='icon icon-'+lx+'';col='';}
		s+=		'<span  style="font-size:50px"><i style="font-size:50px" class="'+icss+'"></i></span>';
		s+=		'<p class="weui-toast_content" style="color:'+col+';padding:5px">'+txt+'</p>';
	}
	s+=	'</div>';
	s+='</div>';
	$('body').append(s);
	this.msgtime=setTimeout(function(){
		$('#toastssss').remove();
		if(typeof(fun)=='function')fun();

	}, ms*1000);
}
js.wx.msgerror=function(txt,fun,ms){
	this.msgok(txt,fun,ms, true);
}

js.showmenu=function(d){
	
	
	$('#menulistshow').remove();
	var d=js.apply({width:200,top:'50%',renderer:function(){},align:'center',onclick:function(){},oncancel:function(){}},d);
	var a=d.data;
	if(!a)return;
	var h1=$(window).height(),h2=document.body.scrollHeight,s1;
	if(h2>h1)h1=h2;
	var col='';
	var s='<div onclick="$(this).remove();" align="center" id="menulistshow" style="background:rgba(0,0,0,0.5);height:'+h1+'px;width:100%;position:absolute;left:0px;top:0px;z-index:198" >';
	s+='<div id="menulistshow_s" style="width:'+d.width+'px;margin-top:'+d.top+';position:fixed;-webkit-overflow-scrolling:touch" class="menulist r-border-r r-border-l">';
	for(var i=0;i<a.length;i++){
		s+='<div oi="'+i+'" style="text-align:'+d.align+';color:'+a[i].color+'" class="r-border-t">';
		s1=d.renderer(a[i]);
		if(s1){s+=s1}else{s+=''+a[i].name+'';}
		s+='</div>';
	}
	s+='</div>';
	s+='</div>';
	$('body').append(s);
	var mh = $(window).height();
	var l=($(window).width()-d.width)*0.5,o1 = $('#menulistshow_s'),t = (mh-o1.height()-10)*0.5;
	if(t<10){
		t = 10;
		o1.css({height:''+(mh-20)+'px','overflow':'auto'});
	}
	o1.css({'left':''+l+'px','margin-top':''+t+'px'});
	$('#menulistshow div[oi]').click(function(){
		var oi=parseFloat($(this).attr('oi'));
		d.onclick(a[oi],oi);
	});
	$('#menulistshow').click(function(){
		$(this).remove();
		try{d.oncancel();}catch(e){}
	});
};

js.wx.actionsheet=function(d){
	$('#actionsheetshow').remove();
	var d=js.apply({onclick:function(){},oncancel:function(){}},d);
	var a=d.data,s='';
	if(!a)return;
	s+='<div onclick="$(this).remove();"  id="actionsheetshow">';
	s+='<div class="weui-mask" style="display:block"></div>';
	s+='<div class="weui-actionsheet weui-actionsheet_toggle" >';
	if(d.title)s+='<div class="weui-actionsheet__title"><p class="weui-actionsheet__title-text">'+d.title+'</p></div>';
	s+='	<div class="weui-actionsheet__menu">';
	for(var i=0;i<a.length;i++){
		s+='<div oi="'+i+'" style="color:'+a[i].color+'" class="weui-actionsheet__cell">'+a[i].name+'</div>';
	}
	s+='	</div>';
	s+='	<div class="weui-actionsheet__action"><div class="weui-actionsheet__cell" id="actionsheet_cancel">取消</div></div>';
	s+='</div>';
	s+='</div>';
	$('body').append(s);
	$('#actionsheetshow div[oi]').click(function(){
		var oi=parseFloat($(this).attr('oi'));
		d.onclick(a[oi],oi);
	});
	$('#actionsheetshow').click(function(){
		$(this).remove();
		try{d.oncancel();}catch(e){}
	});
}

js.isqywx=false;
js.iswxbo=function(){
	var bo = true;
	var ua = navigator.userAgent.toLowerCase(); 
	if(ua.indexOf('micromessenger')<0)bo=false;
	if(bo && ua.indexOf('wxwork')>0)js.isqywx=true;
	return bo;
}


rockconfirm=function(msg, fun, tit){
	if(!tit)tit='';
	if(isapp){
		plus.nativeUI.confirm(msg, function(e){
			var jg = 'no';
			if(e.index==0)jg='yes';
			fun(jg);
		});
	}else if(apicloud){
		api.confirm({
			title: tit,
			msg: msg,
			buttons: ['确定', '取消']
		}, function(ret, err) {
			var jg = 'no';
			if(ret.buttonIndex==1)jg='yes';
			fun(jg);
		});
	}else{
		js.wx.confirm(msg, fun, tit);
	}
}
rockprompt=function(tit,msg,fun,nr){
	if(!nr)nr='';if(!tit)tit='';
	if(apicloud){
		api.prompt({
			title:tit,
			msg:msg,
			text:nr,
			buttons: ['确定','取消']
		}, function(ret, err) {
			if(ret.buttonIndex==1)fun(ret.text);
		});
	}else{
		js.wx.prompt(tit,msg,fun,nr);
	}
}
rockalert=function(msg,fun){
	if(!fun)fun=function(){}
	if(apicloud){
		api.alert({
			title: '',
			msg: msg,
		}, function(ret, err) {
			if(ret.buttonIndex==1)fun();
		});
	}else{
		js.wx.alert(msg, fun);
	}
}