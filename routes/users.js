var express = require('express');
var router = express.Router();
const axios = require('axios');
const download = require('image-downloader');
var dns = require('dns');

let options = [];

var schoolV = "sja";
var faculty_phone = "09173178138";

var RefreshPage;
var RefreshPageInterval = 180000;//180000;

var modalPage;
var modalPageInterval = 300000;//300000;

RefreshPage =  setTimeout(function() {
  return console.log("1st refresh page!");
}, 0);


/* GET users listing. */
router.get('/', function(req, res, next) {
	var rfid = req.query.rfid;
	var rfid_status = req.query.rfid_status;
	
	var io = req.app.get('socketio');
    io.emit('rfid', (rfid));

    console.log('rfid');
    console.log(rfid);

    dns.resolve('goshencybernetics.com', function(err) {
      if (err) {
        console.log("No connection");
        io.emit('device_status', ('OFFLINE'));
      } else {
        console.log("Connected");
        io.emit('device_status', ('ONLINE'));
      }
    });

    console.log('FAKE SCANNER');
    io.emit('myModal', ('hide'));
    console.log('http://localhost:3008/students?rfid_number='+rfid);

    axios.get('http://localhost:3008/students?rfid_number='+rfid)
      .then(function (response) {
        // handle success
        // console.log(response);
        response.data.map((item) => {
        
          console.log(item.student_id)
          console.log(item.admission_no)
          console.log(item.firstname)
          console.log(item.middlename)
          console.log(item.lastname)
          console.log(item.image)
          console.log(item.rfid_number)
          console.log(item.lunch_pass)
          console.log(item.commuter_pass)
          console.log(item.guardian_phone)
          console.log("----")
          
          options = {
            url : "http://157.230.43.105/" + schoolV + "/" + item.image,
            dest: './public/uploads/student_images/'                // Save to /path/to/dest/image.jpg
          }

          download.image(options)
            .then(({ filename, image }) => {
              console.log('Saved to', filename)  // Saved to /path/to/dest/image.jpg
          })
            .catch((err) => console.error(err))


          var today = new Date()

          console.log('Sign IN!')

          io.emit('message', (rfid));
          io.emit('color', ('#ffffff'));
          io.emit('firstname', (item.firstname));
          io.emit('lastname', (item.lastname+'&ensp;'+item.middlename.charAt(0)));
          io.emit('middlename', (item.middlename.charAt(0)));
          io.emit('valid', ('visible'));

          if (item.lrn == null || item.lrn == '' ){
          io.emit('admission_no', (item.admission_no));
            console.log('LRN is Null!')
          }
          else{
            io.emit('admission_no', (item.lrn));
            console.log('LRN not Null!');
            };
    
          if (item.section == null || item.section == '' || item.section == 'none' || item.section == 'None'){
            io.emit('section', (result[0].class));
          }
          else{
            io.emit('section', (item.class+'-'+item.section));
            };

          if (item.image == null || item.image == ''){
                  io.emit('studImage', ('uploads/student_images/default.jpg'));
          }
          else{
              io.emit('studImage', (item.image));
            };

          io.emit('status', ('CHECKED IN'));
 
          
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });


    clearTimeout(RefreshPage);
    RefreshPage =  setTimeout(function() {
      console.log("refresh page! :" + rfid);
      io.emit('statusC', ('hidden'));
    }, RefreshPageInterval);

    clearTimeout(modalPage);
    modalPage =  setTimeout(function() {
      console.log("show modal page! :" + rfid);
      io.emit('myModal', ('show'));
      io.emit('modalTitle', (''));
    }, modalPageInterval);


	res.send('respond with a resource');
});

module.exports = router;