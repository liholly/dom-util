/**
 * 兼容性判断对象是否是一个DOM元素
 * @return {Function}
 */

export default function (obj) {
	return ( typeof HTMLElement === 'object' ) ?
		(obj instanceof HTMLElement) :
		(obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string')
}