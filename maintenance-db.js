const MAINTENANCE_DB=(()=>{
  const fixed=(km,months,url,note='')=>({kind:'fixed',km,months,url,note});
  const condition=(system,url,note='')=>({kind:'condition',system,url,note});
  const source={
    renault:'https://www.renault.com.br/venda-direta/manutencao-mais-facil-pro.html',
    byd:'https://www.byd.com/br/plano-de-manutencao',
    geely:'https://www.geelybrasil.com.br/servicos-revisao',
    mg:'https://mgmotoroficial.com.br/mg-care/manutencao',
    jac:'https://www.jacmotors.com.br/garantia-e-revisao/',
    gac:'https://www.gacgroup.com/pt-br/',
    chevrolet:'https://www.chevrolet.com.br/servicos/manuais',
    gwm:'https://www.gwmmotors.com.br/pt/servicos/revisoes',
    omoda:'https://omodajaecoo.com.br/manutencao-e-garantia',
    suzuki:'https://www.suzukiveiculos.com.br/suzuki-revisao/',
    volvo:'https://www.volvocars.com/br/l/servico-manutencao/plano-revisao/',
    peugeot:'https://www.peugeot.com.br/servicos-e-manuais/revisao-programada.html',
    zeekr:'https://www.zeekrlife.com/pt-br/service',
    fiat:'https://servicos.fiat.com.br/manuais.html',
    jeep:'https://www.jeep.com.br/proprietarios/revisao-programada.html',
    chery:'https://caoachery.com.br/duvidas-frequentes',
    kia:'https://www.kia.com.br/revisoes',
    toyota:'https://www.toyota.com.br/meu-toyota/servicos/atendimento-ao-cliente',
    hyundai:'https://www.hyundai.com.br/universo-hyundai/dicas/entenda-qual-o-momento-certo-de-fazer-a-revisao-do-seu-carro.html',
    honda:'https://www.honda.com.br/pos-venda/automoveis/duvida-detalhe/como-saber-quando-e-hora-de-realizar-revisao-do-seu-honda',
    lexus:'https://www.lexus.com.br/pt/servicing-and-support/price-table.html',
    leapmotor:'https://www.leapmotor.com.br/servicos-e-manuais/manuais.html',
    jetour:'https://jetourbr.com/revisoes/',
    audi:'https://www.audi.com.br/pt/customer-area/preco-revisao-audi/',
    bmw:'https://www.bmw.com.br/pt/bmw-service.html',
    mini:'https://www.mini.com.br/pt_BR/home/mini-service.html',
    mercedes:'https://www2.mercedes-benz.com.br/passengercars/services/manuals.html',
    porsche:'https://www.porsche.com/brazil/pt/accessoriesandservice/porscheservice/psmp/',
    denza:'https://www.denza.com/br',
    avatr:'https://avatr.caoachangan.com.br/novos/avatr-11',
    volkswagen:'https://www.vw.com.br/pt/servicos-e-acessorios/servicos-de-pos-vendas/revisao.html',
    nissan:'https://www.nissan.com.br/servicos/revisao-periodica.html',
    ford:'https://www.ford.com.br/servico-ao-cliente/revisao-preco-fixo/',
    ram:'https://www.ram.com.br/proprietarios/revisao-programada.html',
    citroen:'https://www.citroen.com.br/servicos-e-manutencao/revisao.html',
    mitsubishi:'https://www.mitsubishimotors.com.br/pos-vendas/revisao',
    landrover:'https://www.landrover.com.br/ownership/servicing-maintenance/index.html',
    ferrari:'https://www.ferrari.com/en-BR/auto/car-part-services',
    mclaren:'https://cars.mclaren.com/en/owners/service-and-maintenance',
    lamborghini:'https://www.lamborghini.com/en-en/ownership/customer-service',
    changan:'https://caoachangan.com.br/'
  };

  function forCar(car){
    const brand=car.brand,model=car.model,bev=car.type.includes('BEV');
    if(brand==='BYD')return fixed(bev?20000:12000,12,source.byd);
    if(brand==='Denza')return fixed(bev?20000:12000,12,source.denza,'Plano da motorização elétrica/híbrida da fabricante; confirmar o ano-modelo no concierge DENZA.');
    if(brand==='Geely')return model.includes('EM-i')?fixed(15000,12,source.geely):fixed(20000,12,source.geely);
    if(brand==='GWM')return model.startsWith('ORA')?fixed(24000,24,source.gwm):fixed(12000,12,source.gwm);
    if(brand==='MG')return fixed(24000,12,source.mg);
    if(brand==='Omoda')return model==='E5'?fixed(20000,24,source.omoda):fixed(10000,12,source.omoda);
    if(brand==='Jaecoo')return fixed(10000,12,source.omoda);
    if(brand==='Kia')return fixed(bev?20000:10000,12,source.kia);
    if(brand==='BMW')return condition('CBS (Condition Based Service)',source.bmw,'O painel e o My BMW App informam a quilometragem e o tempo restantes.');
    if(brand==='MINI')return condition('CBS (Condition Based Service)',source.mini,'O veículo calcula o intervalo conforme a utilização real.');
    if(brand==='Porsche')return bev?fixed(30000,24,source.porsche,'O plano pode variar por ano-modelo e deve ser confirmado no My Porsche/Porsche Center.'):fixed(15000,12,source.porsche,'O plano pode variar por ano-modelo e deve ser confirmado no My Porsche/Porsche Center.');
    if(brand==='Mercedes-Benz')return fixed(25000,12,source.mercedes,'O ASSYST PLUS pode antecipar o serviço conforme as condições de uso.');
    if(brand==='Audi')return fixed(10000,12,source.audi);
    if(brand==='Volvo')return fixed(20000,12,source.volvo,'Confirmar o plano aplicável ao ano-modelo no livreto de garantia e serviço.');
    if(brand==='Zeekr')return fixed(20000,12,source.zeekr,'Confirmar o plano aplicável ao ano-modelo no manual brasileiro da ZEEKR.');
    if(brand==='AVATR')return fixed(20000,12,source.avatr,'Confirmar o plano aplicável ao ano-modelo na rede CAOA Changan AVATR.');
    if(brand==='GAC')return fixed(10000,12,source.gac,'Confirmar o plano aplicável ao ano-modelo no manual brasileiro da GAC.');
    if(brand==='JAC')return fixed(10000,12,source.jac,'Confirmar o plano aplicável ao ano-modelo no manual do veículo.');
    if(brand==='Leapmotor')return fixed(10000,12,source.leapmotor,'Confirmar o plano aplicável ao ano-modelo no Manual de Uso e Manutenção.');
    if(brand==='Chevrolet')return fixed(10000,12,source.chevrolet);
    if(brand==='Renault')return fixed(10000,12,source.renault);
    if(brand==='Fiat')return fixed(10000,12,source.fiat);
    if(brand==='Jeep')return fixed(10000,12,source.jeep);
    if(brand==='CAOA Chery')return fixed(10000,12,source.chery);
    if(brand==='Jetour')return fixed(10000,12,source.jetour);
    if(brand==='Toyota')return fixed(10000,12,source.toyota);
    if(brand==='Lexus')return fixed(10000,12,source.lexus);
    if(brand==='Hyundai')return fixed(10000,12,source.hyundai);
    if(brand==='Honda')return fixed(10000,12,source.honda);
    if(brand==='Suzuki')return fixed(10000,12,source.suzuki);
    if(brand==='Peugeot')return fixed(10000,12,source.peugeot);
    if(brand==='Volkswagen')return fixed(10000,12,source.volkswagen);
    if(brand==='Nissan')return fixed(10000,12,source.nissan);
    if(brand==='Ford')return fixed(10000,12,source.ford);
    if(brand==='RAM')return fixed(12000,12,source.ram,'Confirmar o intervalo específico da motorização no manual do ano-modelo.');
    if(brand==='Citroën')return fixed(10000,12,source.citroen);
    if(brand==='Mitsubishi')return fixed(10000,12,source.mitsubishi);
    if(brand==='Land Rover')return fixed(16000,12,source.landrover,'O intervalo pode variar por motorização e condições de uso.');
    if(brand==='Ferrari')return condition('plano de manutenção da Ferrari',source.ferrari,'Confirmar o programa aplicável ao modelo e ano no Ferrari Service.');
    if(brand==='McLaren')return condition('sistema de manutenção da McLaren',source.mclaren,'Confirmar o programa aplicável ao modelo e ano no McLaren Service Centre.');
    if(brand==='Lamborghini')return condition('plano de manutenção da Lamborghini',source.lamborghini,'Confirmar o programa aplicável ao modelo e ano na rede autorizada.');
    if(brand==='CAOA Changan')return fixed(10000,12,source.changan,'Confirmar o intervalo no manual brasileiro do veículo.');
    return fixed(10000,12,'#','Confirmar o intervalo no manual do ano-modelo.');
  }

  const costForCar=()=>null; // Preço só entra após validação de tabela oficial por versão.
  return{forCar,costForCar};
})();

