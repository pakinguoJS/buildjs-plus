/**
 * @description
 * 将css中的@import语句替换为相应的css文件内容
 * 1、不处理绝对路径，包括http(s):、file:、ftp:等开头
 * 2、处理"/xx"斜杠开头的，需要参数basePath作为基准路径
 * 3、正常处理"."或非1、2提到的路径，以搜索的当前css所在文件夹为相对路径，拼接找到的@import url的路径
 *
 * @author pakinguo
 */

var grunt = require('grunt');
var Sprite = require('css-sprite');
var colors = require('colors');
var PATH = require('path');


module.exports = transfer;


function transfer(options, callback) {
	Sprite.create(options, function(log){
		typeof callback === 'function' ? callback() : null;

		// log
		// console.log('[Succ]: css-sprite file created! '.green + PATH.join(options.out, options.name + '.png'));
	})
}

