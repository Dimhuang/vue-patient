export default function (router) {
  router.map({
    '*': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
	  '/home': {
		  component (resolve) {
			  require(['./views/home'], resolve)
		  }
	  },

	  // 注册
	  '/reg/bind': {
		  component (resolve) {
			  require(['./views/reg/bind'], resolve)
		  }
	  },
	  '/reg/register': {
		  component (resolve) {
			  require(['./views/reg/register'], resolve)
		  }
	  },
	  '/reg/disease': {
		  component (resolve) {
			  require(['./views/reg/disease'], resolve)
		  }
	  },

	  // 在线门诊
	  '/online/photo': {
		  component (resolve) {
			  require(['./views/online/photo'], resolve)
		  }
	  },
	  '/online/bill': {
		  component (resolve) {
			  require(['./views/online/bill'], resolve)
		  }
	  },
	  '/online/billCase': {
		  component (resolve) {
			  require(['./views/online/billCase'], resolve)
		  }
	  },
	  '/online/billCaseList': {
		  component (resolve) {
			  require(['./views/online/billCaseList'], resolve)
		  }
	  },
	  '/online/billTurn': {
		  component (resolve) {
			  require(['./views/online/billTurn'], resolve)
		  }
	  },
	  '/online/billCheck': {
		  component (resolve) {
			  require(['./views/online/billCheck'], resolve)
		  }
	  },
	  '/online/feedback': {
		  component (resolve) {
			  require(['./views/online/feedback'], resolve)
		  }
	  },
	  '/online/remind': {
		  component (resolve) {
			  require(['./views/online/remind'], resolve)
		  }
	  },
	  '/online/remindAdd': {
		  component (resolve) {
			  require(['./views/online/remindAdd'], resolve)
		  }
	  },
	  '/online/scheme': {
		  component (resolve) {
			  require(['./views/online/scheme'], resolve)
		  }
	  },
	  '/online/schemeAdd': {
		  component (resolve) {
			  require(['./views/online/schemeAdd'], resolve)
		  }
	  },

	  // 我的医生
	  '/mydoctor/doctor': {
		  component (resolve) {
			  require(['./views/mydoctor/doctor'], resolve)
		  }
	  },
	  '/mydoctor/doctorRate': {
		  component (resolve) {
			  require(['./views/mydoctor/doctorRate'], resolve)
		  }
	  },
	  '/mydoctor/doctorVisits': {
		  component (resolve) {
			  require(['./views/mydoctor/doctorVisits'], resolve)
		  }
	  },

	  // 个人信息
	  '/user/info': {
		  component (resolve) {
			  require(['./views/user/info'], resolve)
		  }
	  },
	  '/user/irritability': {
		  component (resolve) {
			  require(['./views/user/irritability'], resolve)
		  }
	  },
	  '/user/sick': {
		  component (resolve) {
			  require(['./views/user/sick'], resolve)
		  }
	  },
	  '/user/notice': {
		  component (resolve) {
			  require(['./views/user/notice'], resolve)
		  }
	  },
	  '/user/noticeDetail': {
		  component (resolve) {
			  require(['./views/user/noticeDetail'], resolve)
		  }
	  },
	  '/user/about': {
		  component (resolve) {
			  require(['./views/user/about'], resolve)
		  }
	  },
	  '/user/profile': {
		  component (resolve) {
			  require(['./views/user/profile'], resolve)
		  }
	  },
	  '/user/terms': {
		  component (resolve) {
			  require(['./views/user/terms'], resolve)
		  }
	  },
	  '/user/note': {
		  component (resolve) {
			  require(['./views/user/note'], resolve)
		  }
	  },
	  '/user/noteDetail': {
		  component (resolve) {
			  require(['./views/user/noteDetail'], resolve)
		  }
	  }
  })

  router.beforeEach(({to, from, next}) => {
    let toPath = to.path
    let fromPath = from.path
   // console.log(`to: ${toPath} from: ${fromPath}`)
    if (toPath.replace(/[^/]/g, '').length > 1) {
      router.app.isIndex = false
    }
    else {
      let depath = toPath === '/' || toPath === '/home'
      router.app.isIndex = depath ? 0 : 1
    }
    next()
  })

  router.afterEach(function ({to}) {
   // console.log(`成功浏览到: ${to.path}`)
  })
}
