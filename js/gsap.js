
{
  gsap.registerPlugin(ScrollTrigger);

  const horizontalText = (xFrom, xTo) => {

    gsap.fromTo(".p_horizontal--scroll", { x: xFrom, }, {
      x: xTo,
      scrollTrigger: {
        trigger: ".job_corrector",
        start: "top 20%",
        end: "bottom 80%",

        scrub: 0.5,
        pin: "p_horizontal--scroll",
      },
    });
  }

  const shapeSlide = () => {
    gsap.to(".intro_shape", {
      scrollTrigger: {
        trigger: ".intro_shape",
        start: "top 10%",
        end: "bottom 40%",

        scrub: true,
        pin: ".intro_shape",

      },
    });
  }
  const compositorMiddle = () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".compositor_description--middle",
        start: "top 50%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    tl.from(".compositor_shape", {
      y: -100,
    });

    tl.from(".bookframe--top", {
      x: -500,
    });

    tl.from(".bottom_letters--wrapper", {
      x: 500,
    });
  }

  const compositorLeft = () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".left_letter--wrapper",
        start: "top 60%",
        end: "bottom 70%",
        scrub: 1,
        markers: true,
      },
    });

    tl.from(".l", {
      rotate: 10,
      x: -200,
    });
    tl.from(".k", {
      rotate: -10,
      x: -100,
    });
    tl.from(".e", {
      rotate: 10,
      x: -200,
    });
    tl.from(".a", {
      rotate: 10,
      x: -100,
    });
    tl.from(".r", {
      alpha: 0,
      x: -100,
    });
    tl.from(".n", {
      rotate: -10,
      x: -100,
    });
    tl.from(".q", {
      rotate: 10,
      x: -200,
    });
    tl.from(".v", {
      rotate: -10,
      x: -100,
    });
  }

  const compositorRight = () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".right_letter--wrapper",
        start: "top 60%",
        end: "bottom 70%",
        scrub: 1,
        markers: true,
      },
    });

    tl.from(".b", {
      rotate: 30,
      x: 200,
    });
    tl.from(".bookframe--right", {
      rotate: -20,
      x: 100,
    });
    tl.from(".l--right", {
      alpha: 0,
      rotate: 10,
      x: 200,
    });

  }

  const cloudSlide = (x, cloud) => {
    gsap.from(cloud, {
      ease: "power1.inOut",
      x: x,
      scrollTrigger: {
        trigger: ".intro_shape",
        start: "top 10%",
        end: "bottom 40%",
        scrub: true,

      },
    });
  }


  const animationIntro = () => {
    shapeSlide();
    cloudSlide(300, ".cloud--left");
    cloudSlide(-300, ".cloud--right");
  }

  const animationCorrector = () => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 350px)", () => {
      horizontalText("110%", "-30%");


    });


    mm.add("(min-width: 650px)", () => {
      horizontalText("80%", "-30%");


    });
  }

  const animationCompositor = () => {

    const mm = gsap.matchMedia();

    mm.add("(min-width: 350px)", () => {
      compositorMiddle();


    });


    mm.add("(min-width: 55em)", () => {
      compositorLeft();
      compositorRight();


    });

  }

  const animationPlantin = () => {

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".plantin--wrapper",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1,

      },
    });

    const plantins = gsap.utils.toArray('.plantin');

    plantins.forEach(element => {
      gsap.from(element, {
        alpha: 0,
        x: 200,
        scrollTrigger: {
          trigger: element,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
          markers: true,
        },
      });
    })


    const names = gsap.utils.toArray('.name--wrapper');

    names.forEach(element => {
      gsap.from(element, {
        alpha: 0,
        x: -100,
        scrollTrigger: {
          trigger: element,
          start: "top 50%",
          end: "bottom 70%",
          scrub: 1,

        },
      });
    })


    const speeches = gsap.utils.toArray('.plantin_speech');

    speeches.forEach(element => {
      gsap.from(element, {
        alpha: 0,
        x: -200,
        scrollTrigger: {
          trigger: element,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 1,
        },
      });
    })
  }


  const init = async () => {
    animationIntro();
    animationCorrector();
    animationCompositor();
    animationPlantin();



  };
  init();
}
