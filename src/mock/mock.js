// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

// 创建模拟数据
function creatGetMock () {
const getMock = Mock.mock({
    'list|1-10': [{
    'id|+1': 1
    }]
})
return getMock
}

// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
const produceNewsData = function () {
  let newsList = []
  for (let i = 0; i < 20; i++) {
  let newNewsObject = {
    title: Random.ctitle(), // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
    content: Random.cparagraph(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
    createdTime: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
  }
    newsList.push(newNewsObject)
  }
     return newsList
}

// 游戏
const GamesData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'type': '益智',
            'items|12': [
                {
                    'name': '@word(2,8)',
                    'src': '@image',
                    'poster': 'http://',
                    'thumbs': ['@image(‘40x40‘,‘#c33‘)', '@image(‘40x40‘,‘#c33‘)'],
                    'description': '@ctitle(20,60)'
                }
            ]
        },
        {
            'type': '竞技',
            'items|12': [
                {
                    'name': '@cname',
                    'src': '@image',
                    'poster': 'http://',
                    'thumbs': ['@image(‘40x40‘,‘#c33‘)', '@image(‘40x40‘,‘#c33‘)'],
                    'description': '@ctitle(20,60)'
                }
            ]
        }
    ]
}

// 视频
const VideosData = {
    'status': 200,
    'msg': '',
    'data': [
      {
        'type': [ '影视', '短视频', 'Vlog' ],
        'items|12': [
            {
                'name': '@cword(5,8)',
                'duration': '@date("y.MM.dd")',
                'type': '动作',
                'score': '5-9.0-10',
                'description': '@ctitle(10,20)',
                'poster': '@Image(‘40x40‘,‘#c33‘)',
                'thumbs': ['@Image(‘40x40‘,‘#c33‘)', '@Image(‘40x40‘,‘#c33‘)']
            }
        ]
    }
    ]
}
// 商品
let shopdata = Mock.mock({
    'status': 200,
    'msg': '',
    'data|20': [ // 生成20条数据 数组
        {
            'id|+1': 1, // 生成商品id，自增1
            'name': '@cword(5,8)', // 生成商品名 ， 都是中国人的名字
            'price|30-1000': 30, // 随机生成商品价格 在30-1000之间
            'description': '@ctitle(10,20)', // 生成商品信息，长度为10个汉字
            'type|1': [ '文创', '航鲜', '旅游' ],
            'thumbUrls': [ '@image(‘#c33‘)', '@image(‘40x40‘,‘#c33‘)', '@image(‘40x40‘,‘#c33‘)', '@image(‘40x40‘,‘#c33‘)' ],
            'isfree|1': [0, 1], // 0收费 1免费
            'urlPoster': ['@image("100x100")']
        }
    ]
})
// 三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
Mock.mock(/\/api\/item\/list[\s\S]*?/, 'get', () => { return shopdata })

Mock.mock('/api/game/list', GamesData)
Mock.mock('/api/film/listType', VideosData)

//  设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
    timeout: '0-300'
})
