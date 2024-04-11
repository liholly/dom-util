import getTarget from './getTarget.js'
import getEl from './../getEl.js'
import getElAll from './../getElAll.js'
import getParent from './../getParent.js'
import mapParents from './../mapParents.js'

/**
 * 添加事件 默认为冒泡阶段捕捉
 * @param element    事件元素
 * @param type    事件类型
 * @param sltorOrHandler    代理选择器 允许是回调函数 同一代理层级下的所有兄弟元素都会响应事件，要保证元素的统一
 * @param handler    事件函数，回传参数有e,target
 */
export default function (element, type, sltorOrHandler, handler) {
	var __sltor = handler ? sltorOrHandler : null;
	var __handler = handler || sltorOrHandler;

	//事件委托
	function eventFn(e) {
		var stop = null;
		var target = getTarget(e);
		var execute = target === element;
		var t = null;

		//事件代理
		if (__sltor) {
			if (typeof __sltor === 'string') {
				//点击了父元素不执行
				if (target === element) return false;

				//从事件元素往上查找父元素，查找到代理元素为止（从父元素用选择器能查找到自己）
				//存储当前的元素，因为map方法每次传回来的都是父元素
				var __current = target;
				mapParents(target, el => {
					if (getEl(el, __sltor)) {
						target = __current;
						execute = true;
						return false
					} else {
						//有可能已经到达element，却因为该子元素不是代理的元素导致到达边界了还在往上枚举，要截至
						if (el === element) return false;
						else __current = el
					}
				})
			} else {
				if (typeof __sltor === 'function') execute = __sltor(e);
				else execute = e.target === __sltor
			}
		}

		//根据是否有代理的情况来决定是否执行
		if (__sltor ? execute : true) stop = __handler.call(this, e, target);

		//如果事件函数有返回false，则禁止事件默认行为
		if (stop === false) return false;
	}

	element.addEventListener(type, eventFn, false)
}