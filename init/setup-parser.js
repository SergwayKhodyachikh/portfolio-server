const express = require('express');
const path = require('path');

const MAX_BYTES = 52428800;
const FILE_FOLDER_DIRNAME = 'public';
/**
 *handle request parse for static files and json body
 * @param {import('express').Application} app
 */

exports.setupParser = app => {
  app.use(express.json({ limit: MAX_BYTES }));
  app.use(express.static(path.join(__dirname, FILE_FOLDER_DIRNAME)));
};
