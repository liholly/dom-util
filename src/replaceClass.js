export default function (el, a, b) {
	if (el && a && b) {
		el.classList.add(b);
		el.classList.remove(a);
	}
	return el;
}