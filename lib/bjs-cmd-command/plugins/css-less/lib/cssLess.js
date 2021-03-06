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
var less = require('less');
var colors = require('colors');


module.exports = transfer;


function transfer(fileObj, callback, options) {
	less.render(grunt.file.read(fileObj.src)).then(function(output){
		var dest = fileObj.dest.replace(/\.less$/, '.css');
		grunt.file.write(dest, output.css);
		// log
		// console.log('[Succ]: less complied! '.green + dest);

		if(options.sourcemap && output.map){
			dest = fileObj.dest.replace(/\.less$/, '.map');
			grunt.file.write(dest, output.map);
			// log
			// console.log('[Succ]: less complied! '.green + dest);
		}

		typeof callback === 'function' ? callback(output) : null;
	}, function(err){
		cosnole.log('[Error]: '.red + error);
	});
}

