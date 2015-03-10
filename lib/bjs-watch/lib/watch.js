/**
 * @description chokidar文件监听方式
 *
 * @author pakinguo
 *
 */

'use strict';

module.exports = watchByChokidar;


// change type mapping
var mapping = {
	'101': 'addFile',
	'102': 'addDir',
	'200': 'change',
	'301': 'unlinkFile',
	'302': 'unlinkDir',
	'400': 'error'
}


function watchByChokidar(path, callback, ignored){
	var chokidar = require('chokidar');
	var watcher = chokidar.watch(path, {
		ignored: ignored || /[\/\\]\./, persistent: true
	});

	watcher
		.on('add', function(path) {
			callback(101, path);
		})
		.on('addDir', function(path) {
			callback(102, path);
		})
		.on('change', function(path) {
			callback(200, path);
		})
		.on('unlink', function(path) {
			callback(301, path);
		})
		.on('unlinkDir', function(path) {
			callback(302, path);
		})
		.on('error', function(error) {
			callback(400, path);
		})
}