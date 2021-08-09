const example_base = (container, base, maxDigits = 8) => {

  const base_HTML = `
    <div class="binaryVal flip-clock">

    </div>
    <div class="baseValues">

    </div>
    <div class="input">
      <div class="baseButton decrease">
        -
      </div>
      <input class="number" type="number" default="42" min="0" max="1024" />
      <div class="baseButton increase">
        +
      </div>
    </div>
  `

  container.innerHTML = base_HTML

  const numberInput = container.querySelector('.number')
  const binaryDisplay = container.querySelector('.binaryVal')
  const baseValues = container.querySelector('.baseValues')

  const incBtn = container.querySelector('.baseButton.increase')
  const decBtn = container.querySelector('.baseButton.decrease')

  let currentVal = ""

  // const maxDigits = 8
  const maxVal = Math.pow( base, maxDigits ) * base - 1
  numberInput.setAttribute('max',maxVal)

  // setup HTML
  for( let i = maxDigits; i >= 0; i--){
    baseValues.innerHTML += "<div class='baseVal'>"+Math.pow( base, i )+"</div>"

    // binaryDisplay.innerHTML += "<div class='binaryDigit'>0</div>"

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
    const currentVal = parseInt( card.getAttribute( "data-currentValue" ) )

    if( currentVal !== newVal ){

      const top = card.querySelector('.card__top')
      const bottom = card.querySelector('.card__bottom')
      const back = card.querySelector('.card__back')
      const backBottom = card.querySelector('.card__back .card__bottom')

      back.setAttribute('data-value', currentVal);
      bottom.setAttribute('data-value', currentVal);

      // card.querySelector('card__bottom')

      // const newVal = currentVal === 0 ? 1 : 0
      top.innerText = newVal;
      backBottom.setAttribute('data-value', newVal);

      card.classList.remove('flip');
      void card.offsetWidth;
      // setTimeout(()=>{
        card.classList.add('flip');
      // },10)

      card.setAttribute( "data-currentValue", newVal )

    }

  }



  const convertDecToBinary = (dec) => {

    const bin = ( dec >>> 0).toString(base)
    let binaryVal = bin

    for( let i = bin.length; i <= maxDigits; i++ ){
      binaryVal = "0" + binaryVal
    }

    currentVal = binaryVal
    for( let i = 0; i < binaryVal.length; i++ ){
      // binaryDigits[i].innerText=binaryVal[i]
      updateFlipCard( i, parseInt( binaryVal[i] ) )
    }
  }

  const convertBinaryToDec = (bin) => {

    numberInput.value = parseInt( bin, base )

    for( let i = 0; i < bin.length; i++ ){
      // binaryDigits[i].innerText=bin[i]
      updateFlipCard( i, parseInt( bin[i] ) )
    }

    currentVal = bin
  }

  numberInput.addEventListener('change',(e)=>{
    convertDecToBinary( e.target.value )
  })
  numberInput.addEventListener('keyup',(e)=>{
    convertDecToBinary( e.target.value )
  })

  incBtn.addEventListener('click',()=>{
    const v = parseInt(numberInput.value)
    if( v < maxVal ){
      numberInput.value = v + 1
      numberInput.dispatchEvent( new Event('change') )
    }
  })

  decBtn.addEventListener('click',()=>{
    const v = parseInt(numberInput.value)
    if( v > 0 ){
      numberInput.value = v - 1
      numberInput.dispatchEvent( new Event('change') )
    }
  })

  binaryDigits.forEach((bd,i)=>{
    bd.addEventListener('click',(e)=>{

      let switchVal = parseInt( bd.getAttribute( "data-currentValue" ) )

      if( base === 2 ){
        if( switchVal === 0 ){
          switchVal = 1
        }else{
          switchVal = 0
        }
      }else{
        switchVal++
        if( switchVal >= base ){
          switchVal = 0
        }
      }
      const newVal = currentVal.substr(0, i) + switchVal + currentVal.substr(i+1)

      convertBinaryToDec(newVal)
    })
  })

  numberInput.value = 42
  convertDecToBinary( numberInput.value )

}
