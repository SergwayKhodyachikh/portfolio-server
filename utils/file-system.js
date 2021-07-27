const fs = require('fs');
const path = require('path');
const faker = require('faker');
const axios = require('axios');
const { promisify } = require('util');

const IMAGES_DIR = 'public/img/';
const GITKEEP = /.gitkeep/;

const unlinkAsync = promisify(fs.unlink);
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

/**
 * remove image from the given location
 * @param {string} imgPath image location in the project include public and img folders
 */
exports.removeImg = imgPath => unlinkAsync(path.join(__dirname, '..', 'public', imgPath));

exports.readFile = filePath => readFileAsync(path.join(__dirname, '..', filePath));

exports.removeImgs = async () => {
  let images = await readdirAsync(IMAGES_DIR);
  images = images.filter(file => !GITKEEP.test(file)).map(file => path.join(IMAGES_DIR, file));

  if (images.length) {
    await Promise.all(images.map(img => unlinkAsync(img)));
  }

  return Promise.resolve(null);
};

exports.generateImage = (
  url = faker.image.avatar(),
  imgPath = `img/${faker.datatype.uuid()}.jpg`,
) =>
  new Promise((res, rej) => {
    try {
      const file = fs.createWriteStream(`public/${imgPath}`);
      axios({
        method: 'get',
        url,
        responseType: 'stream',
      }).then(response => {
        response.data.pipe(file);
        response.data.on('end', () => {
          res(imgPath);
        });
        response.data.on('error', err => {
          rej(err);
        });
      });
    } catch (err) {
      rej(err);
    }
  });
