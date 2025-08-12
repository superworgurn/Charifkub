import { useEffect, useRef } from 'react';

const Particles = ({ className }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseMoveHandlerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const particleCount = 80;
    const colors = [
      'rgba(59, 130, 246, 0.6)', 
      'rgba(139, 92, 246, 0.6)', 
      'rgba(236, 72, 153, 0.6)', 
      'rgba(52, 211, 153, 0.6)', 
      'rgba(251, 191, 36, 0.6)'
    ];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle', 'absolute', 'rounded-full');
      
      const size = Math.random() * 10 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
      
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = randomColor;
      particle.style.filter = `blur(${Math.random() * 2}px)`;
      
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }

    // Parallax effect
    mouseMoveHandlerRef.current = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      particlesRef.current.forEach(particle => {
        const speed = 0.5;
        let x = (mouseX - 0.5) * 30 * speed;
        const y = (mouseY - 0.5) * 30 * speed;
        
        // ลดการเคลื่อนที่ทางขวาลง 50%
        if (x > 0) {
          x *= 0.5;
        }
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', mouseMoveHandlerRef.current);
    
    return () => {
      // Cleanup
      window.removeEventListener('mousemove', mouseMoveHandlerRef.current);
      particlesRef.current.forEach(particle => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  return <div ref={containerRef} className={`${className} particles pointer-events-none overflow-hidden`}></div>;
};

export default Particles;