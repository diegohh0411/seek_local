import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';
import Observer from 'gsap/Observer';
import Lenis from 'lenis';

// Prevent multiple registrations
if (!(gsap as any).plugins.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

if (!(gsap as any).plugins.TextPlugin) {
  gsap.registerPlugin(TextPlugin);
}

if (!(gsap as any).plugins.Observer) {
  gsap.registerPlugin(Observer);
}

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

export default gsap;
export { Observer };