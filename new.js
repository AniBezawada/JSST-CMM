/**
 * Created by Ani Bezawada for JSST Customer Mater tool to update the details in customer master table details in JSST database
 */
'use strict'
var oracledb = require('oracledb');

    var CUSTOMER_ID = 2;
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
                        //res.render('result', {result: 'Oracle error!'});
                        return;
                    } 
					//console.log(result.rows[0][0]);
                    //data = result.rows[0][0]||0;
					//res.render('fail', {result: 'Oracle error!'});
					CUST_FIRST_NAME = result.rows[0][0]||0;
					CUST_LAST_NAME = result.rows[0][1]||0;
					CUST_STREET_ADDRESS1 = result.rows[0][2]||0;
					console.log(CUST_FIRST_NAME);
					console.log(CUST_LAST_NAME);
					console.log(CUST_STREET_ADDRESS1);
                    //res.render('result', {CUST_FIRST_NAME: CUST_FIRST_NAME, CUST_LAST_NAME: CUST_LAST_NAME, CUST_STREET_ADDRESS1: CUST_STREET_ADDRESS1, CUSTOMER_ID: CUSTOMER_ID});
                    //console.log(err); 
					//console.log(result);
                    doRelease(connection); //!!
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
