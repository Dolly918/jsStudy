/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-18 11:33
 * 用户代理监测
*/
export let ua = () => {
	let engine = {
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0,
		//完整的版本号
		ver: null
	};

	//浏览器
	let browser = {
		//主要浏览器 
		ie: 0,
		firefox: 0,
		safari: 0,
		konq: 0,
		opera: 0,
		chrome: 0,

		//具体版本号
		ver: null
	};

	//平台、设备和操作系统
	let system = {
		win: false,
		mac: false,
		x11: false,

		//移动设备
		iphone: false,
		ipod: false,
		ipad: false,
		ios: false,
		android: false,
		nokiaN: false,
		winMobile: false,

		//游戏系统
		wii: false,
		ps: false
	};

	//检测呈现引擎、平台和设备
	let ua = navigator.userAgent;

	if (window.opera) {
		engine.ver = browser.ver = window.opera.version();
		engine.opera = browser.opera = parseFloat(engine.ver);
	} else if (/AppleWebKit\/(\S+)/.test(ua)) {//webkit 引擎
		engine.ver = RegExp["$1"];
		engine.webkit = parseFloat(engine.ver);

		//先区分 Chrome 与 Safari
		if (/Chrome\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.chrome = parseFloat(browser.ver);
		} else if (/Version\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.safari = parseFloat(browser.ver);
		} else {
			//近似地确定版本号
			let safariVersion = 1;
			if (engine.webkit < 100) {
				safariVersion = 1;
			} else if (engine.webkit < 312) {
				safariVersion = 1.2;
			} else if (engine.webkit < 412) {
				safariVersion = 1.3;
			} else {
				safariVersion = 2;
			}
			browser.safari = browser.ver = safariVersion;
		}
	} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {//khtml 引擎
		engine.ver = browser.ver = RegExp["$1"];
		engine.khtml = browser.konq = parseFloat(engine.ver);

	} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {//gecko 引擎
		engine.ver = RegExp["$1"];
		engine.gecko = parseFloat(engine.ver);
		//确定是不是 firefox
		if (/Firefox\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.firefox = parseFloat(browser.ver);
		}
	} else if (/MSIE ([^;]+)/.test(ua)) {//ie 引擎
		engine.ver = browser.ver = RegExp["$1"];
		engine.ie = browser.ie = parseFloat(engine.ver);
	}
	// 监测浏览器
	browser.ie = engine.ie;
	browser.opera = engine.opera;

	//识别平台
	let p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p.indexOf("X11") == 0) || (p.indexOf("Linux") == 0);

	//识别 Windows 操作系统
	if (system.win) {
		if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
			if (RegExp["$1"] == "NT") {
				switch (RegExp["$2"]) {
					case "5.0":
						system.win = "2000";
						break;
					case "5.1":
						system.win = "XP";
						break;
					case "6.0":
						system.win = "Vista";
						break;
					case "6.1":
						system.win = "7";
						break;
					default:
						system.win = "NT";
						break;
				}
			}
		} else if (RegExp["$1"] == "9x") {
			system.win = "ME";
		} else {
			system.win = RegExp["$1"];
		}
	}

	//移动设备
	system.iphone = ua.indexOf("iPhone") > -1;
	system.ipod = ua.indexOf("iPod") > -1;
	system.ipad = ua.indexOf("iPad") > -1;
	//检测诺基亚 N 系列手机
	system.nokiaN = ua.indexOf("NokiaN") > -1;

	//windows mobile
	if (system.win == "CE") {
		system.winMobile = system.win;
	} else if (system.win == "Ph") {
		if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
			system.win = "Phone";
			system.winMobile = parseFloat(RegExp["$1"]);
		}
	}

	//检测 iOS 版本
	if (system.mac && ua.indexOf("Mobile") > -1) {
		if (/CPU(?:iPhone)?OS (\d+_\d+)/.test(ua)) {
			system.ios = parseFloat(RegExp.$1.replace("_", "."));
		} else {
			system.ios = 2;//不能真正监测出来，所以只能猜测
		}
	}

	//检测 Android 版本
	if (/Android (\d+\.\d+)/.test(ua)) {
		system.android = parseFloat(RegExp.$1);
	}

	//识别游戏系统
	system.wii = ua.indexOf("Wii") > -1;
	system.ps = /playstation/i.test(ua);
	var browser2 = {
		imformation: function () {
			var u = window.navigator.userAgent, app = navigator.appVersion;
			return {//移动终端浏览器版本信息   
				trident: u.indexOf("Trident") > -1, //IE内核  
				presto: u.indexOf("Presto") > -1, //opera内核  
				webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核  
				gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核  
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
				android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器  
				iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器  
				iPad: u.indexOf("iPad") > -1, //是否iPad  
				webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部  
				weixin: u.toLowerCase().match(/MicroMessenger/i) == "micromessenger",//是否是微信浏览器	
				isEPapp: u.indexOf("YiCheHuoBanApp") != -1 ? true : false,//易车伙伴app
				epVersion: u.match("YiCheHuoBanApp") ? u.substr(u.indexOf('YiCheHuoBanApp/') + 19, 6).replace(new RegExp("(\\S{" + 2 + "})", "g"), '$1.').replace(/.$/gi, "") : false,
				bigVersion: u.match("YiCheHuoBanApp") ? u.substr(u.indexOf('YiCheHuoBanApp/') + 19, 2) : 0,
				middleVersion: u.match("YiCheHuoBanApp") ? u.substr(u.indexOf('YiCheHuoBanApp/') + 21, 2) : 0,
				littleVersion: u.match("YiCheHuoBanApp") ? u.substr(u.indexOf('YiCheHuoBanApp/') + 23, 2) : 0,
				isQQBrow: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && new RegExp('MQQBrowser QQ').test(ua),
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	return {
		ua: ua,
		engine: engine,
		browser: browser,
		browser2: browser2,
		system: system
	};
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           