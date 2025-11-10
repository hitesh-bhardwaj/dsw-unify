"use client";

import { AnimatePresence, domAnimation, LazyMotion } from "motion/react";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";
import * as m from "motion/react-m"

function usePreviousValue(value) {
    const prev = useRef();
    useEffect(() => {
        prev.current = value;
        return () => { prev.current = undefined };
    });
    return prev.current;
}

function FrozenRouter({ children }) {
    const context = useContext(LayoutRouterContext);
    const prevContext = usePreviousValue(context) || null;
    const segment = useSelectedLayoutSegment();
    const prevSegment = usePreviousValue(segment);
    const changed = segment !== prevSegment
        && segment !== undefined
        && prevSegment !== undefined;

    return (
        <LayoutRouterContext.Provider value={changed ? prevContext : context}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

export default function LayoutTransition({ children }) {
    const segment = useSelectedLayoutSegment();

    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence
                mode="wait"
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <m.div
                    key={segment}
                    className="relative"
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    <FrozenRouter>{children}</FrozenRouter>
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
}
