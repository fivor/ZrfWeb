// 添加视差效果
var image = document.getElementsByClassName('banner-pic-img');
new simpleParallax(image, {
  orientation: 'up',
  scale: 1.2,
  delay: 2,
  transition: 'cubic-bezier(0,0,0,1)',
  maxTransition: 50,
  overflow: true
});

// 添加菜单点击事件
var menuButton = document.getElementById("nav-menu");
menuButton.addEventListener('click',function(){
  if(document.getElementById("body").classList.contains('show-menu')) {
    heoWeb.hideMenu();
  }else {
    heoWeb.showMenu();
  }
},false)

//关闭菜单
document.querySelector('.menu-list').addEventListener('click', function () {
  heoWeb.hideMenu();
});

//阻止菜单滚动
document.querySelector('.menu-list').addEventListener('wheel',(e)=>{
  e.preventDefault()
})

var heoWeb = {
  //显示菜单
  showMenu: function() {
    document.getElementById("body").classList.add("show-menu");
  },

  hideMenu: function() {
    document.getElementById("body").classList.remove("show-menu");
  },

  //跳转到id
  scrollTo(id) {
    let target = document.getElementById(id);
    if (!target) return;
    let targetPosition = target.offsetTop - 60;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      let run = ease(timeElapsed, startPosition, distance, 600);
      window.scrollTo(0, run);
      if (timeElapsed < 600) requestAnimationFrame(animation);
    }
  
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
}

//滚动页面动画
function scrollToTopWithAnimation() {
  const duration = 600; // in milliseconds
  const startPosition = window.pageYOffset;
  const distance = -window.pageYOffset;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollY);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// 微信公众号二维码弹窗
(function() {
  var modal = document.getElementById('wechat-modal');
  var closeBtn = document.getElementById('wechat-modal-close');
  var wechatBtn = document.querySelector('.wechat-btn');
  var hoverTimer = null;

  function showModal() {
    if (modal) modal.classList.add('show');
  }

  function hideModal() {
    if (modal) modal.classList.remove('show');
  }

  // 鼠标悬停"关注"按钮时显示弹窗
  if (wechatBtn && modal) {
    wechatBtn.addEventListener('mouseenter', function() {
      hoverTimer = setTimeout(showModal, 200);
    });

    wechatBtn.addEventListener('mouseleave', function() {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      setTimeout(function() {
        if (!modal.matches(':hover')) {
          hideModal();
        }
      }, 100);
    });

    // 鼠标离开弹窗时关闭
    modal.addEventListener('mouseleave', function() {
      hideModal();
    });
  }

  // 点击按钮打开弹窗
  if (wechatBtn) {
    wechatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showModal();
    });
  }

  // 点击关闭按钮
  if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
  }

  // 点击弹窗外部关闭
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        hideModal();
      }
    });
  }
})();