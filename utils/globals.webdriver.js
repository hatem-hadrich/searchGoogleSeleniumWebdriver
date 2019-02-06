'use strict';

var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

global.headless = argv.HEADLESS || false;
global._projectdir = argv.PROJECT_PATH || path.join(__dirname);
