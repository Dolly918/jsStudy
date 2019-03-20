# 滚动穿透的6中解决方案【已自测】

* [body无滚动 + 弹层无滚动[css-超出隐藏]](https://github.com/xingorg1/jsStudy/tree/master/移动端滚动穿透#body%E6%97%A0%E6%BB%9A%E5%8A%A8--%E5%BC%B9%E5%B1%82%E6%97%A0%E6%BB%9A%E5%8A%A8css-%E8%B6%85%E5%87%BA%E9%9A%90%E8%97%8F "body无滚动 + 弹层无滚动[css-超出隐藏]")

* [body无滚动 + 弹层内部滚动[css-真机有bug]](https://github.com/xingorg1/jsStudy/tree/master/移动端滚动穿透#body%E6%97%A0%E6%BB%9A%E5%8A%A8--%E5%BC%B9%E5%B1%82%E5%86%85%E9%83%A8%E6%BB%9A%E5%8A%A8css-%E7%9C%9F%E6%9C%BA%E6%9C%89bug "body无滚动 + 弹层内部滚动[css-真机有bug]")

* [body滚动 + 弹层无滚动[js-阻止弹层中touchmove的默认行为]](https://github.com/xingorg1/jsStudy/tree/master/移动端滚动穿透#body%E6%BB%9A%E5%8A%A8--%E5%BC%B9%E5%B1%82%E6%97%A0%E6%BB%9A%E5%8A%A8js-%E9%98%BB%E6%AD%A2%E5%BC%B9%E5%B1%82%E4%B8%ADtouchmove%E7%9A%84%E9%BB%98%E8%AE%A4%E8%A1%8C%E4%B8%BA "body滚动 + 弹层无滚动[js-阻止弹层中touchmove的默认行为]")

* [body滚动 + 弹层内部滚动[js-检测touchmove的target]](https://github.com/xingorg1/jsStudy/tree/master/移动端滚动穿透#body%E6%BB%9A%E5%8A%A8--%E5%BC%B9%E5%B1%82%E5%86%85%E9%83%A8%E6%BB%9A%E5%8A%A8js-%E6%A3%80%E6%B5%8Btouchmove%E7%9A%84target "body滚动 + 弹层内部滚动[js-检测touchmove的target]")

* [body滚动 + 弹层内部滚动[js-代码模拟上下滑动效果]](https://github.com/xingorg1/jsStudy/tree/master/移动端滚动穿透#body%E6%BB%9A%E5%8A%A8--%E5%BC%B9%E5%B1%82%E5%86%85%E9%83%A8%E6%BB%9A%E5%8A%A8js-%E4%BB%A3%E7%A0%81%E6%A8%A1%E6%8B%9F%E4%B8%8A%E4%B8%8B%E6%BB%91%E5%8A%A8%E6%95%88%E6%9E%9C "body滚动 + 弹层内部滚动[js-代码模拟上下滑动效果]")

* [body滚动 + 弹层内部滚动[css+js-记录滚动位置]](https://github.com/xingorg1/jsStudy/tree/master/移动端滚动穿透#body%E6%BB%9A%E5%8A%A8--%E5%BC%B9%E5%B1%82%E5%86%85%E9%83%A8%E6%BB%9A%E5%8A%A8cssjs-%E8%AE%B0%E5%BD%95%E6%BB%9A%E5%8A%A8%E4%BD%8D%E7%BD%AE "body滚动 + 弹层内部滚动[css+js-记录滚动位置]")

* 据说fastclick插件可以解决[我没使用]

相信能看到这篇文章的你，已经是遇到了这个问题。我就不gif展示问题效果了。

在移动端中，如果我们使用了一个固定定位的遮罩层，且其下方的dom结构的宽度|高度超出屏幕的宽度|高度，那么即使遮罩层弹出后铺满了整个屏幕，其下方的dom结构依然可以滚动，这就是大家所说的“滚动穿透”，而且经常是你在pc模拟器上没有问题，但是真机打开就一定会出现。这个经典八阿哥也是面试时经常会被追问的问题。

接下来我网罗了网络，整理了别人说的方案和我自己的方案，一共实现了六种方法，并经过了自己手机自测。各方法操作难易不同，分别针对弹层和body是否超出一屏可滚动等不同情况。看官可以对症下药。

## body无滚动 + 弹层无滚动[css-超出隐藏]

## body无滚动 + 弹层内部滚动[css-真机有bug]

## body滚动 + 弹层无滚动[js-阻止弹层中touchmove的默认行为]

## body滚动 + 弹层内部滚动[js-检测touchmove的target]

## body滚动 + 弹层内部滚动[js-代码模拟上下滑动效果]

## body滚动 + 弹层内部滚动[css+js-记录滚动位置]
