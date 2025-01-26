
{

  let earnings = 0;
  let errorState = 0;
  let letterState = 0;
  let counter = 5;
  let startCounter = false;
  let startPrinterInteraction = false;
  let lettersChecked = false;
  let name = 'employee';
  let audio = false;

  const $root = document.querySelector(':root');
  let left = -10;

  const $status = document.querySelector(`.printer_interaction_status`);

  const speakHandler = () => {
    const speech = new SpeechSynthesisUtterance(`In the beginning God created the heavens and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. And God said, 'Let there be light:' and there was light.`);
    if (audio === false) {
      speechSynthesis.speak(speech);
    }
    if (audio === true) {
      speechSynthesis.cancel(speech);
    }
  }

  const playAudio = () => {
    audio = true;
    const $play = document.querySelector(`.play_audio`);
    $play.classList.add('visually-hidden');
    const $stop = document.querySelector(`.stop_audio`);
    $stop.classList.remove('visually-hidden');

  }

  const stopAudio = () => {
    audio = false;
    const $play = document.querySelector(`.play_audio`);
    $play.classList.remove('visually-hidden');
    const $stop = document.querySelector(`.stop_audio`);
    $stop.classList.add('visually-hidden');
  }

  const checkError = (event) => {
    if (event.currentTarget.classList.contains('error_word') && !event.currentTarget.classList.contains('corrected')) {
      errorState += 1
      console.log(errorState);
      event.currentTarget.classList.add('pink');
      event.currentTarget.classList.add('corrected');

      const $errorNumber = document.querySelector(`.error_state--number`);
      $errorNumber.innerText = `${errorState}`;
      if (errorState === 3) {
        addEarnings(6);
        showPopup(6, 'Corrector');
      }
    }

  }

  const stopShaking = (event) => {
    if (event.currentTarget.classList.contains('shaking')) {
      event.currentTarget.classList.remove('shaking');
      event.currentTarget.classList.remove('shaking_fast');
      letterState += 1
      if (letterState === 6) {
        addEarnings(6);
        showPopup(6, 'Compositor');
      }
    }

    if (event.currentTarget.classList.contains('shaking_fast')) {
      event.currentTarget.classList.add('shaking');
      event.currentTarget.classList.remove('shaking_fast');
    }

    const $letterNumber = document.querySelector(`.letter_state--number`);
    $letterNumber.innerText = `${letterState}`;



    console.log(lettersChecked);
  }

  const startPulling = () => {
    startPrinterInteraction = true;
    if (left < 85) {
      left = left + 10;
    }
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
      addEarnings(2);
      showPopup(2, 'Printer');
    }
  }

  const showPopup = (amount, jobName) => {
    const $popup = document.querySelector(`.earnings_popup`);
    $popup.classList.remove('visually-hidden');
    const $jobName = document.querySelector(`.job_name`);

    const $amounts = document.querySelectorAll(`.amount`);

    $jobName.innerText = `${jobName}`;

    $amounts.forEach($amount => {
      $amount.innerText = `${amount}`;

    })

    setInterval(closePopup, 3000)
    setInterval(console.log('hi'), 3000)


  }

  const closePopup = () => {
    const $popup = document.querySelector(`.earnings_popup`);
    $popup.classList.add('visually-hidden');
  }

  const addEarnings = (amount) => {
    earnings = earnings + amount;

    const $earningsNumbers = document.querySelectorAll(`.earnings--number`);
    $earningsNumbers.forEach($earningsNumber => {
      $earningsNumber.innerText = `${earnings}`;
    })
  }

  const handleSubmitCountry = e => {
    e.preventDefault();
    const $search = document.querySelector(`.name`);

    name = `${$search.value}`;

    const $usernames = document.querySelectorAll(`.username`);
    $usernames.forEach($username => {
      $username.innerText = `${name}`;

    })

    const $form = document.querySelector(`.form-group`);
    $form.classList.add('visually-hidden');
    const $text= document.querySelector(`.hiring_question`);
    $text.innerText = `You're hired, ${name}!`;


    console.log(name);
  };

  const addHamburger = () => {
    const $hamburger = document.querySelector(`.hamburger`);
    $hamburger.classList.remove('visually-hidden');
    const $menu = document.querySelector(`.menu_list--mobile`);
    $menu.classList.add('visually-hidden');
  }

  const seeMenu = () => {
    const $hamburger = document.querySelector(`.hamburger`);
    $hamburger.classList.add('visually-hidden');
    const $closeButton = document.querySelector(`.close_menu`);
    $closeButton.classList.remove('visually-hidden');
    const $menu = document.querySelector(`.menu_list--mobile`);
    $menu.classList.remove('visually-hidden');
    $menu.classList.add('fixed');
  }

  const closeMenu = () => {
    const $hamburger = document.querySelector(`.hamburger`);
    $hamburger.classList.remove('visually-hidden');
    const $closeButton = document.querySelector(`.close_menu`);
    $closeButton.classList.add('visually-hidden');
    const $menu = document.querySelector(`.menu_list--mobile`);
    $menu.classList.add('visually-hidden');
  }

  const removeCssAnimation = () => {
    const $horizontal = document.querySelector(`.p_horizontal`);
    $horizontal.classList.remove('horizontal--animation');
  }

  const addListeners = () => {

    const $play = document.querySelector(`.play_audio`);
    $play.addEventListener(`click`, speakHandler);
    $play.addEventListener(`click`, playAudio);

    const $stop = document.querySelector(`.stop_audio`);
    $stop.addEventListener(`click`, speakHandler);
    $stop.addEventListener(`click`, stopAudio);

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
    const $closeButton = document.querySelector(`.close_popup`);
    $closeButton.addEventListener(`click`, closePopup);

    document.querySelector(`.name-form`).addEventListener(`submit`, handleSubmitCountry);
    document.querySelector(`.hamburger`).addEventListener(`click`, seeMenu);
    document.querySelector(`.close_menu`).addEventListener(`click`, closeMenu);
  }

  const init = async () => {
    removeCssAnimation();
    addListeners();
    setInterval(pullBack, 100);
    setInterval(checkBlueZone, 100);
    setInterval(countDown, 1000);
    addHamburger();

  };
  init();
}

