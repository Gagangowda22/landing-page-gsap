const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

let timeout;

const skewCircle = () => {
  let xScale = 1;
  let yScale = 1;

  let prevX = 0;
  let prevY = 0;

  window.addEventListener("mousemove", (e) => {
    clearTimeout(timeout);

    xScale = gsap.utils.clamp(0.8, 1.2, e.clientX - prevX);
    yScale = gsap.utils.clamp(0.8, 1.2, e.clientY - prevY);

    prevX = e.clientX;
    prevY = e.clientY;

    timeout = setTimeout(() => {
      document.querySelector(
        ".mousecircle"
      ).style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1, 1)`;
    }, 100);

    mouseFollower(xScale, yScale);
  });
};

skewCircle();

const firstPageAnimate = () => {
  let tl = gsap.timeline();

  tl.from("nav", {
    y: -10,
    opacity: 0,
    ease: Expo.easeInOUt,
    duration: 1.5,
  });

  tl.to(".elem", {
    y: 0,
    ease: Expo.easeInOUt,
    duration: 1,
    stagger: 0.5,
    delay: -1,
  });

  tl.from(".hero-footer", {
    y: -10,
    opacity: 0,
    ease: Expo.easeInOUt,
    duration: 1.5,
    delay: -1,
  });
};

firstPageAnimate();

const mouseFollower = (xScale, yScale) => {
  window.addEventListener("mousemove", (e) => {
    document.querySelector(
      ".mousecircle"
    ).style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xScale}, ${yScale})`;
  });
};

mouseFollower();

document.querySelectorAll(".item").forEach((elem) => {
  let rotate = 0;
  let difference = 0;

  elem.addEventListener("mouseleave", (e) => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });

  elem.addEventListener("mousemove", (e) => {
    let diff = e.clientY - elem.getBoundingClientRect().top;

    difference = e.clientX - rotate;
    rotate = e.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: e.clientX,
      rotate: gsap.utils.clamp(-20, 20, difference * 0.5),
    });
  });
});
