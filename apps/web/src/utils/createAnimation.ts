import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export const createTextAnimation = (
  target: string,
  direction: string,
  initial: number,
  top: number,
  bottom: number
) => {
  gsap.set(target, { [direction]: initial, opacity: 0 });
  ScrollTrigger.create({
    trigger: target,
    start: `top ${top}%`,
    end: `bottom ${bottom}%`,
    scrub: true,
    onEnter: () => gsap.to(target, { [direction]: 0, opacity: 1, duration: 1 }),
    onLeave: () =>
      gsap.to(target, { [direction]: initial, opacity: 0, duration: 1 }),
    onEnterBack: () =>
      gsap.to(target, { [direction]: 0, opacity: 1, duration: 1 }),
    onLeaveBack: () =>
      gsap.to(target, { [direction]: initial, opacity: 0, duration: 1 }),
  });
};

export const createBatchAnimation = (
  target: string,
  stagger: number,
  top: number,
  bottom: number
) => {
  gsap.set(target, { opacity: 0 });
  ScrollTrigger.batch(target, {
    start: `top ${top}%`,
    end: `bottom ${bottom}%`,
    onEnter: (elements) => {
      gsap.to(elements, { opacity: 1, stagger });
    },
    onLeave: (elements) => {
      gsap.to(elements, { opacity: 0, stagger });
    },
    onEnterBack: (elements) => {
      gsap.to(elements, { opacity: 1, stagger });
    },
    onLeaveBack: (elements) => {
      gsap.to(elements, { opacity: 0, stagger });
    },
  });
};
