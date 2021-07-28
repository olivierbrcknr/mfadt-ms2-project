

let windowTop = 0

let headlines = []
let currentHeadline = 0
let navElements = []
let footerDOM = null
let navDOM = null

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
      let fa = a.title.toLowerCase(),
          fb = b.title.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    });


    for( let i = 0; i < sourceDB.length; i++ ){

      const s = sourceDB[i]

      sourcesDOM.innerHTML += `<li>
        <b>${ s.author }</b>. “${ s.title }.” ${ s.publisher }, ${ s.year }. <a href="${ s.link }">[Link]</a>
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
  const footnotes = document.querySelectorAll('sup')
  const marginalColumn = document.querySelector('.footnotes')

  footnotes.forEach( (fn) => {

    const id = fn.getAttribute('data-for')
    const fnContent = fn.innerText
    fn.innerHTML = "<a href='#fn:"+id+"'>"+fnContent+"</a>"

    const reference = marginalColumn.querySelector('#fn\\:'+id)

    let topOfLink = fn.getBoundingClientRect().top + window.scrollY - startOfArticle;

    fn.addEventListener('mouseenter', () => {
      reference.classList.add("isHovering");
    });
    fn.addEventListener('mouseleave', () => {
      reference.classList.remove("isHovering");
    });

    reference.style.top = topOfLink + 'px';
  });
}

document.addEventListener("DOMContentLoaded", () => {

  setupExamples()
  addSources()

  initNav()
  updateNavOnScroll()
  positionFootnotes()
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





