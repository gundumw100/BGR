/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.mobovip.app;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

import org.apache.cordova.Config;
import org.apache.cordova.CordovaActivity;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.Signature;
import android.os.Bundle;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;

public class BGR extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        super.init();
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html");
//        getHashKey();
    }
    
//    @Override  
//    public void onReceivedError(int arg0, String arg1, String arg2) {
//        Toast.makeText(getApplicationContext(), "test", Toast.LENGTH_LONG).show();
//        return;
//    }
    
    @Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
		/*
		String txtPath=getSDCardPath()+"/mobovip/stores.txt";
		String distancePath=getSDCardPath()+"/mobovip/config.txt";
		String notificationPath=getSDCardPath()+"/mobovip/notification.txt";
		
		String storeNotification=readTxtFile(notificationPath);
		Log.i("tag", "storeNotification======"+storeNotification);
		if("off".equals(storeNotification)){
			Intent i = new Intent(this,NetworkStateService.class);
			stopService(i);
			return;
		}
		String data=readTxtFile(txtPath);
//		Log.i("tag","data="+data);
		if(data!=null){
			ArrayList<Store> stores=getStores(data);
			LocationService.stores=stores;
			String distanceStr=readTxtFile(distancePath);
			double distance=3;//default is 3
			if(distanceStr==null||distanceStr.length()==0){
				
			}else{
				distance=Double.parseDouble(distanceStr);
			}
			LocationService.distance=distance;
			Log.i("tag","=======NetworkStateService start============");
			Intent i = new Intent(this,NetworkStateService.class);
			startService(i);
		}
		*/
	}

    /*
	public String getSDCardPath() {
		File sdDir = null;
		boolean isExist = Environment.getExternalStorageState().equals(android.os.Environment.MEDIA_MOUNTED);
		if (isExist) {
			sdDir = Environment.getExternalStorageDirectory();
		}
		return sdDir.toString();
	}
    
	public String readTxtFile(String filePath) {
		StringBuffer sb = new StringBuffer();
		try {
			File file = new File(filePath);
			if (file.isFile() && file.exists()) {
				FileReader fr = new FileReader(filePath);
				BufferedReader br = new BufferedReader(fr);
				String line = null;

				while ((line = br.readLine()) != null) {
					sb.append(line);
				}
				br.close();
				fr.close();
				return sb.toString();
			} else {
				Log.i("tag","No file found.");
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
    
    
	private ArrayList<Store> getStores(String data){
		ArrayList<Store> list = new ArrayList<Store>();
		try {
			JSONObject json = new JSONObject(data);
			JSONArray array = json.optJSONArray("listStroe");
			if (array != null) {
				for (int i = 0; i < array.length(); i++) {
					JSONObject o = array.optJSONObject(i);
					Store instance = new Store();
					instance.setStoreId(o.optInt("storeId"));
					instance.setBusinessHours(o.optString("businessHours"));
					instance.setCity(o.optString("city"));
					instance.setCustomerId(o.optInt("customerId"));
					instance.setLatitude(o.optDouble("latitude"));
					instance.setLongitude(o.optDouble("longitude"));
					instance.setProvince(o.optString("province"));
					instance.setProvinceShrtNm(o.optString("provinceShrtNm"));
					instance.setStoreAddress(o.optString("storeAddress"));
					instance.setStoreName(o.optString("storeName"));
					instance.setTelephone(o.optString("telephone"));
					instance.setMobile(o.optString("mobile"));
					instance.setZip(o.optString("zip"));
					instance.setTimezone(o.optString("timezone"));
					instance.setLocationId(o.optLong("locationId"));
					instance.setStatus(o.optInt("status"));
					instance.setStoreIdAssigned(o.optString("storeIdAssigned"));
					instance.setIsPrize(o.optInt("isPrize"));
					instance.setEstPrepTime(o.optInt("estPrepTime"));
					instance.setTaxRate(o.optDouble("taxRate"));
					
					list.add(instance);
				}
			} 
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	*/
	/**
     * Hash Key
     * @return
     */
    private String getHashKey(){
    	PackageInfo info=null;
	    try {
	        info = getPackageManager().getPackageInfo( "com.mobovip.app",  PackageManager.GET_SIGNATURES);
	        for (Signature signature : info.signatures) {
	            MessageDigest md = MessageDigest.getInstance("SHA");
	            md.update(signature.toByteArray());
	            //ZHAl2JzG4T+i6GP0DDqYHNLU2Nc=
	            Log.d("tag", Base64.encodeToString(md.digest(), Base64.DEFAULT));
	        }
	    } catch (NameNotFoundException e) {
	
	    } catch (NoSuchAlgorithmException e) {
	
	    }
	    return "";
    }
    
    
}

