import{d0 as ot,d1 as it,A as Q,b as v,b6 as N,aj as xe,x as $,Z as j,cY as J,cZ as Ae,T as G,be as Y,d2 as Rt,d3 as ze,d4 as he,d5 as be,d6 as De,B as k,a4 as ce,d7 as He,cc as U,cv as Ee,bV as Oe,aM as st,d8 as zt,cA as Ie,aW as Te,d9 as Ne,c$ as rt,bw as H,cW as ut,a1 as Dt,bj as ct,a0 as dt,bk as Ht,bC as Nt,y as ae,cG as $t,ce as ge,c8 as ne,cf as Be,cg as ft,ca as vt,bD as R,cM as Gt,a2 as Wt,da as qt,c6 as le,ag as jt,j as ve,I as mt,a as Fe,F as ue,db as Ut,cz as ee,cQ as yt,c7 as gt,cB as _e,cb as ht,R as bt,cp as St,cP as Z,c9 as kt,cn as Se,c5 as Yt,dc as Xt,z as Le,dd as Ct,ci as wt,cV as $e,cT as Kt,cI as xt,cE as Ge,cF as Zt,cs as Jt,cj as Qt,cr as en,cH as tn,de as nn,ch as an,cK as ln,cL as on,cw as sn,cy as rn,df as un,ck as cn,cJ as dn,cO as fn,cD as se,dg as vn,dh as mn,J as yn}from"./index-Bp0ptF62.js";import{a as re,p as gn,s as pe,q as hn,r as Et,t as pt,B as ke,v as We,k as bn,w as qe,x as Sn,m as kn,u as Cn,d as je,i as wn}from"./VTextField-_CrzUh_V.js";import{m as xn,M as En,V as Ue}from"./VAvatar-B9DFfQ7Y.js";const de=new WeakMap;function pn(e,n){Object.keys(n).forEach(t=>{if(ot(t)){const a=it(t),l=de.get(e);if(n[t]==null)l==null||l.forEach(s=>{const[i,o]=s;i===a&&(e.removeEventListener(a,o),l.delete(s))});else if(!l||![...l].some(s=>s[0]===a&&s[1]===n[t])){e.addEventListener(a,n[t]);const s=l||new Set;s.add([a,n[t]]),de.has(e)||de.set(e,s)}}else n[t]==null?e.removeAttribute(t):e.setAttribute(t,n[t])})}function Pn(e,n){Object.keys(n).forEach(t=>{if(ot(t)){const a=it(t),l=de.get(e);l==null||l.forEach(s=>{const[i,o]=s;i===a&&(e.removeEventListener(a,o),l.delete(s))})}else e.removeAttribute(t)})}function Pt(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const n=e.getRootNode();return n!==document&&n.getRootNode({composed:!0})!==document?null:n}function Vn(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(n?An(e):Me(e))return e;e=e.parentElement}return document.scrollingElement}function me(e,n){const t=[];if(n&&e&&!n.contains(e))return t;for(;e&&(Me(e)&&t.push(e),e!==n);)e=e.parentElement;return t}function Me(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return n.overflowY==="scroll"||n.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function An(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return["scroll","auto"].includes(n.overflowY)}function On(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}function In(){return!0}function Vt(e,n,t){if(!e||At(e,t)===!1)return!1;const a=Pt(n);if(typeof ShadowRoot<"u"&&a instanceof ShadowRoot&&a.host===e.target)return!1;const l=(typeof t.value=="object"&&t.value.include||(()=>[]))();return l.push(n),!l.some(s=>s==null?void 0:s.contains(e.target))}function At(e,n){return(typeof n.value=="object"&&n.value.closeConditional||In)(e)}function Tn(e,n,t){const a=typeof t.value=="function"?t.value:t.value.handler;n._clickOutside.lastMousedownWasOutside&&Vt(e,n,t)&&setTimeout(()=>{At(e,t)&&a&&a(e)},0)}function Ye(e,n){const t=Pt(e);n(document),typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&n(t)}const Bn={mounted(e,n){const t=l=>Tn(l,e,n),a=l=>{e._clickOutside.lastMousedownWasOutside=Vt(l,e,n)};Ye(e,l=>{l.addEventListener("click",t,!0),l.addEventListener("mousedown",a,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[n.instance.$.uid]={onClick:t,onMousedown:a}},unmounted(e,n){e._clickOutside&&(Ye(e,t=>{var s;if(!t||!((s=e._clickOutside)!=null&&s[n.instance.$.uid]))return;const{onClick:a,onMousedown:l}=e._clickOutside[n.instance.$.uid];t.removeEventListener("click",a,!0),t.removeEventListener("mousedown",l,!0)}),delete e._clickOutside[n.instance.$.uid])}},Fn=$({target:[Object,Array]},"v-dialog-transition"),ga=Q()({name:"VDialogTransition",props:Fn(),setup(e,n){let{slots:t}=n;const a={onBeforeEnter(l){l.style.pointerEvents="none",l.style.visibility="hidden"},async onEnter(l,s){var C;await new Promise(S=>requestAnimationFrame(S)),await new Promise(S=>requestAnimationFrame(S)),l.style.visibility="";const{x:i,y:o,sx:r,sy:c,speed:d}=Ke(e.target,l),y=re(l,[{transform:`translate(${i}px, ${o}px) scale(${r}, ${c})`,opacity:0},{}],{duration:225*d,easing:gn});(C=Xe(l))==null||C.forEach(S=>{re(S,[{opacity:0},{opacity:0,offset:.33},{}],{duration:225*2*d,easing:pe})}),y.finished.then(()=>s())},onAfterEnter(l){l.style.removeProperty("pointer-events")},onBeforeLeave(l){l.style.pointerEvents="none"},async onLeave(l,s){var C;await new Promise(S=>requestAnimationFrame(S));const{x:i,y:o,sx:r,sy:c,speed:d}=Ke(e.target,l);re(l,[{},{transform:`translate(${i}px, ${o}px) scale(${r}, ${c})`,opacity:0}],{duration:125*d,easing:hn}).finished.then(()=>s()),(C=Xe(l))==null||C.forEach(S=>{re(S,[{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*d,easing:pe})})},onAfterLeave(l){l.style.removeProperty("pointer-events")}};return()=>e.target?v(xe,N({name:"dialog-transition"},a,{css:!1}),t):v(xe,{name:"dialog-transition"},t)}});function Xe(e){var t;const n=(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:t.children;return n&&[...n]}function Ke(e,n){const t=Et(e),a=pt(n),[l,s]=getComputedStyle(n).transformOrigin.split(" ").map(E=>parseFloat(E)),[i,o]=getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");let r=t.left+t.width/2;i==="left"||o==="left"?r-=t.width/2:(i==="right"||o==="right")&&(r+=t.width/2);let c=t.top+t.height/2;i==="top"||o==="top"?c-=t.height/2:(i==="bottom"||o==="bottom")&&(c+=t.height/2);const d=t.width/a.width,y=t.height/a.height,C=Math.max(1,d,y),S=d/C||0,f=y/C||0,g=a.width*a.height/(window.innerWidth*window.innerHeight),m=g>.12?Math.min(1.5,(g-.12)*10+1):1;return{x:r-(l+a.left),y:c-(s+a.top),sx:S,sy:f,speed:m}}function Ce(e,n){return{x:e.x+n.x,y:e.y+n.y}}function _n(e,n){return{x:e.x-n.x,y:e.y-n.y}}function Ze(e,n){if(e.side==="top"||e.side==="bottom"){const{side:t,align:a}=e,l=a==="left"?0:a==="center"?n.width/2:a==="right"?n.width:a,s=t==="top"?0:t==="bottom"?n.height:t;return Ce({x:l,y:s},n)}else if(e.side==="left"||e.side==="right"){const{side:t,align:a}=e,l=t==="left"?0:t==="right"?n.width:t,s=a==="top"?0:a==="center"?n.height/2:a==="bottom"?n.height:a;return Ce({x:l,y:s},n)}return Ce({x:n.width/2,y:n.height/2},n)}const Ot={static:Rn,connected:Dn},Ln=$({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in Ot},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function Mn(e,n){const t=j({}),a=j();J&&Ae(()=>!!(n.isActive.value&&e.locationStrategy),s=>{var i,o;G(()=>e.locationStrategy,s),Y(()=>{window.removeEventListener("resize",l),a.value=void 0}),window.addEventListener("resize",l,{passive:!0}),typeof e.locationStrategy=="function"?a.value=(i=e.locationStrategy(n,e,t))==null?void 0:i.updateLocation:a.value=(o=Ot[e.locationStrategy](n,e,t))==null?void 0:o.updateLocation});function l(s){var i;(i=a.value)==null||i.call(a,s)}return{contentStyles:t,updateLocation:a}}function Rn(){}function zn(e,n){n?e.style.removeProperty("left"):e.style.removeProperty("right");const t=pt(e);return n?t.x+=parseFloat(e.style.right||0):t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}function Dn(e,n,t){(Array.isArray(e.target.value)||On(e.target.value))&&Object.assign(t.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:l,preferredOrigin:s}=Rt(()=>{const f=ze(n.location,e.isRtl.value),g=n.origin==="overlap"?f:n.origin==="auto"?he(f):ze(n.origin,e.isRtl.value);return f.side===g.side&&f.align===be(g).align?{preferredAnchor:De(f),preferredOrigin:De(g)}:{preferredAnchor:f,preferredOrigin:g}}),[i,o,r,c]=["minWidth","minHeight","maxWidth","maxHeight"].map(f=>k(()=>{const g=parseFloat(n[f]);return isNaN(g)?1/0:g})),d=k(()=>{if(Array.isArray(n.offset))return n.offset;if(typeof n.offset=="string"){const f=n.offset.split(" ").map(parseFloat);return f.length<2&&f.push(0),f}return typeof n.offset=="number"?[n.offset,0]:[0,0]});let y=!1;const C=new ResizeObserver(()=>{y&&S()});G([e.target,e.contentEl],(f,g)=>{let[m,E]=f,[p,x]=g;p&&!Array.isArray(p)&&C.unobserve(p),m&&!Array.isArray(m)&&C.observe(m),x&&C.unobserve(x),E&&C.observe(E)},{immediate:!0}),Y(()=>{C.disconnect()});function S(){if(y=!1,requestAnimationFrame(()=>y=!0),!e.target.value||!e.contentEl.value)return;const f=Et(e.target.value),g=zn(e.contentEl.value,e.isRtl.value),m=me(e.contentEl.value),E=12;m.length||(m.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(g.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),g.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const p=m.reduce((V,P)=>{const b=P.getBoundingClientRect(),w=new ke({x:P===document.documentElement?0:b.x,y:P===document.documentElement?0:b.y,width:P.clientWidth,height:P.clientHeight});return V?new ke({x:Math.max(V.left,w.left),y:Math.max(V.top,w.top),width:Math.min(V.right,w.right)-Math.max(V.left,w.left),height:Math.min(V.bottom,w.bottom)-Math.max(V.top,w.top)}):w},void 0);p.x+=E,p.y+=E,p.width-=E*2,p.height-=E*2;let x={anchor:l.value,origin:s.value};function B(V){const P=new ke(g),b=Ze(V.anchor,f),w=Ze(V.origin,P);let{x:F,y:M}=_n(b,w);switch(V.anchor.side){case"top":M-=d.value[0];break;case"bottom":M+=d.value[0];break;case"left":F-=d.value[0];break;case"right":F+=d.value[0];break}switch(V.anchor.align){case"top":M-=d.value[1];break;case"bottom":M+=d.value[1];break;case"left":F-=d.value[1];break;case"right":F+=d.value[1];break}return P.x+=F,P.y+=M,P.width=Math.min(P.width,r.value),P.height=Math.min(P.height,c.value),{overflows:We(P,p),x:F,y:M}}let L=0,T=0;const u={x:0,y:0},I={x:!1,y:!1};let z=-1;for(;!(z++>10);){const{x:V,y:P,overflows:b}=B(x);L+=V,T+=P,g.x+=V,g.y+=P;{const w=He(x.anchor),F=b.x.before||b.x.after,M=b.y.before||b.y.after;let X=!1;if(["x","y"].forEach(_=>{if(_==="x"&&F&&!I.x||_==="y"&&M&&!I.y){const q={anchor:{...x.anchor},origin:{...x.origin}},K=_==="x"?w==="y"?be:he:w==="y"?he:be;q.anchor=K(q.anchor),q.origin=K(q.origin);const{overflows:h}=B(q);(h[_].before<=b[_].before&&h[_].after<=b[_].after||h[_].before+h[_].after<(b[_].before+b[_].after)/2)&&(x=q,X=I[_]=!0)}}),X)continue}b.x.before&&(L+=b.x.before,g.x+=b.x.before),b.x.after&&(L-=b.x.after,g.x-=b.x.after),b.y.before&&(T+=b.y.before,g.y+=b.y.before),b.y.after&&(T-=b.y.after,g.y-=b.y.after);{const w=We(g,p);u.x=p.width-w.x.before-w.x.after,u.y=p.height-w.y.before-w.y.after,L+=w.x.before,g.x+=w.x.before,T+=w.y.before,g.y+=w.y.before}break}const D=He(x.anchor);return Object.assign(t.value,{"--v-overlay-anchor-origin":`${x.anchor.side} ${x.anchor.align}`,transformOrigin:`${x.origin.side} ${x.origin.align}`,top:U(we(T)),left:e.isRtl.value?void 0:U(we(L)),right:e.isRtl.value?U(we(-L)):void 0,minWidth:U(D==="y"?Math.min(i.value,f.width):i.value),maxWidth:U(Je(Ee(u.x,i.value===1/0?0:i.value,r.value))),maxHeight:U(Je(Ee(u.y,o.value===1/0?0:o.value,c.value)))}),{available:u,contentBox:g}}return G(()=>[l.value,s.value,n.offset,n.minWidth,n.minHeight,n.maxWidth,n.maxHeight],()=>S()),ce(()=>{const f=S();if(!f)return;const{available:g,contentBox:m}=f;m.height>g.y&&requestAnimationFrame(()=>{S(),requestAnimationFrame(()=>{S()})})}),{updateLocation:S}}function we(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function Je(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let Pe=!0;const ye=[];function Hn(e){!Pe||ye.length?(ye.push(e),Ve()):(Pe=!1,e(),Ve())}let Qe=-1;function Ve(){cancelAnimationFrame(Qe),Qe=requestAnimationFrame(()=>{const e=ye.shift();e&&e(),ye.length?Ve():Pe=!0})}const fe={none:null,close:Gn,block:Wn,reposition:qn},Nn=$({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in fe}},"VOverlay-scroll-strategies");function $n(e,n){if(!J)return;let t;Oe(async()=>{t==null||t.stop(),n.isActive.value&&e.scrollStrategy&&(t=st(),await ce(),t.active&&t.run(()=>{var a;typeof e.scrollStrategy=="function"?e.scrollStrategy(n,e,t):(a=fe[e.scrollStrategy])==null||a.call(fe,n,e,t)}))}),Y(()=>{t==null||t.stop()})}function Gn(e){function n(t){e.isActive.value=!1}It(e.targetEl.value??e.contentEl.value,n)}function Wn(e,n){var i;const t=(i=e.root.value)==null?void 0:i.offsetParent,a=[...new Set([...me(e.targetEl.value,n.contained?t:void 0),...me(e.contentEl.value,n.contained?t:void 0)])].filter(o=>!o.classList.contains("v-overlay-scroll-blocked")),l=window.innerWidth-document.documentElement.offsetWidth,s=(o=>Me(o)&&o)(t||document.documentElement);s&&e.root.value.classList.add("v-overlay--scroll-blocked"),a.forEach((o,r)=>{o.style.setProperty("--v-body-scroll-x",U(-o.scrollLeft)),o.style.setProperty("--v-body-scroll-y",U(-o.scrollTop)),o!==document.documentElement&&o.style.setProperty("--v-scrollbar-offset",U(l)),o.classList.add("v-overlay-scroll-blocked")}),Y(()=>{a.forEach((o,r)=>{const c=parseFloat(o.style.getPropertyValue("--v-body-scroll-x")),d=parseFloat(o.style.getPropertyValue("--v-body-scroll-y")),y=o.style.scrollBehavior;o.style.scrollBehavior="auto",o.style.removeProperty("--v-body-scroll-x"),o.style.removeProperty("--v-body-scroll-y"),o.style.removeProperty("--v-scrollbar-offset"),o.classList.remove("v-overlay-scroll-blocked"),o.scrollLeft=-c,o.scrollTop=-d,o.style.scrollBehavior=y}),s&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function qn(e,n,t){let a=!1,l=-1,s=-1;function i(o){Hn(()=>{var d,y;const r=performance.now();(y=(d=e.updateLocation).value)==null||y.call(d,o),a=(performance.now()-r)/(1e3/60)>2})}s=(typeof requestIdleCallback>"u"?o=>o():requestIdleCallback)(()=>{t.run(()=>{It(e.targetEl.value??e.contentEl.value,o=>{a?(cancelAnimationFrame(l),l=requestAnimationFrame(()=>{l=requestAnimationFrame(()=>{i(o)})})):i(o)})})}),Y(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(s),cancelAnimationFrame(l)})}function It(e,n){const t=[document,...me(e)];t.forEach(a=>{a.addEventListener("scroll",n,{passive:!0})}),Y(()=>{t.forEach(a=>{a.removeEventListener("scroll",n)})})}const jn=Symbol.for("vuetify:v-menu"),Un=$({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function Yn(e,n){let t=()=>{};function a(i){t==null||t();const o=Number(i?e.openDelay:e.closeDelay);return new Promise(r=>{t=zt(o,()=>{n==null||n(i),r(i)})})}function l(){return a(!0)}function s(){return a(!1)}return{clearDelay:t,runOpenDelay:l,runCloseDelay:s}}const Xn=$({target:[String,Object],activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...Un()},"VOverlay-activator");function Kn(e,n){let{isActive:t,isTop:a}=n;const l=Ie("useActivator"),s=j();let i=!1,o=!1,r=!0;const c=k(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),d=k(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!c.value),{runOpenDelay:y,runCloseDelay:C}=Yn(e,u=>{u===(e.openOnHover&&i||c.value&&o)&&!(e.openOnHover&&t.value&&!a.value)&&(t.value!==u&&(r=!0),t.value=u)}),S=j(),f={onClick:u=>{u.stopPropagation(),s.value=u.currentTarget||u.target,t.value||(S.value=[u.clientX,u.clientY]),t.value=!t.value},onMouseenter:u=>{var I;(I=u.sourceCapabilities)!=null&&I.firesTouchEvents||(i=!0,s.value=u.currentTarget||u.target,y())},onMouseleave:u=>{i=!1,C()},onFocus:u=>{rt(u.target,":focus-visible")!==!1&&(o=!0,u.stopPropagation(),s.value=u.currentTarget||u.target,y())},onBlur:u=>{o=!1,u.stopPropagation(),C()}},g=k(()=>{const u={};return d.value&&(u.onClick=f.onClick),e.openOnHover&&(u.onMouseenter=f.onMouseenter,u.onMouseleave=f.onMouseleave),c.value&&(u.onFocus=f.onFocus,u.onBlur=f.onBlur),u}),m=k(()=>{const u={};if(e.openOnHover&&(u.onMouseenter=()=>{i=!0,y()},u.onMouseleave=()=>{i=!1,C()}),c.value&&(u.onFocusin=()=>{o=!0,y()},u.onFocusout=()=>{o=!1,C()}),e.closeOnContentClick){const I=Te(jn,null);u.onClick=()=>{t.value=!1,I==null||I.closeParents()}}return u}),E=k(()=>{const u={};return e.openOnHover&&(u.onMouseenter=()=>{r&&(i=!0,r=!1,y())},u.onMouseleave=()=>{i=!1,C()}),u});G(a,u=>{u&&(e.openOnHover&&!i&&(!c.value||!o)||c.value&&!o&&(!e.openOnHover||!i))&&(t.value=!1)}),G(t,u=>{u||setTimeout(()=>{S.value=void 0})},{flush:"post"});const p=j();Oe(()=>{p.value&&ce(()=>{s.value=Ne(p.value)})});const x=j(),B=k(()=>e.target==="cursor"&&S.value?S.value:x.value?Ne(x.value):Tt(e.target,l)||s.value),L=k(()=>Array.isArray(B.value)?void 0:B.value);let T;return G(()=>!!e.activator,u=>{u&&J?(T=st(),T.run(()=>{Zn(e,l,{activatorEl:s,activatorEvents:g})})):T&&T.stop()},{flush:"post",immediate:!0}),Y(()=>{T==null||T.stop()}),{activatorEl:s,activatorRef:p,target:B,targetEl:L,targetRef:x,activatorEvents:g,contentEvents:m,scrimEvents:E}}function Zn(e,n,t){let{activatorEl:a,activatorEvents:l}=t;G(()=>e.activator,(r,c)=>{if(c&&r!==c){const d=o(c);d&&i(d)}r&&ce(()=>s())},{immediate:!0}),G(()=>e.activatorProps,()=>{s()}),Y(()=>{i()});function s(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:o(),c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;r&&pn(r,N(l.value,c))}function i(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:o(),c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;r&&Pn(r,N(l.value,c))}function o(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator;const c=Tt(r,n);return a.value=(c==null?void 0:c.nodeType)===Node.ELEMENT_NODE?c:void 0,a.value}}function Tt(e,n){var a,l;if(!e)return;let t;if(e==="parent"){let s=(l=(a=n==null?void 0:n.proxy)==null?void 0:a.$el)==null?void 0:l.parentNode;for(;s!=null&&s.hasAttribute("data-no-activator");)s=s.parentNode;t=s}else typeof e=="string"?t=document.querySelector(e):"$el"in e?t=e.$el:t=e;return t}function Jn(){if(!J)return H(!1);const{ssr:e}=ut();if(e){const n=H(!1);return Dt(()=>{n.value=!0}),n}else return H(!0)}const Qn=$({eager:Boolean},"lazy");function ea(e,n){const t=H(!1),a=k(()=>t.value||e.eager||n.value);G(n,()=>t.value=!0);function l(){e.eager||(t.value=!1)}return{isBooted:t,hasContent:a,onAfterLeave:l}}function ta(){const n=Ie("useScopeId").vnode.scopeId;return{scopeId:n?{[n]:""}:void 0}}const et=Symbol.for("vuetify:stack"),ie=ct([]);function na(e,n,t){const a=Ie("useStack"),l=!t,s=Te(et,void 0),i=ct({activeChildren:new Set});dt(et,i);const o=H(+n.value);Ae(e,()=>{var y;const d=(y=ie.at(-1))==null?void 0:y[1];o.value=d?d+10:+n.value,l&&ie.push([a.uid,o.value]),s==null||s.activeChildren.add(a.uid),Y(()=>{if(l){const C=Nt(ie).findIndex(S=>S[0]===a.uid);ie.splice(C,1)}s==null||s.activeChildren.delete(a.uid)})});const r=H(!0);l&&Oe(()=>{var y;const d=((y=ie.at(-1))==null?void 0:y[0])===a.uid;setTimeout(()=>r.value=d)});const c=k(()=>!i.activeChildren.size);return{globalTop:Ht(r),localTop:c,stackStyles:k(()=>({zIndex:o.value}))}}function aa(e){return{teleportTarget:k(()=>{const t=e.value;if(t===!0||!J)return;const a=t===!1?document.body:typeof t=="string"?document.querySelector(t):t;if(a==null)return;let l=a.querySelector(":scope > .v-overlay-container");return l||(l=document.createElement("div"),l.className="v-overlay-container",a.appendChild(l)),l})}}function la(e){const{modelValue:n,color:t,...a}=e;return v(xe,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&v("div",N({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},a),null)]})}const oa=$({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,opacity:[Number,String],noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Xn(),...ae(),...$t(),...Qn(),...Ln(),...Nn(),...ge(),...xn()},"VOverlay"),ha=Q()({name:"VOverlay",directives:{ClickOutside:Bn},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...oa()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,n){let{slots:t,attrs:a,emit:l}=n;const s=ne(e,"modelValue"),i=k({get:()=>s.value,set:A=>{A&&e.disabled||(s.value=A)}}),{teleportTarget:o}=aa(k(()=>e.attach||e.contained)),{themeClasses:r}=Be(e),{rtlClasses:c,isRtl:d}=ft(),{hasContent:y,onAfterLeave:C}=ea(e,i),S=vt(k(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:f,localTop:g,stackStyles:m}=na(i,R(e,"zIndex"),e._disableGlobalStack),{activatorEl:E,activatorRef:p,target:x,targetEl:B,targetRef:L,activatorEvents:T,contentEvents:u,scrimEvents:I}=Kn(e,{isActive:i,isTop:g}),{dimensionStyles:z}=Gt(e),D=Jn(),{scopeId:V}=ta();G(()=>e.disabled,A=>{A&&(i.value=!1)});const P=j(),b=j(),{contentStyles:w,updateLocation:F}=Mn(e,{isRtl:d,contentEl:b,target:x,isActive:i});$n(e,{root:P,contentEl:b,targetEl:B,isActive:i,updateLocation:F});function M(A){l("click:outside",A),e.persistent?h():i.value=!1}function X(){return i.value&&f.value}J&&G(i,A=>{A?window.addEventListener("keydown",_):window.removeEventListener("keydown",_)},{immediate:!0}),Wt(()=>{J&&window.removeEventListener("keydown",_)});function _(A){var W,oe;A.key==="Escape"&&f.value&&(e.persistent?h():(i.value=!1,(W=b.value)!=null&&W.contains(document.activeElement)&&((oe=E.value)==null||oe.focus())))}const q=qt();Ae(()=>e.closeOnBack,()=>{Ut(q,A=>{f.value&&i.value?(A(!1),e.persistent?h():i.value=!1):A()})});const K=j();G(()=>i.value&&(e.absolute||e.contained)&&o.value==null,A=>{if(A){const W=Vn(P.value);W&&W!==document.scrollingElement&&(K.value=W.scrollTop)}});function h(){e.noClickAnimation||b.value&&re(b.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:pe})}function O(){C(),l("afterLeave")}return le(()=>{var A;return v(ue,null,[(A=t.activator)==null?void 0:A.call(t,{isActive:i.value,props:N({ref:p,targetRef:L},T.value,e.activatorProps)}),D.value&&y.value&&v(jt,{disabled:!o.value,to:o.value},{default:()=>[v("div",N({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":i.value,"v-overlay--contained":e.contained},r.value,c.value,e.class],style:[m.value,{"--v-overlay-opacity":e.opacity,top:U(K.value)},e.style],ref:P},V,a),[v(la,N({color:S,modelValue:i.value&&!!e.scrim},I.value),null),v(En,{appear:!0,persisted:!0,transition:e.transition,target:x.value,onAfterLeave:O},{default:()=>{var W;return[ve(v("div",N({ref:b,class:["v-overlay__content",e.contentClass],style:[z.value,w.value]},u.value,e.contentProps),[(W=t.default)==null?void 0:W.call(t,{isActive:i})]),[[mt,i.value],[Fe("click-outside"),{handler:M,closeConditional:X,include:()=>[E.value]}]])]}})])]})])}),{activatorEl:E,target:x,animateClick:h,contentEl:b,globalTop:f,localTop:g,updateLocation:F}}}),Bt=Symbol.for("vuetify:selection-control-group"),Ft=$({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:ee,trueIcon:ee,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:yt},...ae(),...gt(),...ge()},"SelectionControlGroup"),ia=$({...Ft({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup");Q()({name:"VSelectionControlGroup",props:ia(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const a=ne(e,"modelValue"),l=_e(),s=k(()=>e.id||`v-selection-control-group-${l}`),i=k(()=>e.name||s.value),o=new Set;return dt(Bt,{modelValue:a,forceUpdate:()=>{o.forEach(r=>r())},onForceUpdate:r=>{o.add(r),Y(()=>{o.delete(r)})}}),ht({[e.defaultsTarget]:{color:R(e,"color"),disabled:R(e,"disabled"),density:R(e,"density"),error:R(e,"error"),inline:R(e,"inline"),modelValue:a,multiple:k(()=>!!e.multiple||e.multiple==null&&Array.isArray(a.value)),name:i,falseIcon:R(e,"falseIcon"),trueIcon:R(e,"trueIcon"),readonly:R(e,"readonly"),ripple:R(e,"ripple"),type:R(e,"type"),valueComparator:R(e,"valueComparator")}}),le(()=>{var r;return v("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(r=t.default)==null?void 0:r.call(t)])}),{}}});const _t=$({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...ae(),...Ft()},"VSelectionControl");function sa(e){const n=Te(Bt,void 0),{densityClasses:t}=kt(e),a=ne(e,"modelValue"),l=k(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),s=k(()=>e.falseValue!==void 0?e.falseValue:!1),i=k(()=>!!e.multiple||e.multiple==null&&Array.isArray(a.value)),o=k({get(){const S=n?n.modelValue.value:a.value;return i.value?Se(S).some(f=>e.valueComparator(f,l.value)):e.valueComparator(S,l.value)},set(S){if(e.readonly)return;const f=S?l.value:s.value;let g=f;i.value&&(g=S?[...Se(a.value),f]:Se(a.value).filter(m=>!e.valueComparator(m,l.value))),n?n.modelValue.value=g:a.value=g}}),{textColorClasses:r,textColorStyles:c}=Yt(k(()=>{if(!(e.error||e.disabled))return o.value?e.color:e.baseColor})),{backgroundColorClasses:d,backgroundColorStyles:y}=vt(k(()=>o.value&&!e.error&&!e.disabled?e.color:void 0)),C=k(()=>o.value?e.trueIcon:e.falseIcon);return{group:n,densityClasses:t,trueValue:l,falseValue:s,model:o,textColorClasses:r,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:y,icon:C}}const tt=Q()({name:"VSelectionControl",directives:{Ripple:bt},inheritAttrs:!1,props:_t(),emits:{"update:modelValue":e=>!0},setup(e,n){let{attrs:t,slots:a}=n;const{group:l,densityClasses:s,icon:i,model:o,textColorClasses:r,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:y,trueValue:C}=sa(e),S=_e(),f=H(!1),g=H(!1),m=j(),E=k(()=>e.id||`input-${S}`),p=k(()=>!e.disabled&&!e.readonly);l==null||l.onForceUpdate(()=>{m.value&&(m.value.checked=o.value)});function x(u){p.value&&(f.value=!0,rt(u.target,":focus-visible")!==!1&&(g.value=!0))}function B(){f.value=!1,g.value=!1}function L(u){u.stopPropagation()}function T(u){p.value&&(e.readonly&&l&&ce(()=>l.forceUpdate()),o.value=u.target.checked)}return le(()=>{var V,P;const u=a.label?a.label({label:e.label,props:{for:E.value}}):e.label,[I,z]=St(t),D=v("input",N({ref:m,checked:o.value,disabled:!!e.disabled,id:E.value,onBlur:B,onFocus:x,onInput:T,"aria-disabled":!!e.disabled,type:e.type,value:C.value,name:e.name,"aria-checked":e.type==="checkbox"?o.value:void 0},z),null);return v("div",N({class:["v-selection-control",{"v-selection-control--dirty":o.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":f.value,"v-selection-control--focus-visible":g.value,"v-selection-control--inline":e.inline},s.value,e.class]},I,{style:e.style}),[v("div",{class:["v-selection-control__wrapper",r.value],style:c.value},[(V=a.default)==null?void 0:V.call(a,{backgroundColorClasses:d,backgroundColorStyles:y}),ve(v("div",{class:["v-selection-control__input"]},[((P=a.input)==null?void 0:P.call(a,{model:o,textColorClasses:r,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:y,inputNode:D,icon:i.value,props:{onFocus:x,onBlur:B,id:E.value}}))??v(ue,null,[i.value&&v(Z,{key:"icon",icon:i.value},null),D])]),[[Fe("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),u&&v(bn,{for:E.value,onClick:L},{default:()=>[u]})])}),{isFocused:f,input:m}}});function nt(e){const t=Math.abs(e);return Math.sign(e)*(t/((1/.501-2)*(1-t)+1))}function at(e){let{selectedElement:n,containerSize:t,contentSize:a,isRtl:l,currentScrollOffset:s,isHorizontal:i}=e;const o=i?n.clientWidth:n.clientHeight,r=i?n.offsetLeft:n.offsetTop,c=l&&i?a-r-o:r,d=t+s,y=o+c,C=o*.4;return c<=s?s=Math.max(c-C,0):d<=y&&(s=Math.min(s-(d-y-C),a-t)),s}function ra(e){let{selectedElement:n,containerSize:t,contentSize:a,isRtl:l,isHorizontal:s}=e;const i=s?n.clientWidth:n.clientHeight,o=s?n.offsetLeft:n.offsetTop,r=l&&s?a-o-i/2-t/2:o+i/2-t/2;return Math.min(a-t,Math.max(0,r))}const ua=Symbol.for("vuetify:v-slide-group"),Lt=$({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:ua},nextIcon:{type:ee,default:"$next"},prevIcon:{type:ee,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...ae(),...Xt(),...Le(),...Ct({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),lt=Q()({name:"VSlideGroup",props:Lt(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const{isRtl:a}=ft(),{displayClasses:l,mobile:s}=ut(e),i=wt(e,e.symbol),o=H(!1),r=H(0),c=H(0),d=H(0),y=k(()=>e.direction==="horizontal"),{resizeRef:C,contentRect:S}=$e(),{resizeRef:f,contentRect:g}=$e(),m=k(()=>i.selected.value.length?i.items.value.findIndex(h=>h.id===i.selected.value[0]):-1),E=k(()=>i.selected.value.length?i.items.value.findIndex(h=>h.id===i.selected.value[i.selected.value.length-1]):-1);if(J){let h=-1;G(()=>[i.selected.value,S.value,g.value,y.value],()=>{cancelAnimationFrame(h),h=requestAnimationFrame(()=>{if(S.value&&g.value){const O=y.value?"width":"height";c.value=S.value[O],d.value=g.value[O],o.value=c.value+1<d.value}if(m.value>=0&&f.value){const O=f.value.children[E.value];m.value===0||!o.value?r.value=0:e.centerActive?r.value=ra({selectedElement:O,containerSize:c.value,contentSize:d.value,isRtl:a.value,isHorizontal:y.value}):o.value&&(r.value=at({selectedElement:O,containerSize:c.value,contentSize:d.value,isRtl:a.value,currentScrollOffset:r.value,isHorizontal:y.value}))}})})}const p=H(!1);let x=0,B=0;function L(h){const O=y.value?"clientX":"clientY";B=(a.value&&y.value?-1:1)*r.value,x=h.touches[0][O],p.value=!0}function T(h){if(!o.value)return;const O=y.value?"clientX":"clientY",A=a.value&&y.value?-1:1;r.value=A*(B+x-h.touches[0][O])}function u(h){const O=d.value-c.value;r.value<0||!o.value?r.value=0:r.value>=O&&(r.value=O),p.value=!1}function I(){C.value&&(C.value[y.value?"scrollLeft":"scrollTop"]=0)}const z=H(!1);function D(h){if(z.value=!0,!(!o.value||!f.value)){for(const O of h.composedPath())for(const A of f.value.children)if(A===O){r.value=at({selectedElement:A,containerSize:c.value,contentSize:d.value,isRtl:a.value,currentScrollOffset:r.value,isHorizontal:y.value});return}}}function V(h){z.value=!1}function P(h){var O;!z.value&&!(h.relatedTarget&&((O=f.value)!=null&&O.contains(h.relatedTarget)))&&w()}function b(h){f.value&&(y.value?h.key==="ArrowRight"?w(a.value?"prev":"next"):h.key==="ArrowLeft"&&w(a.value?"next":"prev"):h.key==="ArrowDown"?w("next"):h.key==="ArrowUp"&&w("prev"),h.key==="Home"?w("first"):h.key==="End"&&w("last"))}function w(h){var O,A,W,oe,Re;if(f.value)if(!h)(O=Kt(f.value)[0])==null||O.focus();else if(h==="next"){const te=(A=f.value.querySelector(":focus"))==null?void 0:A.nextElementSibling;te?te.focus():w("first")}else if(h==="prev"){const te=(W=f.value.querySelector(":focus"))==null?void 0:W.previousElementSibling;te?te.focus():w("last")}else h==="first"?(oe=f.value.firstElementChild)==null||oe.focus():h==="last"&&((Re=f.value.lastElementChild)==null||Re.focus())}function F(h){const O=r.value+(h==="prev"?-1:1)*c.value;r.value=Ee(O,0,d.value-c.value)}const M=k(()=>{let h=r.value>d.value-c.value?-(d.value-c.value)+nt(d.value-c.value-r.value):-r.value;r.value<=0&&(h=nt(-r.value));const O=a.value&&y.value?-1:1;return{transform:`translate${y.value?"X":"Y"}(${O*h}px)`,transition:p.value?"none":"",willChange:p.value?"transform":""}}),X=k(()=>({next:i.next,prev:i.prev,select:i.select,isSelected:i.isSelected})),_=k(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!s.value;case!0:return o.value||Math.abs(r.value)>0;case"mobile":return s.value||o.value||Math.abs(r.value)>0;default:return!s.value&&(o.value||Math.abs(r.value)>0)}}),q=k(()=>Math.abs(r.value)>0),K=k(()=>d.value>Math.abs(r.value)+c.value);return le(()=>v(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!y.value,"v-slide-group--has-affixes":_.value,"v-slide-group--is-overflowing":o.value},l.value,e.class],style:e.style,tabindex:z.value||i.selected.value.length?-1:0,onFocus:P},{default:()=>{var h,O,A;return[_.value&&v("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!q.value}],onClick:()=>q.value&&F("prev")},[((h=t.prev)==null?void 0:h.call(t,X.value))??v(qe,null,{default:()=>[v(Z,{icon:a.value?e.nextIcon:e.prevIcon},null)]})]),v("div",{key:"container",ref:C,class:"v-slide-group__container",onScroll:I},[v("div",{ref:f,class:"v-slide-group__content",style:M.value,onTouchstartPassive:L,onTouchmovePassive:T,onTouchendPassive:u,onFocusin:D,onFocusout:V,onKeydown:b},[(O=t.default)==null?void 0:O.call(t,X.value)])]),_.value&&v("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!K.value}],onClick:()=>K.value&&F("next")},[((A=t.next)==null?void 0:A.call(t,X.value))??v(qe,null,{default:()=>[v(Z,{icon:a.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:i.selected,scrollTo:F,scrollOffset:r,focus:w}}}),Mt=Symbol.for("vuetify:v-chip-group"),ca=$({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:yt},...Lt(),...ae(),...Ct({selectedClass:"v-chip--selected"}),...Le(),...ge(),...xt({variant:"tonal"})},"VChipGroup");Q()({name:"VChipGroup",props:ca(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const{themeClasses:a}=Be(e),{isSelected:l,select:s,next:i,prev:o,selected:r}=wt(e,Mt);return ht({VChip:{color:R(e,"color"),disabled:R(e,"disabled"),filter:R(e,"filter"),variant:R(e,"variant")}}),le(()=>{const c=lt.filterProps(e);return v(lt,N(c,{class:["v-chip-group",{"v-chip-group--column":e.column},a.value,e.class],style:e.style}),{default:()=>{var d;return[(d=t.default)==null?void 0:d.call(t,{isSelected:l,select:s,next:i,prev:o,selected:r.value})]}})}),{}}});const da=$({activeClass:String,appendAvatar:String,appendIcon:ee,closable:Boolean,closeIcon:{type:ee,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:ee,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:Ge(),onClickOnce:Ge(),...Zt(),...ae(),...gt(),...Jt(),...Qt(),...en(),...tn(),...nn(),...Le({tag:"span"}),...ge(),...xt({variant:"tonal"})},"VChip"),ba=Q()({name:"VChip",directives:{Ripple:bt},props:da(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,n){let{attrs:t,emit:a,slots:l}=n;const{t:s}=an(),{borderClasses:i}=ln(e),{colorClasses:o,colorStyles:r,variantClasses:c}=on(e),{densityClasses:d}=kt(e),{elevationClasses:y}=sn(e),{roundedClasses:C}=rn(e),{sizeClasses:S}=un(e),{themeClasses:f}=Be(e),g=ne(e,"modelValue"),m=cn(e,Mt,!1),E=dn(e,t),p=k(()=>e.link!==!1&&E.isLink.value),x=k(()=>!e.disabled&&e.link!==!1&&(!!m||e.link||E.isClickable.value)),B=k(()=>({"aria-label":s(e.closeLabel),onClick(u){u.stopPropagation(),g.value=!1,a("click:close",u)}}));function L(u){var I;a("click",u),x.value&&((I=E.navigate)==null||I.call(E,u),m==null||m.toggle())}function T(u){(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),L(u))}return()=>{const u=E.isLink.value?"a":e.tag,I=!!(e.appendIcon||e.appendAvatar),z=!!(I||l.append),D=!!(l.close||e.closable),V=!!(l.filter||e.filter)&&m,P=!!(e.prependIcon||e.prependAvatar),b=!!(P||l.prepend),w=!m||m.isSelected.value;return g.value&&ve(v(u,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":x.value,"v-chip--filter":V,"v-chip--pill":e.pill},f.value,i.value,w?o.value:void 0,d.value,y.value,C.value,S.value,c.value,m==null?void 0:m.selectedClass.value,e.class],style:[w?r.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:E.href.value,tabindex:x.value?0:void 0,onClick:L,onKeydown:x.value&&!p.value&&T},{default:()=>{var F;return[fn(x.value,"v-chip"),V&&v(Sn,{key:"filter"},{default:()=>[ve(v("div",{class:"v-chip__filter"},[l.filter?v(se,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},l.filter):v(Z,{key:"filter-icon",icon:e.filterIcon},null)]),[[mt,m.isSelected.value]])]}),b&&v("div",{key:"prepend",class:"v-chip__prepend"},[l.prepend?v(se,{key:"prepend-defaults",disabled:!P,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},l.prepend):v(ue,null,[e.prependIcon&&v(Z,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&v(Ue,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),v("div",{class:"v-chip__content","data-no-activator":""},[((F=l.default)==null?void 0:F.call(l,{isSelected:m==null?void 0:m.isSelected.value,selectedClass:m==null?void 0:m.selectedClass.value,select:m==null?void 0:m.select,toggle:m==null?void 0:m.toggle,value:m==null?void 0:m.value.value,disabled:e.disabled}))??e.text]),z&&v("div",{key:"append",class:"v-chip__append"},[l.append?v(se,{key:"append-defaults",disabled:!I,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},l.append):v(ue,null,[e.appendIcon&&v(Z,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&v(Ue,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),D&&v("button",N({key:"close",class:"v-chip__close",type:"button"},B.value),[l.close?v(se,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},l.close):v(Z,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[Fe("ripple"),x.value&&e.ripple,null]])}}}),fa=$({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...kn(),..._t()},"VSwitch"),Sa=Q()({name:"VSwitch",inheritAttrs:!1,props:fa(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,n){let{attrs:t,slots:a}=n;const l=ne(e,"indeterminate"),s=ne(e,"modelValue"),{loaderClasses:i}=vn(e),{isFocused:o,focus:r,blur:c}=Cn(e),d=j(),y=k(()=>typeof e.loading=="string"&&e.loading!==""?e.loading:e.color),C=_e(),S=k(()=>e.id||`switch-${C}`);function f(){l.value&&(l.value=!1)}function g(m){var E,p;m.stopPropagation(),m.preventDefault(),(p=(E=d.value)==null?void 0:E.input)==null||p.click()}return le(()=>{const[m,E]=St(t),p=je.filterProps(e),x=tt.filterProps(e);return v(je,N({class:["v-switch",{"v-switch--inset":e.inset},{"v-switch--indeterminate":l.value},i.value,e.class]},m,p,{modelValue:s.value,"onUpdate:modelValue":B=>s.value=B,id:S.value,focused:o.value,style:e.style}),{...a,default:B=>{let{id:L,messagesId:T,isDisabled:u,isReadonly:I,isValid:z}=B;const D={model:s,isValid:z};return v(tt,N({ref:d},x,{modelValue:s.value,"onUpdate:modelValue":[V=>s.value=V,f],id:L.value,"aria-describedby":T.value,type:"checkbox","aria-checked":l.value?"mixed":void 0,disabled:u.value,readonly:I.value,onFocus:r,onBlur:c},E),{...a,default:V=>{let{backgroundColorClasses:P,backgroundColorStyles:b}=V;return v("div",{class:["v-switch__track",...P.value],style:b.value,onClick:g},[a["track-true"]&&v("div",{key:"prepend",class:"v-switch__track-true"},[a["track-true"](D)]),a["track-false"]&&v("div",{key:"append",class:"v-switch__track-false"},[a["track-false"](D)])])},input:V=>{let{inputNode:P,icon:b,backgroundColorClasses:w,backgroundColorStyles:F}=V;return v(ue,null,[P,v("div",{class:["v-switch__thumb",{"v-switch__thumb--filled":b||e.loading},e.inset?void 0:w.value],style:e.inset?void 0:F.value},[a.thumb?v(se,{defaults:{VIcon:{icon:b,size:"x-small"}}},{default:()=>[a.thumb({...D,icon:b})]}):v(wn,null,{default:()=>[e.loading?v(mn,{name:"v-switch",active:!0,color:z.value===!1?void 0:y.value},{default:M=>a.loader?a.loader(M):v(yn,{active:M.isActive,color:M.color,indeterminate:!0,size:"16",width:"2"},null)}):b&&v(Z,{key:String(b),icon:b,size:"x-small"},null)]})])])}})}})}),{}}});export{Sa as V,lt as a,Qn as b,ba as c,ha as d,_t as e,tt as f,oa as g,ga as h,ta as i,jn as j,Vn as k,Lt as m,ea as u};
