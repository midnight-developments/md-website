"use client";

import { useEffect, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
    fullScreen: { enable: true },
    interactivity: {
        detectsOn: "window",
        events: {
            onHover: {
                enable: true,
                parallax: { enable: true, force: 70, smooth: 10 }
            }
        }
    },
    particles: {
        number: { value: 70 },
        move: { enable: true, speed: 0.3, direction: "none" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.1, max: 0.5 } },
        size: { value: { min: 0.5, max: 1.5 } },
    }
};

const Starfield = memo(function Starfield() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (init) {
        return (
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <Particles
                    id="tsparticles"
                    options={options}
                    className="w-full h-full"
                />
            </div>
        );
    }

    return <></>;
});

export default Starfield;
