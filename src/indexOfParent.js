import getParent from './getParent.js'
/**
 * 元素在父元素内的下标值
 * @param el 元素
 * @returns {*}
 */
export default function (el) {
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