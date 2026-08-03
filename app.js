/* ==========================================================================
   ROBLOX NEXT-GEN METAVERSE LANDING PAGE SCRIPT
   Features: Canvas Graphics, Live Stats Counter, Game Filter, DevEx Calc, Avatar Switcher, Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHeroCanvas();
  initStatsCounter();
  initGameFiltering();
  initAvatarStage();
  initDevExCalculator();
  initPlayModal();
  initThumbnailsCanvas();
});

/* --- 1. Sticky Navbar Effect --- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --- 2. Hero Interactive Canvas Visual --- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Floating Cyber Particles
  const particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    color: Math.random() > 0.5 ? '#00a2ff' : '#8a2be2',
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
  }));

  let angle = 0;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dynamic Futuristic Grid Background
    ctx.strokeStyle = 'rgba(0, 162, 255, 0.08)';
    ctx.lineWidth = 1;
    const gridSize = 40;

    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Glowing Central Roblox Cubes
    angle += 0.015;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    // Draw 3D Isometric Blox Cube
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle * 0.3);

    // Glowing shadow
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 25;

    // Gradient Cube Face
    const grad = ctx.createLinearGradient(-60, -60, 60, 60);
    grad.addColorStop(0, '#00a2ff');
    grad.addColorStop(0.5, '#8a2be2');
    grad.addColorStop(1, '#ff007f');

    ctx.fillStyle = grad;
    ctx.fillRect(-50, -50, 100, 100);

    // Inner Hole (Roblox 'O' Logo signature)
    ctx.fillStyle = '#07090e';
    ctx.fillRect(-18, -18, 36, 36);

    ctx.restore();

    // Render & Update Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --- 3. Live Stats Counter Animation --- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const suffix = stat.getAttribute('data-suffix') || '';
          const prefix = stat.getAttribute('data-prefix') || '';
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = (target * easeProgress).toFixed(target % 1 === 0 ? 0 : 1);

            stat.textContent = `${prefix}${currentValue}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* --- 4. Game Experience Filtering --- */
function initGameFiltering() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.game-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 5. Interactive Avatar Customizer Previewer --- */
function initAvatarStage() {
  const canvas = document.getElementById('avatarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let currentHat = 'cyber-visor';

  const hatBtns = document.querySelectorAll('.item-option-btn');
  hatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHat = btn.getAttribute('data-item');
      drawAvatar();
    });
  });

  function drawAvatar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + 20;

    // Platform Glow
    ctx.beginPath();
    ctx.ellipse(cx, cy + 90, 80, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.2)';
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 20;
    ctx.fill();

    // R15 Roblox Blocky Figure
    // Legs
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 30, cy + 30, 25, 55);
    ctx.fillRect(cx + 5, cy + 30, 25, 55);

    // Torso
    ctx.fillStyle = '#00a2ff';
    ctx.shadowColor = '#00a2ff';
    ctx.shadowBlur = 15;
    ctx.fillRect(cx - 35, cy - 35, 70, 60);

    // Arms
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 55, cy - 35, 18, 60);
    ctx.fillRect(cx + 37, cy - 35, 18, 60);

    // Head
    ctx.fillStyle = '#ffca28';
    ctx.shadowColor = '#ffca28';
    ctx.shadowBlur = 10;
    ctx.fillRect(cx - 25, cy - 85, 50, 45);

    // Face Smile
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy - 65, 12, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(cx - 14, cy - 75, 6, 8);
    ctx.fillRect(cx + 8, cy - 75, 6, 8);

    // Draw Accessory Item
    ctx.shadowBlur = 15;
    if (currentHat === 'cyber-visor') {
      ctx.fillStyle = '#ff007f';
      ctx.shadowColor = '#ff007f';
      ctx.fillRect(cx - 27, cy - 78, 54, 12);
    } else if (currentHat === 'neon-horns') {
      ctx.fillStyle = '#00e676';
      ctx.shadowColor = '#00e676';
      ctx.beginPath();
      ctx.moveTo(cx - 22, cy - 85);
      ctx.lineTo(cx - 32, cy - 110);
      ctx.lineTo(cx - 15, cy - 88);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx + 22, cy - 85);
      ctx.lineTo(cx + 32, cy - 110);
      ctx.lineTo(cx + 15, cy - 88);
      ctx.fill();
    } else if (currentHat === 'golden-crown') {
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(cx - 27, cy - 85);
      ctx.lineTo(cx - 27, cy - 105);
      ctx.lineTo(cx - 14, cy - 92);
      ctx.lineTo(cx, cy - 110);
      ctx.lineTo(cx + 14, cy - 92);
      ctx.lineTo(cx + 27, cy - 105);
      ctx.lineTo(cx + 27, cy - 85);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawAvatar();
}

/* --- 6. DevEx Robux Calculator --- */
function initDevExCalculator() {
  const robuxInput = document.getElementById('robuxInput');
  const usdResult = document.getElementById('usdResult');
  if (!robuxInput || !usdResult) return;

  // Rate: 100,000 Robux = $350 USD (0.0035 USD per Robux)
  const RATE = 0.0035;

  function calculate() {
    let val = parseInt(robuxInput.value, 10);
    if (isNaN(val) || val < 0) val = 0;
    const usd = val * RATE;
    usdResult.textContent = `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  robuxInput.addEventListener('input', calculate);
  calculate();
}

/* --- 7. Play / Download Modal --- */
function initPlayModal() {
  const modal = document.getElementById('playModal');
  const openBtns = document.querySelectorAll('.js-open-modal');
  const closeBtn = document.querySelector('.modal-close-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* --- 8. Dynamic Game Card Thumbnails Canvas Generator --- */
function initThumbnailsCanvas() {
  const canvases = document.querySelectorAll('.game-thumb-canvas');
  const gradients = [
    ['#ff007f', '#7928ca'],
    ['#00a2ff', '#00f2fe'],
    ['#8a2be2', '#4facfe'],
    ['#00e676', '#11998e'],
    ['#f857a6', '#ff5858'],
    ['#4776E6', '#8E54E9']
  ];

  canvases.forEach((c, idx) => {
    const ctx = c.getContext('2d');
    c.width = c.clientWidth || 300;
    c.height = c.clientHeight || 190;

    const grad = ctx.createLinearGradient(0, 0, c.width, c.height);
    const pair = gradients[idx % gradients.length];
    grad.addColorStop(0, pair[0]);
    grad.addColorStop(1, pair[1]);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);

    // Decorative Shapes inside thumbnail
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(c.width / 2, c.height / 2, 45, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`EXPERIENCE #${idx + 1}`, c.width / 2, c.height / 2 + 8);
  });
}
