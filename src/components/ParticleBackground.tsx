"use client";

import { useEffect, useRef, useMemo } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { usePathname } from "next/navigation";
import type { ISourceOptions } from "@tsparticles/engine";

const PARTICLE_ID = "bg-particles";

export const ParticleBackground = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  const options: ISourceOptions = useMemo(() => {
    // 1. Home Theme (Network / Constellation)
    const networkOptions: ISourceOptions = {
      fpsLimit: 120,
      fullScreen: { enable: false },
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          push: { quantity: 4 },
          grab: { distance: 200, links: { opacity: 0.3 } },
        },
      },
      particles: {
        color: { value: ["#38BDF8", "#F59E0B"] },
        links: {
          color: "#38BDF8",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 1.5,
          straight: false,
        },
        number: { density: { enable: true }, value: 80 },
        opacity: { value: 0.6 },
        shape: { type: "circle" },
        size: { value: { min: 1.5, max: 4 } },
      },
      detectRetina: true,
      background: {
        color: "transparent",
      },
    };

    // 2. Projects Theme (Data Stream / Circuit)
    const streamOptions: ISourceOptions = {
      fpsLimit: 120,
      fullScreen: { enable: false },
      particles: {
        color: { value: "#38BDF8" },
        links: {
          color: "#38BDF8",
          distance: 100,
          enable: true,
          opacity: 0.25,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: false,
          speed: 2,
          straight: true,
        },
        number: { density: { enable: true }, value: 60 },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
      background: {
        color: "transparent",
      },
    };

    // 3. About / Experience Theme (Ambient Orbs / Glow)
    const ambientOptions: ISourceOptions = {
      fpsLimit: 60,
      fullScreen: { enable: false },
      particles: {
        color: { value: ["#F59E0B", "#F43F5E", "#8B5CF6"] },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: { density: { enable: true }, value: 24 },
        opacity: { value: { min: 0.15, max: 0.4 } },
        shape: { type: "circle" },
        size: { value: { min: 8, max: 36 } },
      },
      detectRetina: true,
      background: {
        color: "transparent",
      },
    };

    // 4. Contact Theme (Interactive Repulse)
    const contactOptions: ISourceOptions = {
      fpsLimit: 120,
      fullScreen: { enable: false },
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 150, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#38BDF8",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 1,
          straight: false,
        },
        number: { density: { enable: true }, value: 80 },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1.5, max: 3.5 } },
      },
      detectRetina: true,
      background: {
        color: "transparent",
      },
    };

    if (pathname === "/projects") return streamOptions;
    if (pathname === "/about" || pathname === "/experience") return ambientOptions;
    if (pathname === "/contact") return contactOptions;
    return networkOptions;
  }, [pathname]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const startParticles = async () => {
      // Load the slim bundle once
      if (!loadedRef.current) {
        await loadSlim(tsParticles);
        loadedRef.current = true;
      }

      if (cancelled) return;

      // tsParticles.load handles replacing any existing container with the same id
      await tsParticles.load({
        id: PARTICLE_ID,
        element: container,
        options,
      });
    };

    startParticles();

    return () => {
      cancelled = true;
      for (const c of tsParticles.items) {
        if (c.id.description === PARTICLE_ID && !c.destroyed) {
          c.destroy();
        }
      }
    };
  }, [options]);

  return <div ref={containerRef} id={PARTICLE_ID} className="fixed inset-0 z-0 pointer-events-none" />;
};
