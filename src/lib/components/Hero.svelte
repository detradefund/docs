<script lang="ts">
    import { onMount } from 'svelte';
  
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }
  
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let particles: Particle[] = [];
  
    function createParticle(): Particle {
      if (!canvas) return {
        x: 0,
        y: 0,
        size: 0,
        speedX: 0,
        speedY: 0
      };
  
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      };
    }
  
    function animate() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
  
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
  
        if (ctx) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
  
      requestAnimationFrame(animate);
    }
  
    function initCanvas() {
      if (!canvas) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      ctx = canvas.getContext('2d');
      particles = Array.from({ length: 50 }, () => createParticle());
    }
  
    onMount(() => {
      if (typeof window !== 'undefined') {
        initCanvas();
        if (ctx) animate();
  
        const handleResize = () => {
          if (!canvas) return;
          const container = canvas.parentElement;
          if (!container) return;
          
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
          particles = Array.from({ length: 50 }, () => createParticle());
        };
  
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    });
  </script>
  
  <section class="hero">
    <canvas bind:this={canvas} />
    <div class="container">
      <div class="content">
        <div class="hero-content">
          <img src="/logo-detrade.png" alt="DeTrade Logo" class="hero-logo" />
          <div class="hero-text">
            <h1><span class="title-group">Your <span class="highlight">On-Chain</span></span><br class="desktop-only"> <span class="title-group">Investment Fund</span></h1>
            <p>Maximize your returns with a secure, transparent, and decentralized vault solution, while maintaining full control over your assets</p>
            <a href="https://app.detrade.fund" target="_blank" rel="noopener noreferrer">
              <button>Launch App</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="features">
    <div class="features-content">
      <div class="feature-block">
        <div class="feature-label">SIMPLIFIED ON-CHAIN INVESTMENT</div>
        <h2><span class="highlight">Secure & Optimized</span> Returns</h2>
        <p class="feature-description">Invest in stablecoins through secure vaults, with transparent and automated returns managed on the blockchain</p>
      </div>
      <div class="feature-block right">
        <div class="feature-label">MINTING & REDEMPTION FLEXIBILITY</div>
        <h2><span class="highlight">Easy Access</span> to Your Funds</h2>
        <p class="feature-description">Mint tokens by depositing stablecoins, and redeem them at any time for easy access to your funds</p>
      </div>
      <div class="feature-block">
        <div class="feature-label">TRANSPARENT & SECURE FUND MANAGEMENT</div>
        <h2>Powered by <span class="highlight">Lagoon</span></h2>
        <p class="feature-description">Leveraging Lagoon built on top of Safe, we provide robust, transparent, and secure vault management</p>
      </div>
    </div>
  </section>
  
  <section class="cta-section">
    <div class="background-logo"></div>
    <div class="text-content">
      <h2>Start Growing Your Wealth with <span class="highlight">DeTrade</span></h2>
      <p>Discover how our secure, optimized investment strategies can work for you</p>
      <a href="https://app.detrade.fund" target="_blank" rel="noopener noreferrer">
        <button>Get Started</button>
      </a>
    </div>
  </section>
  
  <section class="dark-blue-section">
    <div class="text-content">
      <div class="footer-container">
        <div class="footer-left">
          <h2><img src="/detrade-logo-text.png" alt="DeTrade" class="logo-text" /></h2>
          <p>Decentralized Asset Management</p>
          <p class="copyright">© DeTradeFund, 2025. All rights reserved.</p>
        </div>
        <div class="footer-right">
          <div class="social-links">
            <a href="https://x.com/DeTrade" target="_blank" rel="noopener noreferrer" class="social-link" title="X">
              <img src="/x.png" alt="X" class="social-icon" />
            </a>
            <a href="https://linkedin.com/company/detrade" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">
              <img src="/linkedin.png" alt="LinkedIn" class="social-icon" />
            </a>
            <a href="https://medium.com/detrade" target="_blank" rel="noopener noreferrer" class="social-link" title="Medium">
              <img src="/medium.png" alt="Medium" class="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <style>
    .hero {
      position: relative;
      min-height: 100vh;
      width: 100%;
      background: linear-gradient(135deg, #003366 0%, #001830 70%, #000c1a 100%);
      overflow: hidden;
    }
  
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.115) 0%, transparent 54%);
      pointer-events: none;
      animation: pulse 1.5s ease-in-out infinite;
    }
  
    @keyframes pulse {
      0% {
        background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.11) 0%, transparent 53.5%);
      }
      25% {
        background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.115) 0%, transparent 54%);
      }
      50% {
        background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.12) 0%, transparent 54.5%);
      }
      75% {
        background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.115) 0%, transparent 54%);
      }
      100% {
        background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.11) 0%, transparent 53.5%);
      }
    }
  
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.6;
    }
  
    .container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8rem 0;
    }
  
    .content {
      position: relative;
      max-width: 1200px;
      width: 100%;
      padding: 0 2rem;
      text-align: left;
      margin: 0 auto;
    }
  
    h1 {
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: white;
      line-height: 1.2;
      max-width: 100%;
      white-space: normal;
    }
  
    .title-group {
      white-space: nowrap;
    }
  
    .highlight {
      background: linear-gradient(135deg, #fff 0%, var(--color-accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 
        0 0 25px rgba(77, 168, 255, 0.5),
        0 0 45px rgba(77, 168, 255, 0.4),
        0 0 65px rgba(77, 168, 255, 0.3);
      position: relative;
      animation: glow 2s ease-in-out infinite;
    }
  
    .highlight::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -6px;
      right: -6px;
      bottom: -3px;
      background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.2) 0%, transparent 70%);
      filter: blur(6px);
      z-index: -1;
      animation: glowPulse 2s ease-in-out infinite;
    }
  
    @keyframes glow {
      0%, 100% {
        text-shadow: 
          0 0 25px rgba(77, 168, 255, 0.4),
          0 0 45px rgba(77, 168, 255, 0.3),
          0 0 65px rgba(77, 168, 255, 0.2);
      }
      50% {
        text-shadow: 
          0 0 28px rgba(77, 168, 255, 0.45),
          0 0 48px rgba(77, 168, 255, 0.35),
          0 0 68px rgba(77, 168, 255, 0.25);
      }
    }
  
    @keyframes glowPulse {
      0%, 100% {
        opacity: 0.85;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.02);
      }
    }
  
    p {
      font-size: 1.5rem;
      line-height: 1.5;
      margin-bottom: 2.5rem;
      color: #b4c6ef;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      font-weight: 400;
      max-width: 850px;
      width: 100%;
    }
  
    @media (min-width: 1024px) {
      p {
        max-width: 900px;
        line-height: 1.6;
        letter-spacing: -0.01em;
        text-align: left;
      }
    }
  
    @media (max-width: 768px) {
      p {
        font-size: 1.25rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        padding: 0 1rem;
        min-width: auto;
      }
  
      .hero-text {
        text-align: center;
        max-width: 100%;
        padding: 0 0.5rem;
      }
  
      .features::before,
      .features::after,
      .cta-section::before,
      .cta-section::after,
      .dark-blue-section::before,
      .dark-blue-section::after {
        display: none;
      }
    }
  
    button {
      padding: 1rem 2.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #0d111c;
      background: linear-gradient(135deg, #fff 0%, var(--color-accent) 100%);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 
        0 4px 15px rgba(77, 168, 255, 0.3),
        0 0 25px rgba(77, 168, 255, 0.5),
        0 0 45px rgba(77, 168, 255, 0.3);
      position: relative;
      animation: buttonGlow 2s ease-in-out infinite;
    }
  
    button::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.2) 0%, transparent 70%);
      border-radius: 15px;
      filter: blur(6px);
      z-index: -1;
      animation: buttonPulse 2s ease-in-out infinite;
    }
  
    @keyframes buttonGlow {
      0%, 100% {
        box-shadow: 
          0 4px 15px rgba(77, 168, 255, 0.3),
          0 0 25px rgba(77, 168, 255, 0.4),
          0 0 45px rgba(77, 168, 255, 0.2);
      }
      50% {
        box-shadow: 
          0 4px 15px rgba(77, 168, 255, 0.35),
          0 0 28px rgba(77, 168, 255, 0.45),
          0 0 48px rgba(77, 168, 255, 0.25);
      }
    }
  
    @keyframes buttonPulse {
      0%, 100% {
        opacity: 0.85;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.02);
      }
    }
  
    button:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 6px 20px rgba(77, 168, 255, 0.4),
        0 0 30px rgba(77, 168, 255, 0.6),
        0 0 50px rgba(77, 168, 255, 0.4);
    }
  
    button:active {
      transform: translateY(0);
      box-shadow: 
        0 4px 15px rgba(77, 168, 255, 0.2),
        0 0 20px rgba(77, 168, 255, 0.4),
        0 0 40px rgba(77, 168, 255, 0.2);
    }
  
    .hero-content {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6rem;
      max-width: 1200px;
      margin: 0 auto;
      flex-direction: row;
      text-align: left;
      padding-left: 4rem;
    }
  
    .hero-logo {
      width: 300px;
      height: auto;
      flex-shrink: 0;
      object-fit: contain;
    }
  
    .hero-text {
      flex: 1;
      min-width: 0;
      max-width: 900px;
      text-align: left;
    }
  
    @media (max-width: 1024px) {
      .hero-content {
        padding-left: 2rem;
        padding-right: 2rem;
        gap: 2rem;
      }
  
      .hero-logo {
        width: 350px;
      }
    }
  
    @media (max-width: 768px) {
      .container {
        padding: 2rem 1rem;
        height: auto;
        min-height: 100vh;
      }
  
      .hero-content {
        flex-direction: column;
        padding: 1rem;
        gap: 2rem;
        text-align: center;
      }
  
      .hero-logo {
        width: auto;
        max-width: 90%;
        margin: 1rem auto;
      }
  
      .hero-text {
        text-align: center;
        max-width: 100%;
      }
  
      h1 {
        font-size: clamp(2rem, 4vw, 3rem);
        text-align: center;
      }
  
      .desktop-only {
        display: none;
      }
    }
  
    .features {
      position: relative;
      min-height: 100vh;
      width: 100%;
      background: linear-gradient(180deg, #000c1a 0%, #000B29 50%, #001242 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 0;
    }
  
    .features::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(77, 168, 255, 0.1) 25%,
        rgba(77, 168, 255, 0.3) 50%,
        rgba(77, 168, 255, 0.1) 75%,
        transparent 100%
      );
    }
  
    .features::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg,
        transparent,
        transparent 20%,
        rgba(77, 168, 255, 0.2) 40%,
        rgba(77, 168, 255, 1) 50%,
        rgba(77, 168, 255, 0.2) 60%,
        transparent 80%,
        transparent 100%
      );
      animation: laserScan 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      filter: drop-shadow(0 0 2px rgba(77, 168, 255, 0.8))
             drop-shadow(0 0 6px rgba(77, 168, 255, 0.6))
             drop-shadow(0 0 12px rgba(77, 168, 255, 0.4));
    }
  
    @keyframes laserScan {
      0% {
        transform: translateX(0%);
        opacity: 0;
      }
      5% {
        opacity: 1;
      }
      45% {
        transform: translateX(200%);
        opacity: 1;
      }
      47% {
        opacity: 0;
      }
      50% {
        transform: translateX(200%);
        opacity: 0;
      }
      52% {
        opacity: 1;
      }
      90% {
        transform: translateX(0%);
        opacity: 1;
      }
      95% {
        opacity: 0;
      }
      100% {
        transform: translateX(0%);
        opacity: 0;
      }
    }
  
    .features-content {
      position: relative;
      max-width: 100%;
      width: 100%;
      padding: 4rem 0;
    }
  
    .feature-block {
      max-width: 800px;
      margin-bottom: 12rem;
      position: relative;
    }
  
    .feature-block:last-child {
      margin-bottom: 0;
    }
  
    .feature-block:not(:last-child)::after {
      content: '';
      position: absolute;
      bottom: -6rem;
      left: 50%;
      transform: translateX(-50%);
      width: 400px;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(77, 168, 255, 0.1) 10%,
        rgba(77, 168, 255, 0.4) 50%,
        rgba(77, 168, 255, 0.1) 90%,
        transparent
      );
      box-shadow: 0 0 15px rgba(77, 168, 255, 0.2);
    }
  
    .feature-block:not(:last-child)::before {
      display: none;
    }
  
    .feature-block:first-child,
    .feature-block:last-child {
      margin-left: 16rem;
    }
  
    .feature-block.right {
      margin-left: auto;
      margin-right: 16rem;
      text-align: right;
    }
  
    .feature-block.right .feature-description {
      margin-left: auto;
    }
  
    .feature-label {
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-accent);
      margin-bottom: 1rem;
    }
  
    .feature-block h2 {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.2;
      color: white;
      margin-bottom: 1.5rem;
    }
  
    .feature-description {
      font-size: 1.5rem;
      line-height: 1.5;
      color: #94a3b8;
      max-width: 600px;
    }
  
    @media (max-width: 768px) {
      .features {
        padding: 8rem 0;
      }
  
      .features-content {
        padding: 4rem 0;
      }
  
      .feature-block h2 {
        font-size: 2.5rem;
        text-align: center;
      }
  
      .feature-description {
        font-size: 1.25rem;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
  
      .feature-block,
      .feature-block:first-child,
      .feature-block:last-child,
      .feature-block.right {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        padding: 0 2rem;
      }
  
      .feature-block.right .feature-description {
        margin-left: auto;
        margin-right: auto;
      }
  
      .feature-label {
        text-align: center;
      }
  
      .feature-block {
        margin-bottom: 8rem;
      }
  
      .feature-block:last-child {
        margin-bottom: 0;
      }
  
      .feature-block:not(:last-child)::after {
        bottom: -4rem;
        width: 250px;
      }
    }
  
    .cta-section {
      padding: 12rem 0;
      background: linear-gradient(135deg, #003366 0%, #001830 70%, #000c1a 100%);
      position: relative;
      overflow: hidden;
    }
  
    .cta-section .background-logo {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200%;
      height: 200%;
      background-image: url('/logo-detrade.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0.015;
      pointer-events: none;
    }
  
    .cta-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(77, 168, 255, 0.1) 25%,
        rgba(77, 168, 255, 0.3) 50%,
        rgba(77, 168, 255, 0.1) 75%,
        transparent 100%
      );
    }
  
    .cta-section::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg,
        transparent,
        transparent 20%,
        rgba(77, 168, 255, 0.2) 40%,
        rgba(77, 168, 255, 1) 50%,
        rgba(77, 168, 255, 0.2) 60%,
        transparent 80%,
        transparent 100%
      );
      animation: laserScan 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      animation-delay: 4s;
      filter: drop-shadow(0 0 2px rgba(77, 168, 255, 0.8))
             drop-shadow(0 0 6px rgba(77, 168, 255, 0.6))
             drop-shadow(0 0 12px rgba(77, 168, 255, 0.4));
    }
  
    @media (min-width: 769px) {
      .cta-section .background-logo {
        left: auto;
        right: -37.5%;
        transform: translateY(-50%);
        width: 75%;
        background-position: right center;
      }
    }
  
    .cta-section .text-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      color: white;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .cta-section h2 {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.2;
      color: white;
      margin-bottom: 1.5rem;
      text-align: center;
    }
  
    .cta-section p {
      font-size: 1.5rem;
      line-height: 1.5;
      color: #94a3b8;
      margin-bottom: 2rem;
      text-align: center;
      max-width: 650px;
    }
  
    .cta-section button {
      margin: 0 auto;
      display: block;
      padding: 1rem 2.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #0d111c;
      background: linear-gradient(135deg, #fff 0%, var(--color-accent) 100%);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 
        0 4px 15px rgba(77, 168, 255, 0.3),
        0 0 25px rgba(77, 168, 255, 0.5),
        0 0 45px rgba(77, 168, 255, 0.3);
      position: relative;
      animation: buttonGlow 2s ease-in-out infinite;
    }
  
    .cta-section button::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: radial-gradient(circle at 50% 50%, rgba(77, 168, 255, 0.2) 0%, transparent 70%);
      border-radius: 15px;
      filter: blur(6px);
      z-index: -1;
      animation: buttonPulse 2s ease-in-out infinite;
    }
  
    .cta-section button:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 6px 20px rgba(77, 168, 255, 0.4),
        0 0 30px rgba(77, 168, 255, 0.6),
        0 0 50px rgba(77, 168, 255, 0.4);
    }
  
    .cta-section button:active {
      transform: translateY(0);
      box-shadow: 
        0 4px 15px rgba(77, 168, 255, 0.2),
        0 0 20px rgba(77, 168, 255, 0.4),
        0 0 40px rgba(77, 168, 255, 0.2);
    }
  
    @media (max-width: 768px) {
      .cta-section .text-content {
        padding: 0 1rem;
      }
  
      .cta-section h2 {
        font-size: 2.5rem;
      }
  
      .cta-section p {
        font-size: 1.2rem;
      }
    }
  
    .desktop-only {
      display: none;
    }
  
    @media (min-width: 769px) {
      .desktop-only {
        display: block;
      }
    }
  
    .dark-blue-section {
      background: linear-gradient(180deg, #000c1a 0%, #000B29 50%, #001242 100%);
      padding: 2rem 0 2rem;
      width: 100%;
      position: relative;
    }
  
    .dark-blue-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(77, 168, 255, 0.1) 25%,
        rgba(77, 168, 255, 0.3) 50%,
        rgba(77, 168, 255, 0.1) 75%,
        transparent 100%
      );
    }
  
    .dark-blue-section::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg,
        transparent,
        transparent 20%,
        rgba(77, 168, 255, 0.2) 40%,
        rgba(77, 168, 255, 1) 50%,
        rgba(77, 168, 255, 0.2) 60%,
        transparent 80%,
        transparent 100%
      );
      animation: laserScan 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      animation-delay: 6s;
      filter: drop-shadow(0 0 2px rgba(77, 168, 255, 0.8))
             drop-shadow(0 0 6px rgba(77, 168, 255, 0.6))
             drop-shadow(0 0 12px rgba(77, 168, 255, 0.4));
    }
  
    .dark-blue-section .text-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0;
      color: white;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  
    .footer-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% + 14rem);
      margin: 0 -7rem;
      padding: 0;
    }
  
    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  
    .footer-right {
      display: flex;
      align-items: center;
      margin-top: -2.5rem;
    }
  
    .social-links {
      display: flex;
      gap: 3rem;
      align-items: center;
    }
  
    @media (max-width: 1200px) {
      .footer-container {
        width: 100%;
        margin: 0;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;
      }
  
      .footer-left {
        align-items: center;
      }
  
      .footer-right {
        margin-top: 0;
      }
    }
  
    @media (max-width: 768px) {
      .dark-blue-section {
        padding: 2rem 0 2rem;
      }
  
      .dark-blue-section .text-content {
        padding: 0 1rem;
      }
  
      .dark-blue-section .logo-text {
        height: 56px;
      }
  
      .social-links {
        gap: 2rem;
      }
    }
  
    .dark-blue-section .logo-text {
      height: 70px;
      display: block;
      margin: 0;
    }
  
    .dark-blue-section p {
      font-size: 1.05rem;
      line-height: 1.5;
      color: #94a3b8;
      margin: 0;
    }
  
    .dark-blue-section p:first-of-type {
      font-weight: bold;
    }
  
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      text-decoration: none;
      height: 20px;
      width: 20px;
      position: relative;
    }
  
    .social-link::after {
      content: attr(title);
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.875rem;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
    }
  
    .social-link:hover::after {
      opacity: 1;
      visibility: visible;
    }
  
    .social-icon {
      height: 20px;
      width: 20px;
      opacity: 0.8;
      filter: brightness(0) invert(1);
      object-fit: contain;
    }
  
    a[href*="x.com"] .social-icon {
      transform: scale(0.85);
    }
  
    .social-link:hover .social-icon {
      opacity: 1;
    }
  
    .dark-blue-section .copyright {
      font-size: 1rem;
      color: #94a3b8;
      font-weight: 400;
      margin: 0;
    }
  
    a {
      text-decoration: none;
    }
  </style> 