/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-22 17:09:36
 * 左侧二级导航
 * @param {object=} parameter 参数配置
 * @param {number} parameter.xx: xx
*/
export let subNav = (parameter) => {
		/*
		 * @Author: matianye@ 
		 * @Date: 2017-12-05 11:48:20 
		 * @Last Modified by: matianye@
		 * @Last Modified time: 2017-12-11 10:11:52
	  */
		let $navLink = $('.nav-item-link'); // 一级菜单
		let $navSubLink = $('.submenu-item-link'); // 二级菜单
		let $navList = $('.nav-item-submenu'); // 二级菜单包裹
		$navLink.on('click', function (event) {
			$navLink.removeClass('active');
			$navList.slideUp(300);
			$(this).addClass('active');
			let $this = $(this).next('.nav-item-submenu');
			if ($this.css('display') === 'none') {
				$this.slideDown(300);
			} else {
				$this.slideUp(300);
			}
		});
		$navSubLink.on('click', function () {
			$navSubLink.removeClass('active');
			$(this).addClass('active');
		});
}
