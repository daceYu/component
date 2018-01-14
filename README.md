# component
基于jQuery或Zepto的前端组件复用方法

###### [git@github.com](mailto:git@github.com):daceYu/component

## usage

组件说明

​	`{{变量名}}`：变量替换；

​	`{{r-for="列表变量名"}}...{{r-end}}`：列表渲染；

​	`<style>...</style>`: 影响主页面的css（可不加变量，only one）；

​	`<style private>...</style>`：不影响主页面私有css（可加变量，only one）；

​	`<script>...</script>`：组件js（只渲染一次）；

## config

参数说明

​ `options`: 调用参数

-   ` url`: 组件路径 || DOM的r-url属性
-   `value`: 变量 || DOM的r-value属性
-   `callback`: 回调

## cache

缓存说明 `$.Components`

`key`：组件标识（路径）；

`attr`：组件属性	

-   `name`: 组件名；
-   `value`: 组件标识（随机字符串）；

`content`：组件内容

-   `cssArr`：私有css数组；
-   `html`: html缓存；

`tasks`: 任务队列；

`ajaxError`: 加载错误

## example

```javascript
$('.j-renderCtn').renderComponent({
  	url: 'components/test.html',
  	value: {
    	name: "user",
      	list: [
        	{name:"zhangsan", age: 21},
          	{name:"lisi", age: 22}
      	]
  	},
  	callback: function (data) {
    	// ...
  	}
});
```

