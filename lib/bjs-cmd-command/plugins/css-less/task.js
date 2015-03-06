'use strict';


var PATH = require('path');
var FS = require('fs');
var colors = require('colors');

var gruntUtil = require('bjs-command-util');
var cssLess = require(PATH.join(__dirname, 'lib/cssLess.js'));


module.exports = function(files, options) {
	options = gruntUtil.options(options);

	if(options.rm){
		try{
			FS.unlinkSync(PATH.join(files.files[0].dest, files.files[0].src).replace(/\.less$/, '.css'));
		}catch(e){
			// console.log(e);
		}
		return;
	}

	gruntUtil.files(files).forEach(function(fileObj) {
		cssLess(fileObj, function(){}, options);
	});
}