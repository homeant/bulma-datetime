!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("moment")) : "function" == typeof define && define.amd ? define("bulmaDatetime", ["moment"], t) : "object" == typeof exports ? exports.bulmaDatetime = t(require("moment")) : e.bulmaDatetime = t(e.moment)
}(window, function (e) {
    return function (e) {
        var t = {};

        function n(a) {
            if (t[a]) return t[a].exports;
            var r = t[a] = {i: a, l: !1, exports: {}};
            return e[a].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, a) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: a})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var a = Object.create(null);
            if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var r in e) n.d(a, r, function (t) {
                return e[t]
            }.bind(null, r));
            return a
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 1)
    }([function (t, n) {
        t.exports = e
    }, function (e, t, n) {
        e.exports = n(4)
    }, function (e, t, n) {
    }, , function (e, t, n) {
        "use strict";
        n.r(t);
        const a = Object.getPrototypeOf, r = {}, i = r.toString, o = r.hasOwnProperty, l = o.toString,
            c = l.call(Object);

        function s(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        }

        function d(e) {
            let t, n;
            return !(!e || "[object Object]" !== i.call(e)) && (!(t = a(e)) || "function" == typeof(n = o.call(t, "constructor") && t.constructor) && l.call(n) === c)
        }

        function u(e, t) {
            let n, a = 0;
            if (function (e) {
                const t = !!e && "length" in e && e.length, n = function (e) {
                    if (null == e) return e + "";
                    return "object" == typeof e || "function" == typeof e ? r[i.call(e)] || "object" : typeof e
                }(e);
                if (s(e) || function (e) {
                    return null != e && e === e.window
                }(e)) return !1;
                return "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
            }(e)) for (n = e.length; a < n && !1 !== t.call(e[a], a, e[a]); a++) ; else for (a in e) if (!1 === t.call(e[a], a, e[a])) break;
            return e
        }

        u("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
            r["[object " + t + "]"] = t.toLowerCase()
        });
        const f = e => {
            const t = document.createElement("div");
            return t.innerHTML = e, t.firstElementChild
        };
        var m = n(0), h = n.n(m);
        n(2);
        h.a.locale("zh-cn");
        const y = {
            renderInline: !1,
            format: h.a.localeData().longDateFormat("L"),
            type: "date",
            vaulue: null,
            min: "1900-1-1",
            max: "2099-12-31",
            trigger: "focus",
            lang: "cn",
            change: null
        }, v = "object" == typeof window, p = e => /input|textarea/.test(e.tagName.toLocaleLowerCase());
        let b = 0;

        function g(e, t) {
            this.config = {}, function e() {
                let t, n, a, r, i, o, l = arguments[0] || {}, c = 1, u = arguments.length, f = !1;
                for ("boolean" == typeof l && (f = l, l = arguments[c] || {}, c++), "object" == typeof l || s(l) || (l = {}), c === u && (l = this, c--); c < u; c++) if (null != (t = arguments[c])) for (n in t) a = l[n], l !== (r = t[n]) && (f && r && (d(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = a && Array.isArray(a) ? a : []) : o = a && d(a) ? a : {}, l[n] = e(f, o, r)) : void 0 !== r && (l[n] = r));
                return l
            }(this.config, y, t), this.element = "string" == typeof e ? document.querySelector(e) : e, this.init()
        }

        g.prototype = {
            get minDate() {
                return this._minDate
            },
            set minDate(e) {
                this._minDate = e ? h()(e, this.config.format) : null
            },
            get maxDate() {
                return this._maxDate
            },
            set maxDate(e) {
                this._maxDate = e ? h()(e, this.config.format) : null
            },
            init() {
                const e = this;
                Object.defineProperty(e, "$data", {
                    get: function () {
                        return this._date || h()()
                    }, set: function (e) {
                        h()(e, this.config.format).isValid() && (this._date = h()(e, this.config.format))
                    }
                }), ++b, Object.defineProperty(e, "uid", {
                    value: b,
                    enumerable: !0,
                    writable: !1
                }), e.elemId = `datepicker_${e.uid}`, Object.defineProperty(e, "year", {
                    get: function () {
                        return this.$data.year()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(e, "month", {
                    get: function () {
                        return this.$data.month()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(e, "date", {
                    get: function () {
                        return this.$data.date()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(e, "hour", {
                    get: function () {
                        return this.$data.hour()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(e, "minute", {
                    get: function () {
                        return this.$data.minute()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(e, "second", {
                    get: function () {
                        return this.$data.second()
                    }, enumerable: !0, configurable: !0
                });
                const t = () => {
                    e.element.value ? "date" === e.config.type ? e.$data = h()(e.element.value, "YYYY-MM-DD") : "datetime" === e.config.type ? e.$data = h()(e.element.value, "YYYY-MM-DD HH:mm:ss") : e.$data = h()(e.element.value) : e.$data = h()(), this.minDate = this.config.minDate ? h()(this.config.minDate) : null, this.maxDate = this.config.maxDate ? h()(this.config.maxDate) : null
                };
                p(e.element) ? e.trigger = "focus" : e.trigger = "click", e.element.addEventListener(e.trigger, n => {
                    t(), e.render(), e.show(), e._adjustPosition()
                }, !1), p(e.element) && (e.element.addEventListener("keyup", n => {
                    h()(n.target.value, e.config.format).isValid() && t(), e._refreshCalendar(), "datetime" === e.config.type && e.timeScroll()
                }, !1), e.element.addEventListener("change", n => {
                    h()(n.target.value, e.config.format).isValid() && t(), e._refreshCalendar(), "datetime" === e.config.type && e.timeScroll()
                }, !1)), document.addEventListener("click", t => {
                    t.target !== e.element && e.destroy()
                }, !1)
            },
            render() {
                if (!v) return;
                const e = this;
                if (document.getElementById(e.elemId)) return;
                const t = e.config,
                    n = (e => `\n<div class="datepicker">\n    <div class="calendar">\n        <div class="calendar-nav">\n            <div class="calendar-nav-prev">\n                <a class="button is-small calendar-nav-prev-year"><<</a>\n                <a class="button is-small calendar-nav-prev-month"><</a>\n            </div>\n            <div class="calendar-nav-control">\n                <span class="calendar-nav-year">${e.year}</span>\n                <span class="calendar-nav-month">${e.month}</span>\n            </div>\n            <div class="calendar-nav-next">\n                <a class="button is-small calendar-nav-next-month">></a>\n                <a class="button is-small calendar-nav-next-year">>></a>\n            </div>\n        </div>\n        <div class="calendar-container">\n            <div class="calendar-header">\n                <div class="calendar-date">${h.a.weekdaysShort()[0]}</div>\n                <div class="calendar-date">${h.a.weekdaysShort()[1]}</div>\n                <div class="calendar-date">${h.a.weekdaysShort()[2]}</div>\n                <div class="calendar-date">${h.a.weekdaysShort()[3]}</div>\n                <div class="calendar-date">${h.a.weekdaysShort()[4]}</div>\n                <div class="calendar-date">${h.a.weekdaysShort()[5]}</div>\n                <div class="calendar-date">${h.a.weekdaysShort()[6]}</div>\n            </div>\n            <div class="calendar-body">\n                \n            </div>\n        </div>\n        <div class="calendar-confirm">\n            <a class="button is-small calendar-btn-clear">清空</a>\n            <a class="button is-small calendar-btn-confirm">确定</a>\n        </div>\n    </div>\n</div>\n`)({
                        month: h.a.monthsShort()[e.month],
                        year: e.$data.localeData().relativeTime(e.year, null, "yy", null).replace(" ", "")
                    }), a = e.container = f(n);
                if (a.setAttribute("id", e.elemId), document.getElementById(e.elemId) && document.getElementById(e.elemId).remove(), t.renderInline ? document.querySelector(e.config.trigger).appendChild(a) : document.body.appendChild(a), "datetime" === t.type) {
                    const t = [f('<span class="calendar-btn-time">选择时间</span>'), f('<span class="calendar-btn-date">返回日期</span>')],
                        n = a.querySelector(".calendar-confirm");
                    n.insertBefore(t[0], n.firstChild), n.insertBefore(t[1], n.firstChild), e._initCalendarTime()
                }
                e._refreshCalendar(), e.events()
            },
            show() {
                this.container.style.display = "block"
            },
            hide(e) {
                e && e.preventDefault(), this.container.style.display = "none"
            },
            _adjustPosition() {
                let e, t, n, a = this.element;
                if ("function" == typeof a.getBoundingClientRect) e = (n = a.getBoundingClientRect()).left + window.pageXOffset, t = n.bottom + window.pageYOffset; else for (e = a.offsetLeft, t = a.offsetTop + a.offsetHeight; a = a.offsetParent;) e += a.offsetLeft, t += a.offsetTop;
                this.container.style.position = "absolute", this.container.style.left = e + "px", this.container.style.top = t + "px"
            },
            _refreshCalendar() {
                this.container.querySelector(".calendar-nav-year").innerHTML = this.$data.localeData().relativeTime(this.year, null, "yy", null).replace(" ", ""), this.container.querySelector(".calendar-nav-month").innerHTML = h.a.monthsShort()[this.month], this.container.querySelector(".calendar-body").innerHTML = "", this._renderDays()
            },
            _renderDays() {
                const e = h()().hours(0).minutes(0).seconds(0).milliseconds(0);
                let t = "", n = this.$data.daysInMonth(), a = h()().year(this.year).month(this.month).date(1).day();
                const r = h()().startOf("week").day();
                r > 0 && (a -= r) < 0 && (a += 7);
                let i = n + a, o = i;
                for (; o > 7;) o -= 7;
                i += 7 - o;
                for (let r = 0; r < i; r++) {
                    let i = h()().year(this.year).month(this.month).date(r - a).hours(0).minutes(0).seconds(0).milliseconds(0),
                        o = h()().year(this.year).month(this.month).date(this.date).hours(0).minutes(0).seconds(0).milliseconds(0),
                        l = !1, c = 0 == i.diff(o), s = !1, d = !1, u = 0 == i.diff(e), f = r < a || r >= n + a, m = !1;
                    (i.month() !== this.month || this.minDate && i.unix() < this.minDate.unix() || this.maxDate && i.unix() > this.maxDate.unix()) && (m = !0), m && (c = !1), t += this._renderDay(i.date(), i.month(), i.year(), c, u, m, f, l, s, d)
                }
                this.container.querySelector(".calendar-body").insertAdjacentHTML("beforeend", t), this._bindDaysEvents()
            },
            _renderDay: (e, t, n, a, r, i, o, l, c, s) => `\n        <div data-date="${`${h()({
                year: n,
                month: t,
                day: e
            }).format("YYYY-MM-DD").toString()}`}" class="calendar-date${i ? " is-disabled" : ""}${l ? " calendar-range" : ""}${c ? " calendar-range-start" : ""}${s ? " calendar-range-end" : ""}">\n            <button class="date-item${r ? " is-today" : ""}${a ? " is-active" : ""}">${e}</button>\n        </div>\n        `,
            events() {
                const e = this;
                this.container.querySelector(".calendar-nav-prev-month").addEventListener("click", t => e.prevMonth(t), !1), this.container.querySelector(".calendar-nav-next-month").addEventListener("click", t => e.nextMonth(t), !1), this.container.querySelector(".calendar-nav-prev-year").addEventListener("click", t => e.prevYear(t), !1), this.container.querySelector(".calendar-nav-next-year").addEventListener("click", t => e.nextYear(t), !1), this.container.querySelector(".calendar-btn-confirm").addEventListener("click", t => {
                    p(e.element) && (e.element.value = e.format(), "function" == typeof e.config.change && e.config.change.call(e, e.format())), e.destroy()
                }, !1), this.container.querySelector(".calendar-btn-clear").addEventListener("click", t => {
                    e.element.value && (e.element.value = "")
                }, !1), "datetime" == e.config.type && (this.container.querySelector(".calendar-btn-time").addEventListener("click", t => {
                    e.container.querySelector(".calendar").classList.add("calendar-time"), e.timeScroll()
                }, !1), this.container.querySelector(".calendar-btn-date").addEventListener("click", t => {
                    e.container.querySelector(".calendar") && e.container.querySelector(".calendar").classList.remove("calendar-time")
                }, !1), this.container.querySelector(".calendar-time-body").querySelectorAll("ol").forEach(t => {
                    t.querySelectorAll("li").forEach(n => {
                        n.addEventListener("click", n => {
                            const a = n.currentTarget, r = a.dataset;
                            r.hour ? e.$data.hours(Number.parseInt(r.hour)) : r.minute ? e.$data.minutes(Number.parseInt(r.minute)) : r.second && e.$data.seconds(Number.parseInt(r.second)), t.querySelector(".is-active") && t.querySelector(".is-active").classList.remove("is-active"), a.classList.add("is-active"), e.timeScroll()
                        })
                    })
                })), this.container.addEventListener("click", (e = window.event) => {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }, !1)
            },
            _initCalendarTime() {
                const e = f('<span class="calendar-time-text">选择时间</span>');
                this.container.querySelector(".calendar-nav-control").appendChild(e);
                const t = f('<ul class="calendar-time-body"></ul>');
                this.container.querySelector(".calendar-container").appendChild(t);
                const n = ["时", "分", "秒"], a = ["hour", "minute", "second"], r = [this.hour, this.minute, this.second];
                u([24, 60, 60], (e, i) => {
                    let o = f("<li></li>"), l = [`<p>${n[e]}</p><ol>`];
                    u(new Array(i), (t, n) => {
                        l.push(`<li data-${a[e]}="${t}" class="${t == r[e] ? "is-active" : ""}">${((e, t, n) => {
                            var a = "";
                            e = String(e), t = t || 2;
                            for (var r = e.length; r < t; r++) a += "0";
                            return e < Math.pow(10, t) ? a + (0 | e) : e
                        })(t)}</li>`)
                    }), o.innerHTML = l.join("") + "</ol>", t.appendChild(o)
                })
            },
            _bindDaysEvents() {
                const e = this, t = this.container.querySelector(".calendar-body").querySelectorAll(".calendar-date"),
                    n = e.config;
                t.forEach(a => {
                    a.addEventListener("click", a => {
                        if (a.preventDefault(), !a.currentTarget.classList.contains("is-disabled")) {
                            const r = h()(a.currentTarget.dataset.date, n.format);
                            e.$data.date(r.date()), t.forEach(e => {
                                e.querySelectorAll(".date-item").forEach(e => e.classList.remove("is-active"))
                            }), a.currentTarget.querySelector(".date-item").classList.add("is-active")
                        }
                    }, !1)
                })
            },
            timeScroll() {
                const e = this.hour, t = this.minute, n = this.second,
                    a = this.container.querySelector(".calendar-time-body").querySelectorAll("ol")[0].firstChild.clientHeight;
                this.container.querySelector(".calendar-time-body").querySelectorAll("ol")[0].scrollTop = a * (e - 2), this.container.querySelector(".calendar-time-body").querySelectorAll("ol")[1].scrollTop = a * (t - 2), this.container.querySelector(".calendar-time-body").querySelectorAll("ol")[2].scrollTop = a * (n - 2)
            },
            format(e = this.config.format) {
                return this.$data.format(e)
            },
            prevMonth(e) {
                e.preventDefault(), this.$data.subtract(1, "months"), this._refreshCalendar()
            },
            nextMonth(e) {
                e.preventDefault(), this.$data.add(1, "months"), this._refreshCalendar()
            },
            prevYear(e) {
                e.preventDefault(), this.$data.subtract(1, "y"), this._refreshCalendar()
            },
            nextYear(e) {
                e.preventDefault(), this.$data.add(1, "y"), this._refreshCalendar()
            },
            destroy() {
                this.container && this.container.remove()
            }
        };
        t.default = g
    }])
});