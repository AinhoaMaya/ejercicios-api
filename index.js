(async () => {

  const towns = ['mallorca', 'mallorquina', 'mallorquinista', 'mallorquins', 'alaro', 'alcudia', 'algaida', 'andratx', 'ariany', 'arta', 'bahia grande', 'bahia grande (llucmajor)', 'banyalbufar',  'bendinat','binissalem', 'biniali - sancelles',
  'buger', 'bunyola', 'caimari',  'cala bona (son servera)','cala millor', 'cala ratjada', 'calvia', 'calvia (cas catala)','calvia (peguera)','campanet', 'can pastilla', "ca'n pastilla", 'canyamel', 'campos', 'camp de mar', 'cas capelles - marratxi', 'cas concos','can picafort', "ca'n picafort", "ca'n picafort (santa margalida)", 'capdepera', 'coll den rebassa', 'colonia sant jordi',  'colonia de sant jordi', 'colonia de sant pere',
  'consell', "costa d'en blanes (calvia)", "costa d'en blanes (portals nous)",'costitx', 'deia', 'deya', 'el arenal', 'el toro','es capdella','escorca', 'es llombards', 'es pil·lari', 'esporles', 'establiments', 'estellencs', 'es jonquet', 'es pla de na tesa', 'felanitx', 'fornalutx', 'galilea', 'genova', 'inca', 'la cabaneta - marratxi', 'la vileta','lloret de vistalegre', 'lloret', 'lloseta',
  'llubi', 'llucmajor', 'llucmajor (sa torre)', 'maioris decima llucmajor', 'magalluf', 'manacor', 'mancor de la vall', 'maria de la salut', 'marivent', 'marratxi', 'montuiri', 'moscari',
  'muro', 'palma', 'palma de mallorca', 'palma (establiments)', 'palmesana', 'palma nova', 'palmanova', 'palmayola', 'palmanyola', 'pla de ne tesa', 'platges de muro', 'playa de palma', 'petra', 'pla de na tesa', 'portol', 'porto colom', 'porto pi', 'porto-pi', 'poligono de levante', 'poligon son castell','pollenca', 'pollensa', "pont d'inca", 'porreres', 'portals nous', 'port de soller','portocolom', 'porto cristo', 'portopetro', 'puerto de soller', "port d'andratx", 'port de pollenca',
  'porto petro', "puerto d'alcudia", 'puig de ros','puigpunyent', "s'alqueria blanca-santanyi", "s'arraco", "s'arenal", "s'aranjassa", 'sa casa blanca', 'sa pobla', 'sa cabaneta', 'sant agusti','san telmo', 'santelm', 'sant joan', 'sant llorenc des cardassar', 'sant llorenc des cardessar',
  'santa eugenia', 'san jordi', 'sant jordi', 'santa margalida', 'santa maria del cami', 'santa maria', 'santanyi', 'santa ponca', 'santa ponsa-calvia', 'santa ponca - calvia', 'santa ponca (calvia)','santa ponsa', 'santa ponsa (calvia)', 'sant elm', 'sa torre', 'secar de la real', 'selva', 'sencelles', 'ses salines', "s'horta", "s'horta-felanitx", "s'illot", "s'indioteria", 'sineu', 'sol de mallorca', 'soller', 'son caliu (calvia)', 'son carrio','son ferriol', 'son ferrer - calvia', 'son mercadal now', 'son rapinya','son rullan', 'son serra', 'son serra de marina',
  'son ferrer', 'son macia (manacor)', 'son sardina', 'son servera', 'son serrvera', 'urb. bahia grande', 'urbanitzacio sant marcal', 'valldemossa', 'valldemosa', 'vilafranca de bonany']

  const response = await fetch('https://catalegdades.caib.cat/api/views/t84h-sihg/rows.json?accessType=DOWNLOAD')
  const associations = await response.json()

  const transformedData = associations.data.map(([
    sid,
    id,
    position,
    createdAt,
    createdMeta,
    updatedAt,
    updatedMeta,
    meta,
    nif,
    registerNumber,
    registerDate,
    name,
    address,
    town,
    goals,
    scope
  ]) => {
    return { name, goals, registerDate, town, address, scope }
  })

  const tenYearsAgo = new Date().getFullYear() - 10

  const { filteredData, discardedData } = transformedData.reduce((acc, association) => {
    const normalizedTown = association.town ? association.town.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : null
    const normalizedAssociationName = association.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const isRecent = new Date(association.registerDate) > tenYearsAgo

    if (normalizedTown && towns.includes(normalizedTown) && isRecent) {
      acc.filteredData.push(association)
    } else if (towns.some(town => normalizedAssociationName.includes(town)) && isRecent) {
      acc.filteredData.push(association)
    } else {
      acc.discardedData.push(association)
    }

    return acc
  }, { filteredData: [], discardedData: [] })

  const reducedData = filteredData.map(association => {
    return {
      name: association.name,
      goals: association.goals
    }
  })

  const chunks = []
  const chunkSize = Math.ceil(reducedData.length / 120)

  for (let i = 0; i < reducedData.length; i += chunkSize) {
    const chunk = reducedData.slice(i, i + chunkSize)
    chunks.push(chunk)
  }
  
  

})();
