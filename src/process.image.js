'user strict'

//
// external modules
const Jimp = require('jimp');

const _loadImage = (source) => {
  return new Promise((resolve, reject) => {
    Jimp.read(source, (err, image) => {
      if (err) {
        reject(err);
      }

      resolve(image);
    });
  });
};

const _applyResize = (image, width, height) => {
  if (width && height) {
    return image.resize(width, height);
  }

  if (width) {
    return image.resize(width, Jimp.AUTO);
  } else if (height) {
    return image.resize(Jimp.AUTO, height);
  }

  return image;
};

const _getBuffler = (image) => {
  return new Promise((resolve, reject) => {
    const type = image.getMIME();
    image.getBuffer(type, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      return resolve(buffer);
    });
  });
}

const processImage = {
  process(source) {
    return _loadImage(source)
      .then(image => {
        return _applyResize(image, 200);
      })
      .then(image => {
        return _getBuffler(image);
      });
  }
};

module.exports = processImage;