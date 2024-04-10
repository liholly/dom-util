export default function () {
	var body = document.documentElement || document.body || {};
	return {t: body.scrollTop, l: body.scrollLeft, w: body.scrollWidth, h: body.scrollHeight}
}