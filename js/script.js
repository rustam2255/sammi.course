window.addEventListener('DOMContentLoaded', () => {
  const tabParents = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabCOntents = document.querySelectorAll('.tabcontent'),
    loader = document.querySelector('.loader')
  setTimeout(() => {
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  },2000)
  
  function hideTabContent(){
    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active')
    })
    tabCOntents.forEach((item) => {
      item.style.display = 'none'
    })
  }
  function showTabContent(i) {
    tabs[i].classList.add('tabheader__item_active')
    tabCOntents[i].style.display = 'block' 

  }
  hideTabContent()
  showTabContent(0)
  tabParents.addEventListener('click', (even) => {
    const target = even.target
    if(target && target.classList.contains('tabheader__item')){
      tabs.forEach((item, idx) => {
        if(target == item){
          hideTabContent()
          showTabContent(idx)
        }
      })
     }
  })

  //timer
 
  const deadline = '2023-12-31'

  function getTimeRemaining(endtime){
    let days, hours, minutes, seconds

    const timer = Date.parse(endtime) - Date.parse(new Date())
    if(timer <= 0){
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    }
    else{
      days = Math.floor(timer / (1000 * 60 * 60 * 24))
      hours = Math.floor((timer / (1000 * 60 * 60 )) % 24)
      minutes = Math.floor((timer / (1000 * 60  )) % 60)  
      seconds = Math.floor((timer / (1000)) % 60)
    }
    return  {timer,days, hours, minutes,  seconds}
  }

  function getZero(num){
    if(num >= 0 && num < 10){
      return `0${num}`
    }
    else{
      return num
    }
  }
  function setClock(selector, endtime){
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updatClock, 1000)

      updatClock()

    function updatClock(){
      const t = getTimeRemaining(endtime)
      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if(t<0){
        clearInterval(timeInterval)
      }
    }
  }
  setClock('.timer', deadline)

  //modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalClosed = document.querySelector('[data-close]')
  
  function openModal() {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    modal.style.display = 'none'
    document.body.style.overflow = ''
  }
  modalTrigger[1].addEventListener('click', () => {
    openModal()
  })
  modalClosed.addEventListener('click', () => {
    closeModal()
  })
  modal.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal')){
      closeModal()
    }
  })

  document.addEventListener('keydown', (e) => {
    if(e.code = 'Escape' && modal.style.display == 'block'){
      closeModal()
    }
  })


  //class
  class Menucard {
    constructor(src, alt, title, descr, price, parentSelector){
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.transfer = 11000
      this.parent = document.querySelector(parentSelector)
      this.changetoUzs()
    }

    changetoUzs() {
      this.price = this.price * this.transfer
    }

    render() {
      const element = document.createElement('div')
      element.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">
          ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
        </div>
      </div>
      `
      this.parent.append(element)
    }
  }
  new Menucard(
    "img/tabs/1.png",
    "vegy", 
    'Plan "Usual"',
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
    10,
    '.menu  .container'
  ).render()
  new Menucard(
    "img/tabs/2.jpg",
    "elite",
    'Plan "Premium"',
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
    15,
    '.menu .container'
  ).render()
  new Menucard(
    "img/tabs/3.jpg",
    "post",
    'Plan "VIP"',
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
    20,
    '.menu .container'
  ).render()
})