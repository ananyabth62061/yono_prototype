$(function() {
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
    $('.HaloLudo_Com').find('span').on('click', function() {
        var times = $(this).index();
        $(this).addClass('current').siblings().removeClass();
        $(this).parents('.tab_box').find('.AllRummyUpdate-Com').eq(times).show().siblings().hide();
    });
    $('#typeBtn').on('click', function() {
        $('#typeBox').toggleClass('hide');
        $(this).find('i').toggleClass('up');
        $(this).toggleClass('current');
    })
    $('#typeBox').find('li').on('click', function() {
        $(this).addClass('current').parents('#typeBox').find('li').siblings().removeClass('current');
        $(this).addClass('current')
    })
    $('.ranking_nav').find('li').on('click', function() {
        $(this).addClass('current').siblings().removeClass('current');
    })
    $('.game_classify').on('click', function() {
        $('.game_classify i').toggleClass('up');
        $('.game_tags ul li:nth-child(n+8)').toggle();
        $('.game_classify').show();
    })
    var liLength = $(".nav_bar li.current").index();
    liLength += 1;
    if (liLength > 5) {
        $('.nav_bar ul').scrollLeft(parseInt($(".nav_bar li").width()));
    } else {
        $('.nav_bar ul').scrollLeft(0);
    }

    function randomsort(a, b) {
        return Math.random() > .5 ? -1 : 1;
    }
    var arr = ['#0091ff', '#f36e5d', '#e8d851', '#92cf67', '#47c1a8', '#ffab80', '#35aba7', '#f98700', '#a286c0', '#ebcda7', '#81a0d7', '#e4697d', '#d2bdc4', '#91adb9', '#acb0d5', '#ed9d60', '#f46060', '#be7763', '#26a69a', '#f3b18e', '#92cf67', '#36b1c0', '#b27cda', '#ffab80', '#f26d7e', '#66bb6a', '#47c1a8', '#ffb230', '#df88ab', '#a1a8e7', '#4dd0e1', '#64b5f6', '#ffb300', '#ce93d8', '#f46060'];
    var arr2 = arr.sort(randomsort);
    $('.index_tag ul').children('li').each(function() {
        var index = $(this).index();
        $(this).children('a').attr('style', 'background:' + arr[index] + ';box-shadow:0px 1px 0px' + arr[index]);
    });
    var arrTags = ['#98dc9b', '#f8b0cd', '#a6bde3', '#f8c871', '#fea387', '#f38ce3', '#b3d465', '#5dc9ea', '#e4a1f0'];
    var arrtags = arrTags.sort(randomsort);
    $('.game_tag ul').children('li').each(function() {
        var index = $(this).index();
        $(this).children('a').attr('style', 'background:' + arrTags[index]);
    });
    var arrRe = arr.sort(randomsort);
    $('.editRe p').children('span').each(function() {
        var index = $(this).index();
        $(this).attr('style', 'background:' + arrRe[index]);
    });
    var linkHtml = $('#friend_link').html();
    if ($('#friend_link').height() > 30) {
        var box = document.getElementById("friend_link"),
            can = true;
        var html = document.getElementsByTagName('html')[0];
        var fsize = 0.5 * parseInt(html.style.fontSize);
        var ht = 0.5 * parseInt(html.style.fontSize);
        var flh = parseInt($('#friend_link').height());
        if (flh > fsize) {
            $('#friend_link').css('height', fsize);
            box.innerHTML += box.innerHTML;
            box.onmouseover = function() {
                can = false
            };
            box.onmouseout = function() {
                can = true
            };
            new function() {
                var stop = box.scrollTop % ht == 0 && !can;
                if (!stop) box.scrollTop == parseInt(box.scrollHeight / 2) ? box.scrollTop = 0 : box.scrollTop++;
                setTimeout(arguments.callee, box.scrollTop % ht ? 30 : 1500);
            };
        }
    } 
});

function headerNav() {
    var bodyH = $('body,html').height();
    var haaderH = $('header').height();
    if ($('#headerNav').css('display') === 'none') {
        $('header .menu').find('i').addClass('green');
        $('#headerNav').show();
        $('#headerNav').find('.mask').css('height', bodyH - haaderH);
    } else {
        $('header .menu').find('i').removeClass('green');
        $('#headerNav').hide();
    }
}
$('#closeTxt').on('click', function() {
    $(this).siblings('input').val('');
    clearInterval(searchzidong);
});
var baseurl = $.trim($("#baseUrl").val());
var keyword = $.trim($("#searchKey").val());
var searchTxt = 0;

function searchRun() {
    searchTxt++;
    if (searchTxt >= $('.search_ul_txt li').length) {
        searchTxt = 0;
    };
    searchSlider();
};

function searchSlider() {
    $(".search_ul_txt").find("li").eq(searchTxt).show().siblings().hide();
    $('.search_txt .text').val($(".search_ul_txt").find("li").eq(searchTxt).text());
};
var searchzidong = setInterval(searchRun, 2500);
if (keyword) {
    clearInterval(searchzidong);
    $('.search_txt .text').val(keyword);
} else {
    $('.search_txt .text').val($(".search_ul_txt").find("li").eq(0).text());
}
$(".search_txt input").focus(function() {
    clearInterval(searchzidong);
});

function liftSearch() {
    var keyword = $.trim($("#searchKey").val());
    var baseurl = $.trim($("#baseUrl").val());
    if (keyword) {
        $.ajax({
            url: baseurl + 'so/search/',
            type: 'POST',
            data: {
                keyword: keyword
            },
            success: function(data) {
                $('.search_wrap').hide();
                $('.search_list_wrap_div').show();
                $('.search_list_wrap').html(data);
            }
        });
    } else {
        $('.search_wrap').show();
    }
}
$('#dosearch').click(function() {
    var keyword = $("#searchKey").val();
    if (keyword) {
        window.location.href = baseurl + 'so/?key=' + encodeURI(keyword);
    }
});
$(document).keyup(function(event) {
    if (event.keyCode == 13) {
        $('#dosearch').click();
    }
});
$('#search_more').click(function() {
    var more = $(this);
    var baseurl = $.trim($("#baseUrl").val());
    var keyword = $.trim($("#searchKey").val());
    var page = parseInt($(this).attr('page'));
    var totpage = parseInt($(this).attr('totpage'));
    $.ajax({
        url: baseurl + 'so/',
        type: 'get',
        data: {
            key: keyword,
            page: page
        },
        success: function(res) {
            $('.search_list_wrap2').append(res);
            more.attr('page', page + 1);
            if (page + 1 >= totpage) {
                more.remove();
            }
        }
    });
});


$(function() {
    if ($('.downbtn').length > 0) {
        var baseUrl = "https://m.doyo.cn/";
        var reportUrl = 'https://linkwe.dzyms.cn/';
        var obj = $('.downbtn');
        id = obj.attr('id');
        type = obj.attr('type');
        $.get(baseUrl + '/downs/detail/' + id + '/' + type, function(res) {
            var result = JSON.parse(res);
            if (result.code == 1) {
                $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) +
                    '&url=' + encodeURIComponent(window.location.href));
                if (result.data.and_url) {
                    $('.btnAnd').show().click(function() {
                        $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=and');
                        location.href = result.data.and_url;
                    });
                }
                if (result.data.ios_url) {
                    $('.btnIos').show().click(function() {
                        $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=ios');
                        location.href = result.data.ios_url;
                    });
                }
            }
        });
    }
})


"use strict";
var pageStartTime = +new Date;
~ function(e) {
    function t() {
        var t = screen.width > 0 && (e.innerWidth >= screen.width || 0 == e.innerWidth) ? screen.width : e.innerWidth;
        a && (t = screen.width);
        var i = t > u ? w : t / (u / 100);
        i = i > h ? i : h, document.documentElement.style.fontSize = i + "px"
    }
    var i, n = e.navigator.userAgent,
        a = n.match(/iphone/i),
        o = n.match(/yixin/i),
        c = n.match(/Mb2345/i),
        r = n.match(/mso_app/i),
        s = n.match(/sogoumobilebrowser/gi),
        m = n.match(/liebaofast/i),
        d = n.match(/GNBR/i),
        u = document.documentElement.dataset.dw || 750,
        h = 42,
        w = 100;
    e.addEventListener("resize", function() {
        clearTimeout(i), i = setTimeout(t, 300)
    }, !1), e.addEventListener("pageshow", function(e) {
        e.persisted && (clearTimeout(i), i = setTimeout(t, 300))
    }, !1), o || c || r || s || m || d ? setTimeout(function() {
        t()
    }, 500) : t()
}(window);





function openLink(id) {
    if (id == 1) {
        window.open('About.html')
    }
    if (id == 2) {
        window.open('Terms.html')
    }
    if (id == 3) {
        window.open('privacy-policy.html')
    }
    if (id == 4) {
        window.open('CancellationRefund.html')
    }
    if (id == 5) {
        window.open('Pricing.html')
    }
    if (id == 6) {
        window.open('contact-us.html')
    }
}
/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */ ! function(t, e) {
    "function" == typeof define && define.amd ? define(function() {
        return e(t)
    }) : e(t)
}(this, function(t) {
    var e = function() {
        function $(t) {
            return null == t ? String(t) : S[C.call(t)] || "object"
        }

        function F(t) {
            return "function" == $(t)
        }

        function k(t) {
            return null != t && t == t.window
        }

        function M(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE
        }

        function R(t) {
            return "object" == $(t)
        }

        function Z(t) {
            return R(t) && !k(t) && Object.getPrototypeOf(t) == Object.prototype
        }

        function z(t) {
            var e = !!t && "length" in t && t.length,
                n = r.type(t);
            return "function" != n && !k(t) && ("array" == n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function q(t) {
            return a.call(t, function(t) {
                return null != t
            })
        }

        function H(t) {
            return t.length > 0 ? r.fn.concat.apply([], t) : t
        }

        function I(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }

        function V(t) {
            return t in l ? l[t] : l[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }

        function _(t, e) {
            return "number" != typeof e || h[I(t)] ? e : e + "px"
        }

        function B(t) {
            var e, n;
            return c[t] || (e = f.createElement(t), f.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), c[t] = n), c[t]
        }

        function U(t) {
            return "children" in t ? u.call(t.children) : r.map(t.childNodes, function(t) {
                return 1 == t.nodeType ? t : void 0
            })
        }

        function X(t, e) {
            var n, r = t ? t.length : 0;
            for (n = 0; r > n; n++) this[n] = t[n];
            this.length = r, this.selector = e || ""
        }

        function J(t, r, i) {
            for (n in r) i && (Z(r[n]) || L(r[n])) ? (Z(r[n]) && !Z(t[n]) && (t[n] = {}), L(r[n]) && !L(t[n]) && (t[n] = []), J(t[n], r[n], i)) : r[n] !== e && (t[n] = r[n])
        }

        function W(t, e) {
            return null == e ? r(t) : r(t).filter(e)
        }

        function Y(t, e, n, r) {
            return F(e) ? e.call(t, n, r) : e
        }

        function G(t, e, n) {
            null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
        }

        function K(t, n) {
            var r = t.className || "",
                i = r && r.baseVal !== e;
            return n === e ? i ? r.baseVal : r : void(i ? r.baseVal = n : t.className = n)
        }

        function Q(t) {
            try {
                return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? r.parseJSON(t) : t) : t
            } catch (e) {
                return t
            }
        }

        function tt(t, e) {
            e(t);
            for (var n = 0, r = t.childNodes.length; r > n; n++) tt(t.childNodes[n], e)
        }
        var e, n, r, i, O, P, o = [],
            s = o.concat,
            a = o.filter,
            u = o.slice,
            f = t.document,
            c = {},
            l = {},
            h = {
                "column-count": 1,
                columns: 1,
                "font-weight": 1,
                "line-height": 1,
                opacity: 1,
                "z-index": 1,
                zoom: 1
            },
            p = /^\s*<(\w+|!)[^>]*>/,
            d = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            m = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            g = /^(?:body|html)$/i,
            v = /([A-Z])/g,
            y = ["val", "css", "html", "text", "data", "width", "height", "offset"],
            x = ["after", "prepend", "before", "append"],
            b = f.createElement("table"),
            E = f.createElement("tr"),
            j = {
                tr: f.createElement("tbody"),
                tbody: b,
                thead: b,
                tfoot: b,
                td: E,
                th: E,
                "*": f.createElement("div")
            },
            w = /complete|loaded|interactive/,
            T = /^[\w-]*$/,
            S = {},
            C = S.toString,
            N = {},
            A = f.createElement("div"),
            D = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            L = Array.isArray || function(t) {
                return t instanceof Array
            };
        return N.matches = function(t, e) {
            if (!e || !t || 1 !== t.nodeType) return !1;
            var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (n) return n.call(t, e);
            var r, i = t.parentNode,
                o = !i;
            return o && (i = A).appendChild(t), r = ~N.qsa(i, e).indexOf(t), o && A.removeChild(t), r
        }, O = function(t) {
            return t.replace(/-+(.)?/g, function(t, e) {
                return e ? e.toUpperCase() : ""
            })
        }, P = function(t) {
            return a.call(t, function(e, n) {
                return t.indexOf(e) == n
            })
        }, N.fragment = function(t, n, i) {
            var o, s, a;
            return d.test(t) && (o = r(f.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(m, "<$1></$2>")), n === e && (n = p.test(t) && RegExp.$1), n in j || (n = "*"), a = j[n], a.innerHTML = "" + t, o = r.each(u.call(a.childNodes), function() {
                a.removeChild(this)
            })), Z(i) && (s = r(o), r.each(i, function(t, e) {
                y.indexOf(t) > -1 ? s[t](e) : s.attr(t, e)
            })), o
        }, N.Z = function(t, e) {
            return new X(t, e)
        }, N.isZ = function(t) {
            return t instanceof N.Z
        }, N.init = function(t, n) {
            var i;
            if (!t) return N.Z();
            if ("string" == typeof t)
                if (t = t.trim(), "<" == t[0] && p.test(t)) i = N.fragment(t, RegExp.$1, n), t = null;
                else {
                    if (n !== e) return r(n).find(t);
                    i = N.qsa(f, t)
                }
            else {
                if (F(t)) return r(f).ready(t);
                if (N.isZ(t)) return t;
                if (L(t)) i = q(t);
                else if (R(t)) i = [t], t = null;
                else if (p.test(t)) i = N.fragment(t.trim(), RegExp.$1, n), t = null;
                else {
                    if (n !== e) return r(n).find(t);
                    i = N.qsa(f, t)
                }
            }
            return N.Z(i, t)
        }, r = function(t, e) {
            return N.init(t, e)
        }, r.extend = function(t) {
            var e, n = u.call(arguments, 1);
            return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) {
                J(t, n, e)
            }), t
        }, N.qsa = function(t, e) {
            var n, r = "#" == e[0],
                i = !r && "." == e[0],
                o = r || i ? e.slice(1) : e,
                s = T.test(o);
            return t.getElementById && s && r ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : u.call(s && !r && t.getElementsByClassName ? i ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }, r.contains = f.documentElement.contains ? function(t, e) {
            return t !== e && t.contains(e)
        } : function(t, e) {
            for (; e && (e = e.parentNode);)
                if (e === t) return !0;
            return !1
        }, r.type = $, r.isFunction = F, r.isWindow = k, r.isArray = L, r.isPlainObject = Z, r.isEmptyObject = function(t) {
            var e;
            for (e in t) return !1;
            return !0
        }, r.isNumeric = function(t) {
            var e = Number(t),
                n = typeof t;
            return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1
        }, r.inArray = function(t, e, n) {
            return o.indexOf.call(e, t, n)
        }, r.camelCase = O, r.trim = function(t) {
            return null == t ? "" : String.prototype.trim.call(t)
        }, r.uuid = 0, r.support = {}, r.expr = {}, r.noop = function() {}, r.map = function(t, e) {
            var n, i, o, r = [];
            if (z(t))
                for (i = 0; i < t.length; i++) n = e(t[i], i), null != n && r.push(n);
            else
                for (o in t) n = e(t[o], o), null != n && r.push(n);
            return H(r)
        }, r.each = function(t, e) {
            var n, r;
            if (z(t)) {
                for (n = 0; n < t.length; n++)
                    if (e.call(t[n], n, t[n]) === !1) return t
            } else
                for (r in t)
                    if (e.call(t[r], r, t[r]) === !1) return t;
            return t
        }, r.grep = function(t, e) {
            return a.call(t, e)
        }, t.JSON && (r.parseJSON = JSON.parse), r.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            S["[object " + e + "]"] = e.toLowerCase()
        }), r.fn = {
            constructor: N.Z,
            length: 0,
            forEach: o.forEach,
            reduce: o.reduce,
            push: o.push,
            sort: o.sort,
            splice: o.splice,
            indexOf: o.indexOf,
            concat: function() {
                var t, e, n = [];
                for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = N.isZ(e) ? e.toArray() : e;
                return s.apply(N.isZ(this) ? this.toArray() : this, n)
            },
            map: function(t) {
                return r(r.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function() {
                return r(u.apply(this, arguments))
            },
            ready: function(t) {
                return w.test(f.readyState) && f.body ? t(r) : f.addEventListener("DOMContentLoaded", function() {
                    t(r)
                }, !1), this
            },
            get: function(t) {
                return t === e ? u.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function(t) {
                return o.every.call(this, function(e, n) {
                    return t.call(e, n, e) !== !1
                }), this
            },
            filter: function(t) {
                return F(t) ? this.not(this.not(t)) : r(a.call(this, function(e) {
                    return N.matches(e, t)
                }))
            },
            add: function(t, e) {
                return r(P(this.concat(r(t, e))))
            },
            is: function(t) {
                return this.length > 0 && N.matches(this[0], t)
            },
            not: function(t) {
                var n = [];
                if (F(t) && t.call !== e) this.each(function(e) {
                    t.call(this, e) || n.push(this)
                });
                else {
                    var i = "string" == typeof t ? this.filter(t) : z(t) && F(t.item) ? u.call(t) : r(t);
                    this.forEach(function(t) {
                        i.indexOf(t) < 0 && n.push(t)
                    })
                }
                return r(n)
            },
            has: function(t) {
                return this.filter(function() {
                    return R(t) ? r.contains(this, t) : r(this).find(t).size()
                })
            },
            eq: function(t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function() {
                var t = this[0];
                return t && !R(t) ? t : r(t)
            },
            last: function() {
                var t = this[this.length - 1];
                return t && !R(t) ? t : r(t)
            },
            find: function(t) {
                var e, n = this;
                return e = t ? "object" == typeof t ? r(t).filter(function() {
                    var t = this;
                    return o.some.call(n, function(e) {
                        return r.contains(e, t)
                    })
                }) : 1 == this.length ? r(N.qsa(this[0], t)) : this.map(function() {
                    return N.qsa(this, t)
                }) : r()
            },
            closest: function(t, e) {
                var n = [],
                    i = "object" == typeof t && r(t);
                return this.each(function(r, o) {
                    for (; o && !(i ? i.indexOf(o) >= 0 : N.matches(o, t));) o = o !== e && !M(o) && o.parentNode;
                    o && n.indexOf(o) < 0 && n.push(o)
                }), r(n)
            },
            parents: function(t) {
                for (var e = [], n = this; n.length > 0;) n = r.map(n, function(t) {
                    return (t = t.parentNode) && !M(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
                });
                return W(e, t)
            },
            parent: function(t) {
                return W(P(this.pluck("parentNode")), t)
            },
            children: function(t) {
                return W(this.map(function() {
                    return U(this)
                }), t)
            },
            contents: function() {
                return this.map(function() {
                    return this.contentDocument || u.call(this.childNodes)
                })
            },
            siblings: function(t) {
                return W(this.map(function(t, e) {
                    return a.call(U(e.parentNode), function(t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(t) {
                return r.map(this, function(e) {
                    return e[t]
                })
            },
            show: function() {
                return this.each(function() {
                    "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = B(this.nodeName))
                })
            },
            replaceWith: function(t) {
                return this.before(t).remove()
            },
            wrap: function(t) {
                var e = F(t);
                if (this[0] && !e) var n = r(t).get(0),
                    i = n.parentNode || this.length > 1;
                return this.each(function(o) {
                    r(this).wrapAll(e ? t.call(this, o) : i ? n.cloneNode(!0) : n)
                })
            },
            wrapAll: function(t) {
                if (this[0]) {
                    r(this[0]).before(t = r(t));
                    for (var e;
                        (e = t.children()).length;) t = e.first();
                    r(t).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                var e = F(t);
                return this.each(function(n) {
                    var i = r(this),
                        o = i.contents(),
                        s = e ? t.call(this, n) : t;
                    o.length ? o.wrapAll(s) : i.append(s)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    r(this).replaceWith(r(this).children())
                }), this
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)
                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(t) {
                return this.each(function() {
                    var n = r(this);
                    (t === e ? "none" == n.css("display") : t) ? n.show(): n.hide()
                })
            },
            prev: function(t) {
                return r(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function(t) {
                return r(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var n = this.innerHTML;
                    r(this).empty().append(Y(this, t, e, n))
                }) : 0 in this ? this[0].innerHTML : null
            },
            text: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var n = Y(this, t, e, this.textContent);
                    this.textContent = null == n ? "" : "" + n
                }) : 0 in this ? this.pluck("textContent").join("") : null
            },
            attr: function(t, r) {
                var i;
                return "string" != typeof t || 1 in arguments ? this.each(function(e) {
                    if (1 === this.nodeType)
                        if (R(t))
                            for (n in t) G(this, n, t[n]);
                        else G(this, t, Y(this, r, e, this.getAttribute(t)))
                }) : 0 in this && 1 == this[0].nodeType && null != (i = this[0].getAttribute(t)) ? i : e
            },
            removeAttr: function(t) {
                return this.each(function() {
                    1 === this.nodeType && t.split(" ").forEach(function(t) {
                        G(this, t)
                    }, this)
                })
            },
            prop: function(t, e) {
                return t = D[t] || t, 1 in arguments ? this.each(function(n) {
                    this[t] = Y(this, e, n, this[t])
                }) : this[0] && this[0][t]
            },
            removeProp: function(t) {
                return t = D[t] || t, this.each(function() {
                    delete this[t]
                })
            },
            data: function(t, n) {
                var r = "data-" + t.replace(v, "-$1").toLowerCase(),
                    i = 1 in arguments ? this.attr(r, n) : this.attr(r);
                return null !== i ? Q(i) : e
            },
            val: function(t) {
                return 0 in arguments ? (null == t && (t = ""), this.each(function(e) {
                    this.value = Y(this, t, e, this.value)
                })) : this[0] && (this[0].multiple ? r(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value)
            },
            offset: function(e) {
                if (e) return this.each(function(t) {
                    var n = r(this),
                        i = Y(this, e, t, n.offset()),
                        o = n.offsetParent().offset(),
                        s = {
                            top: i.top - o.top,
                            left: i.left - o.left
                        };
                    "static" == n.css("position") && (s.position = "relative"), n.css(s)
                });
                if (!this.length) return null;
                if (f.documentElement !== this[0] && !r.contains(f.documentElement, this[0])) return {
                    top: 0,
                    left: 0
                };
                var n = this[0].getBoundingClientRect();
                return {
                    left: n.left + t.pageXOffset,
                    top: n.top + t.pageYOffset,
                    width: Math.round(n.width),
                    height: Math.round(n.height)
                }
            },
            css: function(t, e) {
                if (arguments.length < 2) {
                    var i = this[0];
                    if ("string" == typeof t) {
                        if (!i) return;
                        return i.style[O(t)] || getComputedStyle(i, "").getPropertyValue(t)
                    }
                    if (L(t)) {
                        if (!i) return;
                        var o = {},
                            s = getComputedStyle(i, "");
                        return r.each(t, function(t, e) {
                            o[e] = i.style[O(e)] || s.getPropertyValue(e)
                        }), o
                    }
                }
                var a = "";
                if ("string" == $(t)) e || 0 === e ? a = I(t) + ":" + _(t, e) : this.each(function() {
                    this.style.removeProperty(I(t))
                });
                else
                    for (n in t) t[n] || 0 === t[n] ? a += I(n) + ":" + _(n, t[n]) + ";" : this.each(function() {
                        this.style.removeProperty(I(n))
                    });
                return this.each(function() {
                    this.style.cssText += ";" + a
                })
            },
            index: function(t) {
                return t ? this.indexOf(r(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(t) {
                return t ? o.some.call(this, function(t) {
                    return this.test(K(t))
                }, V(t)) : !1
            },
            addClass: function(t) {
                return t ? this.each(function(e) {
                    if ("className" in this) {
                        i = [];
                        var n = K(this),
                            o = Y(this, t, e, n);
                        o.split(/\s+/g).forEach(function(t) {
                            r(this).hasClass(t) || i.push(t)
                        }, this), i.length && K(this, n + (n ? " " : "") + i.join(" "))
                    }
                }) : this
            },
            removeClass: function(t) {
                return this.each(function(n) {
                    if ("className" in this) {
                        if (t === e) return K(this, "");
                        i = K(this), Y(this, t, n, i).split(/\s+/g).forEach(function(t) {
                            i = i.replace(V(t), " ")
                        }), K(this, i.trim())
                    }
                })
            },
            toggleClass: function(t, n) {
                return t ? this.each(function(i) {
                    var o = r(this),
                        s = Y(this, t, i, K(this));
                    s.split(/\s+/g).forEach(function(t) {
                        (n === e ? !o.hasClass(t) : n) ? o.addClass(t): o.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function(t) {
                if (this.length) {
                    var n = "scrollTop" in this[0];
                    return t === e ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function() {
                        this.scrollTop = t
                    } : function() {
                        this.scrollTo(this.scrollX, t)
                    })
                }
            },
            scrollLeft: function(t) {
                if (this.length) {
                    var n = "scrollLeft" in this[0];
                    return t === e ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function() {
                        this.scrollLeft = t
                    } : function() {
                        this.scrollTo(t, this.scrollY)
                    })
                }
            },
            position: function() {
                if (this.length) {
                    var t = this[0],
                        e = this.offsetParent(),
                        n = this.offset(),
                        i = g.test(e[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : e.offset();
                    return n.top -= parseFloat(r(t).css("margin-top")) || 0, n.left -= parseFloat(r(t).css("margin-left")) || 0, i.top += parseFloat(r(e[0]).css("border-top-width")) || 0, i.left += parseFloat(r(e[0]).css("border-left-width")) || 0, {
                        top: n.top - i.top,
                        left: n.left - i.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || f.body; t && !g.test(t.nodeName) && "static" == r(t).css("position");) t = t.offsetParent;
                    return t
                })
            }
        }, r.fn.detach = r.fn.remove, ["width", "height"].forEach(function(t) {
            var n = t.replace(/./, function(t) {
                return t[0].toUpperCase()
            });
            r.fn[t] = function(i) {
                var o, s = this[0];
                return i === e ? k(s) ? s["inner" + n] : M(s) ? s.documentElement["scroll" + n] : (o = this.offset()) && o[t] : this.each(function(e) {
                    s = r(this), s.css(t, Y(this, i, e, s[t]()))
                })
            }
        }), x.forEach(function(n, i) {
            var o = i % 2;
            r.fn[n] = function() {
                var n, a, s = r.map(arguments, function(t) {
                        var i = [];
                        return n = $(t), "array" == n ? (t.forEach(function(t) {
                            return t.nodeType !== e ? i.push(t) : r.zepto.isZ(t) ? i = i.concat(t.get()) : void(i = i.concat(N.fragment(t)))
                        }), i) : "object" == n || null == t ? t : N.fragment(t)
                    }),
                    u = this.length > 1;
                return s.length < 1 ? this : this.each(function(e, n) {
                    a = o ? n : n.parentNode, n = 0 == i ? n.nextSibling : 1 == i ? n.firstChild : 2 == i ? n : null;
                    var c = r.contains(f.documentElement, a);
                    s.forEach(function(e) {
                        if (u) e = e.cloneNode(!0);
                        else if (!a) return r(e).remove();
                        a.insertBefore(e, n), c && tt(e, function(e) {
                            if (!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) {
                                var n = e.ownerDocument ? e.ownerDocument.defaultView : t;
                                n.eval.call(n, e.innerHTML)
                            }
                        })
                    })
                })
            }, r.fn[o ? n + "To" : "insert" + (i ? "Before" : "After")] = function(t) {
                return r(t)[n](this), this
            }
        }), N.Z.prototype = X.prototype = r.fn, N.uniq = P, N.deserializeValue = Q, r.zepto = N, r
    }();
    return t.Zepto = e, void 0 === t.$ && (t.$ = e),
        function(e) {
            function h(t) {
                return t._zid || (t._zid = n++)
            }

            function p(t, e, n, r) {
                if (e = d(e), e.ns) var i = m(e.ns);
                return (a[h(t)] || []).filter(function(t) {
                    return t && (!e.e || t.e == e.e) && (!e.ns || i.test(t.ns)) && (!n || h(t.fn) === h(n)) && (!r || t.sel == r)
                })
            }

            function d(t) {
                var e = ("" + t).split(".");
                return {
                    e: e[0],
                    ns: e.slice(1).sort().join(" ")
                }
            }

            function m(t) {
                return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
            }

            function g(t, e) {
                return t.del && !f && t.e in c || !!e
            }

            function v(t) {
                return l[t] || f && c[t] || t
            }

            function y(t, n, i, o, s, u, f) {
                var c = h(t),
                    p = a[c] || (a[c] = []);
                n.split(/\s/).forEach(function(n) {
                    if ("ready" == n) return e(document).ready(i);
                    var a = d(n);
                    a.fn = i, a.sel = s, a.e in l && (i = function(t) {
                        var n = t.relatedTarget;
                        return !n || n !== this && !e.contains(this, n) ? a.fn.apply(this, arguments) : void 0
                    }), a.del = u;
                    var c = u || i;
                    a.proxy = function(e) {
                        if (e = T(e), !e.isImmediatePropagationStopped()) {
                            e.data = o;
                            var n = c.apply(t, e._args == r ? [e] : [e].concat(e._args));
                            return n === !1 && (e.preventDefault(), e.stopPropagation()), n
                        }
                    }, a.i = p.length, p.push(a), "addEventListener" in t && t.addEventListener(v(a.e), a.proxy, g(a, f))
                })
            }

            function x(t, e, n, r, i) {
                var o = h(t);
                (e || "").split(/\s/).forEach(function(e) {
                    p(t, e, n, r).forEach(function(e) {
                        delete a[o][e.i], "removeEventListener" in t && t.removeEventListener(v(e.e), e.proxy, g(e, i))
                    })
                })
            }

            function T(t, n) {
                return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(w, function(e, r) {
                    var i = n[e];
                    t[e] = function() {
                        return this[r] = b, i && i.apply(n, arguments)
                    }, t[r] = E
                }), t.timeStamp || (t.timeStamp = Date.now()), (n.defaultPrevented !== r ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = b)), t
            }

            function S(t) {
                var e, n = {
                    originalEvent: t
                };
                for (e in t) j.test(e) || t[e] === r || (n[e] = t[e]);
                return T(n, t)
            }
            var r, n = 1,
                i = Array.prototype.slice,
                o = e.isFunction,
                s = function(t) {
                    return "string" == typeof t
                },
                a = {},
                u = {},
                f = "onfocusin" in t,
                c = {
                    focus: "focusin",
                    blur: "focusout"
                },
                l = {
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                };
            u.click = u.mousedown = u.mouseup = u.mousemove = "MouseEvents", e.event = {
                add: y,
                remove: x
            }, e.proxy = function(t, n) {
                var r = 2 in arguments && i.call(arguments, 2);
                if (o(t)) {
                    var a = function() {
                        return t.apply(n, r ? r.concat(i.call(arguments)) : arguments)
                    };
                    return a._zid = h(t), a
                }
                if (s(n)) return r ? (r.unshift(t[n], t), e.proxy.apply(null, r)) : e.proxy(t[n], t);
                throw new TypeError("expected function")
            }, e.fn.bind = function(t, e, n) {
                return this.on(t, e, n)
            }, e.fn.unbind = function(t, e) {
                return this.off(t, e)
            }, e.fn.one = function(t, e, n, r) {
                return this.on(t, e, n, r, 1)
            };
            var b = function() {
                    return !0
                },
                E = function() {
                    return !1
                },
                j = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
                w = {
                    preventDefault: "isDefaultPrevented",
                    stopImmediatePropagation: "isImmediatePropagationStopped",
                    stopPropagation: "isPropagationStopped"
                };
            e.fn.delegate = function(t, e, n) {
                return this.on(e, t, n)
            }, e.fn.undelegate = function(t, e, n) {
                return this.off(e, t, n)
            }, e.fn.live = function(t, n) {
                return e(document.body).delegate(this.selector, t, n), this
            }, e.fn.die = function(t, n) {
                return e(document.body).undelegate(this.selector, t, n), this
            }, e.fn.on = function(t, n, a, u, f) {
                var c, l, h = this;
                return t && !s(t) ? (e.each(t, function(t, e) {
                    h.on(t, n, a, e, f)
                }), h) : (s(n) || o(u) || u === !1 || (u = a, a = n, n = r), (u === r || a === !1) && (u = a, a = r), u === !1 && (u = E), h.each(function(r, o) {
                    f && (c = function(t) {
                        return x(o, t.type, u), u.apply(this, arguments)
                    }), n && (l = function(t) {
                        var r, s = e(t.target).closest(n, o).get(0);
                        return s && s !== o ? (r = e.extend(S(t), {
                            currentTarget: s,
                            liveFired: o
                        }), (c || u).apply(s, [r].concat(i.call(arguments, 1)))) : void 0
                    }), y(o, t, u, a, n, l || c)
                }))
            }, e.fn.off = function(t, n, i) {
                var a = this;
                return t && !s(t) ? (e.each(t, function(t, e) {
                    a.off(t, n, e)
                }), a) : (s(n) || o(i) || i === !1 || (i = n, n = r), i === !1 && (i = E), a.each(function() {
                    x(this, t, i, n)
                }))
            }, e.fn.trigger = function(t, n) {
                return t = s(t) || e.isPlainObject(t) ? e.Event(t) : T(t), t._args = n, this.each(function() {
                    t.type in c && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
                })
            }, e.fn.triggerHandler = function(t, n) {
                var r, i;
                return this.each(function(o, a) {
                    r = S(s(t) ? e.Event(t) : t), r._args = n, r.target = a, e.each(p(a, t.type || t), function(t, e) {
                        return i = e.proxy(r), r.isImmediatePropagationStopped() ? !1 : void 0
                    })
                }), i
            }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
                e.fn[t] = function(e) {
                    return 0 in arguments ? this.bind(t, e) : this.trigger(t)
                }
            }), e.Event = function(t, e) {
                s(t) || (e = t, t = e.type);
                var n = document.createEvent(u[t] || "Events"),
                    r = !0;
                if (e)
                    for (var i in e) "bubbles" == i ? r = !!e[i] : n[i] = e[i];
                return n.initEvent(t, r, !0), T(n)
            }
        }(e),
        function(e) {
            function p(t, n, r) {
                var i = e.Event(n);
                return e(t).trigger(i, r), !i.isDefaultPrevented()
            }

            function d(t, e, n, i) {
                return t.global ? p(e || r, n, i) : void 0
            }

            function m(t) {
                t.global && 0 === e.active++ && d(t, null, "ajaxStart")
            }

            function g(t) {
                t.global && !--e.active && d(t, null, "ajaxStop")
            }

            function v(t, e) {
                var n = e.context;
                return e.beforeSend.call(n, t, e) === !1 || d(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void d(e, n, "ajaxSend", [t, e])
            }

            function y(t, e, n, r) {
                var i = n.context,
                    o = "success";
                n.success.call(i, t, o, e), r && r.resolveWith(i, [t, o, e]), d(n, i, "ajaxSuccess", [e, n, t]), b(o, e, n)
            }

            function x(t, e, n, r, i) {
                var o = r.context;
                r.error.call(o, n, e, t), i && i.rejectWith(o, [n, e, t]), d(r, o, "ajaxError", [n, r, t || e]), b(e, n, r)
            }

            function b(t, e, n) {
                var r = n.context;
                n.complete.call(r, e, t), d(n, r, "ajaxComplete", [e, n]), g(n)
            }

            function E(t, e, n) {
                if (n.dataFilter == j) return t;
                var r = n.context;
                return n.dataFilter.call(r, t, e)
            }

            function j() {}

            function w(t) {
                return t && (t = t.split(";", 2)[0]), t && (t == c ? "html" : t == f ? "json" : a.test(t) ? "script" : u.test(t) && "xml") || "text"
            }

            function T(t, e) {
                return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
            }

            function S(t) {
                t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = T(t.url, t.data), t.data = void 0)
            }

            function C(t, n, r, i) {
                return e.isFunction(n) && (i = r, r = n, n = void 0), e.isFunction(r) || (i = r, r = void 0), {
                    url: t,
                    data: n,
                    success: r,
                    dataType: i
                }
            }

            function O(t, n, r, i) {
                var o, s = e.isArray(n),
                    a = e.isPlainObject(n);
                e.each(n, function(n, u) {
                    o = e.type(u), i && (n = r ? i : i + "[" + (a || "object" == o || "array" == o ? n : "") + "]"), !i && s ? t.add(u.name, u.value) : "array" == o || !r && "object" == o ? O(t, u, r, n) : t.add(n, u)
                })
            }
            var i, o, n = +new Date,
                r = t.document,
                s = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                a = /^(?:text|application)\/javascript/i,
                u = /^(?:text|application)\/xml/i,
                f = "application/json",
                c = "text/html",
                l = /^\s*$/,
                h = r.createElement("a");
            h.href = t.location.href, e.active = 0, e.ajaxJSONP = function(i, o) {
                if (!("type" in i)) return e.ajax(i);
                var c, p, s = i.jsonpCallback,
                    a = (e.isFunction(s) ? s() : s) || "Zepto" + n++,
                    u = r.createElement("script"),
                    f = t[a],
                    l = function(t) {
                        e(u).triggerHandler("error", t || "abort")
                    },
                    h = {
                        abort: l
                    };
                return o && o.promise(h), e(u).on("load error", function(n, r) {
                    clearTimeout(p), e(u).off().remove(), "error" != n.type && c ? y(c[0], h, i, o) : x(null, r || "error", h, i, o), t[a] = f, c && e.isFunction(f) && f(c[0]), f = c = void 0
                }), v(h, i) === !1 ? (l("abort"), h) : (t[a] = function() {
                    c = arguments
                }, u.src = i.url.replace(/\?(.+)=\?/, "?$1=" + a), r.head.appendChild(u), i.timeout > 0 && (p = setTimeout(function() {
                    l("timeout")
                }, i.timeout)), h)
            }, e.ajaxSettings = {
                type: "GET",
                beforeSend: j,
                success: j,
                error: j,
                complete: j,
                context: null,
                global: !0,
                xhr: function() {
                    return new t.XMLHttpRequest
                },
                accepts: {
                    script: "text/javascript, application/javascript, application/x-javascript",
                    json: f,
                    xml: "application/xml, text/xml",
                    html: c,
                    text: "text/plain"
                },
                crossDomain: !1,
                timeout: 0,
                processData: !0,
                cache: !0,
                dataFilter: j
            }, e.ajax = function(n) {
                var u, f, s = e.extend({}, n || {}),
                    a = e.Deferred && e.Deferred();
                for (i in e.ajaxSettings) void 0 === s[i] && (s[i] = e.ajaxSettings[i]);
                m(s), s.crossDomain || (u = r.createElement("a"), u.href = s.url, u.href = u.href, s.crossDomain = h.protocol + "//" + h.host != u.protocol + "//" + u.host), s.url || (s.url = t.location.toString()), (f = s.url.indexOf("#")) > -1 && (s.url = s.url.slice(0, f)), S(s);
                var c = s.dataType,
                    p = /\?.+=\?/.test(s.url);
                if (p && (c = "jsonp"), s.cache !== !1 && (n && n.cache === !0 || "script" != c && "jsonp" != c) || (s.url = T(s.url, "_=" + Date.now())), "jsonp" == c) return p || (s.url = T(s.url, s.jsonp ? s.jsonp + "=?" : s.jsonp === !1 ? "" : "callback=?")), e.ajaxJSONP(s, a);
                var P, d = s.accepts[c],
                    g = {},
                    b = function(t, e) {
                        g[t.toLowerCase()] = [t, e]
                    },
                    C = /^([\w-]+:)\/\//.test(s.url) ? RegExp.$1 : t.location.protocol,
                    N = s.xhr(),
                    O = N.setRequestHeader;
                if (a && a.promise(N), s.crossDomain || b("X-Requested-With", "XMLHttpRequest"), b("Accept", d || "*/*"), (d = s.mimeType || d) && (d.indexOf(",") > -1 && (d = d.split(",", 2)[0]), N.overrideMimeType && N.overrideMimeType(d)), (s.contentType || s.contentType !== !1 && s.data && "GET" != s.type.toUpperCase()) && b("Content-Type", s.contentType || "application/x-www-form-urlencoded"), s.headers)
                    for (o in s.headers) b(o, s.headers[o]);
                if (N.setRequestHeader = b, N.onreadystatechange = function() {
                        if (4 == N.readyState) {
                            N.onreadystatechange = j, clearTimeout(P);
                            var t, n = !1;
                            if (N.status >= 200 && N.status < 300 || 304 == N.status || 0 == N.status && "file:" == C) {
                                if (c = c || w(s.mimeType || N.getResponseHeader("content-type")), "arraybuffer" == N.responseType || "blob" == N.responseType) t = N.response;
                                else {
                                    t = N.responseText;
                                    try {
                                        t = E(t, c, s), "script" == c ? (1, eval)(t) : "xml" == c ? t = N.responseXML : "json" == c && (t = l.test(t) ? null : e.parseJSON(t))
                                    } catch (r) {
                                        n = r
                                    }
                                    if (n) return x(n, "parsererror", N, s, a)
                                }
                                y(t, N, s, a)
                            } else x(N.statusText || null, N.status ? "error" : "abort", N, s, a)
                        }
                    }, v(N, s) === !1) return N.abort(), x(null, "abort", N, s, a), N;
                var A = "async" in s ? s.async : !0;
                if (N.open(s.type, s.url, A, s.username, s.password), s.xhrFields)
                    for (o in s.xhrFields) N[o] = s.xhrFields[o];
                for (o in g) O.apply(N, g[o]);
                return s.timeout > 0 && (P = setTimeout(function() {
                    N.onreadystatechange = j, N.abort(), x(null, "timeout", N, s, a)
                }, s.timeout)), N.send(s.data ? s.data : null), N
            }, e.get = function() {
                return e.ajax(C.apply(null, arguments))
            }, e.post = function() {
                var t = C.apply(null, arguments);
                return t.type = "POST", e.ajax(t)
            }, e.getJSON = function() {
                var t = C.apply(null, arguments);
                return t.dataType = "json", e.ajax(t)
            }, e.fn.load = function(t, n, r) {
                if (!this.length) return this;
                var a, i = this,
                    o = t.split(/\s/),
                    u = C(t, n, r),
                    f = u.success;
                return o.length > 1 && (u.url = o[0], a = o[1]), u.success = function(t) {
                    i.html(a ? e("<div>").html(t.replace(s, "")).find(a) : t), f && f.apply(i, arguments)
                }, e.ajax(u), this
            };
            var N = encodeURIComponent;
            e.param = function(t, n) {
                var r = [];
                return r.add = function(t, n) {
                    e.isFunction(n) && (n = n()), null == n && (n = ""), this.push(N(t) + "=" + N(n))
                }, O(r, t, n), r.join("&").replace(/%20/g, "+")
            }
        }(e),
        function(t) {
            t.fn.serializeArray = function() {
                var e, n, r = [],
                    i = function(t) {
                        return t.forEach ? t.forEach(i) : void r.push({
                            name: e,
                            value: t
                        })
                    };
                return this[0] && t.each(this[0].elements, function(r, o) {
                    n = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && i(t(o).val())
                }), r
            }, t.fn.serialize = function() {
                var t = [];
                return this.serializeArray().forEach(function(e) {
                    t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
                }), t.join("&")
            }, t.fn.submit = function(e) {
                if (0 in arguments) this.bind("submit", e);
                else if (this.length) {
                    var n = t.Event("submit");
                    this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
                }
                return this
            }
        }(e),
        function() {
            try {
                getComputedStyle(void 0)
            } catch (e) {
                var n = getComputedStyle;
                t.getComputedStyle = function(t, e) {
                    try {
                        return n(t, e)
                    } catch (r) {
                        return null
                    }
                }
            }
        }(), e
});

;
(function(a) {
    function b(a) {
        return a.replace(/([A-Z])/g, "-$1").toLowerCase()
    }

    function c(a) {
        return d ? d + a : a.toLowerCase()
    }
    var d, e, f, g, h, i, j, k, l, m, n = "",
        o = document.createElement("div"),
        p = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        q = {};
    o.style.transform === void 0 && a.each({
        Webkit: "webkit",
        Moz: "",
        O: "o"
    }, function(a, b) {
        if (void 0 !== o.style[a + "TransitionProperty"]) return n = "-" + a.toLowerCase() + "-", d = b, !1
    }), e = n + "transform", q[f = n + "transition-property"] = q[g = n + "transition-duration"] = q[i = n + "transition-delay"] = q[h = n + "transition-timing-function"] = q[j = n + "animation-name"] = q[k = n + "animation-duration"] = q[m = n + "animation-delay"] = q[l = n + "animation-timing-function"] = "", a.fx = {
        off: d === void 0 && o.style.transitionProperty === void 0,
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: n,
        transitionEnd: c("TransitionEnd"),
        animationEnd: c("AnimationEnd")
    }, a.fn.animate = function(b, c, d, e, f) {
        return a.isFunction(c) && (e = c, d = void 0, c = void 0), a.isFunction(d) && (e = d, d = void 0), a.isPlainObject(c) && (d = c.easing, e = c.complete, f = c.delay, c = c.duration), c && (c = ("number" == typeof c ? c : a.fx.speeds[c] || a.fx.speeds._default) / 1e3), f && (f = parseFloat(f) / 1e3), this.anim(b, c, d, e, f)
    }, a.fn.anim = function(c, d, n, o, r) {
        var s, t, u, v = {},
            w = "",
            x = this,
            y = a.fx.transitionEnd,
            z = !1;
        if (void 0 === d && (d = a.fx.speeds._default / 1e3), void 0 === r && (r = 0), a.fx.off && (d = 0), "string" == typeof c) v[j] = c, v[k] = d + "s", v[m] = r + "s", v[l] = n || "linear", y = a.fx.animationEnd;
        else {
            for (s in t = [], c) p.test(s) ? w += s + "(" + c[s] + ") " : (v[s] = c[s], t.push(b(s)));
            w && (v[e] = w, t.push(e)), 0 < d && "object" == typeof c && (v[f] = t.join(", "), v[g] = d + "s", v[i] = r + "s", v[h] = n || "linear")
        }
        return u = function(b) {
            if ("undefined" != typeof b) {
                if (b.target !== b.currentTarget) return;
                a(b.target).unbind(y, u)
            } else a(this).unbind(y, u);
            z = !0, a(this).css(q), o && o.call(this)
        }, 0 < d && (this.bind(y, u), setTimeout(function() {
            z || u.call(x)
        }, 1e3 * (d + r) + 25)), this.size() && this.get(0).clientLeft, this.css(v), 0 >= d && setTimeout(function() {
            x.each(function() {
                u.call(this)
            })
        }, 0), this
    }, o = null
})(Zepto);

;
(function(a) {
    function b(b, c, d, e, f) {
        "function" != typeof c || f || (f = c, c = void 0);
        var g = {
            opacity: d
        };
        return e && (g.scale = e, b.css(a.fx.cssPrefix + "transform-origin", "0 0")), b.animate(g, c, null, f)
    }

    function c(c, d, e, g) {
        return b(c, d, 0, e, function() {
            f.call(a(this)), g && g.call(this)
        })
    }
    var d = window.document,
        e = a.fn.show,
        f = a.fn.hide,
        g = a.fn.toggle;
    a.fn.show = function(a, c) {
        return e.call(this), void 0 === a ? a = 0 : this.css("opacity", 0), b(this, a, 1, "1,1", c)
    }, a.fn.hide = function(a, b) {
        return void 0 === a ? f.call(this) : c(this, a, "0,0", b)
    }, a.fn.toggle = function(b, c) {
        return void 0 === b || "boolean" == typeof b ? g.call(this, b) : this.each(function() {
            var d = a(this);
            d["none" == d.css("display") ? "show" : "hide"](b, c)
        })
    }, a.fn.fadeTo = function(a, c, d) {
        return b(this, a, c, null, d)
    }, a.fn.fadeIn = function(a, b) {
        var c = this.css("opacity");
        return 0 < c ? this.css("opacity", 0) : c = 1, e.call(this).fadeTo(a, c, b)
    }, a.fn.fadeOut = function(a, b) {
        return c(this, a, null, b)
    }, a.fn.fadeToggle = function(b, c) {
        return this.each(function() {
            var d = a(this);
            d[0 == d.css("opacity") || "none" == d.css("display") ? "fadeIn" : "fadeOut"](b, c)
        })
    }
})(Zepto);
//deferred
(function(d) {
    function k(b) {
        var c = [
                ["resolve", "done", d.Callbacks({
                    once: 1,
                    memory: 1
                }), "resolved"],
                ["reject", "fail", d.Callbacks({
                    once: 1,
                    memory: 1
                }), "rejected"],
                ["notify", "progress", d.Callbacks({
                    memory: 1
                })]
            ],
            g = "pending",
            f = {
                state: function() {
                    return g
                },
                always: function() {
                    a.done(arguments).fail(arguments);
                    return this
                },
                then: function() {
                    var h = arguments;
                    return k(function(e) {
                        d.each(c, function(c, g) {
                            var b = d.isFunction(h[c]) && h[c];
                            a[g[1]](function() {
                                var a = b && b.apply(this, arguments);
                                if (a && d.isFunction(a.promise)) a.promise().done(e.resolve).fail(e.reject).progress(e.notify);
                                else {
                                    var c = this === f ? e.promise() : this;
                                    e[g[0] + "With"](c, b ? [a] : arguments)
                                }
                            })
                        });
                        h = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? d.extend(a, f) : f
                }
            },
            a = {};
        d.each(c, function(d, e) {
            var b = e[2],
                h = e[3];
            f[e[1]] = b.add;
            h && b.add(function() {
                g = h
            }, c[d ^ 1][2].disable, c[2][2].lock);
            a[e[0]] = function() {
                a[e[0] + "With"](this === a ? f : this, arguments);
                return this
            };
            a[e[0] + "With"] = b.fireWith
        });
        f.promise(a);
        b && b.call(a, a);
        return a
    }
    var p = Array.prototype.slice;
    d.when = function(b) {
        var c = p.call(arguments),
            g = c.length,
            f = 0,
            a = 1 !== g || b &&
            d.isFunction(b.promise) ? g : 0,
            h = 1 === a ? b : k(),
            e, m, l, n = function(c, d, b) {
                return function(f) {
                    d[c] = this;
                    b[c] = 1 < arguments.length ? p.call(arguments) : f;
                    b === e ? h.notifyWith(d, b) : --a || h.resolveWith(d, b)
                }
            };
        if (1 < g)
            for (e = Array(g), m = Array(g), l = Array(g); f < g; ++f) c[f] && d.isFunction(c[f].promise) ? c[f].promise().done(n(f, l, c)).fail(h.reject).progress(n(f, m, e)) : --a;
        a || h.resolveWith(l, c);
        return h.promise()
    };
    d.Deferred = k
})(Zepto);
//callbacks
(function(f) {
    f.Callbacks = function(g) {
        g = f.extend({}, g);
        var e, n, l, p, h, k, a = [],
            c = !g.once && [],
            q = function(b) {
                e = g.memory && b;
                n = !0;
                k = p || 0;
                p = 0;
                h = a.length;
                for (l = !0; a && k < h; ++k)
                    if (!1 === a[k].apply(b[0], b[1]) && g.stopOnFalse) {
                        e = !1;
                        break
                    } l = !1;
                a && (c ? c.length && q(c.shift()) : e ? a.length = 0 : m.disable())
            },
            m = {
                add: function() {
                    if (a) {
                        var b = a.length,
                            d = function(b) {
                                f.each(b, function(b, c) {
                                    "function" === typeof c ? g.unique && m.has(c) || a.push(c) : c && c.length && "string" !== typeof c && d(c)
                                })
                            };
                        d(arguments);
                        l ? h = a.length : e && (p = b, q(e))
                    }
                    return this
                },
                remove: function() {
                    a && f.each(arguments, function(c, d) {
                        for (var b; - 1 < (b = f.inArray(d, a, b));) a.splice(b, 1), l && (b <= h && --h, b <= k && --k)
                    });
                    return this
                },
                has: function(b) {
                    return !!(a && (b ? -1 < f.inArray(b, a) : a.length))
                },
                empty: function() {
                    h = a.length = 0;
                    return this
                },
                disable: function() {
                    a = c = e = void 0;
                    return this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    c = void 0;
                    e || m.disable();
                    return this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(b, d) {
                    !a || n && !c || (d = d || [], d = [b, d.slice ? d.slice() : d], l ? c.push(d) : q(d));
                    return this
                },
                fire: function() {
                    return m.fireWith(this, arguments)
                },
                fired: function() {
                    return !!n
                }
            };
        return m
    }
})(Zepto);

//以动画形式的 show, hide, toggle, 和 fade*()方法.
(function(d, m) {
    function e(a, b, c, f, e) {
        "function" != typeof b || e || (e = b, b = void 0);
        c = {
            opacity: c
        };
        f && (c.scale = f, a.css(d.fx.cssPrefix + "transform-origin", "0 0"));
        return a.animate(c, b, null, e)
    }

    function g(a, b, c, f) {
        return e(a, b, 0, c, function() {
            h.call(d(this));
            f && f.call(this)
        })
    }
    var k = d.fn.show,
        h = d.fn.hide,
        l = d.fn.toggle;
    d.fn.show = function(a, b) {
        k.call(this);
        void 0 === a ? a = 0 : this.css("opacity", 0);
        return e(this, a, 1, "1,1", b)
    };
    d.fn.hide = function(a, b) {
        return void 0 === a ? h.call(this) : g(this, a, "0,0", b)
    };
    d.fn.toggle = function(a, b) {
        return void 0 === a || "boolean" == typeof a ? l.call(this, a) : this.each(function() {
            var c = d(this);
            c["none" == c.css("display") ? "show" : "hide"](a, b)
        })
    };
    d.fn.fadeTo = function(a, b, c) {
        return e(this, a, b, null, c)
    };
    d.fn.fadeIn = function(a, b) {
        var c = this.css("opacity");
        0 < c ? this.css("opacity", 0) : c = 1;
        return k.call(this).fadeTo(a, c, b)
    };
    d.fn.fadeOut = function(a, b) {
        return g(this, a, null, b)
    };
    d.fn.fadeToggle = function(a, b) {
        return this.each(function() {
            var c = d(this);
            c[0 == c.css("opacity") || "none" == c.css("display") ? "fadeIn" : "fadeOut"](a,
                b)
        })
    }
})(Zepto);

//cookie插件修改使用H5 localStorage储存
(function(a) {
    function b() {}

    function c() {
        var a, b = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        return (a = document.cookie.match(b)) ? unescape(a[2]) : null
    }

    function d() {
        var a = new Date;
        a.setTime(a.getTime() - 1);
        var b = c(name);
        null != b && (document.cookie = name + "=" + b + ";expires=" + a.toGMTString())
    }

    function e() {
        return "undefined" != typeof Storage
    }
    b.prototype.set = function(a, b) {
        e() ? localStorage[a] = b : document.cookie = a + "=" + b
    }, b.prototype.get = function(a) {
        return a ? e() ? localStorage[a] : c(a) : e() ? localStorage : document.cookie
    }, b.prototype.remove = function(a) {
        e() ? (console.log(a), localStorage.removeItem(a)) : d(a)
    }, a.Cookies = new b
})(window);

//添加fastClick
! function() {
    "use strict";

    function t(e, o) {
        function i(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        var r;
        if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
            for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++) c[a[s]] = i(c[a[s]], c);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) {
                var i = Node.prototype.removeEventListener;
                "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
            }, e.addEventListener = function(t, n, o) {
                var i = Node.prototype.addEventListener;
                "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) {
                    t.propagationStopped || n(t)
                }), o) : i.call(e, t, n, o)
            }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(t) {
                r(t)
            }, !1), e.onclick = null)
        }
    }
    var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
        n = navigator.userAgent.indexOf("Android") > 0 && !e,
        o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
        i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        r = o && /OS [6-7]_\d/.test(navigator.userAgent),
        a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (t.disabled) return !0;
                break;
            case "input":
                if (o && "file" === t.type || t.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !n;
            case "input":
                switch (t.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function(t, e) {
        var n, o;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
    }, t.prototype.determineEventType = function(t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function(t) {
        var e;
        o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function(t) {
        var e, n;
        if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function(t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function(t) {
        var e, n, r;
        if (t.targetTouches.length > 1) return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
            if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function(t) {
        var e = t.changedTouches[0],
            n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
    }, t.prototype.onTouchMove = function(t) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, t.prototype.findControl = function(t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function(t) {
        var e, a, c, s, u, l = this.targetElement;
        if (!this.trackingClick) return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
            if (e = this.findControl(l)) {
                if (this.focus(l), n) return !1;
                l = e
            }
        } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);
        return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
    }, t.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function(t) {
        return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
    }, t.prototype.onClick = function(t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
    }, t.prototype.destroy = function() {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function(t) {
        var e, o, i, r;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n) return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
    }, t.attach = function(e, n) {
        return new t(e, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}();


// trim
$.trim = function(str) {
    return str == null ? '' : String.prototype.trim.call(str);
};