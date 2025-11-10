export const expand = {
    initial: {
       transform: "scaleY(1)",
    },
    enter: (i) => ({
        transform: "scaleY(0)",
        transition: {
            duration: 0.4,
            delay: 0.02 * i,
            ease: [0.215, 0.61, 0.355, 1],
        },
        transitionEnd: { scaleY: "0", transformOrigin: 'bottom' }
    }),
    exit: (i) => ({
        transform: "scaleY(1)",
        transition: {
            duration: 0.4,
            delay: 0.02 * i,
            ease: [0.215, 0.61, 0.355, 1]
        }
    })
}

export const opacity = {
    initial: {
        opacity: 1
    },
    enter: {
        opacity: 1
    },
    exit: {
        opacity: 1,
        
    }
}