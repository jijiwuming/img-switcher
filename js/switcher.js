//组件化
(function () { 
    var $ = document.querySelectorAll;
    var transition="transition";
    var body=document.body || document.documentElement, style=body.style;
    //获取浏览器前缀和添加兼容
    var vendorPrefix=(function(){
        if (!("classList" in document.documentElement)) {
            Object.defineProperty(HTMLElement.prototype, 'classList', {
                get: function() {
                    var self = this;
                    function update(fn) {
                        return function(value) {
                            var classes = self.className.split(/\s+/g),
                                index = classes.indexOf(value);
                            fn(classes, index, value);
                            self.className = classes.join(" ");
                        }
                    }
                    return {
                        add: update(function(classes, index, value) {
                            if (!~index) classes.push(value);
                        }),
                        remove: update(function(classes, index) {
                            if (~index) classes.splice(index, 1);
                        }),
                        toggle: update(function(classes, index, value) {
                            if (~index)
                                classes.splice(index, 1);
                            else
                                classes.push(value);
                        }),
                        contains: function(value) {
                            return !!~self.className.split(/\s+/g).indexOf(value);
                        },
                        item: function(i) {
                            return self.className.split(/\s+/g)[i] || null;
                        }
                    };
                }
            });
        }
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
    //css插入
    function insertRule(selectorText, cssText) {
        var sheet = document.styleSheets[document.styleSheets.length - 1];
        if (sheet.insertRule) {
            sheet.insertRule(selectorText + "{" + cssText + "}", sheet.cssRules==null?0:sheet.cssRules.length);
        } else if (sheet.addRule) {
            sheet.addRule(selectorText, cssText, -1);
        }
    }
    //动画停止事件
    var animationEnd=(function(){
        if(vendorPrefix=="Webkit"){
            return "webkitAnimationEnd";
        }else{
            return "animationend";
        }
    }());
    //递归依次执行
    function taketurn(elements,i,slider) {
        if(i<elements.length-1){
            elements[i].addEventListener(animationEnd,function(){
                elements[i+1].classList.add(slider);
                taketurn(elements,i+1,slider);
            },false);
        }
    }
    //互换图片
    function exchangeimgurl(){
        var img1=document.querySelectorAll(".img-slider-cell-a")[0];
        var img1str=getComputedStyle(img1,null).getPropertyValue("background");
        var img1url=img1str.split("url(")[1].split(")")[0];
        var img2=document.querySelectorAll(".img-slider-cell-b")[0];
        var img2str=getComputedStyle(img2,null).getPropertyValue("background");
        var img2url=img2str.split("url(")[1].split(")")[0];
        /* 背景b */
        insertRule(".img-slider-cell-b", "background:transparent url("+img1url+") no-repeat;");
        /* 背景a */
        insertRule(".img-slider-cell-a", "background:transparent url("+img2url+") no-repeat;");
    }
    //切换图片（依次左划）
    function taketurnleftslide() {
        var elements = document.querySelectorAll(".img-slider-warpper");
        elements[0].classList.add("left-slider");
        taketurn(elements,0,"left-slider");
    }
    //切换图片（依次右划）
    function taketurnrightslide() {
        exchangeimgurl();
        insertRule(".img-slider-warpper", "right: 0rem;");
        var elements = document.querySelectorAll(".img-slider-warpper");
        elements[0].classList.add("right-slider");
        taketurn(elements,0,"right-slider");
    }
    //切换图片（依次上划）
    function taketurntopslide() {
        var elements = document.querySelectorAll(".img-slider-warpper");
        elements[0].classList.add("top-slider");
        taketurn(elements,0,"top-slider");
    }
    //切换图片（依次下划）
    function taketurnbottomslide() {
        exchangeimgurl();
        insertRule(".img-slider-warpper", "width: 100%;");
        insertRule(".img-slider-warpper", "height: 200%;");
        insertRule(".img-slider-warpper", "bottom:0rem;");
        var cell=document.querySelectorAll(".img-slider-cell")[0]; 
        var cellheight=getComputedStyle(cell,null).getPropertyValue("height");
        
        var elements = document.querySelectorAll(".img-slider-warpper");
        elements[0].classList.add("bottom-slider");
        taketurn(elements,0,"bottom-slider");
    }
    //创建单个格子
    function createCell(ele,i){
        var slice1 = document.createElement("div");
        slice1.classList.add("img-slider-cell");
        slice1.classList.add("img-slider-cell-a");
        slice1.classList.add("img-slider-cell"+i);
        var slice2 = document.createElement("div");
        slice2.classList.add("img-slider-cell");
        slice2.classList.add("img-slider-cell-b");
        slice2.classList.add("img-slider-cell"+i);
        var warpper = document.createElement("div");
        warpper.classList.add("img-slider-warpper");
        warpper.appendChild(slice1);
        warpper.appendChild(slice2);
        var cell = document.createElement("div");
        cell.classList.add("img-slider-cell");
        cell.classList.add("img-slider-cell-container");
        cell.appendChild(warpper);
        ele.appendChild(cell);
    }
    //创建滑动组件
    function createSlider(ele){
        for(var i =0;i<ele.row;i++){
            var row = document.createElement("div");
            row.classList.add("img-slider-row");
            for(var j =0;j<ele.col;j++){
               createCell(row,i*ele.col+j+1); 
            }
            document.querySelector(ele.id).appendChild(row);
        }        
        /* 背景a */
        insertRule(".img-slider-cell-a", "background:transparent url("+ele.imgurl1+") no-repeat;");
        insertRule(".img-slider-cell-a", "background-size: "+ele.width+" "+ele.height+"!important;");
        /* 背景b */
        insertRule(".img-slider-cell-b", "background:transparent url("+ele.imgurl2+") no-repeat;");
        insertRule(".img-slider-cell-b", "background-size: "+ele.width+" "+ele.height+"!important;");
        //设置cell大小
        insertRule(".img-slider-cell", "width: calc("+ele.width+" / "+ele.col+"); height: calc("+ele.height+" / "+ele.row+");");
        //背景图位置调节      
        for(var i=0;i<ele.row;i++){
            for(var j=0;j<ele.col;j++){
                var temp = i*ele.col+j+1;
                insertRule(".img-slider-cell"+temp, "background-position: calc(("+ele.height+" / "+ele.row+") * -"+j+") calc(("+ele.width+" / "+ele.col+") * -"+i+")!important;");  
            }
        }
    }
    //组件创建
    slider = function (ele) {  
        createSlider(ele); 
    }
    //设置组件功能
    slider.prototype.left_take_turn_slide = function(){
        taketurnleftslide();
    }
    slider.prototype.top_take_turn_slide = function(){
        taketurntopslide();
    }
    slider.prototype.right_take_turn_slide = function(){
        taketurnrightslide();
    }
    slider.prototype.bottom_take_turn_slide = function(){
        taketurnbottomslide();
    }  
})(); 
