export default function (el, attrName) {
	return el ? el.getAttribute(attrName) : el
}