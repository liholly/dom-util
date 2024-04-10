import getBoxClient from './getBoxClient.js'


/**
 * 滚动事件分发
 * topIn            入界顶部，元素bottom > 0
 * topInAll         入界顶部-完全，元素top > 0
 * topOut           出界顶部，元素top < 0
 * topOutAll        出界顶部-完全，元素bottom < 0
 * middleIn         入界中部，元素top < 中部基线 && 元素bottom > 中部基线
 * middleOut        出界中部，middleIn不符合时则是middleOut
 * bottomIn         入界底部，元素top < 屏幕高度
 * bottomInAll      入界底部-完全，元素bottom < 屏幕高度
 * bottomOut        出界底部，元素bottom > 屏幕高度
 * bottomOutAll     出界底部-完全，元素top > 屏幕高度
 *
 * @param curEl
 * @param eName
 * @param boxH
 * @param clientH
 * @param scrollRepeating    是否打开重复执行
 * @param callback
 */
export default function (curEl, eName, boxH, clientH, scrollRepeating, callback) {
	return function (e) {
		//元素位置
		var box = getBoxClient(curEl);
		var boxTop = box.top;
		var boxBottom = box.bottom;

		//窗口middle基线
		var middleBaseline = clientH / 2;
		var inMiddle = boxTop < middleBaseline && boxBottom > middleBaseline;

		var allow = false;
		switch (eName) {
			case 'topIn':
				allow = boxBottom > 0;
				break;
			case 'topInAll':
				allow = boxTop > 0;
				break;
			case 'topOut':
				allow = boxTop < 0;
				break;
			case 'topOutAll':
				allow = boxBottom < 0;
				break;
			case 'middleIn':
				allow = inMiddle;
				break;
			case 'middleOut':
				allow = !inMiddle;
				break;
			case 'bottomIn':
				allow = boxTop < clientH;
				break;
			case 'bottomInAll':
				allow = boxBottom < clientH;
				break;
			case 'bottomOut':
				allow = boxBottom > clientH;
				break;
			case 'bottomOutAll':
				allow = boxTop > clientH;
				break;
		}

		//防止在一个滚动事件变更中 重复执行同一个事件 添加prev_event标记
		if (allow && (scrollRepeating || curEl.prev_event !== eName)) {
			curEl.prev_event = eName;

			//将事件对象转到事件发起的当前元素 不是scroll传递的document对象
			callback({
				target: curEl
			})
		}
	}
}