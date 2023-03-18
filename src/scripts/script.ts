import { gsap } from 'gsap';
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

window.scrollTo(0, 0)

const mainElement = document.querySelector('#content');

const tlHero = gsap.timeline();

tlHero.then(() => {
  mainElement?.classList?.remove('overflow-hidden', 'h-screen');

  const logo = document.querySelector('.navbar-logo');
  const navbarItem = document.querySelector('.navbar-item');
  const navbarButton = document.querySelector('.navbar-button');

  const sections: any[] = gsap.utils.toArray('section');

  smoothScroll("#content")

  sections.forEach(section => {

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      pin: true,
      onUpdate: () => {
        if (logo && navbarItem && navbarButton) {
          let index = [...sections].indexOf(section);

          [logo.classList, navbarItem.classList]
            .forEach(classList =>
              classList.remove('text-umla-yellow', 'text-white', 'text-black')
            )

          navbarButton.classList.remove('!text-umla-yellow', '!bg-black')

          switch (index) {
            case 0:
              logo.classList.add('text-umla-yellow');
              navbarItem.classList.add('text-black');
              break;
            case 1:
              logo.classList.add('text-white');
              navbarItem.classList.add('text-white');
              break;
            case 2:
              logo.classList.add('text-black');
              navbarItem.classList.add('text-black');
              navbarButton.classList.add('!text-umla-yellow', '!bg-black')
              break;
          }
        }
      },
    });

  });
})

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


function smoothScroll(content: any, viewport?: any, smoothness?: any) {
	content = gsap.utils.toArray(content)[0];
	smoothness = smoothness || 1;

	gsap.set(viewport || content.parentNode, {overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0});
	gsap.set(content, {overflow: "visible", width: "100%"});

	let getProp = gsap.getProperty(content),
		setProp = gsap.quickSetter(content, "y", "px"),
		setScroll = ScrollTrigger.getScrollFunc(window),
		removeScroll = () => content.style.overflow = "visible",
		killScrub = (trigger: any) => {
			let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
			scrub && scrub.pause();
			trigger.animation.progress(trigger.progress);
		},
		height: any, isProxyScrolling: any;

	function refreshHeight() {
		height = content.clientHeight;
		content.style.overflow = "visible"
		document.body.style.height = height + "px";
    return height - document.documentElement.clientHeight;
	}

	ScrollTrigger.addEventListener("refresh", () => {
		removeScroll();
		requestAnimationFrame(removeScroll);
	})
	ScrollTrigger.defaults({scroller: content});

	ScrollTrigger.scrollerProxy(content, {
		scrollTop(value) {
			if (arguments.length && value) {
				isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
				setProp(-value);
				setScroll(value);
				return;
			}
			return -getProp("y");
		},
    scrollHeight: () => document.body.scrollHeight,
		getBoundingClientRect() {
			return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
		}
	});

	return ScrollTrigger.create({
		animation: gsap.fromTo(content, {y:0}, {
			y: () => document.documentElement.clientHeight - height,
			ease: "none",
			onUpdate: ScrollTrigger.update
		}),
		scroller: window,
		invalidateOnRefresh: true,
		start: 0,
		end: refreshHeight,
    refreshPriority: -999,
		scrub: smoothness,
		onUpdate: self => {
			if (isProxyScrolling) {
				killScrub(self);
				isProxyScrolling = false;
			}
		},
		onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
	});
}