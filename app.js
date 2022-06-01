const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) =>{
	try{
		var data = await loadSavedTrips();
		if(data.data.Status == "200"){
			res.render('home', {savedTrips: data.data.Trips});
		}
		else{
			res.render('error');
		}
	}
	catch(error){
		res.render('error');
	}

});

app.get('/getroutes', async (req, res) =>{
	try{
		var startStop = req.query.start;
		var endStop = req.query.end;
		var data = await loadRoutesFromAPI(startStop, endStop);
		if(data.data.Status == "200"){
			res.render('getroutes', {routes: data.data.Routes, startStop: startStop, endStop: endStop});
		}
		else{
			res.render('error');
		}
	}catch{
		res.render('error');
	}
});

app.get('/validatestop', async (req, res) =>{
	try{
		var stopQuery = req.query.stop;
		var result;
		var stop = await loadRouteValidation(stopQuery);
		var result = stop;
	}
	catch(error){
		console.log(error);
		var result = {"Status": "500"}
	}
	res.json(result.data);
});

app.get('/savetrip', async (req, res) =>{
	try{
		var data = await postTrip(req.query.tripName, req.query.startStop, req.query.endStop);
		if(data.data.Status == "200"){
			res.redirect('/');
		}
		else{
			res.render('error');
		}
	}
	catch(error){
		res.render('error');
	}

});

app.get('/deletesavedtrip/:id', async(req, res) =>{
	try{
		var data = await deleteTrip(req.params.id);
		if(data.data.Status == "200"){
			res.redirect("/");
		}
		else{
			res.render('error');
		}
	}
	catch(error){
		res.render('error');
	}
});

app.listen(8080, ()=>{
	console.log("External listening on port 8080");
});

const loadRoutesFromAPI = async (startStop, endStop) => {
	try{
		var url = "http://localhost:8081/getroutes?start=" + startStop + "&end=" + endStop;
		const response = await axios.get(url);
		return response;
	}
	catch(error){
		console.log('Error occured while calling getroutes API');
		console.log(error);
	}
}

const loadRouteValidation = async (stop) => {
	try{
		var url = "http://localhost:8081/validatestop?stop=" + stop;
		const response = await axios.get(url);
		return response; 
	}
	catch(error){
		console.log('Error occured while calling validatestop API');
		console.log(error);
	}
}

const loadSavedTrips = async () => {
	try{
		var url = "http://localhost:8081/savedtrips";
		const response = await axios.get(url);
		return response;
	}
	catch(error){
		console.log('Error occured while calling get savedtrips API');
		console.log(error);
	}
}

const postTrip = async (tripName, startStop, endStop) => {
	try{
		var url = "http://localhost:8081/savedtrips";
		var payload = {"name": tripName, "start_stop": startStop, "end_stop": endStop}
		console.log(payload)
		const response = await axios.post(url, payload);
		return response;
	}
	catch(error){
		console.log("Error occured while calling post savedtrips API");
		console.log(error);
	}
}

const deleteTrip = async (tripId) =>{
	try{
		var url = "http://localhost:8081/savedtrips/" + tripId
		console.log(url);
		const response = await axios.delete(url);
		return response;
	}
	catch(error){
		console.log("Error occured while calling delete savedTrip API");
		console.log(error);
	}
}