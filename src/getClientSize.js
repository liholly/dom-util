export default function () {
	var dom = document;
	return {
		h: dom.documentElement.clientHeight || dom.body.clientHeight,
		w: dom.documentElement.clientWidth || dom.body.clientWidth,
	}
}