//解决手机端无法使用解析yyyy-MM-dd hh:mm:ss直接格式 new Date(dateString)  
function string2Date(dateString){
	if(dateString){
		try{
			var arr = dateString.split(' ');
			var ymd = arr[0].split('-');
			var him = arr[1].split(':');
			return new Date(ymd[0],ymd[1],ymd[2],him[0],him[1],him[2]);
		}catch(e){
			//TODO handle the exception
		}
	}
	return new Date(dateString);
}
export {
	string2Date
}