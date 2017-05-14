const express = require('express');
const router = express.Router();
const fs = require('fs');

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

  var param2 = {
		text: 'This is a very nice place to visit if you are free',
	  	voice: 'en-US_AllisonVoice',
	  	accept: 'audio/wav',
	  	order: '2'
	};

	var param1 = {
	  text: 'Hello world I like this!',
	  voice: 'en-US_AllisonVoice',
	  accept: 'audio/wav',
	  order: '1'
	};

	var param3 = {
	  text: 'Just curious how this is gonna work, can you tell me',
	  voice: 'en-US_AllisonVoice',
	  accept: 'audio/wav',
	  order: '3'
	};

  var params = [];
	params.push(param1);
	params.push(param2);
	params.push(param3);

  params.forEach(function(ele){
		text_to_speech.synthesize(ele).on('error', function(error) {
	  		console.log('Error:', error);
		}).pipe(fs.createWriteStream(ele.order+'.wav'));
	})
});

module.exports = router;