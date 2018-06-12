/*
 * @Author: zhangfanglan 
 * @Date: 2018-04-23 11:22:58 
 * @Last Modified by:   zhangfanglan 
 * @Last Modified time: 2018-04-23 11:22:58 
 */
function Dragify(elem, option) {
    this.$elem = elem
    this.watcher = new Watcher();
    this.option = option || {};
    this._data = {};
    if (typeof this.$elem == 'string' && !document.querySelector(this.$elem)) {
        console.log('第1个参数有误')
        return
    }
    if (typeof this.option.target == 'string' && !document.querySelector(this.option.target)) {
        console.log('第二个参数有误')
        return
    }
    if (typeof this.$elem == 'object' && !this.$elem) {
        console.log('第1个参数有误')
        return
    }
    if (typeof this.option.target == 'object' && !this.option.target) {
        console.log('第二个参数有误')
        return
    }
    this.checkOption();
    this.init();
}
Dragify.prototype = {
    constructor: Dragify,
    checkOption() {
        let that = this;
        if (typeof that.$elem === 'string') {
            that.$elem = document.querySelector(that.$elem);

        }
        if (that.option.target && typeof that.option.target === 'string') {
            that._data.target = document.querySelector(that.option.target);
        } else {
            that._data.target = that.option.target;
            console.log(that._data.target)
        }
    },
    init: function () {
        let that = this
        let target = this._data.target;
        that._data.dragable = false;
        if (!that.$elem) {
            console.log('参数有误')
        } else {
            that.$elem.addEventListener(EVENTS[0], function (e) {
                if (that.isChildren(e.target, target)) {
                    that._data.dragable = true;
                } else {
                    that._data.dragable = false;
                    return;
                }
                let eInfo = that._getEventInfo(e)
                let $parent = that.$elem.offsetParent
                let diffX = eInfo.clientX - that.$elem.offsetLeft
                let diffY = eInfo.clientY - that.$elem.offsetTop
                let pDiffX = $parent.offsetLeft || 0
                let pDiffY = $parent.offsetTop || 0
                let windowWidth = document.documentElement.clientWidth
                let windowHeight = document.body.scrollHeight
                let elemWidth = that.$elem.offsetWidth
                let elemHeight = that.$elem.offsetHeight
                let style = getComputedStyle(that.$elem)
                let transition = style['transition'] || style['-webkit-transition'] || style['-moz-transition']
                let zIndex = getComputedStyle(that.$elem).zIndex

                that.watcher.trigger('start', e, that.$elem)
                document.addEventListener(EVENTS[1], move)
                function move(e) {
                    if (!that._data.dragable) { return }

                    let eInfo = that._getEventInfo(e)
                    let left = eInfo.clientX - diffX;
                    let top = eInfo.clientY - diffY;

                    if (left + pDiffX < 0) left = left - (left + pDiffX)
                    if (top + pDiffY < 0) top = top - (top + pDiffY)
                    if (left + pDiffX + elemWidth > windowWidth) left = windowWidth - (pDiffX + elemWidth)
                    if (top + pDiffY + elemHeight > windowHeight) top = windowHeight - (pDiffY + elemHeight)

                    that.$elem.style.position = 'absolute'
                    that.$elem.style['transition'] = that.$elem.style['-webkit-transition'] = that.$elem.style['-moz-transition'] = 'unset'
                    that.$elem.style.left = left + 'px'
                    that.$elem.style.top = top + 'px'
                    that.$elem.style.zIndex = 19911125

                    that.watcher.trigger('move', e, that.$elem);
                }

                document.addEventListener(EVENTS[2], end)
                function end(e) {
                    if (!that._data.dragable) { return }
                    document.removeEventListener(EVENTS[1], move)
                    document.removeEventListener(EVENTS[2], end)
                    that.$elem.style['transition'] = that.$elem.style['-webkit-transition'] = that.$elem.style['-moz-transition'] = transition
                    that.$elem.style.zIndex = zIndex

                    that.watcher.trigger('end', e, that.$elem)
                }
            })
        }

    },

    isChildren(element, parent) {
        let cur = element;
        for (; cur.parentNode; cur = cur.parentNode) {
            if (cur === parent) {
                return true;
            }
        }
        return false;
    },
    on: function () {
        this.watcher.on.apply(this.watcher, arguments)
        return this.watcher
    },
    isTouch: function (e) {
        return 'ontouchstart' in window ||
            window.DocumentTouch && document instanceof window.DocumentTouch ||
            navigator.maxTouchPoints > 0 ||
            window.navigator.msMaxTouchPoints > 0
    },
    _getEventInfo: function (e) {
        return Dragify.prototype.isTouch() ? e.targetTouches[0] : e
    },

}

let EVENTS = Dragify.prototype.isTouch() ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup"]


const Watcher = function () {
    this.events = {}
}
Watcher.prototype = {
    construct: Watcher,
    on: function (type, fn) {
        this._getEventInfo(type).push(fn)
        return this
    },
    trigger: function (type) {
        let event = this._getEventInfo(type)
        let params = Array.prototype.slice.call(arguments, 1)
        event.forEach(function (fn) {
            fn.apply(fn, params)
        })
        return this
    },
    _getEventInfo: function (type) {
        if (!this.events[type]) this.events[type] = []
        return this.events[type]
    },
    remove: function (type, fn) {
        let event = this._getEventInfo(type)

        if (!fn) {
            this.events[type] = []
        } else {
            event.splice(event.indexOf(fn), 1)
        }

        return this
    }
}

export { Dragify }