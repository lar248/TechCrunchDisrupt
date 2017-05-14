const express = require('express');
const router = express.Router();
const fs = require('fs');
const spawn = require("child_process").spawn;
const exec = require('child_process').exec;
const probe = require('node-ffprobe');
const videoShow = require('videoshow');
const Promise = require('bluebird');
const execP = Promise.promisify(require('child_process').exec);

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

// declare watson api usage
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

// Get all audio files
router.get('/audioFiles', (req, res) => {
  var text_to_speech = new TextToSpeechV1({
	  username: '60c2b082-e9ae-4de8-8775-9ff4b714731f',
	  password: 'vOqPCZimtU6I'
	});

  // var param1 = {
	// 	text: 'This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit ',
  //   voice: 'en-US_AllisonVoice',
  //   accept: 'audio/wav',
  //   name: 'test1'
	// };
  var param1 = {
		text: 'This is a very nice place to visit if you are free',
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav',
    name: 'test1'
	};
	var param2 = {
	  text: 'Hello world I like this!',
	  voice: 'en-US_AllisonVoice',
	  accept: 'audio/wav',
	  name: 'test2'
	};

	var param3 = {
	  text: 'Just curious how this is gonna work, can you tell me',
	  voice: 'en-US_AllisonVoice',
	  accept: 'audio/wav',
	  name: 'test3'
	};

  var param4 = {
	  text: 'poopy',
	  voice: 'en-US_AllisonVoice',
	  accept: 'audio/wav',
	  name: 'test4'
	};

  var param5 = {
	  text: 'wtf wtf wtf i dont know why we do this shit but we also love it wtf wtf wtf i dont know why we do this shit but we also love it wtf wtf wtf i dont know why we do this shit but we also love itwtf wtf wtf i dont know why we do this shit but we also love it',
	  voice: 'en-US_AllisonVoice',
	  accept: 'audio/wav',
	  name: 'test5'
	};

  var params = [];
	params.push(param1);
	params.push(param2);
	// params.push(param3);
  // params.push(param4);
	// params.push(param5);

  const synthesizedParams = params.map(param => new Promise((resolve, reject) => {
    return text_to_speech.synthesize(param).on('error', function(error) {
	  		console.log('Error:', error + ' for this element: ', param);
		}).pipe(fs.createWriteStream(param.name + '.wav')).on("finish", resolve);

  }));

  Promise.all(synthesizedParams).then(() => {
    //res.send('DONE');
    var imagesWithTime = [];
    
    // params.map(param => {
    //   probe(param.name+".wav", function(err, probeData) {
    //       const loopTime = probeData.streams[0].duration;
    //       imagesWithTime.push({path: param.name+".jpg", loop: loopTime});
    //       console.log({path: param.name+".jpg", loop: loopTime});
    //       const command = "ffmpeg -loop 1 -i " +param.name+".jpg " +"-c:v libx264 -t 5 -pix_fmt yuv420p "+ param.name+".mp4";
    //       exec(command, (error, stdout, stderr) => {
    //         resolve;
    //       });
    //   });
    // });

    var commands = ["ffmpeg -loop 1 -i test1.jpg -c:v libx264 -t 5 -pix_fmt yuv420p test1.mp4", "ffmpeg -loop 1 -i test2.jpg -c:v libx264 -t 5 -pix_fmt yuv420p test2.mp4"];
    Promise.mapSeries(commands, execP).then(function(results) {
        // all results here
        console.log("dafdafa");
    }, function(err) {
        // error here
    });
    // imagesWithTime = ["test1.jpg", 'test2.jpg'];
    // var videoOptions = {
    //      fps: 24,
    //      loop:2,
    //       transition: false,
    //       videoBitrate: 1024 ,
    //       videoCodec: 'libx264', 
    //       size: '640x640',
    //       outputOptions: ['-pix_fmt yuv420p'],
    //       format: 'mp4' 
    //   }

    //   videoShow(imagesWithTime, videoOptions)
    //     .save("output.mp4")
    //     .on('start', function (command) {
    //         console.log('ffmpeg process started:', command)
    //     })
    //     .on('error', function (err, stdout, stderr) {
    //         console.error('Error:', err)
    //         console.error('ffmpeg stderr:', stderr)
    //     })
    //     .on('end', function (output) {
    //         console.error('Video created in:', output)
    //     });
    // exec("ffmpeg -i test1.wav -i silent.wav -i test2.wav -i silent.wav  -filter_complex '[0:0][1:0][2:0][3:0]concat=n=4:v=0:a=1[out]' -map '[out]' output.wav", (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //     return;
    //   }
    console.log("correct");

    //   var videoOptions = {
    //     fps: 25,
    //     transition: true,
    //     transitionDuration: 1, // seconds
    //     videoBitrate: 1024,
    //     videoCodec: 'libx264',
    //     size: '640x?',
    //     audioBitrate: '128k',
    //     audioChannels: 2,
    //     format: 'mp4',
    //     pixelFormat: 'yuv420p'
    //   }

    //   videoShow(imagesWithTime, videoOptions)
    //     .audio("output.wav")
    //     .save("output.mp4")
    //     .on('start', function (command) {
    //         console.log('ffmpeg process started:', command)
    //     })
    //     .on('error', function (err, stdout, stderr) {
    //         console.error('Error:', err)
    //         console.error('ffmpeg stderr:', stderr)
    //     })
    //     .on('end', function (output) {
    //         console.error('Video created in:', output)
    //     });

    // });
  });
});

// Get summary from Python scripts
router.get('/summary', (req, res) => {
  const url = 'https://www.nytimes.com/2017/05/13/technology/google-education-chromebooks-schools.html'
  const process = spawn('python',["./server/summary_generator/gen_summary.py", url]);

  process.stdout.on('data', data => {
    console.log('data ' + data);
    res.status(200).end(data);
  });

  process.on('close', (code, error) => {
    console.log('child process exits with code: ' + code)
    console.log('error:', error)
  }); 
});

module.exports = router;
