var dom = (function () {
	'use strict';

	function setStyle (el, style) {
		if (el && style) {
			for (var _k in style) {
				el.style[_k] = style[_k];
			}
		}

		return el;
	}

	function setAttrs (el, attach) {
		if (el) {
			var _k;
			for (_k in attach) {
				if (_k === 'style' && typeof attach[_k] === 'object') setStyle(el, attach[_k]);
				else el.setAttribute(_k, attach[_k]);
			}
		}

		return el
	}

	function setHtml (el, html) {
		el && (el.innerHTML = html);
		return el
	}

	function removeEl (el) {
		return el ? (el.remove ? el.remove() : el && el.parentNode && el.parentNode.removeChild(el)) : null;
	}

	/**
	 * 创建html元素实例万能方法
	 *  也就是说，除第一个参数是必须的，还可以传入三个附加参数，只要保持参数的类型，参数次序随意。
	 *    object    表示附加到元素上的属性 style属性支持两种格式：字符串|对象
	 *    array    表示子元素
	 *    string    表示元素内文本
	 *  测试
	 *  appendTo(createEl('<div id="liholly"></div>',{class:'active'},[createEl('button','test'),createEl('button','test')],'666666'),getEl('body'))
	 * @param tagName 标签名|html
	 * @returns {Element}
	 */
	function createEl (tagName) {
		//处理tagName 创建el
		var _i, _k;
		var _isTag = !tagName.match(/</);
		var __el__ = document.createElement(_isTag ? tagName : 'div');
		var _el = _isTag ? __el__ : (setHtml(__el__, tagName).children || [])[0];
		if (!_isTag) removeEl(__el__);

		//附加项
		var _temp, _props, _children, _text;
		for (_i = 0; _i < arguments.length; _i++) {
			if (_i === 0) continue;
			_temp = arguments[_i];
			if (typeof _temp === 'object') {
				if ('length' in _temp) _children = _temp;
				else _props = _temp;
			}
			else _text = _temp;
		}

		if (_text) _el.innerText = _text;
		if (_props) setAttrs(_el, _props);
		if (_children) for (_k = 0; _k < _children.length; _k++) _el.appendChild(_children[_k]);

		return _el;
	}

	function cloneEl (el, deep) {
		return el ? el.cloneNode(!!deep) : el;
	}

	function appendTo (el, wrap) {
		(el && wrap) && wrap.appendChild(el);
		return el;
	}

	/**
	 * appendChild的别名函数
	 * 允许一次性追加多个元素
	 * @param el 容器
	 * @returns {*}
	 */
	function append (el) {
		if (el) {
			for (var _i = 0; _i < arguments.length; _i++) {
				if (_i === 0) continue;
				el.appendChild(arguments[_i]);
			}
		}

		return el;
	}

	function getEl (el, slt) {
		var __slt = slt ? slt : el;
		var __el = slt ? el : document;
		return __el.querySelector(__slt)
	}

	/**
	 * 临时生成一个元素实例，用于计算某些属性值
	 * @param el 需要被计算的元素
	 * @param fn 需要处理的事务
	 */
	function tempAppend (el, fn) {
		var temp = createEl('div');
		//这个要考虑使用visible 用display=none可能无法计算某些值
		temp.style.display = 'none';
		append(temp, el);
		append(getEl('body'), temp);
		fn(el);
		temp.remove();
	}

	function setHtmlOuter (el, html) {
		el && (el.outerHTML = html);
		return el
	}

	function setAttr (el, attrName, value) {
		el && el.setAttribute(attrName, value);
		return el
	}

	function setCss (text) {
		var styleEl = createEl('style');
		setHtml(styleEl, text);
		append(getEl('head'), styleEl);
	}

	/**
	 * 处理calss属性
	 * dom = utils.dom;
	 * aaa = dom.getEl('body');
	 * dom.addClass(aaa,'bbbb');
	 * dom.addClass(aaa,'cccc dddd ffff');
	 * dom.removeClass(aaa,'bbbb   cccc');
	 * dom.replaceClass(aaa,'dddd','bbbb');
	 *
	 * @param el 被处理的元素
	 * @param className 单个|空格多个|array
	 * @param type add|remove
	 * @returns {*}
	 */
	function _handleClass (el, className, type) {
		if (el && className) {
			if (typeof className === 'string' && className.indexOf(' ') > -1) {
				className = className.split(' ');
			}

			var handle = function (elm) {
				if (typeof className === 'string') {
					elm.classList[type](className);
				}
				else {
					var i, n;
					for (i = 0; i < className.length; i++) {
						n = (className[i] || '').replace(' ', '');
						if (n) elm.classList[type](n);
					}
				}
			};

			((typeof el === 'object') && ('length' in el)) ? el.forEach(handle) : handle(el);
		}

		return el;
	}

	/**
	 * 添加样式类名称
	 * 注意做兼容，当前只兼容到ie10
	 * 要更好兼容要用ele.className的方式
	 * @param el
	 * @param className
	 * @returns {*}
	 */
	function addClass (el, className) {
		return _handleClass(el, className, 'add');
	}

	function removeClass (el, className) {
		return _handleClass(el, className, 'remove');
	}

	function replaceClass (el, a, b) {
		if (el && a && b) {
			el.classList.add(b);
			el.classList.remove(a);
		}
		return el;
	}

	function toggleClass (el, className) {
		return _handleClass(el, className, 'toggle');
	}

	function removeAttr (el, attrName) {
		el && el.removeAttribute(attrName);
		return el;
	}

	/**
	 * 插入元素到目标元素前面
	 * createEl('div','123456');append(getEl('body'),aa);insertBefore(aa,createEl('div','789'),true);
	 * @param el
	 * @param son
	 * @param inner
	 * @returns {*}
	 */
	function insertBefore (el, son, inner) {
		if (el && son) {
			var _children = el.firstChild;
			var _el = inner ? _children : el;
			if (!_children) el.appendChild(son);
			else _el.parentNode.insertBefore(son, _el);
		}

		return el;
	}

	/**
	 * 插入元素到目标元素后面
	 * nextSibling会把字符节点也当成普通节点，要用nextElementSibling
	 * 测试 aa = createEl('div','123456');append(getEl('body'),aa);insertAfter(aa,createEl('div','789'));
	 * @param el
	 * @param son
	 * @param inner
	 * @returns {*}
	 */
	function insertAfter (el, son, inner) {
		if (el && son) {
			if (inner) el.appendChild(son);
			else el.parentNode.insertBefore(son, el.nextElementSibling);
		}

		return el;
	}

	/**
	 * 元素是否包含指定类
	 * createEl('div','6666',{class:'lihong mimi'});append(getEl('body'),aaa);
	 * @param el
	 * @param className
	 * @returns {number}
	 */
	function hasClass (el, className) {
		return (el.className || '').split(' ').indexOf(className) > -1;
	}

	/**
	 * 元素在指定集合内的下标值，比如getElAll获得的元素集合
	 * @param el 元素
	 * @param elLst 元素集合
	 * @returns {*}
	 */
	function indexOf (el, elLst) {
		var index = -1;
		for (var i = 0; i < elLst.length; i++) {
			if (elLst[i] === el) {
				index = i;
				break;
			}
		}
		return index;
	}

	/**
	 * 获取元素的父节点
	 * @param el
	 * @returns {*|Node}
	 */
	function getParent (el) {
		return el && el.parentNode
	}

	/**
	 * 元素在父元素内的下标值
	 * @param el 元素
	 * @returns {*}
	 */
	function indexOfParent (el) {
		var index = -1;

		if (el) {
			var children = getParent(el).children;
			for (var i = 0; i < children.length; i++) {
				if (children[i] === el) {
					index = i;
					break;
				}
			}
		}

		return index;
	}

	function getElAll (el, slt) {
		var __slt = slt ? slt : el;
		var __el = slt ? el : document;
		return __el.querySelectorAll(__slt)
	}

	function getHtml (el) {
		return el ? el.innerHTML : el
	}

	function getHtmlOuter (el) {
		return el ? el.outerHTML : el
	}

	/**
	 * 获取元素的子元素列表
	 * @param el
	 * @returns {children|jQuery.children|boolean|*|HTMLElement[]}
	 */
	function getChildren (el) {
		return el && el.children
	}

	function getAttr (el, attrName) {
		return el ? el.getAttribute(attrName) : el
	}

	/**
	 * 获取元素的内外宽px
	 * @param el    元素
	 * @param inner    是否为内尺寸
	 * @returns {number}
	 */
	function getWidth (el, inner) {
		return el ? (inner ? el.clientWidth : el.offsetWidth) : el
	}

	/**
	 * 获取元素的内外高px
	 * @param el    元素
	 * @param inner    是否为内尺寸
	 * @returns {number}
	 */
	function getHeight (el, inner) {
		return el ? (inner ? el.clientHeight : el.offsetHeight) : el
	}

	/**
	 * 枚举元素的父元素
	 * @param el    起始元素
	 * @param fn    枚举方法
	 * @returns {*}
	 */
	function mapParents (el, fn) {
		while (el && getParent(el) && fn) {
			el = getParent(el);
			var _a = fn(el);
			if (_a === false) break;
		}
	}

	/**
	 * 获取元素的所有父节点
	 * append(getEl('body'),createEl('div',{class:'mimi'},'456789',[createEl('div',{class:'mama'},789)]))
	 * @param el    目标元素
	 * @param slt    指定选择器的父节点
	 * @returns {Array}
	 */
	function getParents (el, slt) {
		var res = [];

		mapParents(el, function (p) {
			if (slt) {
				var _p = getParent(p);
				if (_p && getEl(_p, slt)) {
					res.push(p);
					return false
				}
			}
			else res.push(p);
		});

		return res;
	}

	/**
	 * 获取元素的下一个兄弟节点
	 * 通过nextSibling或者 previousSibling所获得的HTML标签元素对象的属性问题
	 * 一般先通过nextSibling.nodeName来获知其标签名，或者通过nextSibling.nodeType来获知其标签类型，
	 * 然后，如果该nextSibling.nodeName = #text，则通过nextSibling.nodeValue来获知其文本值；
	 * 否则，可以通过nextSibling.innerHTML等其他常用标签元素属性来获取其属性。
	 * @param el
	 * @returns {*|Node}
	 */
	function getNextEl (el) {
		return el ? el.nextSibling : el
	}

	/**
	 * 获取元素的上一个元素节点
	 * @param el
	 * @returns {*|Node}
	 */
	function getPrevEl (el) {
		return el ? el.previousSibling : el
	}

	/**
	 * 获取元素的所有兄弟节点
	 * @param el
	 * @returns {*|Node}
	 */
	function getSiblings (el) {
		var a = [];
		
		if (el) {
			var p = el.parentNode.children;
			for (var i = 0, pl = p.length; i < pl; i++) {
				if (p[i] !== el) a.push(p[i]);
			}
		}

		return a;
	}

	/**
	 * 获取指定元素下的所有子孙节点(不含文本节点)
	 * @param node
	 * @returns {Array}
	 */
	function getChildNodes (node) {
		var allNodes = [];

		function getChildNode(node) {
			//先找到子结点
			var nodeList = node.childNodes;
			for (var i = 0; i < nodeList.length; i++) {
				//childNode获取到到的节点包含了各种类型的节点
				//但是我们只需要元素节点  通过nodeType去判断当前的这个节点是不是元素节点
				var childNode = nodeList[i];
				//判断是否是元素结点
				if (childNode.nodeType === 1) {
					allNodes.push(childNode);
					getChildNode(childNode);
				}
			}
		}

		getChildNode(node);

		return allNodes
	}

	function getScroll () {
		var body = document.documentElement || document.body || {};
		return {t: body.scrollTop, l: body.scrollLeft, w: body.scrollWidth, h: body.scrollHeight}
	}

	function getBoxClient (el) {
		return el && el.getBoundingClientRect()
	}

	function getClientSize () {
		var dom = document;
		return {
			h: dom.documentElement.clientHeight || dom.body.clientHeight,
			w: dom.documentElement.clientWidth || dom.body.clientWidth,
		}
	}

	var hasAttrName = (el, name) => !!el.attributes[name];

	var isIE = ("ActiveXObject" in window) || !!document.all;

	/**
	 * 做一些ie兼容性的垫片
	 *  1.添加class系列方法
	 *  2.修复IE9下oninput事件
	 *
	 */
	function ieShim () {
		if (!isIE) return;
		var isClsList = 'classList' in HTMLElement.prototype;
		if (!isClsList) {
			Object.defineProperty(HTMLElement.prototype, 'classList', {
				get: function () {
					var _self = this;
					return {
						add: function (cls) {
							if (!this.contains(cls)) {
								_self.className += (_self.className ? ' ' : '') + cls;
							}
						},
						remove: function (cls) {
							if (this.contains(cls)) {
								var reg = new RegExp(cls);
								_self.className = _self.className.replace(reg, '');
							}
						},
						contains: function (cls) {
							var _className = (_self.className || '').split('');
							return cls ? _className.indexOf(cls) !== -1 : false;
						},
						toggle: function (cls) {
							if (this.contains(cls)) {
								this.remove(cls);
							} else {
								this.add(cls);
							}
						}
					}
				}
			});
		}
	}

	/**
	 * 查询当前字符串是否是一个html字符串
	 * @param str 字符串
	 * @returns {boolean}
	 */
	function isHtml (str) {
		if (typeof str !== 'string' && typeof str !== 'number') return false;
		var _html = String(str);
		return _html[0] === '<' && _html[_html.length - 1] === '>'
	}

	function getTarget (event) {  //返回事件的实际目标
		return event.target || event.srcElement;
	}

	/**
	 * 添加事件 默认为冒泡阶段捕捉
	 * @param element    事件元素
	 * @param type    事件类型
	 * @param sltorOrHandler    代理选择器
	 * @param handler    事件函数
	 */
	function addListener (element, type, sltorOrHandler, handler) {
		var __sltor = handler ? sltorOrHandler : null;
		var __handler = handler || sltorOrHandler;
		var __wrapper = __sltor && typeof __sltor === 'string' ? getParent(getEl(element, __sltor)) : null;

		//事件委托
		function eventFn(e) {
			var stop = null;
			var target = getTarget(e);
			var execute = target === element;
			var t = null;

			//事件代理
			if (__sltor) {
				if (typeof __sltor === 'string') {
					//一次循环都没有的 直接就可以获取到目标的 说明在目标外层了 不算
					if (!getEl(target, __sltor)) {
						if (target !== element) {
							var include = function (children, el) {
								var _include = false;

								for (var i = 0; i < children.length; i++) {
									if (children[i] === el) {
										_include = true;
										break;
									}
								}

								return _include
							};

							mapParents(target, function (el) {
								//查询已经到达绑定的最外层，则停止
								if (__wrapper === el) return false;

								//如果当前被点击的目标在代理元素内，则执行
								var _p = getParent(el);
								var _children = _p && getElAll(_p, __sltor);
								if (_children && include(_children, el)) {
									execute = true;
									t = el;
									return false
								}
							});
						}
					}
				} else {
					if (typeof __sltor === 'function') execute = __sltor(e);
					else execute = e.target === __sltor;
				}
			}

			//根据是否有代理的情况来决定是否执行
			if (__sltor ? execute : true) stop = __handler.call(this, e, t || target);

			//如果事件函数有返回false，则禁止事件默认行为
			if (stop === false) return false;
		}

		if (element.addEventListener) {
			element.addEventListener(type, eventFn, false);  //使用DOM2级方法添加事件
		} else if (element.attachEvent) {                    //使用IE方法添加事件
			element.attachEvent("on" + type, eventFn);
		} else {
			element["on" + type] = eventFn;          //使用DOM0级方法添加事件
		}
	}

	/**
	 * 删除事件
	 * @param element
	 * @param type
	 * @param handler
	 */
	function removeListener (element, type, handler) {  //取消事件
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}

	function getButton (event) {
		//获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch (event.button) {
				//将IE模型下的button属性映射为DOM模型下的button属性
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;  //按下的是鼠标主按钮（一般是左键）
				case 2:
				case 6:
					return 2;  //按下的是中间的鼠标按钮
				case 4:
					return 1;  //鼠标次按钮（一般是右键）
			}
		}
	}

	function getCharCode (event) {
		//以跨浏览器取得相同的字符编码，需在keypress事件中使用
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	}

	function getRelatedTarget (event) {
		//获取mouseover和mouseout相关元素
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {      //兼容IE8-
			return event.toElement;
		} else if (event.formElement) {
			return event.formElement;
		} else {
			return null;
		}
	}

	function getWheelDelta (event) {
		//获取表示鼠标滚轮滚动方向的数值
		if (event.wheelDelta) {
			return event.wheelDelta;
		} else {
			return -event.detail * 40;
		}
	}

	function stopPropagation(event) {
		//立即停止事件在DOM中的传播
		//避免触发注册在document.body上面的事件处理程序
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}

	function preventDefault (event) {   //阻止事件的默认行为
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}

	//增删改

	ieShim();

	var index = {
		createEl,
		cloneEl,
		removeEl,
		appendTo,
		tempAppend,
		setHtmlOuter,
		setAttr,
		setStyle,
		setCss,
		addClass,
		removeAttr,
		removeClass,
		replaceClass,
		toggleClass,
		getEl,
		getElAll,
		getHtml,
		getHtmlOuter,
		getParent,
		getParents,
		getNextEl,
		getPrevEl,
		getSiblings,
		getChildren,
		getAttr,
		getChildNodes,
		getScroll,
		getBoxClient,
		getClientSize,
		hasAttrName,
		setHtml,
		append,
		insertBefore,
		insertAfter,
		setAttrs,
		getWidth,
		getHeight,
		hasClass,
		indexOf,
		indexOfParent,
		mapParents,
		isIE,
		isHtml,

		//事件工具包
		event: {
			addListener,
			removeListener,
			getTarget,
			getButton,
			getCharCode,
			getRelatedTarget,
			getWheelDelta,
			stopPropagation,
			preventDefault,
		}
	};

	return index;

})();
