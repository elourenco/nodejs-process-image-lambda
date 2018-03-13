'use strict';

const processImage = require('./src/process.image');

module.exports.process = function (event, context, callback) {
  processImage.process('https://s3.amazonaws.com/sample-images-s3/sample.jpg')
    .then(bufferImage => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=10000',
        },
        body: bufferImage.toString('base64'),
        isBase64Encoded: true
      });
    })
    .catch(err => {
      callback(err)
    });
};