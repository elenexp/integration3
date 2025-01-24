
{

  let earnings = 0;
  let errorState = 0;
  let letterState = 0;

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

  const checkErrorCompleted = () => {
    const $earningsNumber = document.querySelector(`.earnings--number`);


    if (error_state === 3) {
      earnings = + 10
    }

    $earningsNumber.innerText = `${earnings}`;
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

  }




  const init = async () => {
    addListeners();

  };
  init();
}

