const REGIONAL_DB={
  updatedAt:'27/10/2026',
  states:{AC:'Acre',AL:'Alagoas',AP:'Amapá',AM:'Amazonas',BA:'Bahia',CE:'Ceará',DF:'Distrito Federal',ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',MT:'Mato Grosso',MS:'Mato Grosso do Sul',MG:'Minas Gerais',PA:'Pará',PB:'Paraíba',PR:'Paraná',PE:'Pernambuco',PI:'Piauí',RJ:'Rio de Janeiro',RN:'Rio Grande do Norte',RS:'Rio Grande do Sul',RO:'Rondônia',RR:'Roraima',SC:'Santa Catarina',SP:'São Paulo',SE:'Sergipe',TO:'Tocantins'},
  sources:{
    fuel:{label:'ANP — Levantamento de Preços de Combustíveis',url:'https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas',reference:'18/10/2026 a 24/10/2026 — planilha publicada em 26/10/2026; sem média estadual de etanol no Amapá, mantido o último valor oficial (R$ 5,81/l)'},
    energy:{label:'ANEEL — Tarifas Homologadas de Distribuidoras',url:'https://dadosabertos.aneel.gov.br/dataset/tarifas-distribuidoras-energia-eletrica',reference:'tarifas B1 residenciais convencionais — dados gerados pela ANEEL em 27/10/2026; Neoenergia Brasília: TUSD R$ 453,47/MWh + TE R$ 380,82/MWh, vigente desde 22/10/2026 (REH nº 3.614/2026); tarifas sucessoras de Equatorial Goiás, EDP SP e CPFL Piratininga ainda ausentes na geração de 27/10/2026, sem estimativas; Equatorial Pará: TUSD R$ 754,30/MWh + TE R$ 288,92/MWh, vigente desde 18/09/2026 (REH nº 3.608/2026); ELFSM vigente desde 22/09/2026; republicações vigentes desde 26/08/2026 para Energisa Acre, Enel Ceará, Energisa Rondônia, Sulgipe e Energisa Tocantins'},
    flags:{label:'ANEEL — Bandeiras Tarifárias',url:'https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/outubro-tera-bandeira-verde-contas-de-luz-sem-custo-extra',reference:'bandeira verde em outubro/2026, sem acréscimo — publicada pela ANEEL em 25/09/2026'},
    insurance:{label:'SUSEP — Base anonimizada de seguro automóvel',url:'https://www.gov.br/susep/pt-br/central-de-conteudos/dados-estatisticos/bases-anonimizadas/bases_auto',reference:'R_AUTO 2021A: prêmio de casco/valor segurado para passeio PF, indexado a MG = 1,00; cotação individual prevalece'}
  },
  fuel:{
    AC:{gas:7.43,eth:4.92},AL:{gas:6.64,eth:4.96},AP:{gas:6.35,eth:5.81},AM:{gas:7.03,eth:4.96},BA:{gas:6.70,eth:4.49},CE:{gas:6.94,eth:4.97},DF:{gas:6.39,eth:4.30},ES:{gas:6.39,eth:4.70},GO:{gas:6.42,eth:3.94},MA:{gas:6.52,eth:4.91},MT:{gas:6.75,eth:4.08},MS:{gas:6.40,eth:4.00},MG:{gas:6.32,eth:4.27},PA:{gas:6.58,eth:4.57},PB:{gas:6.31,eth:4.54},PR:{gas:6.57,eth:4.23},PE:{gas:6.88,eth:4.94},PI:{gas:6.71,eth:4.80},RJ:{gas:6.59,eth:4.77},RN:{gas:6.76,eth:5.16},RS:{gas:6.16,eth:4.57},RO:{gas:7.43,eth:5.08},RR:{gas:7.56,eth:5.38},SC:{gas:6.29,eth:4.40},SP:{gas:6.35,eth:3.89},SE:{gas:6.93,eth:5.24},TO:{gas:6.94,eth:5.01}
  },
  energyFlags:{green:{label:'Verde (out/2026)',surcharge:0},yellow:{label:'Amarela',surcharge:.01885},red1:{label:'Vermelha patamar 1',surcharge:.04463},red2:{label:'Vermelha patamar 2',surcharge:.07877}},
  currentFlag:'green',
  distributors:{
    AC:[['EAC',.82971]],AL:[['Equatorial Alagoas',.85141]],AP:[['CEA Equatorial',.82515]],AM:[['Âmbar Amazonas',.87571]],BA:[['Neoenergia Coelba',.87773]],CE:[['Enel Ceará',.70175]],DF:[['Neoenergia Brasília',.83429]],ES:[['EDP Espírito Santo',.84371],['ELFSM',.82489]],GO:[['Equatorial Goiás',.89181],['CHESP',.81975]],MA:[['Equatorial Maranhão',.88884]],MT:[['Energisa Mato Grosso',.89942]],MS:[['Energisa Mato Grosso do Sul',.98660]],MG:[['Cemig-D',.90329],['DMED',.61757],['Energisa Minas Rio',.91899]],PA:[['Equatorial Pará',1.04322]],PB:[['Energisa Paraíba',.70970]],PR:[['Copel-DIS',.76802]],PE:[['Neoenergia Pernambuco',.79886]],PI:[['Equatorial Piauí',.94669]],RJ:[['Light',.88056],['Enel Rio',1.06110]],RN:[['Neoenergia Cosern',.77580]],RS:[['CEEE Equatorial',.82200],['RGE',.94461]],RO:[['Energisa Rondônia',.76244]],RR:[['Âmbar Energia Roraima',.78947]],SC:[['Celesc',.75975]],SP:[['Enel São Paulo',.78938],['CPFL Paulista',.73945],['CPFL Piratininga',.73969],['Neoenergia Elektro',.89163],['EDP São Paulo',.78670],['CPFL Santa Cruz',.81258]],SE:[['Energisa Sergipe',.75461],['Sulgipe',.71881]],TO:[['Energisa Tocantins',.99278]]
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

