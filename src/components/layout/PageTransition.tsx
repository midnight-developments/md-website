"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useContext, useRef, useEffect } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useLenis } from "lenis/react";

function FrozenRoute({ children }: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext);
    const frozen = useRef(context).current;

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: false });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, lenis]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <FrozenRoute>{children}</FrozenRoute>
            </motion.div>
        </AnimatePresence>
    );
}
