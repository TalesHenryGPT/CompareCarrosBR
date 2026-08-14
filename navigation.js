(()=>{
  const header=document.querySelector('.topbar');
  const links=[...document.querySelectorAll('.mainnav a[href^="#"]')];
  const targets=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if(!header||!links.length||!targets.length)return;

  let activeId='';
  let ticking=false;
  let manualTarget='';
  let manualUntil=0;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

  function setActive(id){
    if(!id||id===activeId)return;
    activeId=id;
    links.forEach(link=>{
      const active=link.getAttribute('href')===`#${id}`;
      link.classList.toggle('active',active);
      if(active)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }

  function updateActive(){
    ticking=false;
    if(manualTarget&&Date.now()<manualUntil){
      setActive(manualTarget);
      return;
    }
    manualTarget='';
    const ordered=targets.map(section=>({
      section,
      top:section.getBoundingClientRect().top+window.scrollY
    })).sort((a,b)=>a.top-b.top);
    const compareStart=document.querySelector('#comparar')?.getBoundingClientRect().top+window.scrollY;
    if(compareStart&&window.scrollY+header.offsetHeight+18<compareStart){
      setActive('inicio');
      return;
    }
    const maxScroll=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
    let current=ordered[0].section;
    for(const item of ordered){
      const sectionHeight=item.section.getBoundingClientRect().height;
      if(item.section.id==='rankings'&&sectionHeight<8)continue;
      let activation=item.top-header.offsetHeight-18;
      if(item.section.id==='sobre')activation=Math.min(activation,Math.max(0,maxScroll-100));
      if(item.section.id==='contato')activation=Math.min(activation,Math.max(0,maxScroll-15));
      if(activation<=window.scrollY)current=item.section;
    }
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-3)current=ordered.at(-1).section;
    setActive(current.id);
  }

  function scheduleUpdate(){
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(updateActive);
  }

  links.forEach(link=>link.addEventListener('click',event=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(!target)return;
    event.preventDefault();
    manualTarget=target.id;
    manualUntil=Date.now()+2600;
    setActive(target.id);
    const top=Math.max(0,target.getBoundingClientRect().top+window.scrollY-header.offsetHeight-14);
    window.scrollTo({top,behavior:reducedMotion.matches?'auto':'smooth'});
    history.replaceState(null,'',`#${target.id}`);
  }));

  window.addEventListener('scroll',scheduleUpdate,{passive:true});
  window.addEventListener('resize',scheduleUpdate,{passive:true});
  window.addEventListener('wheel',()=>{manualTarget='';manualUntil=0},{passive:true});
  window.addEventListener('touchstart',()=>{manualTarget='';manualUntil=0},{passive:true});
  window.addEventListener('load',scheduleUpdate,{once:true});
  updateActive();
})();
