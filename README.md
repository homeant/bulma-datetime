# bulma-datetime

[![npm](https://img.shields.io/npm/v/bulma-datetime.svg)](https://www.npmjs.com/package/bulma-datetime)
[![npm](https://img.shields.io/npm/dm/bulma-datetime.svg)](https://www.npmjs.com/package/bulma-datetime)
[![Build Status](https://travis-ci.org/Wikiki/bulma-datetime.svg?branch=master)](https://travis-ci.org/Wikiki/bulma-datetime)


## install

```shell
npm i bulma-datetime
npm i moment
```

## use 

```javascript
import Picker from 'bulma-datetime'

const el = document.querySelector("#input");
const a = new Picker(el,{
     type:"date",
     format:"YYYY-MM-DD",
     maxDate:"2022-01-01",
     minDate:"2018-01-01",
     change:function(val){
         console.log("change");
     }
 })
console.log(a.year,a.month,a.date);
```

# 配置

## type
字符串类型
1. date
2. datetime

## format
字符串类型

1. YYYY-MM-DD HH:mm:ss
2. YYYY-MM-DD

具体查阅[moment文档](http://momentjs.com/docs/#/displaying/format/?_blank)

## maxDate/minDate

可以选择的最大(小)时间

## change

当用户修改选择日期/时间点击确定后触发的事件