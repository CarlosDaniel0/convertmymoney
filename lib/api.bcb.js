const axios = require('axios');

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='USD'&@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra`

const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => {
  let r
  res.data.value.map(cotacao => {
    r = cotacao.cotacaoCompra
  })
  return r
}
const getToday = () => {
  const today = new Date()
  return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
}
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
  try {
    const today = getToday()
    const url = getUrl(today)
    const res = await getCotacaoAPI(url)
    const cotacao = extractCotacao(res)
    return cotacao.toFixed(2)
  } catch (e) {
    return ''
  }
}


module.exports = {
  getCotacaoAPI,
  extractCotacao,
  getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
  getToday,
  getUrl,
  pure: {
    getCotacao
  }
}