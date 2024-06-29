function loader() {
    let tl = gsap.timeline();
    
    tl.from('.load-h1 h1',{
        y:'100%',
        duration: 0.5,
        // delay: 0.2,
        stagger: 0.3,
    })
    tl.from(".load-h1 span",{
        y:'100%',
        duration: 0.5,
        stagger: 0.3,
    })
    tl.to('#loader',{
        display: 'none',
        duration: 0.8,
        y:'-100%',
        // opacity: 0,
    })
    tl.from('.page1',{
        y: '100%',
        duration: 0.6,
        ease: Power4,
    })
}



loader()