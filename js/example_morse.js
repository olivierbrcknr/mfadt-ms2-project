const example_morse = (container) => {

  const base_HTML = `
    <div class="inputLetter">
      <input class="letter" type="text" />
    </div>
    <div class="morseCode">

    </div>
    <div class="input">
      <div class="morseButton short">
        short
      </div>
      <div class="morseButton long">
        long
      </div>
      <div class="morseButton clearBtn">
        clear
      </div>
    </div>
  `

  container.innerHTML = base_HTML

  let prevMorseArray = []
  const morseArray = []
  const btnShort = container.querySelector('.morseButton.short')
  const btnLong  = container.querySelector('.morseButton.long')
  const btnClear  = container.querySelector('.morseButton.clearBtn')
  const morseCode  = container.querySelector('.morseCode')
  const letterDOM  = container.querySelector('.letter')
  let timer = null
  let subTimer = null

  let morseDB = []

  const maxNumberOfChar = 1
  letterDOM.setAttribute("maxlength",maxNumberOfChar)

  const getData = () => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        morseDB = JSON.parse(this.responseText)
      }
    }
    xmlhttp.open("GET", "./data/morse.json", true)
    xmlhttp.send()
  }
  getData()

  const updateArray = () => {

    if( timer ){
      clearTimeout(timer)
      clearTimeout(subTimer)
    }
    morseCode.classList.remove('isDissolving')
    morseCode.style.transition = "none"
    letterDOM.classList.remove('isDissolving')
    letterDOM.style.transition = "none"

    if( morseArray !== prevMorseArray ){
      prevMorseArray = [...morseArray]
      displayMorse()
    }

    timer = setTimeout(()=>{
      morseCode.style.transition = "opacity 2s"
      letterDOM.style.transition = "color 2s"
      morseCode.classList.add('isDissolving')
      letterDOM.classList.add('isDissolving')

      subTimer = setTimeout(()=>{
        morseArray.splice(0, morseArray.length)
        letterDOM.value = ""
      }, 2000)
    }, 2000)

  }

  const displayMorse = () => {
    morseCode.innerHTML = ""

    for( let i = 0; i < morseArray.length; i++ ){
      morseCode.innerHTML += "<div class='morseSignal "+morseArray[i]+"'></div>"
    }

    const value = morseArray.join("").replace(/s/g, ".").replace(/l/g, "-")
    const letter = Object.keys(morseDB).find(key => morseDB[key] === value)

    if( letter ){
      letterDOM.value = letter
    }else if( value !== "" ){
      letterDOM.value = "❌"
    }
  }

  const letterToMorse = (val) => {

    const letter = Object.keys(morseDB).find(key => key === val.toLowerCase())
    const code = morseDB[letter]

    morseArray.splice(0, morseArray.length)
    if( code ){
      for( let i = 0; i < code.length; i++ ){
        if( code[i] === '.' ){
          morseArray.push( 's' )
        }else{
          morseArray.push( 'l' )
        }
      }
    }
    updateArray()
  }

  btnShort.addEventListener('click',()=>{
    morseArray.push( 's' )
    updateArray()
  })

  btnLong.addEventListener('click',()=>{
    morseArray.push( 'l' )
    updateArray()
  })

  btnClear.addEventListener('click',()=>{
    morseArray.splice(0, morseArray.length)
    letterDOM.value = ""
    updateArray()
  })

  letterDOM.addEventListener('change',(e)=>{
    letterToMorse( e.target.value )
  })
  letterDOM.addEventListener('keyup',(e)=>{
    letterToMorse( e.target.value )
  })
}
