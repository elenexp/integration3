
{
  gsap.registerPlugin(ScrollTrigger);

  const horizontalText = () => {
    gsap.fromTo(".p_horizontal--scroll", { x: "80%", }, {
      x: "-30%",
      scrollTrigger: {
        trigger: ".job_corrector",
        start: "top 30%",
        end: "bottom 30%",
        markers: {
          startColor: "purple",
          endColor: "fuchsia",
          fontSize: "1rem",
          indent: 100,
          fontWeight: "bold",
        },
        scrub: 0.5,
        pin: "p_horizontal--scroll",
      },
    });
  }



  const init = async () => {
    horizontalText();
  };
  init();
}

