// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
// const Random = Mock.Random
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
            'thumbUrl': '@image(`144x144`,’#b8b8b8`)',
            'description': '@ctitle(200,290)'
        },
        {
            'classType': '头等舱',
            'price': 888,
            'thumbUrl': '@image(`144x144`,`#fff’)',
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
            'src': '@image(`1200x600`)', // 广告资源位置
            'duration': 1, // 持续时间
            'priority': 106, // 优先级
            'resourceId': '50c6c33b-5ee5-4915-8498-59c16e57c0sa', // 跳转的资源id（当resourceType=4时 该字段内容为资源下载的下载地址）
            'type': 1, // 广告类型（1图片，2视频）
            'resourceType': 1 // 广告跳转类型（1：目的地推荐 2：商城 3：富文本4：资源下载，）
        },
        {
            'id': '20f5c4ba-83d4-46c1-a38d-e8ef1c43cff3',
            'src': '@image(`1200x600`)',
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
const RouteData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'title': '通程简介',
            'content': '<p>@ctitle(500,700)</p>'
        },
        {
            'title': '特色服务',
            'content': '<p>@ctitle(500,700)</p>'
        },
        {
            'title': '售后保障',
            'content': '<p>@ctitle(500,700)</p>'
        }
    ]
}
// 航线特惠
const SalesData = {
    'status': 200,
    'msg': '',
    'data|3': [
        {
            'title': '库尔勒->重庆->深圳',
            'titleImg': '@image(`1200x600`)',
            'content': '<p>@ctitle(400,1000)</p>',
            'descrip': '标题下面的描述信息'
        },
        {
            'title': '重庆->北京->通辽',
            'titleImg': '@image(`1200x600`)',
            'content': '<p>@ctitle(500,1200)</p>',
            'descrip': '标题下面的描述信息'
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
                    'poster': ['@image(`500x800`)'],
                    'thumbs': ['@image(`40x40`,`#c33`)', '@image(`40x40`,`#c33`)'],
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
                    'poster': ['@image(`500x800`)'],
                    'thumbs': ['@image(`40x40`,`#c33`)', '@image(`40x40`,`#c33`)'],
                    'description': '@ctitle(20,60)'
                }
            ]
        }
    ]
}
const GameIdData = {
    'status': 200,
    'msg': 'OK',
    'data': {
                    'id': '1eba0854-268e-43e8-bcfc-4a824650hsju',
                    'name': '@ctitle(4,8)',
                    'src': 'http://118.178.84.155:88/test/test/game/gamefile_1a149cee-6943-452a-ae12-b855c654f5ad/index.html',
                    'poster': '@image(`100x180`)',
                    'description': '@ctitle(50,100)',
                    'status': null,
                    'position': '22',
                    'gameType': null,
                    'thumbs': [
                        '@image(`1200x600`)',
                        '@image(`1200x600`)',
                        '@image(`1200x600`)',
                        '@image(`1200x600`)',
                        '@image(`1200x600`)'
                    ]
                }
}
// 音乐  来源http://gequdaquan.net/gqss/
const MusicData = {
    'status': 200,
    'msg': '',
    'data': [
        {
            'type': '流行',
            'items|6': [
                {
                    'name': '世间美好与你环环相扣',
                    'singer': '柏松',
                    'src': 'http://m7.music.126.net/20200311153911/15180f2f85d0b2bb92d7e000f408c3ce/ymusic/0459/045c/520c/330c359473365e50a368ef0d43bc612f.mp3',
                    'lyrics': '',
                    'duration': '200' // 时长
                },
                {
                    'name': '起风了',
                    'singer': '买辣椒也用券',
                    'src': 'http://m7.music.126.net/20200311155207/67079a0c3d556e7bc65c0ad211762208/ymusic/0758/550f/545f/028d3b9421be8425d60dc57735cf6ebc.mp3',
                    'lyrics': '',
                    'duration': '200' // 时长
                }
            ]
        },
        {
            'type': '民谣',
            'items|5': [
                {
                    'name': '麻雀',
                    'singer': '李荣浩',
                    'src': 'http://m7.music.126.net/20200311154759/8af9bf69c71e22ea588103b37b172db4/ymusic/555b/0f58/0609/b1e0b087cb826dde13b21cbaa504f963.mp3',
                    'lyrics': '',
                    'duration': '200' // 时长
                },
                {
                    'name': '多想在平庸的生活拥抱你',
                    'singer': '隔壁老樊',
                    'src': 'http://m7.music.126.net/20200311155347/542ddb5ca08a901774ca71892cf4efac/ymusic/918c/1958/7d87/022d7d76c923b1caaca6e30ca47d0f69.mp3',
                    'lyrics': '',
                    'duration': '200' // 时长
                },
                {
                    'name': '这一生关于你的风景',
                    'singer': '隔壁老樊',
                    'src': 'http://m8.music.126.net/20200311155719/c1f4b82d1d10990a54f52225d2c0ad2b/ymusic/0f59/030c/0609/8302f4e1f04f8d7d162f1c3db87fd0e7.mp3',
                    'lyrics': '',
                    'duration': '200' // 时长
                }
            ]
        }
    ]
}
// 视频
const VideosData = {
    'status': 200,
    'msg': 'OK',
    'data': [
        {
            'id': 1,
            'hrefName': '_movie', // 影视大分类 _movie:电影，_shot:短视频 _xuanchuan:宣传片
            'modelName': '电影' // 影视小分类
        },
        {
            'id': 2,
            'hrefName': '_shot',
            'modelName': '短视频' // 影视小分类
        },
        {
            'id': 3,
            'hrefName': '_m',
            'modelName': 'Vlog' // 影视小分类
        }
    ]
}
const ShortListData = {
    'status': 200,
    'msg': 'OK',
    'data': [
        { 'total': 2, // 总数据条数
          'data': [ // 数据集合
                    {
                        'id': '7de6887e-7946-11e9-b9ff-704d7bbd8ffe',
                        'title': '短视频1',
                        'score': '6.5',
                        'duration': 33654,
                        'size': 43453,
                        'urlVideo': '/aaa/aaaaa.mp4'
                    },
                    {
                        'id': '967344a1-7946-11e9-b9ff-704d7bbd8ffe',
                        'title': '短视频2',
                        'score': '3.9',
                        'duration': 213213,
                        'size': 13213,
                        'urlVideo': '/bbb/bbb.mp4'
                    }
            ]
        }
    ]
}
const MovieData = {
    'status': 200,
    'msg': 'OK',
    'data|6': [
        {
            'id': '496faaec-7a46-11e9-b9ff-704d7bbd8ffe',
            'title': '变形精钢', // 电影名称
            'clazz': '1', // 电影分类 1：动作 2：爱情 3：科幻 4： 战争 5：动画
            'score': '8.6', // 评分
            'info': '这是变形精钢', // 简介
            'duration': 16515, // 时长（暂未启用）
            'country': '美国', // 城市或国家
            'showtime': '2017-06-08', // 上映时间
            'size': 6546546, // 文件大小
            'urlVideo': '/54546/sadad/aaa.mp4', // 视频地址（全路径）
            'urlPoster': '@image(`120x200`)', // 封面地址（全路径）
            'movieType': null,
            'thumbs': [// 剧照 （全路径）
                '@image',
                '@image'
            ]
        },
        {
            'id': 'd72e2361-7a46-11e9-b9ff-704d7bbd8ffe',
            'title': '西游记',
            'clazz': '3',
            'score': '9.3',
            'info': '一个猴子 一个猪 一个和尚，，，，，，',
            'duration': 3345435,
            'country': '中国',
            'showtime': '2008-06-29',
            'size': 435345,
            'urlVideo': '/sadavx/ddg.mp4',
            'urlPoster': '@image(`120x200`)',
            'movieType': null,
            'thumbs': [
                '@image'
            ]
        }
    ]
}
// 商品id
const ItemIdData = {
    'status': 200,
    'msg': 'OK',
    'data': {
            'id|1-30': 1,
            'name': '@cword(5,8)', // 商品名称
            'price|30-1000': 30, // 商品价格
            'description': '@ctitle(30,60)', // 商品描述
            'type|1': [ '文创', '航鲜', '旅游' ],
            'thumbUrls': [ '@image(`#aaa`)', '@image(`1200x2400`,`#aaa`)', '@image(`1200x2400`,`#ccc`)', '@image(`1200x2400`,`#aaa`)' ],
            'isfree|1': [0, 1] // 0收费 1免费
        }
}
// 列表
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
            'thumbUrls': [ '@image(`#c33`)', '@image(`40x40`,`#c33`)', '@image(`40x40`,`#c33`)', '@image(`40x40`,`#c33`)' ],
            'isfree|1': [0, 1], // 0收费 1免费
            'urlPoster': ['@image(`168x168`)']
        }
    ]
})
const ItemSubmit = {
    'status': 200,
    'msg': '',
    'data': null
}

const AdvertiseData = {
    'status': 200,
    'msg': 'OK',
    'data|6': [
        {
            'id': '93ff1bfa-7936-11e9-b9ff-704d7bbd8ffe',
            'title': '公司宣传片',
            'score': '5.6',
            'info': '这是公司的宣传片。。。。点击有劲爆内容',
            'duration': 3600,
            'size': 36802,
            'urlVideo': '/aaa/aaa.mp4',
            'urlCover': '@image(`120x200`)'
        },
        {
            'id': 'e1a5eea4-7936-11e9-b9ff-704d7bbd8ffe',
            'title': '公司宣传片2',
            'score': '7.8',
            'info': '这是一个内置的宣传片，搞笑又好看',
            'duration': 1800,
            'size': 12134,
            'urlVideo': '/aaa/abbb.mp4',
            'urlCover': '@image(`120x200`)'
        }
    ]
}
const AdvertiseIdData = {
    'status': 200,
    'msg': 'OK',
    'data': {
        'id': '93ff1bfa-7936-11e9-b9ff-704d7bbd8ffe',
        'title': '公司宣传片', // 视频民名称
        'score': '5.6', // 评分
        'info': '这是公司的宣传片。。。。点击有劲爆内容', // 简介
        'duration': 3600, // 时长（暂未启用）
        'size': 36802, // 文件大小
        'urlVideo': '/aaa/aaa.mp4', // 视频地址（全路径）
        'urlCover': '@image' // 封面地址（全路径）
    }
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
const OrderCancerData = {
    'status': 200,
    'msg': 'OK',
    'data': null
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

const MemberSaveData = {
    'status': 200,
    'msg': 'OK',
    'data': null
}
const MemberGetData = {
    'status': 200,
    'msg': 'OK',
    'data': {
        'id': 1,
        'name': '小张', // 姓名
        'phone': '13569653656', // 手机号码
        'grade': 'L2', // 会员等级
        'integral': 250 // 会员积分
    }
}
// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
const NewsData = {
    'status': 200,
    'msg': 'OK',
    'data': [
        {
            'id': '10edfdca-7660-11e9-b816-704d7bbd8ffe',
            'title': '中美贸易战', // 摘要
            'content': '<p>开始打贸易战了，雄起@ctitle(500,700)</p>', // 内容
            'summary': '中国美国正式开打贸易战', // 摘要
            'urlImg': '@image(`100x180`)', // 摘要图片
            'source': '新华社', // 新闻来源
            'typeName': '财经', // 新闻类型
            'position': '3', // 优先级
            'releaseTime': '2019-07-26 13:22' // 新闻的发生时间（发布时间）
        },
        {
            'id': '3d24c058-7660-11e9-b816-704d7bbd8ffe',
            'title': '兄弟，买玩具么？',
            'content': '<p>一个搞笑新闻@ctitle(500,700)</p>',
            'summary': '什么玩具最好玩',
            'urlImg': '@image(`100x180`)',
            'source': 'CNN',
            'typeName': '儿童',
            'position': '2',
             'releaseTime': '2019-07-26 13:22'
        }
    ]
}
// 杂志 电子书
const PeriodicalData = {
    'status': 200,
    'msg': 'OK',
    'data|5': [
        {
            'id': '003ef251-72d6-11e9-b816-704d7bbd8ffe', // ID
            'name': '十万个为什么', // 杂志名称
            'author': '未知', // 杂志作者
            'urlPoster': '@image(`120x200`)', // 封面地址
            'position': 'asda' // 优先级
        },
        {
            'id': '859767f9-df44-461b-8543-acfabcb80abe',
            'name': '漫长的战斗',
            'author': '老赵二代',
            'urlPoster': '@image(`120x200`)',
            'position': '2'
        }
    ]
}
const PeriodicalIdData = {
    'status': 200,
    'msg': 'OK',
    'data|10': [
        {
            'page': 1, // 页码
            'src': '@image(`1200x2000`)'// 页码图片
        },
        {
            'page': 2,
            'src': '@image(`1200x2000`,`#aaa`)'
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
const EbookListData = {
    'status': 200,
    'msg': 'OK',
    'data|9': [
        {
            'id': '003ef251-72d6-11e9-b816-704d7bbd8ffe',
            'name': '十万个为什么',
            'author': '未知',
            'src': '/sdad/asda/adadaadfd.pdf',
            'urlPoster': '@image(`120x200`)',
            'position': 'asda'
        }
    ]
}

// 三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
Mock.mock('/api/flightDetail/getUserFlight', 'get', FlightDetailData)
Mock.mock('/api/flightDetail/get', 'get', FlightData)

// 商品有关
Mock.mock(/\/api\/item\/list[\s\S]*?/, 'get', () => { return shopdata })
Mock.mock('/api/item/submit', 'post', ItemSubmit)
Mock.mock(/\/api\/item[\s\S]*?/, 'get', ItemIdData)

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
// 订单有关
Mock.mock('/api/order/unfinished', 'post', UnfinishedData)
Mock.mock('/api/order/list', 'get', OrderData)
Mock.mock(/\/api\/order\/cancel[\s\S]*?/, 'post', OrderCancerData)
// 个人中心
Mock.mock(/\/api\/member\/save[\s\S]*?/, 'post', MemberSaveData)
Mock.mock(/\/api\/member\/get[\s\S]*?/, MemberGetData)
// 视频
Mock.mock('/api/film/listType', VideosData)
Mock.mock(/\/api\/short\/list[\s\S]*?/, ShortListData)
Mock.mock(/\/api\/movie\/list[\s\S]*?/, MovieData)
// Mock.mock('/api/video/list', VideoData)
Mock.mock(/\/api\/advertise\/list[\s\S]*?/, AdvertiseData)
Mock.mock(/\/api\/advertise[\s\S]*?/, AdvertiseIdData)

Mock.mock('/api/music/list', MusicData)
Mock.mock('/api/game/list', GameData)
Mock.mock(/\/api\/game[\s\S]*?/, GameIdData)

Mock.mock('/api/ebook/listType', EbookData)
Mock.mock('/api/news/list', NewsData)
Mock.mock(/\/api\/ebook\/list[\s\S]*?/, EbookListData)
// 杂志
Mock.mock(/\/api\/periodical\/list[\s\S]*?/, 'get', PeriodicalData)
Mock.mock(/\/api\/periodical[\s\S]*?/, 'get', PeriodicalIdData)

Mock.mock('/api/sms/send', 'post', SMSData)
Mock.mock('/api/feedback/submit', 'post', FeedbackData)

Mock.mock(/\/api\/user\/login[\s\S]*?/, 'post', LoginData)
Mock.mock('/api/4g/status', 'get', statusData)

//  设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
    timeout: '0-300'
})
