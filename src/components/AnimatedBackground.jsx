import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SkinCare3DEffect from './SkinCare3DEffect';

const AnimatedBackground = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Generate random positions for the floating elements
  const generateElements = (count, options = {}) => {
    const {
      minSize = 10,
      maxSize = 50,
      minDuration = 10,
      maxDuration = 30,
      minOpacity = 0.1,
      maxOpacity = 0.6,
    } = options;
    
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * (maxDuration - minDuration) + minDuration,
      delay: Math.random() * 5,
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
    }));
  };

  // Different types of elements
  const bubbles = generateElements(15);
  const circles = generateElements(10);
  const molecules = generateElements(8, { minSize: 15, maxSize: 30 });
  const droplets = generateElements(12, { minSize: 5, maxSize: 15, minOpacity: 0.2, maxOpacity: 0.7 });

  // Don't render animations until component is mounted (for SSR compatibility)
  if (!mounted) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/95" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen  overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 top-[80px] z-0 overflow-hidden">
        {/* 3D Effect Layer */}
        <SkinCare3DEffect />
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/95" />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px'
        }} />

        {/* Floating droplets (representing serums/oils) */}
        {droplets.map((droplet) => (
          <motion.div
            key={`droplet-${droplet.id}`}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${droplet.x}%`,
              top: `${droplet.y}%`,
              width: `${droplet.size}px`,
              height: `${droplet.size * 1.5}px`,
              filter: 'blur(1px)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: droplet.opacity,
              scale: 1,
              y: [0, 100, 200],
            }}
            transition={{
              duration: droplet.duration,
              repeat: Infinity,
              delay: droplet.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating bubbles (representing moisturizer) */}
        {bubbles.map((bubble) => (
          <motion.div
            key={`bubble-${bubble.id}`}
            className="absolute rounded-full bg-primary backdrop-blur-sm"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: bubble.opacity,
              scale: 1,
              x: [0, 20, -20, 10, -10, 0],
              y: [-50, -100],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Molecule structures (hexagons and pentagons) */}
        {molecules.map((molecule) => (
          <motion.div
            key={`molecule-${molecule.id}`}
            className="absolute"
            style={{
              left: `${molecule.x}%`,
              top: `${molecule.y}%`,
              width: `${molecule.size}px`,
              height: `${molecule.size}px`,
              opacity: molecule.opacity * 0.8,
            }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ 
              opacity: [molecule.opacity * 0.5, molecule.opacity, molecule.opacity * 0.5],
              rotate: 360,
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: molecule.duration,
              repeat: Infinity,
              delay: molecule.delay,
              ease: "easeInOut",
            }}
          >
            {/* Hexagon shape for molecule */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon 
                points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" 
                fill="none" 
                stroke="rgba(var(--color-primary-rgb), 0.2)" 
                strokeWidth="2"
              />
              <circle cx="50" cy="50" r="8" fill="rgba(var(--color-primary-rgb), 0.15)" />
            </svg>
          </motion.div>
        ))}

        {/* Floating circles representing skincare molecules */}
        {circles.map((circle) => (
          <motion.div
            key={`circle-${circle.id}`}
            className="absolute rounded-full border border-primary"
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: `${circle.size * 1.5}px`,
              height: `${circle.size * 1.5}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: circle.opacity,
              scale: [1, 1.2, 1],
              rotate: 360,
            }}
            transition={{
              duration: circle.duration * 0.8,
              repeat: Infinity,
              delay: circle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* DNA-like double helix structure (representing skin science) */}
        <div className="absolute left-[5%] top-[10%] h-[80%] w-[90%] opacity-30 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={`helix-${i}`}>
              <motion.div
                className="absolute h-1 w-1 rounded-full bg-primary"
                style={{ left: `${i * 10}%` }}
                animate={{
                  y: ['0%', '100%'],
                  x: ['-5%', '5%', '-5%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute h-1 w-1 rounded-full bg-primary"
                style={{ left: `${i * 10 + 5}%` }}
                animate={{
                  y: ['100%', '0%'],
                  x: ['5%', '-5%', '5%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Horizontal flowing lines representing skin layers */}
        <motion.div
          className="absolute h-px w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ top: '15%', left: '10%' }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute h-px w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ top: '40%', left: '25%' }}
          animate={{
            x: ['100%', '-100%'],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute h-px w-2/3 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ top: '65%', left: '15%' }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Radial pulse effect (representing skin renewal) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-40 h-40 rounded-full border border-primary"
            animate={{
              scale: [1, 2.5],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="w-40 h-40 rounded-full border border-primary"
            animate={{
              scale: [1, 2],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
