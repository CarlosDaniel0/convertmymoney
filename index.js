const express = require('express');
const path = require('path')
const { convert, toMoney } = require('./lib/convert')
const { current } = require('./lib/getCurrentDollar')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  const data = await current()
  let dollar
  for (let i in data.value) {
    dollar = data.value[i].cotacaoCompra
  }
  res.render('home', { dollar })
})

app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query;
  if (cotacao && quantidade) {
    const conversao = convert(cotacao, quantidade);

    res.render('cotacao', {
      cotacao: toMoney(cotacao),
      quantidade: toMoney(quantidade),
      conversao: toMoney(conversao),
      error: false
    });
  } else {
    res.render('cotacao', {
      error: 'Valores inválidos'
    })
  }
})

app.listen('3000', err => {
  if (err) {
    console.log('Erro ao executar servidor')
  } else {
    console.log('Express running\nhttp://localhost:3000')
  }

})