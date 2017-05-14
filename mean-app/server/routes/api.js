const express = require('express');
const router = express.Router();
const fs = require('fs');

const ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service wrapper.
const conversation = new ConversationV1({
  username: '764256f0-1261-4c0b-9172-3a9647b9f9c8', // replace with username from service key
  password: 'FK2bD1T0UyHH', // replace with password from service key
  path: { workspace_id: 'fbea1d2d-90b5-4dbf-828d-ac745cf9c762' }, // replace with workspace ID
  version_date: '2016-07-11'
});

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

  var param1 = {
		text: 'This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are freeThis is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit if you are free. This is a very nice place to visit ',
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
	params.push(param3);
  params.push(param4);
	params.push(param5);

  const synthesizedParams = params.map(param => new Promise((resolve, reject) => {
    return text_to_speech.synthesize(param).on('error', function(error) {
	  		console.log('Error:', error + ' for this element: ', param);
		}).pipe(fs.createWriteStream(param.name + '.wav')).on("finish", resolve);
  }));

  Promise.all(synthesizedParams).then(() => {
    res.send('DONE');
  });
});

// Get chat bot back end implementation
router.get('/chatBot', function(req, res, next) {
  // Start conversation with empty message.
  if (req.userInput){
    conversation.message({
        input: { text: req.userInput },
        context: req.context
      }, 
      processResponse);
  } else {
    conversation.message({}, processResponse);
  }
  
  // Process the conversation response.
  function processResponse(err, response) {
    if (err) {
      console.error(err); // something went wrong
      return;
    }

    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
        console.log(response.output.text[0]);
        //send the output back to the front end
        res.status(200).json({
            returnMessage: response.output.text[0],
            jsonContext: response.context
        });
    }
  }
});

module.exports = router;