const express = require('express')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()


mongoose.connect('mongodb://0.0.0.0:27017/blogDB') 
app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {
    const article = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index' , { articles: article})
})

app.use('/articles', articleRouter)

app.listen(3000)