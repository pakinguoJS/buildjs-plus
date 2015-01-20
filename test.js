var PATH = require('path');
var FS = require('fs');
var colors = require('colors');

var bjsTransport = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-cmd-transport/transport.js'));
var cssImport = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-css-import/task.js'));
var bjsUglify = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-cmd-uglify/task.js'));

var watcher = require(PATH.join(__dirname, 'node_modules/bjs-watch/lib/watch.js'));

var src = 'D:/bjs-test/front/src';
var dest = 'D:/bjs-test/resource/src';
var uglifyDest = 'D:/bjs-test/dest/src';

watcher.watchA(dest, function(type, path) {
	// if(/\.(js|css)$/.test(path) && FS.statSync(path).isFile()){
	// 	bjsTransport({
	// 		files: [{
	// 			expand: true,
	// 			cwd: src,
	// 			src: PATH.relative(src, path),
	// 			dest: dest
	// 		}]
	// 	}, {
	// 		alias: {
	// 			'zepto': '/lib/zepto/zepto.js'
	// 		}
	// 	}, {
	// 		'.js': 1,
	// 		'.css': 1
	// 	})
	// }
	// 

	// if (/\.js$/.test(path) && FS.statSync(path).isFile()) {
	// 	bjsTransport({
	// 		files: [{
	// 			expand: true,
	// 			cwd: src,
	// 			src: PATH.relative(src, path),
	// 			dest: dest
	// 		}]
	// 	}, {
	// 		alias: {
	// 			'ipick.alert': 'widgets/ipick.alert/ipick.alert.js',
	// 			'ipick.call-phone': 'widgets/call.phone/call.phone.js',
	// 		},
	// 		base: 'D:/bjs-test/resource/src'
	// 	}, {
	// 		'.js': 1
	// 	})
	// }


	// if (/\.css$/.test(path) && FS.statSync(path).isFile()) {
	// 	var files = {};
	// 	files[PATH.join(dest, PATH.relative(src, path))] = [path];
	// 	cssImport({
	// 		files: files
	// 	})
	// }
	// 

	if (/\.js$/.test(path) && FS.statSync(path).isFile()) {
		bjsUglify({
			files: [{
				expand: true,
				cwd: dest,
				src: PATH.relative(dest, path),
				dest: uglifyDest
			}]
		}, {
			base: dest,
			ignore: {
				'zepto': 1
			}
		})
	}


})