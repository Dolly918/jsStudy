/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-25 15:18:12
 * html2pdf模块
 * @param {object=} parameter 参数配置
 * @param {string} parameter.targetEleId: 目标元素id--要保存为pdf的区域
 * @param {string} parameter.fileName 要保存的pdf文件名字
*/
import { html2canvas } from './html2canvas';
import { jspdf } from './jspdf';
import { isIE8 } from './isIE8';
export let html2pdf = (parameter)=> {
  let tipMsg = '您的浏览器不支持此功能，请选择xls格式下载或者更换浏览器再次尝试！';
  const promise = new Promise((resolve,reject)=>{
    isIE8((isIE8)=>{
      if(isIE8 === 0){
        // 非ie8
        let targetEleId = document.getElementById(parameter.targetEleId);
        if(targetEleId){
          targetEleId.style.backgroundColor = "#fff";
          let fileName = parameter.fileName || new Date().getTime();
          html2canvas(targetEleId)
          .then((canvas)=>{
            exportEchartsToPDF(canvas,fileName);
          });
        }else{
          reject(new Error(`找不到参数:${parameter.targetEleId}，请检查参数是否为对象格式，或检查传入的parameter.targetEleId参数是否为字符串格式，或检查页面中是否有这个id`));
        }
      }else{
        alert(tipMsg)
      }
    });
  });
  return promise;
}
function exportEchartsToPDF(canvas,fileName){
  // 得到canvas 的宽高
  var contentWidth = canvas.width;
  var contentHeight = canvas.height;
  //如上：一页pdf显示html页面生成的canvas高度;
  // a4纸的尺寸[595.28,841.89]
  //未生成pdf的html页面高度
  var pageHeight = contentWidth / 592.28 * 841.89;
  //pdf页面偏移
  var skewHeight = contentHeight;
  var position = 30;//顶部偏移位置
  //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  var imgWidth = 595.28;
  var imgHeight = 592.28/contentWidth * contentHeight;

  var pageData = canvas.toDataURL('image/jpeg', 1.0);//1.0?

  var pdf = new jspdf('', 'pt', 'a4');
  //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
  //当内容未超过pdf一页显示的范围，无需分页
  if (skewHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight );
  } else {
      while(skewHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          skewHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if(skewHeight > 0) {
              pdf.addPage();
          }
      }
  }
  pdf.save(fileName + '.pdf');
}