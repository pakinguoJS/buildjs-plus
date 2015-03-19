# buildjs-plus
a plus version for <a href="https://www.npmjs.com/package/buildjs-beta">buildjs-beta</a>

> 技术前提：同buildjs-beta
> 
> 环境要求：安装nodejs
> 
> 标签：*基于SeaJS* , *Web前端集成自动化构建* , *Buildjs-plus*

<br>
## 前序
<a href="https://github.com/pakinguoJS/buildjs">buildjs-beta</a>(github为buildjs，npm上由于buildjs名称被使用，只能命名为buildjs-beta)提供了基于linux和inotifywait的实时文件监听和集成编译流程，由于buildjs-beta采用了gruntjs的编译流程，并非管道式编译，存在效率上的问题，同时，并没有提供版本号控制，有部分问题需要改进，于是基于buildjs-beta的编译流程，做了buildjs-plus的改进版本。

改进版的编译流程不再受gruntjs的限制，采用瀑布流编译流程：
![Buildjs 简易图示](http://a1.qpic.cn/psb?/V12tiger2jtCIv/3HcqNB1mTzHeyCDH7XVcMKzgQok2JeAakcOaYzx*l0k!/b/dOHjsXBwHgAA&bo=uAEGBAAAAAADB5k!&rf=viewer_4)

<br>
## 改进功能

1. 采用nodejs的chokidar来做文件监听，保证windows和linux下都无缝兼容；
2. 提供单文件编译流程（如上图）；
3. 提供css的合并功能，通过@import的语句（同css的@import）来输出合并后的css文件（循环依赖会被切断）；
4. 提供版本号控制，针对图片文件以生成新文件方式控制（生成新文件命名格式为：xx@vxx.png等），针对js和css文件对seajs的前端配置文件做map字段的替换；
5. 优化配置，通过一个文件bjs.conf.js来控制所有编译的配置路径，简化配置文件数量

<br>
## 如何使用
buildjs-plus需要了解3个大步骤：目录结构、配置文件bjs.conf.js、命令行：

- **目录结构**

<pre>
demo
    ├ front
    .   ├ conf
    .       └ conf.js
    .   ├ bjs.conf.js(编译流程的配置文件)
    .   ├ src（开发时关注的模块目录）
    .       ├ app
    .           ├ common
    .               ├ normalize.css
    .               ├ common.css
    .               ├ common.js
    .               └ view
    .                   ├ head.tpl
    .                   └ foot.tpl
    .           └ login
    .               ├ css
    .                   └ index.css
    .               ├ img
    .                   ├ icon.png
    .                   ├ index.png
    .                   └ ...
    .               ├ js
    .                   └ index.js
    .               └ view
    .                   └ login.tpl
    .       └ widget
    .          ├ alert
    .              ├ alert.css
    .              ├ alert.js
    .              └ alert.htpl (通过编译工具 => alert.htpl.js, 符合seajs模块)
    .   └ lib(第三方插件)
    ├ resource(编译后的部署路径)
    └ views（在bjs.conf.js下配置使用smarty时生成的tpl放置的位置）
         ├ src
             ├ common
                 ├ head.tpl（只保留两层目录结构：模块名/文件名.tpl）
                 └ foot.tpl
             └ login
                 └ login.tpl
</pre>
目录结构只是一个示例，具体命名可以按需修改，<b>但是唯一需要注意的是，不要把编译后部署的目标路径指定在监听的源文件夹路径下</b>，这样会导致循环触发文件变动，使编译工具无止境循环执行。

<br>

- **配置文件 bjs.conf.js**


相比buildjs-beta，plus版本的配置文件更简洁明了。buildjs-plus提供了bjs.set(key, value)或bjs.set(object)的方式指定编译时的相关配置，下面代码按照支持的key进行说明：
<pre>
// 设置项目采用的编译模式，默认是cmd（即是基于seajs），目前仅支持cmd
bjs.set("ctype", "cmd");

// 源项目业务模块路径，如：demo/front/src，由于运行工具时需要在demo/front文件夹下运行，故此key可以设置为"./src"
bjs.set("src", "./src");

// 编译后的业务模块部署的路径
bjs.set("dst", '../resource/src');

// 编译后的文件部署的路径（如：demo/front -> demo/resource，包括front下其他只做copy不做其他动作的文件）
bjs.set("dist", "../resource");

// 制定项目是否使用了php的smarty模板引擎
bjs.set("smarty", true);

// smarty字段设置为true时，需要重新制定.tpl输出的路径（这种方式是为了与php制定的smarty模板路径配合，方便php管理）
bjs.set("view", "../views/src");

// 前端模块加载器的配置文件，由于目前仅支持cmd，故此文件其实为seajs的前端配置文件
bjs.set("conf", "./conf/conf.js");

// 设置模块编译过程需要忽略的某些模块，默认为第三方库
bjs.set("ignore", "./lib");

// 是否需要对css进行合并
bjs.set("cssImport", true);

// 是否需要对css进行压缩
bjs.set("cssMinify", true);

// 是否需要对js进行合并压缩
bjs.set("uglify", true);

// 是否需要带版本号的编译
bjs.set("version", true);

// 设置合并压缩过程忽略的某些模块（以模块的相对路径为key，一般seajs会制定base路径，其他业务模块会基于base设定相对路径）
bjs.set("mignore", {
	js: {
		"widget/ipick.alert/ipick.alert.js": 1
	},
	css: {}
});

// 设置需要加载的插件（编译工具支持自定义插件，但需要按一定的开发格式，后续会详细介绍）
bjs.set("plugins", [
	// less
	{
		pattern: /\.less$/,
		lib: 'css-less/task.js'
	}
]);

// 设置国际化输出的相关路径，其中用{lang}来标记语言替换，如运行命令：bjs xgettext en，那么{lang}会被替换为"en"
bjs.set("i18n", {
	po: './_bjs_/i18n/i18n.{lang}.po',	// 生成po文件的路径
	src: './src',						// 提取待翻译字段的源路劲
	msrc: '../resource/src',			// 需要翻译的业务模块源路径
	mdst: '../resource/{lang}',			// 翻译输出的业务模块路径
	vsrc: '../views/src',				// 需要翻译的页面资源源路径（使用smarty后需要配置）
	vdst: '../views/{lang}'				// 翻译输出的页面资源路径
});
</pre>

<br>

- **命令行**

全局安装了buildjs-plus之后，bjs的命令会添加到系统环境变量中，可以使用以下命令开启或停止编译工具：
### bjs init
> 初始化bjs.conf.js文件，生成简单的配置文件

<br>

### bjs watch
> 开启文件实时监听和编译

使用此命令时，远程窗口或cmd窗口会处于运行状态，按ctrl+c或者关闭窗口都可以停止该程序的运行。开启文件实时监听后，只有源文件夹有文件的增删改，都会触发编译。若初始化时源文件夹下文件较多，则需要等待较长时间。单文件编译效率较高，在一般主机配置、CPU占用率和500个文件左右的前提下，编译时间大概在1s以内。

<br>

### bjs stop
> 停止文件实时监听和编译

此命令只在linux下生效，并且只针对使用了bjs/bin/bjs.sh的方式。使用bjs watch由于会阻塞进程，不能让程序在后台进程中执行，编译工具提供另一种方式可以在后台运行，同时提供此方式来停止后台进程的运行。

<br>

### bjs clear
> 清除生成的旧的版本号文件（针对图片的版本号冗余情况）

<br>

### bjs xgettext [lang]
> 提取待翻译的字段，其中参数[lang]支持多语言，不同语言间用","隔开，如：bjs xgettext en-US,zh_CN

<br>

### bjs gettext [lang]
> 根据指定的语言翻译已提取的字段，其中参数[lang]同xgettext

<br>
<br>

## 安装方式
确认系统已经安装了nodejs和npm。

- 带插件版本的：npm install buildjs-plus --save-dev
- 不带插件版的：npm install buildjs-plus-noplugin --save-dev

在linux下，还需要运行buildjs-plus/bin/init.sh，将bjs命令添加到系统命令，即可执行上述的命令，同时，bjsc这个命令也被添加到系统命令，其功能同bjs watch，只不过是其程序后台进程运行的方式。