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
var moment = require('moment')

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

//Get Events for Home Page Display
app.get('/event', function(req, res) {
  var todayDate = new Date().toISOString().slice(0, 10);
  let params = {
    TableName : tablename,
    limit : 10,
    ProjectionExpression:"eventName, image, userName, eventDate, displayDate, eventId, userId, startTime, eventDuration, eventTimeZone, description",
    FilterExpression: "#eventDate >= :eventDate AND #eventstatus <> :cancelStatus AND #eventstatus <> :completeStatus",
    ExpressionAttributeNames:{
      "#eventDate": "eventDate",
      "#eventstatus": "eventstatus"
    },
    ExpressionAttributeValues: {
        ":eventDate": todayDate,
        ":cancelStatus": "Cancelled",
        ":completeStatus": "Completed"
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

//Get events for particular Category
app.get('/event/category/:category', function(req, res) {
  var todayDate = new Date().toISOString().slice(0, 10);
  let params = {
    TableName : tablename,
    ProjectionExpression:"eventName, image, userName, eventDate, displayDate, eventId, userId, startTime, eventDuration, eventTimeZone, description",
    FilterExpression: "#eventDate >= :eventDate AND #category = :category AND #eventstatus <> :cancelStatus AND #eventstatus <> :completeStatus ",
    ExpressionAttributeNames:{
      "#eventDate": "eventDate",
      "#category": "category",
      "#eventstatus": "eventstatus"
    },
    ExpressionAttributeValues: {
        ":eventDate": todayDate,
        ":category": req.params.category,
        ":cancelStatus": "Cancelled",
        ":completeStatus": "Completed"
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

//Get events created by particular user
app.get('/event/:userId', function(req, res) {

  let result = [];
  var todayDate = new Date().toISOString().slice(0, 10);

  let params = {
    TableName : tablename,
    ProjectionExpression:"eventName, image, userName, eventDate, displayDate, eventId, userId, startTime, eventDuration, eventTimeZone, description, eventstatus",
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

//Get particular event with event id and user id
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
      if(result.Items && result.Items.length > 0) {
        let eventOutput = result.Items[0];

        if(eventOutput.eventstatus === "Cancelled" || eventOutput.eventstatus === "Completed") {
          res.json({statusCode: 200, url: req.url, body: JSON.stringify(eventOutput)});
        } else {
                 
          var currentTime = moment().utcOffset(eventOutput.timezoneOffset).format('YYYY-MM-DDTHH:mm');
          
          var toUpdate = false;
          
          // Check if Influencer can Edit/Cancel Event - Before 24 hours
          if(eventOutput.editAllowed === undefined || eventOutput.editAllowed === true) {
            var momentObj = moment(eventOutput.eventDate + eventOutput.startTime, 'YYYY-MM-DDLTHH:mm');
            var endTime = momentObj.format('YYYY-MM-DDTHH:mm');
            var startTime = momentObj.subtract(24,'hours').format('YYYY-MM-DDTHH:mm');
            if(moment(currentTime).isBetween(startTime,endTime)) {
              eventOutput.editAllowed = false;
              toUpdate = true;
            }
          }

          if (eventOutput.editAllowed === false) {
          
            // Check if Follower can Cancel Event - Before 12 hours
            if(eventOutput.eventstatus === "Updated" && eventOutput.cancelAllowed === true) {
              var momentObj = moment(eventOutput.eventDate + eventOutput.startTime, 'YYYY-MM-DDLTHH:mm');
              var endTime = momentObj.format('YYYY-MM-DDTHH:mm');
              var startTime = momentObj.subtract(12,'hours').format('YYYY-MM-DDTHH:mm');
              if(moment(currentTime).isBetween(startTime,endTime)) {
                eventOutput.cancelAllowed = false;
                toUpdate = true;
              }
            }

            // Check if Follower can Create Event - Before 12 hours
            if(eventOutput.bookingAllowed === true) {
              var momentObj = moment(eventOutput.eventDate + eventOutput.startTime, 'YYYY-MM-DDLTHH:mm');
              var endTime = momentObj.format('YYYY-MM-DDTHH:mm');
              var startTime = momentObj.subtract(12,'hours').format('YYYY-MM-DDTHH:mm');
              if(moment(currentTime).isBetween(startTime,endTime)) {
                eventOutput.bookingAllowed = false;
                toUpdate = true;
              }
            }
          
            if (eventOutput.bookingAllowed === false) {
              // Check if its Join time
              var momentObj = moment(eventOutput.eventDate + eventOutput.startTime, 'YYYY-MM-DDLTHH:mm');
              var startTime = momentObj.subtract(5, 'minutes').format('YYYY-MM-DDTHH:mm');
              var duration = Number(eventOutput.eventDuration) + Number(10);
              var endTime = momentObj.add(duration, 'minutes').format('YYYY-MM-DDTHH:mm');
              if(eventOutput.joinTime === undefined || eventOutput.joinTime === false) {
                if(moment(currentTime).isBetween(startTime,endTime)) {
                  eventOutput.joinTime = true;
                  toUpdate = true;
                }
                // eventOutput.sstartTime = startTime;
                // eventOutput.endTime = endTime;
                // eventOutput.currentTime = currentTime;
              }
              if (moment(currentTime).diff(endTime, 'seconds') >= 0) {
                eventOutput.joinTime = false;
                eventOutput.eventstatus = "Completed";
                toUpdate = true;
              }
            }
          }
    
          if(toUpdate) {
            //Update Event to DB
            var params1 = {
              TableName: tablename,
              Item: eventOutput
            }
            dynamodb.put(params1, (error, result) => {});
          }

          res.json({statusCode: 200, url: req.url, body: JSON.stringify(eventOutput)});
        }
      } else {
        res.json({statusCode: 200, url: req.url, body: JSON.stringify({})});
      }
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

app.delete('/event', function(req, res) {
  var params = {
    TableName: tablename,
    "Key" : {
      "eventId": req.body
    }
  }

  dynamodb.delete(params, (error, result)=> {
    if (error) {
      res.json({statusCode: 500, error: error.message});
    } else {
      res.json({statusCode: 200, url: req.url, body: "Success"});
    }
  })
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
