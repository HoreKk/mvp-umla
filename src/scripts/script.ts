import { gsap } from 'gsap';
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

window.scrollTo(0, 0)

const mainElement = document.querySelector('main');

const tlHero = gsap.timeline();

// tlHero.then(() => {
//   mainElement?.classList?.remove('overflow-hidden', 'h-screen');

//   const logo = document.querySelector('.navbar-logo');
//   const navbarItem = document.querySelector('.navbar-item');
//   const navbarButton = document.querySelector('.navbar-button');

//   const sections: gsap.DOMTarget[] = gsap.utils.toArray('section');

//   sections.forEach(section => {
//     ScrollTrigger.create({
//       trigger: section,
//       markers: false,
//       start: "top 40",
//       end: "bottom 40",
//       onEnter: () => {
//         if (logo && navbarItem && navbarButton) {
//           let index = [...sections].indexOf(section);

//           [logo.classList, navbarItem.classList]
//             .forEach(classList =>
//               classList.remove('text-umla-yellow', 'text-white', 'text-black')
//             )

//           navbarButton.classList.remove('!text-umla-yellow', '!bg-black')

//           switch (index) {
//             case 0:
//               logo.classList.add('text-umla-yellow');
//               navbarItem.classList.add('text-black');
//               break;
//             case 1:
//               logo.classList.add('text-white');
//               navbarItem.classList.add('text-white');
//               break;
//             case 2:
//               logo.classList.add('text-black');
//               navbarItem.classList.add('text-black');
//               navbarButton.classList.add('!text-umla-yellow', '!bg-black')
//               break;
//           }
//         }
//       },
//       onEnterBack: () => {
//         if (logo && navbarItem && navbarButton) {
//           let index = [...sections].indexOf(section);

//           [logo.classList, navbarItem.classList]
//             .forEach(classList =>
//               classList.remove('text-umla-yellow', 'text-white', 'text-black')
//             )

//           navbarButton.classList.remove('!text-umla-yellow', '!bg-black')

//           switch (index) {
//             case 0:
//               logo.classList.add('text-umla-yellow');
//               navbarItem.classList.add('text-black');
//               break;
//             case 1:
//               logo.classList.add('text-white');
//               navbarItem.classList.add('text-white');
//               break;
//             case 2:
//               logo.classList.add('text-black');
//               navbarItem.classList.add('text-black');
//               navbarButton.classList.add('!text-umla-yellow', '!bg-black')
//               break;
//           }
//         }
//       },
//     });
//   });
// })

tlHero.startTime(1);

tlHero.fromTo(".hero-loading", {
  opacity: 1,
  display: 'block'
}, {
  duration: 1.25,
  opacity: 0,
  display: 'none'
})

tlHero.from(".hero-image", {
  duration: .75,
  opacity: 0,
  x: -1500,
  ease: 'power2'
})

tlHero.from('.navbar', { duration: 1, y: -200, opacity: 0, ease: 'power3' }, 2);
tlHero.from('.hero-side-title', { duration: 1, ease: 'power3', opacity: 0, delay: .2 }, 2);
tlHero.from('.hero-side-logo', { duration: 1, ease: 'power3', opacity: 0, delay: .4 }, 2);

tlHero.to(".hero-title-1", {
  text: {
    value: "Une main"
  },
  duration: .5,
  ease: 'power1'
}, 2);

tlHero.to(".hero-title-2", {
  text: {
    value: "lave"
  },
  duration: .25,
  ease: 'power1'
}, "<.35");

tlHero.to(".hero-title-3", {
  text: {
    value: "l'autre"
  },
  duration: .6,
  ease: 'power1'
}, "<.2");
