
// getComputedStyle测试
var myIdElement = document.getElementById("myId");
var beforeStyle = window.getComputedStyle(myIdElement, ":before");
console.log(beforeStyle); // [CSSStyleDeclaration Object]
console.log(beforeStyle.width); // 100px
console.log(beforeStyle.getPropertyValue("width")); // 100px
console.log(beforeStyle.content); // "hello world!"

var  myIdWidth = beforeStyle.getPropertyValue('background-color');
console.log(myIdWidth);


var myfloat0= window.getComputedStyle(myIdElement, ":before").float ;
var myfloat1 = window.getComputedStyle(myIdElement, ":before").styleFloat;
var myfloat2 = window.getComputedStyle(myIdElement, ":before").cssFloat;
var myfloat3 = beforeStyle.getPropertyValue('float');

console.log(myfloat0);console.log(myfloat1);console.log(myfloat2);console.log(myfloat3);


//使用CSSStyleSheet的insertRule来为伪元素修改样式：
console.log(document.styleSheets);
document.styleSheets[0].addRule('.red::before','color: green');

// 支持IE document.styleSheets[0].insertRule('.red::before { color: green }', 0); 
// 支持非IE的现代浏览器

//方法3. 在 <head> 标签中插入 <style> 的内部样式：
var style = document.createElement("style"); 
document.head.appendChild(style); 
sheet = style.sheet; 
sheet.addRule('.red::before','color: blue'); // 兼容IE浏览器
sheet.insertRule('.red::before { color: blue }', 0); // 支持非IE的现代浏览器 支持ie9


 //使用CSSStyleSheet的insertRule来为伪元素修改样式：
var latestContent = "修改过的内容";
var formerContent = window.getComputedStyle(document.getElementById("myId"), '::before').getPropertyValue('content');
console.log();


//document.styleSheets[0] 指页面中第一个style样式文件
document.styleSheets[0].addRule('#myId::before','content: "' + latestContent + '"'); // 兼容IE浏览器
document.styleSheets[0].insertRule('#myId::before{ content:' + latestContent + '}',0);// 支持非IE的现代浏览器 支持ie9


document.styleSheets[1].addRule('#myId::before','content: "' + latestContent + '"'); // 兼容IE浏览器
document.styleSheets[1].insertRule('#myId::before{ content:' + latestContent + '}',0);// 支持非IE的现代浏览器 支持ie9


//改变data-属性值，进而改变伪元素content

var dataConten = document.getElementById('myattr').getAttribute('data-content');//Internet Explorer 8 及更早 IE 版本不支持该方法。
console.log(dataConten);
document.getElementById('myattr').setAttribute('data-content','我改变了属性内容，伪元素内容也改变了');//Internet Explorer 8 及更早 IE 版本不支持该方法。


//改变伪元素的背景图片链接
var picEle = document.querySelector('.contenturl');
var newpicurl = 'https://img.alicdn.com/tfs/TB1zuD6QFXXXXXkaXXXXXXXXXXX-78-76.png';
var newpicurl1 = 'https://img.alicdn.com/tfs/TB1OKIEQFXXXXc4XXXXXXXXXXXX-84-72.png';
console.log(picEle);
// document.styleSheets[2].insertRule('.contenturl::before{ background:url(' + newpicurl+ ') center center no-repeat}',0);// 支持非IE的现代浏览器 支持ie9
// document.styleSheets[3].insertRule('.contenturl::before{ background:url(' + newpicurl1+ ') center center no-repeat}',0);// 支持非IE的现代浏览器 支持ie9
// 
var style1=document.createElement('style');

document.head.appendChild(style1);
var sheet1 = style1.sheet; 
sheet1.insertRule('.contenturl::before { background:url(' + newpicurl+ ') center center no-repeat}',0);// 支持非IE的现代浏览器 支持ie9

var sheetCssRuleLength = sheet1.cssRules.length;
console.log(sheet1.cssRules.length)

//在最后一个style标签的最后位置添加样式，第二个参数是数字，代表插入样式在所有样式规则列表中的序号
sheet1.insertRule('.contenturl::before { background:url(' + newpicurl1+ ') center center no-repeat}',sheet1.cssRules.length);// 支持非IE的现代浏览器 支持ie9

sheet1.insertRule('.contenturl::before { background:url(' + newpicurl+ ') center center no-repeat}',sheet1.cssRules.length);// 支持非IE的现代浏览器 支持ie9
console.log(sheet1.cssRules);


/*移动鼠标改变伪元素文字大小*/
console.log(window.location.href);
var btnFontSize=document.querySelector('input');
var btnColor=document.querySelector('.change-color');
var currentPseudo=document.querySelector('.test');
var stylesheets=document.styleSheets;
var sheet;
if(stylesheets){
    sheet=stylesheets[stylesheets.length-1];
  // console.log(sheet);
  // console.log('sheet.cssRulesLength='+sheet.cssRules.length);
}else{
    var style=document.createElement('style');
    document.head.appendChild(style);
}
btnColor.addEventListener('click',function(){
  //粗略实现的改变颜色，未做切换。
  currentPseudo.classList.add('test-red');
});
var currentFontSize=window.getComputedStyle(currentPseudo,'::before').getPropertyValue('font-size');//获取当前伪元素字体大小。
var cssRulesLength=(sheet.cssRules.length);//不‘-1’是因为这样才是在最后一位，否则加入的样式会变成倒数第二
console.log('cssrule='+cssRulesLength+'currentFont='+currentFontSize);
sheet.insertRule('.test::before{font-size:'+currentFontSize+'}',cssRulesLength);//在最后一个style标签的最后位置添加当前字体大小样式。这么做是为了后面删除添加上去的cssRule，否则最后css表会变得巨大无比
btnFontSize.addEventListener('input',function(){
//拖动滑块改变文字大小
  var changeFontSize=btnFontSize.value;
  currentPseudo.setAttribute('data-font',changeFontSize);
  var index=sheet.cssRules.length-1;
  console.log('index='+index);
 sheet.deleteRule(index);//删除最后一行样式（这里是前面添加的字体大小样式，不直接删除是为了防止误删除影响其他属性
  sheet.insertRule('.test::before{font-size:'+changeFontSize+'px}',index);
  // sheet.insertRule('.test::before{font-size:16px}',index);
});


//伪元素计时器



