import getTarget from './getTarget.js'
import getEl from './../getEl.js'
import getElAll from './../getElAll.js'
import getParent from './../getParent.js'
import mapParents from './../mapParents.js'

/**
 * 添加事件 默认为冒泡阶段捕捉
 * @param element    事件元素
 * @param type    事件类型
 * @param sltorOrHandler    代理选择器
 * @param handler    事件函数
 */
export default function (element, type, sltorOrHandler, handler) {
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
				else execute = e.target === __sltor
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