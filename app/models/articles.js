
//Dependcies

var mongoose = require('mongoose')
  , Imager = require('imager)
  , env = process.env.NODE_EN || 'development'
  , config = require('../../config/config')[env]
  , imagerconfig = require(config.root + '/config/imager.js')
  , Schema = mongoose.Schema


