/**
 * 获取元素的内外宽px
 * @param el    元素
 * @param inner    是否为内尺寸
 * @returns {number}
 */
export default function (el, inner) {
	return el ? (inner ? el.clientWidth : el.offsetWidth) : el
}