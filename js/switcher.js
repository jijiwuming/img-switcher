var $ = document.querySelectorAll;
//浏览器前缀
var transition="transition";
var body=document.body || document.documentElement, style=body.style;
var vendorPrefix=(function(){
    var i=0, vendor=["Moz", "Webkit", "Khtml", "O", "ms"];
    transition=transition.charAt(0).toUpperCase() + transition.substr(1);
    while (i < vendor.length) {
        if (typeof style[vendor[i] + transition] === "string") {
            return vendor[i];
        }
        i++;
    }
    return false;
})();
//动画停止事件兼容
var animationEnd=(function(){
    if(vendorPrefix=="Webkit"){
        return "webkitAnimationEnd";
    }else{
        return "animationend";
    }
}());
//切换图片（左）
function changeicon() {
    var elements = document.querySelectorAll(".warpper");
    elements[0].classList.add("left-slider");
    nextstep(elements,0);
}
//递归依次执行
function nextstep(elements,i) {
    if(i<elements.length-1){
        elements[i].addEventListener(animationEnd,function(){
            elements[i+1].classList.add("left-slider");
            nextstep(elements,i+1);
        },false);
    }
}
//组件化
(function () {
    //创建单个格子
    function createCell(ele,i){
        var slice1 = document.createElement("div");
        slice1.classList.add("icon");
        slice1.classList.add("icon-a");
        slice1.classList.add("icon"+i);
        var slice2 = document.createElement("div");
        slice2.classList.add("icon");
        slice2.classList.add("icon-b");
        slice2.classList.add("icon"+i);
        var warpper = document.createElement("div");
        warpper.classList.add("warpper");
        warpper.appendChild(slice1);
        warpper.appendChild(slice2);
        var cell = document.createElement("div");
        cell.classList.add("icon");
        cell.classList.add("icon-container");
        cell.appendChild(warpper);
        ele.appendChild(cell);
    }
    //css插入
    function insertRule(sheet, selectorText, cssText, position) {
        if (sheet.insertRule) {
            sheet.insertRule(selectorText + "{" + cssText + "}", position);
        } else if (sheet.addRule) {
            sheet.addRule(selectorText, cssText, poistion);
        }
    }
    //创建滑动组件
    function createSlider(ele){
        for(var i =0;i<ele.row;i++){
            var row = document.createElement("div");
            row.classList.add("bgimg");
            for(var j =0;j<ele.col;j++){
               createCell(row,i*ele.col+j+1); 
            }
            document.querySelector(ele.id).appendChild(row);
        }
        /* 背景a */
        insertRule(document.styleSheets[0], ".icon-a", "background:transparent url("+ele.imgurl1+") no-repeat;background-size: "+ele.width+" "+ele.height+";", 0);
        /* 背景b */
        insertRule(document.styleSheets[0], ".icon-b", "background:transparent url("+ele.imgurl2+") no-repeat;background-size: "+ele.width+" "+ele.height+";", 0);
        //设置cell大小
        insertRule(document.styleSheets[0], ".icon", "width: calc("+ele.width+" / "+ele.col+"); height: calc("+ele.height+" / "+ele.row+");", 0);
        //背景图位置调节
        //insertRule(document.styleSheets[0], ".icon2", "background-position: calc((48rem / 6) * 0) calc((24rem / 3) * 1);", 0);        
        for(var i=0;i<ele.row;i++){
            for(var j=0;j<ele.col;j++){
                var temp = i*ele.col+j+1;
                insertRule(document.styleSheets[0], ".icon"+temp, "background-position: calc(("+ele.height+" / "+ele.row+") * -"+j+") calc(("+ele.width+" / "+ele.col+") * -"+i+")!important;", 0);  
            }
        }
    }
    slider = function (ele) {  
        createSlider(ele); 
    }  
})(window); 

window.onload=()=>{
    var a = new slider({
        id:".sprites",
        row:3,
        col:6,
        imgurl1:'../img/night.jpg',
        imgurl2:'../img/day.jpg',
        width:"48rem",
        height:"24rem"
    });
    changeicon();
}