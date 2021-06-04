#### js将指定dom节点生成图片

不失真，截取完整

```html
<img :src="qrimg" class="poster-img" />
```

```javascript
html2canvas(document.querySelector('#dom_box'), {
  // foreignObjectRendering: true, // 是否在浏览器支持的情况下使用ForeignObject渲染
  useCORS: true, // 是否尝试使用CORS从服务器加载图像
  async: false, // 是否异步解析和呈现元素
  // 以下字段必填
  width: document.querySelector('#dom_box').offsetWidth, //dom 原始宽度
  height: document.querySelector('#dom_box').offsetHeight,
  // background: '#3296FA', // 一定要添加背景颜色，否则出来的图片，背景全部都是透明的
  dpi: 300, // 处理模糊问题
}).then((canvas) => {
  var imgUrl = canvas.toDataURL('image/png', 1) // 此方法可以设置截图质量（0-1）
  this.qrimg = imgUrl
})
```
[参考​]: https://www.hangge.com/blog/cache/detail_2211.html#
[​]: https://blog.csdn.net/mrhaoxiaojun/article/details/103878651
[浅析js实现网页截图的两种方式​]: https://www.zhangshengrong.com/p/rG1V5x8VX3/

