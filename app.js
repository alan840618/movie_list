const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movie.json')
const app = express()
const port = 3000
//express template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine','handlebars')
// setting static files
app.use(express.static('public'))
//routes setting
app.get('/',(req,res)=>{
    // res.send(`this is my movie list built with express`)
    res.render('index',{movies:movieList.results})
})
app.get('/search',(req,res)=>{
    console.log('req keyword',req.query.keyword)
    const filteredMovies = movieList.results.filter(movie=>{
        return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
    })
    res.render('index',{movies:filteredMovies,keyword:req.query.keyword})
})
app.get('/movies/:movie_id',(req,res)=>{
    const movie = movieList.results.filter(movie=>{
        return movie.id === Number(req.params.movie_id)
    })
    res.render('show',{movie:movie[0]})
})
app.listen(port,()=>{
    console.log(`Express is listening on localhost:${port}`)
})