const example_trafficLight = (container) => {

  const base_HTML = `
    <div class="trafficLightContainer">
      <div class="trafficLight">
        <div class="redLight light"></div>
        <div class="greenLight light"></div>
      </div>
    </div>
    <div class="street">
      <div class="car"></div>
    </div>
  `

  container.innerHTML = base_HTML

  let isGreen = true
  let prevVal = null

  const redLight = container.querySelector('.redLight')
  const greenLight = container.querySelector('.greenLight')
  const car = container.querySelector('.car')

  greenLight.classList.toggle('isOff')
  car.classList.toggle('isStopped')

  const setTrafficLight = () => {

    if( prevVal !== isGreen ){

      redLight.classList.toggle('isOff')
      greenLight.classList.toggle('isOff')
      car.classList.toggle('isStopped')

    }
    prevVal = isGreen

  }

  greenLight.addEventListener('click',()=>{
    isGreen = true
    container.classList.add('hasBeenClicked')
    setTrafficLight()
  })

  redLight.addEventListener('click',()=>{
    isGreen = false
    container.classList.add('hasBeenClicked')
    setTrafficLight()
  })

  setTrafficLight()

}
