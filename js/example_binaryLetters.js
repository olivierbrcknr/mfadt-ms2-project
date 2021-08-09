const example_binaryLetters = (container) => {

  const base_HTML = `
    <div class="binaryVal flip-clock">

    </div>
    <div class="input">
      <input class="letter" type="text" />
    </div>
  `

  container.innerHTML = base_HTML

  const maxDigits = 8
  const letterInput = container.querySelector('.letter')
  const binaryDisplay = container.querySelector('.binaryVal')

  const maxNumberOfChar = 1

  letterInput.setAttribute("maxlength",maxNumberOfChar)

  let currentVal = ""

  // setup HTML
  for( let i = 0; i < maxDigits; i++){

    binaryDisplay.innerHTML += `
      <span class="flip-clock__piece binaryDigit" data-currentValue="0">
        <b class="flip-clock__card card">
          <b class="card__top">0</b>
          <b class="card__bottom" data-value="0"></b>
          <b class="card__back" data-value="0">
            <b class="card__bottom" data-value="0"></b>
          </b>
        </b>
      </span>
    `
  }

  const binaryDigits = container.querySelectorAll('.binaryDigit')

  const updateFlipCard = ( index, newVal ) => {

    const card = binaryDigits[index]
    const currentCardVal = parseInt( card.getAttribute( "data-currentValue" ) )

    if( currentCardVal !== newVal ){

      const top = card.querySelector('.card__top')
      const bottom = card.querySelector('.card__bottom')
      const back = card.querySelector('.card__back')
      const backBottom = card.querySelector('.card__back .card__bottom')

      back.setAttribute('data-value', currentCardVal);
      bottom.setAttribute('data-value', currentCardVal);

      // card.querySelector('card__bottom')

      // const newVal = currentVal === 0 ? 1 : 0
      top.innerText = newVal;
      backBottom.setAttribute('data-value', newVal);

      card.classList.remove('flip');

      void card.offsetWidth;
      card.classList.add('flip');

      card.setAttribute( "data-currentValue", newVal )

    }

  }



  const convertLetterToBinary = (char) => {

    let binChar = char.charCodeAt(0).toString(2)
    binChar = Array(8-binChar.length+1).join("0") + binChar

    if( !char ) {
      binChar = Array(9).join("0")
    }

    currentVal = binChar

    for( let i = 0; i < binChar.length; i++ ){
      // binaryDigits[i].innerText=binaryVal[i]
      updateFlipCard( i, parseInt( binChar[i] ) )
    }
  }

  const convertBinaryToLetter = (bin) => {
    const character = String.fromCharCode( parseInt(bin,2).toString(10) )

    for( let i = 0; i < bin.length; i++ ){
      // binaryDigits[i].innerText=bin[i]
      updateFlipCard( i, parseInt( bin[i] ) )
    }
    currentVal = bin

    letterInput.value = character
  }



  letterInput.addEventListener('keydown',(e)=>{
    const char = String.fromCharCode(e.keyCode)
    convertLetterToBinary( char )
    letterInput.value = char
  })

  binaryDigits.forEach((bd,i)=>{
    bd.addEventListener('click',(e)=>{

      let switchVal = parseInt( bd.getAttribute( "data-currentValue" ) )

      if( switchVal === 0 ){
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
