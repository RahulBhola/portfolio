"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function createScrollAnimation(
  element: HTMLElement | string,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  if (typeof window === "undefined") return null;
  
  registerGSAP();
  const {
    y = 60,
    opacity = 0,
    duration = 1,
    delay = 0,
    start = "top 85%",
  } = options ?? {};

  try {
    return gsap.from(element, {
      y,
      opacity,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
      },
    });
  } catch (e) {
    // If animation fails, ensure element is visible
    if (typeof element === "string") {
      const el = document.querySelector(element);
      if (el) (el as HTMLElement).style.opacity = "1";
    } else if (element instanceof HTMLElement) {
      element.style.opacity = "1";
    }
    return null;
  }
}

export function createStaggerAnimation(
  elements: HTMLElement | HTMLElement[] | string,
  options?: {
    y?: number;
    stagger?: number;
    start?: string;
  }
) {
  if (typeof window === "undefined") return null;
  
  registerGSAP();
  const { y = 40, stagger = 0.1, start = "top 85%" } = options ?? {};

  try {
    return gsap.from(elements, {
      y,
      opacity: 0,
      duration: 0.8,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements,
        start,
        toggleActions: "play none none none",
      },
    });
  } catch (e) {
    // If animation fails, ensure elements are visible
    const elementList = Array.isArray(elements) ? elements : 
      (typeof elements === "string" ? Array.from(document.querySelectorAll(elements)) : [elements as HTMLElement]);
    
    elementList.forEach((el: any) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
      }
    });
    return null;
  }
}

export { gsap, ScrollTrigger };
