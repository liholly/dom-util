export default function (el, style) {
	if (el && style) {
		for (var _k in style) {
			el.style[_k] = style[_k]
		}
	}

	return el;
}