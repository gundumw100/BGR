
function log(str){
	console.log(str);
}
function stringify(data){
	return JSON.stringify(data);
}
function isNull(data){
	return (data==null||data=="undefined"||data.length==0);
}

function Rad(d){
  return d * Math.PI / 180.0;
}

function GetDistance(lat1,lng1,lat2,lng2){
   var radLat1 = Rad(lat1);
   var radLat2 = Rad(lat2);
   var a = radLat1 - radLat2;
   var  b = Rad(lng1) - Rad(lng2);
   var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
   Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
   s = s *6378.137 ;// EARTH_RADIUS;
   s = 0.62*Math.round(s * 10000) / 10000;
   s=s.toFixed(0);
   return s+"mi";
}
		
function getCurTime(timezone) {
//	calendar.setTimeZone(TimeZone.getTimeZone("America/Los_Angeles"));
	if(timezone==null||timezone.length<3){
		return "";
	}
	var detal=parseInt(timezone.substring(3))*3600000;
	d = new Date();
	utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	nd = new Date(utc + detal);
//	return nd.toLocaleTimeString();
	return nd.format("hh:mm:ss");
}

function getCurWeek(timezone) {
	if(timezone==null||timezone.length<3){
		return "";
	}
	var detal=parseInt(timezone.substring(3))*3600000;
	d = new Date();
	utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	nd = new Date(utc + detal);
	if(nd.getDay()==0){
		return 7;
	}
	return nd.getDay();
}

function getCurWeek(){
	var day=new Date().getDay();
	if(day==0){
		return 7;
	}
	return day;
}

function getIntTime(time) {
	var Hm= new Array();
	Hm = time.split(":",2);
	var h=parseInt(Hm[0],10);
	if(h>=24){
		h-=24;
	}
	if(h<0){
		h+=24;
	}
	return h * 60 + parseInt(Hm[1]);
}

function getCurMillTime(){
	return new Date().getTime();
}

/**
 * 
 * @param date MM/dd/yyyy
 */
function getMillTime(date){
	if(date.length<10){
		return;
	}
	var m=date.substring(0,2);
	var d=date.substring(3,5);
	var y=date.substring(6,10);
	var n=new Date();
	n.setFullYear(y,m-1,d);
	return n.getTime();
}
/**
 * @param store
 * @return 0 open ;1 closed
 */
function isStoreOpen(item){
	var status = 1;
	var week = getCurWeek(item.timezone).toString();
	var curTime=getCurTime(item.timezone);
	var time = getIntTime(curTime);//22:05:00
//	console.log(week+";"+curTime+";"+time);//3;04:13:56;253
	var businessHours = item.businessHours.split(";");
	var time0 = businessHours[0].split(",");//123456,11:00 - 22:00
	var time1 = businessHours[1].split(",");//7,11:00 - 21:00
//	log(item.storeName+";week="+week+";item.timezone="+item.timezone+";curTime="+curTime+";time="+time+";time0[0]="+time0[0]+";time0[1]="+time0[1]);
	if (time0[0].indexOf(week) != -1) {
		var start = getIntTime(time0[1].split("-")[0].trim());//08:00
		var end = getIntTime(time0[1].split("-")[1].trim());//22:00
//		log("start="+start+";end="+end);
		if(start>=end){//660>=1320
			if (time > start || time < end) {
				status = 0;
			}
		}else{
			if (time > start && time < end) {//1310>660&&1310<1320
				status = 0;
			}
		}
	} else {
		if (time1[0].indexOf(week) != -1) {
			var start = getIntTime(time1[1].split("-")[0].trim());
			var end = getIntTime(time1[1].split("-")[1].trim());
			if(start>=end){
				if (time > start || time < end) {
					status = 0;
				}
			}else{
				if (time > start && time < end) {
					status = 0;
				}
			}
		}
	}
	return status;
}

function getStoreOpenRemainingTime(item){
	var openStatus="[OPEN]";
	if(item.timezone==null||item.timezone.length<3){
		openStatus="[CLOSE]";
	}else{
		var curTime=getIntTime(getCurTime(item.timezone));//22:07:46-->1344
		var week = getCurWeek(item.timezone).toString();
		var businessHours = item.businessHours.split(";");
		var time0 = businessHours[0].split(",");//123456,11:00 - 22:00
		var time1 = businessHours[1].split(",");//7,11:00 - 21:00
	//	log("week====="+week+";time0[0]====="+time0[0]);
		if (time0[0].indexOf(week) != -1) {
			var start=getIntTime(time0[1].split("-")[0].trim());//
			var delta=start-curTime;
			if(delta<0){
				delta=24*60+delta;
			}
			var t=Math.ceil(delta/60);
			if(t==0){
				t=delta;
				openStatus="[OPEN IN "+t+" MINUTES]";
			}else{
				openStatus="[OPEN IN "+t+" HOURS]";
			}
		}else{
			if (time1[0].indexOf(week) != -1) {
				var start=getIntTime(time1[1].split("-")[0].trim());//
				var delta=start-curTime;
				if(delta<0){
					delta=24*60+delta;
				}
				var t=Math.ceil(delta/60);
				if(t==0){
					t=delta;
					openStatus="[OPEN IN "+t+" MINUTES]";
				}else{
					openStatus="[OPEN IN "+t+" HOURS]";
				}
			}else{
				openStatus="[CLOSE]";
			}
		}
	}
	return openStatus;
}

function formatPhoneNumber(phone){
	if(phone==null||phone=="undefined"){
		return "";
	}
	var length=phone.length;
	var s="";
	for(var i=0;i<length;i++){
		s+=phone.charAt(i);
		if(i==2||i==5){
			s+="-"
		}
	}
	return s;
}

function formatTime(time){
	var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	//var days_simple=["Mon","Tues","Wed","Thurs","Fri","Sat","Sun"];
	var s="";
	var temp=time.split(",")[0];
	if(temp.length>0){
		if(temp=="12345"){
			s+="Monday-Friday , ";
		}
		else if(temp=="123456"){
			s+="Monday-Saturday , ";
		}
		else if(temp=="1234567"){
			s+="Monday-Sunday , ";
		}
		else if(temp=="123457"){
			s+="Monday-Friday , Sunday , ";
		}
		else{
			for(var i=0;i<temp.length;i++){
				var t=temp.charAt(i)
				s+=days[parseInt(t)-1]+" , ";
			}
		}
		temp=time.split(",")[1];
		var times=temp.split("-");
		
		s+=to12Hours(times[0])+" - "+to12Hours(times[1]);
		return s;
	}else{
		return "";
	}
}

function to12Hours(HHmm){
	var t=HHmm.split(":");
	var start=Number(t[0]);
	//log("start="+start);
	var a="am";
	if(start>12){
		start-=12;
		a=" pm";
	}
	if(start<10){
		start="0"+start;
	}
	return start+":"+t[1]+a;
}

function isEmail(email){
	//var patrn=^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w{2,3}){1,3})$;
	//var patrn="/^[a-zA-Z0-9_/-]{1,}@[a-zA-Z0-9_/-]{1,}/.[a-zA-Z0-9_/-.]{1,}$/";
//	if (email.search("^(?://w+//.?)*//w+@(?://w+//.?)*//w+$")!=0) {
//		return true;
//	}
	
	var atpos=email.indexOf("@");
	var dotpos=email.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
	  return false;
	}
	return true;
}

function toPage(pageId){
	curPage=pageId;
	var nextpage = jQuery(pageId);
	setTimeout(function(){
		$.mobile.changePage(nextpage, { transition: "slide"});
		},400
	);
}

function showLoading(){
	$.mobile.showPageLoadingMsg();
}

function hideLoading(){
	$.mobile.hidePageLoadingMsg();
}

function UTCTimeToLocalTime(UTCTime) {
	return UTCTimeToLocalTime(UTCTime,"yyyy-MM-dd hh:mm:ss");
}

function UTCTimeToLocalTime(UTCTime,format) {
	var y2=UTCTime.substr(0,4);
	var mon2=UTCTime.substr(5,2);
	var day2=UTCTime.substr(8,2);
	var h2=UTCTime.substr(11,2);
	var m2=UTCTime.substr(14,2);
	var s2=UTCTime.substr(17,2);
	var d = new Date(y2,mon2-1,day2-1,h2,m2,s2);
	var local = d.getTime() - (d.getTimezoneOffset() * 60000);
	var nd = new Date(local);
	return nd.format(format);
}

Date.prototype.format = function(format){
var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }
    if(/(y+)/.test(format))
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}

/**
 * 能被4整除且不能被100整除 
 * 或
 * 能被100整除且能被400整除
 */
function isLeapYear(year) {
	if (!isNaN(parseInt(year))) {
		if ((pYear % 4 == 0 && pYear % 100 != 0)
				|| (pYear % 100 == 0 && pYear % 400 == 0)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

Array.prototype.remove = function(dx) { 
    if(isNaN(dx)||dx>this.length){return false;} 
    this.splice(dx,1); 
}

function goBack(){
	window.history.back();
}

var appName="BGR";
function showAlert(msg) {
    navigator.notification.alert(
         msg,
         onAlertDismissed, 
         appName, 
          'OK'
       );
}
function onAlertDismissed() {
    // do something
}

function showConfirm(msg) {
	navigator.notification.confirm(
		msg,
		onConfirm,
		appName,
	   ['OK', 'Cancel']
	   );
}

function onConfirm(button) {
	log("curPage="+curPage+";button="+button);
	if(curPage=="#order_page"){
		if(button == 1) {//ok
			return;
		}
	}
}

function doVibrate(){
	navigator.notification.vibrate(1000);
}

function doBeep() {
   	navigator.notification.beep(3);
}

function calSubtotal(myDishes,coupon){
	var subtotal=calSubtotalWithoutCoupon(myDishes);
	var couponOff=calCoupon(subtotal,coupon);
	subtotal-=couponOff;
	return subtotal;
}
function calCoupon(subtotal,coupon){
	var couponOff=0.00;
	if(coupon==null){
	}else{
		if(coupon.couponType==0){//具体Item
			couponOff = coupon.couponAmtOff;
		}else if(coupon.couponType==1){//满减%
			if(subtotal>=coupon.couponPercOffMinVal){
				couponOff = subtotal * coupon.couponPercOff / 100;
			}else{
			}
		}
	}
	return couponOff;
}
function calSubtotalWithoutCoupon(myDishes){
	var subtotal=0.00;
	for(var i=0;i< myDishes.length;i++){
		var dish=myDishes[i];
		if(!isNull(dish)){
			var price=dish.currentPrice;
			if(!isNull(dish.modifiers)){
				for(var j=0;j< dish.modifiers.length;j++){
					price+=dish.modifiers[j].addAmt;
				}
			}
			subtotal+=price*dish.num;
		}
	}
	return subtotal;
}

function calOneDishMoney(dish){
	var subtotal=0.00;
	var price=dish.currentPrice;
	if(!isNull(dish.modifiers)){
		for(var j=0;j< dish.modifiers.length;j++){
			price+=dish.modifiers[j].addAmt;
		}
	}
	return (price*dish.num);
}

function blink(element){
	intrvl = 0;
	for(nTimes=0;nTimes<3;nTimes++){
		intrvl += 200;
//		setTimeout(function(){element.css('background-color', 'red');}, intrvl);
		setTimeout(function(){element.css('border', '1px solid red');}, intrvl);
		intrvl += 200;
//		setTimeout(function(){element.css('background-color', '#ffffff');}, intrvl);
		setTimeout(function(){element.css('border', '0px solid red');}, intrvl);
	}
	element.focus();
}

/**
 * 实现左右抖动的效果,用来提示
 * 参数o就是dom元素的ID，一般就是div的ID。
 * @param o
 */
function shake(o){
    var $panel = $("#"+o);
    box_left = ($(window).width() -  $panel.width()) / 2;
    $panel.css({'left': box_left,'position':'absolute'});
    for(var i=1; 4>=i; i++){
        $panel.animate({left:box_left-(40-10*i)},50);
        $panel.animate({left:box_left+2*(40-10*i)},50);
    }
}

//var demoTimeout;
//function shake(element){
//	element.jrumble({
//		x: 5,
//		y: 0,
//		speed: 50,
//		rotation: 0
//	});
//	
//	clearTimeout(demoTimeout);
//	element.trigger('startRumble');
//	demoTimeout = setTimeout(function(){element.trigger('stopRumble');}, 1000)
//}

/**
 *  当前活动页page的Id
 */
function getActivePageId(){
	return $.mobile.activePage.attr('id');
}

/**
 * 当前活动页是否是Id为test
 */
function isActivePage(pageId){
	$.mobile.activePage.is(pageId);//eg: #test
}
/**
 * 退出程序
 */
function exitApp(){
	navigator.app.exitApp();
}
/**
 * 自定义toast，js实现android中toast效果  
 * @param msg 显示文字
 * @param duration 显示的时间长度
 */
function showToast(msg, duration) {  
    duration = isNaN(duration) ? 3000 : duration;  
    var m = document.createElement('div');  
    m.innerHTML = msg;  
    m.style.cssText = "width:60%; min-width:150px; background:#000; opacity:0.5; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:fixed; top:70%; left:20%; z-index:999999; font-weight:bold;";  
    document.body.appendChild(m);  
    setTimeout(function() {  
        var d = 0.5;  
        m.style.webkitTransition = '-webkit-transform ' + d  
                + 's ease-in, opacity ' + d + 's ease-in';  
        m.style.opacity = '0';  
        setTimeout(function() {  
            document.body.removeChild(m)  
        }, d * 1000);  
    }, duration);  
}

function getImagePath(path,type){
	var suffix=path.substring(path.lastIndexOf("."));
	path=path.substring(0,path.lastIndexOf("/")+1);
	path=path+type+suffix;
	return path;
}
