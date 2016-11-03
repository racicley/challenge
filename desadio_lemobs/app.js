// Servidor: app.js

var pg = require('pg');

//DB Connect String
var conString = "postgres://postgres:1234@localhost/estagio";

var client = new pg.Client(conString);
client.connect();


// Iniciando servidor HTTP

var app = require('http').createServer(index)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
;
app.listen(3000, function() {
  console.log("Servidor rodando!");
});

function index(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	  res.writeHead(200);
    res.end(data);
  });
};

//TRIGGER PARA AS CONSULTAS
var consultas = 2;

//Consulta um
if(consultas == 1){

  var query = client.query("SELECT COUNT(nome) as total FROM aluno"); //Total de alunos
  query.on('row', function(row) {
  
io.on('connection',function(socket){
  socket.emit('consul', row);
  socket.emit('numero',1);


  });
});


//Consulta dois
}else if(consultas == 2){


var query = client.query("SELECT AVG(nota) as mnotas FROM aluno"); //média de notas
query.on('row', function(row) {
  
io.on('connection',function(socket){
  socket.emit('consul', row);
  socket.emit('numero',2);

  });
});


//Consulta três
}else if(consultas == 3){


var query = client.query("SELECT bairro,COUNT(aluno.id) as alunos FROM aluno INNER JOIN endereco ON aluno.endereco_id = endereco.id GROUP BY bairro ");
query.on('row', function(row) {


io.on('connection',function(socket){
  socket.emit('consul', row);
  socket.emit('numero',3);
  
  });
});


//Consulta quatro
}else if(consultas == 4){
var query = client.query("SELECT bairro, AVG(nota) as media FROM aluno INNER JOIN endereco ON aluno.endereco_id = endereco.id GROUP BY bairro");
 
query.on('row', function(row) {

io.on('connection',function(socket){
  socket.emit('consul', row);
  socket.emit('numero',4);

  });
});

//
}else{
  console.log("Invalido");
}