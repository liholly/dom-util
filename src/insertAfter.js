/**
 * 插入元素到目标元素后面
 * nextSibling会把字符节点也当成普通节点，要用nextElementSibling
 * 测试 aa = createEl('div','123456');append(getEl('body'),aa);insertAfter(aa,createEl('div','789'));
 * @param el
 * @param son
 * @param inner
 * @returns {*}
 */
export default function (el, son, inner) {
	if (el && son) {
		if (inner) el.appendChild(son);
		else el.parentNode.insertBefore(son, el.nextElementSibling);
	}

	return el;
}