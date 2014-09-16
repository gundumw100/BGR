var datas=null;//datas need write
var directory="mobovip";//default directory
var fileName="stores.txt";//default file name
function write(data,directory,fileName){
	this.datas=data;
	this.directory=directory;
	this.fileName=fileName;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
}

//��ȡmobovipĿ¼������������򴴽���Ŀ¼
function onFileSystemSuccess(fileSystem) {
	newFile = fileSystem.root.getDirectory(directory, {
		create : true,
		exclusive : false
	}, onDirectorySuccess, onFileSystemFail);
}
//��ȡmobovipĿ¼�����stores.txt�ļ�������������򴴽����ļ�
function onDirectorySuccess(newFile) {
	newFile.getFile(fileName, {
		create : true,
		exclusive : false
	}, onFileSuccess, onFileSystemFail);
}
/**
 * ��ȡFileWriter��������д������
 * @param fileEntry
 */
function onFileSuccess(fileEntry) {
	fileEntry.createWriter(onFileWriterSuccess, onFileSystemFail);
}

/**
 * write datas
 * @param writer
 */
function onFileWriterSuccess(writer) {
//	log("fileName="+writer.fileName+";fileLength="+writer.length+";position="+writer.position);
	writer.onwrite = function(evt) {//��д��ɹ���ɺ���õĻص�����
		console.log("write success");
	};
	writer.onerror = function(evt) {//д��ʧ�ܺ���õĻص�����
		console.log("write error");
	};
	writer.onabort = function(evt) {//д�뱻��ֹ����õĻص�����������ͨ������abort()
		console.log("write abort");
	};
	// ���ٽ��ļ�ָ��ָ���ļ���β�� ,����append
//	writer.seek(writer.length); 
	writer.write(datas);//���ļ���д������
//	writer.truncate(11);//����ָ�����Ƚض��ļ�
//	writer.abort();//��ֹд���ļ�
}

function onFileSystemFail(error) {
	console.log("Failed to retrieve file:" + error.code);
}