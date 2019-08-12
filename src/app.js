const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// gives a function which creates Express application
const express = require('express')
const hbs = require('hbs')

// absolute path of directory and file
// console.log(__dirname)



const app = express()

// paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../view-templates/views')
const partialsPath = path.join(__dirname, '../view-templates/partials')


// setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Our website domains
// app.com
// app.com/help
// app.com/about

// 1st arg is relative path, 2nd arg is function (what to return)
// req is request object, res is response object
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'A Sandhu'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'A Sandhu'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:'Help',
        name: 'A Sandhu',
        message:'Please access the FAQ'
    })
})

app.get('/weather', (req, res) => {
    // address key in query of URL
    // http://localhost:3000/weather?address=Central%20London
    
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide a address'
        })
    }
    
    
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }

    
        // callback chaining makes sure forecast is executed after geocode
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            
            return res.send({
                forecast: forecastData,
                location: place_name,
                address:req.query.address
            })
          //  console.log('Weather forecast for '+place_name)
          //  console.log(forecastData)
          })
    
    })
    
})

app.get('/products', (req, res) => {
    
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide search item'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*', (req, res) => {
    res.render('404-error',{
        title:'404',
        name:'A Sandhu',
        message: '404 Error: Help article not found'
    })
})
// catch all invalid domains
app.get('*', (req, res) => {
    res.render('404-error',{
        title:'404',
        name:'A Sandhu',
        message: '404 Error: Page not found'
    })

})
// start a server and listen on particular port
app.listen(3000, () => {
    // not running on browser
    console.log('Server is up on port 3000.')
})