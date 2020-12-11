const moment = require("moment")
const fetch = require("node-fetch")

const date = moment().format('MM-DD-YYYY');
const api = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='USD'&@dataCotacao='${date}'&$top=100&$format=json&$select=cotacaoCompra`

const a = fetch(api).then(r => r.json()).then(r => { return r })
const current = async () => {
  return await a
}

module.exports = {
  current
}