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

  const darkSwitch=document.getElementById('darkModeSwitch');
  const darkLabel=document.getElementById('darkModeLabel');
  function applyDarkMode(isDark){
    body.classList.toggle('dark-mode',isDark);
    if(darkLabel)darkLabel.textContent=isDark?'Modo Claro':'Modo Escuro';
    if(darkSwitch)darkSwitch.checked=isDark;
  }
  const savedDarkMode=localStorage.getItem('cc-dark-mode')==='1';
  applyDarkMode(savedDarkMode);
  darkSwitch?.addEventListener('change',()=>{
    applyDarkMode(darkSwitch.checked);
    localStorage.setItem('cc-dark-mode',darkSwitch.checked?'1':'0');
  });

  function splitHeadlineWords(el){
    if(!el||el.dataset.split)return;
    el.dataset.split='true';
    const text=el.textContent;
    el.setAttribute('aria-label',text);
    const words=text.split(' ');
    el.innerHTML='';
    words.forEach((word,i)=>{
      const mask=document.createElement('span');
      mask.className='wordMask';
      mask.setAttribute('aria-hidden','true');
      const inner=document.createElement('span');
      inner.className='wordInner';
      inner.textContent=word;
      inner.style.transitionDelay=`${i*55}ms`;
      mask.append(inner);
      el.append(mask);
      if(i<words.length-1)el.append(' ');
    });
  }
  if(!reduceMotion)splitHeadlineWords(document.querySelector('#comparar .sectionHead h1'));

  const heroVisual = document.querySelector('.heroVisual');
  const pointerFine=window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function applyTilt(el,maxTilt){
    el.addEventListener('pointermove',event=>{
      const rect=el.getBoundingClientRect();
      const px=(event.clientX-rect.left)/rect.width-.5;
      const py=(event.clientY-rect.top)/rect.height-.5;
      const rotateY=px*maxTilt*2;
      const rotateX=-py*maxTilt*2;
      el.style.transform=`perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
    });
    el.addEventListener('pointerleave',()=>{el.style.transform=''});
  }

  if(!reduceMotion&&pointerFine){
    if(heroVisual)applyTilt(heroVisual,9);
    document.querySelectorAll('.kpi,.insightCard').forEach(el=>applyTilt(el,5));
  }

  const heroSection=document.querySelector('.hero');
  if(heroSection&&!reduceMotion){
    let parallaxTicking=false;
    const updateParallax=()=>{
      parallaxTicking=false;
      const rect=heroSection.getBoundingClientRect();
      const progress=Math.min(1,Math.max(0,-rect.top/(rect.height||1)));
      heroSection.style.setProperty('--parallaxGlow',`${(progress*70).toFixed(1)}px`);
      heroSection.style.setProperty('--parallaxCar',`${(progress*34).toFixed(1)}px`);
    };
    window.addEventListener('scroll',()=>{if(!parallaxTicking){parallaxTicking=true;requestAnimationFrame(updateParallax)}},{passive:true});
    updateParallax();
  }

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
  document.querySelectorAll('.selectCard').forEach((el,index)=>{el.style.transitionDelay=`${index*90}ms`});

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
      fill.style.transitionDelay=`${index*90}ms`;
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
      ['Seguro',label=>label==='Estimativa de seguro anual'],
      ['Manutenção',label=>label.startsWith('Revisão/Manutenção Anual')],
      ['IPVA',label=>label==='IPVA anual'],
      ['Energia',label=>label==='Custo com energia anual'],
      ['Combustível',label=>label==='Custo com combustível anual']
    ];
    const colors=['#075b2b','#20a560','#ffd43b','#83d7a7','#d9ff6d'];
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
      costs.forEach((value,catIndex)=>{
        const segment=createElement('span','stackSegment');
        segment.style.setProperty('--segment-width',`${(value/total)*100}%`);
        segment.style.setProperty('--tooltip-color',colors[catIndex]);
        segment.style.transitionDelay=`${index*90}ms`;
        segment.dataset.tooltip=`${categories[catIndex][0]}: ${moneyFormat.format(value)}/ano`;
        track.append(segment);
      });
      row.append(head,track);
      list.append(row);
    });
    const legend=createElement('div','chartLegend');
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
        clone.innerHTML='<span class="stickyGuideTitle">Comparando</span>';
      }else{
        const name=cell.textContent.trim();
        clone.textContent='';
        clone.append(createElement('span','stickyModelIndex',String(index).padStart(2,'0')));
        const label=createElement('span','stickyModelName',name);
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

  let columnOrder=[];
  let columnDrag=null;

  function columnKeys(table){
    return [...table.tHead.rows[0].cells].slice(1).map(cell=>cell.textContent.trim());
  }

  function updateColumnOrder(table){
    columnOrder=columnKeys(table);
  }

  function applyColumnOrder(table){
    if(!columnOrder.length)return;
    const header=[...table.tHead.rows[0].cells];
    const current=header.slice(1).map(cell=>cell.textContent.trim());
    const desired=[...columnOrder.filter(key=>current.includes(key)),...current.filter(key=>!columnOrder.includes(key))];
    desired.forEach((key,targetIndex)=>{
      const sourceIndex=[...table.tHead.rows[0].cells].slice(1).findIndex(cell=>cell.textContent.trim()===key);
      if(sourceIndex===targetIndex)return;
      [...table.rows].forEach(row=>{
        const source=row.cells[sourceIndex+1];
        const reference=row.cells[targetIndex+1];
        if(source&&reference)row.insertBefore(source,reference);
      });
    });
    updateColumnOrder(table);
  }

  function cellsForColumn(table,index){
    return [...table.rows].map(row=>row.cells[index]).filter(Boolean);
  }

  function clearColumnDragStyles(){
    document.querySelectorAll('.column-dragging,.column-drag-target').forEach(cell=>cell.classList.remove('column-dragging','column-drag-target'));
  }

  function refreshStickyAfterReorder(table){
    buildInsights();
    requestAnimationFrame(()=>buildStickyComparison(tableData()));
  }

  function reorderColumn(table,fromIndex,toIndex,after){
    if(fromIndex===toIndex&&!after)return;
    [...table.rows].forEach(row=>{
      const source=row.cells[fromIndex];
      const target=row.cells[toIndex];
      if(!source||!target)return;
      row.insertBefore(source,after?target.nextSibling:target);
    });
    updateColumnOrder(table);
    refreshStickyAfterReorder(table);
  }

  function attachColumnReorder(table){
    if(table.dataset.columnReorderReady==='true')return;
    table.dataset.columnReorderReady='true';
    table.addEventListener('pointerdown',event=>{
      const cell=event.target.closest('th,td');
      if(!cell||!table.contains(cell)||cell.cellIndex===0||event.button!==0)return;
      const headerCell=table.tHead.rows[0].cells[cell.cellIndex];
      columnDrag={table,fromIndex:cell.cellIndex,pointerId:event.pointerId,name:headerCell.textContent.trim(),started:false,targetIndex:null,after:false,hint:null,startX:event.clientX,startY:event.clientY};
      cell.setPointerCapture?.(event.pointerId);
    });
    table.addEventListener('pointermove',event=>{
      if(!columnDrag||columnDrag.table!==table||columnDrag.pointerId!==event.pointerId)return;
      if(!columnDrag.started){
        if(Math.hypot(event.clientX-columnDrag.startX,event.clientY-columnDrag.startY)<8)return;
        columnDrag.started=true;
        document.body.classList.add('column-reordering');
        clearColumnHoverStyles();
        cellsForColumn(table,columnDrag.fromIndex).forEach(cell=>cell.classList.add('column-dragging'));
        const hint=createElement('div','comparisonColumnDragHint',columnDrag.name);
        document.body.append(hint);
        columnDrag.hint=hint;
      }
      event.preventDefault();
      if(columnDrag.hint){
        columnDrag.hint.style.left=Math.min(window.innerWidth-230,Math.max(12,event.clientX+14))+'px';
        columnDrag.hint.style.top=Math.max(12,event.clientY+14)+'px';
      }
      const target=document.elementFromPoint(event.clientX,event.clientY)?.closest?.('th,td');
      clearColumnDragStyles();
      cellsForColumn(table,columnDrag.fromIndex).forEach(cell=>cell.classList.add('column-dragging'));
      if(!target||!table.contains(target)||target.cellIndex===0)return;
      columnDrag.targetIndex=target.cellIndex;
      const rect=target.getBoundingClientRect();
      columnDrag.after=event.clientX>rect.left+rect.width/2;
      cellsForColumn(table,target.cellIndex).forEach(item=>item.classList.add('column-drag-target'));
    });
    const complete=event=>{
      if(!columnDrag||columnDrag.table!==table||columnDrag.pointerId!==event.pointerId)return;
      const drag=columnDrag;
      columnDrag=null;
      drag.hint?.remove();
      document.body.classList.remove('column-reordering');
      clearColumnDragStyles();
      if(drag.started&&drag.targetIndex&&drag.targetIndex!==drag.fromIndex){
        reorderColumn(table,drag.fromIndex,drag.targetIndex,drag.after);
      }
    };
    table.addEventListener('pointerup',complete);
    table.addEventListener('pointercancel',complete);

    let nativeDrag=null;
    [...table.querySelectorAll('th:not(:first-child),td:not(:first-child)')].forEach(cell=>cell.draggable=true);
    table.addEventListener('dragstart',event=>{
      const cell=event.target.closest('th,td');
      if(!cell||cell.cellIndex===0)return;
      nativeDrag={fromIndex:cell.cellIndex,table};
      event.dataTransfer.effectAllowed='move';
      cellsForColumn(table,cell.cellIndex).forEach(item=>item.classList.add('column-dragging'));
    });
    table.addEventListener('dragover',event=>{
      const cell=event.target.closest('th,td');
      if(!nativeDrag||!cell||cell.cellIndex===0)return;
      event.preventDefault();
      clearColumnDragStyles();
      cellsForColumn(table,nativeDrag.fromIndex).forEach(item=>item.classList.add('column-dragging'));
      cellsForColumn(table,cell.cellIndex).forEach(item=>item.classList.add('column-drag-target'));
    });
    table.addEventListener('drop',event=>{
      const cell=event.target.closest('th,td');
      if(!nativeDrag||!cell||cell.cellIndex===0)return;
      event.preventDefault();
      const rect=cell.getBoundingClientRect();
      const after=event.clientX>rect.left+rect.width/2;
      const from=nativeDrag.fromIndex,to=cell.cellIndex;
      nativeDrag=null;
      clearColumnDragStyles();
      if(from!==to)reorderColumn(table,from,to,after);
    });
    table.addEventListener('dragend',()=>{nativeDrag=null;clearColumnDragStyles();});

    function clearColumnHoverStyles(){
      table.querySelectorAll('.col-hover,.col-recede').forEach(cell=>cell.classList.remove('col-hover','col-recede'));
    }
    table.addEventListener('pointerover',event=>{
      if(columnDrag||nativeDrag||document.body.classList.contains('column-reordering'))return;
      const cell=event.target.closest('th,td');
      if(!cell||!table.contains(cell)||cell.cellIndex===0)return;
      clearColumnHoverStyles();
      cellsForColumn(table,cell.cellIndex).forEach(item=>item.classList.add('col-hover'));
      const headRow=table.tHead.rows[0];
      [...headRow.cells].forEach((headCell,index)=>{
        if(index===0||index===cell.cellIndex)return;
        cellsForColumn(table,index).forEach(item=>item.classList.add('col-recede'));
      });
    });
    table.addEventListener('pointerleave',()=>{if(!columnDrag&&!nativeDrag)clearColumnHoverStyles()});

  }

  function animateTable(){
    const data=tableData();
    if(!data){removeStickyComparison();return}
    applyColumnOrder(data.table);
    const orderedData=tableData();
    orderedData.rows.forEach((row,index)=>{
      row.classList.add('row-motion');
      row.style.transitionDelay=`${Math.min((index%8)*38,266)}ms`;
      if(rowObserver)rowObserver.observe(row);else row.classList.add('is-visible');
    });
    attachColumnReorder(orderedData.table);
    buildInsights();
    requestAnimationFrame(()=>buildStickyComparison(orderedData));
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

