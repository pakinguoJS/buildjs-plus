var PATH = require('path');
var FS = require('fs');
var colors = require('colors');

var bjsTransport = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-cmd-transport/transport.js'));
var watcher = require(PATH.join(__dirname, 'node_modules/bjs-watch/lib/watch.js'));

var src = 'D:/bjs-test/front/src';
var dest = 'D:/bjs-test/resource/src'

watcher.watchA(src, function(type, path){
	if(/\.(js|css)$/.test(path) && FS.statSync(path).isFile()){
		bjsTransport({
			files: [{
				expand: true,
				cwd: src,
				src: PATH.relative(src, path),
				dest: dest
			}]
		}, {
			alias: {
				'zepto': '/lib/zepto/zepto.js'
			}
		}, {
			'.js': 1,
			'.css': 1
		})
	}
})