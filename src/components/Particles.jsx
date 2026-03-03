import { useMemo } from 'react';

const pseudoRandom = (seed) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export default function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        // alternate between blue and yellow hues
        const colors = [
          'rgba(30,144,255,0.6)', // dodge blue
          'rgba(255,223,0,0.6)', // Ukrainian yellow
        ];

        const leftRand = pseudoRandom(i + 1);
        const topRand = pseudoRandom(i + 101);
        const delayRand = pseudoRandom(i + 201);
        const durationRand = pseudoRandom(i + 301);
        const sizeRand = pseudoRandom(i + 401);
        const colorRand = pseudoRandom(i + 501);

        return {
          id: i,
          left: `${leftRand * 100}%`,
          top: `${topRand * 100}%`,
          delay: `${delayRand * 5}s`,
          duration: `${3 + durationRand * 4}s`,
          size: `${2 + sizeRand * 3}px`,
          color: colors[Math.floor(colorRand * colors.length)],
        };
      }),
    [],
  );

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `float-particle ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
