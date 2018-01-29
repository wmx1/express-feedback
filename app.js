const express = require('express')
const expressArtTemplate = require('express-art-template')
const comment = require('./comment')
const bodyParser = require('body-parser')

const app = express()

app.use('/node_modules/',express.static('./node_modules/'))
app.engine('html',expressArtTemplate)

app.use(bodyParser.urlencoded({extend:false}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
	comment.findAll((err,comments) => {
		if(err) {
			return console.log('读取数据失败')
		}
		// console.log(comments)
		res.render('index.html',{
			comments
		})
	})
	
})
app.get('/fabiao',(req,res) => {
	res.render('fabiao.html')
})

app.post('/fabiao',(req,res) => {
	// console.log('收到表单提交了',req.body)
	const body = req.body 
	if(!body.name || !body.name.length) {
		return res.send('name invalid')
	}
	if(!body.content || !body.content.length) {
		return res.send('content invalid')
	}

	comment.save(body,err => {
		if(err) {
			return res.send('500 Server Error')
		}
		res.redirect('/')
	})
})
app.listen(3000,() => {
	console.log('app running...')
})