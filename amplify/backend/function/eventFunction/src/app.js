/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const AWS = require('aws-sdk');
const { request } = require('express');
AWS.config.update({region: process.env.TABLE_REGION});

const dynamodb = new AWS.DynamoDB.DocumentClient();
let tablename = "Event";

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/event', function(req, res) {
  var todayDate = new Date().toISOString().slice(0, 10);
  let params = {
    TableName : tablename,
    limit : 10,
    // ProjectionExpression:"eventName, image, userName, eventDate, eventId, userId, startTime, eventDuration, timeZone, description",
    FilterExpression: "#eventDate > :eventDate",
    ExpressionAttributeNames:{
      "#eventDate": "eventDate"
    },
    ExpressionAttributeValues: {
        ":eventDate": todayDate
    }
  }

  dynamodb.scan(params, (error, result) => {
    if (error) {
      res.json({statusCode: 500, error: error.message});
    } else {
      res.json({statusCode: 200, url: req.url, body: JSON.stringify(result.Items)});
    }
  })
});

app.get('/event/category/:category', function(req, res) {
  var todayDate = new Date().toISOString().slice(0, 10);
  let params = {
    TableName : tablename,
    // limit : 10,
    // ProjectionExpression:"eventName, image, userName, eventDate, eventId, userId, startTime, eventDuration, timeZone, description",
    FilterExpression: "#eventDate > :eventDate AND #category = :category", 
    ExpressionAttributeNames:{
      "#eventDate": "eventDate",
      "#category": "category",
    },
    ExpressionAttributeValues: {
        ":eventDate": todayDate,
        ":category": req.params.category
    }
  }

  dynamodb.scan(params, (error, result) => {
    if (error) {
      res.json({statusCode: 500, error: error.message});
    } else {
      res.json({statusCode: 200, url: req.url, body: JSON.stringify(result.Items)});
    }
  })
});

app.get('/event/:userId', function(req, res) {

  let result = [];
  var todayDate = new Date().toISOString().slice(0, 10);

  let params = {
    TableName : tablename,
    // ProjectionExpression:"eventName, image, userName, eventDate, eventId, userId",
    KeyConditionExpression: "#userId = :userId AND #eventDate >= :eventDate",
    ExpressionAttributeNames:{
        "#userId": "userId",
        "#eventDate": "eventDate"
    },
    ExpressionAttributeValues: {
        ":userId": req.params.userId,
        ":eventDate": todayDate
    }
  }

  dynamodb.query(params, (error, result) => {
    if (error) {
      res.json({statusCode: 500, error: error.message});
    } else {
      res.json({statusCode: 200, url: req.url, body: JSON.stringify(result.Items)});
    }
  })
});

app.get('/event/view/:userId/:eventId', function(req, res) {

  let result = [];
 
  let params = {
    TableName : tablename,
    limit : 1,
    FilterExpression: "#userId = :userId AND #eventId = :eventId",
    ExpressionAttributeNames:{
        "#userId": "userId",
        "#eventId": "eventId"
    },
    ExpressionAttributeValues: {
        ":userId": req.params.userId,
        ":eventId": req.params.eventId
    } 
  }

  dynamodb.scan(params, (error, result) => {
    if (error) {
      res.json({statusCode: 500, error: error.message});
    } else {
      res.json({statusCode: 200, url: req.url, body: JSON.stringify(result.Items)});
    }
  })
});


app.put('/event', function(req, res) {
  let event = req.body;
  var params = {
    TableName: tablename,
    Item: event
  }
  dynamodb.put(params, (error, result) => {
    if (error) {
      res.json({statusCode: 500, error: error.message});
    } else {
      res.json({statusCode: 200, url: req.url, body: "Success"});
    }
  })
});

/****************************
* Example delete method *
****************************/

app.delete('/event', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/event/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
