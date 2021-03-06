'use strict';


var PATH = require('path');

var gruntUtil = require('bjs-command-util');
var cssSprite = require(PATH.join(__dirname, 'lib/cssSprite.js'));


module.exports = function(files, options) {
	if (options.rm) {
		options = gruntUtil.options({
			// default
			prefix: 'icon',
			cssPath: '../img',
			processor: 'css',
			src: PATH.join(PATH.dirname(PATH.join(files.files[0].cwd, files.files[0].src)), '*.png').replace(/\\+/g, '/')
		}, options);

		cssSprite(options);
	} else {
		// normal
		gruntUtil.files(files).forEach(function(fileObj) {
			options = gruntUtil.options({
				// default
				prefix: 'icon',
				cssPath: '../img',
				processor: 'css',
				src: PATH.join(PATH.dirname(fileObj.src[0]), '*.png').replace(/\\+/g, '/')
			}, options);

			cssSprite(options);
		});
	}
	
	return [PATH.join(options.out, options.name).replace(/\\|\\\\/g, '/') + '.png'];
}