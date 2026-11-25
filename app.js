const KEY='fi_site_settings_v1', DB='fi_gallery_db', STORE='photos';
const defaults={startDate:'',heroEyebrow:'UM CANTINHO SÓ NOSSO',heroTitle:'F + I',heroSubtitle:'Minha parte favorita da vida é viver os capítulos ao seu lado.',heroNote:'Com carinho, para sempre. ♡',timerHeading:'O tempo fica mais bonito com você.',timerDescription:'E cada segundo merece ser lembrado.',timerCaption:'Uma história que continua sendo escrita...',galleryHeading:'Um álbum chamado nós.',galleryDescription:'Porque alguns momentos merecem ficar guardados para sempre.',placeHeading:'Onde uma lembrança mora.',placeDescription:'Um lugar que tem um significado só nosso.',mapQuery:'Povoado Brejo de São Félix, Maranhão, Brasil',mapUrl:'',closingTitle:'Que a vida floresça ao nosso lado.',closingText:'Com amor, F + I',footerText:'Feito com carinho.',verses:[{text:'O amor é paciente, o amor é bondoso.',ref:'1 Coríntios 13:4'},{text:'Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.',ref:'Colossenses 3:14'}]};
function settings(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}}
function putSettings(s){localStorage.setItem(KEY,JSON.stringify(s))}
function setText(id,value){const el=document.getElementById(id);if(el&&value!==undefined)el.textContent=value}
function renderVerses(s){const box=document.getElementById('verseList');if(!box)return;box.innerHTML='';(s.verses||[]).forEach(v=>{const article=document.createElement('article');article.className='verse';const q=document.createElement('blockquote');q.textContent='“'+v.text+'”';const c=document.createElement('cite');c.textContent=v.ref;article.append(q,c);box.append(article)})}
function renderMap(s){const wrap=document.getElementById('mapWrap'),link=document.getElementById('mapExternal');if(!wrap)return;const q=s.mapQuery||'';if(q){const iframe=document.createElement('iframe');iframe.loading='lazy';iframe.referrerPolicy='no-referrer-when-downgrade';iframe.src='https://maps.google.com/maps?q='+encodeURIComponent(q)+'&output=embed';wrap.replaceChildren(iframe);link.href=s.mapUrl||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);link.hidden=false}else{wrap.innerHTML='<div class="map-placeholder">O mapa será configurado no painel FAB.</div>';link.hidden=true}}
function openDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open(DB,1);req.onupgradeneeded=()=>req.result.createObjectStore(STORE,{keyPath:'id',autoIncrement:true});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function allPhotos(){const db=await openDB();return new Promise((res,rej)=>{const r=db.transaction(STORE).objectStore(STORE).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function renderGallery(){const grid=document.getElementById('galleryGrid');if(!grid)return;const photos=await allPhotos();grid.innerHTML='';if(!photos.length){grid.innerHTML='<div class="empty-gallery">Nossas fotos vão aparecer aqui. ♡</div>';return}photos.forEach(p=>{const card=document.createElement('figure');card.className='photo-card';const img=document.createElement('img');img.src=URL.createObjectURL(p.blob);img.alt=p.caption||'Foto especial';const cap=document.createElement('p');cap.textContent=p.caption||'♡';card.append(img,cap);grid.append(card)})}
function tick(s){if(!s.startDate){setText('days','0');setText('startDateLabel','Configure a data inicial no painel FAB.');return}const start=new Date(s.startDate).getTime(),now=Date.now();if(!Number.isFinite(start)){setText('startDateLabel','Configure uma data válida no painel FAB.');return}let diff=Math.max(0,now-start);const days=Math.floor(diff/86400000);diff%=86400000;setText('days',days.toLocaleString('pt-BR'));setText('hours',String(Math.floor(diff/3600000)).padStart(2,'0'));diff%=3600000;setText('minutes',String(Math.floor(diff/60000)).padStart(2,'0'));setText('seconds',String(Math.floor(diff/1000)%60).padStart(2,'0'));setText('startDateLabel','Desde '+new Date(start).toLocaleString('pt-BR',{dateStyle:'long',timeStyle:'short'}))}
async function init(){const s=settings();['heroEyebrow','heroTitle','heroSubtitle','heroNote','timerHeading','timerDescription','timerCaption','galleryHeading','galleryDescription','placeHeading','placeDescription','closingTitle','closingText','footerText'].forEach(k=>setText(k,s[k]));renderVerses(s);renderMap(s);await renderGallery();tick(s);setInterval(()=>tick(s),1000);const menu=document.querySelector('.menu-toggle');menu?.addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'))}
init();
// Alternância entre modo claro e escuro
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  const dark = theme === "dark";

  document.body.classList.toggle("dark-mode", dark);

  if (themeToggle) {
    themeToggle.textContent = dark ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Ativar modo claro" : "Ativar modo escuro"
    );
  }
}

// Recupera o tema escolhido anteriormente
const savedTheme = localStorage.getItem("siteTheme") || "light";
applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark-mode")
    ? "light"
    : "dark";

  localStorage.setItem("siteTheme", newTheme);
  applyTheme(newTheme);
});