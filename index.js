//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
 
//konfigurasi koneksi
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'upay'
});
 
//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));
 
//route untuk homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM dashboard";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('index',{
      results: results
    });
  });
});

app.get('/dashboard',(req, res) => {
  let sql = "SELECT * FROM dashboard";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('dashboard',{
      results: results
    });
  });
});

app.get('/login',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('login',{
      results: results
    });
  });
});

app.get('/service',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('service',{
      results: results
    });
  });
});

app.get('/service-view',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('service-view',{
      results: results
    });
  });
});

app.get('/team',(req, res) => {
  let sql = "SELECT * FROM team";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('team',{
      results: results
    });
  });
});

app.get('/team-view',(req, res) => {
  let sql = "SELECT * FROM team";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('team-view',{
      results: results
    });
  });
});

app.get('/about',(req, res) => {
  let sql = "SELECT * FROM about";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('about',{
      results: results
    });
  });
});

app.get('/about-view',(req, res) => {
  let sql = "SELECT * FROM about";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('about-view',{
      results: results
    });
  });
});

app.get('/help',(req, res) => {
  let sql = "SELECT * FROM help";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('help',{
      results: results
    });
  });
});

app.get('/help-view',(req, res) => {
  let sql = "SELECT * FROM help";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('help-view',{
      results: results
    });
  });
});
 
//route untuk insert data
app.post('/save',(req, res) => {
  let data = {image: req.body.image, name: req.body.name, des: req.body.des};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/service-view');
  });
});

app.post('/save-team',(req, res) => {
  let data = {image: req.body.image, name: req.body.name, status: req.body.status, job: req.body.job, nim: req.body.nim};
  let sql = "INSERT INTO team SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/team-view');
  });
});

app.post('/save-help',(req, res) => {
  let data = {name: req.body.name, email: req.body.email, subject: req.body.subject, compose: req.body.compose};
  let sql = "INSERT INTO help SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/help');
  });
});
 
//route untuk update data
app.post('/update',(req, res) => {
  let sql = "UPDATE product SET image='"+req.body.image+"', name='"+req.body.name+"', des='"+req.body.des+"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/service-view');
  });
});

app.post('/update-team',(req, res) => {
  let sql = "UPDATE team SET image='"+req.body.image+"', name='"+req.body.name+"', status='"+req.body.status+"', job='"+req.body.job+"', nim='"+req.body.nim+"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/team-view');
  });
});

app.post('/update-dashboard',(req, res) => {
  let sql = "UPDATE dashboard SET note='"+req.body.note+"', offering='"+req.body.offering+"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/dashboard');
  });
});

app.post('/update-about',(req, res) => {
  let sql = "UPDATE about SET judul='"+req.body.judul+"', des='"+req.body.des+"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/about-view');
  });
});

 
//route untuk delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/service-view');
  });
});

app.post('/delete-team',(req, res) => {
  let sql = "DELETE FROM team WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/team-view');
  });
});
 
//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});