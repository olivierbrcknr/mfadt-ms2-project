const example_textToDNA = (container) => {

  const base_HTML = `
    <div class="digitalInput">
      <textarea
        placeholder="Type your text"
        ></textarea>

      <div class="charactersLeft">
        0/0
      </div>
    </div>

    <div class="dnaOutput">
      <!-- JS -->
    </div>
  `

  container.innerHTML = base_HTML

  const maxChar = 90

  const textInput = container.querySelector('textarea')
  textInput.maxLength = maxChar
  const charactersLeftIndicator = container.querySelector('.charactersLeft')
  const dnaOutput = container.querySelector('.dnaOutput')



  const createDNA = (arr) => {

    dnaOutput.innerHTML = ""

    for( let i = 0; i < arr.length; i++ ){

      if( !arr[i] ){
        return
      }

      const dnaDOM = document.createElement('div')
      dnaDOM.classList.add( 'base-'+arr[i] )
      dnaDOM.classList.add('base')
      dnaDOM.innerText = arr[i]

      dnaOutput.append( dnaDOM )

    }
  }


  textInput.addEventListener('keyup', (e)=>{

    const val = e.target.value
    let binaryVal = ""

    for (let i = 0; i < val.length; i++) {
      let binChar = val[i].charCodeAt(0).toString(2)
      binChar = Array(8-binChar.length+1).join("0") + binChar
      binaryVal += binChar
    }

    charactersLeftIndicator.innerText = `${val.length}/${maxChar}`

    let dnaArray = []

    if( binaryVal.length > 0 ){
      dnaArray = binaryVal.match(/.{1,2}/g)
    }

    dnaArray = dnaArray.map( v => {
      switch( v ){
        case '00':
          return 'A'
          break
        case '01':
          return 'C'
          break
        case '10':
          return 'G'
          break
        case '11':
          return 'T'
          break
      }
    } )

    createDNA( dnaArray )
  })

  // show the outcome
  textInput.value = "Type your text"
  textInput.dispatchEvent( new Event('keyup') )

}
