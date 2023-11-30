window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader'),
    tabPArents = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabContents = document.querySelectorAll('.tabcontent')
  //loader
  setTimeout(() => {
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  },2000)

  // films
  function hideTabContent() {
    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active')
    })
    tabContents.forEach((item) => {
      item.style.display = 'none'
    })
  }

  function showTabContent(i) {
    tabs[i].classList.add('tabheader__item_active')
    tabContents[i].style.display = 'block'
  }
  hideTabContent()
  showTabContent(0)

  tabPArents.addEventListener('click', (e) =>{
    const target = e.target
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
  function getTimeRemaining(endTime){
    let days, hours, minutes,seconds

    const timer = Date.parse(endTime) - Date.parse(new Date())
    if(timer <= 0){
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    }
    else{
      days = Math.floor(timer / (1000*60*60*24))
      hours = Math.floor((timer / (1000 * 60 *60)) % 24)
      minutes = Math.floor((timer / (1000 * 60)) % 60)
      seconds = Math.floor((timer / 1000) % 60  )
    }
    return {days, hours, minutes, seconds}
  }
  function getZero(num){
    if(num >= 0 && num < 10){
      return `0${num}`
    }
    else{
      return num
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds')
      timeInterval = setInterval(updatClock, 1000)
      updatClock()
    function updatClock() {
      const t = getTimeRemaining(endTime)
      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if(t < 0){
        clearInterval(setInterval)
      }
    }
  }
  setClock('.timer', deadline)

  //modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal')
    
  function openModal(){
    modal.style.display = 'block'
     document.body.style.overflow = 'hidden'
  }
  function closeModal(){
    modal.style.display = 'none'
    document.body.style.overflow = ''
  }
  modalTrigger[1].addEventListener('click', () => {
   openModal()
  })
 
  modal.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal') || e.target.getAttribute('data-close') == ''){
      closeModal()
    }
  })
  document.addEventListener('keydown', (e) => {
    if(e.code == 'Escape' && modal.style.display === 'block'){
      closeModal()
    }
  }) 
  
  //class
  class Menucard{
    constructor(src, alt, title, descr, price, parentSelector){
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.transfer = 11000
      this.parentSelector = document.querySelector(parentSelector)
      this.changetoUzs()
    }

    changetoUzs(){
      this.price = this.price * this.transfer
    }

    render(){
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
      </div>`
      this.parentSelector.append(element)
    }
  }
  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({img, altimg, title, descr, price}) => {
      new Menucard(img, altimg, title, descr, price, '.menu .container').render()
    })
  })

  
  // form
  const forms = document.querySelectorAll('form')

  const msg = {
    loading: 'icons/spinner.svg',
    succes: 'Thanks for submitting our form',
    failure: 'Something went wrong'
  }
  

  forms.forEach((a) => {
    bindPostData(a)
  })

  async function postData(url, data){
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
    })

    return await res.json()

  }

  function bindPostData(a){
    a.addEventListener('submit', (e) => {
      e.preventDefault()
      const statusMessage = document.createElement('img')
      statusMessage.src = msg.loading
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `
      a.append(statusMessage) 


      const formData = new FormData(a)
      const json = JSON.stringify(Object.fromEntries(formData.entries())) 

     
     
      postData('http://localhost:3000/request', json)
        .then((data) => {
          console.log(data)
          showThanksModal(msg.succes)
          statusMessage.remove()
        })
        .catch(() => {
          showThanksModal(msg.failure)
        })
        .finally(() => {
          a.reset()
        })

      

      

    

    })
  }

  function showThanksModal(massage){
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.style.display = 'none'
    openModal()
    const thanksModa = document.createElement('div')
    thanksModa.classList.add('modal__dialog')
    thanksModa.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${massage}</div>
    </div>
    `
    document.querySelector('.modal').append(thanksModa)
    setTimeout(() => {
      thanksModa.remove()
      prevModalDialog.style.display = 'block'
      closeModal()
    }, 4000)
  }

  fetch('http://localhost:3000/menu')
    .then((data) => data.json())
    .then((res) => console.log(res))
  
    //slider
  const slider = document.querySelectorAll('.offer__slide'),
    next = document.querySelector('.offer__slider-next'),
    prev = document.querySelector('.offer__slider-prev'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current')
  let slideIndex = 1
  if(slider.length < 10){
    total.textContent = `0${slider.length}`
  }else{
    total.textContent = slider.length
  }
  showSlides(slideIndex)

  function showSlides(idx){
    if(idx > slider.length){
      slideIndex = 1
    }
    if(idx < 1){
      slideIndex = slider.length
    }


    slider.forEach((item) => {
      item.style.display = 'none'
    })
    slider[slideIndex-1].style.display = 'block'
    if(slider.length < 10){
      current.textContent = slideIndex
    }else{
      current.textContent = slideIndex
    }
  }
  function plusSlides(idx){
    showSlides(slideIndex += idx)
  }
  next.addEventListener('click', () => {
    plusSlides(1)
  })
  prev.addEventListener('click', () => {
    plusSlides(-1)
  })

})




