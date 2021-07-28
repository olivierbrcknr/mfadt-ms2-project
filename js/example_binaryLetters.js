const example_binaryLetters = (container) => {

  const base_HTML = `
    <div class="binaryVal">

    </div>
    <div class="input">
      <input class="letter" type="text" />
    </div>
  `

  container.innerHTML = base_HTML

  const maxDigits = 8
  const letterInput = container.querySelector('.letter')
  const binaryDisplay = container.querySelector('.binaryVal')
  const baseValues = container.querySelector('.baseValues')

  const maxNumberOfChar = 1

  letterInput.setAttribute("maxlength",maxNumberOfChar)

  let currentVal = ""

  // setup HTML
  for( let i = maxDigits; i >= 0; i--){
    binaryDisplay.innerHTML += "<div class='binaryDigit'>0</div>"
  }

  const binaryDigits = container.querySelectorAll('.binaryDigit')

  const convertLetterToBinary = (char) => {

    let binChar = char.charCodeAt(0).toString(2)
    binChar = Array(8-binChar.length+1).join("0") + binChar

    if( !char ) {
      binChar = Array(9).join("0")
      console.log(binChar)
    }

    for( let i = 0; i < binChar.length; i++ ){
      binaryDigits[i].innerText=binChar[i]
    }

    currentVal = binChar
  }

  const convertBinaryToLetter = (bin) => {
    const character = String.fromCharCode( parseInt(bin,2).toString(10) )

    for( let i = 0; i < bin.length; i++ ){
      binaryDigits[i].innerText=bin[i]
    }
    currentVal = bin

    letterInput.value = character
  }

  // const convertBinaryToDec = (bin) => {

  //   numberInput.value = parseInt( bin, base )

  //   for( let i = 0; i < bin.length; i++ ){
  //     binaryDigits[i].innerText=bin[i]
  //   }

  //   currentVal = bin
  // }

  // letterInput.addEventListener('change',(e)=>{
  //   convertLetterToBinary( e.target.value )
  // })
  letterInput.addEventListener('keydown',(e)=>{

    const char = String.fromCharCode(e.keyCode)
    convertLetterToBinary( char )
    letterInput.value = char
    // convertLetterToBinary( e.target.value )
  })

  binaryDigits.forEach((bd,i)=>{
    bd.addEventListener('click',(e)=>{

      let switchVal = bd.innerText

      if( switchVal === "0" ){
        switchVal = 1
      }else{
        switchVal = 0
      }

      const newVal = currentVal.substr(0, i) + switchVal + currentVal.substr(i+1)
      convertBinaryToLetter(newVal)
    })
  })

  letterInput.value = 'A'
  convertLetterToBinary('A')

}
