import"./modulepreload-polyfill-B5Qt9EMX.js";const m=document.getElementById("btn1"),u=document.getElementById("btn2"),g=document.getElementById("btn3"),y=document.getElementById("btn4"),I=document.getElementById("lane1"),b=document.getElementById("lane2"),k=document.getElementById("lane3"),w=document.getElementById("lane4"),h=[I,b,k,w],B=154,L=145,C=170,_=204;let r=0;const f=new Audio("/music-game/se/se1.mp3"),E=[];document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("countdown"),t=document.getElementById("start-message");function o(s){return new URLSearchParams(window.location.search).get(s)}const n=o("song");switch(n){case"senbon.mp3":r=B;break;case"syaruru.mp3":r=L;break;case"bisyouzyo.mp3":r=C;break;case"over.mp3":r=_;break;default:throw new Error("No song selected")}const c=new Audio("/music-game/music/"+n);let d=3;const i=setInterval(()=>{d--,e.textContent=String(d),d<=0&&(clearInterval(i),e.style.display="none",t.style.display="block",setTimeout(()=>{t.style.display="none",c.currentTime=1,c.playbackRate=1,c.play(),E.push(setInterval(()=>{let s=Math.floor(Math.random()*h.length);x(h[s])},6e4/r)),c.addEventListener("ended",p)},1e3))},1e3);function p(){E.forEach(s=>clearInterval(s))}});if(!m||!u||!g||!y)throw new Error("ボタンの要素が存在しない");const M=[];function x(e){M.push({lane:Math.floor(Math.random()*4),height:0});const t=document.createElement("div");t.classList.add("note"),e.appendChild(t);let o=0;const n=setInterval(()=>{o+=1,t.style.top=o+"px",o>window.innerHeight&&(clearInterval(n),t.parentElement===e&&e.removeChild(t))},2);t.dataset.intervalId=String(n)}function R(e,t){const o=(e.width+e.left)/2,n=(e.height+e.top)/2,c=(t.width+t.left)/2,d=(t.height+t.top)/2;return S(o,n,c,d)}function S(e,t,o,n){return Math.sqrt((o-e)**2+(n-t)**2)}function l(e){const t=document.querySelectorAll(".note"),o=e.getBoundingClientRect();let n=!1;return f.currentTime=0,f.play(),t.forEach(c=>{const d=c.getBoundingClientRect();let i=R(d,o);const p="images-container"+e.id.replace("btn",""),s=document.getElementById(p),a=document.createElement("img");if(a.style.width="50px",a.style.height="50px",a.alt="当たり判定",console.log(i),i<11){const v=c.dataset.intervalId;c.remove(),clearInterval(Number(v)),console.log(e.id),i<=2?a.src="/music-game/images/perfect.png":i<=4?a.src="/music-game/images/great.png":i<=7?a.src="/music-game/images/good.png":i<=10&&(a.src="/music-game/images/bad.png"),s==null||s.appendChild(a),setTimeout(()=>s==null?void 0:s.removeChild(a),500),n=!0}}),n}m.addEventListener("click",()=>l(m));u.addEventListener("click",()=>l(u));g.addEventListener("click",()=>l(g));y.addEventListener("click",()=>l(y));const D=e=>{e.key==="d"||e.key==="1"?l(m):e.key==="f"||e.key==="2"?l(u):e.key==="j"||e.key==="3"?l(g):(e.key==="k"||e.key==="4")&&l(y)};window.addEventListener("keydown",D);
