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
    elements[0].classList.add("right-slider");
    nextstep(elements,0);
}
//递归依次执行
function nextstep(elements,i) {
    if(i<elements.length-1){
        elements[i].addEventListener(animationEnd,function(){
            elements[i+1].classList.add("right-slider");
            nextstep(elements,i+1);
        },false);
    }
}

window.onload=()=>{
    changeicon();
}