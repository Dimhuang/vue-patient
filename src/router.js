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
	  '/reg/info': {
		  component (resolve) {
			  require(['./views/reg/info'], resolve)
		  }
	  },
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
	  }
  })

  router.beforeEach(({to, from, next}) => {
    let toPath = to.path
    let fromPath = from.path
    console.log(`to: ${toPath} from: ${fromPath}`)
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
    console.log(`成功浏览到: ${to.path}`)
  })
}