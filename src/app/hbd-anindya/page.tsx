'use client';
import React, { useEffect, useRef } from 'react';
import TypewriterComponent from 'typewriter-effect';

export default function Page() {
  // Tentukan tipe HTMLCanvasElement untuk canvasRef
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // pastikan canvas tersedia
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // pastikan context ada

    const PI2 = Math.PI * 2;
    const random = (min: number, max: number) => Math.random() * (max - min + 1) + min | 0;
    const timestamp = () => new Date().getTime();

    class Birthday {
      fireworks: Firework[];
      counter: number;
      width!: number;
      spawnA!: number;
      spawnB!: number;
      height!: number;
      spawnC!: number;
      spawnD!: number;
      constructor() {
        this.resize();
        this.fireworks = [];
        this.counter = 0;
      }

      resize() {
        const canvas = canvasRef.current;
        if (!canvas) return; // pastikan canvas tersedia
        const ctx = canvas.getContext('2d');
        if (!ctx) return; // pastikan context ada


        this.width = canvas.width = window.innerWidth;
        const center = this.width / 2 | 0;
        this.spawnA = center - center / 4 | 0;
        this.spawnB = center + center / 4 | 0;

        this.height = canvas.height = window.innerHeight;
        this.spawnC = this.height * 0.1;
        this.spawnD = this.height * 0.5;
      }

      onClick(evt: MouseEvent | TouchEvent) {
        const x = (evt as MouseEvent).clientX || (evt as TouchEvent).touches[0].pageX;
        const y = (evt as MouseEvent).clientY || (evt as TouchEvent).touches[0].pageY;

        const count = random(3, 5);
        for (let i = 0; i < count; i++) {
          this.fireworks.push(new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            x,
            y,
            random(0, 260),
            random(30, 110),
          ));
        }
        this.counter = -1;
      }

      update(delta: number) {
        const canvas = canvasRef.current;
        if (!canvas) return; // pastikan canvas tersedia
        const ctx = canvas.getContext('2d');
        if (!ctx) return; // pastikan context ada

        ctx.globalCompositeOperation = 'hard-light';
        ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.globalCompositeOperation = 'lighter';
        for (const firework of this.fireworks) firework.update(delta);

        this.counter += delta * 3;
        if (this.counter >= 1) {
          this.fireworks.push(new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            random(0, this.width),
            random(this.spawnC, this.spawnD),
            random(0, 360),
            random(30, 110),
          ));
          this.counter = 0;
        }

        if (this.fireworks.length > 1000) {
          this.fireworks = this.fireworks.filter(firework => !firework.dead);
        }
      }
    }

    class Firework {
      dead: boolean;
      history: { x: number; y: number }[]; // Update history type
      madeChilds: unknown;

      constructor(public x: number, public y: number, public targetX: number, public targetY: number, public shade: number, public offsprings: number) {
        this.dead = false;
        this.history = [];
      }

      update(delta: number) {
        if (this.dead) return;

        const canvas = canvasRef.current;
        if (!canvas) return; // pastikan canvas tersedia
        const ctx = canvas.getContext('2d');
        if (!ctx) return; // pastikan context ada

        const xDiff = this.targetX - this.x;
        const yDiff = this.targetY - this.y;
        if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
          this.x += xDiff * 2 * delta;
          this.y += yDiff * 2 * delta;

          this.history.push({ x: this.x, y: this.y });
          if (this.history.length > 20) this.history.shift();
        } else {
          if (this.offsprings && !this.madeChilds) {
            const babies = this.offsprings / 2;
            for (let i = 0; i < babies; i++) {
              const targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0;
              const targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0;
              birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0));
            }
          }
          this.madeChilds = true;
          this.history.shift();
        }

        if (this.history.length === 0) this.dead = true;
        else if (this.offsprings) {
          for (let i = 0; i < this.history.length; i++) {
            const point = this.history[i];
            ctx.beginPath();
            ctx.fillStyle = `hsl(${this.shade},100%,${i}%)`;
            ctx.arc(point.x, point.y, 1, 0, PI2, false);
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.fillStyle = `hsl(${this.shade},100%,50%)`;
          ctx.arc(this.x, this.y, 1, 0, PI2, false);
          ctx.fill();
        }
      }
    }


    const birthday = new Birthday();
    window.onresize = () => birthday.resize();
    document.onclick = evt => birthday.onClick(evt);
    document.ontouchstart = evt => birthday.onClick(evt);

    let then = timestamp();
    (function loop() {
      requestAnimationFrame(loop);
      const now = timestamp();
      const delta = now - then;
      then = now;
      birthday.update(delta / 1000);
    })();

  }, []);

  return (
    <div>
      <h1 className='hbd-anindya'>
        <TypewriterComponent
          onInit={(typewriter) => {
            typewriter.typeString("Happy Birthday, Anindyaaa...").pauseFor(3500)
              .start();
          }}
        /></h1>
      <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}></canvas>
    </div>
  );
}
