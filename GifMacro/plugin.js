(function(u,I,l,j,P){"use strict";function g(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}function b(t){if(t&&t.__esModule)return t;var n=Object.create(null);return t&&Object.keys(t).forEach(function(e){if(e!=="default"){var a=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,a.get?a:{enumerable:!0,get:function(){return t[e]}})}}),n.default=t,Object.freeze(n)}var o=b(I),f=g(j),s=g(P);const E=l.findByDisplayName("ConfirmModal"),v=l.findByProps("button","colorRed"),p=l.findByDisplayName("TextInput"),S=l.findByDisplayName("Embed"),{renderImageComponent:B,renderMaskedLinkComponent:M}=l.findByProps("renderImageComponent");function x(t){s.default.persist.ghost.gifs==null&&(s.default.persist.store.gifs=[]);let e=s.default.persist.ghost.gifs.find(i=>i.url==t.url);const[a,d]=o.useState(e?.shorthand??""),[m,_]=o.useState(e?.tags?.join(", ")??"");function C(){const i=m?.split(", ")??[],N={url:t.url,tags:i,shorthand:a};s.default.persist.store.gifs=[...s.default.persist.ghost.gifs.filter(R=>R.url!=t.url),N],t.modal.onClose()}function c(){t.modal.onClose()}let r={id:"embed_00",url:t.url};return t.url.startsWith("https://tenor.com")?(r.type="gifv",r.provider={name:"Tenor",url:"https://tenor.co"},r.thumbnail={url:"https://cdn.discordapp.com/attachments/824921608560181261/1021158403256627242/d_o_n_k2.png",width:t.width,height:t.height},r.video={url:t.displayUrl,width:t.width,height:t.height}):(r.type="image",r.image={url:t.displayUrl,width:t.width,height:t.height}),o.createElement(E,{header:"Editing GIF",confirmText:"Accept",cancelText:"Cancel",transitionState:t.modal.transitionState,confirmButtonColor:v.colorBrand,onConfirm:C,onClose:c,onCancel:c},o.createElement("div",{style:{display:"grid",justifyContent:"center"}},o.createElement(S,{embed:r,autoPlayGif:!0,renderImageComponent:B,renderLinkComponent:M})),o.createElement("br",null),o.createElement(p,{placeholder:"Shorthand name for this gif",type:"text",value:a,onChange:d}),o.createElement("br",null),o.createElement(p,{placeholder:"Comma separated list of tags, e.g: amongus, moyai, crab",type:"text",value:m,onChange:_}))}function O(t){return{animated:!0,available:!0,id:"0",managed:"false",name:`${t.shorthand??"unnamed"}${t.tags[0]!=""?" ["+t.tags.join(", ")+"]":""}`,require_colons:!0,roles:[],url:t.url,allNamesString:`${t.shorthand??"unnamed"}${t.tags[0]!=""?" ["+t.tags.join(", ")+"]":""}`,guildId:"0",faked:!0,tags:t.tags}}const T=l.findByProps("GIFPickerSearchItem"),y=l.find(t=>t?.default?.sentinel==":").default,h=[];function k(){h.push(f.default.after("queryResults",y,D),f.default.instead("onSelect",y,G)),h.push(f.default.after("render",T.GIFPickerSearchItem.prototype,(t,n)=>(n.props.onContextMenu=e=>{e.target.src&&l.findByProps("openModalLazy").openModal(a=>o.createElement(x,{modal:a,url:n.props.children[1].props.url,displayUrl:e.target.src,width:e.target.width*2,height:e.target.height*2}))},n)))}function D(t,n){let[e,a,d,m,_]=t,c=(s.default.persist.ghost.gifs??[]).filter(r=>r.shorthand?.startsWith(d)||r.tags.find(i=>i.includes(d))!=null);for(const r of c)n.results.emojis.find(i=>i.url==r.url)||n.results.emojis.push(O(r));return n}function G(t,n){let[e]=t,a=e.results.emojis[e.index];if(a?.faked!=null&&a?.faked)e.options.insertText(a.url);else return n(e)}function L(){for(const t of h)t()}return u.onLoad=k,u.onUnload=L,Object.defineProperty(u,"__esModule",{value:!0}),u})({},cumcord.modules.common.React,cumcord.modules.webpack,cumcord.patcher,cumcord.pluginData);
