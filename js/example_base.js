const example_base = (container, base, maxDigits = 8) => {

  const base_HTML = `
    <div class="binaryVal">

    </div>
    <div class="baseValues">

    </div>
    <div class="input">
      <input class="number" type="number" default="42" min="0" max="1024" />
    </div>
  `

  container.innerHTML = base_HTML

  const numberInput = container.querySelector('.number')
  const binaryDisplay = container.querySelector('.binaryVal')
  const baseValues = container.querySelector('.baseValues')

  let currentVal = ""

  // const maxDigits = 8
  numberInput.setAttribute('max',Math.pow( base, maxDigits ) * base - 1)

  // setup HTML
  for( let i = maxDigits; i >= 0; i--){
    baseValues.innerHTML += "<div class='baseVal'>"+Math.pow( base, i )+"</div>"
    binaryDisplay.innerHTML += "<div class='binaryDigit'>0</div>"
  }

  const binaryDigits = container.querySelectorAll('.binaryDigit')

  const convertDecToBinary = (dec) => {

    const bin = ( dec >>> 0).toString(base)
    let binaryVal = bin

    for( let i = bin.length; i <= maxDigits; i++ ){
      binaryVal = "0" + binaryVal
    }

    currentVal = binaryVal
    for( let i = 0; i < binaryVal.length; i++ ){
      binaryDigits[i].innerText=binaryVal[i]
    }
  }

  const convertBinaryToDec = (bin) => {

    numberInput.value = parseInt( bin, base )

    for( let i = 0; i < bin.length; i++ ){
      binaryDigits[i].innerText=bin[i]
    }

    currentVal = bin
  }

  numberInput.addEventListener('change',(e)=>{
    convertDecToBinary( e.target.value )
  })
  numberInput.addEventListener('keyup',(e)=>{
    convertDecToBinary( e.target.value )
  })

  binaryDigits.forEach((bd,i)=>{
    bd.addEventListener('click',(e)=>{
      let switchVal = bd.innerText

      if( base === 2 ){
        if( switchVal === "0" ){
          switchVal = 1
        }else{
          switchVal = 0
        }
      }else{
        switchVal = parseInt(switchVal)
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
