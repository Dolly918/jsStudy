window.onload = function(){
	var oDiv = document.getElementById("div1");
	var oLi = oDiv.getElementsByTagName("input");
	var oDivs = oDiv.getElementsByTagName("div");
	for(var i = 0; i < oLi.length; i++){
		oLi[i].index = i;
		oLi[i].onclick = function(){
			for(var j = 0; j < oLi.length; j++){
				oLi[j].className = "";
				oDivs[j].style.display = "none";
			}
			this.className = "active";
			oDivs[this.index].style.display = "block";
		}
	}

}