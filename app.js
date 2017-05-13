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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: "express js"
}));

app.set('views', path.join(__dirname + '/views'));
app.set('public', path.join(__dirname + '/public'))

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/public')));

var router = express.Router();

app.use('/', router);

app.listen(8000, function() {
    console.log('JSST CMM tool is working on Port 8000');
});

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Welcome to JSST CMM Tool'
    });
});

router.get("/result", function(req, res) {
    var CUS_CD_CUST = req.query.CUS_CD_CUST || 'Please fill correct number';
    var CUS_DESC1_CUST;
    var CUS_DESC2_CUST;
    var CUS_DESC_ABR_CUST;
    var CUS_CD_CLS_TAX;
    var CUS_CD_CLS_CUST;
    var CUS_DT_DLET_REC;
    var CUS_DT_UPDT;
    var CUS_ID_UPDT_REC;
    var CUS_ID_DLET_REC;
    var CUS_FLG_CWC;
    var CUS_FLG_LGCY_SND;
    var CUS_DD_STAT;
    var CUS_DT_DD_EXP;
    var CUS_DT_SUBDD_EXP;
    var CUS_UCM_ID;
    oracledb.getConnection({
            user: "system",
            password: "admin",
            connectString: "localhost/xe"
        },
        function(err, connection) {
            if (err) {
                console.error(err.message);
                res.render('result', {
                    result: 'Oracle error!'
                });
                return;
            }
            //SELECT CUST_FIRST_NAME, CUST_LAST_NAME, CUST_STREET_ADDRESS1 from testdb.DEMO_CUSTOMERS WHERE CUSTOMER_ID= :CUSTOMER_ID
            connection.execute(
                "SELECT CUS_CD_CUST, CUS_DESC1_CUST, CUS_DESC2_CUST, CUS_DESC_ABR_CUST, CUS_CD_CLS_TAX, CUS_CD_CLS_CUST, TO_CHAR(CUS_DT_DLET_REC, 'YYYY/MM/DD') , TO_CHAR(CUS_DT_UPDT, 'YYYY/MM/DD'), CUS_ID_UPDT_REC, CUS_ID_DLET_REC, CUS_FLG_CWC, CUS_FLG_LGCY_SND, CUS_DD_STAT, TO_CHAR(CUS_DT_DD_EXP, 'YYYY/MM/DD'), TO_CHAR(CUS_DT_SUBDD_EXP, 'YYYY/MM/DD'), CUS_UCM_ID FROM TESTDB.JST_CUST_MST WHERE CUS_CD_CUST= :CUS_CD_CUST", {
                    CUS_CD_CUST: CUS_CD_CUST
                },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        res.render('result', {
                            result: 'Oracle error!'
                        });
                        return;
                    }
                    //console.log(result.rows[0][0]);
                    //data = result.rows[0][0]||0;
                    //res.render('fail', {result: 'Oracle error!'});
                    //CUST_FIRST_NAME = result.rows[0][0]||0;
                    //CUST_LAST_NAME = result.rows[0][1]||0;
                    //CUST_STREET_ADDRESS1 = result.rows[0][2]||0;
                    //console.log(CUST_FIRST_NAME);
                    console.log(result.rows.length);
                    //console.log();
                    if (result.rows.length === 0) {
                        res.render('fail');
                    } else {
                        CUS_CD_CUST = result.rows[0][0] || 0;
                        CUS_DESC1_CUST = result.rows[0][1] || 0;
                        CUS_DESC2_CUST = result.rows[0][2] || 0;
                        CUS_DESC_ABR_CUST = result.rows[0][3] || 0;
                        CUS_CD_CLS_TAX = result.rows[0][4] || 0;
                        CUS_CD_CLS_CUST = result.rows[0][5] || 0;
                        CUS_DT_DLET_REC = result.rows[0][6] || 0;
                        CUS_DT_UPDT = result.rows[0][7] || 0;
                        CUS_ID_UPDT_REC = result.rows[0][8] || 0;
                        CUS_ID_DLET_REC = result.rows[0][9] || 0;
                        CUS_FLG_CWC = result.rows[0][10] || 0;
                        CUS_FLG_LGCY_SND = result.rows[0][11] || 0;
                        CUS_DD_STAT = result.rows[0][12] || 0;
                        CUS_DT_DD_EXP = result.rows[0][13] || 0;
                        CUS_DT_SUBDD_EXP = result.rows[0][14] || 0;
                        CUS_UCM_ID = result.rows[0][15] || 0;
							
						
						if (CUS_DESC1_CUST == '0' || CUS_DESC1_CUST == '' || CUS_DESC1_CUST == null) {
							CUS_DESC1_CUST = null
						}
						if (CUS_DESC2_CUST == '0' || CUS_DESC2_CUST == '' || CUS_DESC2_CUST == null) {
							CUS_DESC2_CUST = null
						}
						if (CUS_DESC_ABR_CUST == '0' || CUS_DESC_ABR_CUST == '' || CUS_DESC_ABR_CUST == null) {
							CUS_DESC_ABR_CUST = null
						}
						if (CUS_CD_CLS_TAX == '0' || CUS_CD_CLS_TAX == '' || CUS_CD_CLS_TAX == null) {
							CUS_CD_CLS_TAX = null
						}
						if (CUS_CD_CLS_CUST == '0' || CUS_CD_CLS_CUST == '' || CUS_CD_CLS_CUST == null) {
							CUS_CD_CLS_CUST = null
						}
						if (CUS_DT_DLET_REC == '0' || CUS_DT_DLET_REC == '' || CUS_DT_DLET_REC == null) {
							CUS_DT_DLET_REC = null
						}
						if (CUS_DT_UPDT == '0' || CUS_DT_UPDT == '' || CUS_DT_UPDT == null) {
							CUS_DT_UPDT = null
						}						
						if (CUS_ID_UPDT_REC == '0' || CUS_ID_UPDT_REC == '' || CUS_ID_UPDT_REC == null) {
							CUS_ID_UPDT_REC = null
						}		
						if (CUS_ID_DLET_REC == '0' || CUS_ID_DLET_REC == '' || CUS_ID_DLET_REC == null) {
							CUS_ID_DLET_REC = null
						}		
						if (CUS_FLG_CWC == '0' || CUS_FLG_CWC == '' || CUS_FLG_CWC == null) {
							CUS_FLG_CWC = null
						}		
						
						if (CUS_FLG_LGCY_SND == '0' || CUS_FLG_LGCY_SND == '' || CUS_FLG_LGCY_SND == null) {
							CUS_FLG_LGCY_SND = null
						}		
						if (CUS_DD_STAT == '0' || CUS_DD_STAT == '' || CUS_DD_STAT == null) {
							CUS_DD_STAT = null
						}
						if (CUS_DT_DD_EXP == '0' || CUS_DT_DD_EXP == '' || CUS_DT_DD_EXP == null) {
							CUS_DT_DD_EXP = null
						}
						if (CUS_DT_SUBDD_EXP == '0' || CUS_DT_SUBDD_EXP == '' || CUS_DT_SUBDD_EXP == null) {
							CUS_DT_SUBDD_EXP = null
						}
						if (CUS_UCM_ID == '0' || CUS_UCM_ID == '' || CUS_UCM_ID == null) {
							CUS_UCM_ID = null
						}
													
													
						res.render('result', {
                            CUS_CD_CUST: CUS_CD_CUST,
                            CUS_DESC1_CUST: CUS_DESC1_CUST,
                            CUS_DESC2_CUST: CUS_DESC2_CUST,
                            CUS_DESC_ABR_CUST: CUS_DESC_ABR_CUST,
                            CUS_CD_CLS_TAX: CUS_CD_CLS_TAX,
                            CUS_CD_CLS_CUST: CUS_CD_CLS_CUST,
                            CUS_DT_DLET_REC: CUS_DT_DLET_REC,
                            CUS_DT_UPDT: CUS_DT_UPDT,
                            CUS_ID_UPDT_REC: CUS_ID_UPDT_REC,
                            CUS_ID_DLET_REC: CUS_ID_DLET_REC,
                            CUS_FLG_CWC: CUS_FLG_CWC,
                            CUS_FLG_LGCY_SND: CUS_FLG_LGCY_SND,
                            CUS_DD_STAT: CUS_DD_STAT,
                            CUS_DT_DD_EXP: CUS_DT_DD_EXP,
                            CUS_DT_SUBDD_EXP: CUS_DT_SUBDD_EXP,
                            CUS_UCM_ID: CUS_UCM_ID
                        });
	
						/* if (CUS_DESC2_CUST == '0' || CUS_DESC2_CUST == '' || CUS_DESC2_CUST == null) {
							res.render('result', {
                            CUS_CD_CUST: CUS_CD_CUST,
                            CUS_DESC1_CUST: CUS_DESC1_CUST,
                            CUS_DESC2_CUST: null,
                            CUS_DESC_ABR_CUST: CUS_DESC_ABR_CUST,
                            CUS_CD_CLS_TAX: CUS_CD_CLS_TAX,
                            CUS_CD_CLS_CUST: CUS_CD_CLS_CUST,
                            CUS_DT_DLET_REC: CUS_DT_DLET_REC,
                            CUS_DT_UPDT: CUS_DT_UPDT,
                            CUS_ID_UPDT_REC: CUS_ID_UPDT_REC,
                            CUS_ID_DLET_REC: CUS_ID_DLET_REC,
                            CUS_FLG_CWC: CUS_FLG_CWC,
                            CUS_FLG_LGCY_SND: CUS_FLG_LGCY_SND,
                            CUS_DD_STAT: CUS_DD_STAT,
                            CUS_DT_DD_EXP: CUS_DT_DD_EXP,
                            CUS_DT_SUBDD_EXP: CUS_DT_SUBDD_EXP,
                            CUS_UCM_ID: CUS_UCM_ID
                        });
						} else {
							res.render('result', {
                            CUS_CD_CUST: CUS_CD_CUST,
                            CUS_DESC1_CUST: CUS_DESC1_CUST,
                            CUS_DESC2_CUST: CUS_DESC2_CUST,
                            CUS_DESC_ABR_CUST: CUS_DESC_ABR_CUST,
                            CUS_CD_CLS_TAX: CUS_CD_CLS_TAX,
                            CUS_CD_CLS_CUST: CUS_CD_CLS_CUST,
                            CUS_DT_DLET_REC: CUS_DT_DLET_REC,
                            CUS_DT_UPDT: CUS_DT_UPDT,
                            CUS_ID_UPDT_REC: CUS_ID_UPDT_REC,
                            CUS_ID_DLET_REC: CUS_ID_DLET_REC,
                            CUS_FLG_CWC: CUS_FLG_CWC,
                            CUS_FLG_LGCY_SND: CUS_FLG_LGCY_SND,
                            CUS_DD_STAT: CUS_DD_STAT,
                            CUS_DT_DD_EXP: CUS_DT_DD_EXP,
                            CUS_DT_SUBDD_EXP: CUS_DT_SUBDD_EXP,
                            CUS_UCM_ID: CUS_UCM_ID
                        });
						}
                        */
                    console.log(CUS_CD_CUST);
                    console.log(CUS_DESC1_CUST);
                    console.log(CUS_DESC2_CUST);
                    console.log(CUS_DESC_ABR_CUST);
                    console.log(CUS_CD_CLS_TAX);
                    console.log(CUS_CD_CLS_CUST);
                    console.log(CUS_DT_DLET_REC);
                    console.log(CUS_DT_UPDT);
                    console.log(CUS_ID_UPDT_REC);
                    console.log(CUS_ID_DLET_REC);
                    console.log(CUS_FLG_CWC);
                    console.log(CUS_FLG_LGCY_SND);
                    console.log(CUS_DD_STAT);
                    console.log(CUS_DT_DD_EXP);
                    console.log(CUS_DT_SUBDD_EXP);
                    console.log(CUS_UCM_ID); 
                        doRelease(connection);
                        //res.render('result', {CUST_FIRST_NAME: CUST_FIRST_NAME, CUST_LAST_NAME: CUST_LAST_NAME, CUST_STREET_ADDRESS1: CUST_STREET_ADDRESS1, CUSTOMER_ID: CUSTOMER_ID});
                        //console.log(err);
                        //console.log(result);

                    }

                });
        });
});

router.post("/updateScore", function(req, res, next) {

    var CUS_CD_CUST = req.body.CUS_CD_CUST;
    var CUS_DESC1_CUST = req.body.CUS_DESC1_CUST;
    var CUS_DESC2_CUST = req.body.CUS_DESC2_CUST;
    var CUS_DESC_ABR_CUST = req.body.CUS_DESC_ABR_CUST;
    var CUS_CD_CLS_TAX = req.body.CUS_CD_CLS_TAX;
    var CUS_CD_CLS_CUST = req.body.CUS_CD_CLS_CUST;
    var CUS_DT_DLET_REC = req.body.CUS_DT_DLET_REC;
    var CUS_DT_UPDT = new Date();
    var CUS_ID_UPDT_REC = 'OTR';
    var CUS_ID_DLET_REC = req.body.CUS_ID_DLET_REC;
    var CUS_FLG_CWC = req.body.CUS_FLG_CWC;
    var CUS_FLG_LGCY_SND = 'Y';
    var CUS_DD_STAT = req.body.CUS_DD_STAT;
    var CUS_DT_DD_EXP = req.body.CUS_DT_DD_EXP;
    var CUS_DT_SUBDD_EXP = req.body.CUS_DT_SUBDD_EXP;
    var CUS_UCM_ID = req.body.CUS_UCM_ID;

    if (CUS_DT_DD_EXP === '0' || CUS_DT_DD_EXP === '' || CUS_DT_DD_EXP === null) {
        CUS_DT_DD_EXP = ''
    }
    if (CUS_DT_SUBDD_EXP === '0' || CUS_DT_SUBDD_EXP === '' || CUS_DT_SUBDD_EXP === null) {
        CUS_DT_SUBDD_EXP = ''
    }
	if (CUS_DESC1_CUST === '0' || CUS_DESC1_CUST === '' || CUS_DESC1_CUST === null) {
        CUS_DESC1_CUST = ''
    }
	if (CUS_DESC2_CUST === '0' || CUS_DESC2_CUST === '' || CUS_DESC2_CUST === null) {
        CUS_DESC2_CUST = ''
    }
	if (CUS_DESC_ABR_CUST === '0' || CUS_DESC_ABR_CUST === '' || CUS_DESC_ABR_CUST === null) {
        CUS_DESC_ABR_CUST = ''
    }

    oracledb.getConnection({
            user: "system",
            password: "admin",
            connectString: "localhost/xe"
        },
        function(err, connection) {
            if (err) {
                console.error(err.message);
                res.render('result', {
                    result: 'Oracle error!'
                });
                return;
            }
            // update testdb.DEMO_CUSTOMERS set CUST_FIRST_NAME = :CUST_FIRST_NAME, CUST_LAST_NAME = :CUST_LAST_NAME, CUST_STREET_ADDRESS1 = :CUST_STREET_ADDRESS1 where CUSTOMER_ID = :CUSTOMER_ID
            if (CUS_DT_DLET_REC === '0' || CUS_DT_DLET_REC === '' || CUS_DT_DLET_REC === null) {
                connection.execute(
                    "UPDATE TESTDB.JST_CUST_MST SET CUS_CD_CLS_TAX = :CUS_CD_CLS_TAX, CUS_CD_CLS_CUST = :CUS_CD_CLS_CUST, CUS_DT_DLET_REC = :CUS_DT_DLET_REC, CUS_DT_UPDT = :CUS_DT_UPDT, CUS_ID_UPDT_REC = :CUS_ID_UPDT_REC, CUS_ID_DLET_REC = :CUS_ID_DLET_REC, CUS_FLG_CWC = :CUS_FLG_CWC, CUS_FLG_LGCY_SND = :CUS_FLG_LGCY_SND, CUS_DD_STAT = :CUS_DD_STAT, CUS_DT_DD_EXP = to_date(:CUS_DT_DD_EXP, 'YYYY/MM/DD'), CUS_DT_SUBDD_EXP = to_date(:CUS_DT_SUBDD_EXP, 'YYYY/MM/DD') WHERE CUS_CD_CUST= :CUS_CD_CUST", {
                        CUS_CD_CUST: CUS_CD_CUST,
                        CUS_CD_CLS_TAX: CUS_CD_CLS_TAX,
                        CUS_CD_CLS_CUST: CUS_CD_CLS_CUST,
                        CUS_DT_DLET_REC: '',
                        CUS_DT_UPDT: CUS_DT_UPDT,
                        CUS_ID_UPDT_REC: CUS_ID_UPDT_REC,
                        CUS_ID_DLET_REC: 0,
                        CUS_FLG_CWC: CUS_FLG_CWC,
                        CUS_FLG_LGCY_SND: CUS_FLG_LGCY_SND,
                        CUS_DD_STAT: CUS_DD_STAT,
                        CUS_DT_DD_EXP: CUS_DT_DD_EXP,
                        CUS_DT_SUBDD_EXP: CUS_DT_SUBDD_EXP
                    }, {
                        autoCommit: true
                    },
                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("Rows updated " + result.rowsAffected);

                            // res.render('result', {result: CUST_FIRST_NAME, CUSTOMER_ID: CUSTOMER_ID});
                            res.render('updated', {
                                CUS_CD_CUST: CUS_CD_CUST,
                                CUS_DESC1_CUST: CUS_DESC1_CUST,
                                CUS_DESC2_CUST: CUS_DESC2_CUST,
                                CUS_DESC_ABR_CUST: CUS_DESC_ABR_CUST,
                                CUS_CD_CLS_TAX: CUS_CD_CLS_TAX,
                                CUS_CD_CLS_CUST: CUS_CD_CLS_CUST,
                                CUS_DT_DLET_REC: CUS_DT_DLET_REC,
                                CUS_DT_UPDT: CUS_DT_UPDT,
                                CUS_ID_UPDT_REC: CUS_ID_UPDT_REC,
                                CUS_ID_DLET_REC: CUS_ID_DLET_REC,
                                CUS_FLG_CWC: CUS_FLG_CWC,
                                CUS_FLG_LGCY_SND: CUS_FLG_LGCY_SND,
                                CUS_DD_STAT: CUS_DD_STAT,
                                CUS_DT_DD_EXP: CUS_DT_DD_EXP,
                                CUS_DT_SUBDD_EXP: CUS_DT_SUBDD_EXP,
                                CUS_UCM_ID: CUS_UCM_ID
                            });
                            //res.render('updated', {result: CUST_FIRST_NAME, CUSTOMER_ID: CUSTOMER_ID});
                            doRelease(connection); //!!
                        }
                    });
            } else {
                connection.execute(
                    "UPDATE TESTDB.JST_CUST_MST SET CUS_CD_CLS_TAX = :CUS_CD_CLS_TAX, CUS_CD_CLS_CUST = :CUS_CD_CLS_CUST, CUS_DT_DLET_REC = to_date(:CUS_DT_DLET_REC, 'YYYY/MM/DD'), CUS_DT_UPDT = :CUS_DT_UPDT, CUS_ID_UPDT_REC = :CUS_ID_UPDT_REC, CUS_ID_DLET_REC = :CUS_ID_DLET_REC, CUS_FLG_CWC = :CUS_FLG_CWC, CUS_FLG_LGCY_SND = :CUS_FLG_LGCY_SND, CUS_DD_STAT = :CUS_DD_STAT, CUS_DT_DD_EXP = to_date(:CUS_DT_DD_EXP, 'YYYY/MM/DD'), CUS_DT_SUBDD_EXP = to_date(:CUS_DT_SUBDD_EXP, 'YYYY/MM/DD') WHERE CUS_CD_CUST= :CUS_CD_CUST", {
                        CUS_CD_CUST: CUS_CD_CUST,
                        CUS_CD_CLS_TAX: CUS_CD_CLS_TAX,
                        CUS_CD_CLS_CUST: CUS_CD_CLS_CUST,
                        CUS_DT_DLET_REC: CUS_DT_DLET_REC,
                        CUS_DT_UPDT: CUS_DT_UPDT,
                        CUS_ID_UPDT_REC: CUS_ID_UPDT_REC,
                        CUS_ID_DLET_REC: CUS_ID_DLET_REC,
                        CUS_FLG_CWC: CUS_FLG_CWC,
                        CUS_FLG_LGCY_SND: CUS_FLG_LGCY_SND,
                        CUS_DD_STAT: CUS_DD_STAT,
                        CUS_DT_DD_EXP: CUS_DT_DD_EXP,
                        CUS_DT_SUBDD_EXP: CUS_DT_SUBDD_EXP
                    }, {
                        autoCommit: true
                    },
                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("Rows updated " + result.rowsAffected);

                            // res.render('result', {result: CUST_FIRST_NAME, CUSTOMER_ID: CUSTOMER_ID});
                            res.render('updated', {
                                CUS_CD_CUST: CUS_CD_CUST,
                                CUS_DESC1_CUST: CUS_DESC1_CUST,
                                CUS_DESC2_CUST: CUS_DESC2_CUST,
                                CUS_DESC_ABR_CUST: CUS_DESC_ABR_CUST,
                                CUS_CD_CLS_TAX: CUS_CD_CLS_TAX,
                                CUS_CD_CLS_CUST: CUS_CD_CLS_CUST,
                                CUS_DT_DLET_REC: CUS_DT_DLET_REC,
                                CUS_DT_UPDT: CUS_DT_UPDT,
                                CUS_ID_UPDT_REC: CUS_ID_UPDT_REC,
                                CUS_ID_DLET_REC: CUS_ID_DLET_REC,
                                CUS_FLG_CWC: CUS_FLG_CWC,
                                CUS_FLG_LGCY_SND: CUS_FLG_LGCY_SND,
                                CUS_DD_STAT: CUS_DD_STAT,
                                CUS_DT_DD_EXP: CUS_DT_DD_EXP,
                                CUS_DT_SUBDD_EXP: CUS_DT_SUBDD_EXP,
                                CUS_UCM_ID: CUS_UCM_ID
                            });
                            //res.render('updated', {result: CUST_FIRST_NAME, CUSTOMER_ID: CUSTOMER_ID});
                            doRelease(connection); //!!
                        }
                    });
            }

        });

});

// Release the connection
function doRelease(connection) {
    connection.release(
        function(err) {
            if (err) {
                console.error(err.message);
            }
        });
}
