var SerialPort = require("serialport");

const express = require('express')
const app = express()
const serverport = 8090



var port = new SerialPort("/dev/ttyACM0", {
   baudRate: 38400,
   dataBits: 8,
   parity: 'none',
   stopBits: 1,
   flowControl: false
});


app.get('/gps', function(req, res){

    function sendData(code, msg) {
        res.statusCode = code;
        res.write(msg);
    }

    const Readline = SerialPort.parsers.Readline;
    const parser = new Readline();
    port.pipe(parser);

    parser.on('data', function(chunk) {
        console.log(chunk);

        sendData(200, chunk);
    });

    parser.on('error', function(err) {
        sendData(500, err.message);
    });
});


app.listen(serverport, () => {
  console.log(`GPS is now up and running on port : ${serverport}`);
  console.log(`Please visit : http://127.0.0.1:8090/gps to get satellite messages`)
})
