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
        e.exports = n(5)
    }, function (e, t, n) {
    }, , , function (e, t, n) {
        "use strict";

        function a(e) {
            return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        n.r(t);
        var r = Object.getPrototypeOf, o = {}, i = o.toString, c = o.hasOwnProperty, l = c.toString, s = l.call(Object);

        function d(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        }

        function u(e) {
            var t, n;
            return !(!e || "[object Object]" !== i.call(e) || (t = r(e)) && ("function" != typeof(n = c.call(t, "constructor") && t.constructor) || l.call(n) !== s))
        }

        function f(e, t) {
            var n, r = 0;
            if (function (e) {
                var t, n, r = !!e && "length" in e && e.length,
                    c = null != (t = e) ? "object" === a(t) || "function" == typeof t ? o[i.call(t)] || "object" : a(t) : t + "";
                return !d(e) && (null == (n = e) || n !== n.window) && ("array" === c || 0 === r || "number" == typeof r && 0 < r && r - 1 in e)
            }(e)) for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++) ; else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
            return e
        }

        f("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
            o["[object " + t + "]"] = t.toLowerCase()
        });
        var m = function (e) {
            var t = document.createElement("div");
            return t.innerHTML = e, t.firstElementChild
        }, y = n(0), h = n.n(y);

        function v(e) {
            return (v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        n(2), h.a.locale("zh-cn");
        var p = {
            renderInline: !1,
            format: h.a.localeData().longDateFormat("L"),
            type: "date",
            vaulue: null,
            min: "1900-1-1",
            max: "2099-12-31",
            trigger: "focus",
            lang: "cn",
            change: null
        }, b = "object" === ("undefined" == typeof window ? "undefined" : v(window)), g = function (e) {
            return /input|textarea/.test(e.tagName.toLocaleLowerCase())
        }, S = 0;

        function D(e, t) {
            this.config = {}, function e() {
                var t, n, r, o, i, c, l = arguments[0] || {}, s = 1, f = arguments.length, m = !1;
                for ("boolean" == typeof l && (m = l, l = arguments[s] || {}, s++), "object" === a(l) || d(l) || (l = {}), s === f && (l = this, s--); s < f; s++) if (null != (t = arguments[s])) for (n in t) r = l[n], l !== (o = t[n]) && (m && o && (u(o) || (i = Array.isArray(o))) ? (c = i ? (i = !1, r && Array.isArray(r) ? r : []) : r && u(r) ? r : {}, l[n] = e(m, c, o)) : void 0 !== o && (l[n] = o));
                return l
            }(this.config, p, t), this.element = "string" == typeof e ? document.querySelector(e) : e, this.init()
        }

        D.prototype = {
            get minDate() {
                return this._minDate
            }, set minDate(e) {
                this._minDate = e ? h()(e, this.config.format) : null
            }, get maxDate() {
                return this._maxDate
            }, set maxDate(e) {
                this._maxDate = e ? h()(e, this.config.format) : null
            }, init: function () {
                var e = this, t = this;
                Object.defineProperty(t, "$data", {
                    get: function () {
                        return this._date || h()()
                    }, set: function (e) {
                        h()(e, this.config.format).isValid() && (this._date = h()(e, this.config.format))
                    }
                }), ++S, Object.defineProperty(t, "uid", {
                    value: S,
                    enumerable: !0,
                    writable: !1
                }), t.elemId = "datepicker_".concat(t.uid), Object.defineProperty(t, "year", {
                    get: function () {
                        return this.$data.year()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t, "month", {
                    get: function () {
                        return this.$data.month()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t, "date", {
                    get: function () {
                        return this.$data.date()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t, "hour", {
                    get: function () {
                        return this.$data.hour()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t, "minute", {
                    get: function () {
                        return this.$data.minute()
                    }, enumerable: !0, configurable: !0
                }), Object.defineProperty(t, "second", {
                    get: function () {
                        return this.$data.second()
                    }, enumerable: !0, configurable: !0
                });
                var n = function () {
                    t.element.value ? "date" === t.config.type ? t.$data = h()(t.element.value, "YYYY-MM-DD") : "datetime" === t.config.type ? t.$data = h()(t.element.value, "YYYY-MM-DD HH:mm:ss") : t.$data = h()(t.element.value) : t.$data = h()(), e.minDate = e.config.minDate ? h()(e.config.minDate) : null, e.maxDate = e.config.maxDate ? h()(e.config.maxDate) : null
                };
                g(t.element) ? t.trigger = "focus" : t.trigger = "click", t.element.addEventListener(t.trigger, function (e) {
                    n(), t.render(), t.show(), t._adjustPosition()
                }, !1), g(t.element) && (t.element.addEventListener("keyup", function (e) {
                    h()(e.target.value, t.config.format).isValid() && n(), t._refreshCalendar(), "datetime" === t.config.type && t.timeScroll()
                }, !1), t.element.addEventListener("change", function (e) {
                    h()(e.target.value, t.config.format).isValid() && n(), t._refreshCalendar(), "datetime" === t.config.type && t.timeScroll()
                }, !1)), document.addEventListener("click", function (e) {
                    e.target !== t.element && t.destroy()
                }, !1)
            }, render: function () {
                if (b) {
                    var e = this;
                    if (!document.getElementById(e.elemId)) {
                        var t, n = e.config, a = (t = {
                                month: h.a.monthsShort()[e.month],
                                year: e.$data.localeData().relativeTime(e.year, null, "yy", null).replace(" ", "")
                            }, '\n<div class="datepicker">\n    <div class="calendar">\n        <div class="calendar-nav">\n            <div class="calendar-nav-prev">\n                <a class="button is-small calendar-nav-prev-year">\n                    <i class="icon iconfont icon-prev_more"></i>\n                </a>\n                <a class="button is-small calendar-nav-prev-month">\n                    <i class="icon iconfont icon-prev"></i>\n                </a>\n            </div>\n            <div class="calendar-nav-control">\n                <span class="calendar-nav-year">'.concat(t.year, '</span>\n                <span class="calendar-nav-month">').concat(t.month, '</span>\n            </div>\n            <div class="calendar-nav-next">\n                <a class="button is-small calendar-nav-next-month">\n                    <i class="icon iconfont icon-next"></i>\n                </a>\n                <a class="button is-small calendar-nav-next-year">\n                    <i class="icon iconfont icon-next_more"></i>\n                </a>\n            </div>\n        </div>\n        <div class="calendar-container">\n            <div class="calendar-header">\n                <div class="calendar-date">').concat(h.a.weekdaysShort()[0], '</div>\n                <div class="calendar-date">').concat(h.a.weekdaysShort()[1], '</div>\n                <div class="calendar-date">').concat(h.a.weekdaysShort()[2], '</div>\n                <div class="calendar-date">').concat(h.a.weekdaysShort()[3], '</div>\n                <div class="calendar-date">').concat(h.a.weekdaysShort()[4], '</div>\n                <div class="calendar-date">').concat(h.a.weekdaysShort()[5], '</div>\n                <div class="calendar-date">').concat(h.a.weekdaysShort()[6], '</div>\n            </div>\n            <div class="calendar-body">\n                \n            </div>\n        </div>\n        <div class="calendar-confirm">\n            <a class="button is-small calendar-btn-clear">清空</a>\n            <a class="button is-small calendar-btn-confirm">确定</a>\n        </div>\n    </div>\n</div>\n')),
                            r = e.container = m(a);
                        if (r.setAttribute("id", e.elemId), document.getElementById(e.elemId) && document.getElementById(e.elemId).remove(), n.renderInline ? document.querySelector(e.config.trigger).appendChild(r) : document.body.appendChild(r), "datetime" === n.type) {
                            var o = [m('<span class="calendar-btn-time">选择时间</span>'), m('<span class="calendar-btn-date">返回日期</span>')],
                                i = r.querySelector(".calendar-confirm");
                            i.insertBefore(o[0], i.firstChild), i.insertBefore(o[1], i.firstChild), e._initCalendarTime()
                        }
                        e._refreshCalendar(), e.events()
                    }
                }
            }, show: function () {
                this.container.style.display = "block"
            }, hide: function (e) {
                e && e.preventDefault(), this.container.style.display = "none"
            }, _adjustPosition: function () {
                var e, t, n, a = this.element;
                if ("function" == typeof a.getBoundingClientRect) e = (n = a.getBoundingClientRect()).left + window.pageXOffset, t = n.bottom + window.pageYOffset; else for (e = a.offsetLeft, t = a.offsetTop + a.offsetHeight; a = a.offsetParent;) e += a.offsetLeft, t += a.offsetTop;
                this.container.style.position = "absolute", this.container.style.left = e + "px", this.container.style.top = t + "px"
            }, _refreshCalendar: function () {
                this.container.querySelector(".calendar-nav-year").innerHTML = this.$data.localeData().relativeTime(this.year, null, "yy", null).replace(" ", ""), this.container.querySelector(".calendar-nav-month").innerHTML = h.a.monthsShort()[this.month], this.container.querySelector(".calendar-body").innerHTML = "", this._renderDays()
            }, _renderDays: function () {
                var e = h()().hours(0).minutes(0).seconds(0).milliseconds(0), t = "", n = this.$data.daysInMonth(),
                    a = h()().year(this.year).month(this.month).date(1).day(), r = h()().startOf("week").day();
                0 < r && (a -= r) < 0 && (a += 7);
                for (var o = n + a, i = o; 7 < i;) i -= 7;
                o += 7 - i;
                for (var c = 0; c < o; c++) {
                    var l = h()().year(this.year).month(this.month).date(c - a).hours(0).minutes(0).seconds(0).milliseconds(0),
                        s = h()().year(this.year).month(this.month).date(this.date).hours(0).minutes(0).seconds(0).milliseconds(0),
                        d = 0 == l.diff(s), u = 0 == l.diff(e), f = c < a || n + a <= c, m = !1;
                    (l.month() !== this.month || this.minDate && l.unix() < this.minDate.unix() || this.maxDate && l.unix() > this.maxDate.unix()) && (m = !0), m && (d = !1), t += this._renderDay(l.date(), l.month(), l.year(), d, u, m, f, !1, !1, !1)
                }
                this.container.querySelector(".calendar-body").insertAdjacentHTML("beforeend", t), this._bindDaysEvents()
            }, _renderDay: function (e, t, n, a, r, o, i, c, l, s) {
                var d = h()({year: n, month: t, day: e}).format("YYYY-MM-DD").toString();
                return '\n        <div data-date="'.concat("".concat(d), '" class="calendar-date', o ? " is-disabled" : "").concat(c ? " calendar-range" : "").concat(l ? " calendar-range-start" : "").concat(s ? " calendar-range-end" : "", '">\n            <button class="date-item').concat(r ? " is-today" : "").concat(a ? " is-active" : "", '">').concat(e, "</button>\n        </div>\n        ")
            }, events: function () {
                var e = this;
                this.container.querySelector(".calendar-nav-prev-month").addEventListener("click", function (t) {
                    return e.prevMonth(t)
                }, !1), this.container.querySelector(".calendar-nav-next-month").addEventListener("click", function (t) {
                    return e.nextMonth(t)
                }, !1), this.container.querySelector(".calendar-nav-prev-year").addEventListener("click", function (t) {
                    return e.prevYear(t)
                }, !1), this.container.querySelector(".calendar-nav-next-year").addEventListener("click", function (t) {
                    return e.nextYear(t)
                }, !1), this.container.querySelector(".calendar-btn-confirm").addEventListener("click", function (t) {
                    g(e.element) && (e.element.value = e.format(), "function" == typeof e.config.change && e.config.change.call(e, e.format())), e.destroy()
                }, !1), this.container.querySelector(".calendar-btn-clear").addEventListener("click", function (t) {
                    e.element.value && (e.element.value = "")
                }, !1), "datetime" == e.config.type && (this.container.querySelector(".calendar-btn-time").addEventListener("click", function (t) {
                    e.container.querySelector(".calendar").classList.add("calendar-time"), e.timeScroll()
                }, !1), this.container.querySelector(".calendar-btn-date").addEventListener("click", function (t) {
                    e.container.querySelector(".calendar") && e.container.querySelector(".calendar").classList.remove("calendar-time")
                }, !1), this.container.querySelector(".calendar-time-body").querySelectorAll("ol").forEach(function (t) {
                    t.querySelectorAll("li").forEach(function (n) {
                        n.addEventListener("click", function (n) {
                            var a = n.currentTarget, r = a.dataset;
                            r.hour ? e.$data.hours(Number.parseInt(r.hour)) : r.minute ? e.$data.minutes(Number.parseInt(r.minute)) : r.second && e.$data.seconds(Number.parseInt(r.second)), t.querySelector(".is-active") && t.querySelector(".is-active").classList.remove("is-active"), a.classList.add("is-active"), e.timeScroll()
                        })
                    })
                })), this.container.addEventListener("click", function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : window.event;
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }, !1)
            }, _initCalendarTime: function () {
                var e = m('<span class="calendar-time-text">选择时间</span>');
                this.container.querySelector(".calendar-nav-control").appendChild(e);
                var t = m('<ul class="calendar-time-body"></ul>');
                this.container.querySelector(".calendar-container").appendChild(t);
                var n = ["时", "分", "秒"], a = ["hour", "minute", "second"], r = [this.hour, this.minute, this.second];
                f([24, 60, 60], function (e, o) {
                    var i = m("<li></li>"), c = ["<p>".concat(n[e], "</p><ol>")];
                    f(new Array(o), function (t, n) {
                        c.push("<li data-".concat(a[e], '="').concat(t, '" class="').concat(t == r[e] ? "is-active" : "", '">').concat(function (e, t, n) {
                            var a = "";
                            t = t || 2;
                            for (var r = (e = String(e)).length; r < t; r++) a += "0";
                            return e < Math.pow(10, t) ? a + (0 | e) : e
                        }(t), "</li>"))
                    }), i.innerHTML = c.join("") + "</ol>", t.appendChild(i)
                })
            }, _bindDaysEvents: function () {
                var e = this, t = this.container.querySelector(".calendar-body").querySelectorAll(".calendar-date"),
                    n = e.config;
                t.forEach(function (a) {
                    a.addEventListener("click", function (a) {
                        if (a.preventDefault(), !a.currentTarget.classList.contains("is-disabled")) {
                            var r = h()(a.currentTarget.dataset.date, n.format);
                            e.$data.date(r.date()), t.forEach(function (e) {
                                e.querySelectorAll(".date-item").forEach(function (e) {
                                    return e.classList.remove("is-active")
                                })
                            }), a.currentTarget.querySelector(".date-item").classList.add("is-active")
                        }
                    }, !1)
                })
            }, timeScroll: function () {
                var e = this, t = e.hour, n = e.minute, a = e.second,
                    r = e.container.querySelector(".calendar-time-body").querySelectorAll("ol")[0].firstChild.clientHeight;
                e.container.querySelector(".calendar-time-body").querySelectorAll("ol")[0].scrollTop = r * (t - 2), e.container.querySelector(".calendar-time-body").querySelectorAll("ol")[1].scrollTop = r * (n - 2), e.container.querySelector(".calendar-time-body").querySelectorAll("ol")[2].scrollTop = r * (a - 2)
            }, format: function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.config.format;
                return this.$data.format(e)
            }, prevMonth: function (e) {
                e.preventDefault(), this.$data.subtract(1, "months"), this._refreshCalendar()
            }, nextMonth: function (e) {
                e.preventDefault(), this.$data.add(1, "months"), this._refreshCalendar()
            }, prevYear: function (e) {
                e.preventDefault(), this.$data.subtract(1, "y"), this._refreshCalendar()
            }, nextYear: function (e) {
                e.preventDefault(), this.$data.add(1, "y"), this._refreshCalendar()
            }, destroy: function () {
                this.container && this.container.remove()
            }
        }, t.default = D
    }])
});