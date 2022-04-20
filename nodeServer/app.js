var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

var websocket = require('ws')
var port = 5050;

const was= new websocket.Server({port:8080});

// was.on('connection', ws => {
//   ws.on('open', message=>{
//     console.log('receive client connect message: %s ', mess)
//   })
//   ws.on('meesage', message => {
//     console.log('received: %s', message)
//   })
//   ws.send('success connect')
// })

was.on('connection', function connection(ws, request)
{
  console.log('connection'); 
  ws.on('message', function incoming(message){
      console.log('received: %s', message); 
    });
  ws.on('close', function close(code, reason){
     console.log('close ' + code + ':'+reason); 
    });
    ws.send('success connect'); 
});

//REST API의 종류 (get, post, update, delete)
app.get('/', cors(), function(req, res) {
    res.send("start express server")
})

app.get('/Video', cors(), function(req, res) {
  res.json({_id:"Oa3dmNECsQk"})
})
// // express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
app.listen(port, function() { 
    console.log('start! express server');
})
