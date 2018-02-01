var checkPhone = function(inputId){
	var oPhoneNum = document.getElementById(inputId);
	var filter = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
	return filter.test(oPhoneNum.value);
}
// checkPhone('phoneNum','submit');
function test(btnId){
	var oSubmit = document.getElementById(btnId);
	oSubmit.onclick = function(){
		var a = checkPhone('phoneNum');
		console.log(a);
	};
};
test('submit');