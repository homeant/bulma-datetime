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
import moment from "moment";
import Picker from 'bulma-datetime'

const el = document.querySelector("#input");
const a = new Picker(el,{
     type:date,
     format:"YYYY-MM-DD",
     maxDate:"2022-01-01",
     minDate:"2018-01-01",
     change:function(val){
         console.log("change");
     }
 })
console.log(a.year,a.month,a.date);
```