

let windowTop = 0

let headlines = []
let currentHeadline = 0
let navElements = []
let footerDOM = null
let navDOM = null
let footnotesGenerated = false

const initNav = () => {

  navDOM = document.querySelector('nav')
  footerDOM = document.querySelector('footer')

  const navListDOM = document.createElement('ul')

  headlines = document.querySelectorAll("h2, h3, h4")

  headlines.forEach((h)=>{

    const anchor = h.innerText.replace(/\s/g, '-').replace(/\&/g, 'and').replace(/\./g, '_').toLowerCase()

    h.setAttribute('id',anchor)

    const navLi = document.createElement('li')
    navLi.classList.add( h.nodeName )

    const navA = document.createElement('a')
    navA.innerText = h.textContent.replace(/(?:\r\n|\r|\n)/g, '')
    navA.href = "#"+anchor

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

  const footerTop = window.innerHeight - footerDOM.getBoundingClientRect().top

  if( footerTop < 0 ){
    navDOM.classList.remove('isHidden')
  }else{
    navDOM.classList.add('isHidden')
  }

}

const setupExamples = () => {

  example_morse(document.querySelector('#exampleMorse'))

  example_trafficLight(document.querySelector('#exampleTrafficLight'))

  example_base(document.querySelector('#exampleBase2'), 2)
  example_base(document.querySelector('#exampleBase4'), 4, 6)

  example_binaryLetters(document.querySelector('#exampleBinaryletters'))

  example_music(document.querySelector('#exampleMusic'))

  example_textToDNA(document.querySelector('#exampleTextToDNA'))
}

const addSources = () => {

  let sourceDB = []
  const sourcesDOM = document.querySelector('#sourceList')

  const generateSourceList = () => {

    sourceDB.sort((a, b) => {
      let fa = a.author.toLowerCase(),
          fb = b.author.toLowerCase()

      if (fa < fb) {
          return -1
      }
      if (fa > fb) {
          return 1
      }
      return 0
    })


    for( let i = 0; i < sourceDB.length; i++ ){

      const s = sourceDB[i]

      let linkDom = `<a href="https://doi.org/${ s.doi }">${ s.doi }</a>`

      if( (!s.doi || s.doi === "") && s.link ){
        const linkText = s.link.replace(/(^\w+:|^)\/\//, '')
        linkDom = `<a href="${ s.link }">${ linkText }</a>`
      }

      sourcesDOM.innerHTML += `<li>
        <b>${ s.author }. ${ s.year }.</b> “${ s.title }.” ${ s.publisher }. ${ linkDom }
      </li>`

    }
  }

  const getData = () => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        sourceDB = JSON.parse(this.responseText)
        generateSourceList()
      }
    }
    xmlhttp.open("GET", "data/sources.json", true)
    xmlhttp.send()
  }
  getData()
}

const positionFootnotes = () => {

  const startOfArticle = 0
  const footnotesIndicators = document.querySelectorAll('sup')
  const marginalColumn = document.querySelector('.footnotes')
  const footnotes = marginalColumn.querySelectorAll("li")

  let lastBottom = 0

  footnotesIndicators.forEach( (fn,i) => {

    const reference = footnotes[i]
    let topOfLink = fn.getBoundingClientRect().top + window.scrollY - startOfArticle

    if( !footnotesGenerated ){

      const index = i+1

      const dataFor = fn.getAttribute('data-for')
      const fnContent = fn.innerText
      fn.innerHTML = "<a href='#fn:"+index+"'>"+index+"</a>"
      fn.setAttribute('id','sup:'+index)

      // const reference = marginalColumn.querySelector('#fn\\:'+dataFor)
      reference.setAttribute('id','fn:'+index)

      const backLink = document.createElement('a')
      backLink.href = "#sup:"+index
      backLink.innerText = '↥'
      backLink.classList.add('footnoteBacklink')
      reference.appendChild( backLink )

      fn.addEventListener('mouseenter', () => {
        reference.classList.add("isHovering")
      })
      fn.addEventListener('mouseleave', () => {
        reference.classList.remove("isHovering")
      })
    }

    if( topOfLink <= lastBottom ){
      topOfLink = lastBottom
    }

    reference.style.top = topOfLink + 'px'

    // save last bottom in case of overlap
    lastBottom = reference.offsetHeight + topOfLink
  })

  footnotesGenerated = true
}

const initToggleGridDisplay = () => {

  const btn = document.querySelector('#toggleGrid')
  const grid = document.querySelector('#gridDisplay')
  btn.addEventListener('click',()=>{
    grid.classList.toggle('hide')
  })

}

const initSpoilers = () => {


  const spoilers = document.querySelectorAll( '.spoiler' )

  spoilers.forEach((s)=>{

    s.querySelector('.spoilerDesc').addEventListener('click',()=>{

      s.classList.toggle('isOpen')
      positionFootnotes()

    })

  })

}

document.addEventListener("DOMContentLoaded", () => {

  setupExamples()
  addSources()

  initNav()
  updateNavOnScroll()
  initToggleGridDisplay()
  initSpoilers()
})

window.onload = () => {
  positionFootnotes()
}


window.addEventListener("scroll", (e) => {
  windowTop = window.pageYOffset
  updateNavOnScroll()
})

window.addEventListener("resize", () => {
  positionFootnotes()
  updateNavOnScroll()
})





