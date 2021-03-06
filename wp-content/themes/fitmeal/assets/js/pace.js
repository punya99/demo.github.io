(function() {
    var t, e, n, r, s, i, o, a, u, l, c, p, h, d, f, g, m, y, v, w, b, x, S, k, q, L, T, P, R, j, E, M, O, A, N, _, F, C, U, H, X, W, D, I, z, B, G, J, K, Q = [].slice,
        V = {}.hasOwnProperty,
        Y = function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e) V.call(e, r) && (t[r] = e[r]);
            return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
        },
        Z = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    for (b = {
            catchupTime: 100,
            initialRate: .03,
            minTime: 250,
            ghostTime: 100,
            maxProgressPerFrame: 20,
            easeFactor: 1.25,
            startOnPageLoad: !0,
            restartOnPushState: !1,
            restartOnRequestAfter: !1,
            target: "body",
            elements: !1,
            eventLag: {
                minSamples: 10,
                sampleCount: 3,
                lagThreshold: 3
            },
            ajax: !1
        }, R = function() {
            var t;
            return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date
        }, E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, w = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == E && (E = function(t) {
            return setTimeout(t, 50)
        }, w = function(t) {
            return clearTimeout(t)
        }), O = function(t) {
            var e, n;
            return e = R(), (n = function() {
                var r;
                return r = R() - e, r >= 33 ? (e = R(), t(r, function() {
                    return E(n)
                })) : setTimeout(n, 33 - r)
            })()
        }, M = function() {
            var t, e, n;
            return n = arguments[0], e = arguments[1], t = 3 <= arguments.length ? Q.call(arguments, 2) : [], "function" == typeof n[e] ? n[e].apply(n, t) : n[e]
        }, x = function() {
            var t, e, n, r, s, i, o;
            for (e = arguments[0], r = 2 <= arguments.length ? Q.call(arguments, 1) : [], i = 0, o = r.length; i < o; i++)
                if (n = r[i])
                    for (t in n) V.call(n, t) && (s = n[t], null != e[t] && "object" == typeof e[t] && null != s && "object" == typeof s ? x(e[t], s) : e[t] = s);
            return e
        }, m = function(t) {
            var e, n, r, s, i;
            for (n = e = 0, s = 0, i = t.length; s < i; s++) r = t[s], n += Math.abs(r), e++;
            return n / e
        }, k = function(t, e) {
            var n, r, s;
            if (null == t && (t = "options"), null == e && (e = !0), s = document.querySelector("[data-pace-" + t + "]")) {
                if (n = s.getAttribute("data-pace-" + t), !e) return n;
                try {
                    return JSON.parse(n)
                } catch (i) {
                    return r = i, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", r) : void 0
                }
            }
        }, o = function() {
            function t() {}
            return t.prototype.on = function(t, e, n, r) {
                var s;
                return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (s = this.bindings)[t] && (s[t] = []), this.bindings[t].push({
                    handler: e,
                    ctx: n,
                    once: r
                })
            }, t.prototype.once = function(t, e, n) {
                return this.on(t, e, n, !0)
            }, t.prototype.off = function(t, e) {
                var n, r, s;
                if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
                    if (null == e) return delete this.bindings[t];
                    for (n = 0, s = []; n < this.bindings[t].length;) this.bindings[t][n].handler === e ? s.push(this.bindings[t].splice(n, 1)) : s.push(n++);
                    return s
                }
            }, t.prototype.trigger = function() {
                var t, e, n, r, s, i, o, a, u;
                if (n = arguments[0], t = 2 <= arguments.length ? Q.call(arguments, 1) : [], null != (o = this.bindings) ? o[n] : void 0) {
                    for (s = 0, u = []; s < this.bindings[n].length;) a = this.bindings[n][s], r = a.handler, e = a.ctx, i = a.once, r.apply(null != e ? e : this, t), i ? u.push(this.bindings[n].splice(s, 1)) : u.push(s++);
                    return u
                }
            }, t
        }(), l = window.Pace || {}, window.Pace = l, x(l, o.prototype), j = l.options = x({}, b, window.paceOptions, k()), G = ["ajax", "document", "eventLag", "elements"], D = 0, z = G.length; D < z; D++) F = G[D], j[F] === !0 && (j[F] = b[F]);
    u = function(t) {
        function e() {
            return J = e.__super__.constructor.apply(this, arguments)
        }
        return Y(e, t), e
    }(Error), e = function() {
        function t() {
            this.progress = 0
        }
        return t.prototype.getElement = function() {
            var t;
            if (null == this.el) {
                if (t = document.querySelector(j.target), !t) throw new u;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress"><div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';
                var e = document.getElementById("ltx-preloader");
                e && (this.el.innerHTML += '<div class="ltx-theme-loader"><div class="ltx-loding-animation-holder"><div class="ltx-loading-animator"></div><div class="ltx-loading-animator"></div><div class="ltx-loading-animator"></div><div class="ltx-loading-animator"></div><div class="ltx-middle"></div></div></div>'), this.el.innerHTML += '<div class="pace-image"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el)
            }
            return this.el
        }, t.prototype.finish = function() {
            var t;
            return t = this.getElement(), t.className = t.className.replace("pace-active", ""), t.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, t.prototype.update = function(t) {
            return this.progress = t, this.render()
        }, t.prototype.destroy = function() {
            try {
                this.getElement().parentNode.removeChild(this.getElement())
            } catch (t) {
                u = t
            }
            return this.el = void 0
        }, t.prototype.render = function() {
            var t, e, n, r, s, i, o;
            if (null == document.querySelector(j.target)) return !1;
            for (t = this.getElement(), r = "translate3d(" + this.progress + "%, 0, 0)", o = ["webkitTransform", "msTransform", "transform"], s = 0, i = o.length; s < i; s++) e = o[s], t.children[0].style[e] = r;
            return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + n)), this.lastRenderedProgress = this.progress
        }, t.prototype.done = function() {
            return this.progress >= 100
        }, t
    }(), a = function() {
        function t() {
            this.bindings = {}
        }
        return t.prototype.trigger = function(t, e) {
            var n, r, s, i, o;
            if (null != this.bindings[t]) {
                for (i = this.bindings[t], o = [], r = 0, s = i.length; r < s; r++) n = i[r], o.push(n.call(this, e));
                return o
            }
        }, t.prototype.on = function(t, e) {
            var n;
            return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e)
        }, t
    }(), W = window.XMLHttpRequest, X = window.XDomainRequest, H = window.WebSocket, S = function(t, e) {
        var n, r, s;
        s = [];
        for (r in e.prototype) try {
            null == t[r] && "function" != typeof e[r] ? "function" == typeof Object.defineProperty ? s.push(Object.defineProperty(t, r, {
                get: function() {
                    return e.prototype[r]
                },
                configurable: !0,
                enumerable: !0
            })) : s.push(t[r] = e.prototype[r]) : s.push(void 0)
        } catch (i) {
            n = i
        }
        return s
    }, T = [], l.ignore = function() {
        var t, e, n;
        return e = arguments[0], t = 2 <= arguments.length ? Q.call(arguments, 1) : [], T.unshift("ignore"), n = e.apply(null, t), T.shift(), n
    }, l.track = function() {
        var t, e, n;
        return e = arguments[0], t = 2 <= arguments.length ? Q.call(arguments, 1) : [], T.unshift("track"), n = e.apply(null, t), T.shift(), n
    }, _ = function(t) {
        var e;
        if (null == t && (t = "GET"), "track" === T[0]) return "force";
        if (!T.length && j.ajax) {
            if ("socket" === t && j.ajax.trackWebSockets) return !0;
            if (e = t.toUpperCase(), Z.call(j.ajax.trackMethods, e) >= 0) return !0
        }
        return !1
    }, c = function(t) {
        function e() {
            var t, n = this;
            e.__super__.constructor.apply(this, arguments), t = function(t) {
                var e;
                return e = t.open, t.open = function(r, s, i) {
                    return _(r) && n.trigger("request", {
                        type: r,
                        url: s,
                        request: t
                    }), e.apply(t, arguments)
                }
            }, window.XMLHttpRequest = function(e) {
                var n;
                return n = new W(e), t(n), n
            };
            try {
                S(window.XMLHttpRequest, W)
            } catch (r) {}
            if (null != X) {
                window.XDomainRequest = function() {
                    var e;
                    return e = new X, t(e), e
                };
                try {
                    S(window.XDomainRequest, X)
                } catch (r) {}
            }
            if (null != H && j.ajax.trackWebSockets) {
                window.WebSocket = function(t, e) {
                    var r;
                    return r = null != e ? new H(t, e) : new H(t), _("socket") && n.trigger("request", {
                        type: "socket",
                        url: t,
                        protocols: e,
                        request: r
                    }), r
                };
                try {
                    S(window.WebSocket, H)
                } catch (r) {}
            }
        }
        return Y(e, t), e
    }(a), I = null, q = function() {
        return null == I && (I = new c), I
    }, N = function(t) {
        var e, n, r, s;
        for (s = j.ajax.ignoreURLs, n = 0, r = s.length; n < r; n++)
            if (e = s[n], "string" == typeof e) {
                if (t.indexOf(e) !== -1) return !0
            } else if (e.test(t)) return !0;
        return !1
    }, q().on("request", function(e) {
        var n, r, s, i, o;
        if (i = e.type, s = e.request, o = e.url, !N(o)) return l.running || j.restartOnRequestAfter === !1 && "force" !== _(i) ? void 0 : (r = arguments, n = j.restartOnRequestAfter || 0, "boolean" == typeof n && (n = 0), setTimeout(function() {
            var e, n, o, a, u, c;
            if (e = "socket" === i ? s.readyState < 2 : 0 < (a = s.readyState) && a < 4) {
                for (l.restart(), u = l.sources, c = [], n = 0, o = u.length; n < o; n++) {
                    if (F = u[n], F instanceof t) {
                        F.watch.apply(F, r);
                        break
                    }
                    c.push(void 0)
                }
                return c
            }
        }, n))
    }), t = function() {
        function t() {
            var t = this;
            this.elements = [], q().on("request", function() {
                return t.watch.apply(t, arguments)
            })
        }
        return t.prototype.watch = function(t) {
            var e, n, r, s;
            if (r = t.type, e = t.request, s = t.url, !N(s)) return n = "socket" === r ? new d(e) : new f(e), this.elements.push(n)
        }, t
    }(), f = function() {
        function t(t) {
            var e, n, r, s, i, o, a = this;
            if (this.progress = 0, null != window.ProgressEvent)
                for (n = null, t.addEventListener("progress", function(t) {
                        return t.lengthComputable ? a.progress = 100 * t.loaded / t.total : a.progress = a.progress + (100 - a.progress) / 2
                    }, !1), o = ["load", "abort", "timeout", "error"], r = 0, s = o.length; r < s; r++) e = o[r], t.addEventListener(e, function() {
                    return a.progress = 100
                }, !1);
            else i = t.onreadystatechange, t.onreadystatechange = function() {
                var e;
                return 0 === (e = t.readyState) || 4 === e ? a.progress = 100 : 3 === t.readyState && (a.progress = 50), "function" == typeof i ? i.apply(null, arguments) : void 0
            }
        }
        return t
    }(), d = function() {
        function t(t) {
            var e, n, r, s, i = this;
            for (this.progress = 0, s = ["error", "open"], n = 0, r = s.length; n < r; n++) e = s[n], t.addEventListener(e, function() {
                return i.progress = 100
            }, !1)
        }
        return t
    }(), r = function() {
        function t(t) {
            var e, n, r, i;
            for (null == t && (t = {}), this.elements = [], null == t.selectors && (t.selectors = []), i = t.selectors, n = 0, r = i.length; n < r; n++) e = i[n], this.elements.push(new s(e))
        }
        return t
    }(), s = function() {
        function t(t) {
            this.selector = t, this.progress = 0, this.check()
        }
        return t.prototype.check = function() {
            var t = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                return t.check()
            }, j.elements.checkInterval)
        }, t.prototype.done = function() {
            return this.progress = 100
        }, t
    }(), n = function() {
        function t() {
            var t, e, n = this;
            this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function() {
                return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0
            }
        }
        return t.prototype.states = {
            loading: 0,
            interactive: 50,
            complete: 100
        }, t
    }(), i = function() {
        function t() {
            var t, e, n, r, s, i = this;
            this.progress = 0, t = 0, s = [], r = 0, n = R(), e = setInterval(function() {
                var o;
                return o = R() - n - 50, n = R(), s.push(o), s.length > j.eventLag.sampleCount && s.shift(), t = m(s), ++r >= j.eventLag.minSamples && t < j.eventLag.lagThreshold ? (i.progress = 100, clearInterval(e)) : i.progress = 100 * (3 / (t + 3))
            }, 50)
        }
        return t
    }(), h = function() {
        function t(t) {
            this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = j.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = M(this.source, "progress"))
        }
        return t.prototype.tick = function(t, e) {
            var n;
            return null == e && (e = M(this.source, "progress")), e >= 100 && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / j.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), n = 1 - Math.pow(this.progress / 100, j.easeFactor), this.progress += n * this.rate * t, this.progress = Math.min(this.lastProgress + j.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, t
    }(), C = null, A = null, y = null, U = null, g = null, v = null, l.running = !1, L = function() {
        if (j.restartOnPushState) return l.restart()
    }, null != window.history.pushState && (B = window.history.pushState, window.history.pushState = function() {
        return L(), B.apply(window.history, arguments)
    }), null != window.history.replaceState && (K = window.history.replaceState, window.history.replaceState = function() {
        return L(), K.apply(window.history, arguments)
    }), p = {
        ajax: t,
        elements: r,
        document: n,
        eventLag: i
    }, (P = function() {
        var t, n, r, s, i, o, a, u;
        for (l.sources = C = [], o = ["ajax", "elements", "document", "eventLag"], n = 0, s = o.length; n < s; n++) t = o[n], j[t] !== !1 && C.push(new p[t](j[t]));
        for (u = null != (a = j.extraSources) ? a : [], r = 0, i = u.length; r < i; r++) F = u[r], C.push(new F(j));
        return l.bar = y = new e, A = [], U = new h
    })(), l.stop = function() {
        return l.trigger("stop"), l.running = !1, y.destroy(), v = !0, null != g && ("function" == typeof w && w(g), g = null), P()
    }, l.restart = function() {
        return l.trigger("restart"), l.stop(), l.start()
    }, l.go = function() {
        var t;
        return l.running = !0, y.render(), t = R(), v = !1, g = O(function(e, n) {
            var r, s, i, o, a, u, c, p, d, f, g, m, w, b, x, S;
            for (p = 100 - y.progress, s = g = 0, i = !0, u = m = 0, b = C.length; m < b; u = ++m)
                for (F = C[u], f = null != A[u] ? A[u] : A[u] = [], a = null != (S = F.elements) ? S : [F], c = w = 0, x = a.length; w < x; c = ++w) o = a[c], d = null != f[c] ? f[c] : f[c] = new h(o), i &= d.done, d.done || (s++, g += d.tick(e));
            return r = g / s, y.update(U.tick(e, r)), y.done() || i || v ? (y.update(100), l.trigger("done"), setTimeout(function() {
                return y.finish(), l.running = !1, l.trigger("hide")
            }, Math.max(j.ghostTime, Math.max(j.minTime - (R() - t), 0)))) : n()
        })
    }, l.start = function(t) {
        x(j, t), l.running = !0;
        try {
            y.render()
        } catch (e) {
            u = e
        }
        return document.querySelector(".pace") ? (l.trigger("start"), l.go()) : setTimeout(l.start, 50)
    }, "function" == typeof define && define.amd ? define(["pace"], function() {
        return l
    }) : "object" == typeof exports ? module.exports = l : j.startOnPageLoad && l.start()
}).call(this);