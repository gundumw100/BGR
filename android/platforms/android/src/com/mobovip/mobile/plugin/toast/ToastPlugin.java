package com.mobovip.mobile.plugin.toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.widget.Toast;

public class ToastPlugin extends CordovaPlugin {

	private static final int TOAST_MESSAGE_INDEX = 0;
	private Toast toast = null;
	
	@Override
	public boolean execute(String action, JSONArray data,
			CallbackContext callbackContext) throws JSONException {
		
		if(action.equals("show_short")){
			String message = data.getString(TOAST_MESSAGE_INDEX);
			showToast(message, Toast.LENGTH_SHORT);
		}else if(action.equals("show_long")){
			String message = data.getString(TOAST_MESSAGE_INDEX);
			showToast(message, Toast.LENGTH_LONG);
		}else if(action.equals("cancel")){
			cancelToast();
		}
		callbackContext.success();
		return true;
	}
	
	private void showToast(final String message, final int length) {
		cordova.getActivity().runOnUiThread(new Runnable(){

			@Override
			public void run() {
				// TODO Auto-generated method stub
				 toast = Toast.makeText(cordova.getActivity(), message, length);  
	             toast.show();  
			}
			
		});
	}
	
	private void cancelToast() {  
        cordova.getActivity().runOnUiThread(new Runnable() {  
            @Override  
            public void run() {  
                if (toast != null){
                	toast.cancel();
                }
            }  
        });  
    }  
	
}
