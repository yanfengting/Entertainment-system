// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// 航班数据
const FlightData = {
    'status': 200,
    'msg': 'OK',
    'data': {
        'id': '93403141-9265-11e9-9310-704d7bbd8ffe',
        'planeNo': 'PN12365', // 飞机号
        'flightNo': 'FN1245', // 航班号
        'departDetail': {// 出发地详情
            'city': '长沙', // 出发城市
            'airportName': '长沙/黄花'// 出发机场
        },
        'arriveDetail': {// 目的地详情
            'city': '重庆', // 目的地城市
            'airportName': '重庆/江北'// 目的地机场
        },
        'startDate': '2019-01-05 07:00', // 出发时间
        'endDate': '2019-01-05 23:36' // 达到时间
    }
}
const FlightDetailData = {
    'status': 200,
    'msg': 'OK',
    'data': {
        'id': '93403141-9265-11e9-9310-704d7bbd8ffe',
        'planeNo': 'PN12365', // 飞机号
        'flightNo': 'FN1245', // 航班号
        'departDetail': { // 出发地详情
            'city': '长沙', // 出发城市
            'airportName': '长沙/黄花' // 出发机场
        },
        'arriveDetail': { // 目的地详情
            'city': '重庆', // 目的地城市
            'airportName': '重庆/江北' // 目的地机场
        },
        'transferDetail': [ // 经停详情
            {
                'city': '库车', // 城市
                'airportName': '库车/龟兹'
            },
            {
                'city': '达州',
                'airportName': '达州/河市'
            },
            {
                'city': '遵义',
                'airportName': '新舟'
            }
        ],
        'startDate': '2019-01-05 07:00', // 出发时间
        'endDate': '2019-01-05 23:36', // 达到时间
        'transferArriveDate': [ // 经停开始时间（与经停顺序对应）
            '2019-01-05 12:20',
            '2019-01-05 16:20',
            '2019-01-05 18:20'
        ],
        'transferDepatureDate': [ // 经停结束时间（与经停顺序对应）
            '2019-01-05 12:30',
            '2019-01-05 16:30',
            '2019-01-05 18:30'
        ]
    }
}

const SMSData = {
    'status': 200,
    'msg': '',
    'data': null
}
const LoginData = {
    'status': 200,
    'msg': '',
    'data': '93403141-9265-11e9-9310-704d7bbd8ffe' // （data中的数据为用户token）
}
const UnfinishedData = {
    'status': 200,
    'msg': 'OK',
    'data': 5
}
// 提交升舱信息
const UpgradeSubmit = {
    'status': 200,
    'msg': '',
    'data': null
}
const UpgradeChick = {
    'status': 200,
    'msg': 'OK',
    'data': true // true:有 ，false ：无
}
// 获取可升舱座位数据
const UpgradeData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'classType': '商务舱',
            'price': 280,
            'thumbUrl': '@image(`144x144`,’#b8b8b8‘)',
            'description': '@ctitle(200,290)'
        },
        {
            'classType': '头等舱',
            'price': 888,
            'thumbUrl': '@image(`144x144`,‘#fff’)',
            'description': '@ctitle(200,290)'
        }
    ]
}

// 提交呼唤铃信息
const CallbellSubmit = {
    'status': 200,
    'msg': '',
    'data': null
}
const CallbellChick = {
    'status': 200,
    'msg': 'OK',
    'data': true // true:有 ，false ：无
}
// 获取呼唤铃数据
const CallbellData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'type': '毛巾',
            'thumbUrl': '@image(`144x144`)'
        },
        {
            'type': '耳塞',
            'thumbUrl': '@image(`144x144`)'
        },
        {
            'type': '热水',
            'thumbUrl': '@image(`144x144`)'
        },
        {
            'type': '充电宝',
            'thumbUrl': '@image(`144x144`)'
        }
    ]
}

// 提交餐食信息
const FoodSubmit = {
    'status': 200,
    'msg': '',
    'data': null
}
const FoodChick = {
    'status': 200,
    'msg': 'OK',
    'data': true // true:有 ，false ：无
}
// 获取餐食数据
const FoodData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'id': 'fc1795e3-60e7-11e9-9bed-704d7bbd8ffe',
            'type': '米饭',
            'price': 25,
            'thumbUrl': '@image(`144x144`)',
            'state': 1, // 0开关为关闭状态 1开关为打开状态
            'isfree': 0 // 是否收费 0：收费 1：免费
        },
        {
            'id': 'fc1795e3-60e7-11e9-9bed-704d7bbd8ffg',
            'type': '面条',
            'price': 22.05, // 单价最多2位小数
            'thumbUrl': '@image(`144x144`)',
            'state': 1,
            'isfree': 0
        }
    ]
}
// 行程
const transitUserData = {
        'id': 1,
        'airportDetail': { 'city': '成都', 'airportName': '双流机场' }, // 中转机场信息
        'hasLounge': null, // 是否有中转休息室
        'instantTime': null, // 急转最短时间
        'luggageConsign': null, // 中转柜台是否可以办理行李托运
        'luggageConstraint': null, // 机场对保障行李的保障限制
        'mctTimes': null, // MCT时间
        'meeting': null, // 远机位是否可以在机下迎接旅客
        'monitorUnit': null, // 旅客监控单位
        'overFee': null, // 中转柜台是否可以缴纳逾重费
        'remark': null, // 备注
        'reserveSeat': null, // 作为始发通程航班是否可以预留座位
        'securityCheck': null, // 是否需要过中转安检
        'specialReason': null, // 需要走大流程的情况及原因中转柜台无法办理登机牌或托运行李等
        'staffStationed': null, // 是否有我司人员派驻
        'transitTel': null, // 机场中转值班电话
        'vehicle': null, // 是否有中转保障车
        // ******以下为通程用户信息
        'afterFltDate': null, // 后序航班执行日期
        'afterRealFlightNo': null, // 后序航班 航班号
        'afterStartTime': null, // 后序航班计划起飞时间
        'arrivalTime': null, // 到达时间
        'arriveNameCh': null, // 目的地机场名称
        'arriveDetail': {// 目的地机场详情
            'city': '福州',
            'airportName': '福州/长乐'
        },
        'beforeEndTime': null, // 前序航班计划落地时间
        'beforeRealFlightNo': null, // 前序航班 航班号
        'departureNameCh': null, // 始发地机场名称
          'departureDetail': {// 始发地机场详情
            'city': '重庆',
            'airportName': '重庆/江北'
        },
        'departureTime': null, // 出发时间
        'flightDate': null, // 航班日期
        'isOverNight': null, // 是否过夜
        'passengerCardNo': null, // 旅客证件号
        'passengerName': null, // 旅客姓名
        'seatNo': null, // 座位号
        'transferNameCh': null // 中转地机场名称
    }
// 广告
const AdvData = {
    'status': 200,
    'msg': 'OK',
    'data': [
        {
            'id': '2advadvadv0f5c4ba-83d4-46c1-a38d-e8ef1c43cff2', // ID
            'src': '@image(`120x60`)', // 广告资源位置
            'duration': 1, // 持续时间
            'priority': 106, // 优先级
            'resourceId': '50c6c33b-5ee5-4915-8498-59c16e57c0sa', // 跳转的资源id（当resourceType=4时 该字段内容为资源下载的下载地址）
            'type': 1, // 广告类型（1图片，2视频）
            'resourceType': 1 // 广告跳转类型（1：目的地推荐 2：商城 3：富文本4：资源下载，）
        },
        {
            'id': '20f5c4ba-83d4-46c1-a38d-e8ef1c43cff3',
            'src': '@image(`120x60`)',
            'duration': 12,
            'priority': 100,
            'resourceId': '50c6c33b-5ee5-4915-8498-59c16e57c0sa',
            'type': 2,
            'resourceType': 1
        }
    ]
}

const BrandData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'title': '企业介绍',
            'content': '<p>@ctitle(500,700)</p>'
        },
        {
            'title': '发展历程',
            'content': '<p>@ctitle(500,700)</p>'
        },
        {
            'title': '成就预览',
            'content': '<p>@ctitle(500,700)</p>'
        }
    ]
}
// 航线特惠
const SalesData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'title': '库尔勒->重庆->深圳',
            'titleImg': '@image(`120x60`)',
            'content': '<p>@ctitle(400,1000)</p>',
            'descrip': '标题下面的描述信息'
        },
        {
            'title': '重庆->北京->通辽',
            'titleImg': '@image(`120x60`)',
            'content': '<p>@ctitle(500,1200)</p>',
            'descrip': '标题下面的描述信息'
        }
    ]
}
const RouteData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'title': '库尔勒->重庆->深圳',
            'content': '<p>...</p>'
        },
        {
            'title': '重庆->北京->通辽',
            'content': '<p>...</p>'
        }
    ]
}
const SafetyData = {
    'status': 200,
    'msg': 'OK',
    'data': [
        {
            'id': 'bee87ecb-7555-11e9-b816-704d7bbd8ffe',
            'content': '<p>这是一段文字+图片的描述</p>',
            'type': 'html',
            'title': '安全须知文档',
            'videoUrl': null
        }
    ]
}
const TripData = {
    'status': 200,
    'msg': '',
    'data': [
        {}
    ]
}
const DesData = {
    'status': 200,
    'msg': '',
    'data': {
        'city': '扬州',
        'topic': [
            {
                'title': '游玩攻略',
                'titleImg': '@image(`120x60`)',
                'content': '<p>...</p>'
            },
            {
                'title': '美食推荐',
                'titleImg': '@image(`120x60`)',
                'content': '<p>...</p>'
            }
        ] 
    }
}

// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
const NewsData = function () {
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
const GameData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'type': '益智',
            'items|12': [
                {
                    'name': '@cword(2,8)',
                    'src': '@image',
                    'poster': ['@image(`1125x800`)'],
                    'thumbs': ['@image(‘40x40‘,‘#c33‘)', '@image(‘40x40‘,‘#c33‘)'],
                    'description': '@ctitle(20,60)'
                }
            ]
        },
        {
            'type': '竞技',
            'items|12': [
                {
                    'name': '@cword(2,8)',
                    'src': '@image',
                    'poster': ['@image(`1125x800`)'],
                    'thumbs': ['@image(‘40x40‘,‘#c33‘)', '@image(‘40x40‘,‘#c33‘)'],
                    'description': '@ctitle(20,60)'
                }
            ]
        }
    ]
}
const GameIdData = {
    'status': 200,
    'msg': 'OK',
    'data':  {
                    'id': '1eba0854-268e-43e8-bcfc-4a824650hsju',
                    'name': '@ctitle(4,8)',
                    'src': 'http://118.178.84.155:88/test/test/game/gamefile_1a149cee-6943-452a-ae12-b855c654f5ad/index.html',
                    'poster': '@image(`100x180`)',
                    'description': '@ctitle(50,100)',
                    'status': null,
                    'position': '22',
                    'gameType': null,
                    'thumbs': [
                        '@image(`120x60`)',
                        '@image(`120x60`)',
                        '@image(`120x60`)',
                        '@image(`120x60`)',
                        '@image(`120x60`)'
                    ]
                }
}
// 音乐
const MusicData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'type': '流行',
            'items': [
                {
                    'name': '静止',
                    'singer': '杨乃文',
                    'src': 'http://',
                    'lyrics': 'http://',
                    'duration': '200' // 时长
                }
            ]
        },
        {
            'type': '民谣',
            'items': [
                {
                    'name': '不会说话的爱情',
                    'singer': '小河',
                    'src': 'http://',
                    'lyrics': 'http://',
                    'duration': '200' // 时长
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
                'duration': '@date(`y.MM.dd`)',
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
            'urlPoster': ['@image(`1125x800`)']
        }
    ]
})
const ItemSubmit = {
    'status': 200,
    'msg': '',
    'data': null
}

const VideoData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'type': '影视',
            'items': [
                {
                    'name': '战狼2',
                    'duration': '01:30:40',
                    'type': '动作',
                    'score': '9.0',
                    'description': '...',
                    'poster': 'http://',
                    'thumbs': ['http://...', 'http://']
                }
            ]
        },
        {
            'type': '短视频',
            'items': [
                {
                    'name': '老司机神操作躲过大卡车',
                    'duration': '00:02:31',
                    'type': null,
                    'score': null,
                    'description': '...',
                    'poster': null,
                    'thumbs': null
                }
            ]
        }
    ]
}
const EbookData = {
    'status': 200,
    'msg': 'OK',
    'data': [
        {
            'id': 1,
            'type': '小说'
        }
    ]
}
const OrderData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'id': '2e4b7a05-2e27-4b9c-a527-dd3ef62cf278',
            'orderType': 'FO',
            'num': 2,
            'orderNo': '104568752',
            'totalPrice': 56,
            'item': '米饭',
            'price': 28,
            'status': '已完成'
        },
        {
            'id': '2e4b7a05-2e27-4b9c-a527-dd3ef62c2568',
            'orderType': 'FO',
            'num': 1,
            'orderNo': '104568752',
            'totalPrice': 28,
            'item': '米饭',
            'price': 28,
            'status': '待确认'
        }
    ]
}

const FeedbackData = {
    'status': 200,
    'msg': '',
    'data': null
}
const statusData = {
    'status': 200,
    'msg': '',
    'data': 'online'
}
// 三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
Mock.mock('/api/flightDetail/getUserFlight', 'get', FlightDetailData)
Mock.mock('/api/flightDetail/get', 'get', FlightData)

Mock.mock(/\/api\/item\/list[\s\S]*?/, 'get', () => { return shopdata })
Mock.mock('/api/item/submit', 'post', ItemSubmit)

Mock.mock(/\/api\/adv\/list[\s\S]*?/, 'get', AdvData)
// 升舱
Mock.mock('api/upgrade/chickUsable', 'get', UpgradeChick)
Mock.mock('api/upgrade/list', UpgradeData)
Mock.mock(/\/api\/upgrade\/submit[\s\S]*?/, 'post', UpgradeSubmit)
// 呼唤铃
Mock.mock('api/callbell/list', 'get', CallbellData)
Mock.mock('api/callbell/chickUsable', 'get', CallbellChick)
Mock.mock(/\/api\/callbell\/submit[\s\S]*?/, 'post', CallbellSubmit)
// 餐食
Mock.mock('api/food/chickUsable', 'get', FoodChick)
Mock.mock('api/food/list', 'get', FoodData)
Mock.mock(/\/api\/food\/submit[\s\S]*?/, 'post', FoodSubmit)
// 行程
Mock.mock('/api/transitUser/get', 'get', {
    'status': 200,
    'msg': 'OK',
    'data': transitUserData
})

// 品牌介绍数据
Mock.mock('/api/brand/view', 'get', BrandData)
Mock.mock('/api/sales/view', 'get', SalesData)
Mock.mock('/api/route/view', 'get', RouteData)

Mock.mock(/\/api\/safety\/view[\s\S]*?/, 'get', SafetyData)
Mock.mock('/api/trip/list', 'get', TripData)
Mock.mock(/\/api\/destination\/view[\s\S]*?/, 'get', DesData)

Mock.mock('/api/order/unfinished', UnfinishedData)
Mock.mock('/api/order/list', OrderData)

Mock.mock('/api/film/listType', VideosData)

Mock.mock('/api/video/list', VideoData)
Mock.mock('/api/music/list', MusicData)
Mock.mock('/api/game/list', GameData)
Mock.mock(/\/api\/game[\s\S]*?/, GameIdData)
Mock.mock('/api/news/list', NewsData)
Mock.mock('/api/ebook/listType', EbookData)

Mock.mock('/api/sms/send', 'post', SMSData)
Mock.mock('/api/feedback/submit', 'post', FeedbackData)

Mock.mock(/\/api\/user\/login[\s\S]*?/, 'post', LoginData)
Mock.mock('/api/4g/status', 'get', statusData)

//  设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
    timeout: '0-300'
})
