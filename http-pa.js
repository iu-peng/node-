let http = require('http')
/*let server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'})
	res.write('hello')
	res.end()
}).listen(3333,'127.0.0.1')
console.log('begin server')*/

let url = 'http://www.imooc.com/learn/348'

let cheerio = require('cheerio')
function filterData(html){
	var $ = cheerio.load(html)
	var chapters = $('.chapter')

	var courseData = []


	chapters.each(function(item){
		let chapter = $(this)
		let chapterTitle = chapter.find('strong').text()
		let videos = chapter.find('.video').children('li')
		let chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		}

		videos.each(function(item){
			let video = $(this).find('.J-media-item')
			let videoTitle = video.text().replace(/开始学习/g,'')
			let id = video.attr('href').split('video/')[1]
			
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})

		})
		courseData.push(chapterData)

	})
	return courseData
}

function printCourseData(courseData){
	//console.log(courseData)
	courseData.forEach(function(item){
		let chapterTitle = item.chapterTitle.trim()

		console.log('\n' + chapterTitle.replace(/\s/g,'') + '\n')

		item.videos.forEach(function(videoitem){
			console.log('【' + videoitem.id + '】' + videoitem.title.replace(/\s/g,'') + '\n')
		})
	})
}

http.get(url,function(res){
	let html = ''
	res.on('data',function(data){
		html += data
	})
	res.on('end',function(){
		let courseData = filterData(html)

		printCourseData(courseData)
	})
}).on('error',function(){
	console.log('出错')
})