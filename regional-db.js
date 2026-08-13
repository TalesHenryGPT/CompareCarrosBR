const REGIONAL_DB={
  updatedAt:'13/08/2026',
  states:{AC:'Acre',AL:'Alagoas',AP:'Amapá',AM:'Amazonas',BA:'Bahia',CE:'Ceará',DF:'Distrito Federal',ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',MT:'Mato Grosso',MS:'Mato Grosso do Sul',MG:'Minas Gerais',PA:'Pará',PB:'Paraíba',PR:'Paraná',PE:'Pernambuco',PI:'Piauí',RJ:'Rio de Janeiro',RN:'Rio Grande do Norte',RS:'Rio Grande do Sul',RO:'Rondônia',RR:'Roraima',SC:'Santa Catarina',SP:'São Paulo',SE:'Sergipe',TO:'Tocantins'},
  sources:{
    fuel:{label:'ANP — Levantamento de Preços de Combustíveis',url:'https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas',reference:'02/08/2026 a 08/08/2026'},
    energy:{label:'ANEEL — Tarifas Homologadas de Distribuidoras',url:'https://dadosabertos.aneel.gov.br/dataset/tarifas-distribuidoras-energia-eletrica',reference:'tarifa B1 residencial convencional vigente em 13/08/2026'},
    flags:{label:'ANEEL — Bandeiras Tarifárias',url:'https://www.gov.br/aneel/pt-br/assuntos/tarifas/bandeiras-tarifarias',reference:'bandeira amarela em agosto/2026'},
    insurance:{label:'SUSEP — Base anonimizada de seguro automóvel',url:'https://www.gov.br/susep/pt-br/central-de-conteudos/dados-estatisticos/bases-anonimizadas/bases_auto',reference:'R_AUTO 2021A: prêmio de casco/valor segurado para passeio PF, indexado a MG = 1,00; cotação individual prevalece'}
  },
  fuel:{
    AC:{gas:7.26,eth:4.97},AL:{gas:6.76,eth:5.02},AP:{gas:6.67,eth:null},AM:{gas:7.31,eth:5.00},BA:{gas:6.93,eth:4.66},CE:{gas:6.67,eth:4.85},DF:{gas:6.51,eth:4.15},ES:{gas:6.52,eth:4.66},GO:{gas:6.64,eth:4.20},MA:{gas:6.71,eth:5.06},MT:{gas:6.73,eth:3.71},MS:{gas:6.43,eth:3.90},MG:{gas:6.19,eth:3.94},PA:{gas:6.69,eth:4.73},PB:{gas:6.47,eth:4.72},PR:{gas:6.66,eth:4.13},PE:{gas:6.90,eth:5.08},PI:{gas:6.86,eth:4.87},RJ:{gas:6.61,eth:4.72},RN:{gas:6.79,eth:5.23},RS:{gas:6.28,eth:4.48},RO:{gas:7.36,eth:5.26},RR:{gas:7.57,eth:5.41},SC:{gas:6.53,eth:4.45},SP:{gas:6.35,eth:3.63},SE:{gas:7.03,eth:5.34},TO:{gas:7.07,eth:5.04}
  },
  energyFlags:{green:{label:'Verde',surcharge:0},yellow:{label:'Amarela (ago/2026)',surcharge:.01885},red1:{label:'Vermelha patamar 1',surcharge:.04463},red2:{label:'Vermelha patamar 2',surcharge:.07877}},
  currentFlag:'yellow',
  distributors:{
    AC:[['EAC',.87381]],AL:[['Equatorial Alagoas',.85141]],AP:[['CEA Equatorial',.82515]],AM:[['Âmbar Amazonas',.87571]],BA:[['Neoenergia Coelba',.87773]],CE:[['Enel Ceará',.74977]],DF:[['Neoenergia Brasília',.82672]],ES:[['EDP Espírito Santo',.84371],['ELFSM',.74537]],GO:[['Equatorial Goiás',.89181],['CHESP',.81975]],MA:[['Equatorial Maranhão',.84318]],MT:[['Energisa Mato Grosso',.89942]],MS:[['Energisa Mato Grosso do Sul',.98660]],MG:[['Cemig-D',.90329],['DMED',.61757],['Energisa Minas Rio',.91899]],PA:[['Equatorial Pará',.97830,'última tarifa disponível; vigência encerrada em 06/08/2026']],PB:[['Energisa Paraíba',.67565]],PR:[['Copel-DIS',.76802]],PE:[['Neoenergia Pernambuco',.79886]],PI:[['Equatorial Piauí',.94669]],RJ:[['Light',.88056],['Enel Rio',1.06110]],RN:[['Neoenergia Cosern',.77580]],RS:[['CEEE Equatorial',.82200],['RGE',.94461]],RO:[['Energisa Rondônia',.84139]],RR:[['Âmbar Energia Roraima',.78947]],SC:[['Celesc',.69568]],SP:[['Enel São Paulo',.78938],['CPFL Paulista',.73945],['CPFL Piratininga',.73969],['Neoenergia Elektro',.79605],['EDP São Paulo',.78670],['CPFL Santa Cruz',.81258]],SE:[['Energisa Sergipe',.75461],['Sulgipe',.75461]],TO:[['Energisa Tocantins',1.00606]]
  },
  insuranceFactor:{AC:.99,AL:.99,AP:1.09,AM:.99,BA:1.14,CE:1.03,DF:1.03,ES:.97,GO:1.07,MA:1.06,MT:1.07,MS:1.01,MG:1,PA:1.11,PB:.98,PR:.97,PE:1.08,PI:1.12,RJ:1.39,RN:1.08,RS:1,RO:.90,RR:1.05,SC:.85,SP:1.10,SE:.90,TO:1.06},
  ipva:{
    AC:{rate:.02},AL:{rate:.03,note:'faixa legal de 2% a 3,25%, conforme o veículo'},AP:{rate:.03},AM:{rate:.015},BA:{rate:.025,note:'faixa legal de 2,5% a 3%, conforme o veículo'},CE:{rate:.03,note:'faixa legal de 2,5% a 3,5%, conforme o veículo'},DF:{rate:.03},ES:{rate:.02},GO:{rate:.0375,note:'faixa legal de 3% a 3,75%, conforme o veículo'},MA:{rate:.025,note:'faixa legal de 2,5% a 3%, conforme o veículo'},MT:{rate:.03,note:'faixa legal de 2% a 4%, conforme o veículo'},MS:{rate:.03,note:'veículos novos e categorias específicas podem ter alíquota diferente'},MG:{rate:.04,note:'4% para automóveis de passeio'},PA:{rate:.025},PB:{rate:.025},PR:{rate:.019},PE:{rate:.024},PI:{rate:.025,note:'faixa legal de 2,5% a 3%, conforme o veículo'},RJ:{rate:.04,note:'4% para gasolina/flex; eletrificados têm regra própria'},RN:{rate:.03},RS:{rate:.03},RO:{rate:.03},RR:{rate:.03},SC:{rate:.02},SP:{rate:.04},SE:{rate:.025,note:'faixa legal de 2,5% a 3%, conforme o veículo'},TO:{rate:.035,note:'3,5% para automóveis acima de 100 HP; 2,5% até 100 HP'}
  },
  incentives:{
    AL:{url:'https://www.sefaz.al.gov.br/noticias/item/3523-isencao-de-ipva-para-carros-hibridos-e-eletricos-em-2024-saiba-como-o-beneficio-funciona'},
    AM:{url:'https://www.casacivil.am.gov.br/governador-wilson-lima-sanciona-leis-que-ampliam-o-ipva-social-e-o-cnh-social-no-amazonas/'},
    BA:{url:'https://servicos.ba.gov.br/detalhe/servico/2080'},
    CE:{url:'https://portalservicos.sefaz.ce.gov.br/duvidas-sobre-a-legislacao%2B650360f5d048b208a541c4b4'},
    DF:{url:'https://www.sinj.df.gov.br/sinj/Norma/e0f0e437ccb74e66b5f07a6671228282/Decreto_46799_29_01_2025.html'},
    MG:{url:'https://www.almg.gov.br/atividade-parlamentar/leis/legislacao-mineira/lei/texto/print.html?ano=2025&num=49089&tipo=DEC'},
    PB:{url:'https://www.sefaz.pb.gov.br/announcements/17102-sefaz-pb-publica-calendario-de-pagamento-do-ipva-2026-e-mantem-regras'},
    PE:{url:'https://www.sefaz.pe.gov.br/Noticias-Destaque/Paginas/Governo-de-Pernambuco-divulga-calend%C3%A1rio-do-IPVA-2026-com-al%C3%ADquota-mantida-em-2%2C4%2C-a-menor-do-Nordeste.aspx'},
    RJ:{url:'https://portal.fazenda.rj.gov.br/noticias/secretaria-de-fazenda-disponibiliza-valores-venais-para-calculo-do-ipva-2026/'},
    RN:{url:'https://www.sefaz.rn.gov.br/postagem/ipva-imunidades-isencoes-dispensa/'},
    SP:{url:'https://www3.fazenda.sp.gov.br/SIPET/ServicosInstrucao/Instrucao/321'},
    TO:{url:'https://dtri.sefaz.to.gov.br/legislacao/ntributaria/Leis/Lei5.061.26.htm'}
  }
};
