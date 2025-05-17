import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkinCare3DEffect = () => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      mousePosition.current = { x, y };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Create a grid of elements for the 3D effect
  const gridSize = 3;
  const gridItems = [];
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      gridItems.push({ id: `${i}-${j}`, x: i, y: j });
    }
  }
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none"
    >
      {/* 3D Grid Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[600px] h-[600px]"
          style={{
            perspective: '1000px',
            perspectiveOrigin: 'center',
          }}
        >
          {gridItems.map((item) => {
            // Calculate position within the grid (0-1 range)
            const xPos = item.x / (gridSize - 1);
            const yPos = item.y / (gridSize - 1);
            
            return (
              <motion.div
                key={item.id}
                className="absolute rounded-full border border-primary"
                style={{
                  left: `${xPos * 100}%`,
                  top: `${yPos * 100}%`,
                  width: '150px',
                  height: '150px',
                  x: '-50%',
                  y: '-50%',
                  background: 'radial-gradient(circle, rgba(var(--color-primary-rgb), 0.05) 0%, transparent 70%)',
                }}
                animate={{
                  rotateX: [0, 10, 0, -10, 0],
                  rotateY: [0, -10, 0, 10, 0],
                  z: [0, 20, 0, -20, 0],
                  scale: [1, 1.05, 1, 0.95, 1],
                }}
                transition={{
                  duration: 10 + (xPos + yPos) * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (xPos + yPos) * 2,
                }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Floating 3D Shapes */}
      <div className="absolute inset-0">
        {/* Cream jar */}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-primary"
          style={{ left: '20%', top: '30%' }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 180, 360],
            z: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-12 h-3 rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-primary"
            animate={{
              rotateX: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
        
        {/* Serum dropper */}
        <motion.div
          className="absolute w-4 h-20 rounded-full bg-gradient-to-br from-primary/5 to-transparent border-l border-primary"
          style={{ left: '70%', top: '40%' }}
          animate={{
            y: [0, 20, 0],
            rotateZ: [0, 5, 0, -5, 0],
            z: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-primary"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        {/* Face mask */}
        <motion.div
          className="absolute w-24 h-16 rounded-full bg-gradient-to-br from-primary/5 to-transparent border border-primary"
          style={{ left: '40%', top: '70%' }}
          animate={{
            y: [0, -15, 0],
            rotateZ: [0, -5, 0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-10 rounded-full bg-gradient-to-br from-transparent to-primary/5 border border-primary"
            animate={{
              rotateX: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      </div>
      
      {/* Particle system */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 4 + 2;
          const xPos = Math.random() * 100;
          const yPos = Math.random() * 100;
          const duration = Math.random() * 20 + 10;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${xPos}%`,
                top: `${yPos}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -100, -200],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SkinCare3DEffect;
