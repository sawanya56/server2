const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'student_test'
});
 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });



app.get('/', function (req, res) {
  res.send('aaaaa')
})











app.get('/person', function (req, res){
  connection.query('select * from persons', function (error, results) {
      if (error) throw error;
      res.send(results)
  })  
})

// เพิ่ม คนหา ลบ

app.post('/person', function (req, res) {
    connection.query('INSERT INTO `persons`(`LastName`, `FirstName`, `Address`, `City`)' 
    +  `VALUES ('${req.body.LastName}','${req.body.FirstName}','${req.body.Address}','${req.body.City}')`, function (error, results) {
        if (error) throw error;
        res.send(`insert person ${results}`)
    })
})

app.delete('/person/:id', function (req, res) {
    console.log(req.params.id)
    connection.query(`DELETE FROM persons WHERE PersonID = ${req.params.id}`, function (error, results) {
        if (error) throw error;
        res.send(`delete person id ${req.params.id}`)
    })
})

app.listen(5555)
console.log('server is starting on port: 5555')