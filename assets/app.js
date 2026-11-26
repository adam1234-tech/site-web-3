(function(){
document.querySelectorAll('pre').forEach(function(p){var b=document.createElement('button');b.className='copy';b.type='button';b.textContent='Copy';
b.addEventListener('click',function(){var t=p.querySelector('code').innerText;
var done=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1500)};
if(navigator.clipboard){navigator.clipboard.writeText(t).then(done,fb)}else fb();
function fb(){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){b.textContent='Press Ctrl+C'}a.remove()}});
p.appendChild(b)});
var m=document.getElementById('menu'),s=document.getElementById('side');
if(m&&s){m.addEventListener('click',function(){var o=s.classList.toggle('open');m.setAttribute('aria-expanded',o)});
s.addEventListener('click',function(e){if(e.target.tagName==='A'){s.classList.remove('open');m.setAttribute('aria-expanded',false)}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){s.classList.remove('open');m.setAttribute('aria-expanded',false)}})}

var tl=document.getElementById('tl');
if(tl){var head=document.getElementById('head'),tc=document.getElementById('tc'),cv=document.getElementById('cv'),mode=document.getElementById('mode'),play=document.getElementById('play'),proj=document.getElementById('proj');
var pct=0,timer=null,dur=40,fps=24,pad=function(n){return String(n).padStart(2,'0')};
function set(p){pct=Math.max(0,Math.min(1,p));head.style.left='calc(12px + '+pct+' * (100% - 24px))';var f=Math.round(pct*dur*fps),s=Math.floor(f/fps);tc.textContent='00:'+pad(Math.floor(s/60))+':'+pad(s%60)+':'+pad(f%fps)}
function pos(e){var r=tl.getBoundingClientRect();set((e.clientX-r.left-12)/(r.width-24))}
var drag=false;tl.addEventListener('pointerdown',function(e){drag=true;tl.setPointerCapture(e.pointerId);pos(e)});
tl.addEventListener('pointermove',function(e){if(drag)pos(e)});tl.addEventListener('pointerup',function(){drag=false});
play.addEventListener('click',function(){if(timer){clearInterval(timer);timer=null;play.textContent='▶';return}play.textContent='❚❚';
timer=setInterval(function(){set(pct>=1?0:pct+1/(dur*fps/2))},1000/(fps/2))});
var M={edit:['Edit · 1080p · 24 fps','none'],color:['Color · Lift +0.12 · Sat 1.2','saturate(1.6) contrast(1.15)'],audio:['Audio · −14 LUFS · A2 −3 dB','grayscale(.4)'],export:['Export · H.265 · NVENC · 18 Mbps','brightness(1.15)']};
var tabs=document.querySelectorAll('.tab');tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){x.setAttribute('aria-selected',x===t)});mode.textContent=M[t.dataset.m][0];cv.style.filter=M[t.dataset.m][1]})});
var clips=document.querySelectorAll('.clip');clips.forEach(function(c){c.addEventListener('click',function(){clips.forEach(function(x){x.classList.remove('on')});c.classList.add('on');proj.textContent=c.dataset.c;set(0)})});
set(0.3)}
})();