//增删改
import createEl from './createEl.js'
import cloneEl from './cloneEl.js'
import removeEl from './removeEl.js'
import appendTo from './appendTo.js'
import tempAppend from './tempAppend.js'
import setHtmlOuter from './setHtmlOuter.js'
import setHtml from './setHtml.js'
import setAttr from './setAttr.js'
import setCss from './setCss.js'
import addClass from './addClass.js'
import removeClass from './removeClass.js'
import replaceClass from './replaceClass.js'
import toggleClass from './toggleClass.js'
import setStyle from './setStyle.js'
import removeAttr from './removeAttr.js'
import append from './append.js'
import insertBefore from './insertBefore.js'
import insertAfter from './insertAfter.js'
import setAttrs from './setAttrs.js'
import hasClass from './hasClass.js'
import indexOf from './indexOf.js'
import indexOfParent from './indexOfParent.js'

//查
import getEl from './getEl.js'
import getElAll from './getElAll.js'
import getHtml from './getHtml.js'
import getHtmlOuter from './getHtmlOuter.js'
import getChildren from './getChildren.js'
import getAttr from './getAttr.js'
import getWidth from './getWidth.js'
import getHeight from './getHeight.js'
import getParent from './getParent.js'
import getParents from './getParents.js'
import getNextEl from './getNextEl.js'
import getPrevEl from './getPrevEl.js'
import getSiblings from './getSiblings.js'
import getChildNodes from './getChildNodes.js'
import getScroll from './getScroll.js'
import getBoxClient from './getBoxClient.js'
import getClientSize from './getClientSize.js'
import hasAttrName from './hasAttrName.js'
import mapParents from './mapParents.js'
import ieShim from './ieShim.js'
import isIE from './isIE.js'
import isHtml from './isHtml.js'

//事件
import addListener from './event-util/addListener.js'
import removeListener from './event-util/removeListener.js'
import getTarget from './event-util/getTarget.js'
import getButton from './event-util/getButton.js'
import getCharCode from './event-util/getCharCode.js'
import getRelatedTarget from './event-util/getRelatedTarget.js'
import getWheelDelta from './event-util/getWheelDelta.js'
import stopPropagation from './event-util/stopPropagation.js'
import preventDefault from './event-util/preventDefault.js'

ieShim();

export default {
	createEl,
	cloneEl,
	removeEl,
	appendTo,
	tempAppend,
	setHtmlOuter,
	setAttr,
	setStyle,
	setCss,
	addClass,
	removeAttr,
	removeClass,
	replaceClass,
	toggleClass,
	getEl,
	getElAll,
	getHtml,
	getHtmlOuter,
	getParent,
	getParents,
	getNextEl,
	getPrevEl,
	getSiblings,
	getChildren,
	getAttr,
	getChildNodes,
	getScroll,
	getBoxClient,
	getClientSize,
	hasAttrName,
	setHtml,
	append,
	insertBefore,
	insertAfter,
	setAttrs,
	getWidth,
	getHeight,
	hasClass,
	indexOf,
	indexOfParent,
	mapParents,
	isIE,
	isHtml,

	//事件工具包
	event: {
		addListener,
		removeListener,
		getTarget,
		getButton,
		getCharCode,
		getRelatedTarget,
		getWheelDelta,
		stopPropagation,
		preventDefault,
	}
}