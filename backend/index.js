var express = require("express");
var app = express();
var mysql = require("mysql");
app.use(express.json());
var cors = require("cors");
app.use(cors());
const otpGenerator = require("otp-generator");
var nodemailer = require("nodemailer");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lotterydrums",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

app.post("/uservalidate", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  let sql =
    "select id from tblusers where txtUemail='" +
    username +
    "' and txtUpassword='" +
    password +
    "';";
  console.log("sql", sql);
  con.query(sql, (err, result) => {
    if (result != "") {
      console.log(result);
      res.send(result);
    } else {
      console.log(result);

      res.send("User doesn't exist");
    }
  });
});

app.post("/insertuser", (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let uname = req.body.uname;
  let password = req.body.password;

  let sql =
    "insert into tblusers (txtFname,txtLname,txtUpassword,txtUemail) values('" +
    fname +
    "','" +
    lname +
    "','" +
    password +
    "','" +
    uname +
    "')";
  con.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/otpgenerate", async (req, res) => {
  let id = req.body.newid;
  let email = "";
  console.log(id);
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  let sql = await ("update tblusers set txtOtp='" +
    otp +
    "' where id ='" +
    id +
    "';");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("sql", sql);
  });
  let sql1 = await ("select txtUemail,txtOtp from tblusers where id='" +
    id +
    "';");
  con.query(sql1, (err, result) => {
    res.send(result);
  });
});
app.post("/sendmail", (req, res) => {
  let otp = req.body.otp;
  let email = req.body.email;
  console.log("email ois", req.body);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "archanacs154@gmail.com",
      pass: "ixeebzxtnirvxogh",
    },
  });

  var mailOptions = {
    from: "archanacs154@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: "Your OTP is " + otp,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send(otp);
  });
});

app.post("/verify", (req, res) => {
  let otp = req.body.otp;
  let id = req.body.id;
  let sql = "select txtOtp from tblusers where id='" + id + "'; ";
  con.query(sql, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/confirmuser", (req, res) => {
  let id = req.body.id;
  let sql = "update tblusers set txtDeleteflag=1 where id='" + id + "';";
  con.query(sql, (err, result) => {
    res.send(result)
  })
})


app.post("/drawticket", (req, res) => {
  let sql = "SELECT txtLotteryname,dtLotterydrawdate FROM tbllotterymaster WHERE dtLotterydrawdate > NOW()  ORDER BY dtLotterydrawdate LIMIT 1; "
  con.query(sql, (err, result) => {
    res.send(result)
  })

})

app.post('/lotterydetails', (req, res) => {
  let sql = "select id, txtLotteryname, dtLotterydrawdate from tbllotterymaster";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});

app.post('/Price', (req, res) => {
  let sql = "select id, txtCost from tblunit;";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.post('/Numbers', (req, res) => {
  let sql = "select id, txtFirstchoicenumber, txtSecondchoicenumber, txtThirdchoicenumber, txtFourthchoicenumber, txtFifthoicenumber from tblresultmaster;";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.post('/Lotterylist', (req, res) => {
  // let id=req.body.id;
  // let sql="SELECT lm.txtLotteryname , count(ut.id) as units  FROM tblunit ut JOIN tbllotterymaster lm ON ut.refLotterymaster = lm.id WHERE lm.id ='"+ id + "'";
  let sql = "SELECT lm.txtLotteryname AS Lotterymaster, COUNT(ut.id)  AS Unitsold FROM tbllotterymaster lm JOIN tblunit ut ON ut.refLotterymaster = lm.id GROUP BY lm.txtLotteryname HAVING Unitsold > 1";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});

app.post('/Unitsold', (req, res) => {
  // let id=req.body.id;
  // let sql="SELECT lm.txtLotteryname ,lm.dtLotterydrawdate as DrawDate, count(ut.id) as units  FROM tblunit ut JOIN tbllotterymaster lm ON ut.refLotterymaster = lm.id WHERE lm.id ='"+ id + "'";
  let sql = "SELECT lm.txtLotteryname AS Lotterymaster, lm.dtLotterydrawdate as DrawDate,COUNT(ut.id)  AS Unitsold FROM tbllotterymaster lm JOIN tblunit ut ON ut.refLotterymaster = lm.id GROUP BY lm.txtLotteryname HAVING Unitsold > 1";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});

app.post('/LotteryResultfetch', (req, res) => {
  let id = req.body.id;

  let sql = " select lm.txtLotteryname as LotteryName, lm.dtLotterydrawdate as Date, lm.txtLotteryprize as PrizeMoney, rt.txtFirstchoicenumber as First, rt.txtSecondchoicenumber as Second, rt.txtThirdchoicenumber as Third, rt.txtFourthchoicenumber as Fourth,rt.txtFifthoicenumber as Fifth FROM  tblresultmaster rt  JOIN tbllotterymaster lm ON lm.id =  rt.refLotterymaster WHERE lm.id='" + id + "'";

  con.query(sql, (err, result) => {
    console.log(sql)
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});
app.post("/fetchlottery", (req, res) => {
  let sql = "select id,txtLotteryname from tbllotterymaster;";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
  })
})

app.post('/LotteryUnitwinfetch', (req, res) => {
  // let LotteryName=req.body.LotteryName;
  // let sql=" select ut.txtFirstchoicenumber as First, ut.txtSecondchoicenumber as Second,ut.txtThirdchoicenumber as Third, ut.txtFourthchoicenumber as Fourth, ut.txtFifthoicenumber as Fifth FROM  tblunit ut  JOIN tbllotterymaster lm ON lm.id =  ut.refLotterymaster WHERE  lm.txtLotteryname= '"+LotteryName+"'";

  let sql = " select ut.txtFirstchoicenumber as First, ut.txtSecondchoicenumber as Second,ut.txtThirdchoicenumber as Third, ut.txtFourthchoicenumber as Fourth, ut.txtFifthoicenumber as Fifth FROM  tblunit ut  JOIN tbllotterymaster lm ON lm.id =  ut.refLotterymaster";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});

app.post('/Lotteryprovdresultfetch', (req, res) => {
  // let id=req.body.id;
  // let sql="Select pr.txtProvidername as Providername, lm.txtLotteryname as Lotteryname, date_format(lm.dtLotterydrawdate,' %Y - %m - %d ') as DrawDate  from tblprovider pr  LEFT JOIN tbllotterymaster lm   ON lm.refProvider =  pr.id  ";
  // let sql = "SELECT pr.txtProvidername AS Providername, lm.id as lotteryid, lm.txtLotteryname AS Lotteryname, DATE_FORMAT(lm.dtLotterydrawdate, ' %Y - %m - %d ') AS DrawDate, rm.txtWinningnumber as Winningnumber, rm.txtRaffleid as Raffleid FROM tblprovider pr LEFT JOIN tbllotterymaster lm ON lm.refProvider = pr.id left join tblresultmaster rm on lm.id=rm.refLotterymaster where rm.txtWinningnumber is null or  rm.txtRaffleid is null";
  let sql = "SELECT pr.txtProvidername AS Providername, lm.id as lotteryid, lm.txtLotteryname AS Lotteryname,  DATE_FORMAT(lm.dtLotterydrawdate, ' %Y - %m - %d ') AS DrawDate, lm.txtLotteryresult as Winningnumber, lm.txtRaffleid as Raffleid FROM tblprovider pr LEFT JOIN tbllotterymaster lm ON lm.refProvider = pr.id where  (lm.txtLotteryresult is null or lm.txtRaffleid is null) or (lm.txtLotteryresult is null and lm.txtRaffleid is null)";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});

app.post('/ResultNumberInsert', (req, res) => {

  let winl = req.body.winl;
  let winr = req.body.winr;
  console.log("winnumbers", winl);
  console.log("raffle", winr);
  // let lotteryid = req.body.win[0].id;
  // let sql = "  update tblresultmaster SET txtWinningnumber ='" + winl.resultl + "' WHERE refLotterymaster='" + winl.lid + "';";
  // let sql = "  update tbllotterymaster SET txtLotteryresult ='" + winl.resultl + "' WHERE id='" + winl.lid + "';";

  // console.log(sql);
  // con.query(sql, (err, result) => {
  //   if (err) throw err;
  //   console.log(result);
  //   res.send(result);
  // })
});

app.post('/RaffleIdInsert', (req, res) => {
  // let id=req.body.id;
  let winr = req.body.winr;
  console.log("winraffleid", winr);
  // let winl = req.body.winl;
  // let sql = "update tblresultmaster SET txtRaffleid ='" + winr.resultr + "' WHERE refLotterymaster='" + winr.rid + "';";
  let sql = "update tbllotterymaster SET txtRaffleid ='" + winr.resultr + "' WHERE id='" + winr.rid + "';";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});



app.post('/RaffleBothInsert', (req, res) => {

  console.log("both insert ", req.body)
  // let id= req.body.id;
  let winl = req.body.winl;
  let winr = req.body.winr;
  console.log("lottery", winl.resultl)
  console.log("raffle", winr.resultr)
  let sql = "update tbllotterymaster set "
  let condition = ""
  // if (winl.resultl != "") {
  //   condition += " txtLotteryresult='" + winl.resultl + "' "
  //   if (winr.resultr != "")
  //     condition += " , "
  // }
  // if (winr.resultr != "") {
  //   condition += " txtRaffleid='" + winr.resultr + "' "
  // }
  if (winl.lid !== "") {
    condition += " txtLotteryresult='" + winl.resultl + "' "

    if (winr.rid != "")
      condition += " txtRaffleid='" + winr.resultr + "'  where id ='" + winr.rid + "'";
    else
      condition += " where id ='" + winl.lid + "' ";
  }
  if (winr.rid != "") { condition += " txtRaffleid='" + winr.resultr + "'  where id ='" + winr.rid + "'"; }


  sql += condition;
  // let sql = "update tblresultmaster SET txtRaffleid ='" + winr.resultr + "',txtWinningnumber ='" + winl.resultl + "' WHERE refLotterymaster='" + winr.rid + "';";
  //let sql = "UPDATE tbllotterymaster SET txtLotteryresult = IF(txtLotteryresult IS NULL,' ','"+winl.resultl+"'), txtRaffleid = IF(txtRaffleid IS NULL,'', '"+winr.resultr+"') WHERE id ='"+winl.lid+"';";
  console.log("new==>" + sql)

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
});



app.listen(8080, (err) => {
  if (err) throw err;
  console.log("Server running in port 8080");
});
