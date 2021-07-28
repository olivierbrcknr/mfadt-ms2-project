const example_music = (container) => {

  const base_HTML = `
    <div class="song">
      <div class="title"></div>
      <div class="play">play</div>
      <div class="clearSong">clear</div>
    </div>
    <div class="noteLines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div class="notes">

    </div>
    <div class="buttons">
      <div class="a noteBtn" data-type="a">A</div>
      <div class="l noteBtn" data-type="l">←</div>
      <div class="u noteBtn" data-type="u">↑</div>
      <div class="r noteBtn" data-type="r">→</div>
      <div class="d noteBtn" data-type="d">↓</div>
    </div>
  `

  container.innerHTML = base_HTML

  let clickPrevent = false

  const noteDOMs = container.querySelectorAll('.noteBtn')
  const playDOM = container.querySelector('.play')
  const clearDOM = container.querySelector('.clearSong')
  // const songDOM = container.querySelector('.song')
  const notesDOM = container.querySelector('.notes')
  const titleDOM = container.querySelector('.title')

  const notes = {
    a: new Audio('audio/a.wav'),
    r: new Audio('audio/r.wav'),
    l: new Audio('audio/l.wav'),
    u: new Audio('audio/u.wav'),
    d: new Audio('audio/d.wav'),
    error: new Audio('audio/error.wav'),
    correct: new Audio('audio/correct.wav'),
  }

  let songDB = null
  let currentSong = []

  const getData = () => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        songDB = JSON.parse(this.responseText)
      }
    }
    xmlhttp.open("GET", "data/zelda_songs.json", true)
    xmlhttp.send()
  }
  getData()

  const playSong = (arr,callback=()=>{}) => {

    for( let i = 0; i < arr.length; i++ ){

      setTimeout(()=>{
        notes[ arr[i] ].cloneNode(true).play()

        if( i === arr.length-1 ){

          setTimeout(()=>{
            callback()
          }, 500 )
        }
      }, 500*i)
    }
  }

  const checkForSongs = () => {

    let foundSong = false

    const currentSongString = currentSong.join("")

    const zeldaSong = Object.keys(songDB).find(key => songDB[key] === currentSongString)

    if( zeldaSong ){

      clickPrevent = true

      notes[ "correct" ].cloneNode(true).play()

      titleDOM.innerText = zeldaSong

      setTimeout(()=>{

        playSong( songDB[zeldaSong], ()=>{

          clickPrevent = true
          currentSong = []

          setTimeout(()=>{
            notesDOM.innerHTML = ""
            clickPrevent = false
            titleDOM.innerText = ""
          }, 500)

        } )

      },500)
    }

  }

  const songChange = () => {

    checkForSongs()

    notesDOM.innerHTML = ""

    for( let i = 0; i < currentSong.length; i++ ){

      let noteType = currentSong[i]
      switch( noteType ){
        case "a":
          noteType = "A"
          break
        case "l":
          noteType = "←"
          break
        case "r":
          noteType = "→"
          break
        case "u":
          noteType = "↑"
          break
        case "d":
          noteType = "↓"
          break
      }

      notesDOM.innerHTML += "<div class='note "+currentSong[i]+"'>"+noteType+"</div>"
    }

    if( currentSong.length > 7 ){

      setTimeout(()=>{

        currentSong = []
        notes[ "error" ].cloneNode(true).play()

        notesDOM.classList.add('isError')
        clickPrevent = true

        setTimeout(()=>{
          notesDOM.classList.remove('isError')
          notesDOM.innerHTML = ""
          clickPrevent = false
        }, 500)
      }, 300)

    }
  }


  noteDOMs.forEach((n)=>{
    n.addEventListener('click',()=>{
      if( !clickPrevent ){
        const dir = n.getAttribute("data-type")
        notes[dir].cloneNode(true).play()
        currentSong.push(dir)
        songChange()
      }
    })
  })

  playDOM.addEventListener('click',()=>{
    playSong( currentSong )
  })

  clearDOM.addEventListener('click',()=>{
    currentSong = []
    songChange()
  })

}

