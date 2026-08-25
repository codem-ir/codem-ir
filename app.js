let allNews=[],currentCat='all';
const newsEl=document.getElementById('news'),searchEl=document.getElementById('search');
async function loadNews(){
 try{
  const r=await fetch('news.json?'+Date.now()); allNews=await r.json();
  document.getElementById('updated').textContent=new Date().toLocaleDateString('fa-IR');
  render();
 }catch(e){newsEl.innerHTML='<p>فعلاً خبری برای نمایش نیست. فایل data/news.json را بررسی کنید.</p>'}
}
function render(){
 const q=searchEl.value.trim().toLowerCase();
 const list=allNews.filter(n=>(currentCat==='all'||n.category===currentCat)&&(!q||(n.title+' '+n.summary).toLowerCase().includes(q)));
 newsEl.innerHTML=list.length?list.map(n=>`<article class="card"><div class="thumb">${n.icon||'🎮'}</div><div class="body"><div class="meta">${n.category_label} · ${n.date}</div><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.summary)}</p><a class="read" target="_blank" rel="noopener" href="${safeUrl(n.url)}">ادامه خبر ←</a></div></article>`).join(''):'<p>خبری پیدا نشد.</p>';
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function safeUrl(u){try{let x=new URL(u);return ['https:','http:'].includes(x.protocol)?x.href:'#'}catch{return '#'}}
document.querySelectorAll('.cats button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.cats button').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentCat=b.dataset.cat;render()});
document.querySelector('.cats button').classList.add('active');searchEl.oninput=render;loadNews();
