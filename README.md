# 背景图片切换插件
## 基于原生JS和CSS3动画
## 注意
* 使用chrome开发，可能对其他浏览器兼容不足
* 使用时务必注意避免使用以下css类名
```css
.img-slider-row
.img-slider-cell-container
.img-slider-cell
.img-slider-warpper
.img-slider-row
.img-slider-cell-a
.img-slider-cell-b
.img-slider-cell[1-n] (n = col * row)
.left-slider
.top-slider
.right-slider
.bottom-slider
```
* 在使用时请注意图片的文件路径是以加载的最后一个css文件所在文件夹为当前文件夹的，务必注意相对路径是否有误。
* 开发本意是插件化为自己服务，所以可能回复问题较慢，希望大家谅解