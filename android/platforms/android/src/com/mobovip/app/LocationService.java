package com.mobovip.app;

import java.text.DecimalFormat;
import java.util.ArrayList;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

public class LocationService extends Service{

	private Context context;
	public static ArrayList<Store> stores=new ArrayList<Store>();
	public static double distance = 3;//7430
	private LocationManager locationManager;
	private NotificationManager notificationManager;
	@Override
	public IBinder onBind(Intent intent) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		context = this;
		locationManager = (LocationManager)getSystemService(Context.LOCATION_SERVICE);
		
//		if(locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)){
//			locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,1000, 1f, locationListener);
//		}else{
			locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER,1000, 1f,locationListener);
//		}
		
//		Criteria c = new Criteria();  
//		c.setAccuracy(Criteria.ACCURACY_FINE); //���ȸ�  
//		c.setPowerRequirement(Criteria.POWER_LOW); //�������ĵ�  
//		c.setAltitudeRequired(false); //����Ҫ����  
//		c.setSpeedRequired(false); //����Ҫ�ٶ�  
//		c.setCostAllowed(false); //����Ҫ����  
//		String provider = locationManager.getBestProvider(c, false); //false��ָ���ܵ�ǰ�������Ƿ����
		
//		Location location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);     
//        if(location != null){
//        	checkDistance(location);
//        }     
        
	}

	
	private final LocationListener locationListener = new LocationListener() {
		//������ı�ʱ�����˺��������Provider������ͬ�����꣬���Ͳ��ᱻ����
	    public void onLocationChanged(Location location) { 
	        // log it when the location changes
	        if (location != null) {
	        	checkDistance(location);
	        }
	    }

	    // Provider��disableʱ�����˺���������GPS���ر�
	    public void onProviderDisabled(String provider) {
	    }

	    //  Provider��enableʱ�����˺���������GPS����
	    public void onProviderEnabled(String provider) {
	    }

	    // Provider���ڿ��á���ʱ�����ú��޷�������״ֱ̬���л�ʱ�����˺���
	    public void onStatusChanged(String provider, int status, Bundle extras) {
	    }
	};
	
	@Override
	public void onDestroy() {
		super.onDestroy();
		if(locationManager!=null){
			locationManager.removeUpdates(locationListener); 
			locationManager=null;
		}
	}

	private void checkDistance(Location location) {
		if (location != null) {
			float[] results = new float[1];
			for (Store store : stores) {
				Location.distanceBetween(location.getLatitude(),
						location.getLongitude(), store.getLatitude(),
						store.getLongitude(), results);
				float result=(results[0] / 1000)*0.62f;
				if (result < distance) {
					int openingOrNot=calOpeningOrNot(store.getBusinessHours());
					store.setOpening(openingOrNot);
					if(openingOrNot!=0){//closed
						continue;
					}
					
					String distance =  convertNumberToString(result, "############.0") + "miles";
					store.setDistance(distance);
					
					showNotification(store);
					
					stopSelf();//��ҪƵ��������
					break;
				}
			}
		}
	}

	private int calOpeningOrNot(String businessHour){
		int time = Utils.getIntTime(Utils.getCurTime("HH:mm"));
		String week = String.valueOf(Utils.getCurWeek());
		
		String[] businessHours = businessHour.split(";");
		String[] time0 = businessHours[0].split(",");
		String[] time1 = businessHours[1].split(",");
		int status = 1;//closed
		if (time0[0].indexOf(week) != -1) {
			int start = Utils.getIntTime(time0[1].split("-")[0].trim());
			int end = Utils.getIntTime(time0[1].split("-")[1].trim());
			if(start>=end){
				end+=(24*60-start);
			}
			if (time > start && time < end) {
				status = 0;
			}
		} else {
			if (time1[0].indexOf(week) != -1) {
				int start = Utils.getIntTime(time1[1].split("-")[0].trim());
				int end = Utils.getIntTime(time1[1].split("-")[1].trim());
				if(start>=end){
					end+=(24*60-start);
				}
				if (time > start && time < end) {
					status = 0;
				}
			}
		}
		return status;
	}
	
	private String convertNumberToString(Number value, String pattern) {
		try {
			if (pattern == null) {
				pattern = "############.00";
			}
			DecimalFormat decimalFormat = new DecimalFormat(pattern);
			return decimalFormat.format(value);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	private static final int NOTIFY_ID = 0;
	private void showNotification(Store store) {
		notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
		
		Intent intent = new Intent(this, BGR.class);
//		intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP|Intent.FLAG_ACTIVITY_NEW_TASK);
		intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		PendingIntent pendingIntent = PendingIntent.getActivity(this, 0,
				intent, PendingIntent.FLAG_UPDATE_CURRENT);// FLAG_ONE_SHOT
		Notification notification = new Notification.Builder(context)
				.setTicker(context.getString(R.string.app_name, ""))
				.setContentTitle(store.getStoreName()+"("+store.getDistance()+")")
				.setContentText(store.getStoreAddress())
				.setContentIntent(pendingIntent)
				.setSmallIcon(R.drawable.ic_launch_notify)
				.setAutoCancel(true)
				.setWhen(System.currentTimeMillis())
				.setDefaults(Notification.DEFAULT_ALL)
				.getNotification();
		
		notificationManager.notify(NOTIFY_ID, notification);
	}
	
}
