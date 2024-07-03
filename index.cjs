const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var cookies = require("cookie-parser");
var bodyParser = require('body-parser')
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cookies());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use((req, res, next)=>{
    res.io = io;
    next()
  })
  
app.use(cors({
    origin: "*",
    origin: ["http://localhost:5173", "http://localhost:3000", "http://192.168.0.103:3000","https://khaosathailongcahungyen.vercel.app/"],
    credentials: true,
}));
// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
const port = process.env.port || 3000;

;
const authRoute = require('./routes/auth');
const donviRoute = require('./routes/donvi');


app.use('/don-vi', donviRoute);
app.use('/auth', authRoute);
const path = require("path");
const basePath = '';


// //cấu hình chạy reactjs trên node server
app.use(basePath + "/", express.static(path.resolve(__dirname + "/dist")));


app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname + "/dist/index.html"));
});
// app.listen(port, '10.19.4.6', () => {
  //     console.log('server running ', port)
  // });
  
  // let usersOnline = [];
  // io.on('connection', function(socket){
  //       socket.on('send-id_user', (id_user)=>{
  //         usersOnline.push({id_user: id_user, socketId: socket.id})
  //       })

  //       socket.on('disconnect', async () => { 
  //         usersOnline = usersOnline.filter(i=> i.socketId !== socket.id) 
  //         console.log('user disconnect')   
  //       });

  //       socket.on("add-work", async(data) => {
  //         // array id gửi tới các user thì chỉ thông báo cho các user đang online
  //         let recevices = data.recevices;
  //         recevices.forEach(id=>{
  //           let index = usersOnline.findIndex(i => i.id_user === id);
  //           if(index !== -1){
  //             io.to(usersOnline[index].socketId).emit("add-work-success", `Bạn vừa nhận được 1 thông báo công việc mới: ${data.noidung}`)
  //           }
  //         });
        
  //       })
  //   })

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://vuvantinh121123:Tv170203@cluster0.owmvemg.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log(err)
    }
    console.log('kết nối db thành công')
})
