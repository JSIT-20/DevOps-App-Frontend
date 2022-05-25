const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) =>{
	res.render('home');
});

app.get('/getroutes', async (req, res) =>{
	try{
		var startStop = req.query.start;
		var endStop = req.query.end;
		var data = await loadRoutesFromAPI(startStop, endStop);
		if(data.data.Status == "200"){
			res.render('getroutes', {routes: data.data.Routes});
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