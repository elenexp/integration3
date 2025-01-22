
{

  let earnings = 0;
  let error_state = 0;

  const speakHandler = () => {
    //const text = event.currentTarget.dataset.text;
    const speech = new SpeechSynthesisUtterance(`In the beginning God created the heavens and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. And God said, 'Let there be light:' and there was light.`);
    speechSynthesis.speak(speech);
  }

  const checkError = (event) => {
    if (event.currentTarget.classList.contains('error_word') && !event.currentTarget.classList.contains('corrected')) {
      error_state += 1
      console.log(error_state);
      event.currentTarget.classList.add('pink');
      event.currentTarget.classList.add('corrected');

      const $errorNumber = document.querySelector(`.error_state--number`);
      $errorNumber.innerText = `${error_state}`;
      checkErrorCompleted();
    }

  }

  const checkErrorCompleted = () => {
    const $earningsNumber = document.querySelector(`.earnings--number`);


    if (error_state === 3) {
      earnings =+ 10
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

  }




  const init = async () => {
    addListeners();

  };
  init();
}

