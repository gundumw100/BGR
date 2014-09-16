var storeNotification="off";//data read
var filePath = "mobovip/stores.txt";//default file path

function read(filePath) {
	this.filePath = filePath;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
};

function gotFS(fileSystem) {
	fileSystem.root.getFile(filePath, {
		create : true,
		exclusive : false
	}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
	fileEntry.file(gotFile, fail);
}

function gotFile(file) {
	//readDataUrl(file); 
	readAsText(file);
}

function readAsText(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		//console.log("Read as text"); 
//		console.log("result=" + evt.target.result);
		storeNotification=evt.target.result;//将读取到的数据赋值给变量
		if(storeNotification==null||storeNotification.length==0){
			storeNotification="off";
		}
		console.log("storeNotification====="+storeNotification);
		
	};
	reader.readAsText(file);

}

function readDataUrl(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		console.log("Read as data URL");
		console.log(evt.target.result);
	};
	reader.readAsDataURL(file);
}

function fail(evt) {
	console.log("code=======" + evt.target.error.code);
}
