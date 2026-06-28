/* Rakesh's Advanced Animations JS */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    gsap.registerPlugin(ScrollTrigger);
    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);
});

// Wait for all assets (images, etc) to load before calculating ScrollTriggers
window.addEventListener("load", () => {
    // 2. Text Animations with SplitType
    // Try-catch to ensure we don't break if an element is weirdly structured
    try {
        const splitTitles = new SplitType('.section-header h2', { types: 'words, chars' });
        
        gsap.utils.toArray('.section-header').forEach(header => {
            const chars = header.querySelectorAll('.char');
            if (chars.length === 0) return;
            
            gsap.fromTo(chars, {
                y: 50,
                opacity: 0,
                rotationX: -90,
            }, {
                scrollTrigger: {
                    trigger: header,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                rotationX: 0,
                transformOrigin: "bottom center",
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.5)"
            });
        });
    } catch(e) {
        console.log("SplitType skipped for safety");
    }

    // 3. Hero Section Parallax
    gsap.to('.hero-bg-shape', {
        yPercent: 30,
        rotation: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    // 4. About Section Animations
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    aboutTl.fromTo('.about-content h4, .about-content p', {
        x: -40,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    })
    .fromTo('.about-feature-item', {
        x: -30,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.2)"
    }, "-=0.4")
    .fromTo('.about-image-wrapper', {
        scale: 0.8,
        opacity: 0,
        rotationY: -15
    }, {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=1.2");

    // 5. Offers Grid
    gsap.fromTo('.offer-card', {
        scale: 0.85,
        y: 60,
        opacity: 0,
        rotation: 5
    }, {
        scrollTrigger: {
            trigger: ".offers-grid",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        scale: 1,
        y: 0,
        opacity: 1,
        rotation: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)"
    });

    // 6. Product Cards Stagger
    gsap.fromTo('.product-card', {
        y: 80,
        opacity: 0,
        rotationX: -20
    }, {
        scrollTrigger: {
            trigger: ".product-grid",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        rotationX: 0,
        transformOrigin: "top center",
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out"
    });

    // 7. Continuous Floating Animations for Glass Cards in Hero
    const floatElements = ['.glass-card.float-main', '.glass-card.float-sub-1', '.glass-card.float-sub-2'];
    floatElements.forEach((el, index) => {
        gsap.to(el, {
            y: -15 - (index * 5),
            duration: 2.5 + index,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 0.5
        });
    });
    
    // 8. Floating Contact Buttons
    gsap.fromTo('.floating-contact .float-btn', {
        scale: 0,
        opacity: 0
    }, {
        scrollTrigger: {
            trigger: "body",
            start: "10% top",
            toggleActions: "play none none reverse"
        },
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(2)"
    });

    // Ensure all scroll triggers are calculated correctly after all elements exist
    ScrollTrigger.refresh();
});
