export default function (el, attrName, value) {
	el && el.setAttribute(attrName, value);
	return el
}