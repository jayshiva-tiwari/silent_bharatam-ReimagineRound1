function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function loader() {
    let tl = gsap.timeline();

    tl.from('.load-h1 h1', {
        y: '100%',
        duration: 0.5,
        // delay: 0.2,
        stagger: 0.3,
    })
    tl.from(".load-h1 span", {
        y: '100%',
        duration: 0.5,
        stagger: 0.3,
    })
    tl.to('#loader', {
        display: 'none',
        duration: 0.8,
        y: '-100%',
        // opacity: 0,
    })
    tl.from('.page1', {
        y: '100%',
        duration: 0.6,
        ease: Power4,
    })
}

function textAnimation() {
    let tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".content-2",
            scroller: '#main',
            start: "-80% 50%",
            end: "10% 100%",
            // markers: true,
            scrub: 1,
        },
    });
    tl3.to(".content-2 .text-area-hover h1", {
        width: "100%",
    })
    tl3.to(".content-2 .text-area-hover h2", {
        delay: -0.4,
        width: "100%",
    })

    tl3.to(".video-container video",{
        width: "90%",
    })
}

function magnet() {
    Shery.makeMagnet(".nav-part1 i ,.nav-part2 p, .btn", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });    
}

function card3d() {
    let tl = gsap.timeline();

    tl.to('.left-shoe',{
        x:"20vw",
    })

    tl.to('.right-shoe',{
        x:"-20vw",
    })
}

function videoCursor() {
    let videoCon = document.querySelector('.video-container')
    let playBtn = document.querySelector('.play')

    videoCon.addEventListener('mouseenter', function () {
        gsap.to(playBtn,{
            scale:1,
            opacity:1,
        })
    })
    videoCon.addEventListener('mouseleave', function () {
        gsap.to(playBtn,{
            scale:0,
            opacity:0,
        })
    })
    videoCon.addEventListener('mousemove', function (det) {
        gsap.to(playBtn,{
            left: det.x-170,
            top: det.y-170
        })
    })
}

// function links() {
//     let link = document.querySelectorAll(".link-box");

//     link.addEventListener('mouseenter', function () {
//         gsap.to(link,{

//         })
//     })
// }

// links()
videoCursor()
// card3d()
magnet()
locomotive()
textAnimation()
loader()