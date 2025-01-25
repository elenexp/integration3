
{

  let earnings = 0;
  let errorState = 0;
  let letterState = 0;
  let counter = 5;
  let startCounter = false;
  let startPrinterInteraction = false;

  const $root = document.querySelector(':root');
  let left = -10;

  const $status = document.querySelector(`.printer_interaction_status`);

  const speakHandler = () => {
    const speech = new SpeechSynthesisUtterance(`In the beginning God created the heavens and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. And God said, 'Let there be light:' and there was light.`);
    speechSynthesis.speak(speech);
  }

  const checkError = (event) => {
    if (event.currentTarget.classList.contains('error_word') && !event.currentTarget.classList.contains('corrected')) {
      errorState += 1
      console.log(errorState);
      event.currentTarget.classList.add('pink');
      event.currentTarget.classList.add('corrected');

      const $errorNumber = document.querySelector(`.error_state--number`);
      $errorNumber.innerText = `${errorState}`;
      addEarnings(errorState, 3, 10);
    }

  }

  const stopShaking = (event) => {
    if (event.currentTarget.classList.contains('shaking')) {
      event.currentTarget.classList.remove('shaking');
      event.currentTarget.classList.remove('shaking_fast');
      letterState += 1
    }

    if (event.currentTarget.classList.contains('shaking_fast')) {
      event.currentTarget.classList.add('shaking');
      event.currentTarget.classList.remove('shaking_fast');
    }

    const $letterNumber = document.querySelector(`.letter_state--number`);
    $letterNumber.innerText = `${letterState}`;
    addEarnings(letterState, 6, 10);
  }

  const startPulling = () => {
    startPrinterInteraction = true;
    left = left + 10;
    let leftValue = `${left}%`;
    $root.style.setProperty('--left', leftValue);
    let hue = getComputedStyle($root).getPropertyValue('--left');
    console.log(hue);
    console.log(leftValue);
  }

  const pullBack = () => {
    if (left > -10) {
      left = left - 1;
    }

    let leftValue = `${left}%`;
    $root.style.setProperty('--left', leftValue);
  }

  const checkBlueZone = () => {

    if (startPrinterInteraction === true) {
      if (left > 47 && left < 66) {
        console.log('blue');
        startCounter = true;
        $status.innerHTML = `Hold this steady pressure for ${counter} seconds`;
      } else if (left > 66) {
        $status.innerHTML = `Needs less pressure`;
        startCounter = false;
        counter = 5;
      } else {
        startCounter = false;
        counter = 5;
        $status.innerHTML = `Needs more pressure`;
      }
    }
  }

  const countDown = () => {
    if (startCounter === true) {
      counter = counter - 1;
    }

    checkCountDownComplete();
    console.log(startPrinterInteraction);
  }

  const checkCountDownComplete = () => {
    if (counter === 0) {
      left = -10
      startPrinterInteraction = false;
      $status.innerHTML = `Great job, the paper is printed! Click again if you want to print some more`;
      addEarnings(1, 1, 10);
    }
  }

  const addEarnings = (state, stateNumber, amount) => {
    const $earningsNumber = document.querySelector(`.earnings--number`);

    if (state === stateNumber) {
      earnings = earnings + amount;
      console.log('hi')
    }

    $earningsNumber.innerText = `${earnings}`;
  }

  const addListeners = () => {


    const $soundButton = document.querySelector(`.audio_button`);
    $soundButton.addEventListener(`click`, speakHandler);

    const $words = document.querySelectorAll(`.word`);

    $words.forEach($word => {
      $word.addEventListener(`click`, checkError);

    })

    const $letters = document.querySelectorAll(`.shaking_letter`);

    $letters.forEach($letter => {
      $letter.addEventListener(`click`, stopShaking);

    })

    const $pullButton = document.querySelector(`.pull_button`);
    $pullButton.addEventListener(`click`, startPulling);

  }

  const init = async () => {
    addListeners();
    setInterval(pullBack, 100);
    setInterval(checkBlueZone, 100);
    setInterval(countDown, 1000);

  };
  init();
}

