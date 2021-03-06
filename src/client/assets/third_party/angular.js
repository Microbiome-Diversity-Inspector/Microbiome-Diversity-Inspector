/*
 AngularJS v1.6.7-build.5470+sha.72a87ce
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(u) {
'use strict'; function ne(a) {
if (B(a))t(a.objectMaxDepth)&&(Mc.objectMaxDepth=Vb(a.objectMaxDepth)?a.objectMaxDepth:NaN); else return Mc;} function Vb(a) {
return U(a)&&0<a;} function M(a, b) {
b=b||Error; return function() {
var d=arguments[0], c; c='['+(a?a+':':'')+d+'] http://errors.angularjs.org/1.6.7-build.5470+sha.72a87ce/'+(a?a+'/':'')+d; for (d=1; d<arguments.length; d++) {
c=c+(1==d?'?':'&')+'p'+(d-1)+'='; var e=encodeURIComponent, f; f=arguments[d]; f='function'==typeof f?f.toString().replace(/ \{[\s\S]*$/,
""):'undefined'==typeof f?'undefined':'string'!=typeof f?JSON.stringify(f):f; c+=e(f)
} return new b(c)
}
} function ra(a) {
if (null==a||Za(a)) return !1; if (I(a)||y(a)||E&&a instanceof E) return !0; var b='length'in Object(a)&&a.length; return U(b)&&(0<=b&&(b-1 in a||a instanceof Array)||'function'===typeof a.item);} function q(a, b, d) {
var c, e; if (a) if (C(a)) for (c in a)'prototype'!==c&&'length'!==c&&'name'!==c&&a.hasOwnProperty(c)&&b.call(d, a[c], c, a); else if (I(a)||ra(a)) {
var f='object'!==typeof a; c=0; for (e=a.length; c<
e; c++)(f||c in a)&&b.call(d, a[c], c, a)
} else if (a.forEach&&a.forEach!==q)a.forEach(b, d, a); else if (Nc(a)) for (c in a)b.call(d, a[c], c, a); else if ('function'===typeof a.hasOwnProperty) for (c in a)a.hasOwnProperty(c)&&b.call(d, a[c], c, a); else for (c in a)sa.call(a, c)&&b.call(d, a[c], c, a); return a
} function Oc(a, b, d) {
for (var c=Object.keys(a).sort(), e=0; e<c.length; e++)b.call(d, a[c[e]], c[e]); return c
} function Wb(a) {
return function(b, d) {
a(d, b);};} function oe() {
return ++sb;} function Xb(a, b, d) {
for (var c=a.$$hashKey, e=0,
f=b.length; e<f; ++e) {
var g=b[e]; if (B(g)||C(g)) for (let k=Object.keys(g), h=0, l=k.length; h<l; h++) {
var m=k[h], p=g[m]; d&&B(p)?ga(p)?a[m]=new Date(p.valueOf()):$a(p)?a[m]=new RegExp(p):p.nodeName?a[m]=p.cloneNode(!0):Yb(p)?a[m]=p.clone():(B(a[m])||(a[m]=I(p)?[]:{}), Xb(a[m], [p], !0)):a[m]=p
}
}c?a.$$hashKey=c:delete a.$$hashKey; return a
} function Q(a) {
return Xb(a, wa.call(arguments, 1), !1)
} function pe(a) {
return Xb(a, wa.call(arguments, 1), !0);} function V(a) {
return parseInt(a, 10);} function Zb(a, b) {
return Q(Object.create(a),
b)
} function G() {} function Qa(a) {
return a
} function $(a) {
return function() {
return a;}
} function $b(a) {
return C(a.toString)&&a.toString!==ja
} function z(a) {
return "undefined"===typeof a
} function t(a) {
return "undefined"!==typeof a;} function B(a) {
return null!==a&&'object'===typeof a;} function Nc(a) {
return null!==a&&'object'===typeof a&&!Pc(a);} function y(a) {
return "string"===typeof a;} function U(a) {
return "number"===typeof a;} function ga(a) {
return "[object Date]"===ja.call(a);} function ac(a) {
switch (ja.call(a)) {
case '[object Error]': return !0;
case '[object Exception]': return !0; case '[object DOMException]': return !0; default: return a instanceof Error
}
} function C(a) {
return "function"===typeof a
} function $a(a) {
return "[object RegExp]"===ja.call(a);} function Za(a) {
return a&&a.window===a
} function ab(a) {
return a&&a.$evalAsync&&a.$watch;} function La(a) {
return "boolean"===typeof a;} function qe(a) {
return a&&U(a.length)&&re.test(ja.call(a));} function Yb(a) {
return !(!a||!(a.nodeName||a.prop&&a.attr&&a.find))
} function se(a) {
var b={}; a=a.split(','); var d; for (d=
0; d<a.length; d++)b[a[d]]=!0; return b
} function xa(a) {
return O(a.nodeName||a[0]&&a[0].nodeName)
} function bb(a, b) {
var d=a.indexOf(b); 0<=d&&a.splice(d, 1); return d
} function ya(a, b, d) {
function c(a, b, c) {
c--; if (0>c) return "..."; var d=b.$$hashKey, f; if (I(a)) {
f=0; for (let g=a.length; f<g; f++)b.push(e(a[f], c))
} else if (Nc(a)) for (f in a)b[f]=e(a[f], c); else if (a&&'function'===typeof a.hasOwnProperty) for (f in a)a.hasOwnProperty(f)&&(b[f]=e(a[f], c)); else for (f in a)sa.call(a, f)&&(b[f]=e(a[f], c)); d?b.$$hashKey=d:delete b.$$hashKey;
return b;} function e(a, b) {
if (!B(a)) return a; var d=g.indexOf(a); if (-1!==d) return k[d]; if (Za(a)||ab(a)) throw Ha('cpws'); var d=!1, e=f(a); void 0===e&&(e=I(a)?[]:Object.create(Pc(a)), d=!0); g.push(a); k.push(e); return d?c(a, e, b):e;} function f(a) {
switch (ja.call(a)) {
case '[object Int8Array]': case '[object Int16Array]': case '[object Int32Array]': case '[object Float32Array]': case '[object Float64Array]': case '[object Uint8Array]': case '[object Uint8ClampedArray]': case '[object Uint16Array]': case '[object Uint32Array]': return new a.constructor(e(a.buffer),
a.byteOffset, a.length); case '[object ArrayBuffer]': if (!a.slice) {
var b=new ArrayBuffer(a.byteLength); (new Uint8Array(b)).set(new Uint8Array(a)); return b;} return a.slice(0); case '[object Boolean]': case '[object Number]': case '[object String]': case '[object Date]': return new a.constructor(a.valueOf()); case '[object RegExp]': return b=new RegExp(a.source, a.toString().match(/[^/]*$/)[0]), b.lastIndex=a.lastIndex, b; case '[object Blob]': return new a.constructor([a], {type: a.type});} if (C(a.cloneNode)) return a.cloneNode(!0)
}
var g=[], k=[]; d=Vb(d)?d:NaN; if (b) {
if (qe(b)||'[object ArrayBuffer]'===ja.call(b)) throw Ha('cpta'); if (a===b) throw Ha('cpi'); I(b)?b.length=0:q(b, function(a, c) {
"$$hashKey"!==c&&delete b[c];}); g.push(a); k.push(b); return c(a, b, d);} return e(a, d);} function bc(a, b) {
return a===b||a!==a&&b!==b
} function ta(a, b) {
if (a===b) return !0; if (null===a||null===b) return !1; if (a!==a&&b!==b) return !0; var d=typeof a, c; if (d===typeof b&&'object'===d) if (I(a)) {
if (!I(b)) return !1; if ((d=a.length)===b.length) {
for (c=0; c<d; c++) if (!ta(a[c],
b[c])) return !1; return !0
}
} else {
if (ga(a)) return ga(b)?bc(a.getTime(), b.getTime()):!1; if ($a(a)) return $a(b)?a.toString()===b.toString():!1; if (ab(a)||ab(b)||Za(a)||Za(b)||I(b)||ga(b)||$a(b)) return !1; d=S(); for (c in a) if ('$'!==c.charAt(0)&&!C(a[c])) {
if (!ta(a[c], b[c])) return !1; d[c]=!0
} for (c in b) if (!(c in d)&&'$'!==c.charAt(0)&&t(b[c])&&!C(b[c])) return !1; return !0;} return !1
} function cb(a, b, d) {
return a.concat(wa.call(b, d));} function Ra(a, b) {
var d=2<arguments.length?wa.call(arguments, 2):[]; return !C(b)||b instanceof
RegExp?b:d.length?function() {
return arguments.length?b.apply(a, cb(d, arguments, 0)):b.apply(a, d)
}:function() {
return arguments.length?b.apply(a, arguments):b.call(a)
};} function Qc(a, b) {
var d=b; "string"===typeof a&&'$'===a.charAt(0)&&'$'===a.charAt(1)?d=void 0:Za(b)?d='$WINDOW':b&&u.document===b?d='$DOCUMENT':ab(b)&&(d='$SCOPE'); return d;} function db(a, b) {
if (!z(a)) return U(b)||(b=b?2:null), JSON.stringify(a, Qc, b)
} function Rc(a) {
return y(a)?JSON.parse(a):a;} function Sc(a, b) {
a=a.replace(te, ""); var d=Date.parse('Jan 01, 1970 00:00:00 '+
a)/6E4; return fa(d)?b:d;} function cc(a, b, d) {
d=d?-1:1; var c=a.getTimezoneOffset(); b=Sc(b, c); d*=b-c; a=new Date(a.getTime()); a.setMinutes(a.getMinutes()+d); return a;} function za(a) {
a=E(a).clone().empty(); var b=E('<div>').append(a).html(); try {
return a[0].nodeType===Ma?O(b):b.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/, function(a, b) {
return "<"+O(b);});} catch (d) {
return O(b)
}
} function Tc(a) {
try {
return decodeURIComponent(a);} catch (b) {}
} function dc(a) {
var b={}; q((a||'').split('&'), function(a) {
var c, e, f; a&&(e=a=
a.replace(/\+/g, "%20"), c=a.indexOf('='), -1!==c&&(e=a.substring(0, c), f=a.substring(c+1)), e=Tc(e), t(e)&&(f=t(f)?Tc(f):!0, sa.call(b, e)?I(b[e])?b[e].push(f):b[e]=[b[e], f]:b[e]=f))
}); return b
} function ec(a) {
var b=[]; q(a, function(a, c) {
I(a)?q(a, function(a) {
b.push(ka(c, !0)+(!0===a?'':'='+ka(a, !0)))
}):b.push(ka(c, !0)+(!0===a?'':'='+ka(a, !0)))
}); return b.length?b.join('&'):''} function eb(a) {
return ka(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
} function ka(a, b) {
return encodeURIComponent(a).replace(/%40/gi,
"@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b?'%20':'+');} function ue(a, b) {
var d, c, e=Ia.length; for (c=0; c<e; ++c) if (d=Ia[c]+b, y(d=a.getAttribute(d))) return d; return null
} function ve(a, b) {
var d, c, e={}; q(Ia, function(b) {
b+='app'; !d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a, c=a.getAttribute(b))
}); q(Ia, function(b) {
b+='app'; var e; !d&&(e=a.querySelector('['+b.replace(':', "\\:")+']'))&&(d=e, c=e.getAttribute(b))
}); d&&(we?(e.strictDi=null!==ue(d, "strict-di"),
b(d, c?[c]:[], e)):u.console.error('AngularJS: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match.'));} function Uc(a, b, d) {
B(d)||(d={}); d=Q({strictDi: !1}, d); var c=function() {
a=E(a); if (a.injector()) {
var c=a[0]===u.document?'document':za(a); throw Ha('btstrpd', c.replace(/</, "&lt;").replace(/>/, "&gt;"));
}b=b||[]; b.unshift(['$provide', function(b) {
b.value('$rootElement', a)
}]); d.debugInfoEnabled&&b.push(['$compileProvider', function(a) {
a.debugInfoEnabled(!0)
}]);
b.unshift('ng'); c=fb(b, d.strictDi); c.invoke(['$rootScope', "$rootElement", "$compile", "$injector", function(a, b, c, d) {
a.$apply(function() {
b.data('$injector', d); c(b)(a);})
}]); return c
}, e=/^NG_ENABLE_DEBUG_INFO!/, f=/^NG_DEFER_BOOTSTRAP!/; u&&e.test(u.name)&&(d.debugInfoEnabled=!0, u.name=u.name.replace(e, "")); if (u&&!f.test(u.name)) return c(); u.name=u.name.replace(f, ""); ea.resumeBootstrap=function(a) {
q(a, function(a) {
b.push(a)
}); return c()
}; C(ea.resumeDeferredBootstrap)&&ea.resumeDeferredBootstrap();} function xe() {
u.name=
"NG_ENABLE_DEBUG_INFO!"+u.name; u.location.reload()
} function ye(a) {
a=ea.element(a).injector(); if (!a) throw Ha('test'); return a.get('$$testability')
} function Vc(a, b) {
b=b||'_'; return a.replace(ze, function(a, c) {
return (c?b:'')+a.toLowerCase()
})
} function Ae() {
var a; if (!Wc) {
var b=tb(); (ua=z(b)?u.jQuery:b?u[b]:void 0)&&ua.fn.on?(E=ua, Q(ua.fn, {scope: Sa.scope, isolateScope: Sa.isolateScope, controller: Sa.controller, injector: Sa.injector, inheritedData: Sa.inheritedData}), a=ua.cleanData, ua.cleanData=function(b) {
for (var c,
e=0, f; null!=(f=b[e]); e++)(c=ua._data(f, "events"))&&c.$destroy&&ua(f).triggerHandler('$destroy'); a(b);}):E=T; ea.element=E; Wc=!0
}
} function gb(a, b, d) {
if (!a) throw Ha('areq', b||'?', d||'required'); return a;} function ub(a, b, d) {
d&&I(a)&&(a=a[a.length-1]); gb(C(a), b, "not a function, got "+(a&&'object'===typeof a?a.constructor.name||'Object':typeof a)); return a
} function Na(a, b) {
if ('hasOwnProperty'===a) throw Ha('badname', b);
} function Be(a, b, d) {
if (!b) return a; b=b.split('.'); for (var c, e=a, f=b.length, g=0; g<f; g++){c=
b[g],a&&(a=(e=a)[c]);}return !d&&C(a)?Ra(e, a):a
} function vb(a) {
for (var b=a[0], d=a[a.length-1], c, e=1; b!==d&&(b=b.nextSibling); e++) if (c||a[e]!==b)c||(c=E(wa.call(a, 0, e))), c.push(b); return c||a
} function S() {
return Object.create(null);} function fc(a) {
if (null==a) return ""; switch (typeof a) {
case 'string': break; case 'number': a=''+a; break; default: a=!$b(a)||I(a)||ga(a)?db(a):a.toString()
} return a
} function Ce(a) {
function b(a, b, c) {
return a[b]||(a[b]=c());} var d=M('$injector'), c=M('ng'); a=b(a, "angular", Object); a.$$minErr=
a.$$minErr||M; return b(a, "module", function() {
var a={}; return function(f, g, k) {
var h={}; if ('hasOwnProperty'===f) throw c('badname', "module"); g&&a.hasOwnProperty(f)&&(a[f]=null); return b(a, f, function() {
function a(b, c, d, f) {
f||(f=e); return function() {
f[d||'push']([b, c, arguments]); return w
};} function b(a, c, d) {
d||(d=e); return function(b, e) {
e&&C(e)&&(e.$$moduleName=f); d.push([a, c, arguments]); return w;};} if (!g) throw d('nomod', f); var e=[], n=[], D=[], J=a('$injector', "invoke", "push", n), w={_invokeQueue: e, _configBlocks: n,
_runBlocks: D, info: function(a) {
if (t(a)) {
if (!B(a)) throw c('aobj', "value"); h=a; return this;} return h;}, requires: g, name: f, provider: b('$provide', "provider"), factory: b('$provide', "factory"), service: b('$provide', "service"), value: a('$provide', "value"), constant: a('$provide', "constant", "unshift"), decorator: b('$provide', "decorator", n), animation: b('$animateProvider', "register"), filter: b('$filterProvider', "register"), controller: b('$controllerProvider', "register"), directive: b('$compileProvider', "directive"), component: b('$compileProvider',
"component"), config: J, run: function(a) {
D.push(a); return this
}}; k&&J(k); return w;});};})
} function pa(a, b) {
if (I(a)) {
b=b||[]; for (var d=0, c=a.length; d<c; d++)b[d]=a[d]
} else if (B(a)) for (d in b=b||{}, a) if ('$'!==d.charAt(0)||'$'!==d.charAt(1))b[d]=a[d]; return b||a;} function De(a, b) {
var d=[]; Vb(b)&&(a=ea.copy(a, null, b)); return JSON.stringify(a, function(a, b) {
b=Qc(a, b); if (B(b)) {
if (0<=d.indexOf(b)) return "..."; d.push(b);} return b;})
} function Ee(a) {
Q(a, {errorHandlingConfig: ne, bootstrap: Uc, copy: ya, extend: Q, merge: pe, equals: ta,
element: E, forEach: q, injector: fb, noop: G, bind: Ra, toJson: db, fromJson: Rc, identity: Qa, isUndefined: z, isDefined: t, isString: y, isFunction: C, isObject: B, isNumber: U, isElement: Yb, isArray: I, version: Fe, isDate: ga, callbacks: {$$counter: 0}, getTestability: ye, reloadWithDebugInfo: xe, $$minErr: M, $$csp: Aa, $$encodeUriSegment: eb, $$encodeUriQuery: ka, $$lowercase: O, $$stringify: fc, $$uppercase: wb}); gc=Ce(u); gc('ng', ['ngLocale'], ['$provide', function(a) {
a.provider({$$sanitizeUri: Ge}); a.provider('$compile', Xc).directive({a: He, input: Yc,
textarea: Yc, form: Ie, script: Je, select: Ke, option: Le, ngBind: Me, ngBindHtml: Ne, ngBindTemplate: Oe, ngClass: Pe, ngClassEven: Qe, ngClassOdd: Re, ngCloak: Se, ngController: Te, ngForm: Ue, ngHide: Ve, ngIf: We, ngInclude: Xe, ngInit: Ye, ngNonBindable: Ze, ngPluralize: $e, ngRepeat: af, ngShow: bf, ngStyle: cf, ngSwitch: df, ngSwitchWhen: ef, ngSwitchDefault: ff, ngOptions: gf, ngTransclude: hf, ngModel: jf, ngList: kf, ngChange: lf, pattern: Zc, ngPattern: Zc, required: $c, ngRequired: $c, minlength: ad, ngMinlength: ad, maxlength: bd, ngMaxlength: bd, ngValue: mf,
ngModelOptions: nf}).directive({ngInclude: of}).directive(xb).directive(cd); a.provider({$anchorScroll: pf, $animate: qf, $animateCss: rf, $$animateJs: sf, $$animateQueue: tf, $$AnimateRunner: uf, $$animateAsyncRun: vf, $browser: wf, $cacheFactory: xf, $controller: yf, $document: zf, $$isDocumentHidden: Af, $exceptionHandler: Bf, $filter: dd, $$forceReflow: Cf, $interpolate: Df, $interval: Ef, $http: Ff, $httpParamSerializer: Gf, $httpParamSerializerJQLike: Hf, $httpBackend: If, $xhrFactory: Jf, $jsonpCallbacks: Kf, $location: Lf, $log: Mf, $parse: Nf,
$rootScope: Of, $q: Pf, $$q: Qf, $sce: Rf, $sceDelegate: Sf, $sniffer: Tf, $templateCache: Uf, $templateRequest: Vf, $$testability: Wf, $timeout: Xf, $window: Yf, $$rAF: Zf, $$jqLite: $f, $$Map: ag, $$cookieReader: bg});}]).info({angularVersion: "1.6.7-build.5470+sha.72a87ce"});} function hb(a, b) {
return b.toUpperCase();} function yb(a) {
return a.replace(cg, hb);} function hc(a) {
a=a.nodeType; return 1===a||!a||9===a;} function ed(a, b) {
var d, c, e=b.createDocumentFragment(), f=[]; if (ic.test(a)) {
d=e.appendChild(b.createElement('div')); c=(dg.exec(a)||
['', ""])[1].toLowerCase(); c=na[c]||na._default; d.innerHTML=c[1]+a.replace(eg, "<$1></$2>")+c[2]; for (c=c[0]; c--;)d=d.lastChild; f=cb(f, d.childNodes); d=e.firstChild; d.textContent=''} else f.push(b.createTextNode(a)); e.textContent=''; e.innerHTML=''; q(f, function(a) {
e.appendChild(a);}); return e;} function T(a) {
if (a instanceof T) return a; var b; y(a)&&(a=R(a), b=!0); if (!(this instanceof T)) {
if (b&&'<'!==a.charAt(0)) throw jc('nosel'); return new T(a)
} if (b) {
b=u.document; var d; a=(d=fg.exec(a))?[b.createElement(d[1])]:
(d=ed(a, b))?d.childNodes:[]; kc(this, a);} else C(a)?fd(a):kc(this, a)
} function lc(a) {
return a.cloneNode(!0);} function zb(a, b) {
!b&&hc(a)&&E.cleanData([a]); a.querySelectorAll&&E.cleanData(a.querySelectorAll('*'))
} function gd(a, b, d, c) {
if (t(c)) throw jc('offargs'); var e=(c=Ab(a))&&c.events, f=c&&c.handle; if (f) if (b) {
var g=function(b) {
var c=e[b]; t(d)&&bb(c||[], d); t(d)&&c&&0<c.length||(a.removeEventListener(b, f), delete e[b]);}; q(b.split(' '), function(a) {
g(a); Bb[a]&&g(Bb[a]);});} else for (b in e)'$destroy'!==b&&a.removeEventListener(b,
f), delete e[b];} function mc(a, b) {
var d=a.ng339, c=d&&ib[d]; c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({}, "$destroy"), gd(a)), delete ib[d], a.ng339=void 0))
} function Ab(a, b) {
var d=a.ng339, d=d&&ib[d]; b&&!d&&(a.ng339=d=++gg, d=ib[d]={events: {}, data: {}, handle: void 0}); return d
} function nc(a, b, d) {
if (hc(a)) {
var c, e=t(d), f=!e&&b&&!B(b), g=!b; a=(a=Ab(a, !f))&&a.data; if (e)a[yb(b)]=d; else {
if (g) return a; if (f) return a&&a[yb(b)]; for (c in b)a[yb(c)]=b[c];}
}
} function Cb(a, b) {
return a.getAttribute?-1<
(' '+(a.getAttribute('class')||'')+' ').replace(/[\n\t]/g, " ").indexOf(' '+b+' '):!1;} function Db(a, b) {
if (b&&a.setAttribute) {
var d=(' '+(a.getAttribute('class')||'')+' ').replace(/[\n\t]/g, " "), c=d; q(b.split(' '), function(a) {
a=R(a); c=c.replace(' '+a+' ', " ");}); c!==d&&a.setAttribute('class', R(c))
}
} function Eb(a, b) {
if (b&&a.setAttribute) {
var d=(' '+(a.getAttribute('class')||'')+' ').replace(/[\n\t]/g, " "), c=d; q(b.split(' '), function(a) {
a=R(a); -1===c.indexOf(' '+a+' ')&&(c+=a+' ');}); c!==d&&a.setAttribute('class',
R(c))
}
} function kc(a, b) {
if (b) if (b.nodeType)a[a.length++]=b; else {
var d=b.length; if ('number'===typeof d&&b.window!==b) {
if (d) for (let c=0; c<d; c++)a[a.length++]=b[c]
} else a[a.length++]=b;}
} function hd(a, b) {
return Fb(a, "$"+(b||'ngController')+'Controller');} function Fb(a, b, d) {
9===a.nodeType&&(a=a.documentElement); for (b=I(b)?b:[b]; a;) {
for (let c=0, e=b.length; c<e; c++) if (t(d=E.data(a, b[c]))) return d; a=a.parentNode||11===a.nodeType&&a.host
}
} function id(a) {
for (zb(a, !0); a.firstChild;)a.removeChild(a.firstChild);}
function Gb(a, b) {
b||zb(a); var d=a.parentNode; d&&d.removeChild(a);} function hg(a, b) {
b=b||u; if ('complete'===b.document.readyState)b.setTimeout(a); else E(b).on('load', a)
} function fd(a) {
function b() {
u.document.removeEventListener('DOMContentLoaded', b); u.removeEventListener('load', b); a()
}'complete'===u.document.readyState?u.setTimeout(a):(u.document.addEventListener('DOMContentLoaded', b), u.addEventListener('load', b));} function jd(a, b) {
var d=Hb[b.toLowerCase()]; return d&&kd[xa(a)]&&d
} function ig(a, b) {
var d=
function(c, d) {
c.isDefaultPrevented=function() {
return c.defaultPrevented;}; var f=b[d||c.type], g=f?f.length:0; if (g) {
if (z(c.immediatePropagationStopped)) {
var k=c.stopImmediatePropagation; c.stopImmediatePropagation=function() {
c.immediatePropagationStopped=!0; c.stopPropagation&&c.stopPropagation(); k&&k.call(c)
}
}c.isImmediatePropagationStopped=function() {
return !0===c.immediatePropagationStopped;}; var h=f.specialHandlerWrapper||jg; 1<g&&(f=pa(f)); for (let l=0; l<g; l++){c.isImmediatePropagationStopped()||h(a,c,
f[l])}}
}; d.elem=a; return d;} function jg(a, b, d) {
d.call(a, b)
} function kg(a, b, d) {
var c=b.relatedTarget; c&&(c===a||lg.call(a, c))||d.call(a, b)
} function $f() {
this.$get=function() {
return Q(T, {hasClass: function(a, b) {
a.attr&&(a=a[0]); return Cb(a, b);}, addClass: function(a, b) {
a.attr&&(a=a[0]); return Eb(a, b)
}, removeClass: function(a, b) {
a.attr&&(a=a[0]); return Db(a, b);}});};} function Pa(a, b) {
var d=a&&a.$$hashKey; if (d) return "function"===typeof d&&(d=a.$$hashKey()), d; d=typeof a; return d='function'===d||'object'===d&&null!==
a?a.$$hashKey=d+':'+(b||oe)():d+':'+a
} function ld() {
this._keys=[]; this._values=[]; this._lastKey=NaN; this._lastIndex=-1
} function md(a) {
a=Function.prototype.toString.call(a).replace(mg, ""); return a.match(ng)||a.match(og);} function pg(a) {
return (a=md(a))?'function('+(a[1]||'').replace(/[\s\r\n]+/, " ")+')':'fn'} function fb(a, b) {
function d(a) {
return function(b, c) {
if (B(b))q(b, Wb(a)); else return a(b, c)
}
} function c(a, b) {
Na(a, "service"); if (C(b)||I(b))b=n.instantiate(b); if (!b.$get) throw Ja('pget', a); return p[a+
"Provider"]=b
} function e(a, b) {
return function() {
var c=w.invoke(b, this); if (z(c)) throw Ja('undef', a); return c
}
} function f(a, b, d) {
return c(a, {$get: !1!==d?e(a, b):b})
} function g(a) {
gb(z(a)||I(a), "modulesToLoad", "not an array"); var b=[], c; q(a, function(a) {
function d(a) {
var b, c; b=0; for (c=a.length; b<c; b++) {
var e=a[b], f=n.get(e[0]); f[e[1]](...e[2])}
} if (!m.get(a)) {
m.set(a, !0); try {
y(a)?(c=gc(a), w.modules[a]=c, b=b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), d(c._configBlocks)):C(a)?b.push(n.invoke(a)):
I(a)?b.push(n.invoke(a)):ub(a, "module");} catch (e) {
throw I(a)&&(a=a[a.length-1]), e.message&&e.stack&&-1===e.stack.indexOf(e.message)&&(e=e.message+'\n'+e.stack), Ja('modulerr', a, e.stack||e.message||e);
}
}
}); return b;} function k(a, c) {
function d(b, e) {
if (a.hasOwnProperty(b)) {
if (a[b]===h) throw Ja('cdep', b+' <- '+l.join(' <- ')); return a[b];} try {
return l.unshift(b), a[b]=h, a[b]=c(b, e), a[b]
} catch (f) {
throw a[b]===h&&delete a[b], f;
} finally {
l.shift()
}
} function e(a, c, f) {
var g=[]; a=fb.$$annotate(a, b, f); for (let h=0,
k=a.length; h<k; h++) {
var l=a[h]; if ('string'!==typeof l) throw Ja('itkn', l); g.push(c&&c.hasOwnProperty(l)?c[l]:d(l, f))
} return g
} return {invoke: function(a, b, c, d) {
"string"===typeof c&&(d=c, c=null); c=e(a, c, d); I(a)&&(a=a[a.length-1]); d=a; if (Ba||'function'!==typeof d)d=!1; else {
var f=d.$$ngIsClass; La(f)||(f=d.$$ngIsClass=/^class\b/.test(Function.prototype.toString.call(d))); d=f
} return d?(c.unshift(null), new (Function.prototype.bind.apply(a, c))):a.apply(b, c);}, instantiate: function(a, b, c) {
var d=I(a)?a[a.length-
1]:a; a=e(a, b, c); a.unshift(null); return new (Function.prototype.bind.apply(d, a))
}, get: d, annotate: fb.$$annotate, has: function(b) {
return p.hasOwnProperty(b+'Provider')||a.hasOwnProperty(b);}}
}b=!0===b; var h={}, l=[], m=new Ib, p={$provide: {provider: d(c), factory: d(f), service: d(function(a, b) {
return f(a, ['$injector', function(a) {
return a.instantiate(b);}]);}), value: d(function(a, b) {
return f(a, $(b), !1)
}), constant: d(function(a, b) {
Na(a, "constant"); p[a]=b; D[a]=b;}), decorator: function(a, b) {
var c=n.get(a+'Provider'), d=
c.$get; c.$get=function() {
var a=w.invoke(d, c); return w.invoke(b, null, {$delegate: a});}
}}}, n=p.$injector=k(p, function(a, b) {
ea.isString(b)&&l.push(b); throw Ja('unpr', l.join(' <- '));
}), D={}, J=k(D, function(a, b) {
var c=n.get(a+'Provider', b); return w.invoke(c.$get, c, void 0, a)
}), w=J; p.$injectorProvider={$get: $(J)}; w.modules=n.modules=S(); var s=g(a), w=J.get('$injector'); w.strictDi=b; q(s, function(a) {
a&&w.invoke(a)
}); w.loadNewModules=function(a) {
q(g(a), function(a) {
a&&w.invoke(a)
});}; return w;} function pf() {
var a=
!0; this.disableAutoScrolling=function() {
a=!1;}; this.$get=['$window', "$location", "$rootScope", function(b, d, c) {
function e(a) {
var b=null; Array.prototype.some.call(a, function(a) {
if ('a'===xa(a)) return b=a, !0;}); return b
} function f(a) {
if (a) {
a.scrollIntoView(); var c; c=g.yOffset; C(c)?c=c():Yb(c)?(c=c[0], c='fixed'!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):U(c)||(c=0); c&&(a=a.getBoundingClientRect().top, b.scrollBy(0, a-c));} else b.scrollTo(0, 0);} function g(a) {
a=y(a)?a:U(a)?a.toString():
d.hash(); var b; a?(b=k.getElementById(a))?f(b):(b=e(k.getElementsByName(a)))?f(b):'top'===a&&f(null):f(null);} var k=b.document; a&&c.$watch(function() {
return d.hash();}, function(a, b) {
a===b&&''===a||hg(function() {
c.$evalAsync(g);});}); return g;}]
} function jb(a, b) {
if (!a&&!b) return ""; if (!a) return b; if (!b) return a; I(a)&&(a=a.join(' ')); I(b)&&(b=b.join(' ')); return a+' '+b
} function qg(a) {
y(a)&&(a=a.split(' ')); var b=S(); q(a, function(a) {
a.length&&(b[a]=!0)
}); return b;} function Ka(a) {
return B(a)?a:{};} function rg(a,
b, d, c) {
function e(a) {
try {
a(...wa.call(arguments,1))} finally {
if (J--, 0===J) for (;w.length;) try {
w.pop()()
} catch (b) {
d.error(b);}
}
} function f() {
x=null; k()
} function g() {
s=F(); s=z(s)?null:s; ta(s, A)&&(s=A); K=A=s;} function k() {
var a=K; g(); if (Oa!==h.url()||a!==s)Oa=h.url(), K=s, q(H, function(a) {
a(h.url(), s);})
} var h=this, l=a.location, m=a.history, p=a.setTimeout, n=a.clearTimeout, D={}; h.isMock=!1; var J=0, w=[]; h.$$completeOutstandingRequest=e; h.$$incOutstandingRequestCount=function() {
J++
}; h.notifyWhenNoOutstandingRequests=
function(a) {
0===J?a():w.push(a)
}; var s, K, Oa=l.href, la=b.find('base'), x=null, F=c.history?function() {
try {
return m.state
} catch (a) {}
}:G; g(); h.url=function(b, d, e) {
z(e)&&(e=null); l!==a.location&&(l=a.location); m!==a.history&&(m=a.history); if (b) {
var f=K===e; if (Oa===b&&(!c.history||f)) return h; var k=Oa&&Ca(Oa)===Ca(b); Oa=b; K=e; !c.history||k&&f?(k||(x=b), d?l.replace(b):k?(d=l, e=b.indexOf('#'), e=-1===e?'':b.substr(e), d.hash=e):l.href=b, l.href!==b&&(x=b)):(m[d?'replaceState':'pushState'](e, "", b), g()); x&&(x=
b); return h;} return x||l.href
}; h.state=function() {
return s;}; var H=[], N=!1, A=null; h.onUrlChange=function(b) {
if (!N) {
if (c.history)E(a).on('popstate', f); E(a).on('hashchange', f); N=!0;}H.push(b); return b
}; h.$$applicationDestroyed=function() {
E(a).off('hashchange popstate', f)
}; h.$$checkUrlChange=k; h.baseHref=function() {
var a=la.attr('href'); return a?a.replace(/^(https?:)?\/\/[^/]*/, ""):''}; h.defer=function(a, b) {
var c; J++; c=p(function() {
delete D[c]; e(a);}, b||0); D[c]=!0; return c;}; h.defer.cancel=function(a) {
return D[a]?
(delete D[a], n(a), e(G), !0):!1;};} function wf() {
this.$get=['$window', "$log", "$sniffer", "$document", function(a, b, d, c) {
return new rg(a, c, b, d);}]
} function xf() {
this.$get=function() {
function a(a, c) {
function e(a) {
a!==p&&(n?n===a&&(n=a.n):n=a, f(a.n, a.p), f(a, p), p=a, p.n=null)
} function f(a, b) {
a!==b&&(a&&(a.p=b), b&&(b.n=a))
} if (a in b) throw M('$cacheFactory')('iid', a); var g=0, k=Q({}, c, {id: a}), h=S(), l=c&&c.capacity||Number.MAX_VALUE, m=S(), p=null, n=null; return b[a]={put: function(a, b) {
if (!z(b)) {
if (l<Number.MAX_VALUE) {
var c=
m[a]||(m[a]={key: a}); e(c)
}a in h||g++; h[a]=b; g>l&&this.remove(n.key); return b
}
}, get: function(a) {
if (l<Number.MAX_VALUE) {
var b=m[a]; if (!b) return; e(b)
} return h[a]
}, remove: function(a) {
if (l<Number.MAX_VALUE) {
var b=m[a]; if (!b) return; b===p&&(p=b.p); b===n&&(n=b.n); f(b.n, b.p); delete m[a];}a in h&&(delete h[a], g--);}, removeAll: function() {
h=S(); g=0; m=S(); p=n=null
}, destroy: function() {
m=k=h=null; delete b[a]
}, info: function() {
return Q({}, k, {size: g})
}}
} var b={}; a.info=function() {
var a={}; q(b, function(b, e) {
a[e]=b.info()
});
return a
}; a.get=function(a) {
return b[a];}; return a
};} function Uf() {
this.$get=['$cacheFactory', function(a) {
return a('templates');}]
} function Xc(a, b) {
function d(a, b, c) {
var d=/^\s*([@&<]|=(\*?))(\??)\s*([\w$]*)\s*$/, e=S(); q(a, function(a, f) {
if (a in p)e[f]=p[a]; else {
var g=a.match(d); if (!g) throw aa('iscp', b, f, a, c?'controller bindings definition':'isolate scope definition'); e[f]={mode: g[1][0], collection: "*"===g[2], optional: "?"===g[3], attrName: g[4]||f}; g[4]&&(p[a]=e[f]);}
}); return e
} function c(a) {
var b=a.charAt(0);
if (!b||b!==O(b)) throw aa('baddir', a); if (a!==a.trim()) throw aa('baddir', a);
} function e(a) {
var b=a.require||a.controller&&a.name; !I(b)&&B(b)&&q(b, function(a, c) {
var d=a.match(l); a.substring(d[0].length)||(b[c]=d[0]+c)
}); return b;} var f={}, g=/^\s*directive:\s*([\w-]+)\s+(.*)$/, k=/(([\w-]+)(?::([^;]+))?;?)/, h=se('ngSrc,ngSrcset,src,srcset'), l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/, m=/^(on[a-z]+|formaction)$/, p=S(); this.directive=function Oa(b, d) {
gb(b, "name"); Na(b, "directive"); y(b)?(c(b), gb(d, "directiveFactory"),
f.hasOwnProperty(b)||(f[b]=[], a.factory(b+'Directive', ['$injector', "$exceptionHandler", function(a, c) {
var d=[]; q(f[b], function(f, g) {
try {
var h=a.invoke(f); C(h)?h={compile: $(h)}:!h.compile&&h.link&&(h.compile=$(h.link)); h.priority=h.priority||0; h.index=g; h.name=h.name||b; h.require=e(h); var k=h, l=h.restrict; if (l&&(!y(l)||!/[EACM]/.test(l))) throw aa('badrestrict', l, b); k.restrict=l||'EA'; h.$$moduleName=f.$$moduleName; d.push(h);} catch (m) {
c(m);}
}); return d;}])), f[b].push(d)):q(b, Wb(Oa)); return this;}; this.component=
function la(a, b) {
function c(a) {
function e(b) {
return C(b)||I(b)?function(c, d) {
return a.invoke(b, this, {$element: c, $attrs: d})
}:b
} var f=b.template||b.templateUrl?b.template:'', g={controller: d, controllerAs: sg(b.controller)||b.controllerAs||'$ctrl', template: e(f), templateUrl: e(b.templateUrl), transclude: b.transclude, scope: {}, bindToController: b.bindings||{}, restrict: "E", require: b.require}; q(b, function(a, b) {
"$"===b.charAt(0)&&(g[b]=a)
}); return g
} if (!y(a)) return q(a, Wb(Ra(this, la))), this; var d=b.controller||
function() {}; q(b, function(a, b) {
"$"===b.charAt(0)&&(c[b]=a, C(d)&&(d[b]=a));}); c.$inject=['$injector']; return this.directive(a, c);}; this.aHrefSanitizationWhitelist=function(a) {
return t(a)?(b.aHrefSanitizationWhitelist(a), this):b.aHrefSanitizationWhitelist()
}; this.imgSrcSanitizationWhitelist=function(a) {
return t(a)?(b.imgSrcSanitizationWhitelist(a), this):b.imgSrcSanitizationWhitelist();}; var n=!0; this.debugInfoEnabled=function(a) {
return t(a)?(n=a, this):n
}; var D=!1; this.strictComponentBindingsEnabled=function(a) {
return t(a)?
(D=a, this):D;}; var J=10; this.onChangesTtl=function(a) {
return arguments.length?(J=a, this):J
}; var w=!0; this.commentDirectivesEnabled=function(a) {
return arguments.length?(w=a, this):w;}; var s=!0; this.cssClassDirectivesEnabled=function(a) {
return arguments.length?(s=a, this):s;}; this.$get=['$injector', "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function(a, b, c, e, p, A, v, X, L, P) {
function r() {
try {
if (!--Ca) throw ha=void 0, aa('infchng',
J); v.$apply(function() {
for (var a=[], b=0, c=ha.length; b<c; ++b) try {
ha[b]();} catch (d) {
a.push(d)
}ha=void 0; if (a.length) throw a;
})
} finally {
Ca++;}
} function ba(a, b) {
if (b) {
var c=Object.keys(b), d, e, f; d=0; for (e=c.length; d<e; d++)f=c[d], this[f]=b[f]
} else this.$attr={}; this.$$element=a;} function Y(a, b, c) {
Aa.innerHTML='<span '+b+'>'; b=Aa.firstChild.attributes; var d=b[0]; b.removeNamedItem(d.name); d.value=c; a.attributes.setNamedItem(d);} function qa(a, b) {
try {
a.addClass(b);} catch (c) {}
} function ca(a, b, c, d, e) {
a instanceof
E||(a=E(a)); var f=M(a, b, a, c, d, e); ca.$$addScopeClass(a); var g=null; return function(b, c, d) {
if (!a) throw aa('multilink'); gb(b, "scope"); e&&e.needsNewScope&&(b=b.$parent.$new()); d=d||{}; var h=d.parentBoundTranscludeFn, k=d.transcludeControllers; d=d.futureParentElement; h&&h.$$boundTransclude&&(h=h.$$boundTransclude); g||(g=(d=d&&d[0])?'foreignobject'!==xa(d)&&ja.call(d).match(/SVG/)?'svg':'html':'html'); d='html'!==g?E(ia(g, E('<div>').append(a).html())):c?Sa.clone.call(a):a; if (k) for (let l in k){d.data("$"+l+
"Controller",k[l].instance);}ca.$$addScopeInfo(d, b); c&&c(d, b); f&&f(b, d, d, h); c||(a=f=null); return d
};} function M(a, b, c, d, e, f) {
function g(a, c, d, e) {
var f, k, l, m, p, n, F; if (H) for (F=Array(c.length), m=0; m<h.length; m+=3)f=h[m], F[f]=c[f]; else F=c; m=0; for (p=h.length; m<p;)k=F[h[m++]], c=h[m++], f=h[m++], c?(c.scope?(l=a.$new(), ca.$$addScopeInfo(E(k), l)):l=a, n=c.transcludeOnThisElement?Da(a, c.transclude, e):!c.templateOnThisElement&&e?e:!e&&b?Da(a, b):null, c(f, l, k, d, n)):f&&f(a, k.childNodes, void 0, e)
} for (var h=[], k=I(a)||
a instanceof E, l, m, p, n, H, F=0; F<a.length; F++) {
l=new ba; 11===Ba&&kb(a, F, k); m=oc(a[F], [], l, 0===F?d:void 0, e); (f=m.length?W(m, a[F], l, b, c, null, [], [], f):null)&&f.scope&&ca.$$addScopeClass(l.$$element); l=f&&f.terminal||!(p=a[F].childNodes)||!p.length?null:M(p, f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b); if (f||l)h.push(F, f, l), n=!0, H=H||f; f=null
} return n?g:null;} function kb(a, b, c) {
var d=a[b], e=d.parentNode, f; if (d.nodeType===Ma) for (;;) {
f=e?d.nextSibling:a[b+1]; if (!f||f.nodeType!==
Ma) break; d.nodeValue+=f.nodeValue; f.parentNode&&f.parentNode.removeChild(f); c&&f===a[b+1]&&a.splice(b+1, 1);}
} function Da(a, b, c) {
function d(e, f, g, h, k) {
e||(e=a.$new(!1, k), e.$$transcluded=!0); return b(e, f, {parentBoundTranscludeFn: c, transcludeControllers: g, futureParentElement: h});} var e=d.$$slots=S(), f; for (f in b.$$slots)e[f]=b.$$slots[f]?Da(a, b.$$slots[f], c):null; return d
} function oc(a, b, c, d, e) {
var f=c.$attr, g; switch (a.nodeType) {
case 1: g=xa(a); V(b, Ea(g), "E", d, e); for (var h, l, m, p, n=a.attributes, H=0, F=n&&
n.length; H<F; H++) {
var J=!1, A=!1; h=n[H]; l=h.name; m=h.value; h=Ea(l); (p=Na.test(h))&&(l=l.replace(nd, "").substr(8).replace(/_(.)/g, function(a, b) {
return b.toUpperCase();})); (h=h.match(Pa))&&fa(h[1])&&(J=l, A=l.substr(0, l.length-5)+'end', l=l.substr(0, l.length-6)); h=Ea(l.toLowerCase()); f[h]=l; if (p||!c.hasOwnProperty(h))c[h]=m, jd(a, h)&&(c[h]=!0); va(a, b, m, h, p); V(b, h, "A", d, e, J, A);}'input'===g&&'hidden'===a.getAttribute('type')&&a.setAttribute('autocomplete', "off"); if (!Ka) break; f=a.className; B(f)&&(f=f.animVal);
if (y(f)&&''!==f) for (;a=k.exec(f);)h=Ea(a[2]), V(b, h, "C", d, e)&&(c[h]=R(a[3])), f=f.substr(a.index+a[0].length); break; case Ma: na(b, a.nodeValue); break; case 8: if (!Ja) break; lb(a, b, c, d, e)
}b.sort(ka); return b
} function lb(a, b, c, d, e) {
try {
var f=g.exec(a.nodeValue); if (f) {
var h=Ea(f[1]); V(b, h, "M", d, e)&&(c[h]=R(f[2]));}
} catch (k) {}
} function od(a, b, c) {
var d=[], e=0; if (b&&a.hasAttribute&&a.hasAttribute(b)) {
do {
if (!a) throw aa('uterdir', b, c); 1===a.nodeType&&(a.hasAttribute(b)&&e++, a.hasAttribute(c)&&e--); d.push(a); a=a.nextSibling
} while (0<
e);} else d.push(a); return E(d);} function pd(a, b, c) {
return function(d, e, f, g, h) {
e=od(e[0], b, c); return a(d, e, f, g, h);}
} function T(a, b, c, d, e, f) {
var g; return a?ca(b, c, d, e, f):function() {
g||(g=ca(b, c, d, e, f), b=c=f=null); return g.apply(this, arguments);};} function W(a, b, d, e, f, g, h, k, l) {
function m(a, b, c, d) {
if (a) {
c&&(a=pd(a, c, d)); a.require=v.require; a.directiveName=x; if (A===v||v.$$isolateScope)a=ra(a, {isolateScope: !0}); h.push(a)
} if (b) {
c&&(b=pd(b, c, d)); b.require=v.require; b.directiveName=x; if (A===v||v.$$isolateScope){b=
ra(b,{isolateScope:!0});}k.push(b)
}
} function p(a, e, f, g, l) {
function m(a, b, c, d) {
var e; ab(a)||(d=c, c=b, b=a, a=void 0); X&&(e=L); c||(c=X?x.parent():x); if (d) {
var f=l.$$slots[d]; if (f) return f(a, b, e, c, r); if (z(f)) throw aa('noslot', d, za(x));
} else return l(a, b, e, c, r);} var n, v, s, w, N, L, P, x; b===f?(g=d, x=d.$$element):(x=E(f), g=new ba(x, d)); N=e; A?w=e.$new(!0):H&&(N=e.$parent); l&&(P=m, P.$$boundTransclude=l, P.isSlotFilled=function(a) {
return !!l.$$slots[a]
}); J&&(L=da(x, g, P, J, w, e, A)); A&&(ca.$$addScopeInfo(x, w, !0, !(D&&(D===
A||D===A.$$originalDirective))), ca.$$addScopeClass(x, !0), w.$$isolateBindings=A.$$isolateBindings, v=ya(e, g, w, w.$$isolateBindings, A), v.removeWatches&&w.$on('$destroy', v.removeWatches)); for (n in L) {
v=J[n]; s=L[n]; var tg=v.$$bindings.bindToController; s.instance=s(); x.data('$'+v.name+'Controller', s.instance); s.bindingInfo=ya(N, g, s.instance, tg, v);}q(J, function(a, b) {
var c=a.require; a.bindToController&&!I(c)&&B(c)&&Q(L[b].instance, U(b, c, x, L));}); q(L, function(a) {
var b=a.instance; if (C(b.$onChanges)) try {
b.$onChanges(a.bindingInfo.initialChanges);} catch (d) {
c(d)
} if (C(b.$onInit)) try {
b.$onInit()
} catch (e) {
c(e)
}C(b.$doCheck)&&
(N.$watch(function() {
b.$doCheck();}), b.$doCheck()); C(b.$onDestroy)&&N.$on('$destroy', function() {
b.$onDestroy();})
}); n=0; for (v=h.length; n<v; n++)s=h[n], ua(s, s.isolateScope?w:e, x, g, s.require&&U(s.directiveName, s.require, x, L), P); var r=e; A&&(A.template||null===A.templateUrl)&&(r=w); a&&a(r, f.childNodes, void 0, l); for (n=k.length-1; 0<=n; n--)s=k[n], ua(s, s.isolateScope?w:e, x, g, s.require&&U(s.directiveName, s.require, x, L), P); q(L, function(a) {
a=a.instance; C(a.$postLink)&&a.$postLink()
});}l=l||{}; for (var n=-Number.MAX_VALUE,
H=l.newScopeDirective, J=l.controllerDirectives, A=l.newIsolateScopeDirective, D=l.templateDirective, s=l.nonTlbTranscludeDirective, w=!1, L=!1, X=l.hasElementTranscludeDirective, N=d.$$element=E(b), v, x, P, r=e, la, t=!1, Jb=!1, Y, qa=0, u=a.length; qa<u; qa++) {
v=a[qa]; var Da=v.$$start, G=v.$$end; Da&&(N=od(b, Da, G)); P=void 0; if (n>v.priority) break; if (Y=v.scope)v.templateUrl||(B(Y)?($('new/isolated scope', A||H, v, N), A=v):$('new/isolated scope', A, v, N)), H=H||v; x=v.name; if (!t&&(v.replace&&(v.templateUrl||v.template)||v.transclude&&
!v.$$tlb)) {
for (Y=qa+1; t=a[Y++];) if (t.transclude&&!t.$$tlb||t.replace&&(t.templateUrl||t.template)) {
Jb=!0; break;}t=!0
}!v.templateUrl&&v.controller&&(J=J||S(), $('\''+x+'\' controller', J[x], v, N), J[x]=v); if (Y=v.transclude) if (w=!0, v.$$tlb||($('transclusion', s, v, N), s=v), "element"===Y)X=!0, n=v.priority, P=N, N=d.$$element=E(ca.$$createComment(x, d[x])), b=N[0], ma(f, wa.call(P, 0), b), P[0].$$parentNode=P[0].parentNode, r=T(Jb, P, e, n, g&&g.name, {nonTlbTranscludeDirective: s}); else {
var y=S(); if (B(Y)) {
P=[]; var M=S(), kb=S();
q(Y, function(a, b) {
var c='?'===a.charAt(0); a=c?a.substring(1):a; M[a]=b; y[b]=null; kb[b]=c;}); q(N.contents(), function(a) {
var b=M[Ea(xa(a))]; b?(kb[b]=!0, y[b]=y[b]||[], y[b].push(a)):P.push(a)
}); q(kb, function(a, b) {
if (!a) throw aa('reqslot', b);
}); for (let O in y)y[O]&&(y[O]=T(Jb, y[O], e))
} else P=E(lc(b)).contents(); N.empty(); r=T(Jb, P, e, void 0, void 0, {needsNewScope: v.$$isolateScope||v.$$newScope}); r.$$slots=y
} if (v.template) if (L=!0, $('template', D, v, N), D=v, Y=C(v.template)?v.template(N, d):v.template, Y=Ia(Y), v.replace) {
g=
v; P=ic.test(Y)?qd(ia(v.templateNamespace, R(Y))):[]; b=P[0]; if (1!==P.length||1!==b.nodeType) throw aa('tplrt', x, ""); ma(f, N, b); u={$attr: {}}; Y=oc(b, [], u); var ug=a.splice(qa+1, a.length-(qa+1)); (A||H)&&Z(Y, A, H); a=a.concat(Y).concat(ug); ea(d, u); u=a.length
} else N.html(Y); if (v.templateUrl){L=!0,$("template",D,v,N),D=v,v.replace&&(g=v),p=ga(a.splice(qa,a.length-qa),N,d,f,w&&r,h,k,{controllerDirectives:J,newScopeDirective:H!==v&&H,newIsolateScopeDirective:A,templateDirective:D,nonTlbTranscludeDirective:s}),u=
a.length;}else if (v.compile) try {
la=v.compile(N, d, r); var lb=v.$$originalDirective||v; C(la)?m(null, Ra(lb, la), Da, G):la&&m(Ra(lb, la.pre), Ra(lb, la.post), Da, G)
} catch (V) {
c(V, za(N));}v.terminal&&(p.terminal=!0, n=Math.max(n, v.priority));}p.scope=H&&!0===H.scope; p.transcludeOnThisElement=w; p.templateOnThisElement=L; p.transclude=r; l.hasElementTranscludeDirective=X; return p;} function U(a, b, c, d) {
var e; if (y(b)) {
var f=b.match(l); b=b.substring(f[0].length); var g=f[1]||f[3], f='?'===f[2]; "^^"===g?c=c.parent():e=(e=d&&
d[b])&&e.instance; if (!e) {
var h='$'+b+'Controller'; e=g?c.inheritedData(h):c.data(h)
} if (!e&&!f) throw aa('ctreq', b, a);
} else if (I(b)) for (e=[], g=0, f=b.length; g<f; g++)e[g]=U(a, b[g], c, d); else B(b)&&(e={}, q(b, function(b, f) {
e[f]=U(a, b, c, d)
})); return e||null;} function da(a, b, c, d, e, f, g) {
var h=S(), k; for (k in d) {
var l=d[k], m={$scope: l===g||l.$$isolateScope?e:f, $element: a, $attrs: b, $transclude: c}, p=l.controller; "@"===p&&(p=b[l.name]); m=A(p, m, !0, l.controllerAs); h[l.name]=m; a.data('$'+l.name+'Controller', m.instance);} return h
}
function Z(a, b, c) {
for (let d=0, e=a.length; d<e; d++)a[d]=Zb(a[d], {$$isolateScope: b, $$newScope: c});} function V(b, c, e, g, h, k, l) {
if (c===h) return null; var m=null; if (f.hasOwnProperty(c)) {
h=a.get(c+'Directive'); for (let p=0, n=h.length; p<n; p++) if (c=h[p], (z(g)||g>c.priority)&&-1!==c.restrict.indexOf(e)) {
k&&(c=Zb(c, {$$start: k, $$end: l})); if (!c.$$bindings) {
var H=m=c, F=c.name, v={isolateScope: null, bindToController: null}; B(H.scope)&&(!0===H.bindToController?(v.bindToController=d(H.scope, F, !0), v.isolateScope={}):v.isolateScope=
d(H.scope, F, !1)); B(H.bindToController)&&(v.bindToController=d(H.bindToController, F, !0)); if (v.bindToController&&!H.controller) throw aa('noctrl', F); m=m.$$bindings=v; B(m.isolateScope)&&(c.$$isolateBindings=m.isolateScope)
}b.push(c); m=c
}
} return m
} function fa(b) {
if (f.hasOwnProperty(b)) for (let c=a.get(b+'Directive'), d=0, e=c.length; d<e; d++) if (b=c[d], b.multiElement) return !0; return !1
} function ea(a, b) {
var c=b.$attr, d=a.$attr; q(a, function(d, e) {
"$"!==e.charAt(0)&&(b[e]&&b[e]!==d&&(d=d.length?d+(('style'===e?
";":' ')+b[e]):b[e]), a.$set(e, d, !0, c[e]))
}); q(b, function(b, e) {
a.hasOwnProperty(e)||'$'===e.charAt(0)||(a[e]=b, "class"!==e&&'style'!==e&&(d[e]=c[e]))
})
} function ga(a, b, d, f, g, h, k, l) {
var m=[], p, n, v=b[0], A=a.shift(), s=Zb(A, {templateUrl: null, transclude: null, replace: null, $$originalDirective: A}), J=C(A.templateUrl)?A.templateUrl(b, d):A.templateUrl, D=A.templateNamespace; b.empty(); e(J).then(function(c) {
var e, H; c=Ia(c); if (A.replace) {
c=ic.test(c)?qd(ia(D, R(c))):[]; e=c[0]; if (1!==c.length||1!==e.nodeType) throw aa('tplrt',
A.name, J); c={$attr: {}}; ma(f, b, e); var F=oc(e, [], c); B(A.scope)&&Z(F, !0); a=F.concat(a); ea(d, c);} else e=v, b.html(c); a.unshift(s); p=W(a, e, d, g, b, A, h, k, l); q(f, function(a, c) {
a===e&&(f[c]=b[0]);}); for (n=M(b[0].childNodes, g); m.length;) {
c=m.shift(); H=m.shift(); var w=m.shift(), L=m.shift(), F=b[0]; if (!c.$$destroyed) {
if (H!==v) {
var N=H.className; l.hasElementTranscludeDirective&&A.replace||(F=lc(e)); ma(w, E(H), F); qa(E(F), N);}H=p.transcludeOnThisElement?Da(c, p.transclude, L):L; p(n, c, F, f, H)
}
}m=null
}).catch(function(a) {
ac(a)&&
c(a);}); return function(a, b, c, d, e) {
a=e; b.$$destroyed||(m?m.push(b, c, d, a):(p.transcludeOnThisElement&&(a=Da(b, p.transclude, e)), p(n, b, c, d, a)))
};} function ka(a, b) {
var c=b.priority-a.priority; return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index
} function $(a, b, c, d) {
function e(a) {
return a?' (module: '+a+')':''} if (b) throw aa('multidir', b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, za(d));
} function na(a, c) {
var d=b(c, !0); d&&a.push({priority: 0, compile: function(a) {
a=a.parent(); var b=!!a.length;
b&&ca.$$addBindingClass(a); return function(a, c) {
var e=c.parent(); b||ca.$$addBindingClass(e); ca.$$addBindingInfo(e, d.expressions); a.$watch(d, function(a) {
c[0].nodeValue=a
})
}
}})
} function ia(a, b) {
a=O(a||'html'); switch (a) {
case 'svg': case 'math': var c=u.document.createElement('div'); c.innerHTML='<'+a+'>'+b+'</'+a+'>'; return c.childNodes[0].childNodes; default: return b
}
} function pa(a, b) {
if ('srcdoc'===b) return X.HTML; var c=xa(a); if ('src'===b||'ngSrc'===b) {
if (-1===['img', "video", "audio", "source", "track"].indexOf(c)) return X.RESOURCE_URL;} else if ('xlinkHref'===
b&&'image'!==c&&'a'!==c||'form'===c&&'action'===b||'base'===c&&'href'===b||'link'===c&&'href'===b) return X.RESOURCE_URL;} function va(a, c, d, e, f) {
var g=pa(a, e), k=h[e]||f, l=b(d, !f, g, k); if (l) {
if ('multiple'===e&&'select'===xa(a)) throw aa('selmulti', za(a)); if (m.test(e)) throw aa('nodomevents'); c.push({priority: 100, compile: function() {
return {pre: function(a, c, f) {
c=f.$$observers||(f.$$observers=S()); var h=f[e]; h!==d&&(l=h&&b(h, !0, g, k), d=h); l&&(f[e]=l(a), (c[e]||(c[e]=[])).$$inter=!0, (f.$$observers&&f.$$observers[e].$$scope||
a).$watch(l, function(a, b) {
"class"===e&&a!==b?f.$updateClass(a, b):f.$set(e, a);}));}}
}})
}
} function ma(a, b, c) {
var d=b[0], e=b.length, f=d.parentNode, g, h; if (a) for (g=0, h=a.length; g<h; g++) if (a[g]===d) {
a[g++]=c; h=g+e-1; for (let k=a.length; g<k; g++, h++)h<k?a[g]=a[h]:delete a[g]; a.length-=e-1; a.context===d&&(a.context=c); break
}f&&f.replaceChild(c, d); a=u.document.createDocumentFragment(); for (g=0; g<e; g++)a.appendChild(b[g]); E.hasData(d)&&(E.data(c, E.data(d)), E(d).off('$destroy')); E.cleanData(a.querySelectorAll('*'));
for (g=1; g<e; g++) delete b[g]; b[0]=c; b.length=1
} function ra(a, b) {
return Q(function() {
return a(...arguments)}, a, b);} function ua(a, b, d, e, f, g) {
try {
a(b, d, e, f, g)
} catch (h) {
c(h, za(d))
}
} function oa(a, b) {
if (D) throw aa('missingattr', a, b);
} function ya(a, c, d, e, f) {
function g(b, c, e) {
C(d.$onChanges)&&!bc(c, e)&&(ha||(a.$$postDigest(r), ha=[]), m||(m={}, ha.push(h)), m[b]&&(e=m[b].previousValue), m[b]=new Kb(e, c))
} function h() {
d.$onChanges(m); m=void 0
} var k=[], l={}, m; q(e, function(e, h) {
var m=e.attrName, n=e.optional,
H, F, v, A; switch (e.mode) {
case '@': n||sa.call(c, m)||(oa(m, f.name), d[h]=c[m]=void 0); n=c.$observe(m, function(a) {
if (y(a)||La(a))g(h, a, d[h]), d[h]=a;}); c.$$observers[m].$$scope=a; H=c[m]; y(H)?d[h]=b(H)(a):La(H)&&(d[h]=H); l[h]=new Kb(pc, d[h]); k.push(n); break; case '=': if (!sa.call(c, m)) {
if (n) break; oa(m, f.name); c[m]=void 0;} if (n&&!c[m]) break; F=p(c[m]); A=F.literal?ta:bc; v=F.assign||function() {
H=d[h]=F(a); throw aa('nonassign', c[m], m, f.name);
}; H=d[h]=F(a); n=function(b) {
A(b, d[h])||(A(b, H)?v(a, b=d[h]):d[h]=b); return H=
b;}; n.$stateful=!0; n=e.collection?a.$watchCollection(c[m], n):a.$watch(p(c[m], n), null, F.literal); k.push(n); break; case '<': if (!sa.call(c, m)) {
if (n) break; oa(m, f.name); c[m]=void 0;} if (n&&!c[m]) break; F=p(c[m]); var s=F.literal, J=d[h]=F(a); l[h]=new Kb(pc, d[h]); n=a.$watch(F, function(a, b) {
if (b===a) {
if (b===J||s&&ta(b, J)) return; b=J
}g(h, a, b); d[h]=a;}); k.push(n); break; case '&': n||sa.call(c, m)||oa(m, f.name); F=c.hasOwnProperty(m)?p(c[m]):G; if (F===G&&n) break; d[h]=function(b) {
return F(a, b);};}
}); return {initialChanges: l,
removeWatches: k.length&&function() {
for (let a=0, b=k.length; a<b; ++a)k[a]();}};} var Ha=/^\w/, Aa=u.document.createElement('div'), Ja=w, Ka=s, Ca=J, ha; ba.prototype={$normalize: Ea, $addClass: function(a) {
a&&0<a.length&&L.addClass(this.$$element, a);}, $removeClass: function(a) {
a&&0<a.length&&L.removeClass(this.$$element, a);}, $updateClass: function(a, b) {
var c=rd(a, b); c&&c.length&&L.addClass(this.$$element, c); (c=rd(b, a))&&c.length&&L.removeClass(this.$$element, c)
}, $set: function(a, b, d, e) {
var f=jd(this.$$element[0], a),
g=sd[a], h=a; f?(this.$$element.prop(a, b), e=f):g&&(this[g]=b, h=g); this[a]=b; e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Vc(a, "-")); f=xa(this.$$element); if ('a'===f&&('href'===a||'xlinkHref'===a)||'img'===f&&'src'===a||'image'===f&&'xlinkHref'===a) this[a]=b=P(b, "img"===f||'image'===f); else if ('img'===f&&'srcset'===a&&t(b)) {
for (var f='', g=R(b), k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, k=/\s/.test(g)?k:/(,)/, g=g.split(k), k=Math.floor(g.length/2), l=0; l<k; l++) var m=2*l, f=f+P(R(g[m]), !0), f=f+(' '+
R(g[m+1])); g=R(g[2*l]).split(/\s/); f+=P(R(g[0]), !0); 2===g.length&&(f+=' '+R(g[1])); this[a]=b=f
}!1!==d&&(null===b||z(b)?this.$$element.removeAttr(e):Ha.test(e)?this.$$element.attr(e, b):Y(this.$$element[0], e, b)); (a=this.$$observers)&&q(a[h], function(a) {
try {
a(b);} catch (d) {
c(d);}
});}, $observe: function(a, b) {
var c=this, d=c.$$observers||(c.$$observers=S()), e=d[a]||(d[a]=[]); e.push(b); v.$evalAsync(function() {
e.$$inter||!c.hasOwnProperty(a)||z(c[a])||b(c[a]);}); return function() {
bb(e, b);};}}; var Fa=b.startSymbol(),
Ga=b.endSymbol(), Ia='{{'===Fa&&'}}'===Ga?Qa:function(a) {
return a.replace(/\{\{/g, Fa).replace(/}}/g, Ga);}, Na=/^ngAttr[A-Z]/, Pa=/^(.+)Start$/; ca.$$addBindingInfo=n?function(a, b) {
var c=a.data('$binding')||[]; I(b)?c=c.concat(b):c.push(b); a.data('$binding', c);}:G; ca.$$addBindingClass=n?function(a) {
qa(a, "ng-binding")
}:G; ca.$$addScopeInfo=n?function(a, b, c, d) {
a.data(c?d?'$isolateScopeNoTemplate':'$isolateScope':'$scope', b);}:G; ca.$$addScopeClass=n?function(a, b) {
qa(a, b?'ng-isolate-scope':'ng-scope');}:G; ca.$$createComment=
function(a, b) {
var c=''; n&&(c=' '+(a||'')+': ', b&&(c+=b+' ')); return u.document.createComment(c)
}; return ca
}];} function Kb(a, b) {
this.previousValue=a; this.currentValue=b;} function Ea(a) {
return a.replace(nd, "").replace(vg, hb)
} function rd(a, b) {
var d='', c=a.split(/\s+/), e=b.split(/\s+/), f=0; a:for (;f<c.length; f++) {
for (var g=c[f], k=0; k<e.length; k++) if (g===e[k]) continue a; d+=(0<d.length?' ':'')+g;} return d;} function qd(a) {
a=E(a); var b=a.length; if (1>=b) return a; for (;b--;) {
var d=a[b]; (8===d.nodeType||d.nodeType===
Ma&&''===d.nodeValue.trim())&&wg.call(a, b, 1);} return a;} function sg(a, b) {
if (b&&y(b)) return b; if (y(a)) {
var d=td.exec(a); if (d) return d[3];}
} function yf() {
var a={}; this.has=function(b) {
return a.hasOwnProperty(b);}; this.register=function(b, d) {
Na(b, "controller"); B(b)?Q(a, b):a[b]=d;}; this.$get=['$injector', function(b) {
function d(a, b, d, g) {
if (!a||!B(a.$scope)) throw M('$controller')('noscp', g, b); a.$scope[b]=d;} return function(c, e, f, g) {
var k, h, l; f=!0===f; g&&y(g)&&(l=g); if (y(c)) {
g=c.match(td); if (!g) throw ud('ctrlfmt',
c); h=g[1]; l=l||g[3]; c=a.hasOwnProperty(h)?a[h]:Be(e.$scope, h, !0); if (!c) throw ud('ctrlreg', h); ub(c, h, !0)
} if (f) return f=(I(c)?c[c.length-1]:c).prototype, k=Object.create(f||null), l&&d(e, l, k, h||c.name), Q(function() {
var a=b.invoke(c, k, e, h); a!==k&&(B(a)||C(a))&&(k=a, l&&d(e, l, k, h||c.name)); return k;}, {instance: k, identifier: l}); k=b.instantiate(c, e, h); l&&d(e, l, k, h||c.name); return k
}
}];} function zf() {
this.$get=['$window', function(a) {
return E(a.document);}]
} function Af() {
this.$get=['$document', "$rootScope", function(a,
b) {
function d() {
e=c.hidden
} var c=a[0], e=c&&c.hidden; a.on('visibilitychange', d); b.$on('$destroy', function() {
a.off('visibilitychange', d);}); return function() {
return e;};}]
} function Bf() {
this.$get=['$log', function(a) {
return function(b, d) {
a.error(...arguments)};}];} function qc(a) {
return B(a)?ga(a)?a.toISOString():db(a):a;} function Gf() {
this.$get=function() {
return function(a) {
if (!a) return ""; var b=[]; Oc(a, function(a, c) {
null===a||z(a)||C(a)||(I(a)?q(a, function(a) {
b.push(ka(c)+'='+ka(qc(a)))
}):b.push(ka(c)+
"="+ka(qc(a))));}); return b.join('&')
};};} function Hf() {
this.$get=function() {
return function(a) {
function b(a, e, f) {
I(a)?q(a, function(a, c) {
b(a, e+'['+(B(a)?c:'')+']')
}):B(a)&&!ga(a)?Oc(a, function(a, c) {
b(a, e+(f?'':'[')+c+(f?'':']'))
}):(C(a)&&(a=a()), d.push(ka(e)+'='+(null==a?'':ka(qc(a)))))
} if (!a) return ""; var d=[]; b(a, "", !0); return d.join('&');};};} function rc(a, b) {
if (y(a)) {
var d=a.replace(xg, "").trim(); if (d) {
var c=b('Content-Type'), c=c&&0===c.indexOf(vd), e; (e=c)||(e=(e=d.match(yg))&&zg[e[0]].test(d)); if (e) try {
a=
Rc(d)
} catch (f) {
if (!c) return a; throw Lb('baddata', a, f);
}
}
} return a
} function wd(a) {
var b=S(), d; y(a)?q(a.split('\n'), function(a) {
d=a.indexOf(':'); var e=O(R(a.substr(0, d))); a=R(a.substr(d+1)); e&&(b[e]=b[e]?b[e]+', '+a:a);}):B(a)&&q(a, function(a, d) {
var f=O(d), g=R(a); f&&(b[f]=b[f]?b[f]+', '+g:g)
}); return b
} function xd(a) {
var b; return function(d) {
b||(b=wd(a)); return d?(d=b[O(d)], void 0===d&&(d=null), d):b;}
} function yd(a, b, d, c) {
if (C(c)) return c(a, b, d); q(c, function(c) {
a=c(a, b, d)
}); return a;} function Ff() {
var a=
this.defaults={transformResponse: [rc], transformRequest: [function(a) {
return B(a)&&'[object File]'!==ja.call(a)&&'[object Blob]'!==ja.call(a)&&'[object FormData]'!==ja.call(a)?db(a):a
}], headers: {common: {Accept: "application/json, text/plain, */*"}, post: pa(sc), put: pa(sc), patch: pa(sc)}, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", paramSerializer: "$httpParamSerializer", jsonpCallbackParam: "callback"}, b=!1; this.useApplyAsync=function(a) {
return t(a)?(b=!!a, this):b
}; var d=this.interceptors=[];
this.$get=['$browser', "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", "$sce", function(c, e, f, g, k, h, l, m) {
function p(b) {
function d(a, b) {
for (let c=0, e=b.length; c<e;) {
var f=b[c++], g=b[c++]; a=a.then(f, g)
}b.length=0; return a
} function e(a, b) {
var c, d={}; q(a, function(a, e) {
C(a)?(c=a(b), null!=c&&(d[e]=c)):d[e]=a
}); return d
} function f(a) {
var b=Q({}, a); b.data=yd(a.data, a.headers, a.status, g.transformResponse); a=a.status; return 200<=a&&300>a?b:h.reject(b);} if (!B(b)) throw M('$http')('badreq',
b); if (!y(m.valueOf(b.url))) throw M('$http')('badreq', b.url); var g=Q({method: "get", transformRequest: a.transformRequest, transformResponse: a.transformResponse, paramSerializer: a.paramSerializer, jsonpCallbackParam: a.jsonpCallbackParam}, b); g.headers=function(b) {
var c=a.headers, d=Q({}, b.headers), f, g, h, c=Q({}, c.common, c[O(b.method)]); a:for (f in c) {
g=O(f); for (h in d) if (O(h)===g) continue a; d[f]=c[f];} return e(d, pa(b))
}(b); g.method=wb(g.method); g.paramSerializer=y(g.paramSerializer)?l.get(g.paramSerializer):
g.paramSerializer; c.$$incOutstandingRequestCount(); var k=[], p=[]; b=h.resolve(g); q(s, function(a) {
(a.request||a.requestError)&&k.unshift(a.request, a.requestError); (a.response||a.responseError)&&p.push(a.response, a.responseError);}); b=d(b, k); b=b.then(function(b) {
var c=b.headers, d=yd(b.data, xd(c), void 0, b.transformRequest); z(d)&&q(c, function(a, b) {
"content-type"===O(b)&&delete c[b];}); z(b.withCredentials)&&!z(a.withCredentials)&&(b.withCredentials=a.withCredentials); return n(b, d).then(f, f)
}); b=d(b, p); return b=
b.finally(function() {
c.$$completeOutstandingRequest(G)
});} function n(c, d) {
function g(a) {
if (a) {
var c={}; q(a, function(a, d) {
c[d]=function(c) {
function d() {
a(c)
}b?k.$applyAsync(d):k.$$phase?d():k.$apply(d);}
}); return c
}
} function l(a, c, d, e, f) {
function g() {
n(c, a, d, e, f)
}X&&(200<=a&&300>a?X.put(ba, [a, c, wd(d), e, f]):X.remove(ba)); b?k.$applyAsync(g):(g(), k.$$phase||k.$apply())
} function n(a, b, d, e, f) {
b=-1<=b?b:0; (200<=b&&300>b?A.resolve:A.reject)({data: a, status: b, headers: xd(d), config: c, statusText: e, xhrStatus: f})
}
function H(a) {
n(a.data, a.status, pa(a.headers()), a.statusText, a.xhrStatus);} function s() {
var a=p.pendingRequests.indexOf(c); -1!==a&&p.pendingRequests.splice(a, 1);} var A=h.defer(), v=A.promise, X, L, P=c.headers, r='jsonp'===O(c.method), ba=c.url; r?ba=m.getTrustedResourceUrl(ba):y(ba)||(ba=m.valueOf(ba)); ba=D(ba, c.paramSerializer(c.params)); r&&(ba=J(ba, c.jsonpCallbackParam)); p.pendingRequests.push(c); v.then(s, s); !c.cache&&!a.cache||!1===c.cache||'GET'!==c.method&&'JSONP'!==c.method||(X=B(c.cache)?c.cache:B(a.cache)?
a.cache:w); X&&(L=X.get(ba), t(L)?L&&C(L.then)?L.then(H, H):I(L)?n(L[1], L[0], pa(L[2]), L[3], L[4]):n(L, 200, {}, "OK", "complete"):X.put(ba, v)); z(L)&&((L=tc(c.url, zd)?f()[c.xsrfCookieName||a.xsrfCookieName]:void 0)&&(P[c.xsrfHeaderName||a.xsrfHeaderName]=L), e(c.method, ba, d, l, P, c.timeout, c.withCredentials, c.responseType, g(c.eventHandlers), g(c.uploadEventHandlers))); return v;} function D(a, b) {
0<b.length&&(a+=(-1===a.indexOf('?')?'?':'&')+b); return a;} function J(a, b) {
var c=a.split('?'); if (2<c.length) throw Lb('badjsonp',
a); c=dc(c[1]); q(c, function(c, d) {
if ('JSON_CALLBACK'===c) throw Lb('badjsonp', a); if (d===b) throw Lb('badjsonp', b, a);
}); return a+=(-1===a.indexOf('?')?'?':'&')+b+'=JSON_CALLBACK'} var w=g('$http'); a.paramSerializer=y(a.paramSerializer)?l.get(a.paramSerializer):a.paramSerializer; var s=[]; q(d, function(a) {
s.unshift(y(a)?l.get(a):l.invoke(a));}); p.pendingRequests=[]; (function(a) {
q(arguments, function(a) {
p[a]=function(b, c) {
return p(Q({}, c||{}, {method: a, url: b}));};})
})('get', "delete", "head", "jsonp"); (function(a) {
q(arguments,
function(a) {
p[a]=function(b, c, d) {
return p(Q({}, d||{}, {method: a, url: b, data: c}));}
})
})('post', "put", "patch"); p.defaults=a; return p;}];} function Jf() {
this.$get=function() {
return function() {
return new u.XMLHttpRequest
}
}
} function If() {
this.$get=['$browser', "$jsonpCallbacks", "$document", "$xhrFactory", function(a, b, d, c) {
return Ag(a, c, a.defer, b, d[0]);}]
} function Ag(a, b, d, c, e) {
function f(a, b, d) {
a=a.replace('JSON_CALLBACK', b); var f=e.createElement('script'), m=null; f.type='text/javascript'; f.src=a; f.async=!0; m=function(a) {
f.removeEventListener('load',
m); f.removeEventListener('error', m); e.body.removeChild(f); f=null; var g=-1, D='unknown'; a&&('load'!==a.type||c.wasCalled(b)||(a={type: "error"}), D=a.type, g='error'===a.type?404:200); d&&d(g, D)
}; f.addEventListener('load', m); f.addEventListener('error', m); e.body.appendChild(f); return m;} return function(e, k, h, l, m, p, n, D, J, w) {
function s() {
la&&la(); x&&x.abort();} function K(a, b, c, e, f, g) {
t(H)&&d.cancel(H); la=x=null; a(b, c, e, f, g);}k=k||a.url(); if ('jsonp'===O(e)) var r=c.createCallback(k), la=f(k, r, function(a, b) {
var d=
200===a&&c.getResponse(r); K(l, a, d, "", b, "complete"); c.removeCallback(r)
}); else {
var x=b(e, k); x.open(e, k, !0); q(m, function(a, b) {
t(a)&&x.setRequestHeader(b, a);}); x.onload=function() {
var a=x.statusText||'', b='response'in x?x.response:x.responseText, c=1223===x.status?204:x.status; 0===c&&(c=b?200:'file'===va(k).protocol?404:0); K(l, c, b, x.getAllResponseHeaders(), a, "complete")
}; x.onerror=function() {
K(l, -1, null, null, "", "error");}; x.onabort=function() {
K(l, -1, null, null, "", "abort")
}; x.ontimeout=function() {
K(l, -1,
null, null, "", "timeout")
}; q(J, function(a, b) {
x.addEventListener(b, a)
}); q(w, function(a, b) {
x.upload.addEventListener(b, a)
}); n&&(x.withCredentials=!0); if (D) try {
x.responseType=D;} catch (F) {
if ('json'!==D) throw F;
}x.send(z(h)?null:h)
} if (0<p) var H=d(s, p); else p&&C(p.then)&&p.then(s);}
} function Df() {
var a='{{', b='}}'; this.startSymbol=function(b) {
return b?(a=b, this):a;}; this.endSymbol=function(a) {
return a?(b=a, this):b
}; this.$get=['$parse', "$exceptionHandler", "$sce", function(d, c, e) {
function f(a) {
return "\\\\\\"+a
}
function g(c) {
return c.replace(p, a).replace(n, b);} function k(a, b, c, d) {
var e=a.$watch(function(a) {
e(); return d(a);}, b, c); return e;} function h(f, h, p, n) {
function K(a) {
try {
var b=a; a=p?e.getTrusted(p, b):e.valueOf(b); return n&&!t(a)?a:fc(a);} catch (d) {
c(ha.interr(f, d))
}
} if (!f.length||-1===f.indexOf(a)) {
var q; h||(h=g(f), q=$(h), q.exp=f, q.expressions=[], q.$$watchDelegate=k); return q
}n=!!n; var r, x, F=0, H=[], N=[]; q=f.length; for (var A=[], v=[]; F<q;) if (-1!==(r=f.indexOf(a, F))&&-1!==(x=f.indexOf(b, r+l))){F!==r&&A.push(g(f.substring(F,
r))),F=f.substring(r+l,x),H.push(F),N.push(d(F,K)),F=x+m,v.push(A.length),A.push("");}else {
F!==q&&A.push(g(f.substring(F))); break
}p&&1<A.length&&ha.throwNoconcat(f); if (!h||H.length) {
var X=function(a) {
for (let b=0, c=H.length; b<c; b++) {
if (n&&z(a[b])) return; A[v[b]]=a[b];} return A.join('')
}; return Q(function(a) {
var b=0, d=H.length, e=Array(d); try {
for (;b<d; b++)e[b]=N[b](a); return X(e);} catch (g) {
c(ha.interr(f, g));}
}, {exp: f, expressions: H, $$watchDelegate: function(a, b) {
var c; return a.$watchGroup(N, function(d, e) {
var f=
X(d); C(b)&&b.call(this, f, d!==e?c:f, a); c=f
});}})
}
} var l=a.length, m=b.length, p=new RegExp(a.replace(/./g, f), "g"), n=new RegExp(b.replace(/./g, f), "g"); h.startSymbol=function() {
return a
}; h.endSymbol=function() {
return b;}; return h
}]
} function Ef() {
this.$get=['$rootScope', "$window", "$q", "$$q", "$browser", function(a, b, d, c, e) {
function f(f, h, l, m) {
function p() {
n?f(...D):f(s)
} var n=4<arguments.length, D=n?wa.call(arguments, 4):[], J=b.setInterval, w=b.clearInterval, s=0, K=t(m)&&!m, q=(K?c:d).defer(), r=q.promise;
l=t(l)?l:0; r.$$intervalId=J(function() {
K?e.defer(p):a.$evalAsync(p); q.notify(s++); 0<l&&s>=l&&(q.resolve(s), w(r.$$intervalId), delete g[r.$$intervalId]); K||a.$apply();}, h); g[r.$$intervalId]=q; return r;} var g={}; f.cancel=function(a) {
return a&&a.$$intervalId in g?(g[a.$$intervalId].promise.$$state.pur=!0, g[a.$$intervalId].reject('canceled'), b.clearInterval(a.$$intervalId), delete g[a.$$intervalId], !0):!1
}; return f;}];} function uc(a) {
a=a.split('/'); for (let b=a.length; b--;)a[b]=eb(a[b]); return a.join('/')
} function Ad(a,
b) {
var d=va(a); b.$$protocol=d.protocol; b.$$host=d.hostname; b.$$port=V(d.port)||Bg[d.protocol]||null
} function Bd(a, b) {
if (Cg.test(a)) throw mb('badpath', a); var d='/'!==a.charAt(0); d&&(a='/'+a); var c=va(a); b.$$path=decodeURIComponent(d&&'/'===c.pathname.charAt(0)?c.pathname.substring(1):c.pathname); b.$$search=dc(c.search); b.$$hash=decodeURIComponent(c.hash); b.$$path&&'/'!==b.$$path.charAt(0)&&(b.$$path='/'+b.$$path)
} function vc(a, b) {
return a.slice(0, b.length)===b
} function ma(a, b) {
if (vc(b, a)) return b.substr(a.length);}
function Ca(a) {
var b=a.indexOf('#'); return -1===b?a:a.substr(0, b)
} function nb(a) {
return a.replace(/(#.+)|#$/, "$1")
} function wc(a, b, d) {
this.$$html5=!0; d=d||''; Ad(a, this); this.$$parse=function(a) {
var d=ma(b, a); if (!y(d)) throw mb('ipthprfx', a, b); Bd(d, this); this.$$path||(this.$$path='/'); this.$$compose()
}; this.$$compose=function() {
var a=ec(this.$$search), d=this.$$hash?'#'+eb(this.$$hash):''; this.$$url=uc(this.$$path)+(a?'?'+a:'')+d; this.$$absUrl=b+this.$$url.substr(1); this.$$urlUpdatedByLocation=!0;}; this.$$parseLinkUrl=
function(c, e) {
if (e&&'#'===e[0]) return this.hash(e.slice(1)), !0; var f, g; t(f=ma(a, c))?(g=f, g=d&&t(f=ma(d, f))?b+(ma('/', f)||f):a+g):t(f=ma(b, c))?g=b+f:b===c+'/'&&(g=b); g&&this.$$parse(g); return !!g
};} function xc(a, b, d) {
Ad(a, this); this.$$parse=function(c) {
var e=ma(a, c)||ma(b, c), f; z(e)||'#'!==e.charAt(0)?this.$$html5?f=e:(f='', z(e)&&(a=c, this.replace())):(f=ma(d, e), z(f)&&(f=e)); Bd(f, this); c=this.$$path; var e=a, g=/^\/[A-Z]:(\/.*)/; vc(f, e)&&(f=f.replace(e, "")); g.exec(f)||(c=(f=g.exec(c))?f[1]:c); this.$$path=
c; this.$$compose();}; this.$$compose=function() {
var b=ec(this.$$search), e=this.$$hash?'#'+eb(this.$$hash):''; this.$$url=uc(this.$$path)+(b?'?'+b:'')+e; this.$$absUrl=a+(this.$$url?d+this.$$url:''); this.$$urlUpdatedByLocation=!0
}; this.$$parseLinkUrl=function(b, d) {
return Ca(a)===Ca(b)?(this.$$parse(b), !0):!1
}
} function Cd(a, b, d) {
this.$$html5=!0; xc.apply(this, arguments); this.$$parseLinkUrl=function(c, e) {
if (e&&'#'===e[0]) return this.hash(e.slice(1)), !0; var f, g; a===Ca(c)?f=c:(g=ma(b, c))?f=a+d+g:b===c+'/'&&
(f=b); f&&this.$$parse(f); return !!f
}; this.$$compose=function() {
var b=ec(this.$$search), e=this.$$hash?'#'+eb(this.$$hash):''; this.$$url=uc(this.$$path)+(b?'?'+b:'')+e; this.$$absUrl=a+d+this.$$url; this.$$urlUpdatedByLocation=!0
};} function Mb(a) {
return function() {
return this[a];};} function Dd(a, b) {
return function(d) {
if (z(d)) return this[a]; this[a]=b(d); this.$$compose(); return this
};} function Lf() {
var a='!', b={enabled: !1, requireBase: !0, rewriteLinks: !0}; this.hashPrefix=function(b) {
return t(b)?(a=b, this):a;};
this.html5Mode=function(a) {
if (La(a)) return b.enabled=a, this; if (B(a)) {
La(a.enabled)&&(b.enabled=a.enabled); La(a.requireBase)&&(b.requireBase=a.requireBase); if (La(a.rewriteLinks)||y(a.rewriteLinks))b.rewriteLinks=a.rewriteLinks; return this;} return b;}; this.$get=['$rootScope', "$browser", "$sniffer", "$rootElement", "$window", function(d, c, e, f, g) {
function k(a, b, d) {
var e=l.url(), f=l.$$state; try {
c.url(a, b, d), l.$$state=c.state()
} catch (g) {
throw l.url(e), l.$$state=f, g;
}
} function h(a, b) {
d.$broadcast('$locationChangeSuccess',
l.absUrl(), a, l.$$state, b)
} var l, m; m=c.baseHref(); var p=c.url(), n; if (b.enabled) {
if (!m&&b.requireBase) throw mb('nobase'); n=p.substring(0, p.indexOf('/', p.indexOf('//')+2))+(m||'/'); m=e.history?wc:Cd;} else n=Ca(p), m=xc; var D=n.substr(0, Ca(n).lastIndexOf('/')+1); l=new m(n, D, "#"+a); l.$$parseLinkUrl(p, p); l.$$state=c.state(); var J=/^\s*(javascript|mailto):/i; f.on('click', function(a) {
var e=b.rewriteLinks; if (e&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!==a.which&&2!==a.button) {
for (var h=E(a.target); "a"!==xa(h[0]);) if (h[0]===
f[0]||!(h=h.parent())[0]) return; if (!y(e)||!z(h.attr(e))) {
var e=h.prop('href'), k=h.attr('href')||h.attr('xlink:href'); B(e)&&'[object SVGAnimatedString]'===e.toString()&&(e=va(e.animVal).href); J.test(e)||!e||h.attr('target')||a.isDefaultPrevented()||!l.$$parseLinkUrl(e, k)||(a.preventDefault(), l.absUrl()!==c.url()&&(d.$apply(), g.angular['ff-684208-preventDefault']=!0));}
}
}); nb(l.absUrl())!==nb(p)&&c.url(l.absUrl(), !0); var w=!0; c.onUrlChange(function(a, b) {
vc(a, D)?(d.$evalAsync(function() {
var c=l.absUrl(),
e=l.$$state, f; a=nb(a); l.$$parse(a); l.$$state=b; f=d.$broadcast('$locationChangeStart', a, c, b, e).defaultPrevented; l.absUrl()===a&&(f?(l.$$parse(c), l.$$state=e, k(c, !1, e)):(w=!1, h(c, e)));}), d.$$phase||d.$digest()):g.location.href=a
}); d.$watch(function() {
if (w||l.$$urlUpdatedByLocation) {
l.$$urlUpdatedByLocation=!1; var a=nb(c.url()), b=nb(l.absUrl()), f=c.state(), g=l.$$replace, m=a!==b||l.$$html5&&e.history&&f!==l.$$state; if (w||m){w=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",
b,a,l.$$state,f).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=f):(m&&k(b,g,f===l.$$state?null:l.$$state),h(a,f)))})}}l.$$replace=!1;}); return l;}];} function Mf() {
var a=!0, b=this; this.debugEnabled=function(b) {
return t(b)?(a=b, this):a;}; this.$get=['$window', function(d) {
function c(a) {
ac(a)&&(a.stack&&f?a=a.message&&-1===a.stack.indexOf(a.message)?'Error: '+a.message+'\n'+a.stack:a.stack:a.sourceURL&&(a=a.message+'\n'+a.sourceURL+':'+a.line)); return a;} function e(a) {
var b=d.console||{}, e=b[a]||
b.log||G; return function() {
var a=[]; q(arguments, function(b) {
a.push(c(b));}); return Function.prototype.apply.call(e, b, a)
}
} var f=Ba||/\bEdge\//.test(d.navigator&&d.navigator.userAgent); return {log: e('log'), info: e('info'), warn: e('warn'), error: e('error'), debug: function() {
var c=e('debug'); return function() {
a&&c.apply(b, arguments);};}()}
}];} function Dg(a) {
return a+''} function Eg(a, b) {
return "undefined"!==typeof a?a:b
} function Ed(a, b) {
return "undefined"===typeof a?b:'undefined'===typeof b?a:a+b;} function Fg(a, b) {
switch (a.type) {
case r.MemberExpression: if (a.computed) return !1;
break; case r.UnaryExpression: return 1; case r.BinaryExpression: return "+"!==a.operator?1:!1; case r.CallExpression: return !1;} return void 0===b?Fd:b
} function W(a, b, d) {
var c, e, f=a.isPure=Fg(a, d); switch (a.type) {
case r.Program: c=!0; q(a.body, function(a) {
W(a.expression, b, f); c=c&&a.expression.constant
}); a.constant=c; break; case r.Literal: a.constant=!0; a.toWatch=[]; break; case r.UnaryExpression: W(a.argument, b, f); a.constant=a.argument.constant; a.toWatch=a.argument.toWatch; break; case r.BinaryExpression: W(a.left,
b, f); W(a.right, b, f); a.constant=a.left.constant&&a.right.constant; a.toWatch=a.left.toWatch.concat(a.right.toWatch); break; case r.LogicalExpression: W(a.left, b, f); W(a.right, b, f); a.constant=a.left.constant&&a.right.constant; a.toWatch=a.constant?[]:[a]; break; case r.ConditionalExpression: W(a.test, b, f); W(a.alternate, b, f); W(a.consequent, b, f); a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant; a.toWatch=a.constant?[]:[a]; break; case r.Identifier: a.constant=!1; a.toWatch=[a]; break; case r.MemberExpression: W(a.object,
b, f); a.computed&&W(a.property, b, f); a.constant=a.object.constant&&(!a.computed||a.property.constant); a.toWatch=a.constant?[]:[a]; break; case r.CallExpression: c=d=a.filter?!b(a.callee.name).$stateful:!1; e=[]; q(a.arguments, function(a) {
W(a, b, f); c=c&&a.constant; e.push(...a.toWatch)}); a.constant=c; a.toWatch=d?e:[a]; break; case r.AssignmentExpression: W(a.left, b, f); W(a.right, b, f); a.constant=a.left.constant&&a.right.constant; a.toWatch=[a]; break; case r.ArrayExpression: c=!0; e=[]; q(a.elements, function(a) {
W(a,
b, f); c=c&&a.constant; e.push(...a.toWatch)}); a.constant=c; a.toWatch=e; break; case r.ObjectExpression: c=!0; e=[]; q(a.properties, function(a) {
W(a.value, b, f); c=c&&a.value.constant; e.push(...a.value.toWatch); a.computed&&(W(a.key, b, !1), c=c&&a.key.constant, e.push(...a.key.toWatch))
}); a.constant=c; a.toWatch=e; break; case r.ThisExpression: a.constant=!1; a.toWatch=[]; break; case r.LocalsExpression: a.constant=!1, a.toWatch=[];}
} function Gd(a) {
if (1===a.length) {
a=a[0].expression; var b=a.toWatch; return 1!==
b.length?b:b[0]!==a?b:void 0;}
} function Hd(a) {
return a.type===r.Identifier||a.type===r.MemberExpression;} function Id(a) {
if (1===a.body.length&&Hd(a.body[0].expression)) return {type: r.AssignmentExpression, left: a.body[0].expression, right: {type: r.NGValueParameter}, operator: "="}
} function Jd(a) {
this.$filter=a
} function Kd(a) {
this.$filter=a;} function yc(a, b, d) {
this.ast=new r(a, d); this.astCompiler=d.csp?new Kd(b):new Jd(b)
} function zc(a) {
return C(a.valueOf)?a.valueOf():Gg.call(a)
} function Nf() {
var a=S(), b={'true': !0,
"false": !1, "null": null, undefined: void 0}, d, c; this.addLiteral=function(a, c) {
b[a]=c;}; this.setIdentifierFns=function(a, b) {
d=a; c=b; return this;}; this.$get=['$filter', function(e) {
function f(a, b, c) {
return null==a||null==b?a===b:'object'!==typeof a||(a=zc(a), "object"!==typeof a||c)?a===b||a!==a&&b!==b:!1;} function g(a, b, c, d, e) {
var g=d.inputs, h; if (1===g.length) {
var k=f, g=g[0]; return a.$watch(function(a) {
var b=g(a); f(b, k, g.isPure)||(h=d(a, void 0, void 0, [b]), k=b&&zc(b)); return h
}, b, c, e)
} for (var l=[], m=[], p=0,
n=g.length; p<n; p++)l[p]=f, m[p]=null; return a.$watch(function(a) {
for (var b=!1, c=0, e=g.length; c<e; c++) {
var k=g[c](a); if (b||(b=!f(k, l[c], g[c].isPure)))m[c]=k, l[c]=k&&zc(k);}b&&(h=d(a, void 0, void 0, m)); return h;}, b, c, e)
} function k(a, b, c, d, e) {
function f() {
k(p)&&l()
} function g(a, b, c, d) {
p=D&&d?d[0]:n(a, b, c, d); k(p)&&a.$$postDigest(f); return v(p);} var k=d.literal?h:t, l, p, n=d.$$intercepted||d, v=d.$$interceptor||Qa, D=d.inputs&&!n.inputs; g.literal=d.literal; g.constant=d.constant; g.inputs=d.inputs; m(g); return l=
a.$watch(g, b, c, e);} function h(a) {
var b=!0; q(a, function(a) {
t(a)||(b=!1);}); return b
} function l(a, b, c, d) {
var e=a.$watch(function(a) {
e(); return d(a);}, b, c); return e;} function m(a) {
a.constant?a.$$watchDelegate=l:a.oneTime?a.$$watchDelegate=k:a.inputs&&(a.$$watchDelegate=g); return a
} function p(a, b) {
function c(d) {
return b(a(d));}c.$stateful=a.$stateful||b.$stateful; c.$$pure=a.$$pure&&b.$$pure; return c
} function n(a, b) {
if (!b) return a; a.$$interceptor&&(b=p(a.$$interceptor, b), a=a.$$intercepted); var c=!1, d=function(d,
e, f, g) {
d=c&&g?g[0]:a(d, e, f, g); return b(d);}; d.$$intercepted=a; d.$$interceptor=b; d.literal=a.literal; d.oneTime=a.oneTime; d.constant=a.constant; b.$stateful||(c=!a.inputs, d.inputs=a.inputs?a.inputs:[a], b.$$pure||(d.inputs=d.inputs.map(function(a) {
return a.isPure===Fd?function(b) {
return a(b);}:a;}))); return m(d);} var D={csp: Aa().noUnsafeEval, literals: ya(b), isIdentifierStart: C(d)&&d, isIdentifierContinue: C(c)&&c}; return function(b, c) {
var d, f, g; switch (typeof b) {
case 'string': return g=b=b.trim(), d=a[g], d||(':'===
b.charAt(0)&&':'===b.charAt(1)&&(f=!0, b=b.substring(2)), d=new Ac(D), d=(new yc(d, e, D)).parse(b), d.oneTime=!!f, a[g]=m(d)), n(d, c); case 'function': return n(b, c); default: return n(G, c);}
};}]
} function Pf() {
var a=!0; this.$get=['$rootScope', "$exceptionHandler", function(b, d) {
return Ld(function(a) {
b.$evalAsync(a)
}, d, a);}]; this.errorOnUnhandledRejections=function(b) {
return t(b)?(a=b, this):a
};} function Qf() {
var a=!0; this.$get=['$browser', "$exceptionHandler", function(b, d) {
return Ld(function(a) {
b.defer(a);}, d, a);}]; this.errorOnUnhandledRejections=
function(b) {
return t(b)?(a=b, this):a;};} function Ld(a, b, d) {
function c() {
return new e;} function e() {
var a=this.promise=new f; this.resolve=function(b) {
h(a, b)
}; this.reject=function(b) {
m(a, b)
}; this.notify=function(b) {
n(a, b)
};} function f() {
this.$$state={status: 0}
} function g() {
for (;!t&&u.length;) {
var a=u.shift(); if (!a.pur) {
a.pur=!0; var c=a.value, c='Possibly unhandled rejection: '+('function'===typeof c?c.toString().replace(/ \{[\s\S]*$/, ""):z(c)?'undefined':'string'!==typeof c?De(c, void 0):c); ac(a.value)?b(a.value,
c):b(c)
}
}
} function k(c) {
!d||c.pending||2!==c.status||c.pur||(0===t&&0===u.length&&a(g), u.push(c)); !c.processScheduled&&c.pending&&(c.processScheduled=!0, ++t, a(function() {
var e, f, k; k=c.pending; c.processScheduled=!1; c.pending=void 0; try {
for (let l=0, p=k.length; l<p; ++l) {
c.pur=!0; f=k[l][0]; e=k[l][c.status]; try {
C(e)?h(f, e(c.value)):1===c.status?h(f, c.value):m(f, c.value);} catch (n) {
m(f, n), n&&!0===n.$$passToExceptionHandler&&b(n)
}
}
} finally {
--t, d&&0===t&&a(g)
}
}));} function h(a, b) {
a.$$state.status||(b===a?p(a,
K('qcycle', b)):l(a, b))
} function l(a, b) {
function c(b) {
g||(g=!0, l(a, b));} function d(b) {
g||(g=!0, p(a, b));} function e(b) {
n(a, b);} var f, g=!1; try {
if (B(b)||C(b))f=b.then; C(f)?(a.$$state.status=-1, f.call(b, c, d, e)):(a.$$state.value=b, a.$$state.status=1, k(a.$$state));} catch (h) {
d(h)
}
} function m(a, b) {
a.$$state.status||p(a, b)
} function p(a, b) {
a.$$state.value=b; a.$$state.status=2; k(a.$$state)
} function n(c, d) {
var e=c.$$state.pending; 0>=c.$$state.status&&e&&e.length&&a(function() {
for (var a, c, f=0, g=e.length; f<g; f++) {
c=
e[f][0]; a=e[f][3]; try {
n(c, C(a)?a(d):d);} catch (h) {
b(h);}
}
});} function D(a) {
var b=new f; m(b, a); return b;} function r(a, b, c) {
var d=null; try {
C(c)&&(d=c())
} catch (e) {
return D(e);} return d&&C(d.then)?d.then(function() {
return b(a)
}, D):b(a)
} function w(a, b, c, d) {
var e=new f; h(e, a); return e.then(b, c, d);} function s(a) {
if (!C(a)) throw K('norslvr', a); var b=new f; a(function(a) {
h(b, a);}, function(a) {
m(b, a)
}); return b
} var K=M('$q', TypeError), t=0, u=[]; Q(f.prototype, {"then": function(a, b, c) {
if (z(a)&&z(b)&&z(c)) return this; var d=
new f; this.$$state.pending=this.$$state.pending||[]; this.$$state.pending.push([d, a, b, c]); 0<this.$$state.status&&k(this.$$state); return d
}, "catch": function(a) {
return this.then(null, a)
}, "finally": function(a, b) {
return this.then(function(b) {
return r(b, x, a)
}, function(b) {
return r(b, D, a)
}, b)
}}); var x=w; s.prototype=f.prototype; s.defer=c; s.reject=D; s.when=w; s.resolve=x; s.all=function(a) {
var b=new f, c=0, d=I(a)?[]:{}; q(a, function(a, e) {
c++; w(a).then(function(a) {
d[e]=a; --c||h(b, d)
}, function(a) {
m(b, a)
})
}); 0===
c&&h(b, d); return b;}; s.race=function(a) {
var b=c(); q(a, function(a) {
w(a).then(b.resolve, b.reject)
}); return b.promise
}; return s
} function Zf() {
this.$get=['$window', "$timeout", function(a, b) {
var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame, c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame, e=!!d, f=e?function(a) {
var b=d(a); return function() {
c(b)
};}:function(a) {
var c=b(a, 16.66, !1); return function() {
b.cancel(c)
}
}; f.supported=e; return f
}]
} function Of() {
function a(a) {
function b() {
this.$$watchers=
this.$$nextSibling=this.$$childHead=this.$$childTail=null; this.$$listeners={}; this.$$listenerCount={}; this.$$watchersCount=0; this.$id=++sb; this.$$ChildScope=null
}b.prototype=a; return b
} var b=10, d=M('$rootScope'), c=null, e=null; this.digestTtl=function(a) {
arguments.length&&(b=a); return b
}; this.$get=['$exceptionHandler', "$parse", "$browser", function(f, g, k) {
function h(a) {
a.currentScope.$$destroyed=!0;} function l(a) {
9===Ba&&(a.$$childHead&&l(a.$$childHead), a.$$nextSibling&&l(a.$$nextSibling)); a.$parent=a.$$nextSibling=
a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null
} function m() {
this.$id=++sb; this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null; this.$root=this; this.$$destroyed=!1; this.$$listeners={}; this.$$listenerCount={}; this.$$watchersCount=0; this.$$isolateBindings=null
} function p(a) {
if (K.$$phase) throw d('inprog', K.$$phase); K.$$phase=a
} function n(a, b) {
do a.$$watchersCount+=b; while (a=a.$parent);} function D(a, b, c) {
do {a.$$listenerCount[c]-=
b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];}while (a=a.$parent)
} function r() {} function w() {
for (;x.length;) try {
x.shift()();} catch (a) {
f(a);}e=null;} function s() {
null===e&&(e=k.defer(function() {
K.$apply(w);}))
}m.prototype={constructor: m, $new: function(b, c) {
var d; c=c||this; b?(d=new m, d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)), d=new this.$$ChildScope); d.$parent=c; d.$$prevSibling=c.$$childTail; c.$$childHead?(c.$$childTail.$$nextSibling=d, c.$$childTail=d):c.$$childHead=c.$$childTail=
d; (b||c!==this)&&d.$on('$destroy', h); return d
}, $watch: function(a, b, d, e) {
var f=g(a); if (f.$$watchDelegate) return f.$$watchDelegate(this, b, d, f, a); var h=this, k=h.$$watchers, l={fn: b, last: r, get: f, exp: e||a, eq: !!d}; c=null; C(b)||(l.fn=G); k||(k=h.$$watchers=[], k.$$digestWatchIndex=-1); k.unshift(l); k.$$digestWatchIndex++; n(this, 1); return function() {
var a=bb(k, l); 0<=a&&(n(h, -1), a<k.$$digestWatchIndex&&k.$$digestWatchIndex--); c=null;};}, $watchGroup: function(a, b) {
function c() {
h=!1; try {
k?(k=!1, b(e, e, g)):b(e, d, g)
} finally {
for (let f=
0; f<a.length; f++)d[f]=e[f]
}
} var d=Array(a.length), e=Array(a.length), f=[], g=this, h=!1, k=!0; if (!a.length) {
var l=!0; g.$evalAsync(function() {
l&&b(e, e, g)
}); return function() {
l=!1;}
} if (1===a.length) return this.$watch(a[0], function(a, c, f) {
e[0]=a; d[0]=c; b(e, a===c?e:d, f)
}); q(a, function(a, b) {
var d=g.$watch(a, function(a) {
e[b]=a; h||(h=!0, g.$evalAsync(c));}); f.push(d);}); return function() {
for (;f.length;)f.shift()();}
}, $watchCollection: function(a, b) {
function c(a) {
e=a; var b, d, g, h; if (!z(e)) {
if (B(e)) if (ra(e)) for (f!==
p&&(f=p, q=f.length=0, l++), a=e.length, q!==a&&(l++, f.length=q=a), b=0; b<a; b++)h=f[b], g=e[b], d=h!==h&&g!==g, d||h===g||(l++, f[b]=g); else {
f!==n&&(f=n={}, q=0, l++); a=0; for (b in e)sa.call(e, b)&&(a++, g=e[b], h=f[b], b in f?(d=h!==h&&g!==g, d||h===g||(l++, f[b]=g)):(q++, f[b]=g, l++)); if (q>a) for (b in l++, f)sa.call(e, b)||(q--, delete f[b]);} else f!==e&&(f=e, l++); return l
}
}c.$$pure=g(a).literal; c.$stateful=!c.$$pure; var d=this, e, f, h, k=1<b.length, l=0, m=g(a, c), p=[], n={}, D=!0, q=0; return this.$watch(m, function() {
D?(D=!1,
b(e, e, d)):b(e, h, d); if (k) if (B(e)) if (ra(e)) {
h=Array(e.length); for (var a=0; a<e.length; a++)h[a]=e[a];} else for (a in h={}, e)sa.call(e, a)&&(h[a]=e[a]); else h=e
})
}, $digest: function() {
var a, g, h, l, m, n, q, D=b, s, x=[], z, y; p('$digest'); k.$$checkUrlChange(); this===K&&null!==e&&(k.defer.cancel(e), w()); c=null; do {
q=!1; s=this; for (n=0; n<t.length; n++) {
try {
y=t[n], l=y.fn, l(y.scope, y.locals);} catch (E) {
f(E);}c=null
}t.length=0; a:do {
if (n=s.$$watchers) for (n.$$digestWatchIndex=n.length; n.$$digestWatchIndex--;) try {
if (a=n[n.$$digestWatchIndex]) if (m=
a.get, (g=m(s))!==(h=a.last)&&!(a.eq?ta(g, h):fa(g)&&fa(h)))q=!0, c=a, a.last=a.eq?ya(g, null):g, l=a.fn, l(g, h===r?g:h, s), 5>D&&(z=4-D, x[z]||(x[z]=[]), x[z].push({msg: C(a.exp)?'fn: '+(a.exp.name||a.exp.toString()):a.exp, newVal: g, oldVal: h})); else if (a===c) {
q=!1; break a
}
} catch (G) {
f(G)
} if (!(n=s.$$watchersCount&&s.$$childHead||s!==this&&s.$$nextSibling)) for (;s!==this&&!(n=s.$$nextSibling);)s=s.$parent
} while (s=n);if ((q||t.length)&&!D--) throw K.$$phase=null, d('infdig', b, x);
} while (q||t.length);for (K.$$phase=null; F<
u.length;) try {
u[F++]()
} catch (B) {
f(B);}u.length=F=0; k.$$checkUrlChange()
}, $destroy: function() {
if (!this.$$destroyed) {
var a=this.$parent; this.$broadcast('$destroy'); this.$$destroyed=!0; this===K&&k.$$applicationDestroyed(); n(this, -this.$$watchersCount); for (let b in this.$$listenerCount)D(this, this.$$listenerCount[b], b); a&&a.$$childHead===this&&(a.$$childHead=this.$$nextSibling); a&&a.$$childTail===this&&(a.$$childTail=this.$$prevSibling); this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);
this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling); this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=G; this.$on=this.$watch=this.$watchGroup=function() {
return G
}; this.$$listeners={}; this.$$nextSibling=null; l(this);}
}, $eval: function(a, b) {
return g(a)(this, b)
}, $evalAsync: function(a, b) {
K.$$phase||t.length||k.defer(function() {
t.length&&K.$digest()
}); t.push({scope: this, fn: g(a), locals: b})
}, $$postDigest: function(a) {
u.push(a);}, $apply: function(a) {
try {
p('$apply');
try {
return this.$eval(a);} finally {
K.$$phase=null
}
} catch (b) {
f(b);} finally {
try {
K.$digest()
} catch (c) {
throw f(c), c;
}
}
}, $applyAsync: function(a) {
function b() {
c.$eval(a)
} var c=this; a&&x.push(b); a=g(a); s()
}, $on: function(a, b) {
var c=this.$$listeners[a]; c||(this.$$listeners[a]=c=[]); c.push(b); var d=this; do d.$$listenerCount[a]||(d.$$listenerCount[a]=0), d.$$listenerCount[a]++; while (d=d.$parent);let e=this; return function() {
var d=c.indexOf(b); -1!==d&&(c[d]=null, D(e, 1, a))
};}, $emit: function(a, b) {
var c=[], d, e=this,
g=!1, h={name: a, targetScope: e, stopPropagation: function() {
g=!0;}, preventDefault: function() {
h.defaultPrevented=!0;}, defaultPrevented: !1}, k=cb([h], arguments, 1), l, m; do {
d=e.$$listeners[a]||c; h.currentScope=e; l=0; for (m=d.length; l<m; l++) if (d[l]) try {
d[l].apply(null, k);} catch (n) {
f(n)
} else d.splice(l, 1), l--, m--; if (g) return h.currentScope=null, h; e=e.$parent
} while (e);h.currentScope=null; return h
}, $broadcast: function(a, b) {
var c=this, d=this, e={name: a, targetScope: this, preventDefault: function() {
e.defaultPrevented=!0
},
defaultPrevented: !1}; if (!this.$$listenerCount[a]) return e; for (var g=cb([e], arguments, 1), h, k; c=d;) {
e.currentScope=c; d=c.$$listeners[a]||[]; h=0; for (k=d.length; h<k; h++) if (d[h]) try {
d[h].apply(null, g)
} catch (l) {
f(l);} else d.splice(h, 1), h--, k--; if (!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling)) for (;c!==this&&!(d=c.$$nextSibling);)c=c.$parent;}e.currentScope=null; return e;}}; var K=new m, t=K.$$asyncQueue=[], u=K.$$postDigestQueue=[], x=K.$$applyAsyncQueue=[], F=0; return K;}]
} function Ge() {
var a=
/^\s*(https?|ftp|mailto|tel|file):/, b=/^\s*((https?|ftp|file|blob):|data:image\/)/; this.aHrefSanitizationWhitelist=function(b) {
return t(b)?(a=b, this):a;}; this.imgSrcSanitizationWhitelist=function(a) {
return t(a)?(b=a, this):b;}; this.$get=function() {
return function(d, c) {
var e=c?b:a, f; f=va(d).href; return ""===f||f.match(e)?d:'unsafe:'+f
};}
} function Hg(a) {
if ('self'===a) return a; if (y(a)) {
if (-1<a.indexOf('***')) throw oa('iwcard', a); a=Md(a).replace(/\\\*\\\*/g, ".*").replace(/\\\*/g, "[^:/.?&;]*"); return new RegExp('^'+
a+'$')
} if ($a(a)) return new RegExp('^'+a.source+'$'); throw oa('imatcher');
} function Nd(a) {
var b=[]; t(a)&&q(a, function(a) {
b.push(Hg(a))
}); return b
} function Sf() {
this.SCE_CONTEXTS=ia; var a=['self'], b=[]; this.resourceUrlWhitelist=function(b) {
arguments.length&&(a=Nd(b)); return a
}; this.resourceUrlBlacklist=function(a) {
arguments.length&&(b=Nd(a)); return b
}; this.$get=['$injector', function(d) {
function c(a, b) {
var c; "self"===a?(c=tc(b, zd))||(u.document.baseURI?c=u.document.baseURI:(Ta||(Ta=u.document.createElement('a'),
Ta.href='.', Ta=Ta.cloneNode(!1)), c=Ta.href), c=tc(b, c)):c=!!a.exec(b.href); return c
} function e(a) {
var b=function(a) {
this.$$unwrapTrustedValue=function() {
return a
};}; a&&(b.prototype=new a); b.prototype.valueOf=function() {
return this.$$unwrapTrustedValue();}; b.prototype.toString=function() {
return this.$$unwrapTrustedValue().toString();}; return b;} var f=function(a) {
throw oa('unsafe');
}; d.has('$sanitize')&&(f=d.get('$sanitize')); var g=e(), k={}; k[ia.HTML]=e(g); k[ia.CSS]=e(g); k[ia.URL]=e(g); k[ia.JS]=e(g); k[ia.RESOURCE_URL]=
e(k[ia.URL]); return {trustAs: function(a, b) {
var c=k.hasOwnProperty(a)?k[a]:null; if (!c) throw oa('icontext', a, b); if (null===b||z(b)||''===b) return b; if ('string'!==typeof b) throw oa('itype', a); return new c(b);}, getTrusted: function(d, e) {
if (null===e||z(e)||''===e) return e; var g=k.hasOwnProperty(d)?k[d]:null; if (g&&e instanceof g) return e.$$unwrapTrustedValue(); if (d===ia.RESOURCE_URL) {
var g=va(e.toString()), p, n, q=!1; p=0; for (n=a.length; p<n; p++) if (c(a[p], g)) {
q=!0; break
} if (q) for (p=0, n=b.length; p<n; p++) if (c(b[p],
g)) {
q=!1; break
} if (q) return e; throw oa('insecurl', e.toString());
} if (d===ia.HTML) return f(e); throw oa('unsafe');
}, valueOf: function(a) {
return a instanceof g?a.$$unwrapTrustedValue():a;}};}]
} function Rf() {
var a=!0; this.enabled=function(b) {
arguments.length&&(a=!!b); return a;}; this.$get=['$parse', "$sceDelegate", function(b, d) {
if (a&&8>Ba) throw oa('iequirks'); var c=pa(ia); c.isEnabled=function() {
return a;}; c.trustAs=d.trustAs; c.getTrusted=d.getTrusted; c.valueOf=d.valueOf; a||(c.trustAs=c.getTrusted=function(a, b) {
return b
},
c.valueOf=Qa); c.parseAs=function(a, d) {
var e=b(d); return e.literal&&e.constant?e:b(d, function(b) {
return c.getTrusted(a, b)
});}; var e=c.parseAs, f=c.getTrusted, g=c.trustAs; q(ia, function(a, b) {
var d=O(b); c[('parse_as_'+d).replace(Bc, hb)]=function(b) {
return e(a, b)
}; c[('get_trusted_'+d).replace(Bc, hb)]=function(b) {
return f(a, b);}; c[('trust_as_'+d).replace(Bc, hb)]=function(b) {
return g(a, b)
}
}); return c;}];} function Tf() {
this.$get=['$window', "$document", function(a, b) {
var d={}, c=!((!a.nw||!a.nw.process)&&a.chrome&&
(a.chrome.app&&a.chrome.app.runtime||!a.chrome.app&&a.chrome.runtime&&a.chrome.runtime.id))&&a.history&&a.history.pushState, e=V((/android (\d+)/.exec(O((a.navigator||{}).userAgent))||[])[1]), f=/Boxee/i.test((a.navigator||{}).userAgent), g=b[0]||{}, k=g.body&&g.body.style, h=!1, l=!1; k&&(h=!!('transition'in k||'webkitTransition'in k), l=!!('animation'in k||'webkitAnimation'in k)); return {history: !(!c||4>e||f), hasEvent: function(a) {
if ('input'===a&&Ba) return !1; if (z(d[a])) {
var b=g.createElement('div'); d[a]=
"on"+a in b;} return d[a];}, csp: Aa(), transitions: h, animations: l, android: e};}]
} function Vf() {
var a; this.httpOptions=function(b) {
return b?(a=b, this):a;}; this.$get=['$exceptionHandler', "$templateCache", "$http", "$q", "$sce", function(b, d, c, e, f) {
function g(k, h) {
g.totalPendingRequests++; if (!y(k)||z(d.get(k)))k=f.getTrustedResourceUrl(k); var l=c.defaults&&c.defaults.transformResponse; I(l)?l=l.filter(function(a) {
return a!==rc
}):l===rc&&(l=null); return c.get(k, Q({cache: d, transformResponse: l}, a)).finally(function() {
g.totalPendingRequests--;}).then(function(a) {
d.put(k,
a.data); return a.data;}, function(a) {
h||(a=Ig('tpload', k, a.status, a.statusText), b(a)); return e.reject(a);})
}g.totalPendingRequests=0; return g
}]
} function Wf() {
this.$get=['$rootScope', "$browser", "$location", function(a, b, d) {
return {findBindings: function(a, b, d) {
a=a.getElementsByClassName('ng-binding'); var g=[]; q(a, function(a) {
var c=ea.element(a).data('$binding'); c&&q(c, function(c) {
d?(new RegExp('(^|\\s)'+Md(b)+'(\\s|\\||$)')).test(c)&&g.push(a):-1!==c.indexOf(b)&&g.push(a);});}); return g;}, findModels: function(a,
b, d) {
for (let g=['ng-', "data-ng-", "ng\\:"], k=0; k<g.length; ++k) {
var h=a.querySelectorAll('['+g[k]+'model'+(d?'=':'*=')+'"'+b+'"]'); if (h.length) return h;}
}, getLocation: function() {
return d.url()
}, setLocation: function(b) {
b!==d.url()&&(d.url(b), a.$digest())
}, whenStable: function(a) {
b.notifyWhenNoOutstandingRequests(a)
}}
}]
} function Xf() {
this.$get=['$rootScope', "$browser", "$q", "$$q", "$exceptionHandler", function(a, b, d, c, e) {
function f(f, h, l) {
C(f)||(l=h, h=f, f=G); var m=wa.call(arguments, 3), p=t(l)&&!l, n=(p?c:d).defer(),
q=n.promise, r; r=b.defer(function() {
try {
n.resolve(f(...m))
} catch (b) {
n.reject(b), e(b);} finally {
delete g[q.$$timeoutId];}p||a.$apply();}, h); q.$$timeoutId=r; g[r]=n; return q;} var g={}; f.cancel=function(a) {
return a&&a.$$timeoutId in g?(g[a.$$timeoutId].promise.$$state.pur=!0, g[a.$$timeoutId].reject('canceled'), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)):!1
}; return f
}];} function va(a) {
Ba&&(da.setAttribute('href', a), a=da.href); da.setAttribute('href', a); return {href: da.href, protocol: da.protocol?
da.protocol.replace(/:$/, ""):'', host: da.host, search: da.search?da.search.replace(/^\?/, ""):'', hash: da.hash?da.hash.replace(/^#/, ""):'', hostname: da.hostname, port: da.port, pathname: "/"===da.pathname.charAt(0)?da.pathname:'/'+da.pathname}
} function tc(a, b) {
a=y(a)?va(a):a; b=y(b)?va(b):b; return a.protocol===b.protocol&&a.host===b.host;} function Yf() {
this.$get=$(u)
} function Od(a) {
function b(a) {
try {
return decodeURIComponent(a)
} catch (b) {
return a;}
} var d=a[0]||{}, c={}, e=''; return function() {
var a, g, k, h, l; try {
a=
d.cookie||''} catch (m) {
a=''} if (a!==e) for (e=a, a=e.split('; '), c={}, k=0; k<a.length; k++)g=a[k], h=g.indexOf('='), 0<h&&(l=b(g.substring(0, h)), z(c[l])&&(c[l]=b(g.substring(h+1)))); return c;}
} function bg() {
this.$get=Od
} function dd(a) {
function b(d, c) {
if (B(d)) {
var e={}; q(d, function(a, c) {
e[c]=b(c, a);}); return e;} return a.factory(d+'Filter', c);} this.register=b; this.$get=['$injector', function(a) {
return function(b) {
return a.get(b+'Filter')
}
}]; b('currency', Pd); b('date', Qd); b('filter', Jg); b('json', Kg); b('limitTo', Lg);
b('lowercase', Mg); b('number', Rd); b('orderBy', Sd); b('uppercase', Ng)
} function Jg() {
return function(a, b, d, c) {
if (!ra(a)) {
if (null==a) return a; throw M('filter')('notarray', a);
}c=c||'$'; var e; switch (Cc(b)) {
case 'function': break; case 'boolean': case 'null': case 'number': case 'string': e=!0; case 'object': b=Og(b, d, c, e); break; default: return a;} return Array.prototype.filter.call(a, b);};} function Og(a, b, d, c) {
var e=B(a)&&d in a; !0===b?b=ta:C(b)||(b=function(a, b) {
if (z(a)) return !1; if (null===a||null===b) return a===b; if (B(b)||
B(a)&&!$b(a)) return !1; a=O(''+a); b=O(''+b); return -1!==a.indexOf(b);}); return function(f) {
return e&&!B(f)?Fa(f, a[d], b, d, !1):Fa(f, a, b, d, c)
};} function Fa(a, b, d, c, e, f) {
var g=Cc(a), k=Cc(b); if ('string'===k&&'!'===b.charAt(0)) return !Fa(a, b.substring(1), d, c, e); if (I(a)) return a.some(function(a) {
return Fa(a, b, d, c, e);}); switch (g) {
case 'object': var h; if (e) {
for (h in a) if (h.charAt&&'$'!==h.charAt(0)&&Fa(a[h], b, d, c, !0)) return !0; return f?!1:Fa(a, b, d, c, !1)
} if ('object'===k) {
for (h in b) if (f=b[h], !C(f)&&!z(f)&&(g=h===c,
!Fa(g?a:a[h], f, d, c, g, g))) return !1; return !0
} return d(a, b); case 'function': return !1; default: return d(a, b);}
} function Cc(a) {
return null===a?'null':typeof a;} function Pd(a) {
var b=a.NUMBER_FORMATS; return function(a, c, e) {
z(c)&&(c=b.CURRENCY_SYM); z(e)&&(e=b.PATTERNS[1].maxFrac); return null==a?a:Td(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, e).replace(/\u00A4/g, c)
}
} function Rd(a) {
var b=a.NUMBER_FORMATS; return function(a, c) {
return null==a?a:Td(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c);}
} function Pg(a) {
var b=
0, d, c, e, f, g; -1<(c=a.indexOf(Ud))&&(a=a.replace(Ud, "")); 0<(e=a.search(/e/i))?(0>c&&(c=e), c+=+a.slice(e+1), a=a.substring(0, e)):0>c&&(c=a.length); for (e=0; a.charAt(e)===Dc; e++);if (e===(g=a.length))d=[0], c=1; else {
for (g--; a.charAt(g)===Dc;)g--; c-=e; d=[]; for (f=0; e<=g; e++, f++)d[f]=+a.charAt(e)
}c>Vd&&(d=d.splice(0, Vd-1), b=c-1, c=1); return {d: d, e: b, i: c}
} function Qg(a, b, d, c) {
var e=a.d, f=e.length-a.i; b=z(b)?Math.min(Math.max(d, f), c):+b; d=b+a.i; c=e[d]; if (0<d) {
e.splice(Math.max(a.i, d)); for (var g=d; g<e.length; g++){e[g]=
0}} else for (f=Math.max(0, f), a.i=1, e.length=Math.max(1, d=b+1), e[0]=0, g=1; g<d; g++)e[g]=0; if (5<=c) if (0>d-1) {
for (c=0; c>d; c--)e.unshift(0), a.i++; e.unshift(1); a.i++;} else e[d-1]++; for (;f<Math.max(0, b); f++)e.push(0); if (b=e.reduceRight(function(a, b, c, d) {
b+=a; d[c]=b%10; return Math.floor(b/10);}, 0))e.unshift(b), a.i++;} function Td(a, b, d, c, e) {
if (!y(a)&&!U(a)||isNaN(a)) return ""; var f=!isFinite(a), g=!1, k=Math.abs(a)+'', h=''; if (f)h='\u221e'; else {
g=Pg(k); Qg(g, e, b.minFrac, b.maxFrac); h=g.d; k=g.i; e=g.e; f=[]; for (g=h.reduce(function(a,
b) {
return a&&!b
}, !0); 0>k;)h.unshift(0), k++; 0<k?f=h.splice(k, h.length):(f=h, h=[0]); k=[]; for (h.length>=b.lgSize&&k.unshift(h.splice(-b.lgSize, h.length).join('')); h.length>b.gSize;)k.unshift(h.splice(-b.gSize, h.length).join('')); h.length&&k.unshift(h.join('')); h=k.join(d); f.length&&(h+=c+f.join('')); e&&(h+='e+'+e)
} return 0>a&&!g?b.negPre+h+b.negSuf:b.posPre+h+b.posSuf;} function Nb(a, b, d, c) {
var e=''; if (0>a||c&&0>=a)c?a=-a+1:(a=-a, e='-'); for (a=''+a; a.length<b;)a=Dc+a; d&&(a=a.substr(a.length-b)); return e+
a
} function Z(a, b, d, c, e) {
d=d||0; return function(f) {
f=f['get'+a](); if (0<d||f>-d)f+=d; 0===f&&-12===d&&(f=12); return Nb(f, b, c, e);}
} function ob(a, b, d) {
return function(c, e) {
var f=c['get'+a](), g=wb((d?'STANDALONE':'')+(b?'SHORT':'')+a); return e[g][f];}
} function Wd(a) {
var b=(new Date(a, 0, 1)).getDay(); return new Date(a, 0, (4>=b?5:12)-b)
} function Xd(a) {
return function(b) {
var d=Wd(b.getFullYear()); b=+new Date(b.getFullYear(), b.getMonth(), b.getDate()+(4-b.getDay()))-+d; b=1+Math.round(b/6048E5); return Nb(b, a)
}
} function Ec(a,
b) {
return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1];} function Qd(a) {
function b(a) {
var b; if (b=a.match(d)) {
a=new Date(0); var f=0, g=0, k=b[8]?a.setUTCFullYear:a.setFullYear, h=b[8]?a.setUTCHours:a.setHours; b[9]&&(f=V(b[9]+b[10]), g=V(b[9]+b[11])); k.call(a, V(b[1]), V(b[2])-1, V(b[3])); f=V(b[4]||0)-f; g=V(b[5]||0)-g; k=V(b[6]||0); b=Math.round(1E3*parseFloat('0.'+(b[7]||0))); h.call(a, f, g, k, b)
} return a
} var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/; return function(c,
d, f) {
var g='', k=[], h, l; d=d||'mediumDate'; d=a.DATETIME_FORMATS[d]||d; y(c)&&(c=Rg.test(c)?V(c):b(c)); U(c)&&(c=new Date(c)); if (!ga(c)||!isFinite(c.getTime())) return c; for (;d;)(l=Sg.exec(d))?(k=cb(k, l, 1), d=k.pop()):(k.push(d), d=null); var m=c.getTimezoneOffset(); f&&(m=Sc(f, m), c=cc(c, f, !0)); q(k, function(b) {
h=Tg[b]; g+=h?h(c, a.DATETIME_FORMATS, m):'\'\''===b?'\'':b.replace(/(^'|'$)/g, "").replace(/''/g, "'");}); return g;}
} function Kg() {
return function(a, b) {
z(b)&&(b=2); return db(a, b)
}
} function Lg() {
return function(a,
b, d) {
b=Infinity===Math.abs(Number(b))?Number(b):V(b); if (fa(b)) return a; U(a)&&(a=a.toString()); if (!ra(a)) return a; d=!d||isNaN(d)?0:V(d); d=0>d?Math.max(0, a.length+d):d; return 0<=b?Fc(a, d, d+b):0===d?Fc(a, b, a.length):Fc(a, Math.max(0, d+b), d)
}
} function Fc(a, b, d) {
return y(a)?a.slice(b, d):wa.call(a, b, d)
} function Sd(a) {
function b(b) {
return b.map(function(b) {
var c=1, d=Qa; if (C(b))d=b; else if (y(b)) {
if ('+'===b.charAt(0)||'-'===b.charAt(0))c='-'===b.charAt(0)?-1:1, b=b.substring(1); if (''!==b&&(d=a(b), d.constant)) var e=
d(), d=function(a) {
return a[e]
};} return {get: d, descending: c};});} function d(a) {
switch (typeof a) {
case 'number': case 'boolean': case 'string': return !0; default: return !1;}
} function c(a, b) {
var c=0, d=a.type, h=b.type; if (d===h) {
var h=a.value, l=b.value; "string"===d?(h=h.toLowerCase(), l=l.toLowerCase()):'object'===d&&(B(h)&&(h=a.index), B(l)&&(l=b.index)); h!==l&&(c=h<l?-1:1);} else c=d<h?-1:1; return c
} return function(a, f, g, k) {
if (null==a) return a; if (!ra(a)) throw M('orderBy')('notarray', a); I(f)||(f=[f]); 0===f.length&&
(f=['+']); var h=b(f), l=g?-1:1, m=C(k)?k:c; a=Array.prototype.map.call(a, function(a, b) {
return {value: a, tieBreaker: {value: b, type: "number", index: b}, predicateValues: h.map(function(c) {
var e=c.get(a); c=typeof e; if (null===e)c='string', e='null'; else if ('object'===c)a: {
if (C(e.valueOf)&&(e=e.valueOf(), d(e))) break a; $b(e)&&(e=e.toString(), d(e));} return {value: e, type: c, index: b};})}
}); a.sort(function(a, b) {
for (let d=0, e=h.length; d<e; d++) {
var f=m(a.predicateValues[d], b.predicateValues[d]); if (f) return f*h[d].descending*
l
} return (m(a.tieBreaker, b.tieBreaker)||c(a.tieBreaker, b.tieBreaker))*l
}); return a=a.map(function(a) {
return a.value
})
}
} function Ua(a) {
C(a)&&(a={link: a}); a.restrict=a.restrict||'AC'; return $(a)
} function Ob(a, b, d, c, e) {
this.$$controls=[]; this.$error={}; this.$$success={}; this.$pending=void 0; this.$name=e(b.name||b.ngForm||'')(d); this.$dirty=!1; this.$valid=this.$pristine=!0; this.$submitted=this.$invalid=!1; this.$$parentForm=Pb; this.$$element=a; this.$$animate=c; Yd(this);} function Yd(a) {
a.$$classCache={};
a.$$classCache[Zd]=!(a.$$classCache[pb]=a.$$element.hasClass(pb));} function $d(a) {
function b(a, b, c) {
c&&!a.$$classCache[b]?(a.$$animate.addClass(a.$$element, b), a.$$classCache[b]=!0):!c&&a.$$classCache[b]&&(a.$$animate.removeClass(a.$$element, b), a.$$classCache[b]=!1);} function d(a, c, d) {
c=c?'-'+Vc(c, "-"):''; b(a, pb+c, !0===d); b(a, Zd+c, !1===d);} var c=a.set, e=a.unset; a.clazz.prototype.$setValidity=function(a, g, k) {
z(g)?(this.$pending||(this.$pending={}), c(this.$pending, a, k)):(this.$pending&&e(this.$pending,
a, k), ae(this.$pending)&&(this.$pending=void 0)); La(g)?g?(e(this.$error, a, k), c(this.$$success, a, k)):(c(this.$error, a, k), e(this.$$success, a, k)):(e(this.$error, a, k), e(this.$$success, a, k)); this.$pending?(b(this, "ng-pending", !0), this.$valid=this.$invalid=void 0, d(this, "", null)):(b(this, "ng-pending", !1), this.$valid=ae(this.$error), this.$invalid=!this.$valid, d(this, "", this.$valid)); g=this.$pending&&this.$pending[a]?void 0:this.$error[a]?!1:this.$$success[a]?!0:null; d(this, a, g); this.$$parentForm.$setValidity(a,
g, this)
}
} function ae(a) {
if (a) for (let b in a) if (a.hasOwnProperty(b)) return !1; return !0
} function Gc(a) {
a.$formatters.push(function(b) {
return a.$isEmpty(b)?b:b.toString();})
} function Va(a, b, d, c, e, f) {
var g=O(b[0].type); if (!e.android) {
var k=!1; b.on('compositionstart', function() {
k=!0
}); b.on('compositionend', function() {
k=!1; l()
});} var h, l=function(a) {
h&&(f.defer.cancel(h), h=null); if (!k) {
var e=b.val(); a=a&&a.type; "password"===g||d.ngTrim&&'false'===d.ngTrim||(e=R(e)); (c.$viewValue!==e||''===e&&c.$$hasNativeValidators)&&
c.$setViewValue(e, a)
}
}; if (e.hasEvent('input'))b.on('input', l); else {
var m=function(a, b, c) {
h||(h=f.defer(function() {
h=null; b&&b.value===c||l(a)
}))
}; b.on('keydown', function(a) {
var b=a.keyCode; 91===b||15<b&&19>b||37<=b&&40>=b||m(a, this, this.value);}); if (e.hasEvent('paste'))b.on('paste cut', m)
}b.on('change', l); if (be[g]&&c.$$hasNativeValidators&&g===d.type){b.on("keydown wheel mousedown",function(a){if(!h){var b=this.validity,c=b.badInput,d=b.typeMismatch;h=f.defer(function(){h=null;b.badInput===c&&b.typeMismatch===
d||l(a)})}});}c.$render=function() {
var a=c.$isEmpty(c.$viewValue)?'':c.$viewValue; b.val()!==a&&b.val(a);};} function Qb(a, b) {
return function(d, c) {
var e, f; if (ga(d)) return d; if (y(d)) {
'"'===d.charAt(0)&&'"'===d.charAt(d.length-1)&&(d=d.substring(1, d.length-1)); if (Ug.test(d)) return new Date(d); a.lastIndex=0; if (e=a.exec(d)) return e.shift(), f=c?{yyyy: c.getFullYear(), MM: c.getMonth()+1, dd: c.getDate(), HH: c.getHours(), mm: c.getMinutes(), ss: c.getSeconds(), sss: c.getMilliseconds()/1E3}:{yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0,
ss: 0, sss: 0}, q(e, function(a, c) {
c<b.length&&(f[b[c]]=+a)
}), new Date(f.yyyy, f.MM-1, f.dd, f.HH, f.mm, f.ss||0, 1E3*f.sss||0);} return NaN;}
} function qb(a, b, d, c) {
return function(e, f, g, k, h, l, m) {
function p(a) {
return a&&!(a.getTime&&a.getTime()!==a.getTime());} function n(a) {
return t(a)&&!ga(a)?d(a)||void 0:a;}Hc(e, f, g, k); Va(e, f, g, k, h, l); var q=k&&k.$options.getOption('timezone'), r; k.$$parserName=a; k.$parsers.push(function(a) {
if (k.$isEmpty(a)) return null; if (b.test(a)) return a=d(a, r), q&&(a=cc(a, q)), a
}); k.$formatters.push(function(a) {
if (a&&
!ga(a)) throw rb('datefmt', a); if (p(a)) return (r=a)&&q&&(r=cc(r, q, !0)), m('date')(a, c, q); r=null; return ""
}); if (t(g.min)||g.ngMin) {
var w; k.$validators.min=function(a) {
return !p(a)||z(w)||d(a)>=w
}; g.$observe('min', function(a) {
w=n(a); k.$validate()
});} if (t(g.max)||g.ngMax) {
var s; k.$validators.max=function(a) {
return !p(a)||z(s)||d(a)<=s
}; g.$observe('max', function(a) {
s=n(a); k.$validate();})
}
};} function Hc(a, b, d, c) {
(c.$$hasNativeValidators=B(b[0].validity))&&c.$parsers.push(function(a) {
var c=b.prop('validity')||{};
return c.badInput||c.typeMismatch?void 0:a
})
} function ce(a) {
a.$$parserName='number'; a.$parsers.push(function(b) {
if (a.$isEmpty(b)) return null; if (Vg.test(b)) return parseFloat(b)
}); a.$formatters.push(function(b) {
if (!a.$isEmpty(b)) {
if (!U(b)) throw rb('numfmt', b); b=b.toString();} return b
});} function Wa(a) {
t(a)&&!U(a)&&(a=parseFloat(a)); return fa(a)?void 0:a
} function Ic(a) {
var b=a.toString(), d=b.indexOf('.'); return -1===d?-1<a&&1>a&&(a=/e-(\d+)$/.exec(b))?Number(a[1]):0:b.length-d-1
} function de(a, b, d) {
a=Number(a);
var c=(a|0)!==a, e=(b|0)!==b, f=(d|0)!==d; if (c||e||f) {
var g=c?Ic(a):0, k=e?Ic(b):0, h=f?Ic(d):0, g=Math.max(g, k, h), g=Math.pow(10, g); a*=g; b*=g; d*=g; c&&(a=Math.round(a)); e&&(b=Math.round(b)); f&&(d=Math.round(d))
} return 0===(a-b)%d;} function ee(a, b, d, c, e) {
if (t(c)) {
a=a(c); if (!a.constant) throw rb('constexpr', d, c); return a(b)
} return e
} function Jc(a, b) {
function d(a, b) {
if (!a||!a.length) return []; if (!b||!b.length) return a; var c=[], d=0; a:for (;d<a.length; d++) {
for (var e=a[d], m=0; m<b.length; m++) if (e===b[m]) continue a;
c.push(e)
} return c;} function c(a) {
var b=a; I(a)?b=a.map(c).join(' '):B(a)&&(b=Object.keys(a).filter(function(b) {
return a[b];}).join(' ')); return b
}a='ngClass'+a; var e; return ['$parse', function(f) {
return {restrict: "AC", link: function(g, k, h) {
function l(a, b) {
var c=[]; q(a, function(a) {
if (0<b||p[a])p[a]=(p[a]||0)+b, p[a]===+(0<b)&&c.push(a);}); return c.join(' ');} function m(a) {
if (a===b) {
var c=r, c=l(c&&c.split(' '), 1); h.$addClass(c)
} else c=r, c=l(c&&c.split(' '), -1), h.$removeClass(c); n=a
} var p=k.data('$classCounts'),
n=!0, r; p||(p=S(), k.data('$classCounts', p)); "ngClass"!==a&&(e||(e=f('$index', function(a) {
return a&1;})), g.$watch(e, m)); g.$watch(f(h[a], c), function(a) {
if (n===b) {
var c=r&&r.split(' '), e=a&&a.split(' '), f=d(c, e), c=d(e, c), f=l(f, -1), c=l(c, 1); h.$addClass(c); h.$removeClass(f)
}r=a;})
}};}]
} function Rb(a, b, d, c, e, f, g, k, h) {
this.$modelValue=this.$viewValue=Number.NaN; this.$$rawModelValue=void 0; this.$validators={}; this.$asyncValidators={}; this.$parsers=[]; this.$formatters=[]; this.$viewChangeListeners=[]; this.$untouched=
!0; this.$touched=!1; this.$pristine=!0; this.$dirty=!1; this.$valid=!0; this.$invalid=!1; this.$error={}; this.$$success={}; this.$pending=void 0; this.$name=h(d.name||'', !1)(a); this.$$parentForm=Pb; this.$options=Sb; this.$$parsedNgModel=e(d.ngModel); this.$$parsedNgModelAssign=this.$$parsedNgModel.assign; this.$$ngModelGet=this.$$parsedNgModel; this.$$ngModelSet=this.$$parsedNgModelAssign; this.$$pendingDebounce=null; this.$$parserValid=void 0; this.$$currentValidationRunId=0; this.$$scope=a; this.$$attr=d; this.$$element=
c; this.$$animate=f; this.$$timeout=g; this.$$parse=e; this.$$q=k; this.$$exceptionHandler=b; Yd(this); Wg(this);} function Wg(a) {
a.$$scope.$watch(function(b) {
b=a.$$ngModelGet(b); if (b!==a.$modelValue&&(a.$modelValue===a.$modelValue||b===b)) {
a.$modelValue=a.$$rawModelValue=b; a.$$parserValid=void 0; for (var d=a.$formatters, c=d.length, e=b; c--;)e=d[c](e); a.$viewValue!==e&&(a.$$updateEmptyClasses(e), a.$viewValue=a.$$lastCommittedViewValue=e, a.$render(), a.$$runValidators(a.$modelValue, a.$viewValue, G));} return b;})
}
function Kc(a) {
this.$$options=a;} function fe(a, b) {
q(b, function(b, c) {
t(a[c])||(a[c]=b)
});} function Ga(a, b) {
a.prop('selected', b); a.attr('selected', b)
} var Mc={objectMaxDepth: 5}, Xg=/^\/(.+)\/([a-z]*)$/, sa=Object.prototype.hasOwnProperty, O=function(a) {
return y(a)?a.toLowerCase():a;}, wb=function(a) {
return y(a)?a.toUpperCase():a
}, Ba, E, ua, wa=[].slice, wg=[].splice, Yg=[].push, ja=Object.prototype.toString, Pc=Object.getPrototypeOf, Ha=M('ng'), ea=u.angular||(u.angular={}), gc, sb=0; Ba=u.document.documentMode; var fa=
Number.isNaN||function(a) {
return a!==a
}; G.$inject=[]; Qa.$inject=[]; var I=Array.isArray, re=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/, R=function(a) {
return y(a)?a.trim():a
}, Md=function(a) {
return a.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");}, Aa=function() {
if (!t(Aa.rules)) {
var a=u.document.querySelector('[ng-csp]')||u.document.querySelector('[data-ng-csp]'); if (a) {
var b=a.getAttribute('ng-csp')||a.getAttribute('data-ng-csp'); Aa.rules=
{noUnsafeEval: !b||-1!==b.indexOf('no-unsafe-eval'), noInlineStyle: !b||-1!==b.indexOf('no-inline-style')};} else {
a=Aa; try {
new Function(''), b=!1
} catch (d) {
b=!0
}a.rules={noUnsafeEval: b, noInlineStyle: !1};}
} return Aa.rules
}, tb=function() {
if (t(tb.name_)) return tb.name_; var a, b, d=Ia.length, c, e; for (b=0; b<d; ++b) if (c=Ia[b], a=u.document.querySelector('['+c.replace(':', "\\:")+'jq]')) {
e=a.getAttribute(c+'jq'); break
} return tb.name_=e
}, te=/:/g, Ia=['ng-', "data-ng-", "ng:", "x-ng-"], we=function(a) {
var b=a.currentScript;
if (!b) return !0; if (!(b instanceof u.HTMLScriptElement||b instanceof u.SVGScriptElement)) return !1; b=b.attributes; return [b.getNamedItem('src'), b.getNamedItem('href'), b.getNamedItem('xlink:href')].every(function(b) {
if (!b) return !0; if (!b.value) return !1; var c=a.createElement('a'); c.href=b.value; if (a.location.origin===c.origin) return !0; switch (c.protocol) {
case 'http:': case 'https:': case 'ftp:': case 'blob:': case 'file:': case 'data:': return !0; default: return !1
}
})
}(u.document), ze=/[A-Z]/g, Wc=!1, Ma=3, Fe={full: "1.6.7-build.5470+sha.72a87ce",
major: 1, minor: 6, dot: 7, codeName: "snapshot"}; T.expando='ng339'; var ib=T.cache={}, gg=1; T._data=function(a) {
return this.cache[a[this.expando]]||{};}; var cg=/-([a-z])/g, Zg=/^-ms-/, Bb={mouseleave: "mouseout", mouseenter: "mouseover"}, jc=M('jqLite'), fg=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, ic=/<|&#?\w+;/, dg=/<([\w:-]+)/, eg=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, na={option: [1, '<select multiple="multiple">', "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"],
tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""]}; na.optgroup=na.option; na.tbody=na.tfoot=na.colgroup=na.caption=na.thead; na.th=na.td; var lg=u.Node.prototype.contains||function(a) {
return !!(this.compareDocumentPosition(a)&16);}, Sa=T.prototype={ready: fd, toString: function() {
var a=[]; q(this, function(b) {
a.push(''+b)
}); return "["+a.join(', ')+']'}, eq: function(a) {
return 0<=a?E(this[a]):E(this[this.length+a])
}, length: 0, push: Yg, sort: [].sort, splice: [].splice},
Hb={}; q('multiple selected checked disabled readOnly required open'.split(' '), function(a) {
Hb[O(a)]=a;}); var kd={}; q('input select option textarea button form details'.split(' '), function(a) {
kd[a]=!0
}); var sd={ngMinlength: "minlength", ngMaxlength: "maxlength", ngMin: "min", ngMax: "max", ngPattern: "pattern", ngStep: "step"}; q({data: nc, removeData: mc, hasData: function(a) {
for (let b in ib[a.ng339]) return !0; return !1;}, cleanData: function(a) {
for (let b=0, d=a.length; b<d; b++)mc(a[b]);}}, function(a, b) {
T[b]=a
}); q({data: nc,
inheritedData: Fb, scope: function(a) {
return E.data(a, "$scope")||Fb(a.parentNode||a, ['$isolateScope', "$scope"]);}, isolateScope: function(a) {
return E.data(a, "$isolateScope")||E.data(a, "$isolateScopeNoTemplate");}, controller: hd, injector: function(a) {
return Fb(a, "$injector")
}, removeAttr: function(a, b) {
a.removeAttribute(b);}, hasClass: Cb, css: function(a, b, d) {
b=yb(b.replace(Zg, "ms-")); if (t(d))a.style[b]=d; else return a.style[b];}, attr: function(a, b, d) {
var c=a.nodeType; if (c!==Ma&&2!==c&&8!==c&&a.getAttribute) {
var c=
O(b), e=Hb[c]; if (t(d))null===d||!1===d&&e?a.removeAttribute(b):a.setAttribute(b, e?c:d); else return a=a.getAttribute(b), e&&null!==a&&(a=c), null===a?void 0:a;}
}, prop: function(a, b, d) {
if (t(d))a[b]=d; else return a[b]
}, text: function() {
function a(a, d) {
if (z(d)) {
var c=a.nodeType; return 1===c||c===Ma?a.textContent:''}a.textContent=d
}a.$dv=''; return a;}(), val: function(a, b) {
if (z(b)) {
if (a.multiple&&'select'===xa(a)) {
var d=[]; q(a.options, function(a) {
a.selected&&d.push(a.value||a.text)
}); return d
} return a.value;}a.value=
b;}, html: function(a, b) {
if (z(b)) return a.innerHTML; zb(a, !0); a.innerHTML=b
}, empty: id}, function(a, b) {
T.prototype[b]=function(b, c) {
var e, f, g=this.length; if (a!==id&&z(2===a.length&&a!==Cb&&a!==hd?b:c)) {
if (B(b)) {
for (e=0; e<g; e++) if (a===nc)a(this[e], b); else for (f in b)a(this[e], f, b[f]); return this;}e=a.$dv; g=z(e)?Math.min(g, 1):g; for (f=0; f<g; f++) {
var k=a(this[f], b, c); e=e?e+k:k;} return e;} for (e=0; e<g; e++)a(this[e], b, c); return this
}
}); q({removeData: mc, on: function(a, b, d, c) {
if (t(c)) throw jc('onargs'); if (hc(a)) {
c=
Ab(a, !0); var e=c.events, f=c.handle; f||(f=c.handle=ig(a, e)); c=0<=b.indexOf(' ')?b.split(' '):[b]; for (let g=c.length, k=function(b, c, g) {
var k=e[b]; k||(k=e[b]=[], k.specialHandlerWrapper=c, "$destroy"===b||g||a.addEventListener(b, f)); k.push(d);}; g--;)b=c[g], Bb[b]?(k(Bb[b], kg), k(b, void 0, !0)):k(b)
}
}, off: gd, one: function(a, b, d) {
a=E(a); a.on(b, function e() {
a.off(b, d); a.off(b, e);}); a.on(b, d);}, replaceWith: function(a, b) {
var d, c=a.parentNode; zb(a); q(new T(b), function(b) {
d?c.insertBefore(b, d.nextSibling):c.replaceChild(b,
a); d=b
});}, children: function(a) {
var b=[]; q(a.childNodes, function(a) {
1===a.nodeType&&b.push(a)
}); return b
}, contents: function(a) {
return a.contentDocument||a.childNodes||[];}, append: function(a, b) {
var d=a.nodeType; if (1===d||11===d) {
b=new T(b); for (var d=0, c=b.length; d<c; d++)a.appendChild(b[d])
}
}, prepend: function(a, b) {
if (1===a.nodeType) {
var d=a.firstChild; q(new T(b), function(b) {
a.insertBefore(b, d)
});}
}, wrap: function(a, b) {
var d=E(b).eq(0).clone()[0], c=a.parentNode; c&&c.replaceChild(d, a); d.appendChild(a);}, remove: Gb,
detach: function(a) {
Gb(a, !0)
}, after: function(a, b) {
var d=a, c=a.parentNode; if (c) {
b=new T(b); for (let e=0, f=b.length; e<f; e++) {
var g=b[e]; c.insertBefore(g, d.nextSibling); d=g
}
}
}, addClass: Eb, removeClass: Db, toggleClass: function(a, b, d) {
b&&q(b.split(' '), function(b) {
var e=d; z(e)&&(e=!Cb(a, b)); (e?Eb:Db)(a, b)
})
}, parent: function(a) {
return (a=a.parentNode)&&11!==a.nodeType?a:null;}, next: function(a) {
return a.nextElementSibling;}, find: function(a, b) {
return a.getElementsByTagName?a.getElementsByTagName(b):[]
}, clone: lc,
triggerHandler: function(a, b, d) {
var c, e, f=b.type||b, g=Ab(a); if (g=(g=g&&g.events)&&g[f]){c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:G,type:f,target:a},b.type&&(c=Q(c,b)),b=pa(g),e=d?[c].concat(d):[c],q(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,
e)})}}}, function(a, b) {
T.prototype[b]=function(b, c, e) {
for (var f, g=0, k=this.length; g<k; g++)z(f)?(f=a(this[g], b, c, e), t(f)&&(f=E(f))):kc(f, a(this[g], b, c, e)); return t(f)?f:this;};}); T.prototype.bind=T.prototype.on; T.prototype.unbind=T.prototype.off; var $g=Object.create(null); ld.prototype={_idx: function(a) {
if (a===this._lastKey) return this._lastIndex; this._lastKey=a; return this._lastIndex=this._keys.indexOf(a);}, _transformKey: function(a) {
return fa(a)?$g:a;}, get: function(a) {
a=this._transformKey(a); a=this._idx(a);
if (-1!==a) return this._values[a]
}, set: function(a, b) {
a=this._transformKey(a); var d=this._idx(a); -1===d&&(d=this._lastIndex=this._keys.length); this._keys[d]=a; this._values[d]=b;}, delete: function(a) {
a=this._transformKey(a); a=this._idx(a); if (-1===a) return !1; this._keys.splice(a, 1); this._values.splice(a, 1); this._lastKey=NaN; this._lastIndex=-1; return !0;}}; var Ib=ld, ag=[function() {
this.$get=[function() {
return Ib;}];}], ng=/^([^(]+?)=>/, og=/^[^(]*\(\s*([^)]*)\)/m, ah=/,/, bh=/^\s*(_?)(\S+?)\1\s*$/, mg=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
Ja=M('$injector'); fb.$$annotate=function(a, b, d) {
var c; if ('function'===typeof a) {
if (!(c=a.$inject)) {
c=[]; if (a.length) {
if (b) throw y(d)&&d||(d=a.name||pg(a)), Ja('strictdi', d); b=md(a); q(b[1].split(ah), function(a) {
a.replace(bh, function(a, b, d) {
c.push(d);})
});}a.$inject=c;}
} else I(a)?(b=a.length-1, ub(a[b], "fn"), c=a.slice(0, b)):ub(a, "fn", !0); return c
}; var ge=M('$animate'), sf=function() {
this.$get=G;}, tf=function() {
var a=new Ib, b=[]; this.$get=['$$AnimateRunner', "$rootScope", function(d, c) {
function e(a, b, c) {
var d=
!1; b&&(b=y(b)?b.split(' '):I(b)?b:[], q(b, function(b) {
b&&(d=!0, a[b]=c)
})); return d
} function f() {
q(b, function(b) {
var c=a.get(b); if (c) {
var d=qg(b.attr('class')), e='', f=''; q(c, function(a, b) {
a!==!!d[b]&&(a?e+=(e.length?' ':'')+b:f+=(f.length?' ':'')+b)
}); q(b, function(a) {
e&&Eb(a, e); f&&Db(a, f)
}); a.delete(b)
}
}); b.length=0;} return {enabled: G, on: G, off: G, pin: G, push: function(g, k, h, l) {
l&&l(); h=h||{}; h.from&&g.css(h.from); h.to&&g.css(h.to); if (h.addClass||h.removeClass) if (k=h.addClass, l=h.removeClass, h=a.get(g)||
{}, k=e(h, k, !0), l=e(h, l, !1), k||l)a.set(g, h), b.push(g), 1===b.length&&c.$$postDigest(f); g=new d; g.complete(); return g;}};}];}, qf=['$provide', function(a) {
var b=this, d=null, c=null; this.$$registeredAnimations=Object.create(null); this.register=function(c, d) {
if (c&&'.'!==c.charAt(0)) throw ge('notcsel', c); var g=c+'-animation'; b.$$registeredAnimations[c.substr(1)]=g; a.factory(g, d);}; this.customFilter=function(a) {
1===arguments.length&&(c=C(a)?a:null); return c
}; this.classNameFilter=function(a) {
if (1===arguments.length&&
(d=a instanceof RegExp?a:null)&&/[(\s|\/)]ng-animate[(\s|\/)]/.test(d.toString())) throw d=null, ge('nongcls', "ng-animate"); return d;}; this.$get=['$$animateQueue', function(a) {
function b(a, c, d) {
if (d) {
var e; a: {
for (e=0; e<d.length; e++) {
var f=d[e]; if (1===f.nodeType) {
e=f; break a
}
}e=void 0
}!e||e.parentNode||e.previousElementSibling||(d=null);}d?d.after(a):c.prepend(a)
} return {on: a.on, off: a.off, pin: a.pin, enabled: a.enabled, cancel: function(a) {
a.end&&a.end();}, enter: function(c, d, h, l) {
d=d&&E(d); h=h&&E(h); d=d||h.parent();
b(c, d, h); return a.push(c, "enter", Ka(l))
}, move: function(c, d, h, l) {
d=d&&E(d); h=h&&E(h); d=d||h.parent(); b(c, d, h); return a.push(c, "move", Ka(l));}, leave: function(b, c) {
return a.push(b, "leave", Ka(c), function() {
b.remove()
})
}, addClass: function(b, c, d) {
d=Ka(d); d.addClass=jb(d.addclass, c); return a.push(b, "addClass", d)
}, removeClass: function(b, c, d) {
d=Ka(d); d.removeClass=jb(d.removeClass, c); return a.push(b, "removeClass", d);}, setClass: function(b, c, d, f) {
f=Ka(f); f.addClass=jb(f.addClass, c); f.removeClass=jb(f.removeClass,
d); return a.push(b, "setClass", f);}, animate: function(b, c, d, f, m) {
m=Ka(m); m.from=m.from?Q(m.from, c):c; m.to=m.to?Q(m.to, d):d; m.tempClasses=jb(m.tempClasses, f||'ng-inline-animate'); return a.push(b, "animate", m)
}};}];}], vf=function() {
this.$get=['$$rAF', function(a) {
function b(b) {
d.push(b); 1<d.length||a(function() {
for (let a=0; a<d.length; a++)d[a](); d=[]
});} var d=[]; return function() {
var a=!1; b(function() {
a=!0;}); return function(d) {
a?d():b(d);}
}
}]
}, uf=function() {
this.$get=['$q', "$sniffer", "$$animateAsyncRun", "$$isDocumentHidden",
"$timeout", function(a, b, d, c, e) {
function f(a) {
this.setHost(a); var b=d(); this._doneCallbacks=[]; this._tick=function(a) {
c()?e(a, 0, !1):b(a);}; this._state=0;}f.chain=function(a, b) {
function c() {
if (d===a.length)b(!0); else a[d](function(a) {
!1===a?b(!1):(d++, c())
});} var d=0; c();}; f.all=function(a, b) {
function c(f) {
e=e&&f; ++d===a.length&&b(e)
} var d=0, e=!0; q(a, function(a) {
a.done(c)
})
}; f.prototype={"setHost": function(a) {
this.host=a||{};}, done: function(a) {
2===this._state?a():this._doneCallbacks.push(a);}, progress: G, getPromise: function() {
if (!this.promise) {
var b=
this; this.promise=a(function(a, c) {
b.done(function(b) {
!1===b?c():a();})
});} return this.promise
}, then: function(a, b) {
return this.getPromise().then(a, b)
}, "catch": function(a) {
return this.getPromise()['catch'](a)
}, "finally": function(a) {
return this.getPromise()['finally'](a);}, pause: function() {
this.host.pause&&this.host.pause();}, resume: function() {
this.host.resume&&this.host.resume()
}, end: function() {
this.host.end&&this.host.end(); this._resolve(!0)
}, cancel: function() {
this.host.cancel&&this.host.cancel(); this._resolve(!1)
},
complete: function(a) {
var b=this; 0===b._state&&(b._state=1, b._tick(function() {
b._resolve(a);}))
}, _resolve: function(a) {
2!==this._state&&(q(this._doneCallbacks, function(b) {
b(a)
}), this._doneCallbacks.length=0, this._state=2);}}; return f
}];}, rf=function() {
this.$get=['$$rAF', "$q", "$$AnimateRunner", function(a, b, d) {
return function(b, e) {
function f() {
a(function() {
g.addClass&&(b.addClass(g.addClass), g.addClass=null); g.removeClass&&(b.removeClass(g.removeClass), g.removeClass=null); g.to&&(b.css(g.to), g.to=null); k||
h.complete(); k=!0
}); return h;} var g=e||{}; g.$$prepared||(g=ya(g)); g.cleanupStyles&&(g.from=g.to=null); g.from&&(b.css(g.from), g.from=null); var k, h=new d; return {start: f, end: f}
}
}];}, aa=M('$compile'), pc=new function() {}; Xc.$inject=['$provide', "$$sanitizeUriProvider"]; Kb.prototype.isFirstChange=function() {
return this.previousValue===pc
}; var nd=/^((?:x|data)[:\-_])/i, vg=/[:\-_]+(.)/g, ud=M('$controller'), td=/^(\S+)(\s+as\s+([\w$]+))?$/, Cf=function() {
this.$get=['$document', function(a) {
return function(b) {
b?
!b.nodeType&&b instanceof E&&(b=b[0]):b=a[0].body; return b.offsetWidth+1;}
}]
}, vd='application/json', sc={'Content-Type': vd+';charset=utf-8'}, yg=/^\[|^\{(?!\{)/, zg={'[': /]$/, "{": /}$/}, xg=/^\)]\}',?\n/, Lb=M('$http'), ha=ea.$interpolateMinErr=M('$interpolate'); ha.throwNoconcat=function(a) {
throw ha('noconcat', a);
}; ha.interr=function(a, b) {
return ha('interr', a, b.toString());}; var Kf=function() {
this.$get=function() {
function a(a) {
var b=function(a) {
b.data=a; b.called=!0;}; b.id=a; return b;} var b=ea.callbacks, d={};
return {createCallback: function(c) {
c='_'+(b.$$counter++).toString(36); var e='angular.callbacks.'+c, f=a(c); d[e]=b[c]=f; return e;}, wasCalled: function(a) {
return d[a].called
}, getResponse: function(a) {
return d[a].data
}, removeCallback: function(a) {
delete b[d[a].id]; delete d[a]
}}
};}, ch=/^([^?#]*)(\?([^#]*))?(#(.*))?$/, Bg={http: 80, https: 443, ftp: 21}, mb=M('$location'), Cg=/^\s*[\\/]{2,}/, dh={$$absUrl: "", $$html5: !1, $$replace: !1, absUrl: Mb('$$absUrl'), url: function(a) {
if (z(a)) return this.$$url; var b=ch.exec(a); (b[1]||
""===a)&&this.path(decodeURIComponent(b[1])); (b[2]||b[1]||''===a)&&this.search(b[3]||''); this.hash(b[5]||''); return this;}, protocol: Mb('$$protocol'), host: Mb('$$host'), port: Mb('$$port'), path: Dd('$$path', function(a) {
a=null!==a?a.toString():''; return "/"===a.charAt(0)?a:'/'+a
}), search: function(a, b) {
switch (arguments.length) {
case 0: return this.$$search; case 1: if (y(a)||U(a))a=a.toString(), this.$$search=dc(a); else if (B(a))a=ya(a, {}), q(a, function(b, c) {
null==b&&delete a[c]
}), this.$$search=a; else throw mb('isrcharg');
break; default: z(b)||null===b?delete this.$$search[a]:this.$$search[a]=b;} this.$$compose(); return this;}, hash: Dd('$$hash', function(a) {
return null!==a?a.toString():''}), replace: function() {
this.$$replace=!0; return this;}}; q([Cd, xc, wc], function(a) {
a.prototype=Object.create(dh); a.prototype.state=function(b) {
if (!arguments.length) return this.$$state; if (a!==wc||!this.$$html5) throw mb('nostate'); this.$$state=z(b)?null:b; this.$$urlUpdatedByLocation=!0; return this
}
}); var Xa=M('$parse'), Gg={}.constructor.prototype.valueOf,
Tb=S(); q('+ - * / % === !== == != < > <= >= && || ! = |'.split(' '), function(a) {
Tb[a]=!0
}); var eh={"n": "\n", f: "\f", r: "\r", t: "\t", v: "\v", "'": "'", '"': '"'}, Ac=function(a) {
this.options=a
}; Ac.prototype={constructor: Ac, lex: function(a) {
this.text=a; this.index=0; for (this.tokens=[]; this.index<this.text.length;) if (a=this.text.charAt(this.index), '"'===a||'\''===a) this.readString(a); else if (this.isNumber(a)||'.'===a&&this.isNumber(this.peek())) this.readNumber(); else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent();
else if (this.is(a, "(){}[].,;:?")) this.tokens.push({index: this.index, text: a}), this.index++; else if (this.isWhitespace(a)) this.index++; else {
var b=a+this.peek(), d=b+this.peek(2), c=Tb[b], e=Tb[d]; Tb[a]||c||e?(a=e?d:c?b:a, this.tokens.push({index: this.index, text: a, operator: !0}), this.index+=a.length):this.throwError('Unexpected next character ', this.index, this.index+1)
} return this.tokens
}, is: function(a, b) {
return -1!==b.indexOf(a)
}, peek: function(a) {
a=a||1; return this.index+a<this.text.length?this.text.charAt(this.index+
a):!1
}, isNumber: function(a) {
return "0"<=a&&'9'>=a&&'string'===typeof a;}, isWhitespace: function(a) {
return " "===a||'\r'===a||'\t'===a||'\n'===a||'\v'===a||'\u00a0'===a
}, isIdentifierStart: function(a) {
return this.options.isIdentifierStart?this.options.isIdentifierStart(a, this.codePointAt(a)):this.isValidIdentifierStart(a);}, isValidIdentifierStart: function(a) {
return "a"<=a&&'z'>=a||'A'<=a&&'Z'>=a||'_'===a||'$'===a;}, isIdentifierContinue: function(a) {
return this.options.isIdentifierContinue?this.options.isIdentifierContinue(a,
this.codePointAt(a)):this.isValidIdentifierContinue(a)
}, isValidIdentifierContinue: function(a, b) {
return this.isValidIdentifierStart(a, b)||this.isNumber(a)
}, codePointAt: function(a) {
return 1===a.length?a.charCodeAt(0):(a.charCodeAt(0)<<10)+a.charCodeAt(1)-56613888
}, peekMultichar: function() {
var a=this.text.charAt(this.index), b=this.peek(); if (!b) return a; var d=a.charCodeAt(0), c=b.charCodeAt(0); return 55296<=d&&56319>=d&&56320<=c&&57343>=c?a+b:a
}, isExpOperator: function(a) {
return "-"===a||'+'===a||this.isNumber(a);},
throwError: function(a, b, d) {
d=d||this.index; b=t(b)?'s '+b+'-'+this.index+' ['+this.text.substring(b, d)+']':' '+d; throw Xa('lexerr', a, b, this.text);
}, readNumber: function() {
for (var a='', b=this.index; this.index<this.text.length;) {
var d=O(this.text.charAt(this.index)); if ('.'===d||this.isNumber(d))a+=d; else {
var c=this.peek(); if ('e'===d&&this.isExpOperator(c))a+=d; else if (this.isExpOperator(d)&&c&&this.isNumber(c)&&'e'===a.charAt(a.length-1))a+=d; else if (!this.isExpOperator(d)||c&&this.isNumber(c)||'e'!==
a.charAt(a.length-1)) break; else this.throwError('Invalid exponent');} this.index++;} this.tokens.push({index: b, text: a, constant: !0, value: Number(a)});}, readIdent: function() {
var a=this.index; for (this.index+=this.peekMultichar().length; this.index<this.text.length;) {
var b=this.peekMultichar(); if (!this.isIdentifierContinue(b)) break; this.index+=b.length
} this.tokens.push({index: a, text: this.text.slice(a, this.index), identifier: !0});}, readString: function(a) {
var b=this.index; this.index++; for (var d='', c=a, e=!1; this.index<
this.text.length;) {
var f=this.text.charAt(this.index), c=c+f; if (e)'u'===f?(e=this.text.substring(this.index+1, this.index+5), e.match(/[\da-f]{4}/i)||this.throwError('Invalid unicode escape [\\u'+e+']'), this.index+=4, d+=String.fromCharCode(parseInt(e, 16))):d+=eh[f]||f, e=!1; else if ('\\'===f)e=!0; else {
if (f===a) {
this.index++; this.tokens.push({index: b, text: c, constant: !0, value: d}); return
}d+=f;} this.index++;} this.throwError('Unterminated quote', b)
}}; var r=function(a, b) {
this.lexer=a; this.options=b
}; r.Program=
"Program"; r.ExpressionStatement='ExpressionStatement'; r.AssignmentExpression='AssignmentExpression'; r.ConditionalExpression='ConditionalExpression'; r.LogicalExpression='LogicalExpression'; r.BinaryExpression='BinaryExpression'; r.UnaryExpression='UnaryExpression'; r.CallExpression='CallExpression'; r.MemberExpression='MemberExpression'; r.Identifier='Identifier'; r.Literal='Literal'; r.ArrayExpression='ArrayExpression'; r.Property='Property'; r.ObjectExpression='ObjectExpression'; r.ThisExpression='ThisExpression';
r.LocalsExpression='LocalsExpression'; r.NGValueParameter='NGValueParameter'; r.prototype={ast: function(a) {
this.text=a; this.tokens=this.lexer.lex(a); a=this.program(); 0!==this.tokens.length&&this.throwError('is an unexpected token', this.tokens[0]); return a;}, program: function() {
for (let a=[]; ;) if (0<this.tokens.length&&!this.peek('}', ")", ";", "]")&&a.push(this.expressionStatement()), !this.expect(';')) return {type: r.Program, body: a}
}, expressionStatement: function() {
return {type: r.ExpressionStatement, expression: this.filterChain()};},
filterChain: function() {
for (var a=this.expression(); this.expect('|');)a=this.filter(a); return a
}, expression: function() {
return this.assignment()
}, assignment: function() {
var a=this.ternary(); if (this.expect('=')) {
if (!Hd(a)) throw Xa('lval'); a={type: r.AssignmentExpression, left: a, right: this.assignment(), operator: "="};} return a;}, ternary: function() {
var a=this.logicalOR(), b, d; return this.expect('?')&&(b=this.expression(), this.consume(':'))?(d=this.expression(), {type: r.ConditionalExpression, test: a, alternate: b,
consequent: d}):a
}, logicalOR: function() {
for (var a=this.logicalAND(); this.expect('||');)a={type: r.LogicalExpression, operator: "||", left: a, right: this.logicalAND()}; return a
}, logicalAND: function() {
for (var a=this.equality(); this.expect('&&');)a={type: r.LogicalExpression, operator: "&&", left: a, right: this.equality()}; return a
}, equality: function() {
for (var a=this.relational(), b; b=this.expect('==', "!=", "===", "!==");)a={type: r.BinaryExpression, operator: b.text, left: a, right: this.relational()}; return a
}, relational: function() {
for (var a=
this.additive(), b; b=this.expect('<', ">", "<=", ">=");)a={type: r.BinaryExpression, operator: b.text, left: a, right: this.additive()}; return a;}, additive: function() {
for (var a=this.multiplicative(), b; b=this.expect('+', "-");)a={type: r.BinaryExpression, operator: b.text, left: a, right: this.multiplicative()}; return a;}, multiplicative: function() {
for (var a=this.unary(), b; b=this.expect('*', "/", "%");)a={type: r.BinaryExpression, operator: b.text, left: a, right: this.unary()}; return a;}, unary: function() {
var a; return (a=this.expect('+',
"-", "!"))?{type: r.UnaryExpression, operator: a.text, prefix: !0, argument: this.unary()}:this.primary();}, primary: function() {
var a; this.expect('(')?(a=this.filterChain(), this.consume(')')):this.expect('[')?a=this.arrayDeclaration():this.expect('{')?a=this.object():this.selfReferential.hasOwnProperty(this.peek().text)?a=ya(this.selfReferential[this.consume().text]):this.options.literals.hasOwnProperty(this.peek().text)?a={type: r.Literal, value: this.options.literals[this.consume().text]}:this.peek().identifier?
a=this.identifier():this.peek().constant?a=this.constant():this.throwError('not a primary expression', this.peek()); for (var b; b=this.expect('(', "[", ".");)'('===b.text?(a={type: r.CallExpression, callee: a, arguments: this.parseArguments()}, this.consume(')')):'['===b.text?(a={type: r.MemberExpression, object: a, property: this.expression(), computed: !0}, this.consume(']')):'.'===b.text?a={type: r.MemberExpression, object: a, property: this.identifier(), computed: !1}:this.throwError('IMPOSSIBLE'); return a;}, filter: function(a) {
a=
[a]; for (var b={type: r.CallExpression, callee: this.identifier(), arguments: a, filter: !0}; this.expect(':');)a.push(this.expression()); return b;}, parseArguments: function() {
var a=[]; if (')'!==this.peekToken().text) {
do a.push(this.filterChain()); while (this.expect(','));} return a;}, identifier: function() {
var a=this.consume(); a.identifier||this.throwError('is not a valid identifier', a); return {type: r.Identifier, name: a.text}
}, constant: function() {
return {type: r.Literal, value: this.consume().value};}, arrayDeclaration: function() {
var a=
[]; if (']'!==this.peekToken().text) {
do {
if (this.peek(']')) break; a.push(this.expression());} while (this.expect(','));} this.consume(']'); return {type: r.ArrayExpression, elements: a}
}, object: function() {
var a=[], b; if ('}'!==this.peekToken().text) {
do {
if (this.peek('}')) break; b={type: r.Property, kind: "init"}; this.peek().constant?(b.key=this.constant(), b.computed=!1, this.consume(':'), b.value=this.expression()):this.peek().identifier?(b.key=this.identifier(), b.computed=!1, this.peek(':')?(this.consume(':'), b.value=this.expression()):
b.value=b.key):this.peek('[')?(this.consume('['), b.key=this.expression(), this.consume(']'), b.computed=!0, this.consume(':'), b.value=this.expression()):this.throwError('invalid key', this.peek()); a.push(b);} while (this.expect(','))
} this.consume('}'); return {type: r.ObjectExpression, properties: a};}, throwError: function(a, b) {
throw Xa('syntax', b.text, a, b.index+1, this.text, this.text.substring(b.index));
}, consume: function(a) {
if (0===this.tokens.length) throw Xa('ueoe', this.text); var b=this.expect(a); b||this.throwError('is unexpected, expecting ['+
a+']', this.peek()); return b
}, peekToken: function() {
if (0===this.tokens.length) throw Xa('ueoe', this.text); return this.tokens[0]
}, peek: function(a, b, d, c) {
return this.peekAhead(0, a, b, d, c)
}, peekAhead: function(a, b, d, c, e) {
if (this.tokens.length>a) {
a=this.tokens[a]; var f=a.text; if (f===b||f===d||f===c||f===e||!(b||d||c||e)) return a
} return !1
}, expect: function(a, b, d, c) {
return (a=this.peek(a, b, d, c))?(this.tokens.shift(), a):!1
}, selfReferential: {'this': {type: r.ThisExpression}, $locals: {type: r.LocalsExpression}}}; var Fd=
2; Jd.prototype={compile: function(a) {
var b=this; this.state={nextId: 0, filters: {}, fn: {vars: [], body: [], own: {}}, assign: {vars: [], body: [], own: {}}, inputs: []}; W(a, b.$filter); var d='', c; this.stage='assign'; if (c=Id(a)) this.state.computing='assign', d=this.nextId(), this.recurse(c, d), this.return_(d), d='fn.assign='+this.generateFunction('assign', "s,v,l"); c=Gd(a.body); b.stage='inputs'; q(c, function(a, c) {
var d='fn'+c; b.state[d]={vars: [], body: [], own: {}}; b.state.computing=d; var k=b.nextId(); b.recurse(a, k); b.return_(k);
b.state.inputs.push({name: d, isPure: a.isPure}); a.watchId=c;}); this.state.computing='fn'; this.stage='main'; this.recurse(a); a='"'+this.USE+' '+this.STRICT+'";\n'+this.filterPrefix()+'var fn='+this.generateFunction('fn', "s,l,a,i")+d+this.watchFns()+'return fn;'; a=(new Function('$filter', "getStringValue", "ifDefined", "plus", a))(this.$filter, Dg, Eg, Ed); this.state=this.stage=void 0; return a
}, USE: "use", STRICT: "strict", watchFns: function() {
var a=[], b=this.state.inputs, d=this; q(b, function(b) {
a.push('var '+b.name+
"="+d.generateFunction(b.name, "s")); b.isPure&&a.push(b.name, ".isPure="+JSON.stringify(b.isPure)+';')
}); b.length&&a.push('fn.inputs=['+b.map(function(a) {
return a.name;}).join(',')+'];'); return a.join('')
}, generateFunction: function(a, b) {
return "function("+b+'){'+this.varsPrefix(a)+this.body(a)+'};'}, filterPrefix: function() {
var a=[], b=this; q(this.state.filters, function(d, c) {
a.push(d+'=$filter('+b.escape(c)+')')
}); return a.length?'var '+a.join(',')+';':''}, varsPrefix: function(a) {
return this.state[a].vars.length?
"var "+this.state[a].vars.join(',')+';':''}, body: function(a) {
return this.state[a].body.join('')
}, recurse: function(a, b, d, c, e, f) {
var g, k, h=this, l, m, p; c=c||G; if (!f&&t(a.watchId))b=b||this.nextId(), this.if_('i', this.lazyAssign(b, this.computedMember('i', a.watchId)), this.lazyRecurse(a, b, d, c, e, !0)); else {switch(a.type){case r.Program:q(a.body,function(b,c){h.recurse(b.expression,void 0,void 0,function(a){k=a});c!==a.body.length-1?h.current().body.push(k,";"):h.return_(k)});break;case r.Literal:m=this.escape(a.value);
this.assign(b,m);c(b||m);break;case r.UnaryExpression:this.recurse(a.argument,void 0,void 0,function(a){k=a});m=a.operator+"("+this.ifDefined(k,0)+")";this.assign(b,m);c(m);break;case r.BinaryExpression:this.recurse(a.left,void 0,void 0,function(a){g=a});this.recurse(a.right,void 0,void 0,function(a){k=a});m="+"===a.operator?this.plus(g,k):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(k,0):"("+g+")"+a.operator+"("+k+")";this.assign(b,m);c(m);break;case r.LogicalExpression:b=b||this.nextId();
h.recurse(a.left,b);h.if_("&&"===a.operator?b:h.not(b),h.lazyRecurse(a.right,b));c(b);break;case r.ConditionalExpression:b=b||this.nextId();h.recurse(a.test,b);h.if_(b,h.lazyRecurse(a.alternate,b),h.lazyRecurse(a.consequent,b));c(b);break;case r.Identifier:b=b||this.nextId();d&&(d.context="inputs"===h.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);h.if_("inputs"===h.stage||h.not(h.getHasOwnProperty("l",a.name)),function(){h.if_("inputs"===
h.stage||"s",function(){e&&1!==e&&h.if_(h.isNull(h.nonComputedMember("s",a.name)),h.lazyAssign(h.nonComputedMember("s",a.name),"{}"));h.assign(b,h.nonComputedMember("s",a.name))})},b&&h.lazyAssign(b,h.nonComputedMember("l",a.name)));c(b);break;case r.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();h.recurse(a.object,g,void 0,function(){h.if_(h.notNull(g),function(){a.computed?(k=h.nextId(),h.recurse(a.property,k),h.getStringValue(k),e&&1!==e&&h.if_(h.not(h.computedMember(g,
k)),h.lazyAssign(h.computedMember(g,k),"{}")),m=h.computedMember(g,k),h.assign(b,m),d&&(d.computed=!0,d.name=k)):(e&&1!==e&&h.if_(h.isNull(h.nonComputedMember(g,a.property.name)),h.lazyAssign(h.nonComputedMember(g,a.property.name),"{}")),m=h.nonComputedMember(g,a.property.name),h.assign(b,m),d&&(d.computed=!1,d.name=a.property.name))},function(){h.assign(b,"undefined")});c(b)},!!e);break;case r.CallExpression:b=b||this.nextId();a.filter?(k=h.filter(a.callee.name),l=[],q(a.arguments,function(a){var b=
h.nextId();h.recurse(a,b);l.push(b)}),m=k+"("+l.join(",")+")",h.assign(b,m),c(b)):(k=h.nextId(),g={},l=[],h.recurse(a.callee,k,g,function(){h.if_(h.notNull(k),function(){q(a.arguments,function(b){h.recurse(b,a.constant?void 0:h.nextId(),void 0,function(a){l.push(a)})});m=g.name?h.member(g.context,g.name,g.computed)+"("+l.join(",")+")":k+"("+l.join(",")+")";h.assign(b,m)},function(){h.assign(b,"undefined")});c(b)}));break;case r.AssignmentExpression:k=this.nextId();g={};this.recurse(a.left,void 0,
g,function(){h.if_(h.notNull(g.context),function(){h.recurse(a.right,k);m=h.member(g.context,g.name,g.computed)+a.operator+k;h.assign(b,m);c(b||m)})},1);break;case r.ArrayExpression:l=[];q(a.elements,function(b){h.recurse(b,a.constant?void 0:h.nextId(),void 0,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(b||m);break;case r.ObjectExpression:l=[];p=!1;q(a.properties,function(a){a.computed&&(p=!0)});p?(b=b||this.nextId(),this.assign(b,"{}"),q(a.properties,function(a){a.computed?
(g=h.nextId(),h.recurse(a.key,g)):g=a.key.type===r.Identifier?a.key.name:""+a.key.value;k=h.nextId();h.recurse(a.value,k);h.assign(h.member(b,g,a.computed),k)})):(q(a.properties,function(b){h.recurse(b.value,a.constant?void 0:h.nextId(),void 0,function(a){l.push(h.escape(b.key.type===r.Identifier?b.key.name:""+b.key.value)+":"+a)})}),m="{"+l.join(",")+"}",this.assign(b,m));c(b||m);break;case r.ThisExpression:this.assign(b,"s");c(b||"s");break;case r.LocalsExpression:this.assign(b,"l");c(b||"l");break;
case r.NGValueParameter:this.assign(b,"v"),c(b||"v")}}}, getHasOwnProperty: function(a, b) {
var d=a+'.'+b, c=this.current().own; c.hasOwnProperty(d)||(c[d]=this.nextId(!1, a+'&&('+this.escape(b)+' in '+a+')')); return c[d];}, assign: function(a, b) {
if (a) return this.current().body.push(a, "=", b, ";"), a
}, filter: function(a) {
this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0)); return this.state.filters[a]
}, ifDefined: function(a, b) {
return "ifDefined("+a+','+this.escape(b)+')'}, plus: function(a,
b) {
return "plus("+a+','+b+')'}, return_: function(a) {
this.current().body.push('return ', a, ";");}, if_: function(a, b, d) {
if (!0===a)b(); else {
var c=this.current().body; c.push('if(', a, "){"); b(); c.push('}'); d&&(c.push('else{'), d(), c.push('}'))
}
}, not: function(a) {
return "!("+a+')'}, isNull: function(a) {
return a+'==null'}, notNull: function(a) {
return a+'!=null'}, nonComputedMember: function(a, b) {
var d=/[^$_a-zA-Z0-9]/g; return /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b)?a+'.'+b:a+'["'+b.replace(d, this.stringEscapeFn)+'"]';}, computedMember: function(a,
b) {
return a+'['+b+']'}, member: function(a, b, d) {
return d?this.computedMember(a, b):this.nonComputedMember(a, b)
}, getStringValue: function(a) {
this.assign(a, "getStringValue("+a+')');}, lazyRecurse: function(a, b, d, c, e, f) {
var g=this; return function() {
g.recurse(a, b, d, c, e, f)
}
}, lazyAssign: function(a, b) {
var d=this; return function() {
d.assign(a, b);}
}, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function(a) {
return "\\u"+('0000'+a.charCodeAt(0).toString(16)).slice(-4);}, escape: function(a) {
if (y(a)) return "'"+a.replace(this.stringEscapeRegex,
this.stringEscapeFn)+'\''; if (U(a)) return a.toString(); if (!0===a) return "true"; if (!1===a) return "false"; if (null===a) return "null"; if ('undefined'===typeof a) return "undefined"; throw Xa('esc');
}, nextId: function(a, b) {
var d='v'+this.state.nextId++; a||this.current().vars.push(d+(b?'='+b:'')); return d
}, current: function() {
return this.state[this.state.computing];}}; Kd.prototype={"compile": function(a) {
var b=this; W(a, b.$filter); var d, c; if (d=Id(a))c=this.recurse(d); d=Gd(a.body); var e; d&&(e=[], q(d, function(a, c) {
var d=
b.recurse(a); d.isPure=a.isPure; a.input=d; e.push(d); a.watchId=c
})); var f=[]; q(a.body, function(a) {
f.push(b.recurse(a.expression));}); a=0===a.body.length?G:1===a.body.length?f[0]:function(a, b) {
var c; q(f, function(d) {
c=d(a, b);}); return c
}; c&&(a.assign=function(a, b, d) {
return c(a, d, b)
}); e&&(a.inputs=e); return a;}, recurse: function(a, b, d) {
var c, e, f=this, g; if (a.input) return this.inputs(a.input, a.watchId); switch (a.type) {
case r.Literal: return this.value(a.value, b); case r.UnaryExpression: return e=this.recurse(a.argument),
this['unary'+a.operator](e, b); case r.BinaryExpression: return c=this.recurse(a.left), e=this.recurse(a.right), this['binary'+a.operator](c, e, b); case r.LogicalExpression: return c=this.recurse(a.left), e=this.recurse(a.right), this['binary'+a.operator](c, e, b); case r.ConditionalExpression: return this['ternary?:'](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b); case r.Identifier: return f.identifier(a.name, b, d); case r.MemberExpression: return c=this.recurse(a.object, !1, !!d), a.computed||
(e=a.property.name), a.computed&&(e=this.recurse(a.property)), a.computed?this.computedMember(c, e, b, d):this.nonComputedMember(c, e, b, d); case r.CallExpression: return g=[], q(a.arguments, function(a) {
g.push(f.recurse(a));}), a.filter&&(e=this.$filter(a.callee.name)), a.filter||(e=this.recurse(a.callee, !0)), a.filter?function(a, c, d, f) {
for (var p=[], n=0; n<g.length; ++n)p.push(g[n](a, c, d, f)); a=e.apply(void 0, p, f); return b?{context: void 0, name: void 0, value: a}:a;}:function(a, c, d, f) {
var p=e(a, c, d, f), n; if (null!=p.value) {
n=
[]; for (let q=0; q<g.length; ++q)n.push(g[q](a, c, d, f)); n=p.value.apply(p.context, n)
} return b?{value: n}:n;}; case r.AssignmentExpression: return c=this.recurse(a.left, !0, 1), e=this.recurse(a.right), function(a, d, f, g) {
var p=c(a, d, f, g); a=e(a, d, f, g); p.context[p.name]=a; return b?{value: a}:a;}; case r.ArrayExpression: return g=[], q(a.elements, function(a) {
g.push(f.recurse(a));}), function(a, c, d, e) {
for (var f=[], n=0; n<g.length; ++n)f.push(g[n](a, c, d, e)); return b?{value: f}:f;}; case r.ObjectExpression: return g=[], q(a.properties,
function(a) {
a.computed?g.push({key: f.recurse(a.key), computed: !0, value: f.recurse(a.value)}):g.push({key: a.key.type===r.Identifier?a.key.name:''+a.key.value, computed: !1, value: f.recurse(a.value)})
}), function(a, c, d, e) {
for (var f={}, n=0; n<g.length; ++n)g[n].computed?f[g[n].key(a, c, d, e)]=g[n].value(a, c, d, e):f[g[n].key]=g[n].value(a, c, d, e); return b?{value: f}:f
}; case r.ThisExpression: return function(a) {
return b?{value: a}:a;}; case r.LocalsExpression: return function(a, c) {
return b?{value: c}:c;}; case r.NGValueParameter: return function(a,
c, d) {
return b?{value: d}:d;};}
}, "unary+": function(a, b) {
return function(d, c, e, f) {
d=a(d, c, e, f); d=t(d)?+d:0; return b?{value: d}:d
};}, "unary-": function(a, b) {
return function(d, c, e, f) {
d=a(d, c, e, f); d=t(d)?-d:-0; return b?{value: d}:d;};}, "unary!": function(a, b) {
return function(d, c, e, f) {
d=!a(d, c, e, f); return b?{value: d}:d;}
}, "binary+": function(a, b, d) {
return function(c, e, f, g) {
var k=a(c, e, f, g); c=b(c, e, f, g); k=Ed(k, c); return d?{value: k}:k;}
}, "binary-": function(a, b, d) {
return function(c, e, f, g) {
var k=a(c, e, f, g); c=b(c, e, f, g);
k=(t(k)?k:0)-(t(c)?c:0); return d?{value: k}:k;}
}, "binary*": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)*b(c, e, f, g); return d?{value: c}:c
};}, "binary/": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)/b(c, e, f, g); return d?{value: c}:c;}
}, "binary%": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)%b(c, e, f, g); return d?{value: c}:c
};}, "binary===": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)===b(c, e, f, g); return d?{value: c}:c;}
}, "binary!==": function(a, b, d) {
return function(c, e, f, g) {
c=a(c,
e, f, g)!==b(c, e, f, g); return d?{value: c}:c;}
}, "binary==": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)==b(c, e, f, g); return d?{value: c}:c;}
}, "binary!=": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)!=b(c, e, f, g); return d?{value: c}:c;};}, "binary<": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)<b(c, e, f, g); return d?{value: c}:c;}
}, "binary>": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)>b(c, e, f, g); return d?{value: c}:c
}
}, "binary<=": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f,
g)<=b(c, e, f, g); return d?{value: c}:c;};}, "binary>=": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)>=b(c, e, f, g); return d?{value: c}:c;}
}, "binary&&": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)&&b(c, e, f, g); return d?{value: c}:c
}
}, "binary||": function(a, b, d) {
return function(c, e, f, g) {
c=a(c, e, f, g)||b(c, e, f, g); return d?{value: c}:c;};}, "ternary?:": function(a, b, d, c) {
return function(e, f, g, k) {
e=a(e, f, g, k)?b(e, f, g, k):d(e, f, g, k); return c?{value: e}:e;}
}, value: function(a, b) {
return function() {
return b?{context: void 0,
name: void 0, value: a}:a;};}, identifier: function(a, b, d) {
return function(c, e, f, g) {
c=e&&a in e?e:c; d&&1!==d&&c&&null==c[a]&&(c[a]={}); e=c?c[a]:void 0; return b?{context: c, name: a, value: e}:e
};}, computedMember: function(a, b, d, c) {
return function(e, f, g, k) {
var h=a(e, f, g, k), l, m; null!=h&&(l=b(e, f, g, k), l+='', c&&1!==c&&h&&!h[l]&&(h[l]={}), m=h[l]); return d?{context: h, name: l, value: m}:m
};}, nonComputedMember: function(a, b, d, c) {
return function(e, f, g, k) {
e=a(e, f, g, k); c&&1!==c&&e&&null==e[b]&&(e[b]={}); f=null!=e?e[b]:void 0;
return d?{context: e, name: b, value: f}:f;};}, inputs: function(a, b) {
return function(d, c, e, f) {
return f?f[b]:a(d, c, e)
}
}}; yc.prototype={constructor: yc, parse: function(a) {
a=this.ast.ast(a); var b=this.astCompiler.compile(a); b.literal=0===a.body.length||1===a.body.length&&(a.body[0].expression.type===r.Literal||a.body[0].expression.type===r.ArrayExpression||a.body[0].expression.type===r.ObjectExpression); b.constant=a.constant; return b
}}; var oa=M('$sce'), ia={HTML: "html", CSS: "css", URL: "url", RESOURCE_URL: "resourceUrl",
JS: "js"}, Bc=/_([a-z])/g, Ig=M('$compile'), da=u.document.createElement('a'), zd=va(u.location.href), Ta; Od.$inject=['$document']; dd.$inject=['$provide']; var Vd=22, Ud='.', Dc='0'; Pd.$inject=['$locale']; Rd.$inject=['$locale']; var Tg={yyyy: Z('FullYear', 4, 0, !1, !0), yy: Z('FullYear', 2, 0, !0, !0), y: Z('FullYear', 1, 0, !1, !0), MMMM: ob('Month'), MMM: ob('Month', !0), MM: Z('Month', 2, 1), M: Z('Month', 1, 1), LLLL: ob('Month', !1, !0), dd: Z('Date', 2), d: Z('Date', 1), HH: Z('Hours', 2), H: Z('Hours', 1), hh: Z('Hours', 2, -12), h: Z('Hours', 1, -12),
mm: Z('Minutes', 2), m: Z('Minutes', 1), ss: Z('Seconds', 2), s: Z('Seconds', 1), sss: Z('Milliseconds', 3), EEEE: ob('Day'), EEE: ob('Day', !0), a: function(a, b) {
return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]
}, Z: function(a, b, d) {
a=-1*d; return a=(0<=a?'+':'')+(Nb(Math[0<a?'floor':'ceil'](a/60), 2)+Nb(Math.abs(a%60), 2));}, ww: Xd(2), w: Xd(1), G: Ec, GG: Ec, GGG: Ec, GGGG: function(a, b) {
return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]
}}, Sg=/((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/,
Rg=/^-?\d+$/; Qd.$inject=['$locale']; var Mg=$(O), Ng=$(wb); Sd.$inject=['$parse']; var He=$({restrict: "E", compile: function(a, b) {
if (!b.href&&!b.xlinkHref) return function(a, b) {
if ('a'===b[0].nodeName.toLowerCase()) {
var e='[object SVGAnimatedString]'===ja.call(b.prop('href'))?'xlink:href':'href'; b.on('click', function(a) {
b.attr(e)||a.preventDefault();});}
};}}), xb={}; q(Hb, function(a, b) {
function d(a, d, e) {
a.$watch(e[c], function(a) {
e.$set(b, !!a);});} if ('multiple'!==a) {
var c=Ea('ng-'+b), e=d; "checked"===a&&(e=function(a,
b, e) {
e.ngModel!==e[c]&&d(a, b, e)
}); xb[c]=function() {
return {restrict: "A", priority: 100, link: e};}
}
}); q(sd, function(a, b) {
xb[b]=function() {
return {priority: 100, link: function(a, c, e) {
if ('ngPattern'===b&&'/'===e.ngPattern.charAt(0)&&(c=e.ngPattern.match(Xg))) {
e.$set('ngPattern', new RegExp(c[1], c[2])); return;}a.$watch(e[b], function(a) {
e.$set(b, a)
})
}};};}); q(['src', "srcset", "href"], function(a) {
var b=Ea('ng-'+a); xb[b]=function() {
return {priority: 99, link: function(d, c, e) {
var f=a, g=a; "href"===a&&'[object SVGAnimatedString]'===
ja.call(c.prop('href'))&&(g='xlinkHref', e.$attr[g]='xlink:href', f=null); e.$observe(b, function(b) {
b?(e.$set(g, b), Ba&&f&&c.prop(f, e[g])):'href'===a&&e.$set(g, null)
});}}
};}); var Pb={$addControl: G, $$renameControl: function(a, b) {
a.$name=b;}, $removeControl: G, $setValidity: G, $setDirty: G, $setPristine: G, $setSubmitted: G}; Ob.$inject=['$element', "$attrs", "$scope", "$animate", "$interpolate"]; Ob.prototype={$rollbackViewValue: function() {
q(this.$$controls, function(a) {
a.$rollbackViewValue();})
}, $commitViewValue: function() {
q(this.$$controls,
function(a) {
a.$commitViewValue()
});}, $addControl: function(a) {
Na(a.$name, "input"); this.$$controls.push(a); a.$name&&(this[a.$name]=a); a.$$parentForm=this;}, $$renameControl: function(a, b) {
var d=a.$name; this[d]===a&&delete this[d]; this[b]=a; a.$name=b;}, $removeControl: function(a) {
a.$name&&this[a.$name]===a&&delete this[a.$name]; q(this.$pending, function(b, d) {
this.$setValidity(d, null, a)
}, this); q(this.$error, function(b, d) {
this.$setValidity(d, null, a);}, this); q(this.$$success, function(b, d) {
this.$setValidity(d, null,
a);}, this); bb(this.$$controls, a); a.$$parentForm=Pb
}, $setDirty: function() {
this.$$animate.removeClass(this.$$element, Ya); this.$$animate.addClass(this.$$element, Ub); this.$dirty=!0; this.$pristine=!1; this.$$parentForm.$setDirty();}, $setPristine: function() {
this.$$animate.setClass(this.$$element, Ya, Ub+' ng-submitted'); this.$dirty=!1; this.$pristine=!0; this.$submitted=!1; q(this.$$controls, function(a) {
a.$setPristine();});}, $setUntouched: function() {
q(this.$$controls, function(a) {
a.$setUntouched()
})
}, $setSubmitted: function() {
this.$$animate.addClass(this.$$element,
"ng-submitted"); this.$submitted=!0; this.$$parentForm.$setSubmitted();}}; $d({clazz: Ob, set: function(a, b, d) {
var c=a[b]; c?-1===c.indexOf(d)&&c.push(d):a[b]=[d]
}, unset: function(a, b, d) {
var c=a[b]; c&&(bb(c, d), 0===c.length&&delete a[b])
}}); var he=function(a) {
return ['$timeout', "$parse", function(b, d) {
function c(a) {
return ""===a?d('this[""]').assign:d(a).assign||G;} return {name: "form", restrict: a?'EAC':'E', require: ['form', "^^?form"], controller: Ob, compile: function(d, f) {
d.addClass(Ya).addClass(pb); var g=f.name?'name':
a&&f.ngForm?'ngForm':!1; return {pre: function(a, d, e, f) {
var p=f[0]; if (!('action'in e)) {
var n=function(b) {
a.$apply(function() {
p.$commitViewValue(); p.$setSubmitted()
}); b.preventDefault()
}; d[0].addEventListener('submit', n); d.on('$destroy', function() {
b(function() {
d[0].removeEventListener('submit', n)
}, 0, !1)
});}(f[1]||p.$$parentForm).$addControl(p); var q=g?c(p.$name):G; g&&(q(a, p), e.$observe(g, function(b) {
p.$name!==b&&(q(a, void 0), p.$$parentForm.$$renameControl(p, b), q=c(p.$name), q(a, p));})); d.on('$destroy', function() {
p.$$parentForm.$removeControl(p);
q(a, void 0); Q(p, Pb)
});}}
}}
}]
}, Ie=he(), Ue=he(!0), Ug=/^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/, fh=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i, gh=/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/, Vg=/^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, ie=/^(\d{4,})-(\d{2})-(\d{2})$/,
je=/^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Lc=/^(\d{4,})-W(\d\d)$/, ke=/^(\d{4,})-(\d\d)$/, le=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, be=S(); q(['date', "datetime-local", "month", "time", "week"], function(a) {
be[a]=!0
}); var me={"text": function(a, b, d, c, e, f) {
Va(a, b, d, c, e, f); Gc(c);}, date: qb('date', ie, Qb(ie, ['yyyy', "MM", "dd"]), "yyyy-MM-dd"), "datetime-local": qb('datetimelocal', je, Qb(je, "yyyy MM dd HH mm ss sss".split(' ')), "yyyy-MM-ddTHH:mm:ss.sss"), time: qb('time', le, Qb(le, ['HH', "mm",
"ss", "sss"]), "HH:mm:ss.sss"), week: qb('week', Lc, function(a, b) {
if (ga(a)) return a; if (y(a)) {
Lc.lastIndex=0; var d=Lc.exec(a); if (d) {
var c=+d[1], e=+d[2], f=d=0, g=0, k=0, h=Wd(c), e=7*(e-1); b&&(d=b.getHours(), f=b.getMinutes(), g=b.getSeconds(), k=b.getMilliseconds()); return new Date(c, 0, h.getDate()+e, d, f, g, k);}
} return NaN
}, "yyyy-Www"), month: qb('month', ke, Qb(ke, ['yyyy', "MM"]), "yyyy-MM"), number: function(a, b, d, c, e, f) {
Hc(a, b, d, c); ce(c); Va(a, b, d, c, e, f); var g, k; if (t(d.min)||d.ngMin){c.$validators.min=function(a){return c.$isEmpty(a)||
z(g)||a>=g},d.$observe("min",function(a){g=Wa(a);c.$validate()});}if (t(d.max)||d.ngMax)c.$validators.max=function(a) {
return c.$isEmpty(a)||z(k)||a<=k;}, d.$observe('max', function(a) {
k=Wa(a); c.$validate();}); if (t(d.step)||d.ngStep) {
var h; c.$validators.step=function(a, b) {
return c.$isEmpty(b)||z(h)||de(b, g||0, h)
}; d.$observe('step', function(a) {
h=Wa(a); c.$validate();})
}
}, url: function(a, b, d, c, e, f) {
Va(a, b, d, c, e, f); Gc(c); c.$$parserName='url'; c.$validators.url=function(a, b) {
var d=a||b; return c.$isEmpty(d)||fh.test(d);}
},
email: function(a, b, d, c, e, f) {
Va(a, b, d, c, e, f); Gc(c); c.$$parserName='email'; c.$validators.email=function(a, b) {
var d=a||b; return c.$isEmpty(d)||gh.test(d)
};}, radio: function(a, b, d, c) {
var e=!d.ngTrim||'false'!==R(d.ngTrim); z(d.name)&&b.attr('name', ++sb); b.on('click', function(a) {
var g; b[0].checked&&(g=d.value, e&&(g=R(g)), c.$setViewValue(g, a&&a.type));}); c.$render=function() {
var a=d.value; e&&(a=R(a)); b[0].checked=a===c.$viewValue
}; d.$observe('value', c.$render);}, range: function(a, b, d, c, e, f) {
function g(a, c) {
b.attr(a,
d[a]); d.$observe(a, c);} function k(a) {
p=Wa(a); fa(c.$modelValue)||(m?(a=b.val(), p>a&&(a=p, b.val(a)), c.$setViewValue(a)):c.$validate())
} function h(a) {
n=Wa(a); fa(c.$modelValue)||(m?(a=b.val(), n<a&&(b.val(n), a=n<p?p:n), c.$setViewValue(a)):c.$validate());} function l(a) {
q=Wa(a); fa(c.$modelValue)||(m&&c.$viewValue!==b.val()?c.$setViewValue(b.val()):c.$validate())
}Hc(a, b, d, c); ce(c); Va(a, b, d, c, e, f); var m=c.$$hasNativeValidators&&'range'===b[0].type, p=m?0:void 0, n=m?100:void 0, q=m?1:void 0, r=b[0].validity; a=t(d.min);
e=t(d.max); f=t(d.step); var w=c.$render; c.$render=m&&t(r.rangeUnderflow)&&t(r.rangeOverflow)?function() {
w(); c.$setViewValue(b.val());}:w; a&&(c.$validators.min=m?function() {
return !0
}:function(a, b) {
return c.$isEmpty(b)||z(p)||b>=p
}, g('min', k)); e&&(c.$validators.max=m?function() {
return !0
}:function(a, b) {
return c.$isEmpty(b)||z(n)||b<=n
}, g('max', h)); f&&(c.$validators.step=m?function() {
return !r.stepMismatch;}:function(a, b) {
return c.$isEmpty(b)||z(q)||de(b, p||0, q);}, g('step', l));}, checkbox: function(a, b, d, c, e,
f, g, k) {
var h=ee(k, a, "ngTrueValue", d.ngTrueValue, !0), l=ee(k, a, "ngFalseValue", d.ngFalseValue, !1); b.on('click', function(a) {
c.$setViewValue(b[0].checked, a&&a.type);}); c.$render=function() {
b[0].checked=c.$viewValue;}; c.$isEmpty=function(a) {
return !1===a
}; c.$formatters.push(function(a) {
return ta(a, h);}); c.$parsers.push(function(a) {
return a?h:l
})
}, hidden: G, button: G, submit: G, reset: G, file: G}, Yc=['$browser', "$sniffer", "$filter", "$parse", function(a, b, d, c) {
return {restrict: "E", require: ['?ngModel'], link: {pre: function(e,
f, g, k) {
k[0]&&(me[O(g.type)]||me.text)(e, f, g, k[0], b, a, d, c)
}}};}], hh=/^(true|false|\d+)$/, mf=function() {
function a(a, d, c) {
var e=t(c)?c:9===Ba?'':null; a.prop('value', e); d.$set('value', c);} return {restrict: "A", priority: 100, compile: function(b, d) {
return hh.test(d.ngValue)?function(b, d, f) {
b=b.$eval(f.ngValue); a(d, f, b)
}:function(b, d, f) {
b.$watch(f.ngValue, function(b) {
a(d, f, b)
});}
}}
}, Me=['$compile', function(a) {
return {restrict: "AC", compile: function(b) {
a.$$addBindingClass(b); return function(b, c, e) {
a.$$addBindingInfo(c,
e.ngBind); c=c[0]; b.$watch(e.ngBind, function(a) {
c.textContent=fc(a)
});};}};}], Oe=['$interpolate', "$compile", function(a, b) {
return {compile: function(d) {
b.$$addBindingClass(d); return function(c, d, f) {
c=a(d.attr(f.$attr.ngBindTemplate)); b.$$addBindingInfo(d, c.expressions); d=d[0]; f.$observe('ngBindTemplate', function(a) {
d.textContent=z(a)?'':a;});}
}}
}], Ne=['$sce', "$parse", "$compile", function(a, b, d) {
return {restrict: "A", compile: function(c, e) {
var f=b(e.ngBindHtml), g=b(e.ngBindHtml, function(b) {
return a.valueOf(b);});
d.$$addBindingClass(c); return function(b, c, e) {
d.$$addBindingInfo(c, e.ngBindHtml); b.$watch(g, function() {
var d=f(b); c.html(a.getTrustedHtml(d)||'')
})
}
}};}], lf=$({restrict: "A", require: "ngModel", link: function(a, b, d, c) {
c.$viewChangeListeners.push(function() {
a.$eval(d.ngChange);});}}), Pe=Jc('', !0), Re=Jc('Odd', 0), Qe=Jc('Even', 1), Se=Ua({compile: function(a, b) {
b.$set('ngCloak', void 0); a.removeClass('ng-cloak')
}}), Te=[function() {
return {restrict: "A", scope: !0, controller: "@", priority: 500}
}], cd={}, ih={blur: !0, focus: !0};
q('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' '), function(a) {
var b=Ea('ng-'+a); cd[b]=['$parse', "$rootScope", function(d, c) {
return {restrict: "A", compile: function(e, f) {
var g=d(f[b]); return function(b, d) {
d.on(a, function(d) {
var e=function() {
g(b, {$event: d});}; ih[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)
});}
}};}];}); var We=['$animate', "$compile", function(a, b) {
return {multiElement: !0, transclude: "element", priority: 600,
terminal: !0, restrict: "A", $$tlb: !0, link: function(d, c, e, f, g) {
var k, h, l; d.$watch(e.ngIf, function(d) {
d?h||g(function(d, f) {
h=f; d[d.length++]=b.$$createComment('end ngIf', e.ngIf); k={clone: d}; a.enter(d, c.parent(), c)
}):(l&&(l.remove(), l=null), h&&(h.$destroy(), h=null), k&&(l=vb(k.clone), a.leave(l).done(function(a) {
!1!==a&&(l=null);}), k=null));});}}
}], Xe=['$templateRequest', "$anchorScroll", "$animate", function(a, b, d) {
return {restrict: "ECA", priority: 400, terminal: !0, transclude: "element", controller: ea.noop, compile: function(c,
e) {
var f=e.ngInclude||e.src, g=e.onload||'', k=e.autoscroll; return function(c, e, m, p, n) {
var q=0, r, w, s, K=function() {
w&&(w.remove(), w=null); r&&(r.$destroy(), r=null); s&&(d.leave(s).done(function(a) {
!1!==a&&(w=null);}), w=s, s=null);}; c.$watch(f, function(f) {
var m=function(a) {
!1===a||!t(k)||k&&!c.$eval(k)||b()
}, x=++q; f?(a(f, !0).then(function(a) {
if (!c.$$destroyed&&x===q) {
var b=c.$new(); p.template=a; a=n(b, function(a) {
K(); d.enter(a, null, e).done(m)
}); r=b; s=a; r.$emit('$includeContentLoaded', f); c.$eval(g)
}
}, function() {
c.$$destroyed||
x!==q||(K(), c.$emit('$includeContentError', f));}), c.$emit('$includeContentRequested', f)):(K(), p.template=null)
});};}};}], of=['$compile', function(a) {
return {restrict: "ECA", priority: -400, require: "ngInclude", link: function(b, d, c, e) {
ja.call(d[0]).match(/SVG/)?(d.empty(), a(ed(e.template, u.document).childNodes)(b, function(a) {
d.append(a)
}, {futureParentElement: d})):(d.html(e.template), a(d.contents())(b));}};}], Ye=Ua({priority: 450, compile: function() {
return {pre: function(a, b, d) {
a.$eval(d.ngInit)
}}
}}), kf=function() {
return {restrict: "A",
priority: 100, require: "ngModel", link: function(a, b, d, c) {
var e=d.ngList||', ', f='false'!==d.ngTrim, g=f?R(e):e; c.$parsers.push(function(a) {
if (!z(a)) {
var b=[]; a&&q(a.split(g), function(a) {
a&&b.push(f?R(a):a);}); return b;}
}); c.$formatters.push(function(a) {
if (I(a)) return a.join(e);}); c.$isEmpty=function(a) {
return !a||!a.length
}
}}
}, pb='ng-valid', Zd='ng-invalid', Ya='ng-pristine', Ub='ng-dirty', rb=M('ngModel'); Rb.$inject='$scope $exceptionHandler $attrs $element $parse $animate $timeout $q $interpolate'.split(' ');
Rb.prototype={$$initGetterSetters: function() {
if (this.$options.getOption('getterSetter')) {
var a=this.$$parse(this.$$attr.ngModel+'()'), b=this.$$parse(this.$$attr.ngModel+'($$$p)'); this.$$ngModelGet=function(b) {
var c=this.$$parsedNgModel(b); C(c)&&(c=a(b)); return c
}; this.$$ngModelSet=function(a, c) {
C(this.$$parsedNgModel(a))?b(a, {$$$p: c}):this.$$parsedNgModelAssign(a, c)
}
} else if (!this.$$parsedNgModel.assign) throw rb('nonassign', this.$$attr.ngModel, za(this.$$element));
}, $render: G, $isEmpty: function(a) {
return z(a)||
""===a||null===a||a!==a
}, $$updateEmptyClasses: function(a) {
this.$isEmpty(a)?(this.$$animate.removeClass(this.$$element, "ng-not-empty"), this.$$animate.addClass(this.$$element, "ng-empty")):(this.$$animate.removeClass(this.$$element, "ng-empty"), this.$$animate.addClass(this.$$element, "ng-not-empty"));}, $setPristine: function() {
this.$dirty=!1; this.$pristine=!0; this.$$animate.removeClass(this.$$element, Ub); this.$$animate.addClass(this.$$element, Ya)
}, $setDirty: function() {
this.$dirty=!0; this.$pristine=!1; this.$$animate.removeClass(this.$$element,
Ya); this.$$animate.addClass(this.$$element, Ub); this.$$parentForm.$setDirty();}, $setUntouched: function() {
this.$touched=!1; this.$untouched=!0; this.$$animate.setClass(this.$$element, "ng-untouched", "ng-touched");}, $setTouched: function() {
this.$touched=!0; this.$untouched=!1; this.$$animate.setClass(this.$$element, "ng-touched", "ng-untouched");}, $rollbackViewValue: function() {
this.$$timeout.cancel(this.$$pendingDebounce); this.$viewValue=this.$$lastCommittedViewValue; this.$render()
}, $validate: function() {
if (!fa(this.$modelValue)) {
var a=
this.$$lastCommittedViewValue, b=this.$$rawModelValue, d=this.$valid, c=this.$modelValue, e=this.$options.getOption('allowInvalid'), f=this; this.$$runValidators(b, a, function(a) {
e||d===a||(f.$modelValue=a?b:void 0, f.$modelValue!==c&&f.$$writeModelToScope())
})
}
}, $$runValidators: function(a, b, d) {
function c() {
var c=!0; q(h.$validators, function(d, e) {
var g=Boolean(d(a, b)); c=c&&g; f(e, g);}); return c?!0:(q(h.$asyncValidators, function(a, b) {
f(b, null)
}), !1)
} function e() {
var c=[], d=!0; q(h.$asyncValidators, function(e,
g) {
var h=e(a, b); if (!h||!C(h.then)) throw rb('nopromise', h); f(g, void 0); c.push(h.then(function() {
f(g, !0);}, function() {
d=!1; f(g, !1)
}));}); c.length?h.$$q.all(c).then(function() {
g(d);}, G):g(!0);} function f(a, b) {
k===h.$$currentValidationRunId&&h.$setValidity(a, b)
} function g(a) {
k===h.$$currentValidationRunId&&d(a);} this.$$currentValidationRunId++; var k=this.$$currentValidationRunId, h=this; (function() {
var a=h.$$parserName||'parse'; if (z(h.$$parserValid))f(a, null); else {return h.$$parserValid||(q(h.$validators,function(a,
b){f(b,null)}),q(h.$asyncValidators,function(a,b){f(b,null)})),f(a,h.$$parserValid),h.$$parserValid;}return !0;})()?c()?e():g(!1):g(!1)
}, $commitViewValue: function() {
var a=this.$viewValue; this.$$timeout.cancel(this.$$pendingDebounce); if (this.$$lastCommittedViewValue!==a||''===a&&this.$$hasNativeValidators) this.$$updateEmptyClasses(a), this.$$lastCommittedViewValue=a, this.$pristine&&this.$setDirty(), this.$$parseAndValidate()
}, $$parseAndValidate: function() {
var a=this.$$lastCommittedViewValue, b=this; if (this.$$parserValid=
z(a)?void 0:!0) for (let d=0; d<this.$parsers.length; d++) if (a=this.$parsers[d](a), z(a)) {
this.$$parserValid=!1; break;}fa(this.$modelValue)&&(this.$modelValue=this.$$ngModelGet(this.$$scope)); var c=this.$modelValue, e=this.$options.getOption('allowInvalid'); this.$$rawModelValue=a; e&&(this.$modelValue=a, b.$modelValue!==c&&b.$$writeModelToScope()); this.$$runValidators(a, this.$$lastCommittedViewValue, function(d) {
e||(b.$modelValue=d?a:void 0, b.$modelValue!==c&&b.$$writeModelToScope())
});}, $$writeModelToScope: function() {
this.$$ngModelSet(this.$$scope,
this.$modelValue); q(this.$viewChangeListeners, function(a) {
try {
a();} catch (b) {
this.$$exceptionHandler(b)
}
}, this);}, $setViewValue: function(a, b) {
this.$viewValue=a; this.$options.getOption('updateOnDefault')&&this.$$debounceViewValueCommit(b);}, $$debounceViewValueCommit: function(a) {
var b=this.$options.getOption('debounce'); U(b[a])?b=b[a]:U(b['default'])&&(b=b['default']); this.$$timeout.cancel(this.$$pendingDebounce); var d=this; 0<b?this.$$pendingDebounce=this.$$timeout(function() {
d.$commitViewValue();}, b):this.$$scope.$root.$$phase?
this.$commitViewValue():this.$$scope.$apply(function() {
d.$commitViewValue();})
}, $overrideModelOptions: function(a) {
this.$options=this.$options.createChild(a)
}}; $d({clazz: Rb, set: function(a, b) {
a[b]=!0;}, unset: function(a, b) {
delete a[b];}}); var jf=['$rootScope', function(a) {
return {restrict: "A", require: ['ngModel', "^?form", "^?ngModelOptions"], controller: Rb, priority: 1, compile: function(b) {
b.addClass(Ya).addClass('ng-untouched').addClass(pb); return {pre: function(a, b, e, f) {
var g=f[0]; b=f[1]||g.$$parentForm; if (f=f[2]){g.$options=
f.$options;}g.$$initGetterSetters(); b.$addControl(g); e.$observe('name', function(a) {
g.$name!==a&&g.$$parentForm.$$renameControl(g, a)
}); a.$on('$destroy', function() {
g.$$parentForm.$removeControl(g);});}, post: function(b, c, e, f) {
function g() {
k.$setTouched()
} var k=f[0]; if (k.$options.getOption('updateOn'))c.on(k.$options.getOption('updateOn'), function(a) {
k.$$debounceViewValueCommit(a&&a.type);}); c.on('blur', function() {
k.$touched||(a.$$phase?b.$evalAsync(g):b.$apply(g))
});}};}}
}], Sb, jh=/(\s+|^)default(\s+|$)/; Kc.prototype=
{getOption: function(a) {
return this.$$options[a];}, createChild: function(a) {
var b=!1; a=Q({}, a); q(a, function(d, c) {
"$inherit"===d?'*'===c?b=!0:(a[c]=this.$$options[c], "updateOn"===c&&(a.updateOnDefault=this.$$options.updateOnDefault)):'updateOn'===c&&(a.updateOnDefault=!1, a[c]=R(d.replace(jh, function() {
a.updateOnDefault=!0; return " "
})))
}, this); b&&(delete a['*'], fe(a, this.$$options)); fe(a, Sb.$$options); return new Kc(a)
}}; Sb=new Kc({updateOn: "", updateOnDefault: !0, debounce: 0, getterSetter: !1, allowInvalid: !1,
timezone: null}); var nf=function() {
function a(a, d) {
this.$$attrs=a; this.$$scope=d
}a.$inject=['$attrs', "$scope"]; a.prototype={$onInit: function() {
var a=this.parentCtrl?this.parentCtrl.$options:Sb, d=this.$$scope.$eval(this.$$attrs.ngModelOptions); this.$options=a.createChild(d)
}}; return {restrict: "A", priority: 10, require: {parentCtrl: "?^^ngModelOptions"}, bindToController: !0, controller: a};}, Ze=Ua({terminal: !0, priority: 1E3}), kh=M('ngOptions'), lh=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
gf=['$compile', "$document", "$parse", function(a, b, d) {
function c(a, b, c) {
function e(a, b, c, d, f) {
this.selectValue=a; this.viewValue=b; this.label=c; this.group=d; this.disabled=f;} function f(a) {
var b; if (!q&&ra(a))b=a; else {
b=[]; for (let c in a)a.hasOwnProperty(c)&&'$'!==c.charAt(0)&&b.push(c);} return b;} var p=a.match(lh); if (!p) throw kh('iexp', a, za(b)); var n=p[5]||p[7], q=p[6]; a=/ as /.test(p[0])&&p[1]; var r=p[9]; b=d(p[2]?p[1]:n); var w=a&&d(a)||b, s=r&&d(r), t=r?function(a, b) {
return s(c, b);}:function(a) {
return Pa(a)
},
z=function(a, b) {
return t(a, A(a, b));}, u=d(p[2]||p[1]), x=d(p[3]||''), F=d(p[4]||''), H=d(p[8]), y={}, A=q?function(a, b) {
y[q]=b; y[n]=a; return y
}:function(a) {
y[n]=a; return y;}; return {trackBy: r, getTrackByValue: z, getWatchables: d(H, function(a) {
var b=[]; a=a||[]; for (let d=f(a), e=d.length, g=0; g<e; g++) {
var k=a===d?g:d[g], l=a[k], k=A(l, k), l=t(l, k); b.push(l); if (p[2]||p[1])l=u(c, k), b.push(l); p[4]&&(k=F(c, k), b.push(k))
} return b;}), getOptions: function() {
for (var a=[], b={}, d=H(c)||[], g=f(d), k=g.length, n=0; n<k; n++) {
var p=d===
g?n:g[n], q=A(d[p], p), s=w(c, q), p=t(s, q), D=u(c, q), y=x(c, q), q=F(c, q), s=new e(p, s, D, y, q); a.push(s); b[p]=s
} return {items: a, selectValueMap: b, getOptionFromViewValue: function(a) {
return b[z(a)];}, getViewValueFromOption: function(a) {
return r?ya(a.viewValue):a.viewValue;}};}}
} var e=u.document.createElement('option'), f=u.document.createElement('optgroup'); return {restrict: "A", terminal: !0, require: ['select', "ngModel"], link: {pre: function(a, b, c, d) {
d[0].registerOption=G;}, post: function(d, k, h, l) {
function m(a) {
var b=(a=u.getOptionFromViewValue(a))&&
a.element; b&&!b.selected&&(b.selected=!0); return a;} function p(a, b) {
a.element=b; b.disabled=a.disabled; a.label!==b.label&&(b.label=a.label, b.textContent=a.label); b.value=a.selectValue;} var n=l[0], r=l[1], z=h.multiple; l=0; for (let w=k.children(), s=w.length; l<s; l++) if (''===w[l].value) {
n.hasEmptyOption=!0; n.emptyOption=w.eq(l); break;}k.empty(); l=!!n.emptyOption; E(e.cloneNode(!1)).val('?'); var u, y=c(h.ngOptions, k, d), C=b[0].createDocumentFragment(); n.generateUnknownOptionValue=function(a) {
return "?";}; z?(n.writeValue=
function(a) {
if (u) {
var b=a&&a.map(m)||[]; u.items.forEach(function(a) {
a.element.selected&&-1===Array.prototype.indexOf.call(b, a)&&(a.element.selected=!1);})
}
}, n.readValue=function() {
var a=k.val()||[], b=[]; q(a, function(a) {
(a=u.selectValueMap[a])&&!a.disabled&&b.push(u.getViewValueFromOption(a));}); return b;}, y.trackBy&&d.$watchCollection(function() {
if (I(r.$viewValue)) return r.$viewValue.map(function(a) {
return y.getTrackByValue(a);})
}, function() {
r.$render();})):(n.writeValue=function(a) {
if (u) {
var b=k[0].options[k[0].selectedIndex],
c=u.getOptionFromViewValue(a); b&&b.removeAttribute('selected'); c?(k[0].value!==c.selectValue&&(n.removeUnknownOption(), k[0].value=c.selectValue, c.element.selected=!0), c.element.setAttribute('selected', "selected")):n.selectUnknownOrEmptyOption(a);}
}, n.readValue=function() {
var a=u.selectValueMap[k.val()]; return a&&!a.disabled?(n.unselectEmptyOption(), n.removeUnknownOption(), u.getViewValueFromOption(a)):null
}, y.trackBy&&d.$watch(function() {
return y.getTrackByValue(r.$viewValue)
}, function() {
r.$render()
}));
l&&(a(n.emptyOption)(d), k.prepend(n.emptyOption), 8===n.emptyOption[0].nodeType?(n.hasEmptyOption=!1, n.registerOption=function(a, b) {
""===b.val()&&(n.hasEmptyOption=!0, n.emptyOption=b, n.emptyOption.removeClass('ng-scope'), r.$render(), b.on('$destroy', function() {
var a=n.$isEmptyOptionSelected(); n.hasEmptyOption=!1; n.emptyOption=void 0; a&&r.$render();}))
}):n.emptyOption.removeClass('ng-scope')); d.$watchCollection(y.getWatchables, function() {
var a=u&&n.readValue(); if (u) for (var b=u.items.length-1; 0<=b; b--) {
var c=
u.items[b]; t(c.group)?Gb(c.element.parentNode):Gb(c.element)
}u=y.getOptions(); var d={}; u.items.forEach(function(a) {
var b; if (t(a.group)) {
b=d[a.group]; b||(b=f.cloneNode(!1), C.appendChild(b), b.label=null===a.group?'null':a.group, d[a.group]=b); var c=e.cloneNode(!1); b.appendChild(c); p(a, c);} else b=e.cloneNode(!1), C.appendChild(b), p(a, b);}); k[0].appendChild(C); r.$render(); r.$isEmpty(a)||(b=n.readValue(), (y.trackBy||z?ta(a, b):a===b)||(r.$setViewValue(b), r.$render()));});}}}
}], $e=['$locale', "$interpolate", "$log",
function(a, b, d) {
var c=/{}/g, e=/^when(Minus)?(.+)$/; return {link: function(f, g, k) {
function h(a) {
g.text(a||'')
} var l=k.count, m=k.$attr.when&&g.attr(k.$attr.when), p=k.offset||0, n=f.$eval(m)||{}, r={}, t=b.startSymbol(), w=b.endSymbol(), s=t+l+'-'+p+w, u=ea.noop, y; q(k, function(a, b) {
var c=e.exec(b); c&&(c=(c[1]?'-':'')+O(c[2]), n[c]=g.attr(k.$attr[b]));}); q(n, function(a, d) {
r[d]=b(a.replace(c, s))
}); f.$watch(l, function(b) {
var c=parseFloat(b), e=fa(c); e||c in n||(c=a.pluralCat(c-p)); c===y||e&&fa(y)||(u(), e=r[c], z(e)?
(null!=b&&d.debug('ngPluralize: no rule defined for \''+c+'\' in '+m), u=G, h()):u=f.$watch(e, h), y=c);})
}}
}], af=['$parse', "$animate", "$compile", function(a, b, d) {
var c=M('ngRepeat'), e=function(a, b, c, d, e, m, p) {
a[c]=d; e&&(a[e]=m); a.$index=b; a.$first=0===b; a.$last=b===p-1; a.$middle=!(a.$first||a.$last); a.$odd=!(a.$even=0===(b&1))
}; return {restrict: "A", multiElement: !0, transclude: "element", priority: 1E3, terminal: !0, $$tlb: !0, compile: function(f, g) {
var k=g.ngRepeat, h=d.$$createComment('end ngRepeat', k), l=k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if (!l) throw c('iexp', k); var m=l[1], p=l[2], n=l[3], r=l[4], l=m.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/); if (!l) throw c('iidexp', m); var t=l[3]||l[1], w=l[2]; if (n&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(n)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(n))) throw c('badident', n); var s, u, y, z, x={$id: Pa}; r?s=a(r):(y=function(a, b) {
return Pa(b);}, z=function(a) {
return a
}); return function(a, d, f, g, l) {
s&&(u=function(b, c, d) {
w&&(x[w]=b); x[t]=c; x.$index=
d; return s(a, x)
}); var m=S(); a.$watchCollection(p, function(f) {
var g, p, r=d[0], s, x=S(), D, C, E, A, G, B, I; n&&(a[n]=f); if (ra(f))G=f, p=u||y; else for (I in p=u||z, G=[], f)sa.call(f, I)&&'$'!==I.charAt(0)&&G.push(I); D=G.length; I=Array(D); for (g=0; g<D; g++) if (C=f===G?g:G[g], E=f[C], A=p(C, E, g), m[A])B=m[A], delete m[A], x[A]=B, I[g]=B; else {
if (x[A]) throw q(I, function(a) {
a&&a.scope&&(m[a.id]=a);}), c('dupes', k, A, E); I[g]={id: A, scope: void 0, clone: void 0}; x[A]=!0;} for (s in m) {
B=m[s]; A=vb(B.clone); b.leave(A); if (A[0].parentNode) for (g=
0, p=A.length; g<p; g++)A[g].$$NG_REMOVED=!0; B.scope.$destroy();} for (g=0; g<D; g++) if (C=f===G?g:G[g], E=f[C], B=I[g], B.scope) {
s=r; do s=s.nextSibling; while (s&&s.$$NG_REMOVED);B.clone[0]!==s&&b.move(vb(B.clone), null, r); r=B.clone[B.clone.length-1]; e(B.scope, g, t, E, w, C, D);} else l(function(a, c) {
B.scope=c; var d=h.cloneNode(!1); a[a.length++]=d; b.enter(a, null, r); r=d; B.clone=a; x[B.id]=B; e(B.scope, g, t, E, w, C, D)
}); m=x
})
};}};}], bf=['$animate', function(a) {
return {restrict: "A", multiElement: !0, link: function(b, d, c) {
b.$watch(c.ngShow,
function(b) {
a[b?'removeClass':'addClass'](d, "ng-hide", {tempClasses: "ng-hide-animate"})
})
}};}], Ve=['$animate', function(a) {
return {restrict: "A", multiElement: !0, link: function(b, d, c) {
b.$watch(c.ngHide, function(b) {
a[b?'addClass':'removeClass'](d, "ng-hide", {tempClasses: "ng-hide-animate"});});}};}], cf=Ua(function(a, b, d) {
a.$watchCollection(d.ngStyle, function(a, d) {
d&&a!==d&&q(d, function(a, c) {
b.css(c, "")
}); a&&b.css(a);})
}), df=['$animate', "$compile", function(a, b) {
return {require: "ngSwitch", controller: ['$scope', function() {
this.cases=
{}
}], link: function(d, c, e, f) {
var g=[], k=[], h=[], l=[], m=function(a, b) {
return function(c) {
!1!==c&&a.splice(b, 1);}
}; d.$watch(e.ngSwitch||e.on, function(c) {
for (var d, e; h.length;)a.cancel(h.pop()); d=0; for (e=l.length; d<e; ++d) {
var r=vb(k[d].clone); l[d].$destroy(); (h[d]=a.leave(r)).done(m(h, d));}k.length=0; l.length=0; (g=f.cases['!'+c]||f.cases['?'])&&q(g, function(c) {
c.transclude(function(d, e) {
l.push(e); var f=c.element; d[d.length++]=b.$$createComment('end ngSwitchWhen'); k.push({clone: d}); a.enter(d, f.parent(),
f)
})
});});}}
}], ef=Ua({transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function(a, b, d, c, e) {
a=d.ngSwitchWhen.split(d.ngSwitchWhenSeparator).sort().filter(function(a, b, c) {
return c[b-1]!==a;}); q(a, function(a) {
c.cases['!'+a]=c.cases['!'+a]||[]; c.cases['!'+a].push({transclude: e, element: b});})
}}), ff=Ua({transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function(a, b, d, c, e) {
c.cases['?']=c.cases['?']||[]; c.cases['?'].push({transclude: e, element: b});}}), mh=M('ngTransclude'),
hf=['$compile', function(a) {
return {restrict: "EAC", terminal: !0, compile: function(b) {
var d=a(b.contents()); b.empty(); return function(a, b, f, g, k) {
function h() {
d(a, function(a) {
b.append(a);});} if (!k) throw mh('orphan', za(b)); f.ngTransclude===f.$attr.ngTransclude&&(f.ngTransclude=''); f=f.ngTransclude||f.ngTranscludeSlot; k(function(a, c) {
var d; if (d=a.length)a: {
d=0; for (let f=a.length; d<f; d++) {
var g=a[d]; if (g.nodeType!==Ma||g.nodeValue.trim()) {
d=!0; break a
}
}d=void 0;}d?b.append(a):(h(), c.$destroy())
}, null, f); f&&!k.isSlotFilled(f)&&
h()
}
}}
}], Je=['$templateCache', function(a) {
return {restrict: "E", terminal: !0, compile: function(b, d) {
"text/ng-template"===d.type&&a.put(d.id, b[0].text)
}}
}], nh={$setViewValue: G, $render: G}, oh=['$element', "$scope", function(a, b) {
function d() {
g||(g=!0, b.$$postDigest(function() {
g=!1; e.ngModelCtrl.$render();}));} function c(a) {
k||(k=!0, b.$$postDigest(function() {
b.$$destroyed||(k=!1, e.ngModelCtrl.$setViewValue(e.readValue()), a&&e.ngModelCtrl.$render());}))
} var e=this, f=new Ib; e.selectValueMap={}; e.ngModelCtrl=nh;
e.multiple=!1; e.unknownOption=E(u.document.createElement('option')); e.hasEmptyOption=!1; e.emptyOption=void 0; e.renderUnknownOption=function(b) {
b=e.generateUnknownOptionValue(b); e.unknownOption.val(b); a.prepend(e.unknownOption); Ga(e.unknownOption, !0); a.val(b);}; e.updateUnknownOption=function(b) {
b=e.generateUnknownOptionValue(b); e.unknownOption.val(b); Ga(e.unknownOption, !0); a.val(b);}; e.generateUnknownOptionValue=function(a) {
return "? "+Pa(a)+' ?'}; e.removeUnknownOption=function() {
e.unknownOption.parent()&&
e.unknownOption.remove()
}; e.selectEmptyOption=function() {
e.emptyOption&&(a.val(''), Ga(e.emptyOption, !0));}; e.unselectEmptyOption=function() {
e.hasEmptyOption&&Ga(e.emptyOption, !1);}; b.$on('$destroy', function() {
e.renderUnknownOption=G
}); e.readValue=function() {
var b=a.val(), b=b in e.selectValueMap?e.selectValueMap[b]:b; return e.hasOption(b)?b:null
}; e.writeValue=function(b) {
var c=a[0].options[a[0].selectedIndex]; c&&Ga(E(c), !1); e.hasOption(b)?(e.removeUnknownOption(), c=Pa(b), a.val(c in e.selectValueMap?
c:b), Ga(E(a[0].options[a[0].selectedIndex]), !0)):e.selectUnknownOrEmptyOption(b)
}; e.addOption=function(a, b) {
if (8!==b[0].nodeType) {
Na(a, '"option value"'); ""===a&&(e.hasEmptyOption=!0, e.emptyOption=b); var c=f.get(a)||0; f.set(a, c+1); d();}
}; e.removeOption=function(a) {
var b=f.get(a); b&&(1===b?(f.delete(a), ""===a&&(e.hasEmptyOption=!1, e.emptyOption=void 0)):f.set(a, b-1));}; e.hasOption=function(a) {
return !!f.get(a)
}; e.$hasEmptyOption=function() {
return e.hasEmptyOption;}; e.$isUnknownOptionSelected=function() {
return a[0].options[0]===
e.unknownOption[0];}; e.$isEmptyOptionSelected=function() {
return e.hasEmptyOption&&a[0].options[a[0].selectedIndex]===e.emptyOption[0];}; e.selectUnknownOrEmptyOption=function(a) {
null==a&&e.emptyOption?(e.removeUnknownOption(), e.selectEmptyOption()):e.unknownOption.parent().length?e.updateUnknownOption(a):e.renderUnknownOption(a)
}; var g=!1, k=!1; e.registerOption=function(a, b, f, g, k) {
if (f.$attr.ngValue) {
var q, r=NaN; f.$observe('value', function(a) {
var d, f=b.prop('selected'); t(r)&&(e.removeOption(q), delete e.selectValueMap[r],
d=!0); r=Pa(a); q=a; e.selectValueMap[r]=a; e.addOption(a, b); b.attr('value', r); d&&f&&c()
});} else g?f.$observe('value', function(a) {
e.readValue(); var d, f=b.prop('selected'); t(q)&&(e.removeOption(q), d=!0); q=a; e.addOption(a, b); d&&f&&c()
}):k?a.$watch(k, function(a, d) {
f.$set('value', a); var g=b.prop('selected'); d!==a&&e.removeOption(d); e.addOption(a, b); d&&g&&c();}):e.addOption(f.value, b); f.$observe('disabled', function(a) {
if ('true'===a||a&&b.prop('selected'))e.multiple?c(!0):(e.ngModelCtrl.$setViewValue(null), e.ngModelCtrl.$render());});
b.on('$destroy', function() {
var a=e.readValue(), b=f.value; e.removeOption(b); d(); (e.multiple&&a&&-1!==a.indexOf(b)||a===b)&&c(!0);});};}], Ke=function() {
return {restrict: "E", require: ['select', "?ngModel"], controller: oh, priority: 1, link: {pre: function(a, b, d, c) {
var e=c[0], f=c[1]; if (f) {
if (e.ngModelCtrl=f, b.on('change', function() {
e.removeUnknownOption(); a.$apply(function() {
f.$setViewValue(e.readValue());});}), d.multiple) {
e.multiple=!0; e.readValue=function() {
var a=[]; q(b.find('option'), function(b) {
b.selected&&!b.disabled&&
(b=b.value, a.push(b in e.selectValueMap?e.selectValueMap[b]:b));}); return a;}; e.writeValue=function(a) {
q(b.find('option'), function(b) {
var c=!!a&&(-1!==Array.prototype.indexOf.call(a, b.value)||-1!==Array.prototype.indexOf.call(a, e.selectValueMap[b.value])); c!==b.selected&&Ga(E(b), c)
})
}; var g, k=NaN; a.$watch(function() {
k!==f.$viewValue||ta(g, f.$viewValue)||(g=pa(f.$viewValue), f.$render()); k=f.$viewValue
}); f.$isEmpty=function(a) {
return !a||0===a.length;};}
} else e.registerOption=G
}, post: function(a, b, d, c) {
var e=
c[1]; if (e) {
var f=c[0]; e.$render=function() {
f.writeValue(e.$viewValue)
}
}
}}};}, Le=['$interpolate', function(a) {
return {restrict: "E", priority: 100, compile: function(b, d) {
var c, e; t(d.ngValue)||(t(d.value)?c=a(d.value, !0):(e=a(b.text(), !0))||d.$set('value', b.text())); return function(a, b, d) {
var h=b.parent(); (h=h.data('$selectController')||h.parent().data('$selectController'))&&h.registerOption(a, b, d, c, e)
};}}
}], $c=function() {
return {restrict: "A", require: "?ngModel", link: function(a, b, d, c) {
c&&(d.required=!0, c.$validators.required=
function(a, b) {
return !d.required||!c.$isEmpty(b);}, d.$observe('required', function() {
c.$validate();}));}};}, Zc=function() {
return {restrict: "A", require: "?ngModel", link: function(a, b, d, c) {
if (c) {
var e, f=d.ngPattern||d.pattern; d.$observe('pattern', function(a) {
y(a)&&0<a.length&&(a=new RegExp('^'+a+'$')); if (a&&!a.test) throw M('ngPattern')('noregexp', f, a, za(b)); e=a||void 0; c.$validate()
}); c.$validators.pattern=function(a, b) {
return c.$isEmpty(b)||z(e)||e.test(b)
}
}
}};}, bd=function() {
return {restrict: "A", require: "?ngModel",
link: function(a, b, d, c) {
if (c) {
var e=-1; d.$observe('maxlength', function(a) {
a=V(a); e=fa(a)?-1:a; c.$validate();}); c.$validators.maxlength=function(a, b) {
return 0>e||c.$isEmpty(b)||b.length<=e;}
}
}}
}, ad=function() {
return {restrict: "A", require: "?ngModel", link: function(a, b, d, c) {
if (c) {
var e=0; d.$observe('minlength', function(a) {
e=V(a)||0; c.$validate();}); c.$validators.minlength=function(a, b) {
return c.$isEmpty(b)||b.length>=e
};}
}};}; u.angular.bootstrap?u.console&&console.log('WARNING: Tried to load AngularJS more than once.'):
(Ae(), Ee(ea), ea.module('ngLocale', [], ['$provide', function(a) {
function b(a) {
a+=''; var b=a.indexOf('.'); return -1==b?0:a.length-b-1;}a.value('$locale', {DATETIME_FORMATS: {"AMPMS": ['AM', "PM"], DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(' '), ERANAMES: ['Before Christ', "Anno Domini"], ERAS: ['BC', "AD"], FIRSTDAYOFWEEK: 6, MONTH: "January February March April May June July August September October November December".split(' '), SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(' '), SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(' '),
STANDALONEMONTH: "January February March April May June July August September October November December".split(' '), WEEKENDRANGE: [5, 6], fullDate: "EEEE, MMMM d, y", longDate: "MMMM d, y", medium: "MMM d, y h:mm:ss a", mediumDate: "MMM d, y", mediumTime: "h:mm:ss a", "short": "M/d/yy h:mm a", shortDate: "M/d/yy", shortTime: "h:mm a"}, NUMBER_FORMATS: {CURRENCY_SYM: "$", DECIMAL_SEP: ".", GROUP_SEP: ",", PATTERNS: [{gSize: 3, lgSize: 3, maxFrac: 3, minFrac: 0, minInt: 1, negPre: "-", negSuf: "", posPre: "", posSuf: ""}, {gSize: 3, lgSize: 3, maxFrac: 2,
minFrac: 2, minInt: 1, negPre: "-\u00a4", negSuf: "", posPre: "\u00a4", posSuf: ""}]}, id: "en-us", localeID: "en_US", pluralCat: function(a, c) {
var e=a|0, f=c; void 0===f&&(f=Math.min(b(a), 3)); Math.pow(10, f); return 1==e&&0==f?'one':'other'}});}]), E(function() {
ve(u.document, Uc);}));})(window); !window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
// # sourceMappingURL=angular.min.js.map
