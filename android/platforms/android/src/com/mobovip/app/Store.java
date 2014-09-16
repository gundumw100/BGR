package com.mobovip.app;

import android.os.Parcel;
import android.os.Parcelable;

public class Store implements Parcelable {

	private int storeId;
	private String businessHours;
	private String city;
	private int customerId;
	private String province;// �?
	private String provinceShrtNm;// 州简�?
	private String storeAddress;// 地址
	private String storeName;
	private String zip;
	private String timezone;

	private double latitude;
	private double longitude;
	private float meter;//距离m，排序用
	private String distance;//距离,显示�?

	private String contact;//
	private int createId;
	private String createTime;//
	private String description;//
	private int estPrepTime;//预计准备时间
	private int franchiseeId;//
	private String imgOriginalUrl;//
	private int isBookTable;//
	private int isDeleted;//
	private int isLine;//
	private String mobile;//
	private int status;//是否可下�?
	private String storeIdAssigned;//
	private double taxRate;
	private String telephone;//
	private int updateId;//
	private String updateTime;//
	private int opening;//0 open ;1 closed
	private int clickCount;//
	private long locationId;//
	private int isPrize;//0 没有奖券功能 1 有奖券功�?
	
	public int getIsPrize() {
		return isPrize;
	}

	public void setIsPrize(int isPrize) {
		this.isPrize = isPrize;
	}

	public long getLocationId() {
		return locationId;
	}

	public void setLocationId(long locationId) {
		this.locationId = locationId;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public int getClickCount() {
		return clickCount;
	}

	public void setClickCount(int clickCount) {
		this.clickCount = clickCount;
	}

	public float getMeter() {
		return meter;
	}

	public void setMeter(float meter) {
		this.meter = meter;
	}

	public int getOpening() {
		return opening;
	}

	public void setOpening(int opening) {
		this.opening = opening;
	}

	public Store() {

	}

	public int getStoreId() {
		return storeId;
	}

	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}

	public String getBusinessHours() {
		return businessHours;
	}

	public void setBusinessHours(String businessHours) {
		this.businessHours = businessHours;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getProvinceShrtNm() {
		return provinceShrtNm;
	}

	public void setProvinceShrtNm(String provinceShrtNm) {
		this.provinceShrtNm = provinceShrtNm;
	}

	public String getStoreAddress() {
		return storeAddress;
	}

	public void setStoreAddress(String storeAddress) {
		this.storeAddress = storeAddress;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public int getCreateId() {
		return createId;
	}

	public void setCreateId(int createId) {
		this.createId = createId;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getEstPrepTime() {
		return estPrepTime;
	}

	public void setEstPrepTime(int estPrepTime) {
		this.estPrepTime = estPrepTime;
	}

	public int getFranchiseeId() {
		return franchiseeId;
	}

	public void setFranchiseeId(int franchiseeId) {
		this.franchiseeId = franchiseeId;
	}

	public String getImgOriginalUrl() {
		return imgOriginalUrl;
	}

	public void setImgOriginalUrl(String imgOriginalUrl) {
		this.imgOriginalUrl = imgOriginalUrl;
	}

	public int getIsBookTable() {
		return isBookTable;
	}

	public void setIsBookTable(int isBookTable) {
		this.isBookTable = isBookTable;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}

	public int getIsLine() {
		return isLine;
	}

	public void setIsLine(int isLine) {
		this.isLine = isLine;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getStoreIdAssigned() {
		return storeIdAssigned;
	}

	public void setStoreIdAssigned(String storeIdAssigned) {
		this.storeIdAssigned = storeIdAssigned;
	}

	public double getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(double taxRate) {
		this.taxRate = taxRate;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public int getUpdateId() {
		return updateId;
	}

	public void setUpdateId(int updateId) {
		this.updateId = updateId;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public static Parcelable.Creator<Store> getCreator() {
		return CREATOR;
	}

	public int describeContents() {
		// TODO Auto-generated method stub
		return 0;
	}

	public void writeToParcel(Parcel dest, int flags) {
		// TODO Auto-generated method stub
		dest.writeInt(storeId);
		dest.writeString(businessHours);
		dest.writeString(city);
		dest.writeInt(customerId);
		dest.writeString(province);
		dest.writeString(provinceShrtNm);
		dest.writeString(storeAddress);
		dest.writeString(storeName);
		dest.writeString(zip);
		dest.writeDouble(latitude);
		dest.writeDouble(longitude);
		dest.writeString(distance);
		dest.writeInt(opening);
	}

	public static final Parcelable.Creator<Store> CREATOR = new Creator<Store>() {
		public Store createFromParcel(Parcel source) {
			Store instance = new Store();
			instance.storeId = source.readInt();
			instance.businessHours = source.readString();
			instance.city = source.readString();
			instance.customerId = source.readInt();
			instance.province = source.readString();
			instance.provinceShrtNm = source.readString();
			instance.storeAddress = source.readString();
			instance.storeName = source.readString();
			instance.zip = source.readString();
			instance.latitude = source.readDouble();
			instance.longitude = source.readDouble();
			instance.distance = source.readString();
			instance.opening=source.readInt();
			return instance;
		}

		public Store[] newArray(int size) {
			// TODO Auto-generated method stub
			return new Store[size];
		}
	};

}
