/**
 * appendChild的别名函数
 * 允许一次性追加多个元素
 * @param el 容器
 * @returns {*}
 */
export default function (el) {
	if (el) {
		for (var _i = 0; _i < arguments.length; _i++) {
			if (_i === 0) continue;
			el.appendChild(arguments[_i]);
		}
	}

	return el;
}