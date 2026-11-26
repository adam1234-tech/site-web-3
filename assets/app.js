(function(){
var d=document,root=d.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function $(s,c){return (c||d).querySelector(s)}function $$(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))}
/* copy buttons */
var IC='<span class="ico"><svg class="ic-c" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg><svg class="ic-k" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></span><span class="tx">Copy</span>';
$$('pre').forEach(function(p){var b=d.createElement('button');b.className='copy';b.type='button';b.innerHTML=IC;var tx=$('.tx',b),t0;
b.addEventListener('click',function(){var t=p.querySelector('code').innerText;
function done(){b.classList.remove('ok');void b.offsetWidth;b.classList.add('ok');tx.textContent='Copied!';clearTimeout(t0);t0=setTimeout(function(){b.classList.remove('ok');tx.textContent='Copy'},1600)}
function fb(){var a=d.createElement('textarea');a.value=t;d.body.appendChild(a);a.select();try{d.execCommand('copy');done()}catch(e){tx.textContent='Ctrl+C'}a.remove()}
if(navigator.clipboard){navigator.clipboard.writeText(t).then(done,fb)}else fb()});p.appendChild(b)});
/* docs drawer */
var m=$('#menu'),s=$('#side');
if(m&&s){m.addEventListener('click',function(){m.setAttribute('aria-expanded',s.classList.toggle('open'))});
s.addEventListener('click',function(e){if(e.target.tagName==='A'){s.classList.remove('open');m.setAttribute('aria-expanded',false)}});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){s.classList.remove('open');m.setAttribute('aria-expanded',false)}})}
/* FAQ */
$$('.qh').forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-expanded',b.parentNode.classList.toggle('open'))})});
/* sliding indicators */
function slider(box,ind,sel,cur,place){var items=$$(sel,box);
function go(a){if(!a){ind.style.opacity=0;return}place(a);ind.style.opacity=1}
items.forEach(function(a){a.addEventListener('pointerenter',function(){go(a)});a.addEventListener('focus',function(){go(a)})});
box.addEventListener('pointerleave',function(){go(cur())});box.addEventListener('focusout',function(){go(cur())});
go(cur());requestAnimationFrame(function(){requestAnimationFrame(function(){ind.classList.add('anim')})});return go}
function mk(box,c){var e=d.createElement('span');e.className=c;box.appendChild(e);return e}
var lk=$('.links');
if(lk){var bar=lk.parentNode,ni=mk(bar,'ind');
var gn=slider(lk,ni,'a:not(.btn)',function(){return $('a[aria-current]',lk)},function(a){var r=a.getBoundingClientRect(),b=bar.getBoundingClientRect();ni.style.transform='translate3d('+(r.left-b.left)+'px,0,0) scaleX('+r.width+')'});
addEventListener('resize',function(){gn($('a[aria-current]',lk))})}
function vy(i){return function(a){i.style.transform='translate3d(0,'+a.offsetTop+'px,0) scaleY('+a.offsetHeight+')'}}
var sd=$('.side');if(sd){var si=mk(sd,'sind');slider(sd,si,'a',function(){return $('a[aria-current]',sd)},vy(si))}
var toc=$('.toc');
if(toc){var ti=mk(toc,'tind'),ta=$$('a',toc),secs=$$('.doc section'),tg=slider(toc,ti,'a',function(){return $('a.on',toc)},vy(ti));
function spy(){var k=0;secs.forEach(function(x,i){if(x.getBoundingClientRect().top<=130)k=i});if(innerHeight+scrollY>=d.body.scrollHeight-4)k=secs.length-1;
ta.forEach(function(a,i){a.classList.toggle('on',i===k)});tg(ta[k])}
var sp=false;addEventListener('scroll',function(){if(sp)return;sp=true;requestAnimationFrame(function(){spy();sp=false})},{passive:true});addEventListener('resize',spy);spy()}
/* hero timeline demo */
var app=$('#app');
if(app){var tl=$('#tl'),head=$('#head'),flash=$('#flash'),tc=$('#tc'),mode=$('#mode'),tpl=$('#tpl'),pb=$('#play'),vt=$('.track.v',tl),v0=vt.innerHTML,pct=.3,playing=false,raf=0,last=0,DUR=40,FPS=24;
function pad(n){return(n<10?'0':'')+n}
function px(){return 12+pct*(tl.clientWidth-24)}
function set(p){pct=Math.max(0,Math.min(1,p));head.style.transform='translate3d('+px()+'px,0,0)';var f=Math.round(pct*DUR*FPS),s=Math.floor(f/FPS);tc.textContent='00:'+pad(Math.floor(s/60))+':'+pad(s%60)+':'+pad(f%FPS);mode.textContent='1080p · 24 fps · frame '+f}
function waves(){$$('.a .seg',tl).forEach(function(sg,k){if($('.wf',sg))return;var w=d.createElement('span'),h='';w.className='wf';
for(var i=0;i<56;i++){var a=.25+.6*Math.abs(Math.sin(i*.7+k*2)*Math.cos(i*.23+k)),g=Math.min(1,a+.25*Math.abs(Math.sin(i*1.9+k)));h+='<i style="--h:'+a.toFixed(2)+';--g:'+g.toFixed(2)+';--d:-'+((i*37%90)/100).toFixed(2)+'s"></i>'}
w.innerHTML=h;sg.insertBefore(w,sg.firstChild)})}
function tick(t){var n=pct+(t-last)/1000/DUR;last=t;set(n>=1?0:n);raf=requestAnimationFrame(tick)}
function toggle(on){playing=on===undefined?!playing:on;app.classList.toggle('playing',playing);tpl.textContent=playing?'❚❚ Pause':'▶ Play';pb.textContent=playing?'❚❚':'▶';cancelAnimationFrame(raf);if(playing){last=performance.now();raf=requestAnimationFrame(tick)}}
function scrub(e){var r=tl.getBoundingClientRect();set((e.clientX-r.left-12)/(r.width-24))}
var drag=false;tl.addEventListener('pointerdown',function(e){drag=true;tl.setPointerCapture(e.pointerId);scrub(e)});
tl.addEventListener('pointermove',function(e){if(drag)scrub(e)});tl.addEventListener('pointerup',function(){drag=false});
function split(){var p=pct*100,hit=false;$$('.track.v .seg',tl).forEach(function(sg){var l=parseFloat(sg.style.left),w=parseFloat(sg.style.width);
if(!hit&&p>l+1&&p<l+w-1){hit=true;var n=sg.cloneNode(true);n.classList.add('new');sg.style.width=(p-l)+'%';n.style.left=p+'%';n.style.width=(l+w-p)+'%';sg.parentNode.appendChild(n)}});
if(hit){flash.style.setProperty('--fx',px()+'px');flash.classList.remove('go');void flash.offsetWidth;flash.classList.add('go')}
else{var b=$('#ts');b.classList.remove('nope');void b.offsetWidth;b.classList.add('nope')}}
$('#tp').addEventListener('click',function(){toggle()});pb.addEventListener('click',function(){toggle()});$('#ts').addEventListener('click',split);
$('#tr').addEventListener('click',function(){vt.innerHTML=v0});
app.addEventListener('keydown',function(e){if(e.ctrlKey||e.metaKey||e.altKey)return;
if(e.key===' '&&e.target.tagName!=='BUTTON'){e.preventDefault();toggle()}
else if((e.key==='s'||e.key==='S')&&!$('#v-timeline').hidden){e.preventDefault();split()}});
var tabs=$$('.tab',app);tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){x.setAttribute('aria-selected',x===t)});
$$('.view',app).forEach(function(v){v.hidden=v.id!=='v-'+t.dataset.v});if(t.dataset.v==='timeline')set(pct);else toggle(false)})});
var chips=$$('.chip',app),eb=$('#eb'),ebar=$('#ebar'),est=$('#est'),busy=false;
chips.forEach(function(c){c.addEventListener('click',function(){chips.forEach(function(x){x.setAttribute('aria-pressed',x===c)})})});
eb.addEventListener('click',function(){if(busy)return;busy=true;var t0=performance.now(),n=$('.chip[aria-pressed=true]',app).dataset.n;
(function f(t){var q=Math.min(1,(t-t0)/2400);ebar.style.transform='scaleX('+q+')';est.textContent=q<1?'Encoding '+Math.round(q*100)+'% · '+n:'Done · '+n+' written to disk. 0 bytes uploaded.';if(q<1)requestAnimationFrame(f);else busy=false})(t0)});
addEventListener('resize',function(){set(pct)});waves();set(.3)}
/* hero ambient parallax */
var hero=$('.hero');
if(hero&&!RM){var tk=false;addEventListener('scroll',function(){if(tk)return;tk=true;requestAnimationFrame(function(){hero.style.setProperty('--sy',Math.min(scrollY,900));tk=false})},{passive:true})}
/* cursor spotlight */
if(!RM){$$('.card,.box,.dlin').forEach(function(e){e.classList.add('spot')});
d.addEventListener('pointermove',function(e){var el=e.target.closest&&e.target.closest('.spot');if(!el)return;var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true})}
/* scroll reveal */
if(!RM&&'IntersectionObserver' in window){
var all=$$('main h1,main h2,.hero .sub,.cta,.note,.app,.lead,.lede,.grid .card,.rel .box,.banner,.dlcard,.qa,main table,.doc section>*,main pre,.two>div>p');
var els=all.filter(function(e,i){return all.indexOf(e)===i&&!all.some(function(o){return o!==e&&o.contains(e)})}),cnt=new Map();
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var e=en.target;io.unobserve(e);e.classList.add('in');
var w=(parseFloat(e.style.transitionDelay)||0)*1000+700;setTimeout(function(){e.classList.remove('rv','in');e.style.transitionDelay=''},w)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
els.forEach(function(e){var p=e.parentNode,i=cnt.get(p)||0;cnt.set(p,i+1);e.classList.add('rv');e.style.transitionDelay=(Math.min(i,6)*60)+'ms';io.observe(e)})}
/* page transitions */
if(!RM){addEventListener('pageshow',function(){d.body.classList.remove('leaving')});
d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');
if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;
var u=a.getAttribute('href');if(!u||u.charAt(0)==='#'||/^(mailto:|tel:|javascript:)/.test(u))return;
if(a.protocol!==location.protocol||a.host!==location.host||(a.pathname===location.pathname&&a.hash))return;
e.preventDefault();d.body.classList.add('leaving');setTimeout(function(){location.href=a.href},140)})}
})();
