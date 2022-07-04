function getLink(){
	$('#loader').removeClass("hide-loader");
	$("#startStopError").addClass("hidden");
	$("#endStopError").addClass("hidden");
	var start = document.getElementById("busStopStart").value;
	var end = document.getElementById("busStopEnd").value;
	var goodStart = true;
	var goodEnd = true;
	fetch("http://localhost/api/validatestop?stop=" + start)
		.then((res) =>{
			return res.json();
		})
		.then((data) =>{
			try{
				if(data.Status == "500"){
					goodStart = false;
				}
			}
			catch{
				goodStart = false;
			}
			fetch("http://localhost/api/validatestop?stop=" + end)
				.then((res) =>{
					return res.json();
				})
				.then((data) =>{
					try{
						if(data.Status == "500"){
							goodEnd = false;
						}
					}
					catch{
						goodEnd = false;
					}
					$('#loader').addClass("hide-loader");
					if(goodStart && goodEnd){
						var url = "/getroutes?start=" + start + "&end=" + end;
						location.href = url;
					}
					else{
						if(!goodStart){
							$("#stopStartNumber").text(start);
							$("#startStopError").removeClass("hidden");
						}
						if(!goodEnd){
							$("#stopEndNumber").text(end);
							$("#endStopError").removeClass("hidden");
						}
					}
				})
				.catch((e) =>{
					console.log("Error when trying to fetch from api (validatestop)")
				})
				})
				.catch((e) =>{
					console.log("Error when trying to fetch from api (validatestop)")
				})


}