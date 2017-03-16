/**
 * Created by Ani Bezawada for JSST Customer Mater tool to update the details in customer master table details in JSST database
 */
'use strict'
var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:"express js"}));

app.set('views', path.join(__dirname+ '/views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname,'/public')));

var router = express.Router();

app.use('/', router);

app.listen(8000, function(){
    console.log('JSST CMM tool is working on Port 8080');
});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Welcome to JSST CMM Tool'});
});

router.get("/result", function (req, res) {
    var CUSTOMER_ID = req.query.CUSTOMER_ID || 'Please fill correct number';
    var CUST_FIRST_NAME;
	var CUST_LAST_NAME;
	var CUST_STREET_ADDRESS1;
	var data;
    oracledb.getConnection(
        {
            user          : "system",
            password      : "admin",
            connectString : "localhost/xe"
        },
        function(err, connection)
        {
            if (err) { console.error(err.message);
                res.render('result', {result: 'Oracle error!'}); return; }

            connection.execute(
                "SELECT CUST_FIRST_NAME, CUST_LAST_NAME, CUST_STREET_ADDRESS1 from testdb.DEMO_CUSTOMERS WHERE CUSTOMER_ID= :CUSTOMER_ID",
				{CUSTOMER_ID: CUSTOMER_ID}, 
                function(err, result)
                {
                    if (err) {
                        console.error(err.message);
                        res.render('result', {result: 'Oracle error!'});
                        return;
                    } 
					//console.log(result.rows[0][0]);
                    //data = result.rows[0][0]||0;
					//res.render('fail', {result: 'Oracle error!'});
					CUST_FIRST_NAME = result.rows[0][0]||0;
					CUST_LAST_NAME = result.rows[0][1]||0;
					CUST_STREET_ADDRESS1 = result.rows[0][2]||0;
					console.log(CUST_FIRST_NAME);
                    res.render('result', {CUST_FIRST_NAME: CUST_FIRST_NAME, CUST_LAST_NAME: CUST_LAST_NAME, CUST_STREET_ADDRESS1: CUST_STREET_ADDRESS1, CUSTOMER_ID: CUSTOMER_ID});
                    //console.log(err); 
					//console.log(result);
                    doRelease(connection); //!!
				});
        });
});

router.post("/updateScore", function(req, res, next){
    var CUSTOMER_ID = req.body.CUSTOMER_ID; //req.query.customerNo;
    var CUST_FIRST_NAME = req.body.CUST_FIRST_NAME; //req.query.nextScore;
	var CUST_LAST_NAME = req.body.CUST_LAST_NAME;
	var CUST_STREET_ADDRESS1 = req.body.CUST_STREET_ADDRESS1;
	
    oracledb.getConnection(
        {
            user          : "system",
            password      : "admin",
            connectString : "localhost/xe"
        },
        function(err, connection)
        {
            if (err) { console.error(err.message); res.render('result', {result: 'Oracle error!'}); return; }

            connection.execute(
                "update testdb.DEMO_CUSTOMERS set CUST_FIRST_NAME = :CUST_FIRST_NAME, CUST_LAST_NAME = :CUST_LAST_NAME, CUST_STREET_ADDRESS1 = :CUST_STREET_ADDRESS1 where CUSTOMER_ID = :CUSTOMER_ID",
                {CUST_FIRST_NAME: CUST_FIRST_NAME, CUST_LAST_NAME: CUST_LAST_NAME, CUST_STREET_ADDRESS1: CUST_STREET_ADDRESS1, CUSTOMER_ID: CUSTOMER_ID},
                {autoCommit : true},
                function(err, result)
                {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        console.log("Rows updated " + result.rowsAffected);

                       // res.render('result', {result: CUST_FIRST_NAME, CUSTOMER_ID: CUSTOMER_ID});
						res.render('updated', {result: CUST_FIRST_NAME, CUSTOMER_ID: CUSTOMER_ID});
                        doRelease(connection);  //!!
                    }
                });
        });

});

// Release the connection
function doRelease(connection)
{
    connection.release(
        function(err) {
            if (err) {
                console.error(err.message);
            }
        });
}
