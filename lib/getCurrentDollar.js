const moment = require("moment")
const axios = require("axios")

const getDay = () => {
  const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const weekend = ['Saturday', 'Sunday']
  const today = moment().format('dddd')
  const hour = (parseInt(moment().format('h')) * 60) + 15
  let r

  if (workingDays.find(element => element == today)) {
    if (hour < 795) { // 10:00 em fuso horário UTC
      if (today == workingDays[0]) return parseInt(moment().format('DD')) - 3 // Cotação da sexta antes das 10:00
      else return parseInt(moment.format('DD')) - 1 // Cotação do dia anterior 
    } else {
      return parseInt(moment().format('DD')) // Cotação diária a partir das 10:00
    }

  } else if (weekend.find(element => element == today)) {
    if (today == weekend[0]) return parseInt(moment().format('DD')) - 1
    else return parseInt(moment().format('DD')) - 2
  }
}

const date = moment().format(`MM-${getDay()}-YYYY`);
const api = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='USD'&@dataCotacao='${date}'&$top=100&$format=json&$select=cotacaoCompra`

const current = async () => {
  const data = await axios.get(api).then(response => response.data).catch(e => console.log(e))
  let dollar
  for (let i in data.value) {
    dollar = data.value[i].cotacaoCompra
  }
  return dollar
}

module.exports = {
  current
}