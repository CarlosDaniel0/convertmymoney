const express = require('express');
const path = require('path')
const { convert, toMoney } = require('./lib/convert')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  res.render('home')
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

const porta = process.env.PORT || 8080;
app.listen(porta, err => {
  if (err) {
    console.log('Erro ao executar servidor')
  } else {
    console.log(`Express running\nhttp://localhost:${porta}`)
  }

})