(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body=document.body;
  const header=document.querySelector('.topbar');
  const selectors=document.getElementById('selectors');
  const summary=document.getElementById('summary');
  const tableWrap=document.getElementById('tableWrap');
  const compareButton=document.getElementById('compare');
  const moneyFormat=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});

  body.classList.add('motion-ready');

  const updateHeader=()=>header?.classList.toggle('is-scrolled',window.scrollY>18);
  window.addEventListener('scroll',updateHeader,{passive:true});
  updateHeader();

  let revealObserver;
  if(!reduceMotion&&'IntersectionObserver' in window){
    revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -7% 0px'});
  }

  function observeReveal(scope=document){
    scope.querySelectorAll?.('[data-reveal]:not(.is-visible)').forEach((el,index)=>{
      el.style.transitionDelay=`${Math.min(index*55,260)}ms`;
      if(revealObserver)revealObserver.observe(el);else el.classList.add('is-visible');
    });
  }

  document.querySelectorAll('.sectionHead,.selectCard,.infobar,.premissas,.notes,.mini,.contact,.legalPanel').forEach(el=>el.dataset.reveal='');
  observeReveal();

  function syncSelectedCards(changedSelect){
    selectors?.querySelectorAll('.selectCard').forEach(card=>{
      const select=card.querySelector('select');
      card.classList.toggle('is-selected',Boolean(select?.value));
    });
    const card=changedSelect?.closest('.selectCard');
    if(card){
      card.classList.remove('selection-pulse');
      requestAnimationFrame(()=>card.classList.add('selection-pulse'));
      window.setTimeout(()=>card.classList.remove('selection-pulse'),600);
    }
  }

  selectors?.addEventListener('change',event=>{
    if(event.target.matches('select'))syncSelectedCards(event.target);
  });
  syncSelectedCards();

  compareButton?.addEventListener('click',()=>{
    compareButton.classList.remove('is-loading');
    requestAnimationFrame(()=>compareButton.classList.add('is-loading'));
    window.setTimeout(()=>compareButton.classList.remove('is-loading'),620);
  });

  function parseNumber(text){
    const normalized=String(text).replace(/[^0-9,.-]/g,'').replace(/\./g,'').replace(',','.');
    const number=Number(normalized);
    return Number.isFinite(number)?number:0;
  }

  function animateMoney(element){
    const original=element.textContent.trim();
    if(!original.startsWith('R$'))return;
    const target=parseNumber(original);
    if(reduceMotion||target<=0){element.textContent=moneyFormat.format(target);return}
    const start=performance.now();
    const duration=780;
    const step=now=>{
      const progress=Math.min(1,(now-start)/duration);
      const eased=1-Math.pow(1-progress,4);
      element.textContent=moneyFormat.format(target*eased);
      if(progress<1)requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function animateSummary(){
    summary?.querySelectorAll('.kpi').forEach((card,index)=>{
      card.dataset.reveal='';
      card.style.transitionDelay=`${index*70}ms`;
      requestAnimationFrame(()=>card.classList.add('is-visible'));
      const strong=card.querySelector('strong');
      if(strong)animateMoney(strong);
    });
  }

  function tableData(){
    const table=tableWrap?.querySelector('table');
    if(!table)return null;
    const names=[...table.querySelectorAll('thead th')].slice(1).map(th=>th.textContent.trim());
    const rows=[...table.querySelectorAll('tbody tr')];
    const valuesByLabel=(test)=>{
      const row=rows.find(item=>test(item.cells[0]?.textContent.trim()||''));
      return row?[...row.cells].slice(1).map(cell=>parseNumber(cell.textContent)):[];
    };
    return {table,names,rows,valuesByLabel};
  }

  function createElement(tag,className,text){
    const element=document.createElement(tag);
    if(className)element.className=className;
    if(text!==undefined)element.textContent=text;
    return element;
  }

  function buildTcoChart(card,data){
    const tco=data.valuesByLabel(label=>/^TCO em /.test(label));
    if(!tco.length)return false;
    const max=Math.max(...tco,1),min=Math.min(...tco);
    const list=createElement('div','chartList');
    data.names.forEach((name,index)=>{
      const row=createElement('div','chartRow');
      const head=createElement('div','chartRowHead');
      head.append(createElement('strong','',name),createElement('span','',moneyFormat.format(tco[index]||0)));
      const track=createElement('div','chartTrack');
      const fill=createElement('div',`chartFill${tco[index]===min?' is-best':''}`);
      fill.style.setProperty('--bar-width',`${Math.max(8,(tco[index]/max)*100)}%`);
      track.append(fill);
      row.append(head,track);
      if(tco[index]!==max){
        const saving=createElement('span','savingLabel',`Economia de ${moneyFormat.format(max-tco[index])} frente ao maior TCO`);
        row.append(saving);
      }
      list.append(row);
    });
    card.append(list);
    return true;
  }

  function buildCostChart(card,data){
    const categories=[
      ['Seguro',label=>label==='Seguro anual'],
      ['Manutenção',label=>label.startsWith('Revisão/Manutenção Anual')],
      ['IPVA',label=>label==='IPVA anual'],
      ['Energia',label=>label==='Energia anual'],
      ['Combustível',label=>label==='Combustível anual']
    ];
    const series=categories.map(([,test])=>data.valuesByLabel(test));
    if(!series.some(values=>values.length))return false;
    const list=createElement('div','chartList');
    data.names.forEach((name,index)=>{
      const costs=series.map(values=>values[index]||0);
      const total=Math.max(1,costs.reduce((sum,value)=>sum+value,0));
      const row=createElement('div','chartRow');
      const head=createElement('div','chartRowHead');
      head.append(createElement('strong','',name),createElement('span','',moneyFormat.format(total)+'/ano'));
      const track=createElement('div','stackTrack');
      costs.forEach(value=>{
        const segment=createElement('span','stackSegment');
        segment.style.setProperty('--segment-width',`${(value/total)*100}%`);
        segment.title=moneyFormat.format(value);
        track.append(segment);
      });
      row.append(head,track);
      list.append(row);
    });
    const legend=createElement('div','chartLegend');
    const colors=['#075b2b','#20a560','#ffd43b','#83d7a7','#d9ff6d'];
    categories.forEach(([name],index)=>{
      const item=createElement('span','',name);
      item.style.setProperty('--legend',colors[index]);
      legend.append(item);
    });
    card.append(list,legend);
    return true;
  }

  function insightCard(kicker,title,note){
    const card=createElement('article','insightCard');
    const head=createElement('div','insightHead');
    const copy=createElement('div');
    copy.append(createElement('span','',kicker),createElement('h3','',title));
    head.append(copy,createElement('small','',note));
    card.append(head);
    return card;
  }

  function buildInsights(){
    const data=tableData();
    document.getElementById('visualInsights')?.remove();
    if(!data||!data.names.length)return;
    const section=createElement('section','visualInsights');
    section.id='visualInsights';
    section.setAttribute('aria-label','Gráficos animados do comparativo');
    section.dataset.reveal='';
    const tcoCard=insightCard('Visão comparativa','TCO do período','Menor é melhor');
    const costCard=insightCard('Composição anual','Custos recorrentes','Valores estimados');
    if(buildTcoChart(tcoCard,data))section.append(tcoCard);
    if(buildCostChart(costCard,data))section.append(costCard);
    summary?.insertAdjacentElement('afterend',section);
    observeReveal(section.parentElement);
    requestAnimationFrame(()=>requestAnimationFrame(()=>section.classList.add('is-live')));
  }

  let stickyComparison;
  let stickyResizeObserver;
  let stickyFrame;

  function removeStickyComparison(){
    stickyResizeObserver?.disconnect();
    stickyResizeObserver=null;
    stickyComparison?.shell.remove();
    stickyComparison=null;
  }

  function measureStickyComparison(){
    if(!stickyComparison)return;
    const {table,sourceTable,sourceCells,cloneCells}=stickyComparison;
    sourceCells.forEach((cell,index)=>{
      const width=cell.getBoundingClientRect().width;
      const clone=cloneCells[index];
      clone.style.width=`${width}px`;
      clone.style.minWidth=`${width}px`;
      clone.style.maxWidth=`${width}px`;
    });
    const tableWidth=sourceTable.getBoundingClientRect().width;
    table.style.width=`${tableWidth}px`;
    table.style.minWidth=`${tableWidth}px`;
    syncStickyComparison();
  }

  function syncStickyComparison(){
    if(!stickyComparison||!tableWrap)return;
    if(stickyFrame)cancelAnimationFrame(stickyFrame);
    stickyFrame=requestAnimationFrame(()=>{
      stickyFrame=null;
      if(!stickyComparison)return;
      const {shell,table,sourceTable,sourceHead}=stickyComparison;
      const wrapRect=tableWrap.getBoundingClientRect();
      const headRect=sourceHead.getBoundingClientRect();
      const tableRect=sourceTable.getBoundingClientRect();
      const headerBottom=Math.max(0,header?.getBoundingClientRect().bottom||0);
      const stickyTop=headerBottom+8;
      const visibleWidth=Math.max(0,Math.min(wrapRect.right,window.innerWidth)-Math.max(wrapRect.left,0));
      const active=headRect.bottom<stickyTop&&tableRect.bottom>stickyTop+shell.offsetHeight+18&&visibleWidth>80;
      shell.style.top=`${stickyTop}px`;
      shell.style.left=`${Math.max(wrapRect.left,0)}px`;
      shell.style.width=`${visibleWidth}px`;
      table.style.transform=`translate3d(${-tableWrap.scrollLeft}px,0,0)`;
      shell.classList.toggle('is-active',active);
    });
  }

  function buildStickyComparison(data){
    removeStickyComparison();
    const sourceHead=data?.table?.tHead;
    if(!sourceHead||!tableWrap||!data.table.isConnected)return;
    const shell=createElement('div','comparisonStickyBar');
    shell.setAttribute('aria-hidden','true');
    const table=createElement('table','comparisonStickyTable');
    const head=sourceHead.cloneNode(true);
    const sourceCells=[...sourceHead.rows[0].cells];
    const cloneCells=[...head.rows[0].cells];
    sourceCells.forEach((cell,index)=>{
      const width=cell.getBoundingClientRect().width;
      const clone=cloneCells[index];
      clone.style.width=`${width}px`;
      clone.style.minWidth=`${width}px`;
      clone.style.maxWidth=`${width}px`;
      if(index===0){
        clone.innerHTML='<span class="stickyGuideTitle">Comparando</span><small class="stickyGuideHint">colunas alinhadas</small>';
      }else{
        const name=cell.textContent.trim();
        clone.textContent='';
        clone.append(createElement('span','stickyModelIndex',String(index).padStart(2,'0')));
        const label=createElement('span','stickyModelName',name);
        label.append(createElement('small','stickyModelHint','modelo selecionado'));
        clone.append(label);
      }
    });
    const tableWidth=data.table.getBoundingClientRect().width;
    table.style.width=`${tableWidth}px`;
    table.style.minWidth=`${tableWidth}px`;
    table.append(head);
    shell.append(table);
    document.body.append(shell);
    stickyComparison={shell,table,sourceTable:data.table,sourceHead,sourceCells,cloneCells};
    if('ResizeObserver' in window){
      stickyResizeObserver=new ResizeObserver(measureStickyComparison);
      stickyResizeObserver.observe(data.table);
      if(header)stickyResizeObserver.observe(header);
    }
    syncStickyComparison();
  }

  window.addEventListener('scroll',syncStickyComparison,{passive:true});
  window.addEventListener('resize',syncStickyComparison,{passive:true});
  tableWrap?.addEventListener('scroll',syncStickyComparison,{passive:true});

  let rowObserver;
  if(!reduceMotion&&'IntersectionObserver' in window){
    rowObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');rowObserver.unobserve(entry.target)}
      });
    },{threshold:.04,rootMargin:'0px 0px -3% 0px'});
  }

  function animateTable(){
    const data=tableData();
    if(!data){removeStickyComparison();return}
    data.rows.forEach((row,index)=>{
      row.classList.add('row-motion');
      row.style.transitionDelay=`${Math.min((index%8)*38,266)}ms`;
      if(rowObserver)rowObserver.observe(row);else row.classList.add('is-visible');
    });
    buildInsights();
    requestAnimationFrame(()=>buildStickyComparison(data));
  }

  const summaryObserver=summary?new MutationObserver(()=>animateSummary()):null;
  summaryObserver?.observe(summary,{childList:true});
  const tableObserver=tableWrap?new MutationObserver(()=>animateTable()):null;
  tableObserver?.observe(tableWrap,{childList:true});

  const catalog=document.getElementById('catalogCount');
  if(catalog&&catalog.textContent.trim()){
    const total=parseNumber(catalog.textContent);
    if(!reduceMotion&&total>0){
      const start=performance.now();
      const tick=now=>{
        const progress=Math.min(1,(now-start)/700);
        catalog.textContent=Math.round(total*(1-Math.pow(1-progress,3)));
        if(progress<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  if(summary?.children.length)animateSummary();
  if(tableWrap?.querySelector('table'))animateTable();
})();
