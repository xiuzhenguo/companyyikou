var HOST='',PARAMS='',QOM='rockxinhuoaapp_',apiurl='',TOKEN='',device='',CFROM='webapp',ISDEMO=false,NOWURL='',nwjsgui=false,TOKENKEY='usertoken',apicloud=false,isapp=false;
var windows	= null,ismobile=1,adminid=0;
function initbody(){}
function globalbody(){}
$(document).ready(function(){
	js.getsplit();
	HOST = js.gethost();
	var ttpe= js.request(TOKENKEY);
	if(ttpe)js.setoption(TOKENKEY, ttpe);
	TOKEN 	= js.getoption(TOKENKEY);
	device	= js.getoption('deviceid');
	if(device=='')device=js.now('time');
	js.setoption('deviceid', device);
	globalbody();
	initbody();
});
var js={path:'index',url:'',bool:false,login:{},initdata:{},openarr:{},scroll:function(){}};
var isIE=true;
if(!document.all)isIE=false;
var get=function(id){return document.getElementById(id)};
var isempt=function(an){var ob	= false;if(an==''||an==null||typeof(an)=='undefined'){ob=true;}if(typeof(an)=='number'){ob=false;}return ob;}
var strreplace=function(str){if(isempt(str))return '';return str.replace(/[ ]/gi,'').replace(/\s/gi,'')}
var strhtml=function(str){if(isempt(str))return '';return str.replace(/\</gi,'&lt;').replace(/\>/gi,'&gt;')}
var form=function(an,fna){if(!fna)fna='myform';return document[fna][an]}
var xy10=function(s){var s1=''+s+'';if(s1.length<2)s1='0'+s+'';return s1;};
js.getarr=function(caa,bo){
	var s='';
	for(var a in caa)s+=' @@ '+a+'=>'+caa[a]+'';
	if(!bo)alert(s);
	return s;
}

js.str=function(o){
	o.value	= strreplace(o.value);
}

js.getcan = function(i,dev){
	var a = PARAMS.split('-');
	var val = '';
	if(!dev)dev='';
	if(a[i])val=a[i];
	if(!val)val=dev;
	return val;
}
js.gethost=function(){
	var url = location.href,sau='';
	try{sau = url.split('//')[1].split('/')[0];}catch(e){}
	if(sau.indexOf('demo.rockoa.com')>=0)ISDEMO=true;
	var urls= url.replace('//','[()]');
	var lse = urls.indexOf('/');
	NOWURL 	= urls.substr(0, lse+1).replace('[()]','//');
	return sau;
}
function winHb(){
	var winH=(!isIE)?window.innerHeight:document.documentElement.offsetHeight;
	return winH;
}
function winWb(){
	var winH=(!isIE)?window.innerWidth:document.documentElement.offsetWidth;
	return winH;
}
js.scrolla	= function(){
	var top	= $(document).scrollTop();
	js.scroll(top);
}
js.request=function(name,dev,url){
	if(!dev)dev='';
	if(!name)return dev;
	if(!url)url=location.href;
	if(url.indexOf('\?')<0)return dev;
	if(url.indexOf('#')>0)url = url.split('#')[0];
	var neurl=url.split('\?')[1];
	neurl=neurl.split('&');
	var value=dev,i,val;
	for(i=0;i<neurl.length;i++){
		val=neurl[i].split('=');
		if(val[0].toLowerCase()==name.toLowerCase()){
			value=val[1];
			break;
		}
	}
	if(!value)value='';
	return value;
}
js.now=function(type,sj){
	if(!type)type='Y-m-d';
	if(type=='now')type='Y-m-d H:i:s';
	var dt,ymd,his,weekArr,Y,m,d,w,H=0,i=0,s=0,W;
	if(typeof(sj)=='string')sj=sj.replace(/\//gi,'-');
	if(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(sj)){
		sj=sj.split(' ');
		ymd=sj[0];
		his=sj[1];if(!his)his='00:00:00';
		ymd=ymd.split('-');
		his=his.split(':');
		H = his[0];if(his.length>1)i = his[1];if(his.length>2)s = his[2];
		dt=new Date(ymd[0],ymd[1]-1,ymd[2],H,i,s);
	}else{
		dt=(typeof(sj)=='number')?new Date(sj):new Date();
	}
	weekArr=new Array('日','一','二','三','四','五','六');
	Y=dt.getFullYear();
	m=xy10(dt.getMonth()+1);
	d=xy10(dt.getDate());
	w=dt.getDay();
	H=xy10(dt.getHours());
	i=xy10(dt.getMinutes());
	s=xy10(dt.getSeconds());
	W=weekArr[w];
	if(type=='time'){
		return dt.getTime();
	}else{
		return type.replace('Y',Y).replace('m',m).replace('d',d).replace('H',H).replace('i',i).replace('s',s).replace('w',w).replace('W',W);
	}
}
js.float=function(num,w){
	if(isNaN(num)||num==''||!num||num==null)num='0';
	num=parseFloat(num);
	if(!w&&w!=0)w=2;
	var m=num.toFixed(w);
	return m;	
}
js.splittime=0;
js.getsplit=function(){
	if(!js.servernow)return false;
	var dt=js.now('Y-m-d H:i:s');
	var d1=js.now('time',dt);	
	var d2=js.now('time',js.servernow);
	js.splittime=d1-d2;
}
js.serverdt=function(atype){
	if(!atype)atype='Y-m-d H:i:s';
	var d1=js.now('time')-js.splittime;
	var dt=js.now(atype,d1);
	return dt;
}
js.isimg = function(lx){
	var ftype 	= '|png|jpg|bmp|gif|jpeg|';
	var bo		= false;
	if(ftype.indexOf('|'+lx+'|')>-1)bo=true;
	return bo;
}
js.decode=function(str){
	var arr	= {length:-1};
	try{
		arr	= new Function('return '+str+'')();
	}catch(e){}
	return arr;
}
js.email=function(str){
	if(isempt(str) || str.indexOf(' ')>-1)return false;
	if(str.indexOf('.')==-1 || str.indexOf('@')==-1)return false;
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(str))return false ;
	return true;
}
js.formatsize=function(size){
	var arr = new Array('Byte', 'KB', 'MB', 'GB', 'TB', 'PB');
	var e	= Math.floor(Math.log(size)/Math.log(1024));
	var fs	= size/Math.pow(1024,Math.floor(e));
	return js.float(fs)+' '+arr[e];
}
js.getselectval=function(o){
	var str='';
	for(var i=0;i<o.length;i++){
		if(o[i].selected){
			str+=','+o[i].value+'';
		}
	}
	if(str!='')str=str.substr(1);
	return str;
}
js.setselectval=function(o,val){
	var str='',vals=','+val+',';
	for(var i=0;i<o.length;i++){
		if(vals.indexOf(','+o[i].value+',')>-1){
			o[i].selected=true;
		}
	}
}
js.getformdata=function(nas){
	var da	={},ona='',o,type,val,na,i,obj;
	if(!nas)nas='myform';
	obj	= document[nas];
	for(i=0;i<obj.length;i++){
		o 	 = obj[i];type = o.type,val = o.value,na = o.name;
		if(o.disabled || !na)continue;
		if(type=='checkbox'){
			val	= '0';
			if(o.checked)val='1';
			da[na]	= val;
		}else if(type=='radio'){
			if(o.checked)da[na]	= val;					
		}else{
			da[na] = val;
		}
		if(na.indexOf('[]')>-1){
			if(ona.indexOf(na)<0)ona+=','+na+'';
		}
	}
	if(ona != ''){
		var onas = ona.split(',');
		for(i=1; i<onas.length; i++){
			da[onas[i].replace('[]','')] = js.getchecked(onas[i]);
		}
	}
	return da;
}
js.getdata = function(na,da){
	if(!da)da={};
	var obj	= $('#'+na+'');
	var inp	= obj.find('input,select');
	for(var i=0;i<inp.length;i++){
		var type	= inp[i].type;
		var val		= inp[i].value;
		if(type=='checkbox'){
			val	= '0';
			if(inp[i].checked)val='1';
		}
		var ad1	= inp[i].name;
		if(!ad1)ad1 = inp[i].id;
		da[ad1]	= val;
	}
	return da;
}
js.selall = function(o,na,bh){
	var i,oi1;
	if(bh){
		o1=$("input[name^='"+na+"']");
	}else{
		o1=$("input[name='"+na+"']");
	}
	for(i=0;i<o1.length;i++){
		if(!o1[i].disabled)o1[i].checked = o.checked;
	}
}
js.getchecked=function(na,bh){
	var s = '';
	var o1;
	if(bh){
		o1=$("input[name^='"+na+"']");
	}else{
		o1=$("input[name='"+na+"']");
	}
	for(var i=0;i<o1.length;i++){
		if(o1[i].checked && !o1[i].disabled)s+=','+o1[i].value+'';
	}
	if(s!='')s=s.substr(1);
	return s;
}
js.cookie=function(name){
	var str=document.cookie,cda,val='',arr,i;
	if(str.length<=0)return '';
	arr=str.split('; ');
	for(i=0;i<arr.length;i++){
		cda=arr[i].split('=');
		if(name.toLowerCase()==cda[0].toLowerCase()){
			val=cda[1];
			break;
		}
	}
	if(!val)val='';
	return val;
}
js.savecookie=function(name,value,d){
	var expires = new Date();
	if(!d)d=365;
	if(!value)d=-10;
	expires.setTime(expires.getTime()+d*24*60*60*1000);
	var str=''+name+'='+value+';expires='+expires.toGMTString()+';path=/';
	document.cookie = str;
}
js.backtop=function(ci){
	if(!ci)ci=0;
	$('body,html').animate({scrollTop:ci});
	return false;
}
js.backto = function(oid){
	if(!get(oid))return;
	var of	= $('#'+oid+'').offset();
	this.backtop(of.top);
	return false;
}
js.applyIf=function(a,b){
	if(!a)a={};
	if(!b)b={};
	for(var c in b)if(typeof(a[c])=='undefined')a[c]=b[c];
	return a;
}
js.apply=function(a,b){
	if(!a)a={};
	if(!b)b={};
	for(var c in b)a[c]=b[c];
	return a;
}
js.focusval	= '0';
js.number=function(obj){
	val=strreplace(obj.value);
	if(!val){
		obj.value=js.focusval;
		return false;
	}
	if(isNaN(val)){
		js.msg('msg','输入的不是数字');
		obj.value=js.focusval;
		obj.focus();
	}else{
		var o1 = $(obj);
		var min= o1.attr('minvalue');
		if(isempt(min))min= o1.attr('min');
		if(min && parseFloat(val)<parseFloat(min))val=min;
		var max= o1.attr('maxvalue');
		if(isempt(max))max= o1.attr('max');
		if(max && parseFloat(val)>parseFloat(max))val=max;
		obj.value=val;
	}
}
js.setmsg=function(txt,col,ids){
	if(!ids)ids='msgview';
	$('#'+ids+'').html(js.getmsg(txt,col));
}
js.getmsg  = function(txt,col){
	if(!col)col='red';
	var s	= '';
	if(!txt)txt='';
	if(txt.indexOf('...')>0){
		s='<img src="images/loading.gif" height="16" width="16" align="absmiddle"> ';
		col = '#ff6600';
	}	
	s+='<span style="color:'+col+'">'+txt+'</span>';
	if(!txt)s='';
	return s;
}
js.debug	= function(s){
	if(typeof(console)!='object')return;
	console.log(s);
}
js.msg = function(lx, txt,sj){
	clearTimeout(this.msgshowtime);
	if(typeof(sj)=='undefined')sj=5;
	$('#msgshowdivla').remove();
	if(lx == 'none' || !lx){
		return;
	}
	if(lx == 'wait'){
		txt	= '<img src="/images/loadings.gif" height="14" width="15" align="absmiddle"> '+txt;
		sj	= 60;
	}
	if(lx=='msg')txt='<font color=red>'+txt+'</font>';var t=60;
	var s = '<div onclick="$(this).remove()" id="msgshowdivla" style="position:fixed;top:'+t+'px;z-index:9999" align="center"><div style="padding:8px 20px;background:rgba(0,0,0,0.7);color:white;font-size:16px;border-radius:5px">'+txt+'</div></div>';
	$('body').append(s);
	var w=$('#msgshowdivla').width(),l=(winWb()-w)*0.5;
	$('#msgshowdivla').css('left',''+l+'px');
	if(sj>0)this.msgshowtime= setTimeout("$('#msgshowdivla').remove()",sj*1000);	
}
js.repempt=function(stt,v){
	var s = stt;
	if(isempt(s))s=v;
	return s;
}
js.getrand=function(){
	var r;
	r = ''+new Date().getTime()+'';
	r+='_'+parseInt(Math.random()*9999)+'';
	return r;
}

js.reload = function(){
	location.reload();
}
js.unloading=function(){}
js.ajaxerror=function(){}
js.ajax = function(url,da,fun,type,efun){
	if(!da)da={};if(!type)type='get';
	if(typeof(fun)!='function')fun=function(){};
	if(typeof(efun)=='string' && efun)js.loading(efun);
	if(typeof(efun)!='function')efun=function(){};
	js.ajaxbool=true;
	var urla = url.split('|');
	url	= apiurl+'api.php?a='+urla[1]+'&m='+urla[0]+'';
	if(urla[2]!='none')url+='&adminid='+adminid+'&token='+TOKEN+'';
	url+='&cfrom='+CFROM+'';
	var ajaxcan={
		type:type,data:da,url:url,dataType:'json',
		success:function(ret){
			js.ajaxbool=false;
			js.unloading();
			if(ret.success){
				fun(ret);
			}else{
				js.msg('msg', ret.msg);
				efun(ret.msg,ret.code, ret);
				js.ajaxerror(ret.msg,ret.code);
			}
		},error:function(e){
			js.unloading();
			js.ajaxbool=false;
			var msg = e.responseText;
			if(!msg)msg='error:请求出错了';
			js.msg('msg',msg);
			js.debug(e);
			efun(msg, 500);
			js.ajaxerror(msg, 500);
		}
	};
	if(apicloud){
		api.ajax({url:url,tag:'xinhu',method:type,data:{values:da}},function(ret,err){if(ret){ajaxcan.success(ret);}else{ajaxcan.error(err);}});
	}else{
		$.ajax(ajaxcan);
	}
}
js.ajaxbase=function(url,da,fun,type,efun){
	if(typeof(fun)!='function')fun=function(){};
	if(typeof(efun)!='function')efun=function(){};
	if(!type)type='get';
	if(!da)da={};
	var ajaxcan={
		type:type,data:da,url:url,
		success:function(ret){
			fun(ret);
		},error:function(e){
			js.debug(e);
			efun(e.responseText);
		}
	};
	$.ajax(ajaxcan);
}

js.setoption=function(k,v,qzb){
	if(!qzb)k=QOM+k;
	try{
		if(isempt(v)){
			localStorage.removeItem(k);
		}else{
			localStorage.setItem(k, escape(v));
		}
	}catch(e){
		js.savecookie(k,escape(v));
	}
	return true;
}
js.getoption=function(k,dev, qzb){
	var s = '';
	if(!qzb)k=QOM+k;
	try{s = localStorage.getItem(k);}catch(e){s=js.cookie(k);}
	if(s)s=unescape(s);
	if(isempt(dev))dev='';
	if(isempt(s))s=dev;
	return s;
}
js.location = function(url){
	location.href = url;
}
js.back=function(){
	if(isapp){
		var ws=plus.webview.currentWebview();
		ws.close('auto');
		return;
	}
	history.back();
	try{api.closeWin();}catch(e){}
}
js.importjs=function(url,fun){
	var sid = jm.encrypt(url);
	if(!fun)fun=function(){};
	if(get(sid)){fun();return;}
	var scr = document.createElement('script');
	scr.src = url;
	scr.id 	= sid;
	if(isIE){
		scr.onreadystatechange = function(){
			if(this.readyState=='loaded' || this.readyState=='complete'){fun(this);}
		}
	}else{
		scr.onload = function(){fun(this);}
	}
	document.getElementsByTagName('head')[0].appendChild(scr);
	return false;	
}

js.replacecn=function(o1){
	var  val = strreplace(o1.value);
	val		 = val.replace(/[\u4e00-\u9fa5]/g,'');
	o1.value =val;
}

js.setselectdata = function(o, data, vfs, devs){
	var i,ty = data,sv;
	if(!data)return;	
	if(!vfs)vfs='name';	
	if(typeof(devs)=='undefined')devs=-1;
	for(i=0;i<ty.length;i++){
		o.options.add(new Option(ty[i].name,ty[i][vfs]));
		if(i==devs)sv=ty[i][vfs];
	}
	if(sv)o.value=sv;
}

js.initbtn = function(obj){
	var o = $("[clickevt]"),i,o1,cl;
	for(i=0; i<o.length; i++){
		o1	= $(o[i]);
		cl	= o1.attr('clickadd');
		if(cl!='true'){
			o1.click(function(eo){
				var cls = $(this).attr('clickevt');
				if(typeof(cls)=='string'){
					cls=cls.split(',');
					obj[cls[0]](this, cls[1], cls[2], eo);
				}
				return false;
			});
		}
	}
	o.attr('clickadd','true');
}
js.fileall=',aac,ace,ai,ain,amr,app,arj,asf,asp,aspx,av,avi,bin,bmp,cab,cad,cat,cdr,chm,com,css,cur,dat,db,dll,dmv,doc,docx,dot,dps,dpt,dwg,dxf,emf,eps,et,ett,exe,fla,ftp,gif,hlp,htm,html,icl,ico,img,inf,ini,iso,jpeg,jpg,js,m3u,max,mdb,mde,mht,mid,midi,mov,mp3,mp4,mpeg,mpg,msi,nrg,ocx,ogg,ogm,pdf,php,png,pot,ppt,pptx,psd,pub,qt,ra,ram,rar,rm,rmvb,rtf,swf,tar,tif,tiff,txt,url,vbs,vsd,vss,vst,wav,wave,wm,wma,wmd,wmf,wmv,wps,wpt,wz,xls,xlsx,xlt,xml,zip,';
js.filelxext = function(lx){
	if(js.fileall.indexOf(','+lx+',')<0)lx='wz';
	return lx;
}

js.apiurl = function(m,a,cans){
	var url=''+apiurl+'api.php?m='+m+'&a='+a+'';
	url+='&cfrom='+CFROM+'';
	if(!cans)cans={};
	cans.token=TOKEN;
	cans.adminid=adminid;
	for(var i in cans)url+='&'+i+'='+cans[i]+'';
	return url;
}