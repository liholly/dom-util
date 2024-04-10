export default function (el, wrap) {
	(el && wrap) && wrap.appendChild(el);
	return el;
}