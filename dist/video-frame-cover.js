/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VideoFrameCover"] = factory();
	else
		root["VideoFrameCover"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\n(function (global, factory) {\n  ( false ? 0 : _typeof(exports)) === 'object' && \"object\" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);\n})(this, function () {\n  var VideoFrameCover = /*#__PURE__*/function () {\n    /**\r\n     * @param { Object } config 配置信息\r\n     * url String 视频链接\r\n     * currentTime Number 截图时间 默认为1，如果为0可能是黑屏\r\n     * quality Number 图片质量  0.2-0.95  如果为1，会增大base64大小\r\n     * imgWidth Number 生成图片宽度  高度会按照视频宽高比计算\r\n     * imageType String 图片类型  image/png类似这种格式\r\n     * isCheckBackgroundColor Boolean 是否校验图片是纯色，默认为false，如果开启，图片是纯色，会自动获取下一秒视频图片\r\n     */\n    function VideoFrameCover() {\n      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n      _classCallCheck(this, VideoFrameCover);\n\n      var url = config.url,\n          _config$currentTime = config.currentTime,\n          currentTime = _config$currentTime === void 0 ? 1 : _config$currentTime,\n          quality = config.quality,\n          imgWidth = config.imgWidth,\n          imageType = config.imageType,\n          isCheckBackgroundColor = config.isCheckBackgroundColor,\n          success = config.success;\n\n      if (!url) {\n        console.warn('视频链接不能为空');\n      }\n\n      this.url = url;\n      this.video = null;\n      this.videoWidth = 0;\n      this.imageType = imageType || 'image/jpeg';\n      this.quality = quality ? quality > 0.2 ? quality : 0.2 : 0.95; // 不要用1，会额外增大base64大小。\n\n      this.imgWidth = imgWidth || 800;\n      this.currentTime = currentTime < 1 ? 1 : currentTime; // 默认设置1S\n\n      this.isCheckBackgroundColor = isCheckBackgroundColor;\n      this.duration = 0; // 视频时长\n\n      this.success = success;\n      this.getVideoFrame();\n    }\n    /**\r\n     * 生成视频\r\n     */\n\n\n    _createClass(VideoFrameCover, [{\n      key: \"getVideoFrame\",\n      value: function getVideoFrame() {\n        var _this = this;\n\n        var self = this;\n        var video = this.video || document.createElement('video');\n        var currentTime = self.currentTime;\n        video.src = self.url;\n        video.style.cssText = \"position: fixed; top: -100%; left: -100%; width: 400px; display: none; visibility: hidden;\";\n        video.controls = 'controls'; // 此处是设置跨域，防止污染canvas画布\n\n        video.crossOrigin = 'Anonymous'; // 设置视频播放进度\n\n        video.currentTime = currentTime; // 监听播放进度改变，获取对应帧的截图\n\n        video.addEventListener('timeupdate', function () {\n          _this.setVideoInfo();\n\n          if (_this.currentTime <= _this.duration) {\n            _this.generateCanvas();\n          } else {\n            _this.nextFrame();\n          }\n        });\n        this.video = video;\n        document.body.appendChild(video);\n      } // 设置video信息\n\n    }, {\n      key: \"setVideoInfo\",\n      value: function setVideoInfo() {\n        var video = this.video;\n        this.videoWidth = video.videoWidth;\n        this.videoHeight = video.videoHeight;\n        this.duration = Math.floor(video.duration || 0);\n      }\n      /**\r\n       * 跳转到具体的时间位置\r\n       * @param { Number } time 时间位置\r\n       */\n\n    }, {\n      key: \"appointFrame\",\n      value: function appointFrame(time) {\n        if (!this.video) {\n          console.warn('请先初始化');\n          return;\n        }\n\n        var duration = this.duration;\n        time = time > duration ? duration : time;\n        this.currentTime = time;\n        this.video.currentTime = time;\n      } // 获取下一秒的截图\n\n    }, {\n      key: \"nextFrame\",\n      value: function nextFrame() {\n        var duration = this.duration;\n        var currentTime = this.currentTime;\n\n        if (this.currentTime === duration) {\n          return;\n        }\n\n        currentTime++;\n        this.appointFrame(currentTime);\n      }\n      /**\r\n       * 生成canvas，并到处图片信息\r\n       * @returns\r\n       */\n\n    }, {\n      key: \"generateCanvas\",\n      value: function\n        /* callback */\n      generateCanvas() {\n        var self = this;\n        var canvas = this.canvas || document.createElement('canvas');\n        var ctx = canvas.getContext('2d', {\n          alpha: false\n        });\n        var imgWidth = this.imgWidth;\n        var isCheckBackgroundColor = this.isCheckBackgroundColor;\n        var videoWidth = this.videoWidth;\n        var videoHeight = this.videoHeight;\n\n        if (!this.canvas) {\n          if (imgWidth) {\n            videoHeight = imgWidth / (videoWidth / videoHeight);\n            videoWidth = imgWidth;\n          }\n\n          canvas.width = videoWidth;\n          canvas.height = videoHeight;\n        }\n\n        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height); // 如果开启图片校验模式\n\n        if (isCheckBackgroundColor) {\n          try {\n            var checkImageResult = this.checkImage(ctx, videoWidth, videoHeight);\n\n            if (!checkImageResult) {\n              this.nextFrame();\n              return;\n            }\n          } catch (e) {\n            debugger;\n          }\n        }\n\n        var img = canvas.toDataURL(this.imageType, self.quality); // callback && callback(img)\n\n        var videoInfo = {};\n        this.success && this.success(img, this.video);\n      }\n      /**\r\n       * 检查图片是否是纯色图\r\n       * @param { Object } ctx canvas执行环境\r\n       * @param { Number } width canvas宽度\r\n       * @param { Number } height canvas高度\r\n       */\n\n    }, {\n      key: \"checkImage\",\n      value: function checkImage(ctx, width, height) {\n        var imgData = ctx.getImageData(0, 0, width, height);\n        var imgDataContent = imgData.data;\n        var rgbObj = {};\n        var differentLen = 0;\n        /**\r\n         * canvas通过imgDataContent获取到的值是一个Uint8ClampedArray的类型化数组\r\n         * 每一个值存储的是0-255的整型\r\n         * 每4个为一组，分别代表 R G B A\r\n         *\r\n         * 整体的思路为遍历整个数组，如果发现颜色值的种类超过配置的数量，即为有图像的图，否则为纯色图\r\n         */\n\n        for (var i = 0, len = imgDataContent.length; i < len; i += 4) {\n          var key = imgDataContent.slice(i, i + 4).join('');\n\n          if (!rgbObj[key]) {\n            rgbObj[key] = 1;\n            differentLen++;\n          } // 判断如果颜色超出100种，不是纯图\n\n\n          if (differentLen > 100) {\n            return true;\n          }\n        }\n\n        return false;\n      }\n      /**\r\n       * 将base64转换成 Blob\r\n       * @param { String } code base64字符串\r\n       * @returns { Blob } 返回Blob对象\r\n       */\n\n    }, {\n      key: \"base64ToBlob\",\n      value: function base64ToBlob(code) {\n        if (!code) {\n          console.warn('base64不能为空');\n          return;\n        }\n\n        var parts = code.split(';base64,'); // 获取图片类型\n\n        var contentType = parts[0].split(':')[1];\n        /**\r\n         * 解码base64\r\n         * Window atob() 方法\r\n         * encodedStr: 必需，是一个通过 btoa() 方法编码的字符串。\r\n         * 该方法返回一个解码的字符串。\r\n         */\n\n        var raw = window.atob(parts[1]);\n        var rawLength = raw.length; // Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。\n        // 创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。\n\n        /**\r\n         * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array\r\n         */\n\n        var uInt8Array = new Uint8Array(rawLength); // 将字符转换成unicode值\n\n        for (var i = 0; i < rawLength; ++i) {\n          uInt8Array[i] = raw.charCodeAt(i);\n        }\n        /**\r\n         * Blob() 构造函数返回一个新的 Blob 对象。 blob的内容由参数数组中给出的值的串联组成。\r\n         * https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob\r\n         * 参数\r\n         * @param { ArrayBuffer, ArrayBufferView, Blob, DOMString } array\r\n         * array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array ，\r\n         *\r\n         * ArrayBufferView: 类型化数组\r\n         * 对象描述了一个底层的二进制数据缓冲区（binary data buffer）的一个类数组视图（view）。\r\n         *\r\n         * 或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings会被编码为UTF-8。\r\n         *\r\n         * @param { Object } 配置参数\r\n         * type，默认值为 \"\"，它代表了将会被放入到blob中的数组内容的MIME类型。\r\n         * endings，默认值为\"transparent\"，用于指定包含行结束符\\n的字符串如何被写入。\r\n         * 它是以下两个值中的一个： \"native\"，\r\n         * 代表行结束符会被更改为适合宿主操作系统文件系统的换行符，\r\n         * 或者 \"transparent\"，代表会保持blob中保存的结束符不变\r\n         */\n\n\n        return new Blob([uInt8Array], {\n          type: contentType\n        });\n      }\n      /**\r\n       * 下载文件\r\n       * @param {String} code base64字符串\r\n       */\n\n    }, {\n      key: \"downloadFile\",\n      value: function downloadFile(code) {\n        var fileName = Date.now();\n\n        if (!code) {\n          console.warn('base64不能为空');\n          return;\n        }\n\n        var aLink = document.createElement('a');\n        var blob = this.base64ToBlob(code); //new Blob([content]);\n\n        var evt = document.createEvent('HTMLEvents');\n        evt.initEvent('click', true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为\n\n        aLink.download = fileName;\n        aLink.href = URL.createObjectURL(blob);\n        aLink.click();\n      }\n    }]);\n\n    return VideoFrameCover;\n  }();\n\n  return VideoFrameCover;\n});\n\n//# sourceURL=webpack://VideoFrameCover/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});