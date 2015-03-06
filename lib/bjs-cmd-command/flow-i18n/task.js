'use strict';


var PATH = require('path');
var colors = require('colors');

var task = require(PATH.join(__dirname, 'lib/i18n.js'));


module.exports = {
	xgettext: function(src, dest, exist){
		exist ? null : exist = dest;

		task.xgettext(src, PATH.dirname(dest), dest, exist);
	},
	gettext: task.gettext
}