# helloworld 技术栈： vue + vuex + vue-router + mint UI + webpack + ES6

## 尝试 framework7 过程中遇到的主要问题：

### 1、页面进行切换的时候，url 不能正常的切换子路由
### 2、异步加载的页面，切换的时候不能正常切换页面


## mint UI 按需加载：

### 1、安装插件 
```
npm install babel-plugin-component -D
```

### 2、在 babel.config.js 里配置如下：
```
plugins:[
    [
      "component", 
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ],
]
```

## rem 布局 （实际用了更为复杂的代码）
```
// 根据当前屏幕的宽度和设计稿宽度的比例，动态计算一下宽度下fontSize值应该是多少，如果fontSize值改变了，之前的rem会自动跟着放大或缩小
~function () {
    var desW = 320;
    var winW = document.documentElement.clientWidth;
    var n = winW / desW;

    document.documentElement.style.fontSize = n * 10 + 'px';
}();
```