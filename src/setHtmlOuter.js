export default function (el, html) {
	el && (el.outerHTML = html)
	return el
}