const baseUrl = "http://localhost/api";

$('document').ready(function(){

	fetch(baseUrl + "/getroutes?start=" + $("#startInput").val() + "&end=" + $("#endInput").val())
	.then((res)=>{
		return res.json();
	})
	.then((data)=>{
		for(let route of data.Routes){
			if(Array.isArray(route.Trips)){
				for(let trip of route.Trips){
					var tr =  '<td>' + route.RouteNo + '</td>'
					tr = tr + '<td>' + route.RouteHeading + '</td>'
					tr = tr + '<td>' + trip.TripDestination + '</td>'
					tr = tr + '<td>' + trip.AdjustedScheduleTime + '</td>'
					document.getElementById('routesTBody').insertRow(-1).innerHTML = tr;
				}
			}
			else{
				var tr =  '<td>' + routes.RouteNo + '</td>'
				tr = tr + '<td>' + routes.RouteHeading + '</td>'
				tr = tr + '<td>' + routes.Trips.TripDestination + '</td>'
				tr = tr + '<td>' + routes.Trips.AdjustedScheduleTime + '</td>'
				document.getElementById('routesTBody').insertRow(-1).innerHTML = tr;
			}
		}
	})
	.catch((e) =>{
		console.log(e)
	})
});