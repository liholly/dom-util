/**
 * 获取指定元素下的所有子孙节点(不含文本节点)
 * @param node
 * @returns {Array}
 */
export default function (node) {
	var allNodes = [];

	function getChildNode(node) {
		//先找到子结点
		var nodeList = node.childNodes;
		for (var i = 0; i < nodeList.length; i++) {
			//childNode获取到到的节点包含了各种类型的节点
			//但是我们只需要元素节点  通过nodeType去判断当前的这个节点是不是元素节点
			var childNode = nodeList[i];
			//判断是否是元素结点
			if (childNode.nodeType === 1) {
				allNodes.push(childNode);
				getChildNode(childNode);
			}
		}
	}

	getChildNode(node);

	return allNodes
}