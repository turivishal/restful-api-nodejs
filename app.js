require('dotenv').config();
const config = require('config');
const winston = require('winston');
const express = require('express');
const app = express();

// LOAD INITIALIZER
require('./util/general.helper').bootstrap('../initializer', [app, config, winston]);