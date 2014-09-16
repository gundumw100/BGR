var whichPageToModifierPage=0;
var whichPageToCouponsPage=0;
var isPanelOpen=false;
var needRefreshFoodMenuPage=false;
var whichPageToLevelUpSignInPage=0;
var refreshMap=true;
//comm
function resetMainMenu(user){
	if(user.isLogin){
		$("#mypanel #signIn").hide();
		$("#mypanel #signUp").hide();
		$("#mypanel #orders").show();
		$("#mypanel #reward").show();
		$("#mypanel #prizes").hide();
		$("#mypanel #cards").show();
		$("#mypanel #favorites").show();
		$("#mypanel #signOut").show();
		doCommandLoginAllNum();
	}else{
		$("#mypanel #signIn").show();
		$("#mypanel #signUp").show();
		$("#mypanel #orders").hide();
		$("#mypanel #reward").hide();
		$("#mypanel #prizes").hide();
		$("#mypanel #cards").hide();
		$("#mypanel #favorites").hide();
		$("#mypanel #signOut").hide();
	}
	
	resetSettingPage();
}

function resetSettingPage(){
	if(user.isLogin){
		$("#setting_page #myProfile").show();
		$("#setting_page #selectCard").show();
	}else{
		$("#setting_page #myProfile").hide();
		$("#setting_page #selectCard").hide();
	}
}

//homepage JS start
$(document).delegate('#homepage', 'pageshow', function () {
	curPage="homepage";
	needMyOrdersPageRefresh=true;
    whichPageToSignUpPage=0;
//	$("#homepage #search").val("");
	if(needHomePageRefresh){
		needHomePageRefresh=false;
		doCommandFindStoreList(appConfig,user,curPosition);
	}
});

$(document).delegate('#map_page', 'pageshow', function () {
	curPage="map_page";
	if(refreshMap){
		refreshMap=false;		
		resizeMap();
	}
});

function doSearch(){
	doCommandFindStoreList(appConfig,user);
}

function doCommandLoginAllNum(){
	var senddata = {};
	senddata.sid = user.sid;
	ajax(COMMAND_LOGIN_ALL_NUM,LOGIN_ALL_NUM_URL,senddata);
}
function doCommandSid(){
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	ajax(COMMAND_SEND_SID,SEND_SID_URL,senddata);
}

var showCheckVersionAlert=false;
function doCommandCheckVersion(appConfig,flag){
	showCheckVersionAlert=flag;
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.type = appConfig.type;
	senddata.name = appConfig.appName;
	ajax(COMMAND_FIND_VERSION,FIND_VERSION_URL,senddata);
}

//function closePanel(){
//	$( "#homepage #mypanel" ).panel( "close" );
//}

//function toMyOrdersPage() {
//	toPage("#my_orders_page");
//}

function toMyPaymentCardPage() {
	if(user.isLogin==false){
		toPage("#sign_in_page");
		return;
	}
	if(isNull(user.accessToken)){
		whichPageToLevelUpSignInPage=1;
		toPage("#levelup_signin_page");
	}else{
		toPage("#my_payment_card_page");
	}
}

//function toMyFavoritesPage() {
//	toPage("#my_favorites_page");
//}
//
function toSignInPage() {
	toPage("#sign_in_page");
}

var whichPageToSignUpPage=0;
function toSignUpPage(){
	whichPageToSignUpPage=1;
	toPage("#sign_up_page");
}

//function toSettingPage(){
//	toPage("#setting_page");
//}

function toSignOutPage() {
	var senddata = {};
	senddata.sid = user.sid;
	ajax(COMMAND_LOGIN_OUT,LOGIN_OUT_URL,senddata);
}

function onStoreClick(item){
	var senddata = {};
	senddata.sid = user.sid;
	senddata.storeId = item.storeId;
	ajax(COMMAND_FIND_STORE_INFO,STORE_INFO_URL,senddata);
}
//homepage JS end

//store_detail_page JS start
$(document).delegate('#store_detail_page', 'pageshow', function () {
	curPage="store_detail_page";
	$("#store_detail_page h1").text(store.storeName);
	whichPageToModifierPage=0;
	whichPageToCouponsPage=0;
	whichPageToLevelUpSignInPage=0;
    flag=0;
	coupon=null;//clear
//	dish=new Object();
	myDishes=new Array();//
	modifier=null;//clear
	needRefreshFoodMenuPage=true;//
	calSubtotalMoney(myDishes);
});

function toFoodMenuPage() {
	//不拦截了
//	if(user.isLogin==false){
//		toSignInPage();
//		return;
//	}
	if(store.status!=0){
		showAlert("The store can't order.");
		return;
	}
	toPage("#foodmenu_page");
}

function toCouponsPage() {
	if(user.isLogin==false){
		toSignInPage();
		return;
	}
	if(store.status!=0){
		showAlert("The store can't order.");
		return;
	}
	if(store.isOpening!=0){
		showAlert("The store is closed.");
		return;
	}
	whichPageToCouponsPage=0;
	toPage("#coupons_page");
}

function toRewardsPage() {
	if(user.isLogin==false){
		toSignInPage();
		return;
	}
	
	if(isNull(user.accessToken)){
		whichPageToLevelUpSignInPage=1;
		toPage("#levelup_signin_page");
	}else{
		toPage("#rewards_page");
	}
	
}

function toDirectionPage() {
	if(store.latitude==0&&store.longitude==0){
		showAlert("No position found.");
		return;
	}
	/**
	 * 	_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
     _blank: Opens in the InAppBrowser.
     _system: Opens in the system's web browser.
	 */
	var target="_blank";
	var url="";
	if(curPosition==null){
		url=encodeURI("http://maps.google.com/maps?q=" + store.latitude + "," +store.longitude);
	}else{
		url=encodeURI("http://maps.google.com/maps?f=d&source=s_d&saddr="+curPosition.coords.latitude+","+curPosition.coords.longitude+"&daddr="+store.latitude+","+store.longitude+"&hl=us&t=m&dirflg=d");
	}
	log("url==="+url);
	window.open(url, target,'location=yes,toolbar=yes','closebuttoncaption=Done' );
}

function doCommandAddToMyFavorite(){
	var senddata = {};
	senddata.sid = user.sid;
	senddata.storeId = store.storeId;
	if(isNull(store.customerId)||store.customerId == 0){//customerId:0
		ajax(COMMAND_ADD_COLLECT,ADD_COLLECT_URL,senddata);
	}else{
		ajax(COMMAND_DELETE_COLLECT,DELETE_COLLECT_URL,senddata);
	}
}
//store_detail_page JS end

//coupons_page JS start
//pagebeforecreate,pagecreate,pageinit,pagebeforeload,pageload/pageloadfailed
//$(document).delegate('#coupons_page', 'pagecreate', function () {
//	var senddata = {};
//	senddata.sid = user.sid;
//	senddata.storeId = store.storeId;
//	ajax(COMMAND_FIND_STORE_COUPON,FIND_STORE_COUPON_URL,senddata);	
//});

$(document).delegate('#coupons_page', 'pageshow', function () {
	var senddata = {};
	senddata.sid = user.sid;
	senddata.storeId = store.storeId;
	ajax(COMMAND_FIND_STORE_COUPON,FIND_STORE_COUPON_URL,senddata);	
});

function onRedeemClick(item){
	if(item.couponType==0){//具体某个item
		if(isNull(item.dishModifierId)||item.dishModifierId==0){//Item没辅料
			var msg="Would you like to add "+item.brandDishName+" to the order?";
			navigator.notification.confirm(
					msg,
					function(button){
						if(button==1){
							coupon=item;
							var o=new Object();
							o.brandDishName=item.brandDishName;
							o.brandMenuDishId=item.brandMenuDishId;
							o.currentPrice=item.currentPrice;
							o.dishModifierId=item.dishModifierId;
							o.categoryId=item.categoryId;
							o.dishDesc=item.dishDesc;
							o.num=1;
							myDishes.push(o);
							if(whichPageToCouponsPage==0){
								toPage("#foodmenu_page");
							}else if(whichPageToCouponsPage==1){
								goBack();
							}
						}
					},
					appName,
				   ['OK', 'Cancel']
			);
		}else{//Item有辅料
			coupon=item;
			whichPageToModifierPage=1;//
			dish=new Object();
//			dish.modifiers=null;//must clear
			dish.brandDishName=item.brandDishName;
			dish.brandMenuDishId=item.brandMenuDishId;
			dish.currentPrice=item.currentPrice;
			dish.dishModifierId=item.dishModifierId;
			dish.categoryId=item.categoryId;
			dish.dishDesc=item.dishDesc;
			toPage("#dish_modifier_page");
			
		}
		
	}else if(item.couponType==1){//百分比
		coupon=item;
		if(whichPageToCouponsPage==0){
			toPage("#foodmenu_page");
		}else if(whichPageToCouponsPage==1){
			goBack();
		}
	}
}
//coupons_page JS end

//start sign in page
function doCommandSignIn(appConfig,user) {
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.sid = user.sid;
	senddata.email = user.email;
	senddata.passwd = user.password;
	senddata.appSource = appConfig.type;
	senddata.version = appConfig.versionName;
	senddata.deviceId = user.deviceId;//used in push 
	ajax(COMMAND_LOGIN,LOGIN_URL,senddata);	
}

function doSignIn() {
	var email=$("#login_email").val().trim();
	var password=$("#login_password").val().trim();
	var re = /\S+@\S+\.\S+/;
	var emailValid = re.test(email);
	if (emailValid == false) {
		showAlert("Please insert a valid email.");
		return ;
	}
	if (password.length == 0) {
		//shake($("#login_password"));
		showAlert("Please insert the password.");
		return;
    }
	user.email=email;
	user.password=password;
//	log("user.email="+user.email+";user.password="+user.password);
	
	doCommandSignIn(appConfig,user);
}

function loginWithFacebook(){
	CDV.FB.login(
			{scope: 'email,user_likes'},
			onFacebookLoginSuccess,
		    function (error) {
				showAlert("FB:" + error);
			}
		);
}

var onFacebookLoginSuccess = function (userData) {
	log("=====================onFacebookLoginSuccess========================");
//	$.mobile.showPageLoadingMsg();
	//{"authResponse":{"accessToken":"CAAUWFSCW0TMBAHHqO06hIwqpFDmwopt4VMXZCjZAHKGoiPMlET05W0RS1XjyLvzKspPXxI3lZCIM5zYQQ2YOrYZBXOzu9uNylX6vDgPI1efLPObQDG9ZCPyBlOVzBKhATiA5tuYPAEGoGhQXPCAZC2c9d8ZCFRjDpphWDWfIwqHzuQQ4Lcg3EGfZCzAVcPxpGuF2e96n8IhbD6RZClY0D4lhv","session_key":true,"expiresIn":"5183996","userId":"1561608434065788","sig":"..."},"status":"connected"}"
	log("userData="+JSON.stringify(userData));
	if(device.platform==="Android"){
		user.facebookId=userData.authResponse.userId;//ios is userID;android is userId
	}else if(device.platform==="iOS"){
		user.facebookId=userData.authResponse.userID;//ios is userID;android is userId
	}
	
	user.email="";
	user.firstName="";
	user.lastName="";
	user.name="";
	user.birthDate="";
	
	doCommandLoginByFacebook(user);
	
	//debug
//	var url="https://graph.facebook.com/me/?access_token="+userData.authResponse.accessToken;
//	log("url="+url);
	
//	var senddata = {};
//	senddata.access_token = userData.authResponse.accessToken;
//	$.ajax({
//		url: "https://graph.facebook.com/me/",
//		type : "post",
//		dataType : "jsonp",
//		timeout: TIMEOUT,
//		data: senddata,
//		beforeSend: function() {},
//	    complete: function() {},
//		success: function(data){
//			log("=====================facebook info success========================");
//			$.mobile.hidePageLoadingMsg();
////			log(JSON.stringify(data));
//			user.email="";//no email return ,why?
//			user.firstName=data.first_name;
//			user.lastName=data.last_name;
//			user.name=data.name;
//			user.birthDate=data.birthday;
////			user.mobile=data.mobile;
//			
//			doCommandLoginByFacebook(user);
//		},
//		error: function(XMLHttpRequest, textStatus, errorThrown){
//			$.mobile.hidePageLoadingMsg();
//			showAlert(CONNECT_ERROR);//error
////			log(JSON.stringify(errorThrown));
//		}
//	});
};

function doCommandLoginByFacebook(user){
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.sid = user.sid;
	senddata.facebookId = user.facebookId;
	senddata.appSource = appConfig.type;
	senddata.version = appConfig.versionName;
	senddata.deviceId=user.deviceId;//used in push
	if(!isNull(user.firstName)){
		senddata.firstName = user.firstName;
	}
	if(!isNull(user.lastName)){
		senddata.lastName = user.lastName;
	}
	if(!isNull(user.birthDate)){
		senddata.birthDate = user.birthDate;
	}
	if(!isNull(user.mobile)){
		senddata.mobile = user.mobile;
	}
	ajax(COMMAND_LOGIN_BY_FACEBOOK,LOGIN_BY_FACEBOOK_URL,senddata);
}

function toForgotPasswordPage(){
	var email=$("#login_email").val().trim();
	var re = /\S+@\S+\.\S+/;
	var emailValid = re.test(email);
	if (emailValid == false) {
		email=""
	}
	user.email=email;
	toPage("#forgot_password_page");
}
//end sign in page

//start forgot_password_page 
var timer;
$(document).delegate('#forgot_password_page', 'pageshow', function () {
	curPage="forgot_password_page";
	clearForgotPasswordPage();
	$("#forgot_password_page #btn_verCode").css("background-color","#333").on("click",function(){
		doSendCode();
	});
	
	if(!isNull(user.email)){
		var senddata = {};
		senddata.companyId = appConfig.companyId;
		senddata.brandId = appConfig.brandId;
		senddata.sid = user.sid;
		senddata.email = user.email;
		ajax(COMMAND_GOT_MOBILE,GOT_MOBILE_URL,senddata);
	}
	
});

$(document).delegate('#forgot_password_page', 'pagehide', function () {
	if(!isNull(timer)){
		clearInterval(timer);
	}
});

function clearForgotPasswordPage(){
	$("#forgot_password_page #phoneNumber").val("");
	$("#forgot_password_page #code").val("");
	$("#forgot_password_page #password").val("");
	$("#forgot_password_page #confirmPassword").val("");
}
function doSendCode(){
	var phoneNumber = $("#forgot_password_page #phoneNumber").val().trim();
	var filter = /^[0-9-+]+$/;
	var phoneValid = filter.test(phoneNumber);
	if (phoneValid == false||phoneNumber.length==0) {
		showAlert("Please insert a valid phone number.");
		return ;
	}
	$("#forgot_password_page #btn_verCode").css("background-color","gray").off("click");
	timer=setInterval(function(){
			$("#forgot_password_page #btn_verCode").css("background-color","#333").on("click",function(){
				doSendCode();
			});
			clearInterval(timer);
		},60000);
	user.mobile=phoneNumber;
	doCommandVerficationCode(appConfig,user);
}

function doCommandVerficationCode(appConfig,user){
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.sid = user.sid;
	senddata.mobile = user.mobile;
	ajax(COMMAND_VERIFICATION_CODE,VERIFICATION_CODE_URL,senddata);
}

function doForgotPassword(){
	var verCode = $("#forgot_password_page #code").val().trim();
	if(verCode.length < 4) {
		showAlert("Please insert the verification code.");
		return ;
	}
	var passwd = $("#forgot_password_page #password").val();
	if (passwd.length < 6 || passwd.length > 20) {
		showAlert("Please insert a valid password. ");
		return;
	}
	var confirmPassword = $("#forgot_password_page #confirmPassword").val();
	if(passwd != confirmPassword){
		showAlert("The passwords entered does not match. ");
		return ;
	}
	user.code=verCode;
	user.newPasswd=passwd;
	
	doCommandResetPassword(appConfig,user);
}

function doCommandResetPassword(appConfig,user){
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.sid = user.sid;
	senddata.mobile = user.mobile;
	senddata.verCode = user.code;
	senddata.newPasswd = user.newPasswd;
	ajax(COMMAND_RESET_PWD,RESET_PWD_URL,senddata);
}
//end forgot_password_page

//start sign up page
function doSignUp(){
	user.email=$("#sign_up_page #email").val();
	
	var re = /\S+@\S+\.\S+/;
	var emailValid = re.test(user.email);
	if (emailValid == false) {
		showAlert("Please insert a valid email.");
		return ;
	}
	
	user.firstName=$("#sign_up_page #firstName").val();
	if(user.firstName.length < 1) {
		showAlert("Please insert a valid firstname.");
		return ;
	}
	user.lastName=$("#sign_up_page #lastName").val();
	if(user.lastName.length < 1) {
		showAlert("Please insert a valid lastname.");
		return ;
	}
	
	user.phoneNumber=$("#sign_up_page #phoneNumber").val();
	var filter = /^[0-9-+]+$/;
	var phoneVaild = filter.test(user.phoneNumber);
	if(phoneVaild == false) {
		showAlert("Please insert a valid phone number.");
		return ;
	}
	
	user.password=$("#sign_up_page #password").val();
	var confirmPassword=$("#sign_up_page #confirmPassword").val();
	if (user.password.length < 6 || user.password.length > 20) {
		showAlert("Please insert a valid password. Remember it has to be between 6 and 20 characters");
		return;
    }
	if(user.password != confirmPassword) {
		showAlert("Password and confirm password must be same.");
		return ;
	}
	doCommandSignUp(appConfig,user);
}

function doCommandSignUp(appConfig,user) {
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.appSource = appConfig.type;
	senddata.version = appConfig.versionName;
	senddata.sid = user.sid;
	senddata.email = user.email;
	senddata.passwd = user.password;
	senddata.firstName = user.firstName;
	senddata.lastName = user.lastName;
	senddata.mobile = user.phoneNumber;
	senddata.deviceId=user.deviceId;//used in push
	ajax(COMMAND_SIGN_UP,SIGN_UP_URL,senddata);
}
//end sign up page

//my_orders_page start
var page=new Object();
page.start=0;
page.count=20;

//pagebeforecreate,pagecreate,pageinit,pagebeforeload,pageload/pageloadfailed
$(document).delegate('#my_orders_page', 'pageinit', function () {
	
});

$(document).delegate('#my_orders_page', 'pageshow', function () {
	curPage="my_orders_page";
	if(needMyOrdersPageRefresh){
		needMyOrdersPageRefresh=false;
		var orderNum=parseInt($("#homepage #orderNum").text());
		if(orderNum>page.count){
			$("#my_orders_page #moreOrder").show();
		}else{
			$("#my_orders_page #moreOrder").hide();
		}
		page.start=0;
		doCommandMyOrders(appConfig,user,page);
	}
});

function doMoreOrders(){
	var orderNum=parseInt($("#homepage #orderNum").text());
	if(page.start>=orderNum){
		showAlert("No more records.");
		return;
	}
	page.start+=page.count;
	doCommandMyOrders(appConfig,user,page);
}

function doCommandMyOrders(appConfig,user,page){
	var senddata = {};
	senddata.sid = user.sid;
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.start = page.start;
	senddata.count = page.count;
	ajax(COMMAND_FIND_ORDER_LIST,FIND_ORDER_LIST_URL,senddata);
}

var order;
function onOrderClick(itemObject){
	order=itemObject;
	store.storeId=itemObject.storeId;
	store.storeName=itemObject.storeName;
	store.city=itemObject.city;
	store.province=itemObject.province;
	store.provinceShrtNm=itemObject.provinceShrtNm;
	store.storeAddress=itemObject.storeAddress;
	store.telephone=itemObject.telephone;
	store.zip=itemObject.zip;
	store.estPrepTime=itemObject.estPrepTime;
	store.taxRate=itemObject.taxRate;
	store.businessHours=itemObject.businessHours;
	store.timezone=itemObject.timezone;
	store.locationId=itemObject.locationId;
	
	toPage("#my_order_detail_page");
	
}

function onRemoveOrder(item){
	
}
//my_orders_page end

//my_order_detail_page start
$(document).delegate('#my_order_detail_page', 'pageshow', function () {
	curPage="my_order_detail_page";
	if(isNull(order)){
		log("Order is null");
		return;
	}
	$("#my_order_detail_page #storeName").text(order.storeName);
	$("#my_order_detail_page #storeAddress").text(order.storeAddress+" , "+order.city+" , "+order.provinceShrtNm+" "+order.zip);
	$("#my_order_detail_page #storePhone").attr("href","tel:"+order.telephone).text(formatPhoneNumber(order.telephone));
	
	if(order.status==0||order.status==5){
		$("#my_order_detail_page #line_0").show();
		$("#my_order_detail_page #pickUp").show();
		var d = new Date();
		var time=d.getTime()+order.estPrepTime*60*1000;
		var nd = new Date(time);
		$("#my_order_detail_page #pickUp #pickUpTime").text(nd.format("hh:mm"));
	}else{
		$("#my_order_detail_page #line_0").hide();
		$("#my_order_detail_page #pickUp").hide();
	}
	
	var senddata = {};
	senddata.sid = user.sid;
	senddata.dishOrderId = order.id;
//	senddata.storeId = order.storeId;
	ajax(COMMAND_ORDER_DETAIL,ORDER_DETAIL_URL,senddata);
});

function doReorder(){
//	if(order.status!=0){//没传,该店是否接受下单
//		showAlert("The store can't order.");
//		return;
//	}
	var isOpening=isStoreOpen(order);
	if(isOpening!=0){
		showAlert("The store is closed.");
		return;
	}
	myDishes=new Array();//clear
	var brandMenuDishIds="";
	$.each(dishOrderDetail,function(i,item){
//		log(JSON.stringify(item));
		brandMenuDishIds+=","+item.brandMenuDishId;
		item.modifiers=item.dishModifierList;//
		myDishes.push(item);
	});
	coupon=null;
	
	var senddata = {};
	senddata.sid = user.sid;
	senddata.storeId = order.storeId;
	senddata.timezone = order.timezone;
	senddata.brandMenuDishIds = brandMenuDishIds.substring(1);
	ajax(COMMAND_REORDER,REORDER_URL,senddata);
}
//my_order_detail_page end

//my favorites page start
$(document).delegate('#my_favorites_page', 'pageshow', function () {
	curPage="my_favorites_page";
	doCommandMyFavorites(appConfig,user);
});

function doCommandMyFavorites(appConfig,user){
	var senddata = {};
	senddata.sid = user.sid;
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	ajax(COMMAND_FIND_COLLECT_LIST,FIND_COLLECT_LIST_URL,senddata);
}

function doCommandDeleteToMyFavorite(store){
	var senddata = {};
	senddata.sid = user.sid;
	senddata.storeId = store.storeId;
    ajax(COMMAND_DELETE_COLLECT_FROM_FAVORITE_PAGE,DELETE_COLLECT_URL,senddata);
	event.stopPropagation();
}
//my favorites page end

//menu page start
$(document).delegate('#foodmenu_page', 'pageinit', function () {
//	log("==================foodmenu_page pageinit=========================");
});

$(document).delegate('#foodmenu_page', 'pageshow', function () {
	curPage="foodmenu_page";
	if(needRefreshFoodMenuPage){
		needRefreshFoodMenuPage=false;
		var senddata = {};
		senddata.companyId = appConfig.companyId;
		senddata.brandId = appConfig.brandId;
		ajax(COMMAND_FIND_CATEGORY,FIND_CATEGORY_URL,senddata);
	}else{
	}
	
});

var category=null;
function onCategoryClick(item){
	category=item;
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.storeId = store.storeId;
	senddata.categoryId = item.id;
	senddata.timezone = store.timezone;
	ajax(COMMAND_FIND_MENU_INFO,FIND_MENU_INFO_URL,senddata);
}

function onMinusClick(item){
	var dom=$("#dish_num_"+item.brandMenuDishId);
	var text=dom.text();
	if(text.length==0){
		
	}else{
		var n=parseInt(text.substring(1))-1;
		if(n==0){
			item.num="";
			dom.text("");
			for(var i=0;i<myDishes.length;i++){
				if(item.brandMenuDishId==myDishes[i].brandMenuDishId){
					myDishes.remove(i);
//					i--;
					break;
				}
			}
		}else{
			item.num=n;
			dom.text("x"+n);
			for(var i=0;i<myDishes.length;i++){
				if(item.brandMenuDishId==myDishes[i].brandMenuDishId){
					myDishes[i]=item;
					break;
				}
			}
		}
		
		calSubtotalMoney(myDishes);
		
		calCategoryNum(-1);
	}
}
function onPlusClick(item){
	var dom=$("#dish_num_"+item.brandMenuDishId);
	var text=dom.text();
	if(text.length==0){
		dom.text("x1");
		item.num=1;
		myDishes.push(item);
	}else{
		var n=parseInt(text.substring(1))+1;
		item.num=n;
		dom.text("x"+n);
		for(var i=0;i<myDishes.length;i++){
			if(item.brandMenuDishId==myDishes[i].brandMenuDishId){
				myDishes[i]=item;
				break;
			}
		}
	}
	
	calSubtotalMoney(myDishes);
	
	calCategoryNum(1);
}

function calSubtotalMoney(myDishes){
	var subtotal=calSubtotal(myDishes,coupon);
	$("#foodmenu_page #subtotal").text(subtotal.toFixed(2));
	var n=0;
	for(var i=0;i<myDishes.length;i++){
		n+=parseInt(myDishes[i].num);
	}
	$("#foodmenu_page #itemOrdered").text(n.toString());
}

function onNextClick(item){
//	log(JSON.stringify(item));
	dish=item;
	toPage("#dish_modifier_page");
}

function doSubtotal(){
	if(myDishes.length==0){
		showAlert("Please pick one.");
		return;
	}
	toPage("#order_page");
}

function calCategoryNum(num){
	if(isNull(category)){
		return;
	}
	var text=$("#foodmenu_page #categorys #category_"+category.id).text();
	text=text.substring(text.lastIndexOf("(")+1,text.lastIndexOf(")"));
	var n=parseInt(text);
	if(isNaN(n)){
		category.num=0;
	}else{
		category.num=n;
	}
	category.num+=num;
	if(category.num==0){
		$("#foodmenu_page #categorys #category_"+category.id).text(category.name);
	}else{
		$("#foodmenu_page #categorys #category_"+category.id).text(category.name+"("+category.num+")");
	}
}
//menu page end

//dish_modifier_page start
$(document).delegate('#dish_modifier_page', 'pageshow', function () {
	curPage="dish_modifier_page";
	$("#dish_modifier_page #modifier_title").text(dish.brandDishName);
	modifier=null;//clear
	$("#dish_num #num").val("1");
	doDishModiferCommand(user,dish);
	//calMoneyWithModifeiers();
});

function doDishModiferCommand(user,dish){
	var senddata = {};
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	senddata.brandMenuDishId = dish.brandMenuDishId;
	ajax(COMMAND_FIND_MODIFIER,FIND_MODIFIER_URL,senddata);
}

function onPlus(){
	var n=parseInt($("#dish_num #num").val())+1;
	$("#dish_num #num").val(n.toString());
	calMoneyWithModifeiers();
}
function onMinus(){
	var n=parseInt($("#dish_num #num").val())-1;
	if(n<=0){
		n=0;
	}
	$("#dish_num #num").val(n.toString());
	
	calMoneyWithModifeiers();
}

function calMoneyWithModifeiers(){
	var n=parseInt($("#dish_num #num").val());
	var m=dish.currentPrice*n;
	dish.num=parseInt(n);//
	var modifiersMoney=0;
	if(isNull(dish.modifiers)){
		
	}else{
		for(var i=0;i<dish.modifiers.length;i++){
			if(dish.modifiers[i].addAmt>0){
				modifiersMoney+=dish.modifiers[i].addAmt*n;
			}
		}
	}
	m=m+modifiersMoney;
	$("#dish_modifier_page #money").text(m.toFixed(2));
}

var modifier=null;
function onRadioClick(dom,item){
	if(isNull(dish.modifiers)){
		dish.modifiers=new Array();
		dish.modifiers.push(item);
	}else{
//		if(isNull(modifier)||modifier.id!=item.id){
//			dish.modifiers.push(item);
//		}
		var hasIt=false;
		for(var i=0;i<dish.modifiers.length;i++){
			if(dish.modifiers[i].modCategory==item.modCategory){
				if(dish.modifiers[i].id==item.id){
					hasIt=true;
					break;
				}
			}
		}
		if(!hasIt){
			dish.modifiers.push(item);
		}
		for(var i=0;i<dish.modifiers.length;i++){
			if(dish.modifiers[i].modCategory==item.modCategory){
				if(dish.modifiers[i].id!=item.id){
					dish.modifiers.remove(i);
					break;
				}
			}
		}
	}
	modifier=item;
	calMoneyWithModifeiers();
}

function onRadioChange(dom){
//	dish.modifiers=[];
	for(var i=0;i<dish.modifiers.length;i++){
		if(dish.modifiers[i].modCategory==dom.name){
			dish.modifiers.remove(i);
		}
	}
	
	var radios = document.getElementsByName(dom.name);
	var radioLength = radios.length;
	for(var i = 0;i < radioLength;i++){
	    if(radios[i].checked){
	    	var item = radios[i].value;
	    	dish.modifiers.push($.parseJSON(item));
	    }
	}
	for(var i=0;i<dish.modifiers.length;i++){
		log(JSON.stringify(dish.modifiers[i]));
	}
	
	var n=parseInt($("#dish_num #num").val());
	var m=dish.currentPrice*n;
	dish.num=parseInt(n);//
	var modifiersMoney=0;
	if(isNull(dish.modifiers)){
		
	}else{
		for(var i=0;i<dish.modifiers.length;i++){
			if(dish.modifiers[i].addAmt>0){
				modifiersMoney+=dish.modifiers[i].addAmt*n;
			}
		}
	}
	m=m+modifiersMoney;
	$("#dish_modifier_page #money").text(m.toFixed(2));
	//calMoneyWithModifeiers();
}

function onCheckClick(item){
//	log(JSON.stringify(item));
	var dx=-1;
	if(isNull(dish.modifiers)){
		dish.modifiers=new Array();
	}else{
		for(var i=0;i<dish.modifiers.length;i++){
			if(dish.modifiers[i].id==item.id){
				dx=i;
				break;
			}
		}
	}
	if(dx<0){
		dish.modifiers.push(item);
	}else{
		dish.modifiers.remove(dx);
	}
	calMoneyWithModifeiers();
}
var radioStatus = 1;//选中状态，1没选中
var lastDom;
function onRadioCheckClick(dom,item){
	if(lastDom!=dom){//
		radioStatus = 1;
	}
	if(radioStatus==1){
		dom.checked=true;
		radioStatus=0;
	}else{
		dom.checked=false;
		radioStatus=1;
	}
	
	if(isNull(dish.modifiers)){
		dish.modifiers=new Array();
	}else{
		
	}
	
	if(radioStatus==0){
		for(var i=0;i<dish.modifiers.length;i++){
			if(dish.modifiers[i].modCategory==item.modCategory){//同类全删
				dish.modifiers.remove(i);
			}
		}
		dish.modifiers.push(item);
	}else{
		var dx=-1;
		for(var i=0;i<dish.modifiers.length;i++){
			if(dish.modifiers[i].id==item.id){
				dx=i;
				break;
			}
		}
		if(dx>=0){
			dish.modifiers.remove(dx);
		}
		dom.checked=false;
	}
	lastDom=dom;
	calMoneyWithModifeiers();
}

function doAddItem(){
	dish.num=parseInt($("#dish_num #num").val());
	if(dish.num>0){
		myDishes.push(dish);
		var dom=$("#dish_num_"+dish.brandMenuDishId);
		if(dom.text().length>0){
			var n=parseInt(dom.text().substring(1))+dish.num;//
			dom.text("x"+n);
		}else{
			dom.text("x"+dish.num);
		}
		calSubtotalMoney(myDishes);
		
		calCategoryNum(dish.num);
	}
	if(whichPageToModifierPage==0){
		goBack();
	}else{
		toPage("#foodmenu_page");
	}
}
//dish_modifier_page end

//order_page start
$(document).delegate('#order_page', 'pageinit', function () {
	
});
$(document).delegate('#order_page', 'pageshow', function () {
	curPage="order_page";
	needRefreshFoodMenuPage=true;//返回menu时刷新Menu页面
	$("#order_page #storeName").text(store.storeName);
	$("#order_page #storeAddress").text(store.storeAddress+" "+store.city+" , "+store.provinceShrtNm+" "+store.zip);
	$("#order_page #storePhone").attr("href","tel:"+store.telephone).text(formatPhoneNumber(store.telephone));
	
	var d = new Date();
	var time=d.getTime()+store.estPrepTime*60*1000;
	var nd = new Date(time);
	
	$("#order_page #pickUpTime").text(nd.format("hh:mm"));
	
	resetOrderList();
	calPlaceOrderMoney();
});

function resetOrderList(){
	$("#order_page #myDishes").empty();
	for(var i=0;i<myDishes.length;i++){
		var price=myDishes[i].currentPrice;
		var modifiers="";
		if(!isNull(myDishes[i].modifiers)){
			for(var j=0;j<myDishes[i].modifiers.length;j++){
				modifiers+=(","+myDishes[i].modifiers[j].modName);
				price+=myDishes[i].modifiers[j].addAmt;
			}
		}
		var money=price*myDishes[i].num;
		
		if(device.platform==="Android"){
			$("#order_page #myDishes").append("<li><div style='height:28px;line-height:28px;width:100%'><span style='float:left;width:50%;white-space: nowrap;text-overflow:ellipsis; overflow:hidden;'>"+myDishes[i].brandDishName+"</span><span style='width:120px;position:relative;'><img onclick='onMinusClickInOrderPage("+i+")' src='img/btn_minus.png' style='position:absolute;left:0px;top;0px;'><input type='text' readonly style='height:28px;width:28px;line-height:28px;color:black;text-align:center;border: 0 none;font-size:16px;position:absolute;left:32px;top;0px;' value='"+myDishes[i].num+"' id='dish_"+i+"'/><img onclick='onPlusClickInOrderPage("+i+")' src='img/btn_plus.png' style='position:absolute;left:64px;top;0px;'></span><span style='float:right' id='money_"+i+"'>$"+money.toFixed(2)+"</span></div><div style='font-size:12px;margin-bottom:5px;'>"+modifiers.substring(1)+"</div></li>");
		}else if(device.platform==="iOS"){
			$("#order_page #myDishes").append("<li><div style='height:28px;line-height:28px;width:100%'><span style='float:left;width:45%;white-space: nowrap;text-overflow:ellipsis; overflow:hidden;'>"+myDishes[i].brandDishName+"</span><span style='width:120px;position:relative;'><img onclick='onMinusClickInOrderPage("+i+")' src='img/btn_minus.png' style='position:absolute;left:0px;top;0px;'><input type='text' readonly style='height:20px;width:20px;line-height:20px;color:black;text-align:center;border: 0 none;font-size:16px;position:absolute;left:32px;top;0px;' value='"+myDishes[i].num+"' id='dish_"+i+"'/><img onclick='onPlusClickInOrderPage("+i+")' src='img/btn_plus.png' style='position:absolute;left:72px;top;0px;'></span><span style='float:right' id='money_"+i+"'>$"+money.toFixed(2)+"</span></div><div style='font-size:12px;margin-bottom:5px;'>"+modifiers.substring(1)+"</div></li>");//for ios
		}

	}
}

function resetCouponView(coupon){
	if(coupon==null){
		$("#order_page #table").addClass("frame");
		$("#order_page #coupon").hide().text("");
		$("#order_page #apply").show().text("Select coupons at this store. Apply?");
		$("#order_page #money").hide().text("");
		$("#order_page #apply").off("click").on("click",onApplyCouponClick);
	}else{
		if(coupon.couponType==0){//具体Item
			$("#order_page #table").removeClass("frame");
			$("#order_page #coupon").show().text("Coupon");
			$("#order_page #apply").show().text("").off("click");
			$("#order_page #money").show().text("-$"+coupon.couponAmtOff.toFixed(2));
		}else if(coupon.couponType==1){//满减%
			var subtotal = calSubtotalWithoutCoupon(myDishes);
			if(!isNull(coupon.couponPercOffMinVal)&&subtotal>=coupon.couponPercOffMinVal){
				$("#order_page #table").removeClass("frame");
				$("#order_page #coupon").show().text("Coupon");
				$("#order_page #apply").show().text(coupon.couponPercOff + "% off").off("click");
				var couponOff = subtotal * coupon.couponPercOff / 100;
				$("#order_page #money").show().text("-$"+couponOff.toFixed(2));
			}else{
				$("#order_page #table").addClass("frame");
				$("#order_page #coupon").hide().text("");
				$("#order_page #apply").show().text("The coupon requires "+coupon.couponPercOffMinVal+" purchase");
				$("#order_page #money").hide().text("");
				$("#order_page #apply").off("click").on("click",onApplyCouponClick);
			}
		}
	}
}

function onApplyCouponClick(){
	if(user.isLogin==false){
		toSignInPage();
		return;
	}
	whichPageToCouponsPage=1;
	toPage("#coupons_page");
}

function onMinusClickInOrderPage(index){
	if(myDishes[index].num<=1){
		var msg="Do you want to remove this item ?";
		navigator.notification.confirm(
				msg,
				function(button){
					if(button==1){
						var dish=myDishes[index];
						myDishes.remove(index);
						resetOrderList();
						if(coupon!=null){
							if(coupon.couponType==0){//具体Item
								if(dish.brandMenuDishId==coupon.brandMenuDishId){
									coupon=null;
								}
							}
						}
						calPlaceOrderMoney();
					}
				}, 
				appName,
			   ['OK', 'Cancel']
			   );
		return;
	}
	myDishes[index].num-=1;
	$("#order_page #myDishes li #dish_"+index).val(myDishes[index].num);
	
	var modifiersPrice=0;
	if(!isNull(myDishes[index].modifiers)){
		for(var j=0;j<myDishes[index].modifiers.length;j++){
			modifiersPrice+=myDishes[index].modifiers[j].addAmt;
		}
	}
	var m=myDishes[index].num*(myDishes[index].currentPrice+modifiersPrice);
	
	$("#order_page #myDishes li #money_"+index).text("$"+m.toFixed(2));
	
	calPlaceOrderMoney();
}
function onPlusClickInOrderPage(index){
	myDishes[index].num+=1;
	$("#order_page #myDishes li #dish_"+index).val(myDishes[index].num);
	
	var modifiersPrice=0;
	if(!isNull(myDishes[index].modifiers)){
		for(var j=0;j<myDishes[index].modifiers.length;j++){
			modifiersPrice+=myDishes[index].modifiers[j].addAmt;
		}
	}
	
	var m=myDishes[index].num*(myDishes[index].currentPrice+modifiersPrice);
	$("#order_page #myDishes li #money_"+index).text("$"+m.toFixed(2));
	
	calPlaceOrderMoney();
}

function calPlaceOrderMoney(){
	resetCouponView(coupon);
	var subtotal=calSubtotal(myDishes,coupon);
	var subtotalFixed=subtotal.toFixed(2);
	$("#order_page #subtotal").text("$"+subtotalFixed);
	var tax=subtotal*store.taxRate/100;
	var taxFixed=tax.toFixed(2);
	$("#order_page #tax").text("$"+taxFixed);
	var total=parseFloat(subtotalFixed)+parseFloat(taxFixed);
	$("#order_page #total").text("$"+total.toFixed(2));
}

var flag=0;
function doPlaceOrder(){
	if(user.isLogin==false){
		toSignInPage();
		return;
	}
	
	if(myDishes.length==0){
		showAlert("No item selected.");
		return;
	}
	if(store.isOpening!=0){
		showAlert("The store is closed. Can't place the order. ");
		return;
	}
	
	if(isNull(user.accessToken)){
//		toPage("#levelup_signup_page");
        flag=1;
		$.mobile.changePage("#levelup_signup_page","slide",false,false); 
		return;
	}
	
	if(coupon!=null){
		if(coupon.couponType==1){//百分比
			var subtotal=parseFloat($("#order_page #subtotal").text().substring(1));
			var couponAmt=0;
			var couponAmtText=$("#order_page #money").text();
			if(couponAmtText.length>2){
				couponAmt=parseFloat(couponAmtText.substring(2));
			}
			var couponPercOffMinVal=parseFloat(coupon.couponPercOffMinVal);
			
			if(!isNull(coupon.couponPercOffMinVal)&&(couponAmt+subtotal)>=couponPercOffMinVal){
			}else{
				var msg="Your coupon can't be used for this order, continue place the order?";
				navigator.notification.confirm(
						msg,
						function(button){
							if(button==1){
								coupon=null;
								calPlaceOrderMoney();
								doSubmitOrder(false);
							}
						},
						appName,
					   ['OK', 'Cancel']
					   );
				return;
				
			}
			
		}
	}
	doSubmitOrder(true);
}

function doSubmitOrder(flag){
	var orderInfo="{";
	orderInfo+='"deviceId":"'+user.deviceId+'",';//used in push
	orderInfo+='"source":'+appConfig.type+',';
	orderInfo+='"storeId":'+store.storeId+',';
	
	var businessHours=store.businessHours.split(";");
	var week=getCurWeek();
	var day=businessHours[0].split(",");
	var time="";
	if(day[0].indexOf(week.toString())!=-1){
		time=day[1];
	}else{
		var day2=businessHours[1].split(",");
		if(day2[0].indexOf(week.toString())!=-1){
			time=day2[1];
		}else{
			time="";
		}
	}
	orderInfo+='"time":"'+time+'",';
	orderInfo+='"amount":'+$("#order_page #subtotal").text().substring(1)+',';
	
	var couponAmt=coupon==null?0:parseFloat($("#order_page #money").text().substring(2));
	orderInfo+='"couponAmt":'+couponAmt+',';
	orderInfo+='"rewardAmt":'+0+',';
	
	var paidAmt=parseFloat($("#order_page #total").text().substring(1));
	
	orderInfo+='"paidAmt":'+paidAmt+',';
	orderInfo+='"pointUsed":'+0+',';
	orderInfo+='"estPrepTime":'+store.estPrepTime+',';
	
	var couponId=coupon==null?0:coupon.id;
	orderInfo+='"couponId":'+couponId+',';
	
	orderInfo+='"menuDetail":';
	orderInfo+='[';
	for(var i=0;i<myDishes.length;i++){
		var row=myDishes[i];
		orderInfo+='{';
		orderInfo+='"price":'+calOneDishMoney(row)+',';
		orderInfo+='"brandMenuDishId":'+row.brandMenuDishId+',';
		orderInfo+='"dishName":"'+row.brandDishName+'",';
		orderInfo+='"num":'+row.num+',';
		orderInfo+='"showOrder":'+i;
		
		if(!isNull(row.modifiers)){
			orderInfo+=',"dishModifier":';
			orderInfo+='[';
			var modifier=new Object();
			for(var j=0;j< row.modifiers.length;j++){
				orderInfo+='{';
				orderInfo+='"id":'+row.modifiers[j].id+',';
				orderInfo+='},';
			}
			orderInfo+=']';
		}
		orderInfo+='},';
	}
	orderInfo+=']';
	orderInfo+="}";
//	log(orderInfo);
	var senddata = {};
	senddata.sid = user.sid;
	senddata.orderInfo = orderInfo;
	senddata.versionNumber = appConfig.versionName;//ios需要
	
	paymentToken.paidAmt=paidAmt;//
	
	if(flag){
		var msg="Would you like to place this order and pay with your credit card on file?";
		navigator.notification.confirm(
				msg, // message
				function(button){
					if(button==1){
						if(paidAmt==0){
							ajax(COMMAND_ADD_ORDER,ADD_ORDER_URL,senddata);
						}else{
							if(store.locationId==0||isNull(store.locationId)){
								showAlert("The store can't process the mobile payment at this time. Your order is not placed and your credit card is not charged.");
							}else{
								doLevelUpPaymentToken(user.accessToken,senddata);
							}
						}
					}
				}, 
				appName,
				['OK', 'Cancel'] 
		);
		
	}else{
		if(paidAmt==0){
			ajax(COMMAND_ADD_ORDER,ADD_ORDER_URL,senddata);
		}else{
			if(store.locationId==0||isNull(store.locationId)){
				showAlert("The store can't process the mobile payment at this time. Your order is not placed and your credit card is not charged.");
			}else{
				doLevelUpPaymentToken(user.accessToken,senddata);
			}
		}
	}
	
}

function doLevelUpPaymentToken(accessToken,senddata){
	$.ajax({
 		type: 'GET',
      	url: levelup_payment_token,
    	async: false,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Token ' + accessToken.accessToken
		},
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg();},
     	success: function(data){
     		paymentToken.paymentTokenData=data.payment_token.data;
     		if(isNull(paymentToken.paymentTokenData)){
     			toPage("#levelup_card_manage_page");
     		}else{
     			ajax(COMMAND_ADD_ORDER,ADD_ORDER_URL,senddata);
     		}
      	},
      	error: function(error){
           showAlert(error.responseJSON[0].error.message);
      		//showAlert("You don't have any valid credit cards linked to your account. Please add...")
//      		toPage("#levelup_card_manage_page");
       	}
    });
	
}
//order_page end

//levelup_signup_page start
$(document).delegate('#levelup_signup_page', 'pageinit', function () {
	$("#levelup_signup_page #levelup_terms_link").click(function() {
		window.open('https://www.thelevelup.com/terms', '_system');
	});
});

$(document).delegate('#levelup_signup_page', 'pageshow', function () {
	curPage="levelup_signup_page";
	$("#levelup_signup_page #firstName").val("");
	$("#levelup_signup_page #lastName").val("");
	$("#levelup_signup_page #email").val("");
	$("#levelup_signup_page #password").val("");
});

function doJoinLevelUp(){
    whichPageToLevelUpSignInPage=2;
	var firstName=$("#levelup_signup_page #firstName").val();
	var lastName=$("#levelup_signup_page #lastName").val();
	var email=$("#levelup_signup_page #email").val();
	var password=$("#levelup_signup_page #password").val();
	
	if(firstName.length==0){
		showAlert("The first name can't be empty.");
		return;
	}
	if(lastName.length==0){
		showAlert("The last name can't be empty.");
		return;
	}
	
	var re = /\S+@\S+\.\S+/;
	var emailValid = re.test(email);
	if (emailValid == false) {
		showAlert("Please insert a valid email.");
		return ;
	}
	if(password.length<6){
		showAlert("The password length should be larger than 6.");
		return;
	}
	
	var user=new Object();
	user.email = email;
	user.first_name = firstName;
	user.last_name = lastName;
	user.password = password;
	
	var senddata = {};
	senddata.user=user;
	senddata.api_key=levelup_api_key;
	
//	log(JSON.stringify(senddata));
	var encoded = $.toJSON(senddata);
	
	$.ajax({
 		type: "POST",
      	url: levelup_register,
   		data: encoded,
   		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg();},
     	success: function(data){
     		doSignInLevelUp_base(email,password);
      	},
      	error: function(error){
           showAlert(error.responseJSON[0].error.message);
       	}
    });
}
//levelup_signup_page end

//levelup_signin_page start
$(document).delegate('#levelup_signin_page', 'pageshow', function () {
	$("#levelup_signin_page #userName").val("");
	$("#levelup_signin_page #password").val("");
});

function changeToLevelUpForgotPasswordPage(){
	toPage("#levelup_forgot_password_page");
}

function doSignInLevelUp(){
	var userName=$("#levelup_signin_page #userName").val();
	var password=$("#levelup_signin_page #password").val();
	doSignInLevelUp_base(userName,password);
}

function doSignInLevelUp_base(userName,password){
	var re = /\S+@\S+\.\S+/;
	var emailValid = re.test(userName);
	if (emailValid == false) {
		showAlert("Please insert a valid email.");
		return ;
	}
	if(password.length<6){
		showAlert("The password length should be larger than 6.");
		return;
	}
	
	var senddata = {};
	var access_token=new Object();
	access_token.username = userName;
	access_token.password = password;
	access_token.client_id = levelup_api_key;//api_key or client_id ???
	senddata.access_token=access_token;
//	log(JSON.stringify(senddata));
	
 	$.ajax({
 		type: 'POST',
      	url: levelup_sign_in,
   		data: senddata,
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg();},
     	success: function(data){
//     		log(JSON.stringify(data));
     		var sendData = {};
     		sendData.sid=user.sid;
     		sendData.accessToken=data.access_token.token;
     		sendData.userId=data.access_token.user_id;
     		
     		var accessToken=new Object();
			accessToken.accessToken=data.access_token.token;
			accessToken.userId=data.access_token.user_id;
			user.accessToken=accessToken;
			
     		ajax(COMMAND_UPDATE_LEVELUP_ACCESS_TOKEN,UPDATE_LEVELUP_ACCESS_TOKEN_URL,sendData);
      	},
      	error: function(error){
           showAlert(error.responseJSON[0].error.message);
       	}
    });
}

function changeToSignUpPage(){
	if(whichPageToLevelUpSignInPage==0){
		goBack();
	}else{
		toPage("#levelup_signup_page");
	}
}
//levelup_signin_page end

//levelup_forgot_password_page start
$(document).delegate('#levelup_forgot_password_page', 'pageshow', function () {
	$("#levelup_forgot_password_page #email").val("");
});

function doForgotPasswordLevelUp(){
	var email = $("#levelup_forgot_password_page #email").val();
	
	var re = /\S+@\S+\.\S+/;
	var emailValid = re.test(email);
	if (emailValid == false) {
		showAlert("Please insert a valid email.")
		return ;
	}
	
	var senddata = {};
	senddata.email=email;
	log(JSON.stringify(senddata));//{"email":"test@reyosoft.com"}
	var encoded = $.toJSON(senddata);
	$.ajax({
 		type: 'POST',
      	url: levelup_forgot_password,//https://api.thelevelup.com/v14/passwords
   		data: encoded,
   		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg();},
     	success: function(data){
      		showAlert("The password has been sent to your email.");
      	},
      	error: function(error){
           showAlert(error.responseJSON[0].error.message);
       	}
    });
}
//levelup_forgot_password_page end

//levelup_card_manage_page start
$(document).delegate('#levelup_card_manage_page', 'pageshow', function () {
	curPage="levelup_card_manage_page";
	if(isNull(user.accessToken)||isNull(user.accessToken.accessToken)){
		showAlert("No access token found.");
		return;
	}
	$("#levelup_card_manage_page #myCards").empty();
	$.ajax({
 		type: 'GET',
      	url: levelup_credit_cards,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Token ' + user.accessToken.accessToken
		},
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg();},
     	success: function(data){
//     		log(JSON.stringify(data));
     		var cards=$.parseJSON(JSON.stringify(data));
     		for(var i=0;i<cards.length;i++){
     			var check="";
     			if(cards[i].credit_card.promoted==true){
     				check="checked";
     			}
     			$("#levelup_card_manage_page #myCards").append("<tr id='item_"+cards[i].credit_card.id+"'><td style='padding:16px;'><div>Card Ending "+cards[i].credit_card.last_4+"</div><div style='font-size:14px'><i>Exp "+cards[i].credit_card.expiration_month+"/"+cards[i].credit_card.expiration_year+"</i></div></td><td align='right' style='padding-right:16px'><input id='radio-card' type='radio' "+check+" name='cards' onclick='changePromotedCard("+cards[i].credit_card.id+")'/><span id='remove-card' onclick='deleteCard("+cards[i].credit_card.id+")'>Remove</span></td></tr>");
     		}
     		$("#levelup_card_manage_page table tr #remove-card").hide();//
     		$("#levelup_card_manage_page table tr #radio-card").show();//
     		
     		$("#levelup_card_manage_page table tr").swipeleft(function(event) {
     			$(this).find("#remove-card").hide();
     			$(this).find("#radio-card").show();
     		});
     		$("#levelup_card_manage_page table tr").swiperight(function(event) {
     			$("#levelup_card_manage_page table tr #remove-card").hide();
     			$("#levelup_card_manage_page table tr #radio-card").show();
     			$(this).find("#radio-card").hide();
     			$(this).find("#remove-card").show();
     		});
     		
      	},
      	error: function(error){
      		showAlert(error.responseJSON[0].error.message);
       	}
    });
	
});

function changePromotedCard(cardId){
	$.ajax({
 		type: 'PUT',
      	url: levelup_promote_card + cardId,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Token ' + user.accessToken.accessToken
		},
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg(); },
		success: function(data){
			//{"credit_card":{"bin":"374328","debit":false,"description":"American Express ending in 5851","expiration_month":2,"expiration_year":2017,"id":553965,"last_4":"5851","promoted":true,"state":"active","type":"American Express"}}
		},
      	error: function(error){
      		showAlert(error.responseJSON[0].error.message);
       	}
    });
	
}
function deleteCard(cardId){
	$.ajax({
		type: 'DELETE',
		url: levelup_promote_card+cardId,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Token ' + user.accessToken.accessToken
		},
		beforeSend: function() {$.mobile.showPageLoadingMsg();},
		complete: function() {$.mobile.hidePageLoadingMsg();},
		success: function(data){
			$("#levelup_card_manage_page #myCards #item_"+cardId).remove();
		},
		error: function(error){
			showAlert(error.responseJSON[0].error.message);
		}
	});
	
}
function changeToAddCardPage(){
	toPage("#levelup_add_card_page");
}
//levelup_card_manage_page end

//levelup_add_card_page start
$(document).delegate('#levelup_add_card_page', 'pageshow', function () {
	$("#levelup_add_card_page #cardNumber").val("");
	$("#levelup_add_card_page #cvn").val("");
	$("#levelup_add_card_page #year").val("");
	$("#levelup_add_card_page #month").val("");
	$("#levelup_add_card_page #zip").val("");
});
function doAddCard(){
	var braintree = Braintree.create(levelup_braintree_clientside_encryption_key);
	
	var cardNumber=$("#levelup_add_card_page #cardNumber").val();
	var cvn=$("#levelup_add_card_page #cvn").val();
	var year=$("#levelup_add_card_page #year").val();
	var month=$("#levelup_add_card_page #month").val();
	
	var encrypted_number = braintree.encrypt(cardNumber);
	var encrypted_cvv = braintree.encrypt(cvn);
	var encrypted_expiration_year = braintree.encrypt(year);
	var encrypted_expiration_month = braintree.encrypt(month);
	
	var postal_code=$("#levelup_add_card_page #zip").val();
	
	var senddata = {};
	var credit_card=new Object();
	credit_card.encrypted_cvv = encrypted_cvv;
	credit_card.encrypted_number = encrypted_number;
	credit_card.encrypted_expiration_month = encrypted_expiration_month;
	credit_card.encrypted_expiration_year = encrypted_expiration_year;
	credit_card.postal_code = postal_code;
	senddata.credit_card=credit_card;
//	log(JSON.stringify(senddata));
	
	$.ajax({
 		type: 'POST',
      	url: levelup_credit_cards,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Token ' + user.accessToken.accessToken
		},
   		data: senddata,
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg();},
     	success: function(data){
     		goBack();
      	},
      	error: function(error){
      		showAlert(error.responseJSON[0].error.message);
       	}
    });
	
	
}
//levelup_add_card_page end

//rewards_page start
$(document).delegate('#rewards_page', 'pagebeforeshow', function () {
	$("#rewards_page .knob").knob({
   		change : function (value) {
      	},
      	release : function (value) {
          	console.log("release : " + value);
      	},
      	cancel : function () {
          	console.log("cancel : ", this);
       	},
       	draw : function () {

         	// "tron" case
          	if(this.$.data('skin') == 'tron') {

             	var a = this.angle(this.cv)  // Angle
               	, sa = this.startAngle          // Previous start angle
               	, sat = this.startAngle         // Start angle
               	, ea                            // Previous end angle
               	, eat = sat + a                 // End angle
               	, r = 1;

               	this.g.lineWidth = this.lineWidth;

               	this.o.cursor
                 	&& (sat = eat - 0.3)
                  	&& (eat = eat + 0.3);

                  	if (this.o.displayPrevious) {
                     	ea = this.startAngle + this.angle(this.v);
                      	this.o.cursor
                         	&& (sa = ea - 0.3)
                          	&& (ea = ea + 0.3);
                      	this.g.beginPath();
                       	this.g.strokeStyle = this.pColor;
                       	this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                       	this.g.stroke();
                  	}

                  	this.g.beginPath();
                   	this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                   	this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                  	this.g.stroke();

                  	this.g.lineWidth = 2;
                  	this.g.beginPath();
                   	this.g.strokeStyle = this.o.fgColor;
                   	this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                   	this.g.stroke();

                   	return false;
          	}
      	}
   	});
});

$(document).delegate('#rewards_page', 'pageshow', function () {
	curPage="rewards_page";
	if(isNull(user.merchantId)||user.merchantId==0){
		showAlert("No merchantId found. Should sign in LevelUp.");
		return;
	}
	$.ajax({
 		type: 'GET',
      	url: 'https://api.thelevelup.com/v14/merchants/'+user.merchantId+'/loyalty',
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Token ' + user.accessToken.accessToken
		},
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg();},
     	success: function(data){
//     		log(JSON.stringify(data));
     		$("#rewards_page .knob").val(data.loyalty.progress_percentage).trigger("change");
     		$("#rewards_page #availableCredit").text("$"+(data.loyalty.potential_credit_amount/100).toFixed(2));
     		$("#rewards_page #totalSaving").text("$"+(data.loyalty.savings_amount/100).toFixed(2));
     		
     		$("#rewards_page #center").text("$"+((data.loyalty.merchant_spend_amount-data.loyalty.spend_remaining_amount)/100).toFixed(2));
     		$("#rewards_page #spend").text("$"+(data.loyalty.merchant_spend_amount/100).toFixed(0));
     		$("#rewards_page #get").text("$"+(data.loyalty.merchant_earn_amount/100).toFixed(2));
//     		g_rewardsAvailableCredit = data.loyalty.potential_credit_amount/100;
      	},
      	error: function(error){
      		showAlert(error.responseJSON[0].error.message);
       	}
    });
});
//rewards_page end

//setting_page start
$(document).delegate('#setting_page', 'pageinit', function () {
	$("#setting_page #appVersion").text(appConfig.versionName);
	$("#setting_page #checkAppVersion").click(function(){
		doCommandCheckVersion(appConfig,true);
	});
	//$("#setting_page #swicher option[value='"+storeNotification+"']").attr("selected",true);
	//$('#setting_page #swicher').slider("refresh");
});

function toSelectCardPage(){
	if(isNull(user.accessToken)){
		whichPageToLevelUpSignInPage=1;
		toPage("#levelup_signin_page");
	}else{
		toPage("#levelup_card_manage_page");
	}
}

$(document).delegate('#setting_page', 'pageshow', function () {
	curPage="setting_page";
	
});
/*
function onDistanceNotification(dom){
	var i=dom.selectedIndex;  
	storeNotification=dom.options[i].value;
//	log("====="+i+"====="+storeNotification);
	if(device.platform==="Android"){
		write(storeNotification,"mobovip","notification.txt");//write to a file in sdcard
	}else if(device.platform==="iOS"){
		write(storeNotification,"mobovip","notification.txt");//write to a file in sdcard
		if(storeNotification==="on"){
			if(!hasDistanceWatchCleared&&watchID==null){
				watchPosition(data);
			}
		}else{
			clearWatch();
			hasDistanceWatchCleared=true;
		}
	}
	
}
*/
//setting_page end
//my_profile_page start
$(document).delegate('#my_profile_page', 'pageshow', function () {
	curPage="my_profile_page";
	$("#my_profile_page #face_name").text(isNull(user.name.trim())?"":user.name);
	$("#my_profile_page #email").text(isNull(user.email)?"":user.email);
	$("#my_profile_page #name").text(isNull(user.name.trim())?"":user.name);
	$("#my_profile_page #phoneNumber").text(isNull(user.mobile)?"":user.mobile);
	
	var birthday=isNull(user.birthDate)?"":user.birthDate.trim();
	if(birthday.length>0){
//		birthday=birthday.split(" ")[0];
		birthday=birthday.substring(0,10);
		var ymd=birthday.split("-");
		var year=ymd[0];
		var month=ymd[1];
		var day=ymd[2];
		birthday=month+"/"+day+"/"+year;
	}
	$("#my_profile_page #birthday").text(birthday);
	
	if(isNull(user.imgOriginalUrl)||user.imgOriginalUrl.lastIndexOf("null")!=-1){
		$("#my_profile_page #face").attr("src","img/default_face.jpg");
	}else{
		$("#my_profile_page #face").attr("src",user.imgOriginalUrl);
	}
});

function onFaceImgClick(flag){
//	var w=$("#my_profile_page #face").width();
//	var h=$("#my_profile_page #face").height();
	var w=440;
	var h=440;
	
	var quality = device.platform==="Android"?100:45;
//	log("device.platform="+device.platform+";quality====="+quality);
	var cameraOptions;
	if(flag==0){
		cameraOptions={	
				quality : quality,//ios为了避免部分设备上出现内存错误，quality的设定值要低于50。
				destinationType : Camera.DestinationType.FILE_URI,//FILE_URI,DATA_URL
				sourceType : Camera.PictureSourceType.CAMERA,//CAMERA,SAVEDPHOTOALBUM
				allowEdit : true,
				encodingType : Camera.EncodingType.JPEG,//JPEG,PNG
				targetWidth : w,
				targetHeight : h
		};
	}else{
		cameraOptions={	
				quality : quality,//ios为了避免部分设备上出现内存错误，quality的设定值要低于50。
				destinationType : Camera.DestinationType.FILE_URI,//FILE_URI,DATA_URL
				sourceType : Camera.PictureSourceType.PHOTOLIBRARY,//CAMERA,SAVEDPHOTOALBUM
				allowEdit : true,
				encodingType : Camera.EncodingType.JPEG,//JPEG,PNG
				targetWidth : w,
				targetHeight : h
		};
	}
	navigator.camera.getPicture( onCameraSuccess, onCameraError, cameraOptions);
}

function onCameraSuccess(imageURI){//imageData
//	log("data==="+imageURI);
//	$("#my_profile_page #face").attr("src","data:image/jpeg;base64," + imageData);
	
	updateWhichField=5;
	user.imgOriginalUrl=imageURI;
	
	$("#my_profile_page #face").attr("src",user.imgOriginalUrl);
	
	var fileName=imageURI.substr(imageURI.lastIndexOf('/') + 1);
	var options = new FileUploadOptions();
	options.fileKey = "fieldName";
	if(fileName.indexOf('?')==-1){
		options.fileName = fileName;
	}else{
		options.fileName = fileName.substr(0,fileName.indexOf('?'));
	}
	
	 options.mimeType = "image/jpeg";
	//options.mimeType = "multipart/form-data";
	 options.chunkedMode = false;
	 
	 var params = {};
	 params.sid = user.sid;
	 params.fileType = "customer";
	 options.params = params;
	 
	 var uri = encodeURI(BASE_URL+"phoneCustomer/updateCustomerInfo.action?sid="+user.sid+"&fileType=customer");

	 var ft = new FileTransfer();
	 ft.upload(imageURI, uri, onFileUploadSuccess, onFileUploadFail, options);
}

function onCameraError(message){
	log('Failed because: ' + message);
}

function onFileUploadSuccess(result){
	//log("========onFileUploadSuccess===========");
//	log("Code = " + result.responseCode+";Response = " + result.response+";Sent = " + result.bytesSent);
}
function onFileUploadFail(error){
	log("code = "+error.code+";upload error source = " + error.source+";upload error target = " + error.target);
}
//my_profile_page end
//change_xxx_page start
$(document).delegate('#change_name_page', 'pageshow', function () {
	$("#change_name_page #firstName").val("");
	$("#change_name_page #lastName").val("");
});
var updateWhichField=0;
function doCommandChangeName(){
	var firstName=$("#change_name_page #firstName").val().trim();
	var lastName=$("#change_name_page #lastName").val().trim();
	if(isNull(firstName)&&isNull(lastName)){
		return;
	}
	updateWhichField=2;
	text_bak=firstName + " "+ lastName;
	var senddata = {};
	senddata.sid = user.sid;
	senddata.firstName = firstName;
	senddata.lastName = lastName;
	ajax(COMMAND_UPDATE_CUSTOMER_INFO,UPDATE_CUSTOMER_INFO_URL,senddata);
}

$(document).delegate('#change_birthday_page', 'pageinit', function () {
	$('#change_birthday_page #birthday').pickadate({
			    
		selectMonths: true,
	    selectYears: 45,
	    format: 'yyyy-mm-dd',
	    formatSubmit: 'yyyy-mm-dd',
		min: new Date(1970,1,1),
		max: new Date(),
        today: '',
        clear: '',
        close: 'Close'
			    
	});
			
});

$(document).delegate('#change_birthday_page', 'pageshow', function () {
	var birthday=$("#change_birthday_page #birthday").val("");
});

function doCommandChangeBirthday(){
	var birthday=$("#change_birthday_page #birthday").val().trim();
	if(isNull(birthday)){
		showAlert("Please insert the birthday");
		return;
	}
	text_bak=birthday;
	updateWhichField=4;
	var senddata = {};
	senddata.sid = user.sid;
	senddata.birthDate = birthday;
	ajax(COMMAND_UPDATE_CUSTOMER_INFO,UPDATE_CUSTOMER_INFO_URL,senddata);
}

$(document).delegate('#change_phone_page', 'pageshow', function () {
	$("#change_phone_page #phoneNumber").val("");
});

function doCommandChangePhone(){
	var mobile=$("#change_phone_page #phoneNumber").val().trim();
	var filter = /^[0-9-+]+$/;
	var phoneVaild = filter.test(mobile);
	if(phoneVaild == false) {
		showAlert("Please insert a valid phone number.");
		return ;
	}
	text_bak=mobile;
	var senddata = {};
	senddata.sid = user.sid;
	senddata.mobile = mobile;
	ajax(COMMAND_UPDATE_PHONE,UPDATE_PHONE_URL,senddata);
}

$(document).delegate('#change_email_page', 'pageshow', function () {
	$("#change_email_page #email").val("");
});
function doCommandChangeEmail(){
	var email=$("#change_email_page #email").val().trim();
	var re = /\S+@\S+\.\S+/;
	var emailValid = re.test(email);
	if (emailValid == false) {
		showAlert("Please insert a valid email.");
		return ;
	}
	text_bak=email;
	var senddata = {};
	senddata.sid = user.sid;
	senddata.email = email;
	ajax(COMMAND_UPDATE_EMAIL,UPDATE_EMAIL_URL,senddata);
}

$(document).delegate('#change_password_page', 'pageshow', function () {
	$("#change_password_page #oldPassword").val("");
	$("#change_password_page #password").val("");
	$("#change_password_page #confirmPassword").val("");
});

function doCommandChangePassword(){
	var oldPasswd = $("#change_password_page #oldPassword").val().trim();
	var newPasswd = $("#change_password_page #password").val().trim();
	if (newPasswd.length < 6 || newPasswd.length > 20) {
		showAlert("Please insert a valid password. ");
		return;
	}
	var confirmPassword = $("#change_password_page #confirmPassword").val().trim();
	if(newPasswd != confirmPassword){
		showAlert("The passwords entered does not match. ");
		return ;
	}
	text_bak=newPasswd;
	var senddata = {};
	senddata.sid = user.sid;
	senddata.oldPasswd = oldPasswd;
	senddata.newPasswd = newPasswd;
	ajax(COMMAND_UPDATE_PASSWORD,UPDATE_PASSWORD_URL,senddata);
}
//change_xxx_page end
//about_us start
$(document).delegate('#about_us_page', 'pageshow', function () {
	curPage="about_us_page";
	$("#about_us_page #appVersion").text(appConfig.versionName);
});
$(document).delegate('#sign_in_page', 'pageshow', function () {
	curPage="sign_in_page";
	$("#sign_in_page #login_email").val("");
	$("#sign_in_page #login_password").val("");
});

$(document).delegate('#sign_up_page', 'pageshow', function () {
	curPage="sign_up_page";
	$("#sign_up_page #email").val("");
	$("#sign_up_page #firstName").val("");
	$("#sign_up_page #lastName").val("");
	$("#sign_up_page #phoneNumber").val("");
	$("#sign_up_page #password").val("");
	$("#sign_up_page #confirmPassword").val("");
});
//about_us end

//my_payment_card_page start
$(document).delegate('#my_payment_card_page', 'pageshow', function () {
	curPage="my_payment_card_page";
	$("#my_payment_card_page table tr td:eq(1)").css("background","#424242").siblings(":gt(0)").css("background","#272727");
	
	$("#my_payment_card_page table tr td:gt(0)").click(function(){
		var tip=$(this).text();
		refreshQRCode(tip,paymentToken.paymentTokenData);
		$(this).css("background","#424242").siblings(":gt(0)").css("background","#272727");
	});
	
	$.ajax({
 		type: 'GET',
      	url: levelup_payment_token,
    	async: false,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Token ' + user.accessToken.accessToken
		},
	    beforeSend: function() {$.mobile.showPageLoadingMsg();},
	    complete: function() {$.mobile.hidePageLoadingMsg();},
     	success: function(data){
     		paymentToken.paymentTokenData=data.payment_token.data;
     		if(isNull(paymentToken.paymentTokenData)){
     			//toPage("#levelup_card_manage_page");
     			showAler("No Payment Token Found.");
     		}else{
     			//LU02000Z0OGTQP5KXZMJFZ0W
     			refreshQRCode(null,paymentToken.paymentTokenData);
     		}
      	},
      	error: function(error){
      		if(error.status==404){
      			navigator.notification.confirm(
      					"This account isn't eligible for payment.Please check the credit card(s) associated it.",
      					 function(buttonIndex){
      						if(buttonIndex==1){
      							toPage("#levelup_card_manage_page");
      						}else if(buttonIndex==2){
      							goBack();
      						}
      					}, 
      			         appName, 
      				    ['OK','Cancel']
      				);
      			
      		}else{
      			showAlert(error.status+":"+error.statusText);
      		}
       	}
    });
	
});

function refreshQRCode(tip,payment_token){
	if(isNull(payment_token)){
		return;
	}
	if(tip==null||tip.length==0){
		tip = "00";
	}else if(tip=="0"){
		tip = "00";
	}else if(tip=="5"){
		tip = "05";
	}else if(tip=="10"){
		tip = "0A";
	}else if(tip=="15"){
		tip = "0F";
	}else{
		
	}
	tip = "020"+tip+"0LU";
	var QR = payment_token+""+tip;
	var options = {
		render: 'div',
		ecLevel: 'L',
		background: '#FFF',
		text: QR,
		size: parseInt($("#qrcode").width(), 10)*0.7,
		mSize: 0.1,
		mPosX: 0.5,
		mPosY: 0.5,
		label: 'no label',
		fontname: 'sans',
		fontcolor: '#FFF'
	};
	$("#qrcode").empty().qrcode(options);
}

//my_payment_card_page end

//share_with_facebook_page start
function doShareWithFacebook(){
		CDV.FB.getLoginStatus(
		        function (status) {
		        	if(status=="OPENED"){
		        		publishStory();
		        	}else{
		        		CDV.FB.login(
		        				{scope: 'user_birthday,user_status,email,user_location,offline_access,user_about_me,user_likes,user_interests,user_education_history'},
		        			    fbLoginSuccess,
		        			    function (error) { alert("" + error) }
		        			);
		        	}
		           
		        }
		    );
}

var fbLoginSuccess = function (userData) {
	publishStory();
};

function publishStory() {
//	{"id":"1561608434065788","first_name":"Guijun","birthday":"12\/18\/1981","timezone":8,"verified":true,"name":"Guijun Ni","locale":"zh_CN","link":"https:\/\/www.facebook.com\/app_scoped_user_id\/1561608434065788\/","last_name":"Ni","gender":"male","updated_time":"2013-08-21T01:47:02+0000"}
	var name=store.storeName;
	var caption=store.storeAddress;
	var message="The Burger Joint";
	var description="The Burger Joint-"+store.storeName;
	var link="https://www.google.com/#q="+store.storeName;
	
	var options = { method:"feed",name:name,caption:caption,message:message,description:description,link:link};
    CDV.FB.showDialog(options,
        function (result) {
    		showAlert("Your message is shared with your friends.");
        },
        function (e) {
            log(""+e);
    });
}
//share_with_facebook_page end

////////////////////////////////////////////////////////////////////////////////////////
//start watchPosition < 3miles notification
var watchID=null;
var data=null;//store list data
var hasDistanceWatchCleared=false;
function watchPosition(data){
	this.data=data;
	var options = { frequency: frequencyForNotification };
	watchID = navigator.geolocation.watchPosition(onWatchPositionSuccess, onWatchPositionError, options);
	
}
var once=false;//add for ios bug,ios will notify twice.
function onWatchPositionSuccess(position){
	$.each(data.listStroe,function(i,item){
		var distance=GetDistance(item.latitude,item.longitude,position.coords.latitude,position.coords.longitude);
		
		if(parseFloat(distance)<parseFloat(diatanceForNotification)){
			clearWatch();
			hasDistanceWatchCleared=true;
			if(!once){
				once=true;
				navigator.notification.confirm(
					item.storeAddress,
			        function(){},
			        item.storeName+"("+distance+")",
			        'OK'
				);
			}
			return false;
		}
	});
}

function onWatchPositionError(){
	//log("==========onWatchPositionError==========")
}

function clearWatch() { 
    if (watchID != null) { 
        navigator.geolocation.clearWatch(watchID); 
        watchID = null; 
    } 
}

///////////////////////////////////////////////////////////////////////////
//gcm push
function successHandler(result){
	//console.log('Callback Success! Result = ' + result);
}
function errorHandler(error){
	//console.log('error===============' + error);
}
function onNotification(e){
	switch(e.event){
		case 'registered':
			if(e.regid.length > 0){
//				console.log("Regid=======" + e.regid);
				//showAlert('registration id = ' + e.regid);
				
				user.deviceId=e.regid;
				storage.set('deviceId', user.deviceId);
				
				var senddata = {};
				senddata.deviceId = user.deviceId;
				senddata.deviceType = appConfig.type;
				ajax(COMMAND_DEVICE_REGISTER,DEVICE_REGISTER_URL,senddata);
			}
			break;
		 case 'message':
		 	showAlert(e.message);
		 	break;
		 case 'error':
		 	showAlert(e.msg);
		 	break;
		 default:
			showAlert('An unknown GCM event has occurred');
		 	break;
	}
}

//for ios
function onNotificationAPN (event) {
    if ( event.alert ){
    	showAlert(event.alert);
        //navigator.notification.alert(event.alert);
    }

    if ( event.sound ){
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge ){
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}

function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
//    alert('device token = ' + result);
    if(result.length > 0){
    	//console.log("=======Regid " + result + "=============");
    	//alert('result = ' + result);
    	
    	user.deviceId=result;
		storage.set('deviceId', user.deviceId);
		
		var senddata = {};
		senddata.deviceId = user.deviceId;
		senddata.deviceType = appConfig.type;
		ajax(COMMAND_DEVICE_REGISTER,DEVICE_REGISTER_URL,senddata);
		
    }
    
}
