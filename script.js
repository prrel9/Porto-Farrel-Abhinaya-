/* ═══════════════════════════════════════
   PORTFOLIO — Main JavaScript
   Clean, modular, well-commented
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ═══ 1. LOADER ═══ */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('out');
    }, 1500);
  });


  /* ═══ 2. CUSTOM CURSOR ═══ */
  const cur = document.getElementById('cur');
  const curRing = document.getElementById('curRing');
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cur.style.left = mouseX + 'px';
    cur.style.top = mouseY + 'px';
  }, { passive: true });

  function animCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    curRing.style.left = ringX + 'px';
    curRing.style.top = ringY + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Enlarge cursor on interactive elements
  document.querySelectorAll('a, button, .flip-card, .proj-item').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(2.5)';
      curRing.style.width = '60px';
      curRing.style.height = '60px';
      curRing.style.borderColor = 'rgba(232,0,15,0.9)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(1)';
      curRing.style.width = '36px';
      curRing.style.height = '36px';
      curRing.style.borderColor = 'rgba(232,0,15,0.55)';
    });
  });


  /* ═══ 3. NAVBAR SHRINK ON SCROLL ═══ */
  const navEl = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('shrink', window.scrollY > 60);
  }, { passive: true });


  /* ═══ 4. THEME TOGGLE ═══ */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const themeIco = document.getElementById('themeIco');
  const savedTheme = localStorage.getItem('pf-theme') || 'dark';

  html.setAttribute('data-theme', savedTheme);
  updateTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('pf-theme', newTheme);
    updateTheme(newTheme);
  });

  function updateTheme(theme) {
    themeIco.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }


  /* ═══ 5. BURGER / MOBILE NAV ═══ */
  const burger = document.getElementById('burger');
  const mobNav = document.getElementById('mobNav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobNav.classList.toggle('open');
  });

  document.querySelectorAll('.mob-lnk').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobNav.classList.remove('open');
    });
  });


  /* ═══ 6. TYPING ANIMATION ═══ */
  const phrases = [
    'Fullstack Developer',
    'Frontend Engineer',
    'Backend Developer',
    'Web Creator'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById('typingEl');

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeLoop, delay);
  }
  typeLoop();


  /* ═══ 7. SCROLL REVEAL ═══ */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ═══ 8. COUNTER ANIMATION ═══ */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-count');
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          entry.target.textContent = current + '+';
        }, 40);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => counterObserver.observe(c));


  /* ═══ 9. SKILL BARS ═══ */
  const barFills = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-w') + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  barFills.forEach((bar) => barObserver.observe(bar));


  /* ═══ 10. TIMELINE TABS ═══ */
  document.querySelectorAll('.tl-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tl-tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tl-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });


  /* ═══ 11. 3D TILT ON PROJECT THUMBS ═══ */
  document.querySelectorAll('.tilt-thumb').forEach((el) => {
    // Throttle tilt calculations using requestAnimationFrame
    let rafId;
    el.addEventListener('mousemove', (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(700px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg) scale(1.03)`;
        el.style.transition = 'transform .08s ease';
        rafId = null;
      });
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(700px) rotateY(0) rotateX(0) scale(1)';
      el.style.transition = 'transform .5s ease';
    });
  });


  /* ═══ 12. BUTTON RIPPLE ═══ */
  document.querySelectorAll('.ripple-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.cssText = `width:${size}px;height:${size}px;top:${e.clientY - rect.top - size / 2}px;left:${e.clientX - rect.left - size / 2}px`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });


  /* ═══ 13. GHOST CODER MASCOT — Enlarged for proportional display ═══ */
  (() => {
  // Skip heavy ghost animation on prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = document.getElementById('ghostCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    let ghostMouseX = W / 2;
    let ghostMouseY = H / 2;

    const wrap = document.getElementById('ghostWrap');
    wrap.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      ghostMouseX = e.clientX - rect.left;
      ghostMouseY = e.clientY - rect.top;
    });
    wrap.addEventListener('mouseleave', () => {
      ghostMouseX = W / 2;
      ghostMouseY = H / 3;
    });

    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

    // Floating particles
    const particles = [];
    for (let i = 0; i < 6; i++) { // Reduced particle count for performance
      particles.push({
        x: W / 2 + (Math.random() - 0.5) * 100,
        y: H / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.5 + 0.2),
        r: Math.random() * 3.5 + 1.5,
        alpha: Math.random() * 0.5 + 0.2,
        life: Math.random()
      });
    }

    function eyePupil(mx, my, ex, ey, maxR) {
      const dx = mx - ex;
      const dy = my - ey;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ratio = Math.min(dist, maxR) / (dist || 1);
      return { x: dx * ratio, y: dy * ratio };
    }

    function drawGhost(time) {
      ctx.clearRect(0, 0, W, H);
      const dark = isDark();
      const cx = W / 2;
      const cy = H / 2 - 10;
      const bob = Math.sin(time * 0.0018) * 14;
      const tilt = Math.sin(time * 0.0012) * 0.06;

      const ACCENT = '#e8000f';
      const ACCENT2 = '#ff3a3a';
      const bodyAlpha = dark ? 0.13 : 0.10;
      const bodyFill = dark
        ? `rgba(240,238,234,${bodyAlpha})`
        : `rgba(13,13,13,${bodyAlpha})`;
      const strokeCol = dark
        ? 'rgba(232,0,15,0.45)'
        : 'rgba(200,0,10,0.50)';
      const eyeWhite = dark
        ? 'rgba(255,255,255,0.92)'
        : 'rgba(255,255,255,0.96)';

      // Glow orb behind ghost
      const glow = ctx.createRadialGradient(cx, cy + bob, 0, cx, cy + bob, 130);
      glow.addColorStop(0, dark ? 'rgba(232,0,15,0.07)' : 'rgba(200,0,10,0.05)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy + bob, 130, 0, Math.PI * 2);
      ctx.fill();

      // Floating particles
      particles.forEach((p) => {
        p.life += 0.008;
        if (p.life > 1) {
          p.x = cx + (Math.random() - 0.5) * 120;
          p.y = cy + bob + 80;
          p.vx = (Math.random() - 0.5) * 0.5;
          p.vy = -(Math.random() * 0.6 + 0.3);
          p.life = 0;
          p.alpha = Math.random() * 0.4 + 0.15;
        }
        p.x += p.vx;
        p.y += p.vy + (bob * 0.01);
        const alpha = p.alpha * (1 - p.life);
        ctx.fillStyle = Math.random() > 0.5
          ? `rgba(232,0,15,${alpha})`
          : `rgba(255,58,58,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.save();
      ctx.translate(cx, cy + bob);
      ctx.rotate(tilt);

      // Ghost body — scaled up proportionally
      const bW = 140;
      const bH = 170;
      const bTop = -180;

      ctx.fillStyle = bodyFill;
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, bTop + bH * 0.5, bW / 2, Math.PI, 0);
      ctx.lineTo(bW / 2, bTop + bH);

      // Wavy bottom
      const segs = 5;
      const segW = bW / segs;
      for (let i = 0; i < segs; i++) {
        const xOff = (bW / 2) - i * segW;
        const yWave = Math.sin(time * 0.002 + i) * (i % 2 === 0 ? 12 : -12);
        ctx.quadraticCurveTo(xOff - segW * 0.5, bTop + bH + 24 + yWave, xOff - segW, bTop + bH);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner glow stripe
      const stripe = ctx.createLinearGradient(-50, bTop + 20, -50, bTop + bH * 0.6);
      stripe.addColorStop(0, dark ? 'rgba(232,0,15,0.08)' : 'rgba(200,0,10,0.07)');
      stripe.addColorStop(1, 'transparent');
      ctx.fillStyle = stripe;
      ctx.beginPath();
      ctx.arc(0, bTop + bH * 0.5, bW / 2, Math.PI, 0);
      ctx.lineTo(bW * 0.3, bTop + bH * 0.7);
      ctx.lineTo(-bW * 0.3, bTop + bH * 0.7);
      ctx.closePath();
      ctx.fill();

      // Eyes — proportionally enlarged
      const eyeY = bTop + bH * 0.38;
      [{ ex: -36, ey: eyeY }, { ex: 36, ey: eyeY }].forEach(({ ex, ey }) => {
        // White sclera
        ctx.fillStyle = eyeWhite;
        ctx.strokeStyle = strokeCol;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(ex, ey, 17, 21, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pupil tracking
        const p = eyePupil(ghostMouseX - cx, ghostMouseY - cy - bob, ex, ey, 8);

        // Iris gradient
        const irisGrad = ctx.createRadialGradient(ex + p.x, ey + p.y, 0, ex + p.x, ey + p.y, 11);
        irisGrad.addColorStop(0, ACCENT2);
        irisGrad.addColorStop(0.5, ACCENT);
        irisGrad.addColorStop(1, '#6a0000');
        ctx.fillStyle = irisGrad;
        ctx.beginPath();
        ctx.ellipse(ex + p.x, ey + p.y, 11, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pupil
        ctx.fillStyle = dark ? '#0d0d0d' : '#1a0000';
        ctx.beginPath();
        ctx.ellipse(ex + p.x, ey + p.y, 5.5, 6.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Specular highlight
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(ex + p.x + 3.5, ey + p.y - 5, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Smile
      const smileY = bTop + bH * 0.62;
      ctx.strokeStyle = dark ? 'rgba(232,0,15,0.6)' : 'rgba(200,0,10,0.65)';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-22, smileY);
      ctx.bezierCurveTo(-14, smileY + 12, 14, smileY + 12, 22, smileY);
      ctx.stroke();

      // Cheek blush
      [{ bx: -54, by: eyeY + 22 }, { bx: 54, by: eyeY + 22 }].forEach(({ bx, by }) => {
        const blushGrad = ctx.createRadialGradient(bx, by, 0, bx, by, 17);
        blushGrad.addColorStop(0, 'rgba(232,0,15,0.18)');
        blushGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = blushGrad;
        ctx.beginPath();
        ctx.arc(bx, by, 17, 0, Math.PI * 2);
        ctx.fill();
      });

      // Code symbol on body
      ctx.font = 'bold 22px monospace';
      ctx.fillStyle = dark ? 'rgba(232,0,15,0.35)' : 'rgba(200,0,10,0.30)';
      ctx.textAlign = 'center';
      ctx.fillText('</>', 0, bTop + bH * 0.82);

      ctx.restore();

      // Shadow below ghost
      const shadowAlpha = dark ? 0.12 : 0.09;
      const shadowW = 110 - Math.abs(Math.sin(time * 0.0018) * 22);
      const shadowGrad = ctx.createRadialGradient(cx, H * 0.88, 0, cx, H * 0.88, shadowW);
      shadowGrad.addColorStop(0, `rgba(232,0,15,${shadowAlpha})`);
      shadowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(cx, H * 0.88, shadowW, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(drawGhost);
    }

    requestAnimationFrame((ts) => drawGhost(ts));
  })();


  /* ═══ 14. FORM VALIDATION ═══ */
  const contactForm = document.getElementById('cForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = [
      { id: 'fn', errId: 'fn-e', ok: (v) => v.trim().length > 0 },
      { id: 'fe', errId: 'fe-e', ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'fs', errId: 'fs-e', ok: (v) => v.trim().length > 0 },
      { id: 'fm', errId: 'fm-e', ok: (v) => v.trim().length > 0 },
    ];

    let valid = true;

    fields.forEach(({ id, errId, ok }) => {
      const el = document.getElementById(id);
      const errEl = document.getElementById(errId);
      if (!ok(el.value)) {
        el.classList.add('err');
        errEl.classList.add('show');
        valid = false;
      } else {
        el.classList.remove('err');
        errEl.classList.remove('show');
      }
    });

    if (valid) {
      const btn = this.querySelector('[type=submit]');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Terkirim!';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
        btn.style.background = '';
        this.reset();
      }, 3000);
    }
  });

  // Clear field errors on input
  document.querySelectorAll('.f-group input, .f-group textarea').forEach((el) => {
    el.addEventListener('input', () => {
      el.classList.remove('err');
      const errEl = document.getElementById(el.id + '-e');
      if (errEl) errEl.classList.remove('show');
    });
  });


  /* ═══ 15. SCROLL-BASED PARALLAX HERO TEXT ═══ */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const h1 = document.querySelector('.hero-h1');
    if (h1) h1.style.transform = `translateY(${scrollY * 0.25}px)`;
  }, { passive: true });


  /* ═══ 16. AURORA ORB — MOUSE PARALLAX ═══ */
  (() => {
    const orb1 = document.querySelector('.aurora-orb.orb-1');
    const orb2 = document.querySelector('.aurora-orb.orb-2');
    const orb3 = document.querySelector('.aurora-orb.orb-3');
    const blob = document.querySelector('.morph-blob.blob-hero');
    if (!orb1) return;

    let tx1 = 0, ty1 = 0, tx2 = 0, ty2 = 0, tx3 = 0, ty3 = 0, tbx = 0, tby = 0;
    let cx1 = 0, cy1 = 0, cx2 = 0, cy2 = 0, cx3 = 0, cy3 = 0, cbx = 0, cby = 0;

    document.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      tx1 = nx * 30;  ty1 = ny * 20;
      tx2 = -nx * 20; ty2 = -ny * 15;
      tx3 = nx * 15;  ty3 = ny * 25;
      tbx = -nx * 18; tby = -ny * 12;
    }, { passive: true });

    function lerpOrbs() {
      const speed = 0.04;
      cx1 += (tx1 - cx1) * speed; cy1 += (ty1 - cy1) * speed;
      cx2 += (tx2 - cx2) * speed; cy2 += (ty2 - cy2) * speed;
      cx3 += (tx3 - cx3) * speed; cy3 += (ty3 - cy3) * speed;
      cbx += (tbx - cbx) * speed; cby += (tby - cby) * speed;

      if (orb1) orb1.style.transform = `translate(${cx1}px,${cy1}px)`;
      if (orb2) orb2.style.transform = `translate(${cx2}px,${cy2}px)`;
      if (orb3) orb3.style.transform = `translate(${cx3}px,${cy3}px)`;
      if (blob) {
        blob.style.transform = `translateY(calc(-50% + ${cby}px)) translateX(${cbx}px)`;
      }
      requestAnimationFrame(lerpOrbs);
    }
    lerpOrbs();
  })();


  /* ═══ 17. AURORA ORBS — SCROLL OPACITY ═══ */
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.6)));
    const orbs = hero.querySelectorAll('.aurora-orb');
    orbs.forEach((orb) => {
      orb.style.opacity = String(Math.max(0, 1 - progress * 1.4));
    });
  }, { passive: true });


  /* ═══ 18. FAN CARD GALLERY ═══ */
  const fanDeck = document.getElementById('fanDeck');
  const fanCards = document.querySelectorAll('.fan-card');
  const fanInfoBar = document.getElementById('fanInfoBar');
  const fanInfoTitle = document.getElementById('fanInfoTitle');
  const fanInfoDesc = document.getElementById('fanInfoDesc');
  
  if (fanDeck) {
    // 1. Set random resting rotation/variables for shuffle animation
    fanCards.forEach((card, i) => {
      // Resting slight random tilt
      const restRot = (Math.random() - 0.5) * 4; 
      card.style.setProperty('--card-rest', `rotate(${restRot}deg)`);
      // Shuffle rotation spread
      const spreadRot = -30 + (i * 12);
      card.style.setProperty('--sh-rot', `${spreadRot}deg`);
    });

    // 2. Observer for shuffle animation on scroll reveal
    const fanObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fanCards.forEach((card, idx) => {
            // Staggered shuffle animation
            setTimeout(() => {
              card.classList.add('shuffling');
            }, idx * 120);
          });
          fanObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    fanObserver.observe(fanDeck);

    // Remove shuffling class when done so hover works cleanly
    fanCards.forEach(card => {
      card.addEventListener('animationend', (e) => {
        if (e.animationName === 'cardFlyUp') {
          card.classList.remove('shuffling');
        }
      });
    });

    // 3. Hover to Fan Out
    fanDeck.addEventListener('mouseenter', () => {
      fanDeck.classList.add('fanned');
    });

    fanDeck.addEventListener('mouseleave', () => {
      fanDeck.classList.remove('fanned');
      // Reset selections when mouse leaves deck area
      fanCards.forEach(c => c.classList.remove('selected'));
      fanInfoBar.classList.remove('active');
      fanInfoTitle.textContent = 'Gallery Moments';
      fanInfoDesc.textContent = 'Hover kartu lalu klik untuk melihat cerita di baliknya.';
    });

    // 4. Click to Select & update info
    fanCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        // Prevent click if not fanned yet or currently shuffling
        if (!fanDeck.classList.contains('fanned') || card.classList.contains('shuffling')) return;
        
        const isSelected = card.classList.contains('selected');
        
        // Remove selection from all
        fanCards.forEach(c => c.classList.remove('selected'));
        
        if (!isSelected) {
          // Select this one
          card.classList.add('selected');
          
          // Update info bar
          fanInfoTitle.textContent = card.dataset.title;
          fanInfoDesc.textContent = card.dataset.desc;
          fanInfoBar.classList.add('active');
        } else {
          // Deselected
          fanInfoBar.classList.remove('active');
          fanInfoTitle.textContent = 'Gallery Moments';
          fanInfoDesc.textContent = 'Hover kartu lalu klik untuk melihat cerita di baliknya.';
        }
      });
    });
  }

});
