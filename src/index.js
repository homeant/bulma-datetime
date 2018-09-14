import {extend,each} from './util';
import { createElement } from "./util/dom";
import Moment from 'moment';
import "./sass/index.sass";

Moment.locale("zh-cn");

//模板
const template = (data) => `
<div class="datepicker">
    <div class="calendar">
        <div class="calendar-nav">
            <div class="calendar-nav-prev">
                <a class="button is-small calendar-nav-prev-year"><<</a>
                <a class="button is-small calendar-nav-prev-month"><</a>
            </div>
            <div class="calendar-nav-control">
                <span class="calendar-nav-year">${data.year}</span>
                <span class="calendar-nav-month">${data.month}</span>
            </div>
            <div class="calendar-nav-next">
                <a class="button is-small calendar-nav-next-month">></a>
                <a class="button is-small calendar-nav-next-year">>></a>
            </div>
        </div>
        <div class="calendar-container">
            <div class="calendar-header">
                <div class="calendar-date">${Moment.weekdaysShort()[0]}</div>
                <div class="calendar-date">${Moment.weekdaysShort()[1]}</div>
                <div class="calendar-date">${Moment.weekdaysShort()[2]}</div>
                <div class="calendar-date">${Moment.weekdaysShort()[3]}</div>
                <div class="calendar-date">${Moment.weekdaysShort()[4]}</div>
                <div class="calendar-date">${Moment.weekdaysShort()[5]}</div>
                <div class="calendar-date">${Moment.weekdaysShort()[6]}</div>
            </div>
            <div class="calendar-body">
                
            </div>
        </div>
        <div class="calendar-confirm">
            <a class="button is-small calendar-btn-clear">清空</a>
            <a class="button is-small calendar-btn-confirm">确定</a>
        </div>
    </div>
</div>
`


//默认配置
const DEFAULT_CONFIG = {
    renderInline: false, //在行内渲染
    format: Moment.localeData().longDateFormat('L'),//格式化
    type: "date",//控件类型
    vaulue:null,//控件的值
    min:'1900-1-1',//最大时间
    max:'2099-12-31',//最小时间
    trigger:"focus",//呼出事件
    lang:"cn",//语言
    change: null,//改变事件
}

const isBrowser = typeof window === 'object'
//数字前置补零
const digit = (num, length, end)=>{
    var str = '';
    num = String(num);
    length = length || 2;
    for (var i = num.length; i < length; i++) {
        str += '0';
    }
    return num < Math.pow(10, length) ? str + (num | 0) : num;
}

const isInput = (el) => /input|textarea/.test(el.tagName.toLocaleLowerCase());

let uid = 0;

//构造方法
function DatetimePicker(selector,config){
    const self = this;
    self.config = {};
    extend(self.config,DEFAULT_CONFIG,config);
    self.element = typeof selector === "string" ? document.querySelector(selector) : selector;
    self.init();
}


DatetimePicker.prototype = {
    get minDate(){
        return this._minDate;
    },
    set minDate(val){
        this._minDate = val ? Moment(val,this.config.format) : null;
    },
    get maxDate(){
        return this._maxDate;
    },
    set maxDate(val){
        this._maxDate = val ? Moment(val,this.config.format) : null;
    },
    init(){
        const self = this;
        //存储数据
        Object.defineProperty(self, '$data', {
            get:function(){
                return this._date || Moment();
            },
            set:function(val){
                if(Moment(val,this.config.format).isValid()){
                    this._date = Moment(val,this.config.format);
                }
            }
        });
        ++uid;
        Object.defineProperty(self,"uid",{
            value:uid,
            enumerable:true,
            writable:false
        })
        self.elemId = `datepicker_${self.uid}`;
        //年
        Object.defineProperty(self,"year",{
            get:function () {
                return this.$data.year();
            },
            enumerable: true,
            configurable: true
        })
        //月
        Object.defineProperty(self,"month",{
            get:function () {
                return this.$data.month();
            },
            enumerable: true,
            configurable: true
        })
        //日
        Object.defineProperty(self,"date",{
            get:function () {
                return this.$data.date();
            },
            enumerable: true,
            configurable: true
        })
        //时
        Object.defineProperty(self,"hour",{
            get:function () {
                return this.$data.hour();
            },
            enumerable: true,
            configurable: true
        })
        //分
        Object.defineProperty(self,"minute",{
            get:function () {
                return this.$data.minute();
            },
            enumerable: true,
            configurable: true
        })
        //秒
        Object.defineProperty(self,"second",{
            get:function () {
                return this.$data.second();
            },
            enumerable: true,
            configurable: true
        })
        const initDate = () => {
            if(self.element.value){
                if (self.config.type === 'date') {
                    self.$data = Moment(self.element.value, 'YYYY-MM-DD');
                }else if(self.config.type === 'datetime'){
                    self.$data = Moment(self.element.value, 'YYYY-MM-DD HH:mm:ss');
                } else {
                    self.$data = Moment(self.element.value);
                }
            }else{
                self.$data = Moment();
            }
            this.minDate = this.config.minDate ? Moment(this.config.minDate) : null;
            this.maxDate = this.config.maxDate ? Moment(this.config.maxDate) : null;
        }
        if(isInput(self.element)){
            self.trigger = "focus";
        }else{
            self.trigger = "click";
        }
        self.element.addEventListener(self.trigger,(e)=>{
            initDate();
        self.render()
        self.show();
        self._adjustPosition();
    },false);
        if(isInput(self.element)){
            self.element.addEventListener("keyup",(e)=> {
                Moment(e.target.value,self.config.format).isValid() && initDate();
            self._refreshCalendar();
            self.config.type === "datetime" && self.timeScroll();
        },false);
            self.element.addEventListener("change",(e)=> {
                Moment(e.target.value,self.config.format).isValid() && initDate();
            self._refreshCalendar();
            self.config.type === "datetime" && self.timeScroll();
        },false);
        }
        //点击面板其他地方销毁组件
        document.addEventListener("click",(e)=>{
            if(e.target === self.element){
            return;
        }
        self.destroy();
    },false);
    },
    render() {
        if (!isBrowser) {
            return;
        }
        const self = this
        if(document.getElementById(self.elemId)){
            return;
        }
        const config = self.config
        const templateStr = template({
            //date: self.$date,
            month: Moment.monthsShort()[self.month],
            year: self.$data.localeData().relativeTime(self.year, null, 'yy', null).replace(" ", "")
        })
        const container = self.container = createElement(templateStr)
        container.setAttribute("id",self.elemId);
        //删除前一个
        document.getElementById(self.elemId) && document.getElementById(self.elemId).remove();
        if (config.renderInline) {
            document.querySelector(self.config.trigger).appendChild(container)
        } else {
            document.body.appendChild(container)
        }
        if(config.type === "datetime"){
            const chooseEl = [createElement(`<span class="calendar-btn-time">选择时间</span>`),createElement(`<span class="calendar-btn-date">返回日期</span>`)];
            const congirmEl = container.querySelector(".calendar-confirm");
            congirmEl.insertBefore(chooseEl[0],congirmEl.firstChild);
            congirmEl.insertBefore(chooseEl[1],congirmEl.firstChild);
            self._initCalendarTime();
        }
        self._refreshCalendar();
        self.events();
    },
    show() {
        this.container.style.display = 'block'
    },
    hide(e) {
        if (e) {
            e.preventDefault();
        }
        this.container.style.display = "none";
    },
    _adjustPosition() {
        let left, top, clientRect;
        let el = this.element;
        if (typeof el.getBoundingClientRect === 'function') {
            clientRect = el.getBoundingClientRect();
            left = clientRect.left + window.pageXOffset;
            top = clientRect.bottom + window.pageYOffset;
        } else {
            left = el.offsetLeft;
            top = el.offsetTop + el.offsetHeight;
            while ((el = el.offsetParent)) {
                left += el.offsetLeft;
                top += el.offsetTop;
            }
        }
        this.container.style.position = 'absolute';
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    },
    _refreshCalendar() {
        this.container.querySelector(".calendar-nav-year").innerHTML = this.$data.localeData().relativeTime(this.year, null, 'yy', null).replace(" ", "");
        this.container.querySelector(".calendar-nav-month").innerHTML = Moment.monthsShort()[this.month];
        this.container.querySelector('.calendar-body').innerHTML = '';
        this._renderDays();

    },
    _renderDays() {
        const now = Moment().hours(0).minutes(0).seconds(0).milliseconds(0);
        let days = '';
        //月天数
        let numberOfDays = this.$data.daysInMonth(),
            //星期几
            before = Moment().year(this.year).month(this.month).date(1).day();
        const startDay = Moment().startOf('week').day();
        if (startDay > 0) {
            before -= startDay;
            if (before < 0) {
                before += 7;
            }
        }
        let cells = numberOfDays + before,
            after = cells;
        while (after > 7) {
            after -= 7;
        }
        cells += 7 - after;
        for (let i = 0; i < cells; i++){
            let day = Moment().year(this.year).month(this.month).date(i - before).hours(0).minutes(0).seconds(0).milliseconds(0),
                date = Moment().year(this.year).month(this.month).date(this.date).hours(0).minutes(0).seconds(0).milliseconds(0),
                isBetween = false,
                isSelected = day.diff(date) == 0,
                isSelectedIn = false,
                isSelectedOut = false,
                isToday = day.diff(now) == 0,
                isEmpty = i < before || i >= (numberOfDays + before),
                isDisabled = false;
            //当前月 不等于 实际月
            if (day.month() !== this.month || (this.minDate && day.unix() < this.minDate.unix()) || (this.maxDate && day.unix() > this.maxDate.unix())) {
                isDisabled = true;
            }
            if(isDisabled){
                isSelected = false;
            }
            days += this._renderDay(day.date(), day.month(), day.year(), isSelected, isToday, isDisabled, isEmpty, isBetween, isSelectedIn, isSelectedOut);
        }
        this.container.querySelector('.calendar-body').insertAdjacentHTML('beforeend', days);
        this._bindDaysEvents();

    },
    _renderDay(day, month, year, isSelected, isToday, isDisabled, isEmpty, isBetween, isSelectedIn, isSelectedOut) {
        const date = Moment({
            year: year,
            month: month,
            day: day
        }).format("YYYY-MM-DD").toString();
        return `
        <div data-date="${`${date}`}" class="calendar-date${isDisabled ? ' is-disabled' : ''}${isBetween ? ' calendar-range' : ''}${isSelectedIn ? ' calendar-range-start' : ''}${isSelectedOut ? ' calendar-range-end' : ''}">
            <button class="date-item${isToday ? ' is-today' : ''}${isSelected ? ' is-active' : ''}">${day}</button>
        </div>
        `;
    },
    events() {
        const self = this;
        this.container.querySelector(".calendar-nav-prev-month").addEventListener("click", (e) => self.prevMonth(e), false);
        this.container.querySelector(".calendar-nav-next-month").addEventListener("click", (e) => self.nextMonth(e), false);
        this.container.querySelector(".calendar-nav-prev-year").addEventListener("click", (e) => self.prevYear(e), false);
        this.container.querySelector(".calendar-nav-next-year").addEventListener("click", (e) => self.nextYear(e), false);

        //确定按钮
        this.container.querySelector(".calendar-btn-confirm").addEventListener("click", (e) =>{
            if(isInput(self.element)){
            self.element.value = self.format();
            typeof self.config.change === "function" && self.config.change.call(self,self.format());
        }
        self.destroy();
    }, false);
        //清空
        this.container.querySelector(".calendar-btn-clear").addEventListener("click", (e) =>{
            if(self.element.value){
            self.element.value = "";
        }
    }, false);
        if(self.config.type=="datetime"){
            //选择时间
            this.container.querySelector(".calendar-btn-time").addEventListener("click",e=>{
                self.container.querySelector(".calendar").classList.add("calendar-time");
            self.timeScroll();
        },false);
            //返回日期
            this.container.querySelector(".calendar-btn-date").addEventListener("click",e=>{
                self.container.querySelector(".calendar") && self.container.querySelector(".calendar").classList.remove("calendar-time");
        },false);
            //时钟选择
            this.container.querySelector(".calendar-time-body").querySelectorAll("ol").forEach(ol=>{
                ol.querySelectorAll("li").forEach( li =>{
                li.addEventListener("click",ev=>{
                const el = ev.currentTarget;
            const data = el.dataset;
            if(data.hour){
                self.$data.hours(Number.parseInt(data.hour));
            }else if(data.minute){
                self.$data.minutes(Number.parseInt(data.minute));
            }else if(data.second){
                self.$data.seconds(Number.parseInt(data.second));
            }
            ol.querySelector(".is-active") && ol.querySelector(".is-active").classList.remove("is-active");
            el.classList.add("is-active");
            self.timeScroll();
        })
        })
        })
        }
        //阻止事件
        this.container.addEventListener("click",(e=window.event)=>{
            e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
    },false)
    },
    _initCalendarTime(){
        const self = this;
        const timeNav =  `<span class="calendar-time-text">选择时间</span>`;
        const timeEl = createElement(timeNav);
        this.container.querySelector(".calendar-nav-control").appendChild(timeEl);
        const timeBody =
            `<ul class="calendar-time-body"></ul>`
        const timeBodyEl = createElement(timeBody);
        this.container.querySelector(".calendar-container").appendChild(timeBodyEl);
        const lang = ["时","分","秒"];
        const DATA = ["hour","minute","second"]
        const date = [self.hour,self.minute,self.second];
        each([24,60,60],(i,o)=>{
            let li = createElement("<li></li>"),child  = [`<p>${lang[i]}</p><ol>`];
        each(new Array(o),(j,e)=>{
            child.push(`<li data-${DATA[i]}="${j}" class="${ j == date[i] ? 'is-active':''}">${digit(j)}</li>`)
    })
        li.innerHTML = child.join(``)+`</ol>`;
        timeBodyEl.appendChild(li);
    });
    },
    _bindDaysEvents() {
        const self = this;
        const el = this.container.querySelector(".calendar-body").querySelectorAll(".calendar-date");
        const config = self.config;
        el.forEach((calendarDay) => {
            calendarDay.addEventListener("click", e => {
            e.preventDefault();
        if (!e.currentTarget.classList.contains('is-disabled')) {
            const date = Moment(e.currentTarget.dataset.date, config.format);
            self.$data.date(date.date());
            el.forEach(el=>{
                el.querySelectorAll(".date-item").forEach(e=>e.classList.remove("is-active"));
        })
            e.currentTarget.querySelector(".date-item").classList.add("is-active");
            // if(isInput(self.element)){
            //     self.element.value = self.format();
            // }
        }
    }, false);
    });
    },
    /**
     * 时间滚动
     */
    timeScroll(){
        var self = this;
        const hour = self.hour,
            minute = self.minute,
            second = self.second;
        const height = self.container.querySelector(".calendar-time-body").querySelectorAll("ol")[0].firstChild.clientHeight;
        self.container.querySelector(".calendar-time-body").querySelectorAll("ol")[0].scrollTop = height * (hour - 2);
        self.container.querySelector(".calendar-time-body").querySelectorAll("ol")[1].scrollTop = height * (minute - 2);
        self.container.querySelector(".calendar-time-body").querySelectorAll("ol")[2].scrollTop = height * (second - 2);
    },
    format(val = this.config.format){
        return this.$data.format(val)
    },
    /**
     * 上个月
     */
    prevMonth(e) {
        e.preventDefault();
        this.$data.subtract(1, 'months');
        this._refreshCalendar();
    },
    /**
     * 下一月
     */
    nextMonth(e) {
        e.preventDefault();
        this.$data.add(1, 'months');
        this._refreshCalendar();
    },
    /**
     * 上一年
     */
    prevYear(e) {
        e.preventDefault();
        this.$data.subtract(1, 'y');
        this._refreshCalendar();
    },
    /**
     * 下一年
     */
    nextYear(e) {
        e.preventDefault();
        this.$data.add(1, 'y');
        this._refreshCalendar();
    },
    destroy() {
        const self = this;
        self.container && self.container.remove();

    }
}



export default DatetimePicker