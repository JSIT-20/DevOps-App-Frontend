function getLink(){
	$('#loader').removeClass("hide-loader");
	var start = document.getElementById("busStopStart").value;
	var end = document.getElementById("busStopEnd").value;
	var goodStop = true;
	fetch("http://localhost:8080/validatestop?stop=" + start)
		.then((res) =>{
			return res.json();
		})
		.then((data) =>{
			try{
				if(data.Status == "500"){
					goodStop = false;
				}
			}
			catch{
				goodStop = false;
			}
		})
		.catch((e) =>{
			console.log("Error when trying to fetch from api (validatestop)")
		})

	fetch("http://localhost:8080/validatestop?stop=" + end)
		.then((res) =>{
			return res.json();
		})
		.then((data) =>{
			try{
				if(data.Status == "500"){
					goodStop = false;
				}
			}
			catch{
				goodStop = false;
			}
			$('#loader').addClass("hide-loader");
			if(goodStop){
				var url = "/getroutes?start=" + start + "&end=" + end;
				location.href = url;
			}
			else{
				alert("One of the stops could not be validated, please try again")
			}
		})
		.catch((e) =>{
			console.log("Error when trying to fetch from api (validatestop)")
		})
}