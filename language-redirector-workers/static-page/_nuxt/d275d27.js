(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{336:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}const l=r(n(105)),o={types:{span:"span",image:"img"},marks:{strong:"strong",em:"em",link:"a"},styles:{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",normal:"p",blockquote:"blockquote"},listItem:"li",container:"div"};let c=1;function d(e){if(!e)return{};const t=Object.entries(e).reduce(((e,[t,n])=>{switch(!0){case["_key","key"].includes(t):return e.key=n||null,e;case["class","href","src"].includes(t):return e.attrs[t]=n,e;case["_type"].includes(t):return e;default:return e.props[t]=n,e}}),{props:{},attrs:{}});return t.props={level:c,...t.props},t}function h(e,t){if(!e)return;const{_type:n,listItem:r}=e;return r?t.listItem||"li":n&&n in t.types?t.types[n]:n&&n in t.marks?t.marks[n]:void 0}function y(e,content,[mark,...t]=[],n=o,r=[]){if(!mark)return content;const l=mark in n.marks?{_type:mark,_key:""}:r.find((e=>e._key===mark));return e(h(l,n)||"span",d(l),[y(e,content,t,n,r)])}function f(e,t){const{length:n}=e;if(!t.level)return e.push(t),e;const{_type:r,children:l,level:o}=e[n-1]||{};return"list"===r&&l?o===t.level?l.push(t):f(l,t):e.push({_type:"list",children:[t],level:t.level}),e}function m(e,t,n,r=!1){return(r?t:t.reduce(f,[])).map((t=>function(e,{style:style,listItem:t},n,r){const l=style?style.match(/^h(\d)$/):[];return!t&&l&&l.length>1&&(c=Number(l[1])),!t&&style&&n.styles[style]?e(n.styles[style],{},r):r}(e,t,n,function(e,t,content,n){const r=h(t,n);return r?[e(r,d(t),content)]:content}(e,t,"block"===t._type?(t.children||[]).map((r=>"span"!==r._type?e(h(r,n)||"span",d(r),[y(e,r.text,r.marks,n,t.markDefs)]):y(e,r.text,r.marks,n,t.markDefs))):[],n))))}const k={name:"SanityContent",functional:!0,props:{blocks:{type:Array,default:()=>[]},serializers:{type:Object,default:()=>({})},renderContainerOnSingleChild:{type:Boolean,default:!1}},render(e,{props:t,data:data}){const n=l.default(t.serializers,o);return n.types.list=n.types.list||{name:"ListComponent",functional:!0,props:{children:{type:Array,default:()=>[]}},render:(h2,{props:e})=>h2(e.children.length&&"number"===e.children[0].listItem?"ol":"ul",{},m(h2,e.children,n,!0))},e(n.container,data,m(e,t.blocks||[],n))}};t.SanityContent=k,t.default=k}}]);