export default function (el, deep) {
	return el ? el.cloneNode(!!deep) : el;
}