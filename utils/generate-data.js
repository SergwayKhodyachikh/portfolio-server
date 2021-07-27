const crypto = require('crypto');
const faker = require('faker');
const _ = require('lodash');
const { generateImage } = require('./file-system');

const generateNum = (maxNum = 5, minNum = 0) => Math.round(Math.random() * maxNum + minNum);

const generateImageUrl = (createImage = true, imageUrl) =>
  createImage ? generateImage(imageUrl) : `img/${faker.datatype.uuid()}.jpg`;

exports.generateProject = async (
  withImage = true,
  numOfLinks = generateNum(),
  numOfTags = generateNum(),
) => {
  const image = await generateImageUrl(withImage);
  const links = [];
  const tags = [];
  _.times(numOfLinks, () => {
    links.push({
      name: faker.internet.domainWord(),
      url: faker.internet.url(),
    });
  });
  _.times(numOfTags, () => {
    tags.push({ title: faker.commerce.productAdjective() });
  });

  return {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    image,
    links,
    tags,
  };
};

exports.generateAdmin = (name = 'root') => ({
  name,
  email: faker.internet.email(name, 'user'),
  password: crypto
    .createHash('sha256')
    .update(crypto.randomBytes(32).toString('hex'))
    .digest('hex')
    .toString()
    .slice(-8),
  role: 'admin',
});

exports.generateArr = (generateFunc, maxNum = 5, minNum) => {
  const arr = [];

  _.times(generateNum(maxNum, minNum), async num => {
    arr.push(generateFunc(num));
  });

  return arr;
};

const generateName = num =>
  num ? `${faker.company.companyName()} (demo-${num})` : faker.company.companyName();

const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];

exports.generateProfitableProjectRequest = num => ({
  name: generateName(num),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  about: faker.lorem.paragraphs(),
  businessPlan: faker.internet.url(),
  systemDefinition: faker.internet.url(),
  communityOrProfit: pickRandom(['community', 'profit']),
  isFunded: faker.datatype.boolean(),
});

exports.generateCharitableProjectRequest = num => ({
  name: generateName(num),
  email: faker.internet.email(),
  phone: faker.datatype.number(),
  about: faker.lorem.lines(60),
  description: faker.commerce.productDescription() + faker.lorem.lines(40),
  webAddress: faker.internet.url(),
  tasks: faker.finance.transactionDescription() + faker.lorem.paragraph(1),
});

exports.generateNum = generateNum;
