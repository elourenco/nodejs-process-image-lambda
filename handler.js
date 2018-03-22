'use strict';

const processImage = require('./src/process.image');

module.exports.process = function (event, context, callback) {
  console.log(event);
  console.log(context);
  const { source, w, h } = event.queryStringParameters;
  processImage.process(source, w, h)
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