var appConfig=new Object(); 
appConfig.type=2;//android or ios
appConfig.brandId = 1;
appConfig.companyId = 1;
appConfig.appName="bgr";//mobovip
appConfig.app_name_aliase="bgr";//mobovip
appConfig.versionCode=20140818;
appConfig.versionName="2.3.3";

//var diatanceForNotification="3";
//var frequencyForNotification=60000;//每隔3秒钟检索一次位置信息 

var user=new Object();
user.isLogin=false;
user.deviceId="";
var store=new Object();
var myDishes=new Array();
var dish=new Object();
var paymentToken=new Object();
var coupon=null;
var needHomePageRefresh=false;//修改收藏后是否返回时刷新store list界面
var needMyOrdersPageRefresh=true;//下单成功返回后是否需要再请求my_orders_page的数据
var MY_POSITION="You are here";

var levelup_api_key = "ab863e8a68cb7b68322d780f84e295cd4658975675a483e566563cfda5368944";
var levelup_braintree_clientside_encryption_key="MIIBCgKCAQEAw57+IoKTxrOP+rtS7WFUDnz1GK6DaweQniStFtsw/Kuv3+rWR8hY+sji2NeqV8vHWG4lQShUbhBRJhji6qd4YncpjwO9E03JmZ1E/s9FyMtYm2CeggcuY1ViL6IEiLNxbp9U4P89u6gEWq4L6dZpDggr1KBtbKJYA4OnK7NskPqQaHrpS1WLlbJ171AAWfnuNzG5iKiitsU+/lb8UBG0ZoYcpvcSQeMaO3ql8LTfolgs4TMZaSEMQmOZiWHZBpz9UT0clkRatMO4rNtAGMl9zkITEf2ucqxrol3AYF4X+BEMpBsn62DCVqc38q97vzNaCglRlbwWt6aQo6gIypDXPwIDAQAB";

var CONNECT_ERROR="Can't connect to the server.";
var TIMEOUT=30000;

var COMMAND_BASE = 10000;
var COMMAND_SEND_SID=COMMAND_BASE;
var COMMAND_LOGIN=COMMAND_BASE+1;//登录
var COMMAND_SIGN_UP=COMMAND_BASE+2;//注册
var COMMAND_UPDATE_PHONE = COMMAND_BASE+4;//修改电话
var COMMAND_UPDATE_EMAIL = COMMAND_BASE+5;//修改邮箱
var COMMAND_UPDATE_PASSWORD = COMMAND_BASE+6;//修改密码
var COMMAND_FIND_STORE_LIST = COMMAND_BASE+10;//门店列表（包括查询）
var COMMAND_FIND_STORE_INFO = COMMAND_BASE+11;//门店详情
var COMMAND_ADD_COLLECT=COMMAND_BASE+12;//收藏门店
var COMMAND_DELETE_COLLECT=COMMAND_BASE+13;//删除收藏
var COMMAND_DELETE_COLLECT_FROM_FAVORITE_PAGE=COMMAND_BASE+130;//删除收藏
var COMMAND_FIND_COLLECT_LIST = COMMAND_BASE+14;//用户收藏列表
var COMMAND_FIND_STORE_COUPON = COMMAND_BASE+15;//获取会员当前可用优惠券
var COMMAND_LOGIN_OUT = COMMAND_BASE+16;//退出
var COMMAND_FIND_CATEGORY = COMMAND_BASE+17;//请求指定门店菜品分类列表
var COMMAND_FIND_MENU_INFO = COMMAND_BASE+18;//请求指定门店菜品列表
var COMMAND_FIND_ORDER_LIST = COMMAND_BASE+20;//订单记录
var COMMAND_FIND_MODIFIER = COMMAND_BASE+21;//菜系辅料
var COMMAND_ADD_ORDER = COMMAND_BASE+22;//提交订单
var COMMAND_ORDER_DETAIL = COMMAND_BASE+24;//查看订单详情
var COMMAND_FIND_VERSION = COMMAND_BASE+26;//检查更新
var COMMAND_DELETE_ORDER = COMMAND_BASE+28;//删除订单
var COMMAND_VERIFICATION_CODE = COMMAND_BASE+30;//发送验证码（忘记密码）
var COMMAND_RESET_PWD = COMMAND_BASE+31;//忘记密码
var COMMAND_LEVELUP_PAYMENT = COMMAND_BASE+33;//付款
var COMMAND_UPDATE_LEVELUP_ACCESS_TOKEN = COMMAND_BASE+32;//更新levelup AccessToken
var COMMAND_GOT_MOBILE = COMMAND_BASE+37;//跳转忘记密码界面查询手机号接口
var COMMAND_LOGIN_BY_FACEBOOK = COMMAND_BASE+38;//FACEBOOK
var COMMAND_REORDER = COMMAND_BASE+39;//再下订单
var COMMAND_LOGIN_ALL_NUM = COMMAND_BASE+41;//会员订单数量等
var COMMAND_UPDATE_CUSTOMER_INFO = COMMAND_BASE+42;//update用户信息
var COMMAND_DEVICE_REGISTER = COMMAND_BASE+100;//push register

//var URI = "http://192.168.0.110";
//var URI = "http://211.152.35.162";
var URI="http://54.214.8.118";
//var URI="http://54.189.99.203";

var IMG_BASE_URL = URI+":8888/";
var BASE_URL = URI+":8080/";
var SEND_SID_URL = BASE_URL+"common/sendSidAction.action";
var LOGIN_URL = BASE_URL+"phoneCustomer/phoneLogin.action";
var SIGN_UP_URL = BASE_URL+"phoneCustomer/addCustomer.action";
var STORE_LIST_URL = BASE_URL+"phoneStore/findStoreList.action";
var STORE_INFO_URL = BASE_URL+"phoneStore/findStoreInfo.action";
var LOGIN_OUT_URL = BASE_URL+"phoneCustomer/loginOut.action";//
var UPDATE_PHONE_URL = BASE_URL+"phoneCustomer/updateCustomerMobile.action";//修改电话
var UPDATE_EMAIL_URL = BASE_URL+"phoneCustomer/updateCustomerEmail.action";//修改邮箱
var UPDATE_PASSWORD_URL = BASE_URL+"phoneCustomer/updateCustomerPwd.action";//修改密码
var ADD_COLLECT_URL = BASE_URL+"phoneCollect/addCollect.action";//收藏门店
var DELETE_COLLECT_URL = BASE_URL+"phoneCollect/deleteCollect.action";//删除收藏
var FIND_COLLECT_LIST_URL = BASE_URL+"phoneCollect/findStoreCusCollectList.action";//用户收藏列表
var FIND_STORE_COUPON_URL = BASE_URL+"phoneStore/findStoreCoupon.action";//获取会员当前可用优惠券
var DELETE_ORDER_URL = BASE_URL+"phoneOrder/deleteCustomerOrder.action";//删除订单

var FIND_CATEGORY_URL = BASE_URL+"phoneStore/findCategory.action";//
var FIND_MENU_INFO_URL = BASE_URL+"phoneStore/findMenuInfo.action";//
var FIND_MODIFIER_URL = BASE_URL+"phoneStore/findMenuModifier.action";//
var ADD_ORDER_URL = BASE_URL+"phoneOrder/addOrder.action";//
var LEVELUP_PAYMENT_URL = BASE_URL+"phoneOrder/levelUpPayment.action";//
var UPDATE_LEVELUP_ACCESS_TOKEN_URL = BASE_URL+"phoneCustomer/updateCustomerAccessToken.action";//更新levelup AccessToken
var VERIFICATION_CODE_URL = BASE_URL+"phoneCustomer/sendVerCode.action";//发送验证码（忘记密码）
var RESET_PWD_URL = BASE_URL+"phoneCustomer/resetCustomerPwd.action";//忘记密码
var FIND_VERSION_URL=BASE_URL+"common/findVersion.action";//检查更新
var FIND_ORDER_LIST_URL = BASE_URL+"phoneOrder/findCusDishOrders.action";//订单记录
var ORDER_DETAIL_URL = BASE_URL+"phoneOrder/customerOrderDetail.action";//查看订单详情
var LOGIN_ALL_NUM_URL = BASE_URL+"phoneCustomer/loginAllNum.action";//会员订单数量等
var LOGIN_BY_FACEBOOK_URL = BASE_URL+"phoneCustomer/loginByFaceBook.action";//Facebook
var REORDER_URL = BASE_URL+"phoneOrder/reorderMenuDishs.action";//再下订单
var GOT_MOBILE_URL = BASE_URL+"phoneCustomer/findCustomerMobile.action";//跳转忘记密码界面查询手机号接口
var UPDATE_CUSTOMER_INFO_URL = BASE_URL+"phoneCustomer/updateCustomerInfo.action";//update用户信息
var DEVICE_REGISTER_URL = BASE_URL+"bjDeviceInfo/bjDeviceRegister.action";//push register

//levelup urls
var BASE_LEVELUP_URL="https://api.thelevelup.com/v14/"
var levelup_payment_token=BASE_LEVELUP_URL+"payment_token";
var levelup_register=BASE_LEVELUP_URL+"users";
var levelup_sign_in=BASE_LEVELUP_URL+"access_tokens";
var levelup_credit_cards=BASE_LEVELUP_URL+"credit_cards";
var levelup_promote_card=BASE_LEVELUP_URL+"credit_cards/";//+id
var levelup_forgot_password=BASE_LEVELUP_URL+"passwords";

function ajax(command,url,sendData){
	$.ajax({
		url: url,
		type : "post",
		dataType : "jsonp",
		timeout: TIMEOUT,
		data: sendData,
		beforeSend: function() {
			$.mobile.showPageLoadingMsg();
			},
	    complete: function() {
	    	$.mobile.hidePageLoadingMsg();
	    	},
		success: function(data){
			//log(command+":"+JSON.stringify(data));
			if(data.result.code !=0){
				if(data.result.code ==100){//not login or overdue
					doCommandSid();
				}else{
					showAlert(data.result.msg);
				}
				return;
			}
			onSuccess(command,data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			log(JSON.stringify(errorThrown));
			showAlert(CONNECT_ERROR);//error
		}
	});
}

var text_bak;//a data bak,not a good idea.
var myScroll=null;
function onSuccess(command,data){
	switch(command){
	case COMMAND_DEVICE_REGISTER:
		log("Registe Push Success");
//		log(JSON.stringify(data));
//		Toast.showShort(JSON.stringify(data));
		break
	case COMMAND_GOT_MOBILE:
		$("#forgot_password_page #phoneNumber").val(data.customerOut.mobile);
		break;
	case COMMAND_REORDER:
//		log(JSON.stringify(data));
		$.each(data.menuDishList,function(i,item){
			if(item.brandMenuDishId==myDishes[i].brandMenuDishId){
				myDishes[i].brandDishName=item.brandDishName;
				myDishes[i].availDt=item.availDt;//1234567,00:00 - 23:59
				myDishes[i].currentPrice=item.currentPrice;
//				myDishes[i].modifiers=item.modifiers;
				myDishes[i].dishModifierId=item.dishModifierId;
				myDishes[i].description=item.description;
			}
		});
		for(var i=0;i<myDishes.length;i++){
			if(isNull(myDishes[i].currentPrice)||isNaN(myDishes[i].currentPrice)){
				myDishes.splice(i,1);//delete it
				i=i-1;
			}
		}
		toPage("#order_page");
		break;
	case COMMAND_LOGIN_BY_FACEBOOK:
//		log(JSON.stringify(data));
		storage.set('FACEBOOK_ID', user.facebookId);
		doLoginSuccess(data);
		break;
	case COMMAND_DELETE_ORDER:
		var orderNum=parseInt($("#homepage #orderNum").text())-1;
		$("#homepage #orderNum").text(orderNum);
		break;
	case COMMAND_LOGIN_ALL_NUM:
//		log(JSON.stringify(data));
		if(data.customerBaseInfo.orderNum==0){
			$("#homepage #orderNum").hide().text(data.customerBaseInfo.orderNum);
		}else{
			$("#homepage #orderNum").show().text(data.customerBaseInfo.orderNum);
		}
		break;
	case COMMAND_UPDATE_CUSTOMER_INFO:
//		log(JSON.stringify(data));
		if(updateWhichField==2){
			user.name=text_bak;
		}else if(updateWhichField==4){
			user.birthDate=text_bak;
		}else if(updateWhichField==5){
		}
		goBack();
		break;
	case COMMAND_UPDATE_PHONE:
//		log(JSON.stringify(data));
		user.mobile=text_bak;
		goBack();
		break;
	case COMMAND_UPDATE_EMAIL:
//		log(JSON.stringify(data));
		user.email=text_bak;
		storage.set('email', user.email);
		goBack();
		break;
	case COMMAND_UPDATE_PASSWORD:
//		log(JSON.stringify(data));
		user.password=text_bak;
		storage.set('password', user.password);
		goBack();
		break;
	case COMMAND_FIND_VERSION:
//		log(JSON.stringify(data));
		if(isNull(data.versionOut)){
			if(showCheckVersionAlert){
				showAlert("It's the latest version.");
			}else{
				log("It's the latest version.");
			}
			return;
		}
		var versionNum=data.versionOut.versionNum;
		if(versionNum>appConfig.versionCode){
	           var isFource=data.versionOut.isFource;
	           if(isFource==0){//非强制更新
	        	   navigator.notification.confirm(
                          data.versionOut.feature, // message
                          function(button){
	                          if(button==1){//
	                        	  window.open(encodeURI(data.versionOut.url),'_blank', 'location=yes');
//	                        	  navigator.app.exitApp();
	                          }
                          },
                          "Found new version.",
                          ['Update','Cancel']
                          );
	           }else{
	        	   navigator.notification.alert(
                            data.versionOut.feature,
                            function(){
	                            window.open(encodeURI(data.versionOut.url),'_blank', 'location=yes');
//	                            navigator.app.exitApp();
                            },
                            "Found new version.",
                            "Update"
                            ); 
	           }
       }else{
    	   if(showCheckVersionAlert){
				showAlert("It's the latest version.");
			}else{
				log("It's the latest version.");
			}
       }
		break;
	case COMMAND_RESET_PWD:
		var msg="Update Successful.";
		navigator.notification.confirm(
				msg, // message
				function(button){
					goBack();
				},
				appName,
			   ['OK']
			   );
		break;
	case COMMAND_VERIFICATION_CODE:
		showAlert("Sent Verification Code. Check your Phone.");
		break;
	case COMMAND_UPDATE_LEVELUP_ACCESS_TOKEN:
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
	     			toPage("#levelup_card_manage_page");
	     		}else{
	     			if(whichPageToLevelUpSignInPage==0){
	     				//toPage("#order_page");
                        goBack(-2);
	     			}else{
	     				goBack();
	     			}
	     		}
	      	},
	      	error: function(error){
               if(error.responseJSON[0].error.code=="no_credit_card"){
                    navigator.notification.alert(
                            error.responseJSON[0].error.message,
                            function(){
                                if(whichPageToLevelUpSignInPage==2){
                                    if(flag==1){
                                        goBack();
                                        flag=0;
                                    }else{
                                        goBack(-2);
                                    }
                                }
                                toPage("#levelup_card_manage_page");
                            },
                            "BGR",
                            'OK'
                    );
               }else{
                    showAlert(error.responseJSON[0].error.message);
               }
	       	}
	    });
		break;
	case COMMAND_SEND_SID:
//		log(JSON.stringify(data));
		/*
		if(isNull(data.companyOut.disNotification)){
			diatanceForNotification="3";
		}else{
			diatanceForNotification=data.companyOut.disNotification;
		}
		if(device.platform==="Android"){
			write(diatanceForNotification,"mobovip","config.txt");//write to a file in sdcard
		}else if(device.platform==="iOS"){
			
		}
		*/
		
		doCommandCheckVersion(appConfig,false);
		
		//storage.clear();
		user.sid=data.sid;
		user.email=storage.get('email');
		user.password=storage.get('password');
		user.facebookId=storage.get('FACEBOOK_ID');
        if(isNull(user.email)){//没登录
			if(isNull(user.facebookId)){//没登录
				if(navigator.geolocation){
					var options = {
			                enableHighAccuracy: true,
			                maximumAge: 30000,
			                timeout: 8000
			            };
					navigator.geolocation.getCurrentPosition(onGeoSuccess , onGeoError , options);
				}else{//Geolocation is not supported by this browser.
					onGeoSuccess(null);
				}
			}else{
				doCommandLoginByFacebook(user);
			}
		}else{
			//登录成功后需要再获取地址和门店列表
			doCommandSignIn(appConfig,user);
		}
		break;
	case COMMAND_LOGIN:
//		log(JSON.stringify(data));
		storage.set('email', user.email);
		storage.set('password', user.password);
		doLoginSuccess(data);
		break;
	case COMMAND_LOGIN_OUT:
//		CDV.FB.logout();
		storage.clear();
//		user=new Object();
		user.isLogin=false;
		user.accessToken=null;//clear
		paymentToken=new Object();
		resetMainMenu(user);
		if(device.platform=="Android"){
			navigator.app.exitApp();
		}
		break;
	case COMMAND_SIGN_UP:
//		log(JSON.stringify(data));
//		doLoginSuccess(data);
		user.isLogin=true;
		storage.set('email', user.email);
		storage.set('password', user.password);
		user.mobile=data.customerOut.mobile;
		user.email=data.customerOut.email;
		user.firstName=data.customerOut.firstName;
		user.lastName=data.customerOut.lastName;
		user.name=user.firstName+" "+user.lastName;
		user.birthDate=data.customerOut.birthDate;
		user.imgOriginalUrl=IMG_BASE_URL+data.customerOut.imgOriginalUrl;
		
		user.merchantId=data.customerOut.merchantId;
		resetMainMenu(user);
        if(whichPageToSignUpPage==1){
                goBack();
        }else{
                goBack(-2);
        }
		//toPage("#homepage");//by debug
		break;
	case COMMAND_FIND_STORE_LIST:
//		log(JSON.stringify(data));
		/*
		if(device.platform==="Android"){
			write(JSON.stringify(data),"mobovip","stores.txt");//write to a file in sdcard
		}else if(device.platform==="iOS"){
			if(storeNotification==="on"){
				if(!hasDistanceWatchCleared&&watchID==null){
					watchPosition(data);
				}
			}
		}
		*/
		var h=0;
		initializeMap(curPosition);
		$("#homepage #content_store_list").empty();
		$.each(data.listStroe,function(i,item){
			item.opening=isStoreOpen(item);
			var openStatus="<span style='font-size:12px;color:red;font-weight:normal;margin-left:10px;'>[OPEN]</span>";
			if(item.opening!=0){
				openStatus="<span style='font-size:12px;color:#666;font-weight:normal;margin-left:10px;'>"+getStoreOpenRemainingTime(item)+"</span>";
			}
			var distance="";
			if(curPosition!=null){
				if(item.latitude==null||item.longitude==null){
					
				}else{
					distance=GetDistance(item.latitude,item.longitude,curPosition.coords.latitude,curPosition.coords.longitude);//
				}
			}
			var display="inline";
			if(isNull(item.customerId)||item.customerId==0){
				display="none";
			}else{
				display="inline";
			}
			var itemStr=JSON.stringify(item);
			$("#homepage #content_store_list").append("<li class='li_item' onclick='onStoreClick("+itemStr+");'><div style='font-size:16px;font-weight:bold;margin-bottom:5px;'><span>"+item.storeName+"</span>"+openStatus+"<span style='float:right'><img style='display:"+display+"' src='img/my_favorite.png'/></span></div><div><span style='font-size:14px;'>"+item.storeAddress+"</span><div><span style='font-size:14px;'>"+item.city+","+item.provinceShrtNm+" "+item.zip+"</span><span style='font-size:14px;float:right;'>"+distance+"</span></div></div></li>");
			
			if(!isNull(map)){
				if(curPosition!=null){
					addMarker(map.getCenter(),MY_POSITION);
				}
	
				if(item.latitude!=null){
					var location = new google.maps.LatLng(item.latitude,item.longitude);
					addMarker(location,item);
				}
			}
			h+=100;//每个li的高
		});
//		var h=$("#homepage #content_store_list").height()+180;//872+109;window.screen.width=1080
//		$("#homepage #content_store_list").css("width",window.screen.width);//1080

		$("#homepage #scroller").show();
		$("#homepage #content_store_list").css("height",h);
		if(myScroll==null){
			myScroll = new iScroll('wrapper',{
				vScrollbar: false,
				hScrollbar: false,
				onRefresh: function () {
				},
				onScrollMove: function () {
				},
				onScrollEnd: function () {
					var offset = $("#homepage #content_store_list").offset();
					log("this.distY="+this.distY+";offset.top="+offset.top);
					if(this.distY>250&&offset.top>50){//93
						doCommandFindStoreList(appConfig,user);
					}
				}
			});
		}else{
            myScroll.refresh();
        }
		break;
	case COMMAND_FIND_STORE_INFO:
//		log(JSON.stringify(data));
		store.storeId=data.storeOut.id;
		store.latitude=data.storeOut.latitude;
		store.longitude=data.storeOut.longitude;
		store.status=data.storeOut.status;//是否接受下单
		store.isPrize=data.storeOut.isPrize;
		store.timezone=data.storeOut.timezone;
		store.businessHours=data.storeOut.businessHours;
		store.taxRate=data.storeOut.taxRate;
		store.telephone=data.storeOut.telephone;
		store.city=data.storeOut.city;
		store.provinceShrtNm=data.storeOut.provinceShrtNm;
		store.zip=data.storeOut.zip;
		if(isNull(data.storeOut.imgOriginalUrl)){
			store.imgOriginalUrl=null;
		}else{
			store.imgOriginalUrl=IMG_BASE_URL+data.storeOut.imgOriginalUrl;
		}
		store.isPrize=data.storeOut.isPrize;
		store.storeName=data.storeOut.storeName;
		store.storeAddress=data.storeOut.storeAddress;
		store.estPrepTime=data.storeOut.estPrepTime;
		store.description=data.storeOut.description;
		store.locationId=data.storeOut.locationId;
		store.customerId=data.storeOut.collectId;//是否是收藏的
		
		store.isOpening=isStoreOpen(data.storeOut);
		
		$("#store_detail_page #storeName").html("<h3>"+data.storeOut.storeName+"</h3>");
		$("#store_detail_page #storeAddress").text(data.storeOut.storeAddress+" , "+data.storeOut.city+" , "+data.storeOut.provinceShrtNm+" "+data.storeOut.zip);
		$("#store_detail_page #telephone").attr("href","tel:"+data.storeOut.telephone).text(formatPhoneNumber(data.storeOut.telephone));
		
		var businessHours = data.storeOut.businessHours.split(";");
		$("#store_detail_page #time1").text(formatTime(businessHours[0]));
		$("#store_detail_page #time2").text(formatTime(businessHours[1]));
		
		$("#store_detail_page #description").text(data.storeOut.description);
		
		if(isNull(store.imgOriginalUrl)||store.imgOriginalUrl.lastIndexOf("null")!=-1){
			$("#store_detail_page #imgOriginalUrl").hide();
		}else{
			$("#store_detail_page #imgOriginalUrl").show();
			$("#store_detail_page #imgOriginalUrl").attr("src",store.imgOriginalUrl);
		}
		
		if(user.isLogin){
			$("#store_detail_page  #my_favorite").show();
			if(isNull(store.customerId)){
				$("#store_detail_page #my_favorite").attr({"src":"img/my_favorite_unchecked.png"});
			}else{
				$("#store_detail_page  #my_favorite").attr({"src":"img/my_favorite.png"});
			}
		}else{
			$("#store_detail_page  #my_favorite").hide();
		}
		toPage("#store_detail_page");
		break;
	case COMMAND_ADD_COLLECT:
//		log(JSON.stringify(data));
		store.customerId=9090909;//随便付一个值，好删除
		needHomePageRefresh=true;
		$("#store_detail_page  #my_favorite").attr({"src":"img/my_favorite.png"});
		break;
	case COMMAND_DELETE_COLLECT:
		store.customerId=0;//清掉，好添加
		needHomePageRefresh=true;
		$("#store_detail_page  #my_favorite").attr({"src":"img/my_favorite_unchecked.png"});
		break;
	case COMMAND_DELETE_COLLECT_FROM_FAVORITE_PAGE:
		needHomePageRefresh=true;
		doCommandMyFavorites(appConfig,user);
		break;
	case COMMAND_FIND_ORDER_LIST:
//		log(JSON.stringify(data));
		if(page.start==0){
			$("#my_orders_page #my_orders_list").empty();
		}
		$.each(data.cusDishOrderList,function(i,item){
			var paidAmt="$"+item.paidAmt+" for "+item.menuNum+" items";
			var status="";
			if(item.status==0||item.status==5){
				status="Preparing";
			}else if(item.status==1){
				status="Completed";
			}else if(item.status==2){
				status="Cancel";
			}else if(item.status==3){
				status="No Show";
			}else if(item.status==7){
				status="Ready";
			}
			var createTime=UTCTimeToLocalTime(item.createTime,"MM/dd/yyyy hh:mm");
			var itemStr=JSON.stringify(item);
			$("#my_orders_page #my_orders_list").append("<li data='"+itemStr+"' class='li_item' style='position:relative;top:0px;left:0px;' onclick='onOrderClick("+itemStr+")'><div><div><span>"+item.storeName+"</span><span style='float:right'>"+status+"</span></div><div><span style='font-size:14px;'><i>"+paidAmt+"</i></span><span style='font-size:14px;float:right'><i>"+createTime+"</i></span></div></div><button data='"+itemStr+"' id='remove' style='position:absolute;right:16px;top:8px;display: none;background: red;padding: 8px;color:white;'>Remove</button></li>");
		});
		
		$("#my_orders_page #my_orders_list li").swipeleft(function(event) {
			var item=$.parseJSON($(this).attr("data"));
			if(item.status==0||item.status==5||item.status==7){//Preparing||Ready
				
			}else{
				$(this).find("#remove").hide();
			}
 		});
 		$("#my_orders_page #my_orders_list li").swiperight(function(event) {
 			var item=$.parseJSON($(this).attr("data"));
 			if(item.status==0||item.status==5||item.status==7){//Preparing
 				
 			}else{
	 			$("#my_orders_page #my_orders_list li #remove").hide();//hide others
	 			$(this).find("#remove").show().off("click").on("click",function(event){
	 	 			var senddata = {};
	 	 			senddata.sid = user.sid;
	 	 			senddata.dishOrderId = item.id;
	 	 			ajax(COMMAND_DELETE_ORDER,DELETE_ORDER_URL,senddata);
	 	 			$(this).parent().remove();//
	 	 			return false;
	 	 			//event.stopPropagation();
	 	 			//event.preventDefault();
	 			});
 			}
 		});
// 		$("#my_orders_page #my_orders_list").listview("refresh");
		break;
	case COMMAND_ORDER_DETAIL:
//		log(JSON.stringify(data));
		dishOrderDetail=data.dishOrderDetail.mapValue;//
		$("#my_order_detail_page #my_dishes_list").empty();
		$.each(data.dishOrderDetail.mapValue,function(i,item){
			var itemStr=JSON.stringify(item);
			$("#my_order_detail_page #my_dishes_list").append("<li><p><span style='float:left;width:75%;font-size:16px;'>"+item.brandDishName+"</span><span style='font-size:16px;'>"+item.num+"</span><span style='float:right;font-size:16px;'>$"+item.price.toFixed(2)+"</span></p><p style='font-size:12px;padding-top:5px;'>"+item.dishOrderModifiers+"</p></li>");
		});
		$("#my_order_detail_page #my_dishes_list").listview("refresh");
		
		if(isNull(data.dishOrderDetail.couponAmt)){
			$("#my_order_detail_page #couponAmt").text("-$0.00");
		}else{
			$("#my_order_detail_page #couponAmt").text("-$"+data.dishOrderDetail.couponAmt.toFixed(2));
		}
		$("#my_order_detail_page #subtotal").text("$"+data.dishOrderDetail.amount.toFixed(2));
		$("#my_order_detail_page #tax").text("$"+(data.dishOrderDetail.paidAmt-data.dishOrderDetail.amount).toFixed(2));
		$("#my_order_detail_page #total").text("$"+data.dishOrderDetail.paidAmt.toFixed(2));
		break;
	case COMMAND_FIND_COLLECT_LIST:
//		log(JSON.stringify(data));
		$("#my_favorites_page #my_favorites_list").empty();
		$.each(data.listStroeCusCollect,function(i,item){
			item.opening=isStoreOpen(item);
			var openStatus="<span style='font-size:12px;color:red;font-weight:normal;margin-left:10px;'>[OPEN]</span>";
			if(item.opening!=0){
				openStatus="<span style='font-size:12px;color:#666;font-weight:normal;margin-left:10px;'>"+getStoreOpenRemainingTime(item)+"</span>";
			}
			var distance="";
			if(curPosition!=null){
				distance=GetDistance(item.latitude,item.longitude,curPosition.coords.latitude,curPosition.coords.longitude);//
			}
			var itemStr=JSON.stringify(item);
			
//			$("#my_favorites_page #my_favorites_list").append("<li class='li_item' onclick='onStoreClick("+itemStr+");'><div style='font-size:16px;font-weight:bold;margin-bottom:5px;'><span>"+item.storeName+"</span><span style='float:right'><img  onclick='doCommandDeleteToMyFavorite("+itemStr+")' src='img/my_favorite.png'/></span></div><div><span style='font-size:14px;'>"+item.storeAddress+"</span><div><span style='font-size:14px;'>"+item.city+","+item.provinceShrtNm+" "+item.zip+"</span><span style='font-size:14px;float:right;'>"+distance+"</span></div></div><img style='margin-top:10px;width:64px;16px;' src='"+img+"' /></li>");
			$("#my_favorites_page #my_favorites_list").append("<li class='li_item' onclick='onStoreClick("+itemStr+");'><div style='font-size:16px;font-weight:bold;margin-bottom:5px;'><span>"+item.storeName+"</span>"+openStatus+"<span style='float:right'><img  onclick='doCommandDeleteToMyFavorite("+itemStr+")' src='img/my_favorite.png'/></span></div><div><span style='font-size:14px;'>"+item.storeAddress+"</span><div><span style='font-size:14px;'>"+item.city+","+item.provinceShrtNm+" "+item.zip+"</span><span style='font-size:14px;float:right;'>"+distance+"</span></div></div></li>");
		});
		
		break;
	case COMMAND_FIND_STORE_COUPON:
//		log(JSON.stringify(data));
		var subtotal=0;
		if(whichPageToCouponsPage==1){
			subtotal = calSubtotalWithoutCoupon(myDishes);
		}
		$("#coupons_page #coupons_list").empty();
		var hasOneImg=false;
		$.each(data.storeCouponList,function(i,item){
			if(!isNull(item.imgOrigialUrl)){//存在图片
				hasOneImg=true;
			}
		});
		$.each(data.storeCouponList,function(i,item){
			
			var enabled=false;
			if(whichPageToCouponsPage==1){
				if(item.couponType==0){//具体Item
					
				}else if(item.couponType==1){//满减%
					if(!isNull(item.couponPercOffMinVal)&&subtotal>=item.couponPercOffMinVal){
						enabled=true;
					}else{
						enabled=false;
					}
				}
			}
			enabled=getCurMillTime()>=getMillTime(item.effDate)?true:false;
			
			item.imgOrigialUrl=IMG_BASE_URL+item.imgOrigialUrl;

			var img="";
			if(hasOneImg){
				if(item.imgOrigialUrl.lastIndexOf("null")==-1){
					var path=getImagePath(item.imgOrigialUrl,"72x64");
					img="<img width='72px' height='64px' src='"+path+"' onerror='onImgError(this);'/>";
				}else{
					img="<img width='72px' height='64px' src='img/default_coupon.png'/>";
				}
			}
			var itemStr=JSON.stringify(item);
			if(enabled){
				$("#coupons_page #coupons_list").append("<tr><td>"+img+"</td><td style='width:75%;padding:0px 5px;'><span style='font-size:16px;word-wrap:break-word;word-break:break-all;'>"+item.title+"</span><div style='margin-top:10px;font-size:14px;'><i>"+item.effDate+" - "+item.expDate+"</i></div></td><td><p style='height:25px;line-height:25px;font-size:14px;background:red;border-radius:5px;padding:5px 5px;text-align: center;color:white;' onclick='onRedeemClick("+itemStr+")'>Redeem</p></td></tr>");
			}else{
				$("#coupons_page #coupons_list").append("<tr><td>"+img+"</td><td style='width:75%;padding:0px 5px;'><span style='font-size:16px;word-wrap:break-word;word-break:break-all;'>"+item.title+"</span><div style='margin-top:10px;font-size:14px;'><i>"+item.effDate+" - "+item.expDate+"</i></div></td><td><p style='height:25px;line-height:25px;font-size:14px;background:gray;border-radius:5px;padding:5px 5px;text-align: center;color:white;' >Redeem</p></td></tr>");
			}
		});
//		$("#coupons_page #coupons_list").listview("refresh");
		break;
	case COMMAND_FIND_CATEGORY:
//		log(JSON.stringify(data));
		$("#foodmenu_page #categorys").empty();
		$.each(data.listCategory,function(i,item){
			var itemStr=JSON.stringify(item);
			var flag="category_normal";
			if(i==0){
				flag="category_checked";
				onCategoryClick(item);
			}
			item.num=0;
			for(var i=0;i<myDishes.length;i++){
				if(item.id==myDishes[i].categoryId){
					item.num+=myDishes[i].num;
				}
			}
			if(item.num==0){
				$("#foodmenu_page #categorys").append("<span id='category_"+item.id+"' class='category "+flag+"' onclick='onCategoryClick("+itemStr+");'>"+item.name+"</span>");
			}else{
				$("#foodmenu_page #categorys").append("<span id='category_"+item.id+"' class='category "+flag+"' onclick='onCategoryClick("+itemStr+");'>"+item.name+"("+item.num+")"+"</span>");
			}
			
		});
		
		$("#foodmenu_page #categorys>span").click(function(){
			$(this).addClass("category_checked").siblings().removeClass("category_checked");
		});

		var w=0;
		$("#foodmenu_page #categorys").children().each(function(){
			w+=$(this).outerWidth();
		});
		//log("w========"+w);//460
		$("#foodmenu_page #categorys").width(w);// w is not defined, but works ok.
		//横向滚动
		$("#boxscroll").niceScroll("#categorys",{touchbehavior:true,cursorcolor:"#FF00FF",cursoropacitymax:0.6,cursorwidth:24,usetransition:true,hwacceleration:true,autohidemode:"hidden",horizrailenabled:true});
		break;
	case COMMAND_FIND_MENU_INFO:
		//log(JSON.stringify(data));
		$("#foodmenu_page #dishes").empty();
		$.each(data.menuDishList,function(i,item){
			var text="";
			item.num=0;
			for(var i=0;i<myDishes.length;i++){
				if(item.brandMenuDishId==myDishes[i].brandMenuDishId){
					item.num+=myDishes[i].num;
//					break;
				}
			}
			if(item.num>0){
				text="x"+item.num;
			}
			var itemStr=JSON.stringify(item);
			if(item.dishModifierId==null){//
				$("#foodmenu_page #dishes").append("<tr class='tr'><td style='padding-left:10px;'><img src='img/btn_minus.png' onclick='onMinusClick("+itemStr+");'/></td><td style='padding-top:10px;padding-bottom:10px;'><span>"+item.brandDishName+"</span><span style='color:red;margin-left:10px;' id='dish_num_"+item.brandMenuDishId+"'>"+text+"</span><div>"+"$"+item.currentPrice.toFixed(2)+"</div></td><td align='right' style='padding-right:10px;'><img src='img/btn_plus.png' onclick='onPlusClick("+itemStr+");'/></td></tr>");
			}else{//
				$("#foodmenu_page #dishes").append("<tr class='tr'><td style='padding-left:10px;'></td><td style='padding-top:10px;padding-bottom:10px;'><span>"+item.brandDishName + "</span><span style='color:red;margin-left:10px;' id='dish_num_"+item.brandMenuDishId+"'>"+text+"</span><div>$"+item.currentPrice.toFixed(2)+"</div></td><td align='right' style='padding-right:10px;'><img src='img/btn_next.png' onclick='onNextClick("+itemStr+");'/></td></tr>");
			}
		});
//		$("#foodmenu_page #dishes").listview("refresh");
		calSubtotalMoney(myDishes);//reset
		break;
	case COMMAND_FIND_MODIFIER:
		//log(JSON.stringify(data));
		if(isNull(dish.description)){
			$("#dish_des").hide().text("");
		}else{
			$("#dish_des").show().text(dish.description).css("height","60px");
		}
		$("#dish_modifier_page #dish_modifier").empty();
		var c="";
		var index=0;
		$.each(data.dishModifierList,function(i,item){
			if(c!=item.modCategory){
				c=item.modCategory;
				var s=null;
				if(item.modCategorySelection==1){//radio
					s="  (one item only)";
				}else{
					s="  (multiple selection)";
				}
				$("#dish_modifier_page #dish_modifier").append("<li style='background:black;color:white;'>"+item.modCategory+s+"</li>");
				index=0;
			}else{
				
			}
			var modAmt=item.addAmt==0?"":("$"+item.addAmt.toFixed(2));
			var itemStr=JSON.stringify(item);
			var checked="";
			if(index==0&&item.isRequired==1){//必选
				checked="checked";
				if(isNull(dish.modifiers)){
					dish.modifiers=new Array();
				}
				dish.modifiers.push(item);
//				if(item.modCategorySelection==1){
//					modifier=item;
//				}
			}
			index++;
			if(item.modCategorySelection==1){//radio
				if(item.isRequired==1){
					$("#dish_modifier_page #dish_modifier").append("<li class='modifiers' style='border-bottom-width: 1px;'><span style='white-space:normal;word-wrap:break-word;'>"+item.modName+"</span><span style='float:right;'><label>"+modAmt+"<input style='float:right;margin-top:-3px;margin-left:16px;' type='radio' "+checked+" onclick='onRadioClick(this,"+itemStr+")' name='"+item.modCategory+"' /></label><span></li>");
				}else{
					$("#dish_modifier_page #dish_modifier").append("<li class='modifiers' style='border-bottom-width: 1px;'><span style='white-space:normal;word-wrap:break-word;'>"+item.modName+"</span><span style='float:right;'><label>"+modAmt+"<input style='float:right;margin-top:-3px;margin-left:16px;' type='radio' onclick='onRadioCheckClick(this,"+itemStr+")' name='"+item.modCategory+"' /></label><span></li>");
				}
			}else{//checkbox
				$("#dish_modifier_page #dish_modifier").append("<li class='modifiers' style='border-bottom-width: 1px;'><span style='white-space:normal;word-wrap:break-word;'>"+item.modName+"</span><span style='float:right;'><label>"+modAmt+"<input style='float:right;margin-top:-3px;margin-left:16px;' type='checkbox' "+checked+" onclick='onCheckClick("+itemStr+")' name='"+item.modCategory+"' /></label><span></li>");
			}
		});
		$("#dish_modifier_page #dish_modifier").listview("refresh");
		calMoneyWithModifeiers();
		break; 
	case COMMAND_ADD_ORDER:
		if(paymentToken.paidAmt==0){
			doCommandLoginAllNum();//the orders num changed
			needMyOrdersPageRefresh=true;
			//showAlert("The order is placed. Please back to the Main Menu.");
            toPage("#homepage");
		}else{
			var senddata = {};
			senddata.sid = user.sid;
			senddata.storeId = store.storeId;
			senddata.locationId = store.locationId;
			senddata.spendAmount = Math.floor(paymentToken.paidAmt*100);
			senddata.dishOrderId = data.dishOrderId;
			senddata.paymentTokenData = paymentToken.paymentTokenData;
//			senddata.winPrizeId = winPrizeId;
			ajax(COMMAND_LEVELUP_PAYMENT,LEVELUP_PAYMENT_URL,senddata);
		}
		break;
	case COMMAND_LEVELUP_PAYMENT:
//		log(JSON.stringify(data));
		doCommandLoginAllNum();//the orders num changed
		needMyOrdersPageRefresh=true;
		//showAlert("The order is placed. Please back to the Main Menu.");
        toPage("#homepage");
		break;
	}
}

function onImgError(dom){
	dom.src="img/default_coupon.png";
}

function doLoginSuccess(data){
	user.isLogin=true;
	if(navigator.geolocation){
		var options = {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 8000
            };
		navigator.geolocation.getCurrentPosition(onGeoSuccess , onGeoError , options);
	}else{//Geolocation is not supported by this browser.
		onGeoSuccess(null);
	}
//	user.deviceId=data.customerOut.deviceId;
//	storage.set('deviceId', user.deviceId);
	
	user.mobile=data.customerOut.mobile;
	user.firstName=data.customerOut.firstName;
	user.lastName=data.customerOut.lastName;
	user.name="";
	if(!isNull(user.firstName)){
		user.name+=user.firstName
	}
	if(!isNull(user.lastName)){
		user.name+=" "+user.lastName;
	}
	user.birthDate=data.customerOut.birthDate;
	user.imgOriginalUrl=IMG_BASE_URL+data.customerOut.imgOriginalUrl;
	if(isNull(data.customerOut.accessToken)){
	}else{
		var accessToken=new Object();
		accessToken.accessToken=data.customerOut.accessToken;
		accessToken.userId=data.customerOut.userId;
		user.accessToken=accessToken;
	}
	user.merchantId=data.customerOut.merchantId;
	
	resetMainMenu(user);
	goBack();
}
///////////////////////////////////////////////////////////////////////////////
//map start
//var geocoder;
var map;
var markersArray = [];
var latlng=null;
function initializeMap(position) {
	$("#map_page #content_map").width($(window).width()).height($(window).height()-40);
//	geocoder = new google.maps.Geocoder();
	if (typeof google === 'undefined') {
		log("================google is undefined================");
		return ;
	}
	if(position==null){
		latlng = new google.maps.LatLng(38.54,77.02);//华盛顿经纬度
	}else{
		latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	}
	var myOptions = {
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("content_map"), myOptions);
}

function resizeMap(){
	if (!isNull(map)) {
		google.maps.event.trigger(map, 'resize');
		map.setCenter(latlng);
	}
}

function addMarker(location, item) {
	if (item === MY_POSITION) {
		var marker = new google.maps.Marker({
			position : location,
			title : MY_POSITION,
			map : map
		});
		markersArray.push(marker);
		
		var contentString = '<div style="color:black;text-align:center;">' +MY_POSITION+'</div>';
		var win = new google.maps.InfoWindow({
		   	content: contentString
		});
		google.maps.event.addListener(marker, 'click', function() {
			win.open(map, marker);
		});
	} else {
		var marker = new google.maps.Marker({
			position : location,
			title : item.storeName,
			// icon:"img/icon.png",
			map : map
		});
		markersArray.push(marker);
		
		var contentString = '<div style="color:black;text-align:center;">' +item.storeName+'<br />' +item.storeAddress+'</div>';
        
		var infowindow = new google.maps.InfoWindow({
		   	content: contentString
		});
		google.maps.event.addListener(marker, 'click', function() {
			// map.setZoom(15);
			// map.setCenter(marker.getPosition());
			infowindow.open(map, marker);
		});

		google.maps.event.addListener(marker, 'dblclick', function() {
			onStoreClick(item);
		});

	}
}

// Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
  }
}

// Shows any overlays currently in the array
function showOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(map);
    }
  }
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
}

/*
function codeAddress() {
	var address = document.getElementById("address").value;
	if (geocoder) {
		geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			showAlert(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map, 
				position: results[0].geometry.location
			});
		} else {
			showAlert("Geocode was not successful for the following reason: " + status);
		}
		});
	}
}
*/

//onSuccess Geolocation
function onGeoSuccess(position) {
	curPosition=position;
	doCommandFindStoreList(appConfig,user);
}

// onError Callback receives a PositionError object
function onGeoError(error) {
	onGeoSuccess(null);
}

var curPosition=null;//
function doCommandFindStoreList(appConfig,user){
	var senddata = {};
	senddata.sid = user.sid;
	senddata.companyId = appConfig.companyId;
	senddata.brandId = appConfig.brandId;
	if(curPosition!=null){
		senddata.latitude=curPosition.coords.latitude;
		senddata.longitude=curPosition.coords.longitude;
	}
	var require=$("#homepage #search").val();
	if(!isNull(require)){
		senddata.require = require.trim();
	}
	ajax(COMMAND_FIND_STORE_LIST,STORE_LIST_URL,senddata);
};

//map end
///////////////////////////////////////////////////////////////////////////////
