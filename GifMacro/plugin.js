(function(d,v,s,k,_){"use strict";function f(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}function C(t){if(t&&t.__esModule)return t;var a=Object.create(null);return t&&Object.keys(t).forEach(function(e){if(e!=="default"){var o=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(a,e,o.get?o:{enumerable:!0,get:function(){return t[e]}})}}),a.default=t,Object.freeze(a)}var r=C(v),u=f(k),i=f(_);const j=s.findByDisplayName("ConfirmModal"),I=s.findByProps("button","colorRed"),p=s.findByDisplayName("TextInput"),x=s.findByDisplayName("Embed"),{renderImageComponent:E,renderMaskedLinkComponent:P}=s.findByProps("renderImageComponent");function S(t){i.default.persist.ghost.gifs==null&&(i.default.persist.store.gifs=[]);let e=i.default.persist.ghost.gifs.find(l=>l.url==t.url);const[o,c]=r.useState(e?.shorthand??""),[m,w]=r.useState(e?.tags?.join(", ")??"");function b(){const l=m?.split(", ")??[],G={url:t.url,tags:l,shorthand:o};i.default.persist.store.gifs=[...i.default.persist.ghost.gifs.filter(L=>L.url!=t.url),G],t.modal.onClose()}function h(){t.modal.onClose()}let n={id:"embed_00",url:t.url};return t.url.startsWith("https://tenor.com")?(n.type="gifv",n.provider={name:"Tenor",url:"https://tenor.co"},n.thumbnail={url:"https://cdn.discordapp.com/attachments/824921608560181261/1021158403256627242/d_o_n_k2.png",width:t.width,height:t.height},n.video={url:t.displayUrl,width:t.width,height:t.height}):(n.type="image",n.image={url:t.displayUrl,width:t.width,height:t.height}),r.createElement(j,{header:"Editing GIF",confirmText:"Accept",cancelText:"Cancel",transitionState:t.modal.transitionState,confirmButtonColor:I.colorBrand,onConfirm:b,onClose:h,onCancel:h},r.createElement("div",{style:{display:"grid",justifyContent:"center"}},r.createElement(x,{embed:n,autoPlayGif:!0,renderImageComponent:E,renderLinkComponent:P})),r.createElement("br",null),r.createElement(p,{placeholder:"Shorthand name for this gif",type:"text",value:o,onChange:c}),r.createElement("br",null),r.createElement(p,{placeholder:"Comma separated list of tags, e.g: amongus, moyai, crab",type:"text",value:m,onChange:w}))}function B(t){return{animated:!0,available:!0,id:"0",managed:"false",name:`${t.shorthand??"unnamed"}${t.tags[0]!=""?" ["+t.tags.join(", ")+"]":""}`,require_colons:!0,roles:[],url:t.url,allNamesString:`${t.shorthand??"unnamed"}${t.tags[0]!=""?" ["+t.tags.join(", ")+"]":""}`,guildId:"0",faked:!0,tags:t.tags}}const M=s.findByProps("GIFPickerSearchItem"),y=s.find(t=>t?.default?.sentinel==":").default,g=[];function D(){i.default.persist.store.gifs=[{url:"https://media.discordapp.net/attachments/824921608560181261/1021140133484953620/caption.gif",tags:["ximi","garbage"],shorthand:"ximi"},{url:"https://tenor.com/view/twitter-gif-23330288",tags:["twitter","minutes","sentence"],shorthand:"10twitter"},{url:"https://cdn.discordapp.com/attachments/942855121203765291/1021083159112196216/F302E979-AE48-4D32-A58E-6682684643B8.gif",tags:["unauthorized","cat","500","fine"],shorthand:"500cat"},{url:"https://tenor.com/view/cirno-cirno-fumo-fumo-gif-21728275",tags:["cirno","spin"],shorthand:"cirno"},{url:"https://tenor.com/view/frog-hat-gif-24889203",tags:["frog","hat"],shorthand:"froghat"},{url:"https://media.discordapp.net/attachments/405649449151627266/1018537577793454131/strop_1.gif",tags:["kms","looking","noose"],shorthand:"kms"},{url:"https://tenor.com/view/walter-white-gif-26023304",tags:["wenomechainasama","breakingbad"],shorthand:"wenomechainasama"},{url:"https://media.discordapp.net/attachments/1006982064458960916/1012162824023326720/furry_astolfo_speechbubble.gif",tags:["monster","astolfo","quote"],shorthand:"astrolfomonster"},{url:"https://tenor.com/view/goodnight-gn-off-to-bed-vergil-vergil-dmc-gif-26287431",tags:["offtobed","mgs5"],shorthand:"offtobed"},{url:"https://media.discordapp.net/attachments/885944332761317387/1020735354757730334/caption.gif",tags:["chomik","unrealengine","ue4","ue5"],shorthand:"cookingcontentforwindows"},{url:"https://tenor.com/view/based-dmc-gif-26587902",tags:["based","department"],shorthand:"baseddepartment"},{url:"https://tenor.com/view/oh-the-misery-oh-the-misery-everybody-wants-to-be-my-enemy-enemy-cat-god-i-love-this-cat-egg-cat-gif-25304834",tags:["cat","misery","imaginedragons"],shorthand:"ohthemisery"},{url:"https://media.discordapp.net/attachments/824921608560181261/1018445312580395029/unknown.png?.gif",tags:["calmbeforethestorm","preguh"],shorthand:"calmbeforethestorm"},{url:"https://media.discordapp.net/attachments/885944332761317387/1020726417438285964/caption.gif",tags:["installing","microsoft","directx","chomik"],shorthand:"installingdirectx"},{url:"https://tenor.com/view/cat-cake-cat-cake-meme-gif-24537247",tags:["donut","cat"],shorthand:"donutcat"},{url:"https://media.discordapp.net/attachments/845018875469103104/1018521749115125811/Nagiev-.gif",tags:["egg","speak","quote"],shorthand:"eggspeak"},{url:"https://media.discordapp.net/attachments/885944332761317387/1020728878026723375/speed.gif",tags:["compiling","shaders","ue4","ue5"],shorthand:"compilingshaders"},{url:"https://tenor.com/view/watch-yo-tone-mf-bowling-pin-bowling-ball-gif-twitter-gif-25338320",tags:["watchyotone","bowling","slap"],shorthand:"bowlingslap"},{url:"https://imgur.com/a/wk53Dom",tags:["stare","moose","reaction"],shorthand:"moosestare"},{url:"https://tenor.com/view/yh-gif-25406060",tags:["cat","stare","reaction"],shorthand:"catstare"},{url:"https://media.discordapp.net/attachments/885944332761317387/1020707234893799526/caption.gif",tags:["pdbgen","fire","chaos"],shorthand:"pdbgenfire"},{url:"https://tenor.com/view/we-do-a-little-trolling-trolling-shockwave-nuke-nuclear-explosion-gif-21948424",tags:["trolling","explosion","destruction"],shorthand:"trollingexplosion"},{url:"https://media.discordapp.net/attachments/885944332761317387/1020657432021696552/speed.gif",tags:["unused","variable","brick","explaining"],shorthand:"unusedvariable"},{url:"https://media.discordapp.net/attachments/824921608560181261/1020635416635920404/tjqqe23cd2s81.gif",tags:["amogus","takethaway","giveth","takeaway","away","take"],shorthand:"takethaway"},{url:"https://tenor.com/view/toast-jumpscare-gif-21501288",tags:["toast","jumpscare"],shorthand:"toastjumpscare"}],g.push(u.default.after("queryResults",y,q),u.default.instead("onSelect",y,O)),g.push(u.default.after("render",M.GIFPickerSearchItem.prototype,(t,a)=>(a.props.onContextMenu=e=>{e.target.src&&s.findByProps("openModalLazy").openModal(o=>r.createElement(S,{modal:o,url:a.props.children[1].props.url,displayUrl:e.target.src,width:e.target.width*2,height:e.target.height*2}))},a)))}function q(t,a){let[e,o,c,m,w]=t,h=(i.default.persist.ghost.gifs??[]).filter(n=>n.shorthand?.startsWith(c)||n.tags.find(l=>l.includes(c))!=null);a.results.emojis=[...a.results.emojis.filter(n=>!n.faked)];for(const n of h)a.results.emojis.push(B(n));return a}function O(t,a){let[e]=t,o=e.results.emojis[e.index];if(o?.faked!=null&&o?.faked)e.options.insertText(o.url);else return a(e)}function T(){for(const t of g)t()}return d.onLoad=D,d.onUnload=T,Object.defineProperty(d,"__esModule",{value:!0}),d})({},cumcord.modules.common.React,cumcord.modules.webpack,cumcord.patcher,cumcord.pluginData);
