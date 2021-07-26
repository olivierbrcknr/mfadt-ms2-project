

let windowTop = 0

let headlines = []
let currentHeadline = 0
let navElements = []

const initNav = () => {

  const navDOM = document.querySelector('nav')

  const navListDOM = document.createElement('ul')

  headlines = document.querySelectorAll("h2, h3, h4")

  headlines.forEach((h)=>{

    const anchor = h.innerText.replace(/\s/g, '-').replace(/\&/g, 'and').replace(/\./g, '_').toLowerCase()

    h.setAttribute('id',anchor)

    const navLi = document.createElement('li')
    navLi.classList.add( h.nodeName )

    const navA = document.createElement('a')
    navA.innerText = h.textContent.replace(/(?:\r\n|\r|\n)/g, '')
    navA.href = "#"+anchor;

    navLi.append(navA)
    navListDOM.append(navLi)

  })

  navDOM.append(navListDOM)

  navElements = document.querySelectorAll("nav li")
}

const updateNavOnScroll = () => {

  headlines.forEach((h,i)=>{
    const fromTop = h.getBoundingClientRect().top
    if( fromTop < 20 ){
      currentHeadline = i
    }
  })

  navElements.forEach((li,i)=>{

    if( i < currentHeadline ){
      li.classList.remove('isCurrent')
      li.classList.add('isPast')
    }else if( i === currentHeadline ){
      li.classList.remove('isPast')
      li.classList.add('isCurrent')
    }else{
      li.classList.remove('isCurrent')
      li.classList.remove('isPast')
    }

  })
}

const setupExamples = () => {

  example_morse(document.querySelector('#exampleMorse'))

  example_trafficLight(document.querySelector('#exampleTrafficLight'))

  example_base2(document.querySelector('#exampleBase2'))
  // example_base4(document.querySelector('#exampleBase4'))

  example_binaryLetters(document.querySelector('#exampleBinaryletters'))

  example_music(document.querySelector('#exampleMusic'))

  example_textToDNA(document.querySelector('#exampleTextToDNA'))


}

document.addEventListener("DOMContentLoaded", () => {

  setupExamples()

  initNav()
  updateNavOnScroll()
})


window.addEventListener("scroll", (e) => {
  windowTop = window.pageYOffset
  updateNavOnScroll()
})






