var PATH = require('path');
var FS = require('fs');
var colors = require('colors');

var bjsTransport = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-cmd-transport/task.js'));
var cssImport = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-css-import/task.js'));
var cmdDeps = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-cmd-deps/task.js'));
var bjsUglify = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-cmd-uglify/task.js'));
var cssMinify = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-css-minify/task.js'));
var lessTask = require(PATH.join(__dirname, 'node_modules/bjs-command/plugins/css-less/task.js'));
var cssSpriteTask = require(PATH.join(__dirname, 'node_modules/bjs-command/plugins/flow-css-sprite/task.js'));
var mtimeRecord = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-record/task.js'));
var copy = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-copy/task.js'));
var filter = require(PATH.join(__dirname, 'node_modules/bjs-command/flow-filter/task.js'));


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
	// 			'ipick.alert': 'widget/ipick.alert/ipick.alert.js',
	// 			'ipick.call-phone': 'widget/ipick.call-phone/call.phone.js',
	// 		},
	// 		base: 'D:/bjs-test/resource/src'
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
	// 			'ipick.alert': 'widget/ipick.alert/ipick.alert.js',
	// 			'ipick.call-phone': 'widget/ipick.call-phone/call.phone.js',
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

	// if (/\.js$/.test(path) && FS.statSync(path).isFile()) {
	// 	bjsUglify({
	// 		files: [{
	// 			expand: true,
	// 			cwd: dest,
	// 			src: PATH.relative(dest, path),
	// 			dest: uglifyDest
	// 		}]
	// 	}, {
	// 		base: dest,
	// 		ignore: {
	// 			'zepto': 1
	// 		}
	// 	})
	// }


	// less test
	// if (/\.less$/.test(path) && FS.statSync(path).isFile()) {
	// 	lessTask({
	// 		files: [{
	// 			expand: true,
	// 			cwd: src,
	// 			src: PATH.relative(src, path),
	// 			dest: src
	// 		}]
	// 	})
	// }

	// cssminify
	// if (/\.css$/.test(path) && FS.statSync(path).isFile()) {
	// 	cssMinify({
	// 		files: [{
	// 			expand: true,
	// 			cwd: src,
	// 			src: PATH.relative(src, path),
	// 			dest: dest
	// 		}]
	// 	})
	// } 

	// cssSpirte
	// if (/css@sprite.*\.png$/.test(path) && FS.statSync(path).isFile()) {
	// 	var basename = PATH.basename(PATH.dirname(path));
	// 	cssSpriteTask({
	// 		files: [{
	// 			cwd: '',
	// 			src: path
	// 		}]
	// 	}, {
	// 		out: PATH.join(path, '../../../img'),
	// 		name: basename,
	// 		style: PATH.join(path, '../../../css', basename + '.css')
	// 	})
	// }

	if (/\.js$/.test(path) && FS.statSync(path).isFile()) {
		cmdDeps({
			files: [{
				expand: true,
				cwd: dest,
				src: PATH.relative(dest, path),
				dest: uglifyDest
			}]
		}, {
			output: PATH.join(process.cwd(), '_bjs_/deps-map.json'),
			base: dest,
			dest: dest,
			ignore: {
				'zepto': 1
			}
		})
	}
	// 

	// if (/\.js$/.test(path) && FS.statSync(path).isFile()) {
	// 	mtimeRecord({
	// 		files: [{
	// 			expand: true,
	// 			cwd: dest,
	// 			src: PATH.relative(dest, path)
	// 		}]
	// 	}, {
	// 		dest: dest
	// 	})
	// }

	// if(FS.statSync(path).isFile()){
	// 	copy({
	// 			files: [{
	// 				expand: true,
	// 				cwd: src,
	// 				src: PATH.relative(src, path),
	// 				dest: dest
	// 			}]
	// 	})
	// }
	// 
	
	// if (FS.statSync(path).isFile() && type !== 'unlink') {
	// 	filter({
	// 		files: [{
	// 			expand: true,
	// 			cwd: dest,
	// 			src: PATH.relative(dest, path),
	// 			dest: uglifyDest
	// 		}]
	// 	}, {
	// 		pattern: /view\/[^\/]*\.tpl/,
	// 		dest: 'D:/bjs-test/view'
	// 	})
	// }

	//----------------
})