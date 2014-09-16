package com.mobovip.app;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONObject;

import android.content.Context;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.net.wifi.WifiManager;
import android.telephony.TelephonyManager;
import android.telephony.gsm.GsmCellLocation;

public class Utils {
	public final String pattern = "###########0.00";
	/**
	 * 数字格式转换,默认货币格式
	 * 
	 * @param value
	 * @param pattern
	 * @return
	 */
	public static String convertNumberToString(Number value, String pattern) {
		String s=null;
		try {
			if (pattern == null) {
				pattern = "###########0.00";
			}
			DecimalFormat decimalFormat = new DecimalFormat(pattern);
			s=decimalFormat.format(value);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}
	
	public static boolean isEmpty(String text){
		return text==null||text.length()==0;
	}
	/**
	 * 日期�?
	 * @param day1
	 * @param day2
	 * @param format
	 * @return
	 */
	public static int days(String day1,String day2,String format){
		DateFormat df = new SimpleDateFormat(format);
		long days=0;
		try{
		    Date d1 = df.parse(day1);
		    Date d2 = df.parse(day2);
		    long diff = Math.abs(d1.getTime() - d2.getTime());
		    days = diff / (1000 * 60 * 60 * 24);
		}
		catch (Exception e){
		}
		return (int)days;
	}
	/**
	 * 
	 * @param HHmm
	 * @return
	 */
	public static String to12Hours(String HHmm){
		String[] t=HHmm.trim().split(":");
		int start=Integer.parseInt(t[0]);
		String a="am";
		if(start>12){
			start-=12;
			a="pm";
		}
		return String.valueOf(start)+":"+t[1]+a;
	}
	/**
	 * 时间格式转换
	 * @param time
	 * @param format
	 * @param toFormat 另一种格�?
	 * @return
	 */
	public static String timeFormatToOther(String time,String format,String toFormat){
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		long millionSeconds=0;
		try {
			millionSeconds = sdf.parse(time).getTime();//毫秒
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		SimpleDateFormat to = new SimpleDateFormat(toFormat);
		return to.format(new Date(millionSeconds));
	}

	/**
	 * 时间转毫秒�?
	 * @param time
	 * @param format
	 * @return
	 */
	public static long timeToMillis(String time,String format){
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		long millionSeconds=0;
		try {
			millionSeconds = sdf.parse(time).getTime();//毫秒
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return millionSeconds;
	}
	/**
	 * 服务器时间转本地时间
	 * @param time
	 * @return
	 */
	public static String timeToLocalTime(String time,String format){
//		SimpleDateFormat sd1 = new SimpleDateFormat(format);
//		sd1.setTimeZone(TimeZone.getTimeZone("GMT"));//GMT
//		long millionSeconds=0;
//		try {
//			millionSeconds = sd1.parse(time).getTime();//毫秒
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//		
//		SimpleDateFormat sdf=new SimpleDateFormat(format);
//		return sdf.format(new Date(millionSeconds));
		
		Calendar calendar = Calendar.getInstance();
		int zoneOffset = calendar.get(Calendar.ZONE_OFFSET);//取得时间偏移�?
		int dstOffset = calendar.get(Calendar.DST_OFFSET);  //取得夏令时差
		
		SimpleDateFormat s = new SimpleDateFormat(format);
//		sd1.setTimeZone(TimeZone.getTimeZone("GMT"));
		long millionSeconds=0;
		try {
			millionSeconds = s.parse(time).getTime();//毫秒
		} catch (ParseException e) {
			e.printStackTrace();
		}
		millionSeconds+=(zoneOffset+dstOffset);
		SimpleDateFormat sdf=new SimpleDateFormat(format);
		return sdf.format(new Date(millionSeconds));
	}
	
	/**
	 * 获得当前时间,格式由format指定
	 * 
	 * @param format
	 * @return
	 */
	public static String getCurTime(String format) {
		long now = System.currentTimeMillis();
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(now);
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(calendar.getTime());
	}
	
	/**
	 * 获得当前星期�?星期日为7
	 * 
	 * @param format
	 * @return
	 */
	public static int getCurWeek() {
		Calendar cal = Calendar.getInstance();
		int DAY_OF_WEEK = cal.get(Calendar.DAY_OF_WEEK);
		if (DAY_OF_WEEK == 1) {//星期�?
			DAY_OF_WEEK = 7;
		} 
		else {
			DAY_OF_WEEK = DAY_OF_WEEK - 1;
		}
		return DAY_OF_WEEK;
	}
	
	/**
	 * 获得时间格式为HH:mm转化成分�?
	 * 
	 * @param format
	 * @return
	 */
	public static int getIntTime(String time) {
		String[] Hm = time.split(":");
		return Integer.parseInt(Hm[0]) * 60 + Integer.parseInt(Hm[1]);
	}
	
	public static boolean isEmail(String email) {
//		String str = "^([a-zA-Z0-9]*[-_.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\.][A-Za-z]{2,3}([\\.][A-Za-z]{2})?$";
		String str = "^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w{2,3}){1,3})$";
		Pattern p = Pattern.compile(str);
		Matcher m = p.matcher(email);
		return m.matches();
	}
	
	/**
	 * 根据手机的分辨率�?dp 的单�?转成�?px(像素)
	 */
	public static int dip2px(Context context, float dpValue) {
		final float scale = context.getResources().getDisplayMetrics().density;
		return (int) (dpValue * scale + 0.5f);
	}

	/**
	 * 根据手机的分辨率�?px(像素) 的单�?转成�?dp
	 */
	public static int px2dip(Context context, float pxValue) {
		final float scale = context.getResources().getDisplayMetrics().density;
		return (int) (pxValue / scale + 0.5f);
	}

	// 通过GPS获取当前位置
	public Location getCurrentLocationGPS(Context context) {
		LocationManager locationManager = (LocationManager) context
				.getSystemService(Context.LOCATION_SERVICE);

		Criteria criteria = new Criteria();
		criteria.setAccuracy(Criteria.ACCURACY_FINE);
		criteria.setAltitudeRequired(false);
		criteria.setBearingRequired(false);
		criteria.setCostAllowed(true);
		criteria.setPowerRequirement(Criteria.POWER_LOW);
		String locationProvider = locationManager.getBestProvider(criteria,
				true);
		Location location = locationManager
				.getLastKnownLocation(locationProvider);
		return location;
	}

	// 根据wifi获取当前位置
	public Location getCurrentLocationWifi(Context context) {
		LocationManager locationManager = (LocationManager) context
				.getSystemService(Context.LOCATION_SERVICE);
		Location location = null;
		try {
			WifiManager wifiManager = (WifiManager) context
					.getSystemService(Context.WIFI_SERVICE);
			if (wifiManager.isWifiEnabled()) {
				location = locationManager
						.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
			}
		} catch (Exception e) {
		}
		return location;
	}

	// 根据基站获取当前的位�?
	public Location getCurrentLocationAGPS(Context context) {
		TelephonyManager telephonyManager = (TelephonyManager) context
				.getSystemService(Context.TELEPHONY_SERVICE);
		Location location = null;

		if (telephonyManager.getCellLocation() == null) {

		}
		GsmCellLocation gcl = (GsmCellLocation) telephonyManager
				.getCellLocation();
		int cid = gcl.getCid();
		int lac = gcl.getLac();
		int mcc = Integer.valueOf(telephonyManager.getNetworkOperator()
				.substring(0, 3));
		int mnc = Integer.valueOf(telephonyManager.getNetworkOperator()
				.substring(3, 5));
		try {
			// 组装JSON查询字符�?
			JSONObject holder = new JSONObject();
			holder.put("version", "1.1.0");
			holder.put("host", "maps.google.com");
			// holder.put("address_language", "zh_CN");
			holder.put("request_address", true);
			JSONArray array = new JSONArray();
			JSONObject data = new JSONObject();
			data.put("cell_id", cid); // 25070
			data.put("location_area_code", lac);// 4474
			data.put("mobile_country_code", mcc);// 460
			data.put("mobile_network_code", mnc);// 0
			array.put(data);
			holder.put("cell_towers", array);

			// 创建连接，发送请求并接受回应
			DefaultHttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost("http://www.google.com/loc/json");
			StringEntity se = new StringEntity(holder.toString());
			post.setEntity(se);
			HttpResponse resp = client.execute(post);
			HttpEntity entity = resp.getEntity();
			BufferedReader br = new BufferedReader(new InputStreamReader(
					entity.getContent()));
			StringBuffer resultStr = new StringBuffer();
			String readLine = null;
			while ((readLine = br.readLine()) != null) {
				resultStr.append(readLine);
			}

			JSONObject jsonResult = new JSONObject(resultStr.toString());
			JSONObject jsonLocation = jsonResult.getJSONObject("location");
			double jsonLat = jsonLocation.getDouble("latitude");
			double jsonLon = jsonLocation.getDouble("longitude");
			location = new Location("AGPS");
			location.setLatitude(jsonLat);
			location.setLongitude(jsonLon);
		} catch (Exception e) {
			// TODO: handle exception

		}
		return location;
	}

}
