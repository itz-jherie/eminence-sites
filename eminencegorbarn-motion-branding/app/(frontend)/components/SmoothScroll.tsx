"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            lerp: 0.085,
            wheelMultiplier: 1
        });

        let frame: number;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        const onClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
            if (!anchor) return;
            const hash = anchor.getAttribute("href");
            if (!hash || hash === "#") return;
            const target = document.querySelector(hash);
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: -16, duration: 1.5 });
        };
        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
            cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
