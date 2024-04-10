export default function (el, attrName) {
	el && el.removeAttribute(attrName);
	return el;
}