! function() {
    var t;
    ! function() {
        var e = !1,
            i = /xyz/.test(function() {
                window.postMessage("xyz")
            }) ? /\b_super\b/ : /.*/;
        return t = function() {}, t.extend = function s(t) {
            function r() {
                !e && this.init && this.init.apply(this, arguments)
            }
            var n = this.prototype;
            e = !0;
            var o = new this;
            e = !1;
            for (var a in t) o[a] = "function" == typeof t[a] && "function" == typeof n[a] && i.test(t[a]) ? function(t, e) {
                return function() {
                    var i = this._super;
                    this._super = n[t];
                    var s = e.apply(this, arguments);
                    return this._super = i, s
                }
            }(a, t[a]) : t[a];
            return r.prototype = o, r.prototype.constructor = r, r.extend = s, r
        }, t
    }(),
    function() {
        function t(t, e) {
            e = e || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i
        }
        t.prototype = window.Event.prototype, window.CustomEvent = t
    }(),
    function() {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e, i) {
            var s = (new Date).getTime(),
                r = Math.max(0, 16 - (s - t)),
                n = window.setTimeout(function() {
                    e(s + r)
                }, r);
            return t = s + r, n
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(),
    function() {
        Array.isArray || (Array.isArray = function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        })
    }();
    var e = function(t) {
            return !("object" != typeof t || t.nodeType || null !== t && t === t.window || t.constructor && !Object.prototype.hasOwnProperty.call(t.constructor.prototype, "isPrototypeOf"))
        },
        i = function(t) {
            var s, r, n;
            for (r = 1; r < arguments.length; r++) {
                s = arguments[r];
                for (n in s) s.hasOwnProperty(n) && (s[n] && e(s[n]) ? (t.hasOwnProperty(n) || (t[n] = {}), i(t[n], s[n])) : t[n] = s[n])
            }
            return t
        },
        s = function(t, e) {
            if (t && "object" == typeof t) {
                var i;
                if (Array.isArray(t) || "number" == typeof t.length && t.length > 0 && t.length - 1 in t) {
                    for (i = 0; i < t.length; i++)
                        if (e(i, t[i]) === !1) return
                } else if (Object.keys) {
                    var s = Object.keys(t);
                    for (i = 0; i < s.length; i++)
                        if (e(s[i], t[s[i]]) === !1) return
                } else
                    for (i in t)
                        if (t.hasOwnProperty(i) && e(i, t[i]) === !1) return
            }
        },
        r = function(t, e) {
            var i = document.createEvent("HTMLEvents");
            i.initEvent(e, !0, !0), t.dispatchEvent(i)
        },
        n = function(t, e) {
            if (!(t instanceof Element)) throw new Error("element should be an instance of Element");
            e = i({}, n.defaults.options, e || {}), this.element = t, this.options = e, this.init()
        };
    n.prototype = {
        constructor: n,
        init: function() {
            var t = this;
            this.ready = !1;
            var e = n.defaults.themes[this.options.theme || n.defaults.theme];
            if (!e) throw "Unknown theme " + (this.options.theme || n.defaults.theme);
            this.schema = this.options.schema, this.theme = new e, this.template = this.options.template, this.refs = this.options.refs || {}, this.uuid = 0, this.__data = {};
            var i = n.defaults.iconlibs[this.options.iconlib || n.defaults.iconlib];
            i && (this.iconlib = new i), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.translate = this.options.translate || n.defaults.translate, this._loadExternalRefs(this.schema, function() {
                t._getDefinitions(t.schema);
                var e = {};
                t.options.custom_validators && (e.custom_validators = t.options.custom_validators), t.validator = new n.Validator(t, null, e);
                var i = t.getEditorClass(t.schema);
                t.root = t.createEditor(i, {
                    jsoneditor: t,
                    schema: t.schema,
                    required: !0,
                    container: t.root_container
                }), t.root.preBuild(), t.root.build(), t.root.postBuild(), t.options.startval && t.root.setValue(t.options.startval), t.validation_results = t.validator.validate(t.root.getValue()), t.root.showValidationErrors(t.validation_results), t.ready = !0, window.requestAnimationFrame(function() {
                    t.ready && (t.validation_results = t.validator.validate(t.root.getValue()), t.root.showValidationErrors(t.validation_results), t.trigger("ready"), t.trigger("change"))
                })
            })
        },
        getValue: function() {
            if (!this.ready) throw "Editor not ready yet.  Listen for 'ready' event before getting the value";
            return this.root.getValue()
        },
        setValue: function(t) {
            if (!this.ready) throw "Editor not ready yet.  Listen for 'ready' event before setting the value";
            return this.root.setValue(t), this
        },
        validate: function(t) {
            if (!this.ready) throw "Editor not ready yet.  Listen for 'ready' event before validating";
            return 1 === arguments.length ? this.validator.validate(t) : this.validation_results
        },
        destroy: function() {
            this.destroyed || this.ready && (this.schema = null, this.options = null, this.root.destroy(), this.root = null, this.root_container = null, this.validator = null, this.validation_results = null, this.theme = null, this.iconlib = null, this.template = null, this.__data = null, this.ready = !1, this.element.innerHTML = "", this.destroyed = !0)
        },
        on: function(t, e) {
            return this.callbacks = this.callbacks || {}, this.callbacks[t] = this.callbacks[t] || [], this.callbacks[t].push(e), this
        },
        off: function(t, e) {
            if (t && e) {
                this.callbacks = this.callbacks || {}, this.callbacks[t] = this.callbacks[t] || [];
                for (var i = [], s = 0; s < this.callbacks[t].length; s++) this.callbacks[t][s] !== e && i.push(this.callbacks[t][s]);
                this.callbacks[t] = i
            } else t ? (this.callbacks = this.callbacks || {}, this.callbacks[t] = []) : this.callbacks = {};
            return this
        },
        trigger: function(t) {
            if (this.callbacks && this.callbacks[t] && this.callbacks[t].length)
                for (var e = 0; e < this.callbacks[t].length; e++) this.callbacks[t][e]();
            return this
        },
        setOption: function(t, e) {
            if ("show_errors" !== t) throw "Option " + t + " must be set during instantiation and cannot be changed later";
            return this.options.show_errors = e, this.onChange(), this
        },
        getEditorClass: function(t) {
            var e;
            if (t = this.expandSchema(t), s(n.defaults.resolvers, function(i, s) {
                    var r = s(t);
                    return r && n.defaults.editors[r] ? (e = r, !1) : void 0
                }), !e) throw "Unknown editor for schema " + JSON.stringify(t);
            if (!n.defaults.editors[e]) throw "Unknown editor " + e;
            return n.defaults.editors[e]
        },
        createEditor: function(t, e) {
            return e = i({}, t.options || {}, e), new t(e)
        },
        onChange: function() {
            if (this.ready && !this.firing_change) {
                this.firing_change = !0;
                var t = this;
                return window.requestAnimationFrame(function() {
                    t.firing_change = !1, t.ready && (t.validation_results = t.validator.validate(t.root.getValue()), "never" !== t.options.show_errors ? t.root.showValidationErrors(t.validation_results) : t.root.showValidationErrors([]), t.trigger("change"))
                }), this
            }
        },
        compileTemplate: function(t, e) {
            e = e || n.defaults.template;
            var i;
            if ("string" == typeof e) {
                if (!n.defaults.templates[e]) throw "Unknown template engine " + e;
                if (i = n.defaults.templates[e](), !i) throw "Template engine " + e + " missing required library."
            } else i = e;
            if (!i) throw "No template engine set";
            if (!i.compile) throw "Invalid template engine set";
            return i.compile(t)
        },
        _data: function(t, e, i) {
            if (3 !== arguments.length) return t.hasAttribute("data-jsoneditor-" + e) ? this.__data[t.getAttribute("data-jsoneditor-" + e)] : null;
            var s;
            t.hasAttribute("data-jsoneditor-" + e) ? s = t.getAttribute("data-jsoneditor-" + e) : (s = this.uuid++, t.setAttribute("data-jsoneditor-" + e, s)), this.__data[s] = i
        },
        registerEditor: function(t) {
            return this.editors = this.editors || {}, this.editors[t.path] = t, this
        },
        unregisterEditor: function(t) {
            return this.editors = this.editors || {}, this.editors[t.path] = null, this
        },
        getEditor: function(t) {
            return this.editors ? this.editors[t] : void 0
        },
        watch: function(t, e) {
            return this.watchlist = this.watchlist || {}, this.watchlist[t] = this.watchlist[t] || [], this.watchlist[t].push(e), this
        },
        unwatch: function(t, e) {
            if (!this.watchlist || !this.watchlist[t]) return this;
            if (!e) return this.watchlist[t] = null, this;
            for (var i = [], s = 0; s < this.watchlist[t].length; s++) this.watchlist[t][s] !== e && i.push(this.watchlist[t][s]);
            return this.watchlist[t] = i.length ? i : null, this
        },
        notifyWatchers: function(t) {
            if (!this.watchlist || !this.watchlist[t]) return this;
            for (var e = 0; e < this.watchlist[t].length; e++) this.watchlist[t][e]()
        },
        isEnabled: function() {
            return !this.root || this.root.isEnabled()
        },
        enable: function() {
            this.root.enable()
        },
        disable: function() {
            this.root.disable()
        },
        _getDefinitions: function(t, e) {
            if (e = e || "#/definitions/", t.definitions)
                for (var i in t.definitions) t.definitions.hasOwnProperty(i) && (this.refs[e + i] = t.definitions[i], t.definitions[i].definitions && this._getDefinitions(t.definitions[i], e + i + "/definitions/"))
        },
        _getExternalRefs: function(t) {
            var e = {},
                i = function(t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = !0)
                };
            t.$ref && "object" != typeof t.$ref && "#" !== t.$ref.substr(0, 1) && !this.refs[t.$ref] && (e[t.$ref] = !0);
            for (var s in t)
                if (t.hasOwnProperty(s))
                    if (t[s] && "object" == typeof t[s] && Array.isArray(t[s]))
                        for (var r = 0; r < t[s].length; r++) "object" == typeof t[s][r] && i(this._getExternalRefs(t[s][r]));
                    else t[s] && "object" == typeof t[s] && i(this._getExternalRefs(t[s]));
            return e
        },
        _loadExternalRefs: function(t, e) {
            var i = this,
                r = this._getExternalRefs(t),
                n = 0,
                o = 0,
                a = !1;
            s(r, function(t) {
                if (!i.refs[t]) {
                    if (!i.options.ajax) throw "Must set ajax option to true to load external ref " + t;
                    i.refs[t] = "loading", o++;
                    var s = new XMLHttpRequest;
                    s.open("GET", t, !0), s.onreadystatechange = function() {
                        if (4 == s.readyState) {
                            if (200 !== s.status) throw window.console.log(s), "Failed to fetch ref via ajax- " + t;
                            var r;
                            try {
                                r = JSON.parse(s.responseText)
                            } catch (l) {
                                throw window.console.log(l), "Failed to parse external ref " + t
                            }
                            if (!r || "object" != typeof r) throw "External ref does not contain a valid schema - " + t;
                            i.refs[t] = r, i._loadExternalRefs(r, function() {
                                n++, n >= o && !a && (a = !0, e())
                            })
                        }
                    }, s.send()
                }
            }), o || e()
        },
        expandRefs: function(t) {
            for (t = i({}, t); t.$ref;) {
                var e = t.$ref;
                delete t.$ref, this.refs[e] || (e = decodeURIComponent(e)), t = this.extendSchemas(t, this.refs[e])
            }
            return t
        },
        expandSchema: function(t) {
            var e, r = this,
                n = i({}, t);
            if ("object" == typeof t.type && (Array.isArray(t.type) ? s(t.type, function(e, i) {
                    "object" == typeof i && (t.type[e] = r.expandSchema(i))
                }) : t.type = r.expandSchema(t.type)), "object" == typeof t.disallow && (Array.isArray(t.disallow) ? s(t.disallow, function(e, i) {
                    "object" == typeof i && (t.disallow[e] = r.expandSchema(i))
                }) : t.disallow = r.expandSchema(t.disallow)), t.anyOf && s(t.anyOf, function(e, i) {
                    t.anyOf[e] = r.expandSchema(i)
                }), t.dependencies && s(t.dependencies, function(e, i) {
                    "object" != typeof i || Array.isArray(i) || (t.dependencies[e] = r.expandSchema(i))
                }), t.not && (t.not = this.expandSchema(t.not)), t.allOf) {
                for (e = 0; e < t.allOf.length; e++) n = this.extendSchemas(n, this.expandSchema(t.allOf[e]));
                delete n.allOf
            }
            if (t["extends"]) {
                if (Array.isArray(t["extends"]))
                    for (e = 0; e < t["extends"].length; e++) n = this.extendSchemas(n, this.expandSchema(t["extends"][e]));
                else n = this.extendSchemas(n, this.expandSchema(t["extends"]));
                delete n["extends"]
            }
            if (t.oneOf) {
                var o = i({}, n);
                for (delete o.oneOf, e = 0; e < t.oneOf.length; e++) n.oneOf[e] = this.extendSchemas(this.expandSchema(t.oneOf[e]), o)
            }
            return this.expandRefs(n)
        },
        extendSchemas: function(t, e) {
            t = i({}, t), e = i({}, e);
            var r = this,
                n = {};
            return s(t, function(t, i) {
                "undefined" != typeof e[t] ? "required" !== t && "defaultProperties" !== t || "object" != typeof i || !Array.isArray(i) ? "type" !== t || "string" != typeof i && !Array.isArray(i) ? "object" == typeof i && Array.isArray(i) ? n[t] = i.filter(function(i) {
                    return -1 !== e[t].indexOf(i)
                }) : "object" == typeof i && null !== i ? n[t] = r.extendSchemas(i, e[t]) : n[t] = i : ("string" == typeof i && (i = [i]), "string" == typeof e.type && (e.type = [e.type]), e.type && e.type.length ? n.type = i.filter(function(t) {
                    return -1 !== e.type.indexOf(t)
                }) : n.type = i, 1 === n.type.length && "string" == typeof n.type[0] ? n.type = n.type[0] : 0 === n.type.length && delete n.type) : n[t] = i.concat(e[t]).reduce(function(t, e) {
                    return t.indexOf(e) < 0 && t.push(e), t
                }, []) : n[t] = i
            }), s(e, function(e, i) {
                "undefined" == typeof t[e] && (n[e] = i)
            }), n
        }
    }, n.defaults = {
        themes: {},
        templates: {},
        iconlibs: {},
        editors: {},
        languages: {},
        resolvers: [],
        custom_validators: []
    }, n.Validator = t.extend({
        init: function(t, e, i) {
            this.jsoneditor = t, this.schema = e || this.jsoneditor.schema, this.options = i || {}, this.translate = this.jsoneditor.translate || n.defaults.translate
        },
        validate: function(t) {
            return this._validateSchema(this.schema, t)
        },
        _validateSchema: function(t, e, r) {
            var o, a, l, h = this,
                d = [],
                u = JSON.stringify(e);
            if (r = r || "root", t = i({}, this.jsoneditor.expandRefs(t)), t.required && t.required === !0) {
                if ("undefined" == typeof e) return d.push({
                    path: r,
                    property: "required",
                    message: this.translate("error_notset")
                }), d
            } else if ("undefined" == typeof e) {
                if (!this.jsoneditor.options.required_by_default) return d;
                d.push({
                    path: r,
                    property: "required",
                    message: this.translate("error_notset")
                })
            }
            if (t["enum"]) {
                for (o = !1, a = 0; a < t["enum"].length; a++) u === JSON.stringify(t["enum"][a]) && (o = !0);
                o || d.push({
                    path: r,
                    property: "enum",
                    message: this.translate("error_enum")
                })
            }
            if (t["extends"])
                for (a = 0; a < t["extends"].length; a++) d = d.concat(this._validateSchema(t["extends"][a], e, r));
            if (t.allOf)
                for (a = 0; a < t.allOf.length; a++) d = d.concat(this._validateSchema(t.allOf[a], e, r));
            if (t.anyOf) {
                for (o = !1, a = 0; a < t.anyOf.length; a++)
                    if (!this._validateSchema(t.anyOf[a], e, r).length) {
                        o = !0;
                        break
                    }
                o || d.push({
                    path: r,
                    property: "anyOf",
                    message: this.translate("error_anyOf")
                })
            }
            if (t.oneOf) {
                o = 0;
                var c = [];
                for (a = 0; a < t.oneOf.length; a++) {
                    var p = this._validateSchema(t.oneOf[a], e, r);
                    for (p.length || o++, l = 0; l < p.length; l++) p[l].path = r + ".oneOf[" + a + "]" + p[l].path.substr(r.length);
                    c = c.concat(p)
                }
                1 !== o && (d.push({
                    path: r,
                    property: "oneOf",
                    message: this.translate("error_oneOf", [o])
                }), d = d.concat(c))
            }
            if (t.not && (this._validateSchema(t.not, e, r).length || d.push({
                    path: r,
                    property: "not",
                    message: this.translate("error_not")
                })), t.type)
                if (Array.isArray(t.type)) {
                    for (o = !1, a = 0; a < t.type.length; a++)
                        if (this._checkType(t.type[a], e)) {
                            o = !0;
                            break
                        }
                    o || d.push({
                        path: r,
                        property: "type",
                        message: this.translate("error_type_union")
                    })
                } else this._checkType(t.type, e) || d.push({
                    path: r,
                    property: "type",
                    message: this.translate("error_type", [t.type])
                });
            if (t.disallow)
                if (Array.isArray(t.disallow)) {
                    for (o = !0, a = 0; a < t.disallow.length; a++)
                        if (this._checkType(t.disallow[a], e)) {
                            o = !1;
                            break
                        }
                    o || d.push({
                        path: r,
                        property: "disallow",
                        message: this.translate("error_disallow_union")
                    })
                } else this._checkType(t.disallow, e) && d.push({
                    path: r,
                    property: "disallow",
                    message: this.translate("error_disallow", [t.disallow])
                });
            if ("number" == typeof e) {
                if (t.multipleOf || t.divisibleBy) {
                    var m = t.multipleOf || t.divisibleBy;
                    o = e / m === Math.floor(e / m), window.math ? o = window.math.mod(window.math.bignumber(e), window.math.bignumber(m)).equals(0) : window.Decimal && (o = new window.Decimal(e).mod(new window.Decimal(m)).equals(0)), o || d.push({
                        path: r,
                        property: t.multipleOf ? "multipleOf" : "divisibleBy",
                        message: this.translate("error_multipleOf", [m])
                    })
                }
                t.hasOwnProperty("maximum") && (o = t.exclusiveMaximum ? e < t.maximum : e <= t.maximum, window.math ? o = window.math[t.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(e), window.math.bignumber(t.maximum)) : window.Decimal && (o = new window.Decimal(e)[t.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(t.maximum))), o || d.push({
                    path: r,
                    property: "maximum",
                    message: this.translate(t.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [t.maximum])
                })), t.hasOwnProperty("minimum") && (o = t.exclusiveMinimum ? e > t.minimum : e >= t.minimum, window.math ? o = window.math[t.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(e), window.math.bignumber(t.minimum)) : window.Decimal && (o = new window.Decimal(e)[t.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(t.minimum))), o || d.push({
                    path: r,
                    property: "minimum",
                    message: this.translate(t.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [t.minimum])
                }))
            } else if ("string" == typeof e) t.maxLength && (e + "").length > t.maxLength && d.push({
                path: r,
                property: "maxLength",
                message: this.translate("error_maxLength", [t.maxLength])
            }), t.minLength && (e + "").length < t.minLength && d.push({
                path: r,
                property: "minLength",
                message: this.translate(1 === t.minLength ? "error_notempty" : "error_minLength", [t.minLength])
            }), t.pattern && (new RegExp(t.pattern).test(e) || d.push({
                path: r,
                property: "pattern",
                message: this.translate("error_pattern", [t.pattern])
            }));
            else if ("object" == typeof e && null !== e && Array.isArray(e)) {
                if (t.items)
                    if (Array.isArray(t.items))
                        for (a = 0; a < e.length; a++)
                            if (t.items[a]) d = d.concat(this._validateSchema(t.items[a], e[a], r + "." + a));
                            else {
                                if (t.additionalItems === !0) break;
                                if (!t.additionalItems) {
                                    if (t.additionalItems === !1) {
                                        d.push({
                                            path: r,
                                            property: "additionalItems",
                                            message: this.translate("error_additionalItems")
                                        });
                                        break
                                    }
                                    break
                                }
                                d = d.concat(this._validateSchema(t.additionalItems, e[a], r + "." + a))
                            } else
                    for (a = 0; a < e.length; a++) d = d.concat(this._validateSchema(t.items, e[a], r + "." + a));
                if (t.maxItems && e.length > t.maxItems && d.push({
                        path: r,
                        property: "maxItems",
                        message: this.translate("error_maxItems", [t.maxItems])
                    }), t.minItems && e.length < t.minItems && d.push({
                        path: r,
                        property: "minItems",
                        message: this.translate("error_minItems", [t.minItems])
                    }), t.uniqueItems) {
                    var f = {};
                    for (a = 0; a < e.length; a++) {
                        if (o = JSON.stringify(e[a]), f[o]) {
                            d.push({
                                path: r,
                                property: "uniqueItems",
                                message: this.translate("error_uniqueItems")
                            });
                            break
                        }
                        f[o] = !0
                    }
                }
            } else if ("object" == typeof e && null !== e) {
                if (t.maxProperties) {
                    o = 0;
                    for (a in e) e.hasOwnProperty(a) && o++;
                    o > t.maxProperties && d.push({
                        path: r,
                        property: "maxProperties",
                        message: this.translate("error_maxProperties", [t.maxProperties])
                    })
                }
                if (t.minProperties) {
                    o = 0;
                    for (a in e) e.hasOwnProperty(a) && o++;
                    o < t.minProperties && d.push({
                        path: r,
                        property: "minProperties",
                        message: this.translate("error_minProperties", [t.minProperties])
                    })
                }
                if (t.required && Array.isArray(t.required))
                    for (a = 0; a < t.required.length; a++) "undefined" == typeof e[t.required[a]] && d.push({
                        path: r,
                        property: "required",
                        message: this.translate("error_required", [t.required[a]])
                    });
                var g = {};
                if (t.properties)
                    for (a in t.properties) t.properties.hasOwnProperty(a) && (g[a] = !0, d = d.concat(this._validateSchema(t.properties[a], e[a], r + "." + a)));
                if (t.patternProperties)
                    for (a in t.patternProperties)
                        if (t.patternProperties.hasOwnProperty(a)) {
                            var v = new RegExp(a);
                            for (l in e) e.hasOwnProperty(l) && v.test(l) && (g[l] = !0, d = d.concat(this._validateSchema(t.patternProperties[a], e[l], r + "." + l)))
                        }
                if ("undefined" != typeof t.additionalProperties || !this.jsoneditor.options.no_additional_properties || t.oneOf || t.anyOf || (t.additionalProperties = !1), "undefined" != typeof t.additionalProperties)
                    for (a in e)
                        if (e.hasOwnProperty(a) && !g[a]) {
                            if (!t.additionalProperties) {
                                d.push({
                                    path: r,
                                    property: "additionalProperties",
                                    message: this.translate("error_additional_properties", [a])
                                });
                                break
                            }
                            if (t.additionalProperties === !0) break;
                            d = d.concat(this._validateSchema(t.additionalProperties, e[a], r + "." + a))
                        }
                if (t.dependencies)
                    for (a in t.dependencies)
                        if (t.dependencies.hasOwnProperty(a) && "undefined" != typeof e[a])
                            if (Array.isArray(t.dependencies[a]))
                                for (l = 0; l < t.dependencies[a].length; l++) "undefined" == typeof e[t.dependencies[a][l]] && d.push({
                                    path: r,
                                    property: "dependencies",
                                    message: this.translate("error_dependency", [t.dependencies[a][l]])
                                });
                            else d = d.concat(this._validateSchema(t.dependencies[a], e, r))
            }
            return s(n.defaults.custom_validators, function(i, s) {
                d = d.concat(s.call(h, t, e, r))
            }), this.options.custom_validators && s(this.options.custom_validators, function(i, s) {
                d = d.concat(s.call(h, t, e, r))
            }), d
        },
        _checkType: function(t, e) {
            return "string" == typeof t ? "string" === t ? "string" == typeof e : "number" === t ? "number" == typeof e : "integer" === t ? "number" == typeof e && e === Math.floor(e) : "boolean" === t ? "boolean" == typeof e : "array" === t ? Array.isArray(e) : "object" === t ? null !== e && !Array.isArray(e) && "object" == typeof e : "null" !== t || null === e : !this._validateSchema(t, e).length
        }
    }), n.AbstractEditor = t.extend({
        onChildEditorChange: function(t) {
            this.onChange(!0)
        },
        notify: function() {
            this.jsoneditor.notifyWatchers(this.path)
        },
        change: function() {
            this.parent ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange()
        },
        onChange: function(t) {
            this.notify(), this.watch_listener && this.watch_listener(), t && this.change()
        },
        register: function() {
            this.jsoneditor.registerEditor(this), this.onChange()
        },
        unregister: function() {
            this.jsoneditor && this.jsoneditor.unregisterEditor(this)
        },
        getNumColumns: function() {
            return 12
        },
        init: function(t) {
            this.jsoneditor = t.jsoneditor, this.theme = this.jsoneditor.theme, this.template_engine = this.jsoneditor.template, this.iconlib = this.jsoneditor.iconlib, this.translate = this.jsoneditor.translate || n.defaults.translate, this.original_schema = t.schema, this.schema = this.jsoneditor.expandSchema(this.original_schema), this.options = i({}, this.options || {}, t.schema.options || {}, t), t.path || this.schema.id || (this.schema.id = "root"), this.path = t.path || "root", this.formname = t.formname || this.path.replace(/\.([^.]+)/g, "[$1]"), this.jsoneditor.options.form_name_root && (this.formname = this.formname.replace(/^root\[/, this.jsoneditor.options.form_name_root + "[")), this.key = this.path.split(".").pop(), this.parent = t.parent, this.link_watchers = [], t.container && this.setContainer(t.container)
        },
        setContainer: function(t) {
            this.container = t, this.schema.id && this.container.setAttribute("data-schemaid", this.schema.id), this.schema.type && "string" == typeof this.schema.type && this.container.setAttribute("data-schematype", this.schema.type), this.container.setAttribute("data-schemapath", this.path)
        },
        preBuild: function() {},
        build: function() {},
        postBuild: function() {
            this.setupWatchListeners(), this.addLinks(), this.setValue(this.getDefault(), !0), this.updateHeaderText(), this.register(), this.onWatchedFieldChange()
        },
        setupWatchListeners: function() {
            var t = this;
            if (this.watched = {}, this.schema.vars && (this.schema.watch = this.schema.vars), this.watched_values = {}, this.watch_listener = function() {
                    t.refreshWatchedFieldValues() && t.onWatchedFieldChange()
                }, this.register(), this.schema.hasOwnProperty("watch")) {
                var e, i, s, r, n;
                for (var o in this.schema.watch)
                    if (this.schema.watch.hasOwnProperty(o)) {
                        if (e = this.schema.watch[o], Array.isArray(e)) {
                            if (e.length < 2) continue;
                            i = [e[0]].concat(e[1].split("."))
                        } else i = e.split("."), t.theme.closest(t.container, '[data-schemaid="' + i[0] + '"]') || i.unshift("#");
                        if (s = i.shift(), "#" === s && (s = t.jsoneditor.schema.id || "root"), r = t.theme.closest(t.container, '[data-schemaid="' + s + '"]'), !r) throw "Could not find ancestor node with id " + s;
                        n = r.getAttribute("data-schemapath") + "." + i.join("."), t.jsoneditor.watch(n, t.watch_listener), t.watched[o] = n
                    }
            }
            this.schema.headerTemplate && (this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine))
        },
        addLinks: function() {
            if (!this.no_link_holder && (this.link_holder = this.theme.getLinksHolder(), this.container.appendChild(this.link_holder), this.schema.links))
                for (var t = 0; t < this.schema.links.length; t++) this.addLink(this.getLink(this.schema.links[t]))
        },
        getButton: function(t, e, i) {
            var s = "json-editor-btn-" + e;
            e = this.iconlib ? this.iconlib.getIcon(e) : null, !e && i && (t = i, i = null);
            var r = this.theme.getButton(t, e, i);
            return r.className += " " + s + " ", r
        },
        setButtonText: function(t, e, i, s) {
            return i = this.iconlib ? this.iconlib.getIcon(i) : null, !i && s && (e = s, s = null), this.theme.setButtonText(t, e, i, s)
        },
        addLink: function(t) {
            this.link_holder && this.link_holder.appendChild(t)
        },
        getLink: function(t) {
            var e, i, s = t.mediaType || "application/javascript",
                r = s.split("/")[0],
                n = this.jsoneditor.compileTemplate(t.href, this.template_engine),
                o = null;
            if (t.download && (o = t.download), o && o !== !0 && (o = this.jsoneditor.compileTemplate(o, this.template_engine)), "image" === r) {
                e = this.theme.getBlockLinkHolder(), i = document.createElement("a"), i.setAttribute("target", "_blank");
                var a = document.createElement("img");
                this.theme.createImageLink(e, i, a), this.link_watchers.push(function(e) {
                    var s = n(e);
                    i.setAttribute("href", s), i.setAttribute("title", t.rel || s), a.setAttribute("src", s)
                })
            } else if (["audio", "video"].indexOf(r) >= 0) {
                e = this.theme.getBlockLinkHolder(), i = this.theme.getBlockLink(), i.setAttribute("target", "_blank");
                var l = document.createElement(r);
                l.setAttribute("controls", "controls"), this.theme.createMediaLink(e, i, l), this.link_watchers.push(function(e) {
                    var s = n(e);
                    i.setAttribute("href", s), i.textContent = t.rel || s, l.setAttribute("src", s)
                })
            } else i = e = this.theme.getBlockLink(), e.setAttribute("target", "_blank"), e.textContent = t.rel, this.link_watchers.push(function(i) {
                var s = n(i);
                e.setAttribute("href", s), e.textContent = t.rel || s
            });
            return o && i && (o === !0 ? i.setAttribute("download", "") : this.link_watchers.push(function(t) {
                i.setAttribute("download", o(t))
            })), t["class"] && (i.className = i.className + " " + t["class"]), e
        },
        refreshWatchedFieldValues: function() {
            if (this.watched_values) {
                var t = {},
                    e = !1,
                    i = this;
                if (this.watched) {
                    var s, r;
                    for (var n in this.watched) this.watched.hasOwnProperty(n) && (r = i.jsoneditor.getEditor(this.watched[n]), s = r ? r.getValue() : null, i.watched_values[n] !== s && (e = !0), t[n] = s)
                }
                return t.self = this.getValue(), this.watched_values.self !== t.self && (e = !0), this.watched_values = t, e
            }
        },
        getWatchedFieldValues: function() {
            return this.watched_values
        },
        updateHeaderText: function() {
            if (this.header)
                if (this.header.children.length) {
                    for (var t = 0; t < this.header.childNodes.length; t++)
                        if (3 === this.header.childNodes[t].nodeType) {
                            this.header.childNodes[t].nodeValue = this.getHeaderText();
                            break
                        }
                } else this.header.textContent = this.getHeaderText()
        },
        getHeaderText: function(t) {
            return this.header_text ? this.header_text : t ? this.schema.title : this.getTitle()
        },
        onWatchedFieldChange: function() {
            var t;
            if (this.header_template) {
                t = i(this.getWatchedFieldValues(), {
                    key: this.key,
                    i: this.key,
                    i0: 1 * this.key,
                    i1: 1 * this.key + 1,
                    title: this.getTitle()
                });
                var e = this.header_template(t);
                e !== this.header_text && (this.header_text = e, this.updateHeaderText(), this.notify())
            }
            if (this.link_watchers.length) {
                t = this.getWatchedFieldValues();
                for (var s = 0; s < this.link_watchers.length; s++) this.link_watchers[s](t)
            }
        },
        setValue: function(t) {
            this.value = t
        },
        getValue: function() {
            return this.value
        },
        refreshValue: function() {},
        getChildEditors: function() {
            return !1
        },
        destroy: function() {
            var t = this;
            this.unregister(this), s(this.watched, function(e, i) {
                t.jsoneditor.unwatch(i, t.watch_listener)
            }), this.watched = null, this.watched_values = null, this.watch_listener = null, this.header_text = null, this.header_template = null, this.value = null, this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.container = null, this.jsoneditor = null, this.schema = null, this.path = null, this.key = null, this.parent = null
        },
        getDefault: function() {
            if (this.schema["default"]) return this.schema["default"];
            if (this.schema["enum"]) return this.schema["enum"][0];
            var t = this.schema.type || this.schema.oneOf;
            if (t && Array.isArray(t) && (t = t[0]), t && "object" == typeof t && (t = t.type), t && Array.isArray(t) && (t = t[0]), "string" == typeof t) {
                if ("number" === t) return 0;
                if ("boolean" === t) return !1;
                if ("integer" === t) return 0;
                if ("string" === t) return "";
                if ("object" === t) return {};
                if ("array" === t) return []
            }
            return null
        },
        getTitle: function() {
            return this.schema.title || this.key
        },
        enable: function() {
            this.disabled = !1
        },
        disable: function() {
            this.disabled = !0
        },
        isEnabled: function() {
            return !this.disabled
        },
        isRequired: function() {
            return "boolean" == typeof this.schema.required ? this.schema.required : this.parent && this.parent.schema && Array.isArray(this.parent.schema.required) ? this.parent.schema.required.indexOf(this.key) > -1 : !!this.jsoneditor.options.required_by_default
        },
        getDisplayText: function(t) {
            var e = [],
                i = {};
            s(t, function(t, e) {
                e.title && (i[e.title] = i[e.title] || 0, i[e.title]++), e.description && (i[e.description] = i[e.description] || 0, i[e.description]++), e.format && (i[e.format] = i[e.format] || 0, i[e.format]++), e.type && (i[e.type] = i[e.type] || 0, i[e.type]++)
            }), s(t, function(t, s) {
                var r;
                r = "string" == typeof s ? s : s.title && i[s.title] <= 1 ? s.title : s.format && i[s.format] <= 1 ? s.format : s.type && i[s.type] <= 1 ? s.type : s.description && i[s.description] <= 1 ? s.descripton : s.title ? s.title : s.format ? s.format : s.type ? s.type : s.description ? s.description : JSON.stringify(s).length < 50 ? JSON.stringify(s) : "type", e.push(r)
            });
            var r = {};
            return s(e, function(t, s) {
                r[s] = r[s] || 0, r[s]++, i[s] > 1 && (e[t] = s + " " + r[s])
            }), e
        },
        getOption: function(t) {
            try {
                throw "getOption is deprecated"
            } catch (e) {
                window.console.error(e)
            }
            return this.options[t]
        },
        showValidationErrors: function(t) {}
    }), n.defaults.editors["null"] = n.AbstractEditor.extend({
        getValue: function() {
            return null
        },
        setValue: function() {
            this.onChange()
        },
        getNumColumns: function() {
            return 2
        }
    }), n.defaults.editors.string = n.AbstractEditor.extend({
        register: function() {
            this._super(), this.input && this.input.setAttribute("name", this.formname)
        },
        unregister: function() {
            this._super(), this.input && this.input.removeAttribute("name")
        },
        setValue: function(t, e, i) {
            if ((!this.template || i) && (null === t || "undefined" == typeof t ? t = "" : "object" == typeof t ? t = JSON.stringify(t) : "string" != typeof t && (t = "" + t), t !== this.serialized)) {
                var s = this.sanitize(t);
                if (this.input.value !== s) {
                    this.input.value = s, this.sceditor_instance ? this.sceditor_instance.val(s) : this.epiceditor ? this.epiceditor.importFile(null, s) : this.ace_editor && this.ace_editor.setValue(s);
                    var r = i || this.getValue() !== t;
                    this.refreshValue(), e ? this.is_dirty = !1 : "change" === this.jsoneditor.options.show_errors && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), this.onChange(r)
                }
            }
        },
        getNumColumns: function() {
            var t, e = Math.ceil(Math.max(this.getTitle().length, this.schema.maxLength || 0, this.schema.minLength || 0) / 5);
            return t = "textarea" === this.input_type ? 6 : ["text", "email"].indexOf(this.input_type) >= 0 ? 4 : 2, Math.min(12, Math.max(e, t))
        },
        build: function() {
            var t = this;
            if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.format = this.schema.format, !this.format && this.schema.media && this.schema.media.type && (this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g, "")), !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.format)
                if ("textarea" === this.format) this.input_type = "textarea", this.input = this.theme.getTextareaInput();
                else if ("range" === this.format) {
                this.input_type = "range";
                var e = this.schema.minimum || 0,
                    i = this.schema.maximum || Math.max(100, e + 1),
                    s = 1;
                this.schema.multipleOf && (e % this.schema.multipleOf && (e = Math.ceil(e / this.schema.multipleOf) * this.schema.multipleOf), i % this.schema.multipleOf && (i = Math.floor(i / this.schema.multipleOf) * this.schema.multipleOf), s = this.schema.multipleOf), this.input = this.theme.getRangeInput(e, i, s)
            } else ["coffee", "css", "html", "javascript", "json"].indexOf(this.format) >= 0 ? (this.input_type = this.format, this.source_code = !0, this.input = this.theme.getTextareaInput()) : (this.input_type = this.format, this.input = this.theme.getFormInputField(this.input_type));
            else this.input_type = "text", this.input = this.theme.getFormInputField(this.input_type);
            "undefined" != typeof this.schema.maxLength && this.input.setAttribute("maxlength", this.schema.maxLength), "undefined" != typeof this.schema.pattern ? this.input.setAttribute("pattern", this.schema.pattern) : "undefined" != typeof this.schema.minLength && this.input.setAttribute("pattern", ".{" + this.schema.minLength + ",}"), this.options.compact ? this.container.className += " compact" : this.options.input_width && (this.input.style.width = this.options.input_width), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.always_disabled = !0, this.input.disabled = !0), this.input.addEventListener("change", function(e) {
                if (e.preventDefault(), e.stopPropagation(), t.schema.template) return void(this.value = t.value);
                var i = this.value,
                    s = t.sanitize(i);
                i !== s && (this.value = s), t.is_dirty = !0, t.refreshValue(), t.onChange(!0)
            }), this.options.input_height && (this.input.style.height = this.options.input_height), this.options.expand_height && (this.adjust_height = function(t) {
                if (t) {
                    var e, i = t.offsetHeight;
                    if (t.offsetHeight < t.scrollHeight)
                        for (e = 0; t.offsetHeight < t.scrollHeight + 3 && !(e > 100);) e++, i++, t.style.height = i + "px";
                    else {
                        for (e = 0; t.offsetHeight >= t.scrollHeight + 3 && !(e > 100);) e++, i--, t.style.height = i + "px";
                        t.style.height = i + 1 + "px"
                    }
                }
            }, this.input.addEventListener("keyup", function(e) {
                t.adjust_height(this)
            }), this.input.addEventListener("change", function(e) {
                t.adjust_height(this)
            }), this.adjust_height()), this.format && this.input.setAttribute("data-schemaformat", this.format), this.control = this.theme.getFormControl(this.label, this.input, this.description), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
                t.input.parentNode && t.afterInputReady(), t.adjust_height && t.adjust_height(t.input)
            }), this.schema.template ? (this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue()) : this.refreshValue()
        },
        enable: function() {
            this.always_disabled || (this.input.disabled = !1), this._super()
        },
        disable: function() {
            this.input.disabled = !0, this._super()
        },
        afterInputReady: function() {
            var t, e = this;
            if (this.source_code)
                if (this.options.wysiwyg && ["html", "bbcode"].indexOf(this.input_type) >= 0 && window.jQuery && window.jQuery.fn && window.jQuery.fn.sceditor) t = i({}, {
                    plugins: "html" === e.input_type ? "xhtml" : "bbcode",
                    emoticonsEnabled: !1,
                    width: "100%",
                    height: 300
                }, n.plugins.sceditor, e.options.sceditor_options || {}), window.jQuery(e.input).sceditor(t), e.sceditor_instance = window.jQuery(e.input).sceditor("instance"), e.sceditor_instance.blur(function() {
                    var t = window.jQuery("<div>" + e.sceditor_instance.val() + "</div>");
                    window.jQuery("#sceditor-start-marker,#sceditor-end-marker,.sceditor-nlf", t).remove(), e.input.value = t.html(), e.value = e.input.value, e.is_dirty = !0, e.onChange(!0)
                });
                else if ("markdown" === this.input_type && window.EpicEditor) this.epiceditor_container = document.createElement("div"), this.input.parentNode.insertBefore(this.epiceditor_container, this.input), this.input.style.display = "none", t = i({}, n.plugins.epiceditor, {
                container: this.epiceditor_container,
                clientSideStorage: !1
            }), this.epiceditor = new window.EpicEditor(t).load(), this.epiceditor.importFile(null, this.getValue()), this.epiceditor.on("update", function() {
                var t = e.epiceditor.exportFile();
                e.input.value = t, e.value = t, e.is_dirty = !0, e.onChange(!0)
            });
            else if (window.ace) {
                var s = this.input_type;
                "cpp" !== s && "c++" !== s && "c" !== s || (s = "c_cpp"), this.ace_container = document.createElement("div"), this.ace_container.style.width = "100%", this.ace_container.style.position = "relative", this.ace_container.style.height = "400px", this.input.parentNode.insertBefore(this.ace_container, this.input), this.input.style.display = "none", this.ace_editor = window.ace.edit(this.ace_container), this.ace_editor.setValue(this.getValue()), n.plugins.ace.theme && this.ace_editor.setTheme("ace/theme/" + n.plugins.ace.theme), s = window.ace.require("ace/mode/" + s), s && this.ace_editor.getSession().setMode(new s.Mode), this.ace_editor.on("change", function() {
                    var t = e.ace_editor.getValue();
                    e.input.value = t, e.refreshValue(), e.is_dirty = !0, e.onChange(!0)
                })
            }
            e.theme.afterInputReady(e.input)
        },
        refreshValue: function() {
            this.value = this.input.value, "string" != typeof this.value && (this.value = ""), this.serialized = this.value
        },
        destroy: function() {
            this.sceditor_instance ? this.sceditor_instance.destroy() : this.epiceditor ? this.epiceditor.unload() : this.ace_editor && this.ace_editor.destroy(), this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this._super()
        },
        sanitize: function(t) {
            return t
        },
        onWatchedFieldChange: function() {
            var t;
            this.template && (t = this.getWatchedFieldValues(), this.setValue(this.template(t), !1, !0)), this._super()
        },
        showValidationErrors: function(t) {
            var e = this;
            if ("always" === this.jsoneditor.options.show_errors);
            else if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) return;
            this.previous_error_setting = this.jsoneditor.options.show_errors;
            var i = [];
            s(t, function(t, s) {
                s.path === e.path && i.push(s.message)
            }), i.length ? this.theme.addInputError(this.input, i.join(". ") + ".") : this.theme.removeInputError(this.input)
        }
    }), n.defaults.editors.number = n.defaults.editors.string.extend({
        sanitize: function(t) {
            return (t + "").replace(/[^0-9\.\-eE]/g, "")
        },
        getNumColumns: function() {
            return 2
        },
        getValue: function() {
            return 1 * this.value
        }
    }), n.defaults.editors.integer = n.defaults.editors.number.extend({
        sanitize: function(t) {
            return t += "", t.replace(/[^0-9\-]/g, "")
        },
        getNumColumns: function() {
            return 2
        }
    }), n.defaults.editors.object = n.AbstractEditor.extend({
        getDefault: function() {
            return i({}, this.schema["default"] || {})
        },
        getChildEditors: function() {
            return this.editors
        },
        register: function() {
            if (this._super(), this.editors)
                for (var t in this.editors) this.editors.hasOwnProperty(t) && this.editors[t].register()
        },
        unregister: function() {
            if (this._super(), this.editors)
                for (var t in this.editors) this.editors.hasOwnProperty(t) && this.editors[t].unregister()
        },
        getNumColumns: function() {
            return Math.max(Math.min(12, this.maxwidth), 3)
        },
        enable: function() {
            if (this.editjson_button && (this.editjson_button.disabled = !1), this.addproperty_button && (this.addproperty_button.disabled = !1), this._super(), this.editors)
                for (var t in this.editors) this.editors.hasOwnProperty(t) && this.editors[t].enable()
        },
        disable: function() {
            if (this.editjson_button && (this.editjson_button.disabled = !0), this.addproperty_button && (this.addproperty_button.disabled = !0), this.hideEditJSON(), this._super(), this.editors)
                for (var t in this.editors) this.editors.hasOwnProperty(t) && this.editors[t].disable()
        },
        layoutEditors: function() {
            var t, e, i = this;
            if (this.row_container) {
                this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(t, e) {
                    var s = i.editors[t].schema.propertyOrder,
                        r = i.editors[e].schema.propertyOrder;
                    return "number" != typeof s && (s = 1e3), "number" != typeof r && (r = 1e3), s - r
                });
                var r;
                if ("grid" === this.format) {
                    var n = [];
                    for (s(this.property_order, function(t, e) {
                            var s = i.editors[e];
                            if (!s.property_removed) {
                                for (var r = !1, o = s.options.hidden ? 0 : s.options.grid_columns || s.getNumColumns(), a = s.options.hidden ? 0 : s.container.offsetHeight, l = 0; l < n.length; l++) n[l].width + o <= 12 && (!a || .5 * n[l].minh < a && 2 * n[l].maxh > a) && (r = l);
                                r === !1 && (n.push({
                                    width: 0,
                                    minh: 999999,
                                    maxh: 0,
                                    editors: []
                                }), r = n.length - 1), n[r].editors.push({
                                    key: e,
                                    width: o,
                                    height: a
                                }), n[r].width += o, n[r].minh = Math.min(n[r].minh, a), n[r].maxh = Math.max(n[r].maxh, a)
                            }
                        }), t = 0; t < n.length; t++)
                        if (n[t].width < 12) {
                            var o = !1,
                                a = 0;
                            for (e = 0; e < n[t].editors.length; e++) o === !1 ? o = e : n[t].editors[e].width > n[t].editors[o].width && (o = e), n[t].editors[e].width *= 12 / n[t].width, n[t].editors[e].width = Math.floor(n[t].editors[e].width), a += n[t].editors[e].width;
                            12 > a && (n[t].editors[o].width += 12 - a), n[t].width = 12
                        }
                    if (this.layout === JSON.stringify(n)) return !1;
                    for (this.layout = JSON.stringify(n), r = document.createElement("div"), t = 0; t < n.length; t++) {
                        var l = this.theme.getGridRow();
                        for (r.appendChild(l), e = 0; e < n[t].editors.length; e++) {
                            var h = n[t].editors[e].key,
                                d = this.editors[h];
                            d.options.hidden ? d.container.style.display = "none" : this.theme.setGridColumnSize(d.container, n[t].editors[e].width), l.appendChild(d.container)
                        }
                    }
                } else r = document.createElement("div"), s(this.property_order, function(t, e) {
                    var s = i.editors[e];
                    if (!s.property_removed) {
                        var n = i.theme.getGridRow();
                        r.appendChild(n), s.options.hidden ? s.container.style.display = "none" : i.theme.setGridColumnSize(s.container, 12), n.appendChild(s.container)
                    }
                });
                this.row_container.innerHTML = "", this.row_container.appendChild(r)
            }
        },
        getPropertySchema: function(t) {
            var e = this.schema.properties[t] || {};
            e = i({}, e);
            var s = !!this.schema.properties[t];
            if (this.schema.patternProperties)
                for (var r in this.schema.patternProperties)
                    if (this.schema.patternProperties.hasOwnProperty(r)) {
                        var n = new RegExp(r);
                        n.test(t) && (e.allOf = e.allOf || [], e.allOf.push(this.schema.patternProperties[r]), s = !0)
                    }
            return !s && this.schema.additionalProperties && "object" == typeof this.schema.additionalProperties && (e = i({}, this.schema.additionalProperties)), e
        },
        preBuild: function() {
            this._super(), this.editors = {}, this.cached_editors = {};
            var t = this;
            if (this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) s(this.schema.properties, function(e, i) {
                var s = t.jsoneditor.getEditorClass(i);
                t.editors[e] = t.jsoneditor.createEditor(s, {
                    jsoneditor: t.jsoneditor,
                    schema: i,
                    path: t.path + "." + e,
                    parent: t,
                    compact: !0,
                    required: !0
                }), t.editors[e].preBuild();
                var r = t.editors[e].options.hidden ? 0 : t.editors[e].options.grid_columns || t.editors[e].getNumColumns();
                t.minwidth += r, t.maxwidth += r
            }), this.no_link_holder = !0;
            else {
                if (this.options.table) throw "Not supported yet";
                this.schema.defaultProperties || (this.jsoneditor.options.display_required_only || this.options.display_required_only ? (this.schema.defaultProperties = [], s(this.schema.properties, function(e, i) {
                    t.isRequired({
                        key: e,
                        schema: i
                    }) && t.schema.defaultProperties.push(e)
                })) : t.schema.defaultProperties = Object.keys(t.schema.properties)), t.maxwidth += 1, s(this.schema.defaultProperties, function(e, i) {
                    t.addObjectProperty(i, !0), t.editors[i] && (t.minwidth = Math.max(t.minwidth, t.editors[i].options.grid_columns || t.editors[i].getNumColumns()), t.maxwidth += t.editors[i].options.grid_columns || t.editors[i].getNumColumns())
                })
            }
            this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(e, i) {
                var s = t.editors[e].schema.propertyOrder,
                    r = t.editors[i].schema.propertyOrder;
                return "number" != typeof s && (s = 1e3), "number" != typeof r && (r = 1e3), s - r
            })
        },
        build: function() {
            var t = this;
            if (this.options.table_row) this.editor_holder = this.container, s(this.editors, function(e, i) {
                var s = t.theme.getTableCell();
                t.editor_holder.appendChild(s), i.setContainer(s), i.build(), i.postBuild(), t.editors[e].options.hidden && (s.style.display = "none"), t.editors[e].options.input_width && (s.style.width = t.editors[e].options.input_width)
            });
            else {
                if (this.options.table) throw "Not supported yet";
                this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header), this.container.appendChild(this.title), this.container.style.position = "relative", this.editjson_holder = this.theme.getModal(), this.editjson_textarea = this.theme.getTextareaInput(), this.editjson_textarea.style.height = "170px", this.editjson_textarea.style.width = "300px", this.editjson_textarea.style.display = "block", this.editjson_save = this.getButton("Save", "save", "Save"), this.editjson_save.addEventListener("click", function(e) { t.saveJSON()
                }), this.editjson_cancel = this.getButton("Cancel", "cancel", "Cancel"), this.editjson_cancel.addEventListener("click", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.hideEditJSON()
                }), this.editjson_holder.appendChild(this.editjson_textarea), this.editjson_holder.appendChild(this.editjson_save), this.editjson_holder.appendChild(this.editjson_cancel), this.addproperty_holder = this.theme.getModal(), this.addproperty_list = document.createElement("div"), this.addproperty_list.style.width = "295px", this.addproperty_list.style.maxHeight = "160px", this.addproperty_list.style.padding = "5px 0", this.addproperty_list.style.overflowY = "auto", this.addproperty_list.style.overflowX = "hidden", this.addproperty_list.style.paddingLeft = "5px", this.addproperty_list.setAttribute("class", "property-selector"), this.addproperty_add = this.getButton("add", "add", "add"), this.addproperty_input = this.theme.getFormInputField("text"), this.addproperty_input.setAttribute("placeholder", "Property name..."), this.addproperty_input.style.width = "220px", this.addproperty_input.style.marginBottom = "0", this.addproperty_input.style.display = "inline-block", this.addproperty_add.addEventListener("click", function(e) {
                    if (e.preventDefault(), e.stopPropagation(), t.addproperty_input.value) {
                        if (t.editors[t.addproperty_input.value]) return void window.alert("there is already a property with that name");
                        t.addObjectProperty(t.addproperty_input.value), t.editors[t.addproperty_input.value] && t.editors[t.addproperty_input.value].disable(), t.onChange(!0)
                    }
                }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
                var e = document.createElement("div");
                e.style.clear = "both", this.addproperty_holder.appendChild(e), this.schema.description && (this.description = this.theme.getDescription(this.schema.description), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), this.editor_holder.appendChild(this.row_container), s(this.editors, function(e, i) {
                    var s = t.theme.getGridColumn();
                    t.row_container.appendChild(s), i.setContainer(s), i.build(), i.postBuild()
                }), this.title_controls = this.theme.getHeaderButtonHolder(), this.editjson_controls = this.theme.getHeaderButtonHolder(), this.addproperty_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.title.appendChild(this.editjson_controls), this.title.appendChild(this.addproperty_controls), this.collapsed = !1, this.toggle_button = this.getButton("", "collapse", this.translate("button_collapse")), this.title_controls.appendChild(this.toggle_button), this.toggle_button.addEventListener("click", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.collapsed ? (t.editor_holder.style.display = "", t.collapsed = !1, t.setButtonText(t.toggle_button, "", "collapse", t.translate("button_collapse"))) : (t.editor_holder.style.display = "none", t.collapsed = !0, t.setButtonText(t.toggle_button, "", "expand", t.translate("button_expand")))
                }), this.options.collapsed && r(this.toggle_button, "click"), this.schema.options && "undefined" != typeof this.schema.options.disable_collapse ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.editjson_button = this.getButton("JSON", "edit", "Edit JSON"), this.editjson_button.addEventListener("click", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.toggleEditJSON()
                }), this.editjson_controls.appendChild(this.editjson_button), this.editjson_controls.appendChild(this.editjson_holder), this.schema.options && "undefined" != typeof this.schema.options.disable_edit_json ? this.schema.options.disable_edit_json && (this.editjson_button.style.display = "none") : this.jsoneditor.options.disable_edit_json && (this.editjson_button.style.display = "none"), this.addproperty_button = this.getButton("Properties", "edit", "Object Properties"), this.addproperty_button.addEventListener("click", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.toggleAddProperty()
                }), this.addproperty_controls.appendChild(this.addproperty_button), this.addproperty_controls.appendChild(this.addproperty_holder), this.refreshAddProperties()
            }
            this.options.table_row ? (this.editor_holder = this.container, s(this.property_order, function(e, i) {
                t.editor_holder.appendChild(t.editors[i].container)
            })) : (this.layoutEditors(), this.layoutEditors())
        },
        showEditJSON: function() {
            this.editjson_holder && (this.hideAddProperty(), this.editjson_holder.style.left = this.editjson_button.offsetLeft + "px", this.editjson_holder.style.top = this.editjson_button.offsetTop + this.editjson_button.offsetHeight + "px", this.editjson_textarea.value = JSON.stringify(this.getValue(), null, 2), this.disable(), this.editjson_holder.style.display = "", this.editjson_button.disabled = !1, this.editing_json = !0)
        },
        hideEditJSON: function() {
            this.editjson_holder && this.editing_json && (this.editjson_holder.style.display = "none", this.enable(), this.editing_json = !1)
        },
        toggleEditJSON: function() {
            this.editing_json ? this.hideEditJSON() : this.showEditJSON()
        },
        insertPropertyControlUsingPropertyOrder: function(t, e, i) {
            var s;
            this.schema.properties[t] && (s = this.schema.properties[t].propertyOrder), "number" != typeof s && (s = 1e3), e.propertyOrder = s;
            for (var r = 0; r < i.childNodes.length; r++) {
                var n = i.childNodes[r];
                if (e.propertyOrder < n.propertyOrder) {
                    this.addproperty_list.insertBefore(e, n), e = null;
                    break
                }
            }
            e && this.addproperty_list.appendChild(e)
        },
        addPropertyCheckbox: function(t) {
            var e, i, s, r, n = this;
            return e = n.theme.getCheckbox(), e.style.width = "auto", s = this.schema.properties[t] && this.schema.properties[t].title ? this.schema.properties[t].title : t, i = n.theme.getCheckboxLabel(s), r = n.theme.getFormControl(i, e), r.style.paddingBottom = r.style.marginBottom = r.style.paddingTop = r.style.marginTop = 0, r.style.height = "auto", this.insertPropertyControlUsingPropertyOrder(t, r, this.addproperty_list), e.checked = t in this.editors, e.addEventListener("change", function() {
                e.checked ? n.addObjectProperty(t) : n.removeObjectProperty(t), n.onChange(!0)
            }), n.addproperty_checkboxes[t] = e, e
        },
        showAddProperty: function() {
            this.addproperty_holder && (this.hideEditJSON(), this.addproperty_holder.style.left = this.addproperty_button.offsetLeft + "px", this.addproperty_holder.style.top = this.addproperty_button.offsetTop + this.addproperty_button.offsetHeight + "px", this.disable(), this.adding_property = !0, this.addproperty_button.disabled = !1, this.addproperty_holder.style.display = "", this.refreshAddProperties())
        },
        hideAddProperty: function() {
            this.addproperty_holder && this.adding_property && (this.addproperty_holder.style.display = "none", this.enable(), this.adding_property = !1)
        },
        toggleAddProperty: function() {
            this.adding_property ? this.hideAddProperty() : this.showAddProperty()
        },
        removeObjectProperty: function(t) {
            this.editors[t] && (this.editors[t].unregister(), delete this.editors[t], this.refreshValue(), this.layoutEditors())
        },
        addObjectProperty: function(t, e) {
            var i = this;
            if (!this.editors[t]) {
                if (this.cached_editors[t]) {
                    if (this.editors[t] = this.cached_editors[t], e) return;
                    this.editors[t].register()
                } else {
                    if (!(this.canHaveAdditionalProperties() || this.schema.properties && this.schema.properties[t])) return;
                    var s = i.getPropertySchema(t),
                        r = i.jsoneditor.getEditorClass(s);
                    if (i.editors[t] = i.jsoneditor.createEditor(r, {
                            jsoneditor: i.jsoneditor,
                            schema: s,
                            path: i.path + "." + t,
                            parent: i
                        }), i.editors[t].preBuild(), !e) {
                        var n = i.theme.getChildEditorHolder();
                        i.editor_holder.appendChild(n), i.editors[t].setContainer(n), i.editors[t].build(), i.editors[t].postBuild()
                    }
                    i.cached_editors[t] = i.editors[t]
                }
                e || (i.refreshValue(), i.layoutEditors())
            }
        },
        onChildEditorChange: function(t) {
            this.refreshValue(), this._super(t)
        },
        canHaveAdditionalProperties: function() {
            return "boolean" == typeof this.schema.additionalProperties ? this.schema.additionalProperties : !this.jsoneditor.options.no_additional_properties
        },
        destroy: function() {
            s(this.cached_editors, function(t, e) {
                e.destroy()
            }), this.editor_holder && (this.editor_holder.innerHTML = ""), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.error_holder && this.error_holder.parentNode && this.error_holder.parentNode.removeChild(this.error_holder), this.editors = null, this.cached_editors = null, this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.editor_holder = null, this._super()
        },
        getValue: function() {
            var t = this._super();
            if (this.jsoneditor.options.remove_empty_properties || this.options.remove_empty_properties)
                for (var e in t) t.hasOwnProperty(e) && (t[e] || delete t[e]);
            return t
        },
        refreshValue: function() {
            this.value = {};
            for (var t in this.editors) this.editors.hasOwnProperty(t) && (this.value[t] = this.editors[t].getValue());
            this.adding_property && this.refreshAddProperties()
        },
        refreshAddProperties: function() {
            if (this.options.disable_properties || this.options.disable_properties !== !1 && this.jsoneditor.options.disable_properties) return void(this.addproperty_controls.style.display = "none");
            var t, e = !1,
                i = !1,
                s = 0,
                r = !1;
            for (t in this.editors) this.editors.hasOwnProperty(t) && s++;
            e = this.canHaveAdditionalProperties() && !("undefined" != typeof this.schema.maxProperties && s >= this.schema.maxProperties), this.addproperty_checkboxes && (this.addproperty_list.innerHTML = ""), this.addproperty_checkboxes = {};
            for (t in this.cached_editors) this.cached_editors.hasOwnProperty(t) && (this.addPropertyCheckbox(t), this.isRequired(this.cached_editors[t]) && t in this.editors && (this.addproperty_checkboxes[t].disabled = !0), "undefined" != typeof this.schema.minProperties && s <= this.schema.minProperties ? (this.addproperty_checkboxes[t].disabled = this.addproperty_checkboxes[t].checked, this.addproperty_checkboxes[t].checked || (r = !0)) : t in this.editors ? (r = !0, i = !0) : e || this.schema.properties.hasOwnProperty(t) ? (this.addproperty_checkboxes[t].disabled = !1, r = !0) : this.addproperty_checkboxes[t].disabled = !0);
            this.canHaveAdditionalProperties() && (r = !0);
            for (t in this.schema.properties) this.schema.properties.hasOwnProperty(t) && (this.cached_editors[t] || (r = !0, this.addPropertyCheckbox(t)));
            r ? this.canHaveAdditionalProperties() ? e ? this.addproperty_add.disabled = !1 : this.addproperty_add.disabled = !0 : (this.addproperty_add.style.display = "none", this.addproperty_input.style.display = "none") : (this.hideAddProperty(), this.addproperty_controls.style.display = "none")
        },
        isRequired: function(t) {
            return "boolean" == typeof t.schema.required ? t.schema.required : Array.isArray(this.schema.required) ? this.schema.required.indexOf(t.key) > -1 : !!this.jsoneditor.options.required_by_default
        },
        setValue: function(t, e) {
            var i = this;
            t = t || {}, ("object" != typeof t || Array.isArray(t)) && (t = {}), s(this.cached_editors, function(s, r) {
                "undefined" != typeof t[s] ? (i.addObjectProperty(s), r.setValue(t[s], e)) : e || i.isRequired(r) ? r.setValue(r.getDefault(), e) : i.removeObjectProperty(s)
            }), s(t, function(t, s) {
                i.cached_editors[t] || (i.addObjectProperty(t), i.editors[t] && i.editors[t].setValue(s, e))
            }), this.refreshValue(), this.layoutEditors(), this.onChange()
        },
        showValidationErrors: function(t) {
            var e = this,
                i = [],
                r = [];
            s(t, function(t, s) {
                s.path === e.path ? i.push(s) : r.push(s)
            }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", s(i, function(t, i) {
                e.error_holder.appendChild(e.theme.getErrorMessage(i.message))
            })) : this.error_holder.style.display = "none"), this.options.table_row && (i.length ? this.theme.addTableRowError(this.container) : this.theme.removeTableRowError(this.container)), s(this.editors, function(t, e) {
                e.showValidationErrors(r)
            })
        }
    }), n.defaults.editors.array = n.AbstractEditor.extend({
        getDefault: function() {
            return this.schema["default"] || []
        },
        register: function() {
            if (this._super(), this.rows)
                for (var t = 0; t < this.rows.length; t++) this.rows[t].register()
        },
        unregister: function() {
            if (this._super(), this.rows)
                for (var t = 0; t < this.rows.length; t++) this.rows[t].unregister()
        },
        getNumColumns: function() {
            var t = this.getItemInfo(0);
            return this.tabs_holder ? Math.max(Math.min(12, t.width + 2), 4) : t.width
        },
        enable: function() {
            if (this.add_row_button && (this.add_row_button.disabled = !1), this.remove_all_rows_button && (this.remove_all_rows_button.disabled = !1), this.delete_last_row_button && (this.delete_last_row_button.disabled = !1), this.rows)
                for (var t = 0; t < this.rows.length; t++) this.rows[t].enable(), this.rows[t].moveup_button && (this.rows[t].moveup_button.disabled = !1), this.rows[t].movedown_button && (this.rows[t].movedown_button.disabled = !1), this.rows[t].delete_button && (this.rows[t].delete_button.disabled = !1);
            this._super()
        },
        disable: function() {
            if (this.add_row_button && (this.add_row_button.disabled = !0), this.remove_all_rows_button && (this.remove_all_rows_button.disabled = !0), this.delete_last_row_button && (this.delete_last_row_button.disabled = !0), this.rows)
                for (var t = 0; t < this.rows.length; t++) this.rows[t].disable(), this.rows[t].moveup_button && (this.rows[t].moveup_button.disabled = !0), this.rows[t].movedown_button && (this.rows[t].movedown_button.disabled = !0), this.rows[t].delete_button && (this.rows[t].delete_button.disabled = !0);
            this._super()
        },
        preBuild: function() {
            this._super(), this.rows = [], this.row_cache = [], this.hide_delete_buttons = this.options.disable_array_delete || this.jsoneditor.options.disable_array_delete, this.hide_delete_all_rows_buttons = this.hide_delete_buttons || this.options.disable_array_delete_all_rows || this.jsoneditor.options.disable_array_delete_all_rows, this.hide_delete_last_row_buttons = this.hide_delete_buttons || this.options.disable_array_delete_last_row || this.jsoneditor.options.disable_array_delete_last_row, this.hide_move_buttons = this.options.disable_array_reorder || this.jsoneditor.options.disable_array_reorder, this.hide_add_button = this.options.disable_array_add || this.jsoneditor.options.disable_array_add
        },
        build: function() {
            this.options.compact ? (this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.controls = this.theme.getButtonHolder(), this.panel.appendChild(this.controls), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder)) : (this.header = document.createElement("span"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header), this.container.appendChild(this.title), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.schema.description), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), "tabs" === this.schema.format ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTabHolder(), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTabContentHolder(this.tabs_holder), this.active_tab = null) : (this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder), this.controls = this.theme.getButtonHolder(), this.panel.appendChild(this.controls))), this.addControls()
        },
        onChildEditorChange: function(t) {
            this.refreshValue(), this.refreshTabs(!0), this._super(t)
        },
        getItemTitle: function() {
            if (!this.item_title)
                if (this.schema.items && !Array.isArray(this.schema.items)) {
                    var t = this.jsoneditor.expandRefs(this.schema.items);
                    this.item_title = t.title || "item"
                } else this.item_title = "item";
            return this.item_title
        },
        getItemSchema: function(t) {
            return Array.isArray(this.schema.items) ? t >= this.schema.items.length ? this.schema.additionalItems === !0 ? {} : this.schema.additionalItems ? i({}, this.schema.additionalItems) : void 0 : i({}, this.schema.items[t]) : this.schema.items ? i({}, this.schema.items) : {}
        },
        getItemInfo: function(t) {
            var e = this.getItemSchema(t);
            this.item_info = this.item_info || {};
            var i = JSON.stringify(e);
            return "undefined" != typeof this.item_info[i] ? this.item_info[i] : (e = this.jsoneditor.expandRefs(e), this.item_info[i] = {
                title: e.title || "item",
                "default": e["default"],
                width: 12,
                child_editors: e.properties || e.items
            }, this.item_info[i])
        },
        getElementEditor: function(t) {
            var e = this.getItemInfo(t),
                i = this.getItemSchema(t);
            i = this.jsoneditor.expandRefs(i), i.title = e.title + " " + (t + 1);
            var s, r = this.jsoneditor.getEditorClass(i);
            s = this.tabs_holder ? this.theme.getTabContent() : e.child_editors ? this.theme.getChildEditorHolder() : this.theme.getIndentedPanel(), this.row_holder.appendChild(s);
            var n = this.jsoneditor.createEditor(r, {
                jsoneditor: this.jsoneditor,
                schema: i,
                container: s,
                path: this.path + "." + t,
                parent: this,
                required: !0
            });
            return n.preBuild(), n.build(), n.postBuild(), n.title_controls || (n.array_controls = this.theme.getButtonHolder(), s.appendChild(n.array_controls)), n
        },
        destroy: function() {
            this.empty(!0), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.row_holder && this.row_holder.parentNode && this.row_holder.parentNode.removeChild(this.row_holder), this.controls && this.controls.parentNode && this.controls.parentNode.removeChild(this.controls), this.panel && this.panel.parentNode && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, this._super()
        },
        empty: function(t) {
            if (this.rows) {
                var e = this;
                s(this.rows, function(i, s) {
                    t && (s.tab && s.tab.parentNode && s.tab.parentNode.removeChild(s.tab), e.destroyRow(s, !0), e.row_cache[i] = null), e.rows[i] = null
                }), e.rows = [], t && (e.row_cache = [])
            }
        },
        destroyRow: function(t, e) {
            var i = t.container;
            e ? (t.destroy(), i.parentNode && i.parentNode.removeChild(i), t.tab && t.tab.parentNode && t.tab.parentNode.removeChild(t.tab)) : (t.tab && (t.tab.style.display = "none"), i.style.display = "none", t.unregister())
        },
        getMax: function() {
            return Array.isArray(this.schema.items) && this.schema.additionalItems === !1 ? Math.min(this.schema.items.length, this.schema.maxItems || 1 / 0) : this.schema.maxItems || 1 / 0
        },
        refreshTabs: function(t) {
            var e = this;
            s(this.rows, function(i, s) {
                s.tab && (t ? s.tab_text.textContent = s.getHeaderText() : s.tab === e.active_tab ? (e.theme.markTabActive(s.tab), s.container.style.display = "") : (e.theme.markTabInactive(s.tab), s.container.style.display = "none"))
            })
        },
        setValue: function(t, e) {
            t = t || [], Array.isArray(t) || (t = [t]);
            var i = JSON.stringify(t);
            if (i !== this.serialized) {
                if (this.schema.minItems)
                    for (; t.length < this.schema.minItems;) t.push(this.getItemInfo(t.length)["default"]);
                this.getMax() && t.length > this.getMax() && (t = t.slice(0, this.getMax()));
                var r = this;
                s(t, function(t, i) {
                    r.rows[t] ? r.rows[t].setValue(i, e) : r.row_cache[t] ? (r.rows[t] = r.row_cache[t], r.rows[t].setValue(i, e), r.rows[t].container.style.display = "", r.rows[t].tab && (r.rows[t].tab.style.display = ""), r.rows[t].register()) : r.addRow(i, e)
                });
                for (var n = t.length; n < r.rows.length; n++) r.destroyRow(r.rows[n]), r.rows[n] = null;
                r.rows = r.rows.slice(0, t.length);
                var o = null;
                s(r.rows, function(t, e) {
                    return e.tab === r.active_tab ? (o = e.tab, !1) : void 0
                }), !o && r.rows.length && (o = r.rows[0].tab), r.active_tab = o, r.refreshValue(e), r.refreshTabs(!0), r.refreshTabs(), r.onChange()
            }
        },
        refreshValue: function(t) {
            var e = this,
                i = this.value ? this.value.length : 0;
            if (this.value = [], s(this.rows, function(t, i) {
                    e.value[t] = i.getValue()
                }), i !== this.value.length || t) {
                var r = this.schema.minItems && this.schema.minItems >= this.rows.length;
                s(this.rows, function(t, i) {
                    i.movedown_button && (t === e.rows.length - 1 ? i.movedown_button.style.display = "none" : i.movedown_button.style.display = ""), i.delete_button && (r ? i.delete_button.style.display = "none" : i.delete_button.style.display = ""), e.value[t] = i.getValue()
                });
                var n = !1;
                this.value.length ? 1 === this.value.length ? (this.remove_all_rows_button.style.display = "none", r || this.hide_delete_last_row_buttons ? this.delete_last_row_button.style.display = "none" : (this.delete_last_row_button.style.display = "", n = !0)) : (r || this.hide_delete_last_row_buttons ? this.delete_last_row_button.style.display = "none" : (this.delete_last_row_button.style.display = "", n = !0), r || this.hide_delete_all_rows_buttons ? this.remove_all_rows_button.style.display = "none" : (this.remove_all_rows_button.style.display = "", n = !0)) : (this.delete_last_row_button.style.display = "none", this.remove_all_rows_button.style.display = "none"), this.getMax() && this.getMax() <= this.rows.length || this.hide_add_button ? this.add_row_button.style.display = "none" : (this.add_row_button.style.display = "", n = !0), !this.collapsed && n ? this.controls.style.display = "inline-block" : this.controls.style.display = "none"
            }
        },
        addRow: function(t, e) {
            var i = this,
                r = this.rows.length;
            i.rows[r] = this.getElementEditor(r), i.row_cache[r] = i.rows[r], i.tabs_holder && (i.rows[r].tab_text = document.createElement("span"), i.rows[r].tab_text.textContent = i.rows[r].getHeaderText(), i.rows[r].tab = i.theme.getTab(i.rows[r].tab_text), i.rows[r].tab.addEventListener("click", function(t) {
                i.active_tab = i.rows[r].tab, i.refreshTabs(), t.preventDefault(), t.stopPropagation()
            }), i.theme.addTab(i.tabs_holder, i.rows[r].tab));
            var n = i.rows[r].title_controls || i.rows[r].array_controls;
            i.hide_delete_buttons || (i.rows[r].delete_button = this.getButton(i.getItemTitle(), "delete", this.translate("button_delete_row_title", [i.getItemTitle()])), i.rows[r].delete_button.className += " delete", i.rows[r].delete_button.setAttribute("data-i", r), i.rows[r].delete_button.addEventListener("click", function(t) {
                t.preventDefault(), t.stopPropagation();
                var e = 1 * this.getAttribute("data-i"),
                    r = i.getValue(),
                    n = [],
                    o = null;
                s(r, function(t, s) {
                    return t === e ? void(i.rows[t].tab === i.active_tab && (i.rows[t + 1] ? o = i.rows[t].tab : t && (o = i.rows[t - 1].tab))) : void n.push(s)
                }), i.setValue(n), o && (i.active_tab = o, i.refreshTabs()), i.onChange(!0)
            }), n && n.appendChild(i.rows[r].delete_button)), r && !i.hide_move_buttons && (i.rows[r].moveup_button = this.getButton("", "moveup", this.translate("button_move_up_title")), i.rows[r].moveup_button.className += " moveup", i.rows[r].moveup_button.setAttribute("data-i", r), i.rows[r].moveup_button.addEventListener("click", function(t) {
                t.preventDefault(), t.stopPropagation();
                var e = 1 * this.getAttribute("data-i");
                if (!(0 >= e)) {
                    var s = i.getValue(),
                        r = s[e - 1];
                    s[e - 1] = s[e], s[e] = r, i.setValue(s), i.active_tab = i.rows[e - 1].tab, i.refreshTabs(), i.onChange(!0)
                }
            }), n && n.appendChild(i.rows[r].moveup_button)), i.hide_move_buttons || (i.rows[r].movedown_button = this.getButton("", "movedown", this.translate("button_move_down_title")), i.rows[r].movedown_button.className += " movedown", i.rows[r].movedown_button.setAttribute("data-i", r), i.rows[r].movedown_button.addEventListener("click", function(t) {
                t.preventDefault(), t.stopPropagation();
                var e = 1 * this.getAttribute("data-i"),
                    s = i.getValue();
                if (!(e >= s.length - 1)) {
                    var r = s[e + 1];
                    s[e + 1] = s[e], s[e] = r, i.setValue(s), i.active_tab = i.rows[e + 1].tab, i.refreshTabs(),
                        i.onChange(!0)
                }
            }), n && n.appendChild(i.rows[r].movedown_button)), t && i.rows[r].setValue(t, e), i.refreshTabs()
        },
        addControls: function() {
            var t = this;
            this.collapsed = !1, this.toggle_button = this.getButton("", "collapse", this.translate("button_collapse")), this.title_controls.appendChild(this.toggle_button);
            var e = t.row_holder.style.display,
                i = t.controls.style.display;
            this.toggle_button.addEventListener("click", function(s) {
                s.preventDefault(), s.stopPropagation(), t.collapsed ? (t.collapsed = !1, t.panel && (t.panel.style.display = ""), t.row_holder.style.display = e, t.tabs_holder && (t.tabs_holder.style.display = ""), t.controls.style.display = i, t.setButtonText(this, "", "collapse", t.translate("button_collapse"))) : (t.collapsed = !0, t.row_holder.style.display = "none", t.tabs_holder && (t.tabs_holder.style.display = "none"), t.controls.style.display = "none", t.panel && (t.panel.style.display = "none"), t.setButtonText(this, "", "expand", t.translate("button_expand")))
            }), this.options.collapsed && r(this.toggle_button, "click"), this.schema.options && "undefined" != typeof this.schema.options.disable_collapse ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.add_row_button = this.getButton(this.getItemTitle(), "add", this.translate("button_add_row_title", [this.getItemTitle()])), this.add_row_button.addEventListener("click", function(e) {
                e.preventDefault(), e.stopPropagation();
                var i = t.rows.length;
                t.row_cache[i] ? (t.rows[i] = t.row_cache[i], t.rows[i].setValue(t.rows[i].getDefault(), !0), t.rows[i].container.style.display = "", t.rows[i].tab && (t.rows[i].tab.style.display = ""), t.rows[i].register()) : t.addRow(), t.active_tab = t.rows[i].tab, t.refreshTabs(), t.refreshValue(), t.onChange(!0)
            }), t.controls.appendChild(this.add_row_button), this.delete_last_row_button = this.getButton(this.translate("button_delete_last", [this.getItemTitle()]), "delete", this.translate("button_delete_last_title", [this.getItemTitle()])), this.delete_last_row_button.addEventListener("click", function(e) {
                e.preventDefault(), e.stopPropagation();
                var i = t.getValue(),
                    s = null;
                t.rows.length > 1 && t.rows[t.rows.length - 1].tab === t.active_tab && (s = t.rows[t.rows.length - 2].tab), i.pop(), t.setValue(i), s && (t.active_tab = s, t.refreshTabs()), t.onChange(!0)
            }), t.controls.appendChild(this.delete_last_row_button), this.remove_all_rows_button = this.getButton(this.translate("button_delete_all"), "delete", this.translate("button_delete_all_title")), this.remove_all_rows_button.addEventListener("click", function(e) {
                e.preventDefault(), e.stopPropagation(), t.setValue([]), t.onChange(!0)
            }), t.controls.appendChild(this.remove_all_rows_button), t.tabs && (this.add_row_button.style.width = "100%", this.add_row_button.style.textAlign = "left", this.add_row_button.style.marginBottom = "3px", this.delete_last_row_button.style.width = "100%", this.delete_last_row_button.style.textAlign = "left", this.delete_last_row_button.style.marginBottom = "3px", this.remove_all_rows_button.style.width = "100%", this.remove_all_rows_button.style.textAlign = "left", this.remove_all_rows_button.style.marginBottom = "3px")
        },
        showValidationErrors: function(t) {
            var e = this,
                i = [],
                r = [];
            s(t, function(t, s) {
                s.path === e.path ? i.push(s) : r.push(s)
            }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", s(i, function(t, i) {
                e.error_holder.appendChild(e.theme.getErrorMessage(i.message))
            })) : this.error_holder.style.display = "none"), s(this.rows, function(t, e) {
                e.showValidationErrors(r)
            })
        }
    }), n.defaults.editors.table = n.defaults.editors.array.extend({
        register: function() {
            if (this._super(), this.rows)
                for (var t = 0; t < this.rows.length; t++) this.rows[t].register()
        },
        unregister: function() {
            if (this._super(), this.rows)
                for (var t = 0; t < this.rows.length; t++) this.rows[t].unregister()
        },
        getNumColumns: function() {
            return Math.max(Math.min(12, this.width), 3)
        },
        preBuild: function() {
            var t = this.jsoneditor.expandRefs(this.schema.items || {});
            this.item_title = t.title || "row", this.item_default = t["default"] || null, this.item_has_child_editors = t.properties || t.items, this.width = 12, this._super()
        },
        build: function() {
            var t = this;
            this.table = this.theme.getTable(), this.container.appendChild(this.table), this.thead = this.theme.getTableHead(), this.table.appendChild(this.thead), this.header_row = this.theme.getTableRow(), this.thead.appendChild(this.header_row), this.row_holder = this.theme.getTableBody(), this.table.appendChild(this.row_holder);
            var e = this.getElementEditor(0, !0);
            if (this.item_default = e.getDefault(), this.width = e.getNumColumns() + 2, this.options.compact ? (this.panel = document.createElement("div"), this.container.appendChild(this.panel)) : (this.title = this.theme.getHeader(this.getTitle()), this.container.appendChild(this.title), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.schema.description), this.container.appendChild(this.description)), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.error_holder = document.createElement("div"), this.panel.appendChild(this.error_holder)), this.panel.appendChild(this.table), this.controls = this.theme.getButtonHolder(), this.panel.appendChild(this.controls), this.item_has_child_editors)
                for (var i = e.getChildEditors(), s = e.property_order || Object.keys(i), r = 0; r < s.length; r++) {
                    var n = t.theme.getTableHeaderCell(i[s[r]].getTitle());
                    i[s[r]].options.hidden && (n.style.display = "none"), t.header_row.appendChild(n)
                } else t.header_row.appendChild(t.theme.getTableHeaderCell(this.item_title));
            e.destroy(), this.row_holder.innerHTML = "", this.controls_header_cell = t.theme.getTableHeaderCell(" "), t.header_row.appendChild(this.controls_header_cell), this.addControls()
        },
        onChildEditorChange: function(t) {
            this.refreshValue(), this._super()
        },
        getItemDefault: function() {
            return i({}, {
                "default": this.item_default
            })["default"]
        },
        getItemTitle: function() {
            return this.item_title
        },
        getElementEditor: function(t, e) {
            var s = i({}, this.schema.items),
                r = this.jsoneditor.getEditorClass(s, this.jsoneditor),
                n = this.row_holder.appendChild(this.theme.getTableRow()),
                o = n;
            this.item_has_child_editors || (o = this.theme.getTableCell(), n.appendChild(o));
            var a = this.jsoneditor.createEditor(r, {
                jsoneditor: this.jsoneditor,
                schema: s,
                container: o,
                path: this.path + "." + t,
                parent: this,
                compact: !0,
                table_row: !0
            });
            return a.preBuild(), e || (a.build(), a.postBuild(), a.controls_cell = n.appendChild(this.theme.getTableCell()), a.row = n, a.table_controls = this.theme.getButtonHolder(), a.controls_cell.appendChild(a.table_controls), a.table_controls.style.margin = 0, a.table_controls.style.padding = 0), a
        },
        destroy: function() {
            this.innerHTML = "", this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.row_holder && this.row_holder.parentNode && this.row_holder.parentNode.removeChild(this.row_holder), this.table && this.table.parentNode && this.table.parentNode.removeChild(this.table), this.panel && this.panel.parentNode && this.panel.parentNode.removeChild(this.panel), this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null, this._super()
        },
        setValue: function(t, e) {
            if (t = t || [], this.schema.minItems)
                for (; t.length < this.schema.minItems;) t.push(this.getItemDefault());
            this.schema.maxItems && t.length > this.schema.maxItems && (t = t.slice(0, this.schema.maxItems));
            var i = JSON.stringify(t);
            if (i !== this.serialized) {
                var r = !1,
                    n = this;
                s(t, function(t, e) {
                    n.rows[t] ? n.rows[t].setValue(e) : (n.addRow(e), r = !0)
                });
                for (var o = t.length; o < n.rows.length; o++) {
                    var a = n.rows[o].container;
                    n.item_has_child_editors || n.rows[o].row.parentNode.removeChild(n.rows[o].row), n.rows[o].destroy(), a.parentNode && a.parentNode.removeChild(a), n.rows[o] = null, r = !0
                }
                n.rows = n.rows.slice(0, t.length), n.refreshValue(), (r || e) && n.refreshRowButtons(), n.onChange()
            }
        },
        refreshRowButtons: function() {
            var t = this,
                e = this.schema.minItems && this.schema.minItems >= this.rows.length,
                i = !1;
            s(this.rows, function(s, r) {
                r.movedown_button && (s === t.rows.length - 1 ? r.movedown_button.style.display = "none" : (i = !0, r.movedown_button.style.display = "")), r.delete_button && (e ? r.delete_button.style.display = "none" : (i = !0, r.delete_button.style.display = "")), r.moveup_button && (i = !0)
            }), s(this.rows, function(t, e) {
                i ? e.controls_cell.style.display = "" : e.controls_cell.style.display = "none"
            }), i ? this.controls_header_cell.style.display = "" : this.controls_header_cell.style.display = "none";
            var r = !1;
            this.value.length ? 1 === this.value.length ? (this.table.style.display = "", this.remove_all_rows_button.style.display = "none", e || this.hide_delete_last_row_buttons ? this.delete_last_row_button.style.display = "none" : (this.delete_last_row_button.style.display = "", r = !0)) : (this.table.style.display = "", e || this.hide_delete_last_row_buttons ? this.delete_last_row_button.style.display = "none" : (this.delete_last_row_button.style.display = "", r = !0), e || this.hide_delete_all_rows_buttons ? this.remove_all_rows_button.style.display = "none" : (this.remove_all_rows_button.style.display = "", r = !0)) : (this.delete_last_row_button.style.display = "none", this.remove_all_rows_button.style.display = "none", this.table.style.display = "none"), this.schema.maxItems && this.schema.maxItems <= this.rows.length || this.hide_add_button ? this.add_row_button.style.display = "none" : (this.add_row_button.style.display = "", r = !0), r ? this.controls.style.display = "" : this.controls.style.display = "none"
        },
        refreshValue: function() {
            var t = this;
            this.value = [], s(this.rows, function(e, i) {
                t.value[e] = i.getValue()
            }), this.serialized = JSON.stringify(this.value)
        },
        addRow: function(t) {
            var e = this,
                i = this.rows.length;
            e.rows[i] = this.getElementEditor(i);
            var r = e.rows[i].table_controls;
            this.hide_delete_buttons || (e.rows[i].delete_button = this.getButton("", "delete", this.translate("button_delete_row_title_short")), e.rows[i].delete_button.className += " delete", e.rows[i].delete_button.setAttribute("data-i", i), e.rows[i].delete_button.addEventListener("click", function(t) {
                t.preventDefault(), t.stopPropagation();
                var i = 1 * this.getAttribute("data-i"),
                    r = e.getValue(),
                    n = [];
                s(r, function(t, e) {
                    t !== i && n.push(e)
                }), e.setValue(n), e.onChange(!0)
            }), r.appendChild(e.rows[i].delete_button)), i && !this.hide_move_buttons && (e.rows[i].moveup_button = this.getButton("", "moveup", this.translate("button_move_up_title")), e.rows[i].moveup_button.className += " moveup", e.rows[i].moveup_button.setAttribute("data-i", i), e.rows[i].moveup_button.addEventListener("click", function(t) {
                t.preventDefault(), t.stopPropagation();
                var i = 1 * this.getAttribute("data-i");
                if (!(0 >= i)) {
                    var s = e.getValue(),
                        r = s[i - 1];
                    s[i - 1] = s[i], s[i] = r, e.setValue(s), e.onChange(!0)
                }
            }), r.appendChild(e.rows[i].moveup_button)), this.hide_move_buttons || (e.rows[i].movedown_button = this.getButton("", "movedown", this.translate("button_move_down_title")), e.rows[i].movedown_button.className += " movedown", e.rows[i].movedown_button.setAttribute("data-i", i), e.rows[i].movedown_button.addEventListener("click", function(t) {
                t.preventDefault(), t.stopPropagation();
                var i = 1 * this.getAttribute("data-i"),
                    s = e.getValue();
                if (!(i >= s.length - 1)) {
                    var r = s[i + 1];
                    s[i + 1] = s[i], s[i] = r, e.setValue(s), e.onChange(!0)
                }
            }), r.appendChild(e.rows[i].movedown_button)), t && e.rows[i].setValue(t)
        },
        addControls: function() {
            var t = this;
            this.collapsed = !1, this.toggle_button = this.getButton("", "collapse", this.translate("button_collapse")), this.title_controls && (this.title_controls.appendChild(this.toggle_button), this.toggle_button.addEventListener("click", function(e) {
                e.preventDefault(), e.stopPropagation(), t.collapsed ? (t.collapsed = !1, t.panel.style.display = "", t.setButtonText(this, "", "collapse", t.translate("button_collapse"))) : (t.collapsed = !0, t.panel.style.display = "none", t.setButtonText(this, "", "expand", t.translate("button_expand")))
            }), this.options.collapsed && r(this.toggle_button, "click"), this.schema.options && "undefined" != typeof this.schema.options.disable_collapse ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none")), this.add_row_button = this.getButton(this.getItemTitle(), "add", this.translate("button_add_row_title", [this.getItemTitle()])), this.add_row_button.addEventListener("click", function(e) {
                e.preventDefault(), e.stopPropagation(), t.addRow(), t.refreshValue(), t.refreshRowButtons(), t.onChange(!0)
            }), t.controls.appendChild(this.add_row_button), this.delete_last_row_button = this.getButton(this.translate("button_delete_last", [this.getItemTitle()]), "delete", this.translate("button_delete_last_title", [this.getItemTitle()])), this.delete_last_row_button.addEventListener("click", function(e) {
                e.preventDefault(), e.stopPropagation();
                var i = t.getValue();
                i.pop(), t.setValue(i), t.onChange(!0)
            }), t.controls.appendChild(this.delete_last_row_button), this.remove_all_rows_button = this.getButton(this.translate("button_delete_all"), "delete", this.translate("button_delete_all_title")), this.remove_all_rows_button.addEventListener("click", function(e) {
                e.preventDefault(), e.stopPropagation(), t.setValue([]), t.onChange(!0)
            }), t.controls.appendChild(this.remove_all_rows_button)
        }
    }), n.defaults.editors.multiple = n.AbstractEditor.extend({
        register: function() {
            if (this.editors) {
                for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister();
                this.editors[this.type] && this.editors[this.type].register()
            }
            this._super()
        },
        unregister: function() {
            if (this._super(), this.editors)
                for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister()
        },
        getNumColumns: function() {
            return this.editors[this.type] ? Math.max(this.editors[this.type].getNumColumns(), 4) : 4
        },
        enable: function() {
            if (this.editors)
                for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].enable();
            this.switcher.disabled = !1, this._super()
        },
        disable: function() {
            if (this.editors)
                for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].disable();
            this.switcher.disabled = !0, this._super()
        },
        switchEditor: function(t) {
            var e = this;
            this.editors[t] || this.buildChildEditor(t);
            var i = e.getValue();
            e.type = t, e.register(), s(e.editors, function(t, s) {
                s && (e.type === t ? (e.keep_values && s.setValue(i, !0), s.container.style.display = "") : s.container.style.display = "none")
            }), e.refreshValue(), e.refreshHeaderText()
        },
        buildChildEditor: function(t) {
            var e = this,
                s = this.types[t],
                r = e.theme.getChildEditorHolder();
            e.editor_holder.appendChild(r);
            var n;
            "string" == typeof s ? (n = i({}, e.schema), n.type = s) : (n = i({}, e.schema, s), n = e.jsoneditor.expandRefs(n), s.required && Array.isArray(s.required) && e.schema.required && Array.isArray(e.schema.required) && (n.required = e.schema.required.concat(s.required)));
            var o = e.jsoneditor.getEditorClass(n);
            e.editors[t] = e.jsoneditor.createEditor(o, {
                jsoneditor: e.jsoneditor,
                schema: n,
                container: r,
                path: e.path,
                parent: e,
                required: !0
            }), e.editors[t].preBuild(), e.editors[t].build(), e.editors[t].postBuild(), e.editors[t].header && (e.editors[t].header.style.display = "none"), e.editors[t].option = e.switcher_options[t], r.addEventListener("change_header_text", function() {
                e.refreshHeaderText()
            }), t !== e.type && (r.style.display = "none")
        },
        preBuild: function() {
            if (this.types = [], this.type = 0, this.editors = [], this.validators = [], this.keep_values = !0, "undefined" != typeof this.jsoneditor.options.keep_oneof_values && (this.keep_values = this.jsoneditor.options.keep_oneof_values), "undefined" != typeof this.options.keep_oneof_values && (this.keep_values = this.options.keep_oneof_values), this.schema.oneOf) this.oneOf = !0, this.types = this.schema.oneOf, delete this.schema.oneOf;
            else if (this.schema.anyOf) this.anyOf = !0, this.types = this.schema.anyOf, delete this.schema.anyOf;
            else {
                if (this.schema.type && "any" !== this.schema.type) Array.isArray(this.schema.type) ? this.types = this.schema.type : this.types = [this.schema.type];
                else if (this.types = ["string", "number", "integer", "boolean", "object", "array", "null"], this.schema.disallow) {
                    var t = this.schema.disallow;
                    "object" == typeof t && Array.isArray(t) || (t = [t]);
                    var e = [];
                    s(this.types, function(i, s) {
                        -1 === t.indexOf(s) && e.push(s)
                    }), this.types = e
                }
                delete this.schema.type
            }
            this.display_text = this.getDisplayText(this.types)
        },
        build: function() {
            var t = this,
                e = this.container;
            this.header = this.label = this.theme.getFormInputLabel(this.getTitle()), this.container.appendChild(this.header), this.switcher = this.theme.getSwitcher(this.display_text), e.appendChild(this.switcher), this.switcher.addEventListener("change", function(e) {
                e.preventDefault(), e.stopPropagation(), t.switchEditor(t.display_text.indexOf(this.value)), t.onChange(!0)
            }), this.editor_holder = document.createElement("div"), e.appendChild(this.editor_holder);
            var r = {};
            t.jsoneditor.options.custom_validators && (r.custom_validators = t.jsoneditor.options.custom_validators), this.switcher_options = this.theme.getSwitcherOptions(this.switcher), s(this.types, function(e, s) {
                t.editors[e] = !1;
                var o;
                "string" == typeof s ? (o = i({}, t.schema), o.type = s) : (o = i({}, t.schema, s), s.required && Array.isArray(s.required) && t.schema.required && Array.isArray(t.schema.required) && (o.required = t.schema.required.concat(s.required))), t.validators[e] = new n.Validator(t.jsoneditor, o, r)
            }), this.switchEditor(0)
        },
        onChildEditorChange: function(t) {
            this.editors[this.type] && (this.refreshValue(), this.refreshHeaderText()), this._super()
        },
        refreshHeaderText: function() {
            var t = this.getDisplayText(this.types);
            s(this.switcher_options, function(e, i) {
                i.textContent = t[e]
            })
        },
        refreshValue: function() {
            this.value = this.editors[this.type].getValue()
        },
        setValue: function(t, e) {
            var i = this;
            s(this.validators, function(e, s) {
                return s.validate(t).length ? void 0 : (i.type = e, i.switcher.value = i.display_text[e], !1)
            }), this.switchEditor(this.type), this.editors[this.type].setValue(t, e), this.refreshValue(), i.onChange()
        },
        destroy: function() {
            s(this.editors, function(t, e) {
                e && e.destroy()
            }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), this._super()
        },
        showValidationErrors: function(t) {
            var e = this;
            if (this.oneOf || this.anyOf) {
                var r = this.oneOf ? "oneOf" : "anyOf";
                s(this.editors, function(n, o) {
                    if (o) {
                        var a = e.path + "." + r + "[" + n + "]",
                            l = [];
                        s(t, function(t, s) {
                            if (s.path.substr(0, a.length) === a) {
                                var r = i({}, s);
                                r.path = e.path + r.path.substr(a.length), l.push(r)
                            }
                        }), o.showValidationErrors(l)
                    }
                })
            } else s(this.editors, function(e, i) {
                i && i.showValidationErrors(t)
            })
        }
    }), n.defaults.editors["enum"] = n.AbstractEditor.extend({
        getNumColumns: function() {
            return 4
        },
        build: function() {
            this.container, this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle()), this.container.appendChild(this.title), this.options.enum_titles = this.options.enum_titles || [], this["enum"] = this.schema["enum"], this.selected = 0, this.select_options = [], this.html_values = [];
            for (var t = this, e = 0; e < this["enum"].length; e++) this.select_options[e] = this.options.enum_titles[e] || "Value " + (e + 1), this.html_values[e] = this.getHTML(this["enum"][e]);
            this.switcher = this.theme.getSwitcher(this.select_options), this.container.appendChild(this.switcher), this.display_area = this.theme.getIndentedPanel(), this.container.appendChild(this.display_area), this.options.hide_display && (this.display_area.style.display = "none"), this.switcher.addEventListener("change", function() {
                t.selected = t.select_options.indexOf(this.value), t.value = t["enum"][t.selected], t.refreshValue(), t.onChange(!0)
            }), this.value = this["enum"][0], this.refreshValue(), 1 === this["enum"].length && (this.switcher.style.display = "none")
        },
        refreshValue: function() {
            var t = this;
            t.selected = -1;
            var e = JSON.stringify(this.value);
            return s(this["enum"], function(i, s) {
                return e === JSON.stringify(s) ? (t.selected = i, !1) : void 0
            }), t.selected < 0 ? void t.setValue(t["enum"][0]) : (this.switcher.value = this.select_options[this.selected], void(this.display_area.innerHTML = this.html_values[this.selected]))
        },
        enable: function() {
            this.always_disabled || (this.switcher.disabled = !1), this._super()
        },
        disable: function() {
            this.switcher.disabled = !0, this._super()
        },
        getHTML: function(t) {
            var e = this;
            if (null === t) return "<em>null</em>";
            if ("object" == typeof t) {
                var i = "";
                return s(t, function(s, r) {
                    var n = e.getHTML(r);
                    Array.isArray(t) || (n = "<div><em>" + s + "</em>: " + n + "</div>"), i += "<li>" + n + "</li>"
                }), i = Array.isArray(t) ? "<ol>" + i + "</ol>" : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>" + i + "</ul>"
            }
            return "boolean" == typeof t ? t ? "true" : "false" : "string" == typeof t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : t
        },
        setValue: function(t) {
            this.value !== t && (this.value = t, this.refreshValue(), this.onChange())
        },
        destroy: function() {
            this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), this._super()
        }
    }), n.defaults.editors.select = n.AbstractEditor.extend({
        setValue: function(t, e) {
            t = this.typecast(t || "");
            var i = t;
            this.enum_values.indexOf(i) < 0 && (i = this.enum_values[0]), this.value !== i && (this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.select2 && this.select2.select2("val", this.input.value), this.value = i, this.onChange())
        },
        register: function() {
            this._super(), this.input && this.input.setAttribute("name", this.formname)
        },
        unregister: function() {
            this._super(), this.input && this.input.removeAttribute("name")
        },
        getNumColumns: function() {
            if (!this.enum_options) return 3;
            for (var t = this.getTitle().length, e = 0; e < this.enum_options.length; e++) t = Math.max(t, this.enum_options[e].length + 4);
            return Math.min(12, Math.max(t / 7, 2))
        },
        typecast: function(t) {
            return "boolean" === this.schema.type ? !!t : "number" === this.schema.type ? 1 * t : "integer" === this.schema.type ? Math.floor(1 * t) : "" + t
        },
        getValue: function() {
            return this.value
        },
        preBuild: function() {
            var t = this;
            this.input_type = "select", this.enum_options = [], this.enum_values = [], this.enum_display = [];
            var e;
            if (this.schema["enum"]) {
                var r = this.schema.options && this.schema.options.enum_titles || [];
                s(this.schema["enum"], function(e, i) {
                    t.enum_options[e] = "" + i, t.enum_display[e] = "" + (r[e] || i), t.enum_values[e] = t.typecast(i)
                }), this.isRequired() || (t.enum_display.unshift(" "), t.enum_options.unshift("undefined"), t.enum_values.unshift(void 0))
            } else if ("boolean" === this.schema.type) t.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], t.enum_options = ["1", ""], t.enum_values = [!0, !1], this.isRequired() || (t.enum_display.unshift(" "), t.enum_options.unshift("undefined"), t.enum_values.unshift(void 0));
            else {
                if (!this.schema.enumSource) throw "'select' editor requires the enum property to be set.";
                if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource))
                    for (e = 0; e < this.schema.enumSource.length; e++) "string" == typeof this.schema.enumSource[e] ? this.enumSource[e] = {
                        source: this.schema.enumSource[e]
                    } : Array.isArray(this.schema.enumSource[e]) ? this.enumSource[e] = this.schema.enumSource[e] : this.enumSource[e] = i({}, this.schema.enumSource[e]);
                else this.schema.enumValue ? this.enumSource = [{
                    source: this.schema.enumSource,
                    value: this.schema.enumValue
                }] : this.enumSource = [{
                    source: this.schema.enumSource
                }];
                for (e = 0; e < this.enumSource.length; e++) this.enumSource[e].value && (this.enumSource[e].value = this.jsoneditor.compileTemplate(this.enumSource[e].value, this.template_engine)), this.enumSource[e].title && (this.enumSource[e].title = this.jsoneditor.compileTemplate(this.enumSource[e].title, this.template_engine)), this.enumSource[e].filter && (this.enumSource[e].filter = this.jsoneditor.compileTemplate(this.enumSource[e].filter, this.template_engine))
            }
        },
        build: function() {
            var t = this;
            this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.compact && (this.container.className += " compact"), this.input = this.theme.getSelectInput(this.enum_options), this.theme.setSelectOptions(this.input, this.enum_options, this.enum_display), (this.schema.readOnly || this.schema.readonly) && (this.always_disabled = !0, this.input.disabled = !0), this.input.addEventListener("change", function(e) {
                e.preventDefault(), e.stopPropagation(), t.onInputChange()
            }), this.control = this.theme.getFormControl(this.label, this.input, this.description), this.container.appendChild(this.control), this.value = this.enum_values[0]
        },
        onInputChange: function() {
            var t, e = this.input.value;
            t = -1 === this.enum_options.indexOf(e) ? this.enum_values[0] : this.enum_values[this.enum_options.indexOf(e)], t !== this.value && (this.value = t, this.onChange(!0))
        },
        setupSelect2: function() {
            if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && (this.enum_options.length > 2 || this.enum_options.length && this.enumSource)) {
                var t = i({}, n.plugins.select2);
                this.schema.options && this.schema.options.select2_options && (t = i(t, this.schema.options.select2_options)), this.select2 = window.jQuery(this.input).select2(t);
                var e = this;
                this.select2.on("select2-blur", function() {
                    e.input.value = e.select2.select2("val"), e.onInputChange()
                }), this.select2.on("change", function() {
                    e.input.value = e.select2.select2("val"), e.onInputChange()
                })
            } else this.select2 = null
        },
        postBuild: function() {
            this._super(), this.theme.afterInputReady(this.input), this.setupSelect2()
        },
        onWatchedFieldChange: function() {
            var t, e;
            if (this.enumSource) {
                t = this.getWatchedFieldValues();
                for (var i = [], s = [], r = 0; r < this.enumSource.length; r++)
                    if (Array.isArray(this.enumSource[r])) i = i.concat(this.enumSource[r]), s = s.concat(this.enumSource[r]);
                    else {
                        var n = [];
                        if (n = Array.isArray(this.enumSource[r].source) ? this.enumSource[r].source : t[this.enumSource[r].source]) {
                            if (this.enumSource[r].slice && (n = Array.prototype.slice.apply(n, this.enumSource[r].slice)), this.enumSource[r].filter) {
                                var o = [];
                                for (e = 0; e < n.length; e++) this.enumSource[r].filter({
                                    i: e,
                                    item: n[e],
                                    watched: t
                                }) && o.push(n[e]);
                                n = o
                            }
                            var a = [],
                                l = [];
                            for (e = 0; e < n.length; e++) {
                                var h = n[e];
                                this.enumSource[r].value ? l[e] = this.enumSource[r].value({
                                    i: e,
                                    item: h
                                }) : l[e] = n[e], this.enumSource[r].title ? a[e] = this.enumSource[r].title({
                                    i: e,
                                    item: h
                                }) : a[e] = l[e]
                            }
                            i = i.concat(l), s = s.concat(a)
                        }
                    }
                var d = this.value;
                this.theme.setSelectOptions(this.input, i, s), this.enum_options = i, this.enum_display = s, this.enum_values = i, this.select2 && this.select2.select2("destroy"), -1 !== i.indexOf(d) ? (this.input.value = d, this.value = d) : (this.input.value = i[0], this.value = i[0] || "", this.parent ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange(), this.jsoneditor.notifyWatchers(this.path)), this.setupSelect2()
            }
            this._super()
        },
        enable: function() {
            this.always_disabled || (this.input.disabled = !1, this.select2 && this.select2.select2("enable", !0)), this._super()
        },
        disable: function() {
            this.input.disabled = !0, this.select2 && this.select2.select2("enable", !1), this._super()
        },
        destroy: function() {
            this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.select2 && (this.select2.select2("destroy"), this.select2 = null), this._super()
        }
    }), n.defaults.editors.selectize = n.AbstractEditor.extend({
        setValue: function(t, e) {
            t = this.typecast(t || "");
            var i = t;
            this.enum_values.indexOf(i) < 0 && (i = this.enum_values[0]), this.value !== i && (this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.selectize && this.selectize[0].selectize.addItem(i), this.value = i, this.onChange())
        },
        register: function() {
            this._super(), this.input && this.input.setAttribute("name", this.formname)
        },
        unregister: function() {
            this._super(), this.input && this.input.removeAttribute("name")
        },
        getNumColumns: function() {
            if (!this.enum_options) return 3;
            for (var t = this.getTitle().length, e = 0; e < this.enum_options.length; e++) t = Math.max(t, this.enum_options[e].length + 4);
            return Math.min(12, Math.max(t / 7, 2))
        },
        typecast: function(t) {
            return "boolean" === this.schema.type ? !!t : "number" === this.schema.type ? 1 * t : "integer" === this.schema.type ? Math.floor(1 * t) : "" + t
        },
        getValue: function() {
            return this.value
        },
        preBuild: function() {
            var t = this;
            this.input_type = "select", this.enum_options = [], this.enum_values = [], this.enum_display = [];
            var e;
            if (this.schema["enum"]) {
                var r = this.schema.options && this.schema.options.enum_titles || [];
                s(this.schema["enum"], function(e, i) {
                    t.enum_options[e] = "" + i, t.enum_display[e] = "" + (r[e] || i), t.enum_values[e] = t.typecast(i)
                })
            } else if ("boolean" === this.schema.type) t.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], t.enum_options = ["1", "0"], t.enum_values = [!0, !1];
            else {
                if (!this.schema.enumSource) throw "'select' editor requires the enum property to be set.";
                if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource))
                    for (e = 0; e < this.schema.enumSource.length; e++) "string" == typeof this.schema.enumSource[e] ? this.enumSource[e] = {
                        source: this.schema.enumSource[e]
                    } : Array.isArray(this.schema.enumSource[e]) ? this.enumSource[e] = this.schema.enumSource[e] : this.enumSource[e] = i({}, this.schema.enumSource[e]);
                else this.schema.enumValue ? this.enumSource = [{
                    source: this.schema.enumSource,
                    value: this.schema.enumValue
                }] : this.enumSource = [{
                    source: this.schema.enumSource
                }];
                for (e = 0; e < this.enumSource.length; e++) this.enumSource[e].value && (this.enumSource[e].value = this.jsoneditor.compileTemplate(this.enumSource[e].value, this.template_engine)), this.enumSource[e].title && (this.enumSource[e].title = this.jsoneditor.compileTemplate(this.enumSource[e].title, this.template_engine)), this.enumSource[e].filter && (this.enumSource[e].filter = this.jsoneditor.compileTemplate(this.enumSource[e].filter, this.template_engine))
            }
        },
        build: function() {
            var t = this;
            this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.compact && (this.container.className += " compact"), this.input = this.theme.getSelectInput(this.enum_options), this.theme.setSelectOptions(this.input, this.enum_options, this.enum_display), (this.schema.readOnly || this.schema.readonly) && (this.always_disabled = !0, this.input.disabled = !0), this.input.addEventListener("change", function(e) {
                e.preventDefault(), e.stopPropagation(), t.onInputChange()
            }), this.control = this.theme.getFormControl(this.label, this.input, this.description), this.container.appendChild(this.control), this.value = this.enum_values[0]
        },
        onInputChange: function() {
            var t = this.input.value,
                e = t; - 1 === this.enum_options.indexOf(t) && (e = this.enum_options[0]), this.value = this.enum_values[this.enum_options.indexOf(t)], this.onChange(!0)
        },
        setupSelectize: function() {
            var t = this;
            if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && (this.enum_options.length >= 2 || this.enum_options.length && this.enumSource)) {
                var e = i({}, n.plugins.selectize);
                this.schema.options && this.schema.options.selectize_options && (e = i(e, this.schema.options.selectize_options)), this.selectize = window.jQuery(this.input).selectize(i(e, {
                    create: !0,
                    onChange: function() {
                        t.onInputChange()
                    }
                }))
            } else this.selectize = null
        },
        postBuild: function() {
            this._super(), this.theme.afterInputReady(this.input), this.setupSelectize()
        },
        onWatchedFieldChange: function() {
            var t, e;
            if (this.enumSource) {
                t = this.getWatchedFieldValues();
                for (var i = [], s = [], r = 0; r < this.enumSource.length; r++)
                    if (Array.isArray(this.enumSource[r])) i = i.concat(this.enumSource[r]), s = s.concat(this.enumSource[r]);
                    else if (t[this.enumSource[r].source]) {
                    var n = t[this.enumSource[r].source];
                    if (this.enumSource[r].slice && (n = Array.prototype.slice.apply(n, this.enumSource[r].slice)), this.enumSource[r].filter) {
                        var o = [];
                        for (e = 0; e < n.length; e++) this.enumSource[r].filter({
                            i: e,
                            item: n[e]
                        }) && o.push(n[e]);
                        n = o
                    }
                    var a = [],
                        l = [];
                    for (e = 0; e < n.length; e++) {
                        var h = n[e];
                        this.enumSource[r].value ? l[e] = this.enumSource[r].value({
                            i: e,
                            item: h
                        }) : l[e] = n[e], this.enumSource[r].title ? a[e] = this.enumSource[r].title({
                            i: e,
                            item: h
                        }) : a[e] = l[e]
                    }
                    i = i.concat(l), s = s.concat(a)
                }
                var d = this.value;
                this.theme.setSelectOptions(this.input, i, s), this.enum_options = i, this.enum_display = s, this.enum_values = i, -1 !== i.indexOf(d) ? (this.input.value = d, this.value = d) : (this.input.value = i[0], this.value = i[0] || "", this.parent ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange(), this.jsoneditor.notifyWatchers(this.path)), this.selectize ? this.updateSelectizeOptions(i) : this.setupSelectize(), this._super()
            }
        },
        updateSelectizeOptions: function(t) {
            var e = this.selectize[0].selectize,
                i = this;
            e.off(), e.clearOptions();
            for (var s in t) e.addOption({
                value: t[s],
                text: t[s]
            });
            e.addItem(this.value), e.on("change", function() {
                i.onInputChange()
            })
        },
        enable: function() {
            this.always_disabled || (this.input.disabled = !1, this.selectize && this.selectize[0].selectize.unlock()), this._super()
        },
        disable: function() {
            this.input.disabled = !0, this.selectize && this.selectize[0].selectize.lock(), this._super()
        },
        destroy: function() {
            this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.selectize && (this.selectize[0].selectize.destroy(), this.selectize = null), this._super()
        }
    }), n.defaults.editors.multiselect = n.AbstractEditor.extend({
        preBuild: function() {
            this._super();
            var t;
            this.select_options = {}, this.select_values = {};
            var e = this.jsoneditor.expandRefs(this.schema.items || {}),
                i = e["enum"] || [],
                s = e.options ? e.options.enum_titles || [] : [];
            for (this.option_keys = [], this.option_titles = [], t = 0; t < i.length; t++) this.sanitize(i[t]) === i[t] && (this.option_keys.push(i[t] + ""), this.option_titles.push((s[t] || i[t]) + ""), this.select_values[i[t] + ""] = i[t])
        },
        build: function() {
            var t, e = this;
            if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), !this.schema.format && this.option_keys.length < 8 || "checkbox" === this.schema.format) {
                for (this.input_type = "checkboxes", this.inputs = {}, this.controls = {}, t = 0; t < this.option_keys.length; t++) {
                    this.inputs[this.option_keys[t]] = this.theme.getCheckbox(), this.select_options[this.option_keys[t]] = this.inputs[this.option_keys[t]];
                    var i = this.theme.getCheckboxLabel(this.option_titles[t]);
                    this.controls[this.option_keys[t]] = this.theme.getFormControl(i, this.inputs[this.option_keys[t]])
                }
                this.control = this.theme.getMultiCheckboxHolder(this.controls, this.label, this.description)
            } else {
                for (this.input_type = "select", this.input = this.theme.getSelectInput(this.option_keys), this.theme.setSelectOptions(this.input, this.option_keys, this.option_titles), this.input.multiple = !0, this.input.size = Math.min(10, this.option_keys.length), t = 0; t < this.option_keys.length; t++) this.select_options[this.option_keys[t]] = this.input.children[t];
                (this.schema.readOnly || this.schema.readonly) && (this.always_disabled = !0, this.input.disabled = !0), this.control = this.theme.getFormControl(this.label, this.input, this.description)
            }
            this.container.appendChild(this.control), this.control.addEventListener("change", function(i) {
                i.preventDefault(), i.stopPropagation();
                var s = [];
                for (t = 0; t < e.option_keys.length; t++)(e.select_options[e.option_keys[t]].selected || e.select_options[e.option_keys[t]].checked) && s.push(e.select_values[e.option_keys[t]]);
                e.updateValue(s), e.onChange(!0)
            })
        },
        setValue: function(t, e) {
            var i;
            for (t = t || [], "object" != typeof t ? t = [t] : Array.isArray(t) || (t = []), i = 0; i < t.length; i++) "string" != typeof t[i] && (t[i] += "");
            for (i in this.select_options) this.select_options.hasOwnProperty(i) && (this.select_options[i]["select" === this.input_type ? "selected" : "checked"] = -1 !== t.indexOf(i));
            this.updateValue(t), this.onChange()
        },
        setupSelect2: function() {
            if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2) {
                var t = window.jQuery.extend({}, n.plugins.select2);
                this.schema.options && this.schema.options.select2_options && (t = i(t, this.schema.options.select2_options)), this.select2 = window.jQuery(this.input).select2(t);
                var e = this;
                this.select2.on("select2-blur", function() {
                    var t = e.select2.select2("val");
                    e.value = t, e.onChange(!0)
                })
            } else this.select2 = null
        },
        onInputChange: function() {
            this.value = this.input.value, this.onChange(!0)
        },
        postBuild: function() {
            this._super(), this.setupSelect2()
        },
        register: function() {
            this._super(), this.input && this.input.setAttribute("name", this.formname)
        },
        unregister: function() {
            this._super(), this.input && this.input.removeAttribute("name")
        },
        getNumColumns: function() {
            var t = this.getTitle().length;
            for (var e in this.select_values) this.select_values.hasOwnProperty(e) && (t = Math.max(t, (this.select_values[e] + "").length + 4));
            return Math.min(12, Math.max(t / 7, 2))
        },
        updateValue: function(t) {
            for (var e = !1, i = [], s = 0; s < t.length; s++)
                if (this.select_options[t[s] + ""]) {
                    var r = this.sanitize(this.select_values[t[s]]);
                    i.push(r), r !== t[s] && (e = !0)
                } else e = !0;
            return this.value = i, this.select2 && this.select2.select2("val", this.value), e
        },
        sanitize: function(t) {
            return "number" === this.schema.items.type ? 1 * t : "integer" === this.schema.items.type ? Math.floor(1 * t) : "" + t
        },
        enable: function() {
            if (!this.always_disabled) {
                if (this.input) this.input.disabled = !1;
                else if (this.inputs)
                    for (var t in this.inputs) this.inputs.hasOwnProperty(t) && (this.inputs[t].disabled = !1);
                this.select2 && this.select2.select2("enable", !0)
            }
            this._super()
        },
        disable: function() {
            if (this.input) this.input.disabled = !0;
            else if (this.inputs)
                for (var t in this.inputs) this.inputs.hasOwnProperty(t) && (this.inputs[t].disabled = !0);
            this.select2 && this.select2.select2("enable", !1), this._super()
        },
        destroy: function() {
            this.select2 && (this.select2.select2("destroy"), this.select2 = null), this._super()
        }
    }), n.defaults.editors.base64 = n.AbstractEditor.extend({
        getNumColumns: function() {
            return 4
        },
        build: function() {
            var t = this;
            if (this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle()), this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
                if (!window.FileReader) throw "FileReader required for base64 editor";
                this.uploader = this.theme.getFormInputField("file"), this.uploader.addEventListener("change", function(e) {
                    if (e.preventDefault(), e.stopPropagation(), this.files && this.files.length) {
                        var i = new FileReader;
                        i.onload = function(e) {
                            t.value = e.target.result, t.refreshPreview(), t.onChange(!0), i = null
                        }, i.readAsDataURL(this.files[0])
                    }
                })
            }
            this.preview = this.theme.getFormInputDescription(this.schema.description), this.container.appendChild(this.preview), this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview), this.container.appendChild(this.control)
        },
        refreshPreview: function() {
            if (this.last_preview !== this.value && (this.last_preview = this.value, this.preview.innerHTML = "", this.value)) {
                var t = this.value.match(/^data:([^;,]+)[;,]/);
                if (t && (t = t[1]), t) {
                    if (this.preview.innerHTML = "<strong>Type:</strong> " + t + ", <strong>Size:</strong> " + Math.floor((this.value.length - this.value.split(",")[0].length - 1) / 1.33333) + " bytes", "image" === t.substr(0, 5)) {
                        this.preview.innerHTML += "<br>";
                        var e = document.createElement("img");
                        e.style.maxWidth = "100%", e.style.maxHeight = "100px", e.src = this.value, this.preview.appendChild(e)
                    }
                } else this.preview.innerHTML = "<em>Invalid data URI</em>"
            }
        },
        enable: function() {
            this.uploader && (this.uploader.disabled = !1), this._super()
        },
        disable: function() {
            this.uploader && (this.uploader.disabled = !0), this._super()
        },
        setValue: function(t) {
            this.value !== t && (this.value = t, this.input.value = this.value, this.refreshPreview(), this.onChange())
        },
        destroy: function() {
            this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), this._super()
        }
    }), n.defaults.editors.upload = n.AbstractEditor.extend({
        getNumColumns: function() {
            return 4
        },
        build: function() {
            var t = this;
            if (this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle()), this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
                if (!this.jsoneditor.options.upload) throw "Upload handler required for upload editor";
                this.uploader = this.theme.getFormInputField("file"), this.uploader.addEventListener("change", function(e) {
                    if (e.preventDefault(), e.stopPropagation(), this.files && this.files.length) {
                        var i = new FileReader;
                        i.onload = function(e) {
                            t.preview_value = e.target.result, t.refreshPreview(), t.onChange(!0), i = null
                        }, i.readAsDataURL(this.files[0])
                    }
                })
            }
            var e = this.schema.description;
            e || (e = ""), this.preview = this.theme.getFormInputDescription(e), this.container.appendChild(this.preview), this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview), this.container.appendChild(this.control)
        },
        refreshPreview: function() {
            if (this.last_preview !== this.preview_value && (this.last_preview = this.preview_value, this.preview.innerHTML = "", this.preview_value)) {
                var t = this,
                    e = this.preview_value.match(/^data:([^;,]+)[;,]/);
                e && (e = e[1]), e || (e = "unknown");
                var i = this.uploader.files[0];
                if (this.preview.innerHTML = "<strong>Type:</strong> " + e + ", <strong>Size:</strong> " + i.size + " bytes", "image" === e.substr(0, 5)) {
                    this.preview.innerHTML += "<br>";
                    var s = document.createElement("img");
                    s.style.maxWidth = "100%", s.style.maxHeight = "100px", s.src = this.preview_value, this.preview.appendChild(s)
                }
                this.preview.innerHTML += "<br>";
                var r = this.getButton("Upload", "upload", "Upload");
                this.preview.appendChild(r), r.addEventListener("click", function(e) {
                    e.preventDefault(), r.setAttribute("disabled", "disabled"), t.theme.removeInputError(t.uploader), t.theme.getProgressBar && (t.progressBar = t.theme.getProgressBar(), t.preview.appendChild(t.progressBar)), t.jsoneditor.options.upload(t.path, i, {
                        success: function(e) {
                            t.setValue(e), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange(), t.progressBar && t.preview.removeChild(t.progressBar), r.removeAttribute("disabled")
                        },
                        failure: function(e) {
                            t.theme.addInputError(t.uploader, e), t.progressBar && t.preview.removeChild(t.progressBar), r.removeAttribute("disabled")
                        },
                        updateProgress: function(e) {
                            t.progressBar && (e ? t.theme.updateProgressBar(t.progressBar, e) : t.theme.updateProgressBarUnknown(t.progressBar))
                        }
                    })
                })
            }
        },
        enable: function() {
            this.uploader && (this.uploader.disabled = !1), this._super()
        },
        disable: function() {
            this.uploader && (this.uploader.disabled = !0), this._super()
        },
        setValue: function(t) {
            this.value !== t && (this.value = t, this.input.value = this.value, this.onChange())
        },
        destroy: function() {
            this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), this._super()
        }
    }), n.defaults.editors.checkbox = n.AbstractEditor.extend({
        setValue: function(t, e) {
            this.value = !!t, this.input.checked = this.value, this.onChange()
        },
        register: function() {
            this._super(), this.input && this.input.setAttribute("name", this.formname)
        },
        unregister: function() {
            this._super(), this.input && this.input.removeAttribute("name")
        },
        getNumColumns: function() {
            return Math.min(12, Math.max(this.getTitle().length / 7, 2))
        },
        build: function() {
            var t = this;
            this.options.compact || (this.label = this.header = this.theme.getCheckboxLabel(this.getTitle())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.compact && (this.container.className += " compact"), this.input = this.theme.getCheckbox(), this.control = this.theme.getFormControl(this.label, this.input, this.description), (this.schema.readOnly || this.schema.readonly) && (this.always_disabled = !0, this.input.disabled = !0), this.input.addEventListener("change", function(e) {
                e.preventDefault(), e.stopPropagation(), t.value = this.checked, t.onChange(!0)
            }), this.container.appendChild(this.control)
        },
        enable: function() {
            this.always_disabled || (this.input.disabled = !1), this._super()
        },
        disable: function() {
            this.input.disabled = !0, this._super()
        },
        destroy: function() {
            this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this._super()
        }
    }), n.defaults.editors.arraySelectize = n.AbstractEditor.extend({
        build: function() {
            this.title = this.theme.getFormInputLabel(this.getTitle()), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.error_holder = document.createElement("div"), this.schema.description && (this.description = this.theme.getDescription(this.schema.description)), this.input = document.createElement("select"), this.input.setAttribute("multiple", "multiple");
            var t = this.theme.getFormControl(this.title, this.input, this.description);
            this.container.appendChild(t), this.container.appendChild(this.error_holder), window.jQuery(this.input).selectize({
                delimiter: !1,
                createOnBlur: !0,
                create: !0
            })
        },
        postBuild: function() {
            var t = this;
            this.input.selectize.on("change", function(e) {
                t.refreshValue(), t.onChange(!0)
            })
        },
        destroy: function() {
            this.empty(!0), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this._super()
        },
        empty: function(t) {},
        setValue: function(t, e) {
            var i = this;
            t = t || [], Array.isArray(t) || (t = [t]), this.input.selectize.clearOptions(), this.input.selectize.clear(!0), t.forEach(function(t) {
                i.input.selectize.addOption({
                    text: t,
                    value: t
                })
            }), this.input.selectize.setValue(t), this.refreshValue(e)
        },
        refreshValue: function(t) {
            this.value = this.input.selectize.getValue()
        },
        showValidationErrors: function(t) {
            var e = this,
                i = [],
                r = [];
            s(t, function(t, s) {
                s.path === e.path ? i.push(s) : r.push(s)
            }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", s(i, function(t, i) {
                e.error_holder.appendChild(e.theme.getErrorMessage(i.message))
            })) : this.error_holder.style.display = "none")
        }
    });
    var o = function() {
        var t = document.documentElement;
        return t.matches ? "matches" : t.webkitMatchesSelector ? "webkitMatchesSelector" : t.mozMatchesSelector ? "mozMatchesSelector" : t.msMatchesSelector ? "msMatchesSelector" : t.oMatchesSelector ? "oMatchesSelector" : void 0
    }();
    n.AbstractTheme = t.extend({
        getContainer: function() {
            return document.createElement("div")
        },
        getFloatRightLinkHolder: function() {
            var t = document.createElement("div");
            return t.style = t.style || {}, t.style.cssFloat = "right", t.style.marginLeft = "10px", t
        },
        getModal: function() {
            var t = document.createElement("div");
            return t.style.backgroundColor = "#212121", t.style.boxShadow = "0 0 20px black",t.style.opacity = ".95", t.style.position = "absolute", t.style.zIndex = "10", t.style.display = "none", t
        },
        getGridContainer: function() {
            var t = document.createElement("div");
            return t
        },
        getGridRow: function() {
            var t = document.createElement("div");
            return t.className = "row", t
        },
        getGridColumn: function() {
            var t = document.createElement("div");
            return t
        },
        setGridColumnSize: function(t, e) {},
        getLink: function(t) {
            var e = document.createElement("a");
            return e.setAttribute("href", "#"), e.appendChild(document.createTextNode(t)), e
        },
        disableHeader: function(t) {
            t.style.color = "#ccc"
        },
        disableLabel: function(t) {
            t.style.color = "#ccc"
        },
        enableHeader: function(t) {
            t.style.color = ""
        },
        enableLabel: function(t) {
            t.style.color = ""
        },
        getFormInputLabel: function(t) {
            var e = document.createElement("label");
            return e.appendChild(document.createTextNode(t)), e
        },
        getCheckboxLabel: function(t) {
            var e = this.getFormInputLabel(t);
            return e.style.fontWeight = "normal", e
        },
        getHeader: function(t) {
            var e = document.createElement("h3");
            return "string" == typeof t ? e.textContent = t : e.appendChild(t), e
        },
        getCheckbox: function() {
            var t = this.getFormInputField("checkbox");
            return t.style.display = "inline-block", t.style.width = "auto", t
        },
        getMultiCheckboxHolder: function(t, e, i) {
            var s = document.createElement("div");
            e && (e.style.display = "block", s.appendChild(e));
            for (var r in t) t.hasOwnProperty(r) && (t[r].style.display = "inline-block", t[r].style.marginRight = "20px", s.appendChild(t[r]));
            return i && s.appendChild(i), s
        },
        getSelectInput: function(t) {
            var e = document.createElement("select");
            return t && this.setSelectOptions(e, t), e
        },
        getSwitcher: function(t) {
            var e = this.getSelectInput(t);
            return e.style.backgroundColor = "transparent", e.style.display = "inline-block", e.style.fontStyle = "italic", e.style.fontWeight = "normal", e.style.height = "auto", e.style.marginBottom = 0, e.style.marginLeft = "5px", e.style.padding = "0 0 0 3px", e.style.width = "auto", e
        },
        getSwitcherOptions: function(t) {
            return t.getElementsByTagName("option")
        },
        setSwitcherOptions: function(t, e, i) {
            this.setSelectOptions(t, e, i)
        },
        setSelectOptions: function(t, e, i) {
            i = i || [], t.innerHTML = "";
            for (var s = 0; s < e.length; s++) {
                var r = document.createElement("option");
                r.setAttribute("value", e[s]), r.textContent = i[s] || e[s], t.appendChild(r)
            }
        },
        getTextareaInput: function() {
            var t = document.createElement("textarea");
            return t.style = t.style || {}, t.style.width = "100%", t.style.height = "300px", t.style.boxSizing = "border-box", t
        },
        getRangeInput: function(t, e, i) {
            var s = this.getFormInputField("range");
            return s.setAttribute("min", t), s.setAttribute("max", e), s.setAttribute("step", i), s
        },
        getFormInputField: function(t) {
            var e = document.createElement("input");
            return e.setAttribute("type", t), e
        },
        afterInputReady: function(t) {},
        getFormControl: function(t, e, i) {
            var s = document.createElement("div");
            return s.className = "form-control", t && s.appendChild(t), "checkbox" === e.type ? t.insertBefore(e, t.firstChild) : s.appendChild(e), i && s.appendChild(i), s
        },
        getIndentedPanel: function() {
            var t = document.createElement("div");
            return t.style = t.style || {}, t.style.paddingLeft = "10px", t.style.marginLeft = "10px", t.style.borderLeft = "1px solid #ccc", t
        },
        getChildEditorHolder: function() {
            return document.createElement("div")
        },
        getDescription: function(t) {
            var e = document.createElement("p");
            return e.innerHTML = t, e
        },
        getCheckboxDescription: function(t) {
            return this.getDescription(t)
        },
        getFormInputDescription: function(t) {
            return this.getDescription(t)
        },
        getHeaderButtonHolder: function() {
            return this.getButtonHolder()
        },
        getButtonHolder: function() {
            return document.createElement("div")
        },
        getButton: function(t, e, i) {
            var s = document.createElement("button");
            return s.type = "button", this.setButtonText(s, t, e, i), s
        },
        setButtonText: function(t, e, i, s) {
            t.innerHTML = "", i && (t.appendChild(i), t.innerHTML += " "), t.appendChild(document.createTextNode(e)), s && t.setAttribute("title", s)
        },
        getTable: function() {
            return document.createElement("table")
        },
        getTableRow: function() {
            return document.createElement("tr")
        },
        getTableHead: function() {
            return document.createElement("thead")
        },
        getTableBody: function() {
            return document.createElement("tbody")
        },
        getTableHeaderCell: function(t) {
            var e = document.createElement("th");
            return e.textContent = t, e
        },
        getTableCell: function() {
            var t = document.createElement("td");
            return t
        },
        getErrorMessage: function(t) {
            var e = document.createElement("p");
            return e.style = e.style || {}, e.style.color = "red", e.appendChild(document.createTextNode(t)), e
        },
        addInputError: function(t, e) {},
        removeInputError: function(t) {},
        addTableRowError: function(t) {},
        removeTableRowError: function(t) {},
        getTabHolder: function() {
            var t = document.createElement("div");
            return t.innerHTML = "<div style='float: left; width: 130px;' class='tabs'></div><div class='content' style='margin-left: 130px;'></div><div style='clear:both;'></div>", t
        },
        applyStyles: function(t, e) {
            t.style = t.style || {};
            for (var i in e) e.hasOwnProperty(i) && (t.style[i] = e[i])
        },
        closest: function(t, e) {
            for (; t && t !== document;) {
                if (!t[o]) return !1;
                if (t[o](e)) return t;
                t = t.parentNode
            }
            return !1
        },
        getTab: function(t) {
            var e = document.createElement("div");
            return e.appendChild(t), e.style = e.style || {}, this.applyStyles(e, {
                border: "1px solid #ccc",
                borderWidth: "1px 0 1px 1px",
                textAlign: "center",
                lineHeight: "30px",
                borderRadius: "5px",
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                fontWeight: "bold",
                cursor: "pointer"
            }), e
        },
        getTabContentHolder: function(t) {
            return t.children[1]
        },
        getTabContent: function() {
            return this.getIndentedPanel()
        },
        markTabActive: function(t) {
            this.applyStyles(t, {
                opacity: 1,
                background: "white"
            })
        },
        markTabInactive: function(t) {
            this.applyStyles(t, {
                opacity: .5,
                background: ""
            })
        },
        addTab: function(t, e) {
            t.children[0].appendChild(e)
        },
        getBlockLink: function() {
            var t = document.createElement("a");
            return t.style.display = "block", t
        },
        getBlockLinkHolder: function() {
            var t = document.createElement("div");
            return t
        },
        getLinksHolder: function() {
            var t = document.createElement("div");
            return t
        },
        createMediaLink: function(t, e, i) {
            t.appendChild(e), i.style.width = "100%", t.appendChild(i)
        },
        createImageLink: function(t, e, i) {
            t.appendChild(e), e.appendChild(i)
        }
    }), n.defaults.themes.bootstrap3 = n.defaults.themes.cerulean = n.defaults.themes.cosmo = n.defaults.themes.darkly = n.defaults.themes.paper = n.defaults.themes.readable = n.defaults.themes.sandstone = n.defaults.themes.slate = n.defaults.themes.solar = n.defaults.themes.spacelab = n.defaults.themes.superhero = n.defaults.themes.yeti = n.AbstractTheme.extend({
        getSelectInput: function(t) {
            var e = this._super(t);
            return e.className += "form-control", e
        },
        setGridColumnSize: function(t, e) {
            t.className = "col-md-" + e
        },
        afterInputReady: function(t) {
            t.controlgroup || (t.controlgroup = this.closest(t, ".form-group"), this.closest(t, ".compact") && (t.controlgroup.style.marginBottom = 0))
        },
        getTextareaInput: function() {
            var t = document.createElement("textarea");
            return t.className = "form-control", t
        },
        getRangeInput: function(t, e, i) {
            return this._super(t, e, i)
        },
        getFormInputField: function(t) {
            var e = this._super(t);
            return "checkbox" !== t && (e.className += "form-control"), e
        },
        getFormControl: function(t, e, i) {
            var s = document.createElement("div");
            return t && "checkbox" === e.type ? (s.className += " checkbox", t.appendChild(e), t.style.fontSize = "14px", s.style.marginTop = "0", s.appendChild(t), e.style.position = "relative", e.style.cssFloat = "left") : (s.className += " form-group", t && (t.className += " control-label", s.appendChild(t)), s.appendChild(e)), i && s.appendChild(i), s
        },
        getIndentedPanel: function() {
            var t = document.createElement("div");
            return t.className = "well well-sm", t.style.paddingBottom = 0, t
        },
        getFormInputDescription: function(t) {
            var e = document.createElement("p");
            return e.className = "help-block", e.innerHTML = t, e
        },
        getHeaderButtonHolder: function() {
            var t = this.getButtonHolder();
            return t.style.marginLeft = "10px", t
        },
        getButtonHolder: function() {
            var t = document.createElement("div");
            return t.className = "btn-group", t
        },
        getButton: function(t, e, i) {
            var s = this._super(t, e, i);
            return s.className += "btn btn-default", s
        },
        getTable: function() {
            var t = document.createElement("table");
            return t.className = "table table-bordered", t.style.width = "auto", t.style.maxWidth = "none", t
        },
        addInputError: function(t, e) {
            t.controlgroup && (t.controlgroup.className += " has-error", t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("p"), t.errmsg.className = "help-block errormsg", t.controlgroup.appendChild(t.errmsg)), t.errmsg.textContent = e)
        },
        removeInputError: function(t) {
            t.errmsg && (t.errmsg.style.display = "none", t.controlgroup.className = t.controlgroup.className.replace(/\s?has-error/g, ""))
        },
        getTabHolder: function() {
            var t = document.createElement("div");
            return t.innerHTML = "<div class='tabs list-group col-md-2'></div><div class='col-md-10'></div>", t.className = "rows", t
        },
        getTab: function(t) {
            var e = document.createElement("a");
            return e.className = "list-group-item", e.setAttribute("href", "#"), e.appendChild(t), e
        },
        markTabActive: function(t) {
            t.className += " active"
        },
        markTabInactive: function(t) {
            t.className = t.className.replace(/\s?active/g, "")
        },
        getProgressBar: function() {
            var t = 0,
                e = 100,
                i = 0,
                s = document.createElement("div");
            s.className = "progress";
            var r = document.createElement("div");
            return r.className = "progress-bar", r.setAttribute("role", "progressbar"), r.setAttribute("aria-valuenow", i), r.setAttribute("aria-valuemin", t), r.setAttribute("aria-valuenax", e), r.innerHTML = i + "%", s.appendChild(r), s
        },
        updateProgressBar: function(t, e) {
            if (t) {
                var i = t.firstChild,
                    s = e + "%";
                i.setAttribute("aria-valuenow", e), i.style.width = s, i.innerHTML = s
            }
        },
        updateProgressBarUnknown: function(t) {
            if (t) {
                var e = t.firstChild;
                t.className = "progress progress-striped active", e.removeAttribute("aria-valuenow"), e.style.width = "100%",
                    e.innerHTML = ""
            }
        }
    }), n.AbstractIconLib = t.extend({
        mapping: {
            collapse: "",
            expand: "",
            "delete": "",
            edit: "",
            add: "",
            cancel: "",
            moveup: "",
            movedown: ""
        },
        icon_prefix: "",
        getIconClass: function(t) {
            return this.mapping[t] ? this.icon_prefix + this.mapping[t] : null
        },
        getIcon: function(t) {
            var e = this.getIconClass(t);
            if (!e) return null;
            var i = document.createElement("i");
            return i.className = e, i
        }
    }), n.defaults.iconlibs.fontawesome4 = n.AbstractIconLib.extend({
        mapping: {
            collapse: "caret-square-o-down",
            expand: "caret-square-o-right",
            "delete": "times",
            edit: "pencil",
            add: "plus",
            cancel: "ban",
            moveup: "arrow-up",
            movedown: "arrow-down"
        },
        icon_prefix: "fa fa-"
    }), n.defaults.templates["default"] = function() {
        return {
            compile: function(t) {
                var e = t.match(/{{\s*([a-zA-Z0-9\-_ \.]+)\s*}}/g),
                    i = e && e.length;
                if (!i) return function() {
                    return t
                };
                for (var s = [], r = function(t) {
                        var i, r = e[t].replace(/[{}]+/g, "").trim().split("."),
                            n = r.length;
                        if (n > 1) {
                            var o;
                            i = function(e) {
                                for (o = e, t = 0; n > t && (o = o[r[t]]); t++);
                                return o
                            }
                        } else r = r[0], i = function(t) {
                            return t[r]
                        };
                        s.push({
                            s: e[t],
                            r: i
                        })
                    }, n = 0; i > n; n++) r(n);
                return function(e) {
                    var r, o = t + "";
                    for (n = 0; i > n; n++) r = s[n], o = o.replace(r.s, r.r(e));
                    return o
                }
            }
        }
    }, n.defaults.theme = "darkly", n.defaults.template = "default", n.defaults.options = {}, n.defaults.translate = function(t, e) {
        var i = n.defaults.languages[n.defaults.language];
        if (!i) throw "Unknown language " + n.defaults.language;
        var s = i[t] || n.defaults.languages[n.defaults.default_language][t];
        if ("undefined" == typeof s) throw "Unknown translate string " + t;
        if (e)
            for (var r = 0; r < e.length; r++) s = s.replace(new RegExp("\\{\\{" + r + "}}", "g"), e[r]);
        return s
    }, n.defaults.default_language = "en", n.defaults.language = n.defaults.default_language, n.defaults.languages.en = {
        error_notset: "Property must be set",
        error_notempty: "Value required",
        error_enum: "Value must be one of the enumerated values",
        error_anyOf: "Value must validate against at least one of the provided schemas",
        error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.",
        error_not: "Value must not validate against the provided schema",
        error_type_union: "Value must be one of the provided types",
        error_type: "Value must be of type {{0}}",
        error_disallow_union: "Value must not be one of the provided disallowed types",
        error_disallow: "Value must not be of type {{0}}",
        error_multipleOf: "Value must be a multiple of {{0}}",
        error_maximum_excl: "Value must be less than {{0}}",
        error_maximum_incl: "Value must be at most {{0}}",
        error_minimum_excl: "Value must be greater than {{0}}",
        error_minimum_incl: "Value must be at least {{0}}",
        error_maxLength: "Value must be at most {{0}} characters long",
        error_minLength: "Value must be at least {{0}} characters long",
        error_pattern: "Value must match the pattern {{0}}",
        error_additionalItems: "No additional items allowed in this array",
        error_maxItems: "Value must have at most {{0}} items",
        error_minItems: "Value must have at least {{0}} items",
        error_uniqueItems: "Array must have unique items",
        error_maxProperties: "Object must have at most {{0}} properties",
        error_minProperties: "Object must have at least {{0}} properties",
        error_required: "Object is missing the required property '{{0}}'",
        error_additional_properties: "No additional properties allowed, but property {{0}} is set",
        error_dependency: "Must have property {{0}}",
        button_delete_all: "All",
        button_delete_all_title: "Delete All",
        button_delete_last: "Last {{0}}",
        button_delete_last_title: "Delete Last {{0}}",
        button_add_row_title: "Add {{0}}",
        button_move_down_title: "Move down",
        button_move_up_title: "Move up",
        button_delete_row_title: "Delete {{0}}",
        button_delete_row_title_short: "Delete",
        button_collapse: "Collapse",
        button_expand: "Expand"
    }, n.plugins = {
        ace: {
            theme: "monokai"
        },
        epiceditor: {},
        sceditor: {},
        select2: {},
        selectize: {}
    }, s(n.defaults.editors, function(t, e) {
        n.defaults.editors[t].options = e.options || {}
    }), n.defaults.resolvers.unshift(function(t) {
        return "string" != typeof t.type ? "multiple" : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        return !t.type && t.properties ? "object" : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        return "string" == typeof t.type ? t.type : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        return "boolean" === t.type ? "checkbox" === t.format || t.options && t.options.checkbox ? "checkbox" : n.plugins.selectize.enable ? "selectize" : "select" : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        return "any" === t.type ? "multiple" : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        return "string" === t.type && t.media && "base64" === t.media.binaryEncoding ? "base64" : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        return "string" === t.type && "url" === t.format && t.options && t.options.upload === !0 && window.FileReader ? "upload" : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        return "array" == t.type && "table" == t.format ? "table" : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        return t.enumSource ? n.plugins.selectize.enable ? "selectize" : "select" : void 0
    }), n.defaults.resolvers.unshift(function(t) {
        if (t["enum"]) {
            if ("array" === t.type || "object" === t.type) return "enum";
            if ("number" === t.type || "integer" === t.type || "string" === t.type) return n.plugins.selectize.enable ? "selectize" : "select"
        }
    }), n.defaults.resolvers.unshift(function(t) {
        if ("array" === t.type && t.items && !Array.isArray(t.items) && t.uniqueItems && ["string", "number", "integer"].indexOf(t.items.type) >= 0) {
            if (t.items["enum"]) return "multiselect";
            if (n.plugins.selectize.enable && "string" === t.items.type) return "arraySelectize"
        }
    }), n.defaults.resolvers.unshift(function(t) {
        return t.oneOf || t.anyOf ? "multiple" : void 0
    }), window.JSONEditor = n
}();