const baseUrl = "http://localhost/api";
console.log('before')

$('document').ready(function(){
console.log('after')
	fetch(baseUrl + "/savedtrips")
	.then((res)=>{
		console.log('gotdata')
		return res.json();
	})
	.then((data)=>{
		console.log(data);
		for(let i = 0; i < data.Trips.length; i++){
			var tr =  '<td><button onclick="deleteTrip(' + i + ')"><span class="glyphicon glyphicon-trash text-danger"></span></button></td>'
			tr = tr + '<td>' + data.Trips[i].name + '</td>'
			tr = tr + '<td>' + data.Trips[i].start_stop + '</td>'
			tr = tr + '<td>' + data.Trips[i].end_stop + '</td>'
			tr = tr + '<td><a href="/getroutes?start=' + data.Trips[i].start_stop + '&end=' + data.Trips[i].end_stop + '" class="btn btn-primary">See Details</a></td>'
			/*var tr = $('<tr></tr>');
			tr.append('<td><a href="/deletesavedtrip/' + i + '"><span class="glyphicon glyphicon-trash text-danger"></span></a></td>')
			tr.append('<td><p>' + data.Trips[i].name + '</p></td>')
			tr.append('<td><p>' + data.Trips[i].start_stop + '</p></td>')
			tr.append('<td><p>' + data.Trips[i].end_stop + '</p></td>')
			tr.append('<td><a href="/getroutes?start=' + data.Trips[i].start_stop + 'end=' + data.Trips[i].end_stop + '" class="btn btn-primary">See Details</a></td>')*/
			console.log(tr);
			document.getElementById('savedTripsTBody').insertRow(-1).innerHTML = tr;
		}
	})
	.catch((e) =>{
		console.log(e)
	})
});


const deleteTrip = async (tripId) =>{
	try{
		var url = baseUrl + "/savedtrips/" + tripId
		console.log(url);
		const response = await axios.delete(url);
	}
	catch(error){
		console.log("Error occured while calling delete savedTrip API");
		console.log(error);
	}
	location.reload();

}