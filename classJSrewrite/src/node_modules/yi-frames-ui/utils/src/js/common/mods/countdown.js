/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-20 15:07:06
 * 倒计时
 * @param {number} totalTime: 秒数，定义从哪个数开始倒计时。
 * @param {function} timeCallback(totalTime): 回调函数，接受当前倒计时的值
 * @param 默认参数配置
 * @param {number} interval: 间隔数，定义每隔多久触发一次倒计时；默认值为1000
*/
export let countdown = (totalTime,timeCallback,interval = 1000)=> {
	let timer;
	/*clearInterval(timer);
		timer = setInterval( ()=> {
			if(typeof totalTime !== 'number'){
				console.error('参数 totalTime is not a Number');
			}
			if(typeof interval !== 'number'){
				console.error('参数 interval is not a Number');
			}
			timeCallback(totalTime);
			totalTime--;
			if(totalTime < 0){
				clearInterval(timer);
				return false;
			}
		},interval);
	*/
	if(typeof totalTime !== 'number'){
		console.error(`参数 ${totalTime} 需要是数字类型`);
	}else if(typeof interval !== 'number'){
		console.error(`参数 ${interval} 需要是数字类型`);
	}else{
		countFun();
	}
	function countFun(){
		totalTime--;
		timeCallback(totalTime);
		if(totalTime < 0){
			clearTimeout(timer);
			return false;
		}else{
			timer = setTimeout(countFun,interval);
		}
	}
}