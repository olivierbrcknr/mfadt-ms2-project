

let windowTop = 0

const initNav = () => {

  const headlines = document.querySelectorAll("h1, h2, h3, h4, h5, h6")

  console.log(headlines)
}

document.addEventListener("DOMContentLoaded", () => {

  initNav()


  let exampleMorseContainer = document.querySelector('#exampleMorse')

  example_morse(exampleMorseContainer)

})


window.addEventListener("scroll", (e) => {
  windowTop = window.pageYOffset
})






