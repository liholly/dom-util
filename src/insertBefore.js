/**
 * 插入元素到目标元素前面
 * createEl('div','123456');append(getEl('body'),aa);insertBefore(aa,createEl('div','789'),true);
 * @param el
 * @param son
 * @param inner
 * @returns {*}
 */
export default function (el, son, inner) {
	if (el && son) {
		var _children = el.firstChild;
		var _el = inner ? _children : el;
		if (!_children) el.appendChild(son);
		else _el.parentNode.insertBefore(son, _el);
	}

	return el;
}