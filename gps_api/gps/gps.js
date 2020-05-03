var express = require('express')
var app = express()
var router = express.Router();
var axios = require('axios');
require('dotenv').config();
const apiKey = process.env.APIKEY; //"TX51ICN1EOc2ZwY1QOtN8gNwsk7Tg23whsDXS0x6RkQ";
const limit = process.env.RESPONSE_MAXSIZE; //20;
const lang = process.env.LANG; //'fr';
const distance = process.env.DISTANCE; //"5000";
const type = process.env.TYPE; //"restaurant,hotel,bar";
const hereUrl = process.env.APIURL; //"https://discover.search.hereapi.com/v1/discover";
const Template = require('./template');

/*
Reference: https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html
*/

function checkParameters(req, res) {
    if (!req.query.long && !req.query.lat || isNaN(req.query.long) === true && isNaN(req.query.lat) === true ) {
        res.status(400).send("Missing or wrong format longitude && latitude (Decimal Degree)");
        return true
    }
    if (!req.query.long || isNaN(req.query.long) === true) {
        res.status(400).send("Missing or wrong format longitude (Decimal Degree)");
        return true;
    }
    if (!req.query.lat || isNaN(req.query.lat) === true){
        res.status(400).send("Missing or wrong format latitude (Decimal Degree)");
        return true;
    }
    return false;
}

function controller(req, res) {
    if (checkParameters(req, res))
        return;
    var poiAwait = getPOI(req.query.lat, req.query.long);
    poiAwait.then((data) => {
        if (data.items == undefined || data.items.length < 1) {
            res.status(200).send('No results or unreachable API');
            return;
        }
        res.status(200).send(parseResults(data.items));
    })
}

function parseResults(items) {
    console.log(items[0]);
    var result = [];
    var tmp;

    for(var i = 0; i != items.length; i++) {
        tmp = new Template();
        tmp.parseItem(items[i]);
        result.push(tmp);
    }
    return result;
}

async function getPOI(long, lat) {
    params = {
        'apiKey': apiKey,
        'q': type,
        'limit': limit,
        'in': 'circle:' + lat + ',' + long + ';r=' + distance,
        'lang': lang,
    }
    var query = await axios.get(hereUrl, {
            'params': params
        })
        .then((data) => {
            return data.data;
        })
        .catch((error) => {
            return error;
        })
    return query;
}

exports.controller = controller;