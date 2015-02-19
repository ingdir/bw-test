/**
* JSPath
*
* Copyright (c) 2012 Filatov Dmitry (dfilatov@yandex-team.ru)
* With parts by Marat Dulin (mdevils@gmail.com)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @version 0.3.0
*/

(function(){function r(e){return Function("data,subst",n(t(e)))}var e={PATH:1,SELECTOR:2,OBJ_PRED:3,POS_PRED:4,LOGICAL_EXPR:5,COMPARISON_EXPR:6,MATH_EXPR:7,CONCAT_EXPR:8,UNARY_EXPR:9,POS_EXPR:10,LITERAL:11},t=function(){function u(e){r=e.split(""),i=0,s=null,o=r.length;var n=a(),u=P();return u.type!==t.EOP&&z(u),n}function a(){var t=f(),n;while(k("|"))P(),(n||(n=[t])).push(f());return n?{type:e.CONCAT_EXPR,args:n}:t}function f(){return k("(")?l():h()}function l(){M("(");var t=a();M(")");var n=[],r;while(r=c())n.push(r);return n.length?t.type===e.PATH?(t.parts=t.parts.concat(n),t):(n.unshift(t),{type:e.PATH,parts:n}):t}function c(){if(k("["))return v();if(k("{"))return m();if(k("("))return l()}function h(){L()||z(P());var t=!1,n;k("^")?(P(),t=!0):O()&&(n=P().val.substr(1));var r=[],i;while(i=p())r.push(i);return{type:e.PATH,fromRoot:t,subst:n,parts:r}}function p(){return A()?d():c()}function d(){var n=P().val,r=_(),i;if(k("*")||r.type===t.ID||r.type===t.STR)i=P().val;return{type:e.SELECTOR,selector:n,prop:i}}function v(){M("[");var t=x();return M("]"),{type:e.POS_PRED,arg:t}}function m(){M("{");var t=g();return M("}"),{type:e.OBJ_PRED,arg:t}}function g(){var t=y(),n;while(k("||"))P(),(n||(n=[t])).push(y());return n?{type:e.LOGICAL_EXPR,op:"||",args:n}:t}function y(){var t=b(),n;while(k("&&"))P(),(n||(n=[t])).push(b());return n?{type:e.LOGICAL_EXPR,op:"&&",args:n}:t}function b(){var t=w();while(k("==")||k("!=")||k("===")||k("!==")||k("^=")||k("^==")||k("$==")||k("$=")||k("*==")||k("*="))t={type:e.COMPARISON_EXPR,op:P().val,args:[t,b()]};return t}function w(){var t=E();while(k("<")||k(">")||k("<=")||k(">="))t={type:e.COMPARISON_EXPR,op:P().val,args:[t,w()]};return t}function E(){var t=S();while(k("+")||k("-"))t={type:e.MATH_EXPR,op:P().val,args:[t,E()]};return t}function S(){var t=T();while(k("*")||k("/")||k("%"))t={type:e.MATH_EXPR,op:P().val,args:[t,S()]};return t}function x(){if(k(":"))return P(),{type:e.POS_EXPR,toIdx:T()};var t=T();return k(":")?(P(),k("]")?{type:e.POS_EXPR,fromIdx:t}:{type:e.POS_EXPR,fromIdx:t,toIdx:T()}):{type:e.POS_EXPR,idx:t}}function T(){return k("!")||k("-")?{type:e.UNARY_EXPR,op:P().val,arg:T()}:N()}function N(){var n=_(),r=n.type;return r===t.STR||r===t.NUM||r===t.BOOL?{type:e.LITERAL,val:P().val}:L()?h():k("(")?C():z(P())}function C(){M("(");var e=g();return M(")"),e}function k(e){var n=_();return n.type===t.PUNCT&&n.val===e}function L(){return A()||O()||k("^")}function A(){var e=_();if(e.type===t.PUNCT){var n=e.val;return n==="."||n===".."}return!1}function O(){var e=_();return e.type===t.ID&&e.val[0]==="$"}function M(e){var n=P();(n.type!==t.PUNCT||n.val!==e)&&z(n)}function _(){if(s!==null)return s;var e=i;return s=D(),i=e,s}function D(){while(B(r[i]))++i;if(i>=o)return{type:t.EOP,range:[i,i]};var e=U();if(e||(e=I())||(e=q())||(e=R()))return e;e={range:[i,i]},i>=o?e.type=t.EOP:e.val=r[i],z(e)}function P(){var e;return s?(i=s.range[1],e=s,s=null,e):D()}function H(e){return"0123456789".indexOf(e)>=0}function B(e){return e===" "}function j(e){return e==="$"||e==="_"||e>="a"&&e<="z"||e>="A"&&e<="Z"}function F(e){return j(e)||e>="0"&&e<="9"}function I(){var e=r[i];if(!j(e))return;var n=i,s=e;while(++i<o){e=r[i];if(!F(e))break;s+=e}return s==="true"||s==="false"?{type:t.BOOL,val:s==="true",range:[n,i]}:{type:t.ID,val:s,range:[n,i]}}function q(){if(r[i]!=='"')return;var e=++i,n="",s=!1,u;while(i<o){u=r[i++];if(u==="\\")u=r[i++];else if(u==='"'){s=!0;break}n+=u}if(s)return{type:t.STR,val:n,range:[e,i]}}function R(){var e=i,n=r[i],s=n===".";if(s||H(n)){var u=n;while(++i<o){n=r[i];if(n==="."){if(s)return;s=!0}else if(!H(n))break;u+=n}return{type:t.NUM,val:s?parseFloat(u):parseInt(u,10),range:[e,i]}}}function U(){var e=i,n=r[i],s=r[i+1];if(n==="."){if(H(s))return;return r[++i]==="."?{type:t.PUNCT,val:"..",range:[e,++i]}:{type:t.PUNCT,val:".",range:[e,i]}}if(s==="="){var o=r[i+2];if(o==="="){if("=!^$*".indexOf(n)>=0)return{type:t.PUNCT,val:n+s+o,range:[e,i+=3]}}else if("=!^$*><".indexOf(n)>=0)return{type:t.PUNCT,val:n+s,range:[e,i+=2]}}if(n===s&&(n==="|"||n==="&"))return{type:t.PUNCT,val:n+s,range:[e,i+=2]};if(":{}()[]^+-*/%!><|".indexOf(n)>=0)return{type:t.PUNCT,val:n,range:[e,++i]}}function z(e){e.type===t.EOP&&W(e,n.UNEXP_EOP),W(e,n.UNEXP_TOKEN,e.val)}function W(e,t){var n=Array.prototype.slice.call(arguments,2),r=t.replace(/%(\d)/g,function(e,t){return n[t]||""}),i=new Error(r);throw i.column=e.range[0],i}var t={ID:1,NUM:2,STR:3,BOOL:4,PUNCT:5,EOP:6},n={UNEXP_TOKEN:'Unexpected token "%0"',UNEXP_EOP:"Unexpected end of path"},r,i,s,o;return u}(),n=function(){function s(){if(i.length)return i.shift();var e="v"+ ++r;return n.push(e),e}function o(){var e=arguments,t=e.length;while(t--)i.push(e[t])}function u(s){t=[],n=["res"],r=0,i=[],p(s,"res","data"),t.unshift("var ",Array.isArray?"isArr = Array.isArray":'toStr = Object.prototype.toString, isArr = function(o) { return toStr.call(o) === "[object Array]"; }',",",n.join(","),";");if(s.type===e.PATH){var o=s.parts[s.parts.length-1];o&&o.type===e.POS_PRED&&"idx"in o.arg&&t.push("res = res[0];")}return t.push("return res;"),t.join("")}function a(n,r,i){var s=n.parts,o=0,u=s.length;t.push(r,"=",n.fromRoot?"data":n.subst?"subst."+n.subst:i,";","isArr("+r+") || ("+r+" = ["+r+"]);");while(o<u){var a=s[o++];switch(a.type){case e.SELECTOR:a.selector===".."?l(a,r,r):f(a,r,r);break;case e.OBJ_PRED:c(a,r,r);break;case e.POS_PRED:h(a,r,r);break;case e.CONCAT_EXPR:b(a,r,r)}}}function f(e,n,r){if(e.prop){var i=w(e.prop),u=s(),a=s(),f=s(),l=s(),c=s(),h=s(),p=s();t.push(u,"= [];",a,"= 0;",f,"=",r,".length;",p,"= [];","while(",a,"<",f,") {",l,"=",r,"[",a,"++];","if(",l,"!= null) {"),e.prop==="*"?(t.push("if(typeof ",l,'=== "object") {',"if(isArr(",l,")) {",u,"=",u,".concat(",l,");","}","else {","for(",c," in ",l,") {","if(",l,".hasOwnProperty(",c,")) {",h,"=",l,"[",c,"];"),E(u,h),t.push("}","}","}","}")):(t.push(h,"=",l,"[",i,"];"),E(u,h,p,f)),t.push("}","}",n,"=",f,"> 1 &&",p,".length?",p,".length > 1?",u,".concat.apply(",u,",",p,") :",u,".concat(",p,"[0]) :",u,";"),o(u,a,f,l,c,h,p)}}function l(e,n,r){var i=e.prop,u=s(),a=s(),f=s(),l=s(),c=s(),h=s(),p=s(),d=s();t.push(u,"=",r,".slice(),",d,"= [];","while(",u,".length) {",a,"=",u,".shift();"),i?t.push("if(typeof ",a,'=== "object" &&',a,") {"):t.push("if(typeof ",a,"!= null) {"),t.push(f,"= [];","if(isArr(",a,")) {",l,"= 0,",p,"=",a,".length;","while(",l,"<",p,") {",h,"=",a,"[",l,"++];"),i&&t.push("if(typeof ",h,'=== "object") {'),E(f,h),i&&t.push("}"),t.push("}","}","else {"),i?i!=="*"&&(t.push(h,"=",a,'["'+i+'"];'),E(d,h)):(E(d,a),t.push("if(typeof ",a,'=== "object") {')),t.push("for(",c," in ",a,") {","if(",a,".hasOwnProperty(",c,")) {",h,"=",a,"[",c,"];"),E(f,h),i==="*"&&E(d,h),t.push("}","}"),i||t.push("}"),t.push("}",f,".length &&",u,".unshift.apply(",u,",",f,");","}","}",n,"=",d,";"),o(u,a,f,l,c,h,p,d)}function c(e,n,r){var i=s(),u=s(),a=s(),f=s(),l=s();t.push(i,"= [];",u,"= 0;",a,"=",r,".length;","while(",u,"<",a,") {",l,"=",r,"[",u,"++];"),p(e.arg,f,l),t.push(x(e.arg,f),"&&",i,".push(",l,");","}",n,"=",i,";"),o(i,u,a,l,f)}function h(e,n,r){var i=e.arg,u,a;if(i.idx){var f=s();return p(i.idx,f,r),t.push(f,"< 0 && (",f,"=",r,".length +",f,");",n,"=",r,"[",f,"] == null? [] : [",r,"[",f,"]];"),o(f),!1}i.fromIdx?i.toIdx?(p(i.fromIdx,u=s(),r),p(i.toIdx,a=s(),r),t.push(n,"=",r,".slice(",u,",",a,");"),o(u,a)):(p(i.fromIdx,u=s(),r),t.push(n,"=",r,".slice(",u,");"),o(u)):(p(i.toIdx,a=s(),r),t.push(n,"=",r,".slice(0,",a,");"),o(a))}function p(n,r,i){switch(n.type){case e.PATH:a(n,r,i);break;case e.CONCAT_EXPR:b(n,r,i);break;case e.COMPARISON_EXPR:d(n,r,i);break;case e.MATH_EXPR:g(n,r,i);break;case e.LOGICAL_EXPR:m(n,r,i);break;case e.UNARY_EXPR:y(n,r,i);break;case e.LITERAL:var s=n.val;t.push(r,"=",typeof s=="string"?w(s):s,";")}}function d(n,r,i){var u=s(),a=s(),f=s(),l=s(),c=s(),h=s(),d=s(),m=s(),g=n.args[0],y=n.args[1];t.push(r,"= false;"),p(g,u,i),p(y,a,i);var b=g.type===e.PATH,w=y.type===e.LITERAL;t.push(f,"="),b?t.push("true;"):t.push("isArr(",u,");"),t.push(l,"="),w?t.push("false;"):t.push("isArr(",a,");"),t.push("if("),b||t.push(f,"&&"),t.push(u,".length === 1) {",u,"=",u,"[0];",f,"= false;","}"),w||t.push("if(",l,"&&",a,".length === 1) {",a,"=",a,"[0];",l,"= false;","}"),t.push(c,"= 0;","if(",f,") {",d,"=",u,".length;"),w||(t.push("if(",l,") {",m,"=",a,".length;","while(",c,"<",d,"&& !",r,") {",h,"= 0;","while(",h,"<",m,") {"),v(n.op,[u,"[",c,"]"].join(""),[a,"[",h,"]"].join("")),t.push(r,"= true;","break;","}","++",h,";","}","++",c,";","}","}","else {")),t.push("while(",c,"<",d,") {"),v(n.op,[u,"[",c,"]"].join(""),a),t.push(r,"= true;","break;","}","++",c,";","}"),w||t.push("}"),t.push("}"),w||(t.push("else if(",l,") {",m,"=",a,".length;","while(",c,"<",m,") {"),v(n.op,u,[a,"[",c,"]"].join("")),t.push(r,"= true;","break;","}","++",c,";","}","}")),t.push("else {",r,"=",N[n.op](u,a),";","}"),o(u,a,f,l,c,h,d,m)}function v(e,n,r){t.push("if(",N[e](n,r),") {")}function m(e,n,r){var i=[],u=e.args,a=u.length,f=0,l;t.push(n,"= false;");switch(e.op){case"&&":while(f<a)i.push(l=s()),p(u[f],l,r),t.push("if(",x(u[f++],l),") {");t.push(n,"= true;");break;case"||":while(f<a)i.push(l=s()),p(u[f],l,r),t.push("if(",x(u[f],l),") {",n,"= true;","}"),f++ +1<a&&t.push("else {");--a}while(a--)t.push("}");o.apply(null,i)}function g(e,n,r){var i=s(),u=s(),a=e.args;p(a[0],i,r),p(a[1],u,r),t.push(n,"=",N[e.op](T(a[0],i),T(a[1],u)),";"),o(i,u)}function y(e,n,r){var i=s(),u=e.arg;p(u,i,r);switch(e.op){case"!":t.push(n,"= !",x(u,i)+";");break;case"-":t.push(n,"= -",T(u,i)+";")}o(i)}function b(e,n,r){var i=[],u=e.args,a=u.length,f=0;while(f<a)i.push(s()),p(u[f],i[f++],r);t.push(n,"= (",n,"= []).concat.call(",n,",",i.join(","),");"),o.apply(null,i)}function w(e){return"'"+e.replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"'"}function E(e,n,r,i){t.push("if(",n,"!= null) {","if(isArr(",n,")) {"),r&&(t.push(i,"> 1?"),S(r,n),t.push(":")),t.push(e,"=",e,".length? ",e,".concat(",n,") : ",n,";","}","else {"),r&&t.push("if(",r,".length) {",e,"=",e,".concat.apply(",e,",",r,");",r,"= [];","}"),S(e,n),t.push(";","}","}")}function S(e,n){t.push(e,".length?",e,".push(",n,") :",e,"[0] =",n)}function x(t,n){switch(t.type){case e.LOGICAL_EXPR:return n;case e.LITERAL:return"!!"+n;case e.PATH:return n+".length > 0";default:return["(typeof ",n,'=== "boolean"?',n,":","isArr(",n,")?",n,".length > 0 : !!",n,")"].join("")}}function T(t,n){switch(t.type){case e.LITERAL:return n;case e.PATH:return n+"[0]";default:return["(isArr(",n,")?",n,"[0] : ",n,")"].join("")}}var t,n,r,i,N={"===":function(e,t){return e+"==="+t},"==":function(e,t){return["typeof ",e,'=== "string" && typeof ',t,'=== "string"?',e,".toLowerCase() ===",t,".toLowerCase() :"+e,"==",t].join("")},">=":function(e,t){return e+">="+t},">":function(e,t){return e+">"+t},"<=":function(e,t){return e+"<="+t},"<":function(e,t){return e+"<"+t},"!==":function(e,t){return e+"!=="+t},"!=":function(e,t){return e+"!="+t},"^==":function(e,t){return["typeof ",e,'=== "string" && typeof ',t,'=== "string" &&',e,".indexOf(",t,") === 0"].join("")},"^=":function(e,t){return[e,"!= null &&",t,"!= null &&",e,".toString().toLowerCase().indexOf(",t,".toString().toLowerCase()) === 0"].join("")},"$==":function(e,t){return["typeof ",e,'=== "string" && typeof ',t,'=== "string" &&',e,".lastIndexOf(",t,") ===",e,".length -",t,".length"].join("")},"$=":function(e,t){return[e,"!= null &&",t,"!= null &&","(",e,"=",e,".toLowerCase().toString()).indexOf(","(",t,"=",t,".toLowerCase().toLowerCase())) ===",e,".length -",t,".length"].join("")},"*==":function(e,t){return["typeof ",e,'=== "string" && typeof ',t,'=== "string" &&',e,".indexOf(",t,") > -1"].join("")},"*=":function(e,t){return[e,"!= null && ",t,"!= null &&",e,".toString().toLowerCase().indexOf(",t,".toString().toLowerCase()) > -1"].join("")},"+":function(e,t){return e+"+"+t},"-":function(e,t){return e+"-"+t},"*":function(e,t){return e+"*"+t},"/":function(e,t){return e+"/"+t},"%":function(e,t){return e+"%"+t}};return u}(),i={},s=[],o={cacheSize:100},u={cacheSize:function(e,t){if(t<e&&s.length>t){var n=s.splice(0,s.length-t),r=n.length;while(r--)delete i[n[r]]}}},a=function(e,t,n){return i[e]||(i[e]=r(e),s.push(e)>o.cacheSize&&delete i[s.shift()]),i[e](t,n||{})};a.version="0.3.0",a.params=function(e){if(!arguments.length)return o;for(var t in e)e.hasOwnProperty(t)&&(u[t]&&u[t](o[t],e[t]),o[t]=e[t])},a.compile=r,a.apply=a,typeof module=="object"&&typeof module.exports=="object"?module.exports=a:typeof modules=="object"?modules.define("jspath",function(e){e(a)}):typeof define=="function"?define(["require","exports","module"],function(e,t,n){n.exports=a}):JSPath=a})();