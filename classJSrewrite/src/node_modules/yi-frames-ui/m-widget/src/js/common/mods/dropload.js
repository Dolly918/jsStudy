/*
 * @Author: zhangfanglan 
 * @Date: 2018-04-10 11:34:38 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2018-04-20 17:05:03
 * element传入的dom对象
 * options传入的需要上拉还是下拉方法及执行函数
 * upInsertDom 加载区dom
 * isLockUp 锁定上方
 * isLockDown 锁定下方
 * isData 是否有数据
 * 
 */
export let dropload = (element, options) => {
    let me = {
        upInsertDom: element,
        loading: false,
        isLockUp: false,
        isLockDown: false,
        isData: true,
        _scrollTop: 0,
        _threshold: 0,
        $element: element,
        lock(direction) {
            switch (direction) {
                case undefined:
                    switch (me.direction) {
                        case 'up':
                            // 如果操作方向向上
                            me.isLockDown = true
                            break;
                        case 'down':
                            // 如果操作方向向下
                            me.isLockUp = true;
                            break;
                        default:
                            me.isLockUp = true;
                            me.isLockDown = true;
                    }
                    break;
                case 'up':
                    // 如果指定锁上方
                    me.isLockUp = true;
                    break;
                case 'down':
                    // 如果指定锁下方
                    me.isLockDown = true;
                    // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
                    me.direction = 'up';
                    break;
            }
        },
        unlock() {
            let me = this;
            // 简单粗暴解锁
            me.isLockUp = false;
            me.isLockDown = false;
            // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
            me.direction = 'up';
        },
        noData(flag) {
            let me = this;
            if (flag === undefined || flag == true) {
                me.isData = false;
            } else if (flag == false) {
                me.isData = true;
            }
        },
        resetload() {
            let me = this;
            if (me.direction == 'down' && me.upInsertDOM) {
                me.$domDown.style.cssText = `height:0`;
                me.$domDown.addEventListener('webkitTransitionEnd mozTransitionEnd transitionend', function (e) {
                    me.loading = false;
                    me.upInsertDOM = false;
                    me.$domDown.innerHTML = me.opts.domDown.domRefresh;
                    for (let i = e.childNodes.length - 1; i >= 0; i--) {
                        e.removeChild(childs[i]);
                    }
                    fnRecoverContentHeight(me);
                });
            } else if (me.direction == 'up') {
                me.loading = false;
                // 如果有数据
                if (me.isData) {
                    // 加载区修改样式
                    me.$domDown.innerHTML = me.opts.domDown.domRefresh;
                    fnRecoverContentHeight(me);
                    fnAutoLoad(me);
                } else {
                    // 如果没数据                    
                    me.$domDown.innerHTML = me.opts.domDown.domNoData;
                }
            }
        }
    }
    return new Promise((resolve, reject) => {
        if (typeof element == 'object' && Object.keys(options).length > 0)
            resolve({ options, element })
        else
            reject('参数不正确')
    }).then(
        (value) => {
            let options = value.options;
            me.opts = {
                scrollArea: options.scrollArea,                                            // 滑动区域
                domUp: {                                                            // 上方DOM
                    domClass: 'dropload-up',
                    domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                    domUpdate: '<div class="dropload-update">↑释放更新</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                },
                domDown: {                                                          // 下方DOM
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                autoLoad: true,                                                     // 自动加载
                distance: 50,                                                       // 拉动距离
                threshold: options.threshold ? options.threshold : 50,                                                      // 提前加载距离
                loadUpFn: options.loadUpFn ? options.loadUpFn : '',                                                       // 上方function
                loadDownFn: options.loadDownFn
            }
            // 判断是否是上拉
            if (me.opts.loadDownFn != '') {
                let div = document.createElement("div")
                div.className = me.opts.domDown.domClass
                div.innerHTML = me.opts.domDown.domRefresh
                me.$element.appendChild(div)
                me.$domDown = document.querySelector(`.${me.opts.domDown.domClass}`);
            }
            // 计算提前加载距离
            if (!!me.$domDown && me.opts.threshold === '') {
                me._threshold = Math.floor(me.$domDown.offsetHeight * 1 / 3);
            } else {
                me._threshold = me.opts.threshold;
            }
            // 判断滚动区域
            if (me.opts.scrollArea == window) {
                me.$scrollArea = window;
                // 获取文档高度
                me._scrollContentHeight = document.body.offsetHeight;
                // 获取win显示区高度  —— 这里有坑
                me._scrollWindowHeight = document.documentElement.clientHeight;
            } else {
                me.$scrollArea = me.opts.scrollArea;
                me._scrollContentHeight = me.$element.clientHeight;
                me._scrollWindowHeight = me.$element.scrollHeight;
                console.log(me._scrollContentHeight + 'cont')
                console.log(me._scrollWindowHeight + 'win')
            }
            fnAutoLoad(me);
            // 窗口调整
            window.addEventListener('resize', function () {
                clearTimeout(me.timer);
                me.timer = setTimeout(function () {
                    if (me.opts.scrollArea == window) {
                        // 重新获取win显示区高度
                        me._scrollWindowHeight = window.innerHeight;
                    } else {
                        me._scrollWindowHeight = me.$element.scrollHeight;
                    }
                    fnAutoLoad(me);
                }, 150);
            })
            // 绑定触摸
            // document.addEventListener('touchstart',fn, false)
            me.$element.addEventListener('touchstart', function (e) {
                if (!me.loading) {
                    fnTouches(e);
                    fnTouchstart(e, me);
                }
            }, false);
            me.$element.addEventListener('touchmove', function (e) {
                if (!me.loading) {
                    fnTouches(e, me);
                    fnTouchmove(e, me);
                }
            }, false);
            me.$element.addEventListener('touchend', function (e) {
                if (!me.loading) {
                    fnTouchend(me);
                }
            }, false);
            // 加载下方
            me.$scrollArea.addEventListener('scroll', function (e) {
                // me.$scrollArea[0].onscroll = function () {
                me._scrollTop = me.$scrollArea.pageYOffset;
                // 滚动页面触发加载数据
                if (me.opts.loadDownFn != '' && !me.loading && !me.isLockDown && (me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop)) {
                    loadDown(me);
                }
            }, false)

        }).catch((value) => {
            // console.log(value)
        })

    // 如果文档高度不大于窗口高度，数据较少，自动加载下方数据
    function fnAutoLoad(me) {
        if (me.opts.loadDownFn != '' && me.opts.autoLoad) {
            console.log(me._threshold)
            console.log(me._scrollContentHeight)
            console.log(me._scrollWindowHeight)
            if ((me._scrollContentHeight - me._threshold) <= me._scrollWindowHeight) {
                loadDown(me);
            }
        }
    }
    // 重新获取文档高度
    function fnRecoverContentHeight(me) {
        if (me.opts.scrollArea == window) {
            me._scrollContentHeight = document.body.offsetHeight;
        } else {
            me._scrollContentHeight = me.$element.clientHeight;
            me._scrollWindowHeight = me.$element.scrollHeight;
        }
    }
    // 加载下方
    function loadDown(me) {
        me.direction = 'up';
        me.$domDown.innerHTML = me.opts.domDown.domLoad
        me.loading = true;
        me.opts.loadDownFn(me);
    }
    // touches
    function fnTouches(e) {
        if (!e.touches) {
            e.touches = e.originalEvent.touches;
        }
    }
    // touchstart
    function fnTouchstart(e, me) {
        me._startY = e.touches[0].pageY;
        // 记住触摸时的scrolltop值
        me.touchScrollTop = me.$scrollArea.scrollY;
    }
    // touchmove
    function fnTouchmove(e, me) {
        me._curY = e.touches[0].pageY;
        me._moveY = me._curY - me._startY;
        if (me._moveY > 0) {
            me.direction = 'down';
        } else if (me._moveY < 0) {
            me.direction = 'up';
        }

        let _absMoveY = Math.abs(me._moveY);
        // 加载上方
        if (me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp) {
            e.preventDefault();
            me.$domUp = document.querySelector(`.${me.opts.domUp.domClass}`)
            // 如果加载区没有DOM
            if (!me.upInsertDOM) {
                let div = document.createElement("div");
                div.className = me.opts.domUp.domClass;
                document.body.insertBefore(div, me.$element)
                me.upInsertDOM = true;
            }
            fnTransition(document.querySelector(`.${me.opts.domUp.domClass}`), 0);
            // 下拉
            if (_absMoveY <= me.opts.distance) {
                me._offsetY = _absMoveY;
                // todo：move时会不断清空、增加dom，有可能影响性能，下同
                document.querySelector(`.${me.opts.domUp.domClass}`).innerHTML = me.opts.domUp.domRefresh;
                // 指定距离 < 下拉距离 < 指定距离*2
            } else if (_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance * 2) {
                me._offsetY = me.opts.distance + (_absMoveY - me.opts.distance) * 0.5;
                document.querySelector(`.${me.opts.domUp.domClass}`).innerHTML = me.opts.domUp.domUpdate
                // 下拉距离 > 指定距离*2
            } else {
                me._offsetY = me.opts.distance + me.opts.distance * 0.5 + (_absMoveY - me.opts.distance * 2) * 0.2;
            }
            document.querySelector(`.${me.opts.domUp.domClass}`).style.cssText = `height:${me._offsetY}`
        }
    }

    // touchend
    function fnTouchend(me) {
        let _absMoveY = Math.abs(me._moveY);
        if (me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp) {
            fnTransition(me.$domUp, 300);
            if (_absMoveY > me.opts.distance) {
                me.$domUp.style.cssText = `height:${me.$domUp.childNodes.clientHeight}`;
                // me.$domUp.css({ 'height': me.$domUp.children().height() });
                me.$domUp.innerHTML = me.opts.domUp.domLoad;
                me.loading = true;
                me.opts.loadUpFn(me);
            } else {
                me.$domUp.style.cssText = `height:0`
                me.$domUp.addEventListener('webkitTransitionEnd mozTransitionEnd transitionend', function (e) {
                    // me.$domUp.css({ 'height': '0' }).on('webkitTransitionEnd mozTransitionEnd transitionend', function () {
                    me.upInsertDOM = false;
                    // e.remove();
                    for (let i = e.childNodes.length - 1; i >= 0; i--) {
                        e.removeChild(childs[i]);
                    }
                });
            }
            me._moveY = 0;
        }
    }
    // css过渡
    function fnTransition(dom, num) {
        setCss(dom, {
            '-webkit-transition': 'all ' + num + 'ms',
            'transition': 'all ' + num + 'ms'
        })
    }
    function setCss(obj, css) {
        for (let attr in css) {
            obj.style[attr] = css[attr];
        }
    }
}