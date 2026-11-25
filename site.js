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
})();