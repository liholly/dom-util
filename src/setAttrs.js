import setStyle from './setStyle.js'

export default function (el, attach) {
	if (el) {
		var _k;
		for (_k in attach) {
			if (_k === 'style' && typeof attach[_k] === 'object') setStyle(el, attach[_k]);
			else el.setAttribute(_k, attach[_k]);
		}
	}

	return el
}