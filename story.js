/**
 * PIP'S SLEEPY NURSERY TALE — SCROLL STORYTELLING ENGINE
 * Baby's First Website 2026 • Track 1
 *
 * Immersive scroll-driven mechanics:
 * 1. Celestial Starlight & Sparkle Particle Canvas Engine
 * 2. Scroll-driven Scene Controller (IntersectionObserver & Scroll Progress)
 * 3. Hero Character State Shift: Sleeping Pip awakens on scroll
 * 4. Animated Story Chapters (Shooting star, Floating Sanctuary, Dream Crafting, Emotional Closing)
 * 5. Star Rail Scroll Progress Tracker
 * 6. Generative Web Audio Bedtime Lullaby (Gentle oscillators with volume control)
 * 7. "Replay the Tale" Smooth Controller
 */

(function () {
  'use strict';

  /* ==========================================================================
     GLOBAL STATE & SETTINGS
     ========================================================================== */
  const state = {
    audioEnabled: false,
    audioInitialized: false,
    lullabyVolume: 0.35,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    currentScene: 'hero'
  };

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    state.reducedMotion = e.matches;
  });

  /* ==========================================================================
     1. CELESTIAL STARLIGHT & PARTICLE CANVAS
     ========================================================================== */
  const canvas = document.getElementById('star-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let animFrameId = null;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(window.innerWidth / 18));
    const colors = ['#ffffff', '#ffeaa7', '#ffd6b3', '#f8a5c2', '#bfaee3'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.05 // Soft upward drift
      });
    }
  }

  function renderStars() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now() * 0.002;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;

      const alpha = p.baseAlpha + Math.sin(now * p.twinkleSpeed * 10 + p.twinklePhase) * 0.25;
      const clampedAlpha = Math.max(0.05, Math.min(1, alpha));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = clampedAlpha;
      ctx.shadowBlur = p.radius * 4;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    if (!state.reducedMotion) {
      animFrameId = requestAnimationFrame(renderStars);
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  renderStars();

  /* ==========================================================================
     1B. MOUSE ARROW SPARKLE TRAIL & CLICK CONFETTI (FX Canvas)
     Leaves a soft twinkling stardust & 4-point star trail behind the cursor.
     ========================================================================== */
  const fxCanvas = document.getElementById('fx-canvas');
  const fxCtx = fxCanvas ? fxCanvas.getContext('2d') : null;
  const fxParticles = [];

  function resizeFxCanvas() {
    if (!fxCanvas) return;
    fxCanvas.width = window.innerWidth;
    fxCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFxCanvas);
  resizeFxCanvas();

  function addSparkle(x, y) {
    if (fxParticles.length > 70 || state.reducedMotion) return;
    const colors = ['#ffeaa7', '#ffd6b3', '#f8a5c2', '#bfaee3', '#ffffff', '#a3c9f7', '#fff275'];
    fxParticles.push({
      x: x + (Math.random() * 8 - 4),
      y: y + (Math.random() * 8 - 4),
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6 + 0.35,
      size: Math.random() * 4.5 + 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.025 + 0.02,
      isStar: Math.random() > 0.35
    });
  }

  function triggerStarBurst(originX, originY) {
    if (state.reducedMotion) return;
    const colors = ['#ffeaa7', '#ffd6b3', '#f8a5c2', '#bfaee3', '#ffffff', '#fff275', '#f896b0'];
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2.5;
      fxParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012,
        isStar: true,
        isConfetti: Math.random() > 0.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }
  }

  function draw4PointStar(ctx, cx, cy, r) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.quadraticCurveTo(cx, cy, cx + r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + r);
    ctx.quadraticCurveTo(cx, cy, cx - r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - r);
    ctx.closePath();
    ctx.fill();
  }

  function renderFX() {
    if (!fxCtx || !fxCanvas) return;
    fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

    for (let i = fxParticles.length - 1; i >= 0; i--) {
      const p = fxParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.isConfetti) {
        p.vy += 0.2; // gentle starlight gravity
        p.rotation += p.rotSpeed;
      }

      if (p.alpha <= 0) {
        fxParticles.splice(i, 1);
        continue;
      }

      fxCtx.save();
      fxCtx.globalAlpha = Math.max(0, p.alpha);
      fxCtx.fillStyle = p.color;
      fxCtx.shadowBlur = p.size * 3;
      fxCtx.shadowColor = p.color;

      if (p.isConfetti) {
        fxCtx.translate(p.x, p.y);
        fxCtx.rotate((p.rotation * Math.PI) / 180);
        fxCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.isStar) {
        draw4PointStar(fxCtx, p.x, p.y, p.size);
      } else {
        fxCtx.beginPath();
        fxCtx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        fxCtx.fill();
      }
      fxCtx.restore();
    }

    if (!state.reducedMotion) {
      requestAnimationFrame(renderFX);
    }
  }
  requestAnimationFrame(renderFX);

  /* ==========================================================================
     1C. ARROW INTERACTION & SPARKLE TRAIL (Storytelling Scenes)
     - Awakens Pip gently when cursor moves near the top
     - Emits magical bedtime starlight sparkles along the arrow path
     ========================================================================== */
  const heroAwakeGroup = document.getElementById('hero-eyes-awake');
  let heroAwakeByArrow = false;

  function onPointerMove(e) {
    const pointerX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const pointerY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : null);
    if (pointerX == null || pointerY == null) return;

    // Moving arrow awakens Pip in the hero opening scene!
    if (!heroAwakeByArrow && window.scrollY < 200) {
      heroAwakeByArrow = true;
      const sleepEl = document.getElementById('hero-eyes-sleeping');
      const awakeEl = document.getElementById('hero-eyes-awake');
      const zzzEl = document.querySelector('.zzz-container');
      if (sleepEl && awakeEl) {
        sleepEl.style.transition = 'opacity 0.4s ease';
        awakeEl.style.transition = 'opacity 0.4s ease';
        sleepEl.style.opacity = '0';
        awakeEl.style.opacity = '1';
      }
      if (zzzEl) {
        zzzEl.style.transition = 'opacity 0.4s ease';
        zzzEl.style.opacity = '0.2';
      }
    }

    // Feed the arrow sparkle trail
    if (!state.reducedMotion) {
      addSparkle(pointerX, pointerY);
    }
  }

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  // When cursor leaves window at top of story, Pip returns to peaceful sleep
  window.addEventListener('mouseleave', () => {
    if (window.scrollY < 60) {
      heroAwakeByArrow = false;
      const sleepEl = document.getElementById('hero-eyes-sleeping');
      const awakeEl = document.getElementById('hero-eyes-awake');
      const zzzEl = document.querySelector('.zzz-container');
      if (sleepEl && awakeEl) {
        sleepEl.style.opacity = '1';
        awakeEl.style.opacity = '0';
      }
      if (zzzEl) {
        zzzEl.style.opacity = '1';
      }
    }
  });

  // Soft gentle blink for Hero Pip if awake
  let storyBlinkTimeout = null;
  function triggerStoryBlink(isDouble = false) {
    if (heroAwakeGroup && window.scrollY < 200) {
      heroAwakeGroup.style.transformOrigin = '100px 95px';
      heroAwakeGroup.style.transform = 'scaleY(0.08)';
      heroAwakeGroup.style.transition = 'transform 0.08s ease';
    }

    setTimeout(() => {
      if (heroAwakeGroup && window.scrollY < 200) {
        heroAwakeGroup.style.transform = 'scaleY(1)';
      }

      if (!isDouble && Math.random() < 0.28) {
        setTimeout(() => triggerStoryBlink(true), 120);
      } else {
        scheduleStoryBlink();
      }
    }, 130);
  }

  function scheduleStoryBlink() {
    clearTimeout(storyBlinkTimeout);
    if (state.reducedMotion) return;
    const delay = Math.random() * 2500 + 3500;
    storyBlinkTimeout = setTimeout(() => triggerStoryBlink(false), delay);
  }
  scheduleStoryBlink();

  window.addEventListener('click', (e) => {
    triggerStarBurst(e.clientX, e.clientY);
  });

  /* ==========================================================================
     2. GENERATIVE WEB AUDIO BEDTIME LULLABY
     Calm, warm pentatonic music box with gentle decay envelopes.
     ========================================================================== */
  let audioCtx = null;
  let masterGain = null;
  let lullabyInterval = null;

  function initAudio() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(state.lullabyVolume, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
    state.audioInitialized = true;
  }

  function playStoryNote(freq, duration = 1.4) {
    if (!audioCtx || !state.audioEnabled) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const overtone = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm overtone for celestial bell texture
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    overtone.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration);
    overtone.stop(now + duration);
  }

  // Pentatonic dream scale: C4, D4, E4, G4, A4, C5, D5, E5
  const dreamScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  let noteIndex = 0;

  function stepLullaby() {
    if (!state.audioEnabled) return;
    const note = dreamScale[noteIndex % dreamScale.length];
    playStoryNote(note, 1.8);
    // Organic gentle melody step
    const stepOffsets = [1, 2, -1, 3, -2];
    const offset = stepOffsets[Math.floor(Math.random() * stepOffsets.length)];
    noteIndex = (noteIndex + offset + dreamScale.length) % dreamScale.length;
  }

  function startLullaby() {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    state.audioEnabled = true;
    updateAudioBtn();
    stepLullaby();
    lullabyInterval = setInterval(stepLullaby, 1100);
  }

  function stopLullaby() {
    state.audioEnabled = false;
    if (lullabyInterval) {
      clearInterval(lullabyInterval);
      lullabyInterval = null;
    }
    updateAudioBtn();
  }

  function toggleLullaby() {
    if (state.audioEnabled) {
      stopLullaby();
    } else {
      startLullaby();
    }
  }

  const soundBtn = document.getElementById('story-sound-btn');
  const soundIcon = document.getElementById('sound-btn-icon');
  const soundText = document.getElementById('sound-btn-text');

  function updateAudioBtn() {
    if (!soundBtn) return;
    if (state.audioEnabled) {
      soundBtn.classList.remove('muted');
      if (soundIcon) soundIcon.textContent = '🎵';
      if (soundText) soundText.textContent = 'Lullaby On';
    } else {
      soundBtn.classList.add('muted');
      if (soundIcon) soundIcon.textContent = '🔇';
      if (soundText) soundText.textContent = 'Lullaby Off';
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', toggleLullaby);
  }

  // Strict WebKit/iOS Audio Etiquette: Only unlock on explicit user touch or click
  function unlockOnGesture() {
    initAudio();
    window.removeEventListener('click', unlockOnGesture);
    window.removeEventListener('touchstart', unlockOnGesture);
    window.removeEventListener('keydown', unlockOnGesture);
  }
  window.addEventListener('click', unlockOnGesture, { once: true });
  window.addEventListener('touchstart', unlockOnGesture, { once: true });
  window.addEventListener('keydown', unlockOnGesture, { once: true });

  /* ==========================================================================
     3. HERO AWAKENING ON SCROLL
     As the user scrolls down from the top, sleeping eyes fade to awake eyes!
     ========================================================================== */
  const sleepingEyes = document.getElementById('hero-eyes-sleeping');
  const awakeEyes = document.getElementById('hero-eyes-awake');
  const zzzContainer = document.querySelector('.zzz-container');
  const scrollCue = document.getElementById('hero-scroll-cue');

  function updateHeroAwakening(scrollY) {
    const triggerThreshold = 180;
    const scrollProgress = Math.min(1, Math.max(0, scrollY / triggerThreshold));
    const effectiveProgress = heroAwakeByArrow ? 1 : scrollProgress;

    if (sleepingEyes && awakeEyes) {
      sleepingEyes.style.opacity = `${1 - effectiveProgress}`;
      awakeEyes.style.opacity = `${effectiveProgress}`;
    }

    if (zzzContainer) {
      zzzContainer.style.opacity = `${heroAwakeByArrow ? 0.2 : 1 - scrollProgress * 1.5}`;
      zzzContainer.style.transform = `translateY(${-scrollProgress * 30}px) scale(${1 - scrollProgress * 0.4})`;
    }

    if (scrollCue) {
      scrollCue.style.opacity = `${Math.max(0, 1 - scrollProgress * 2)}`;
    }
  }

  /* ==========================================================================
     4. SCROLL PROGRESS STAR TRACKER & PARALLAX
     ========================================================================== */
  const trackerFill = document.getElementById('tracker-fill');
  const trackerStar = document.getElementById('tracker-star');
  const trackerSteps = document.querySelectorAll('.tracker-step');
  const parallaxDeep = document.getElementById('parallax-deep');
  const parallaxMid = document.getElementById('parallax-mid');

  function updateScrollProgress() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Update Star progress bar
    if (trackerFill) {
      trackerFill.style.height = `${scrollPercent}%`;
    }
    if (trackerStar) {
      trackerStar.style.top = `${scrollPercent}%`;
    }

    // Parallax depth translation
    if (!state.reducedMotion) {
      if (parallaxDeep) parallaxDeep.style.transform = `translateY(${scrollY * 0.08}px)`;
      if (parallaxMid) parallaxMid.style.transform = `translateY(${scrollY * 0.18}px)`;
    }

    // Hero awakening calculation
    updateHeroAwakening(scrollY);
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ==========================================================================
     5. SCENE INTERSECTION OBSERVER
     Triggers narrative cards, animations and step highlighting.
     ========================================================================== */
  const scenes = document.querySelectorAll('.scene-section');

  const observerOptions = {
    threshold: 0.35,
    rootMargin: '0px 0px -100px 0px'
  };

  const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const sceneId = entry.target.id;
      const narrativeBox = entry.target.querySelector('.story-narration-box');

      if (entry.isIntersecting) {
        state.currentScene = sceneId;

        // Animate narrative box into view
        if (narrativeBox) {
          narrativeBox.classList.add('in-view');
        }

        // Highlight tracker label
        trackerSteps.forEach((step) => {
          if (step.dataset.target === sceneId) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });

        // Specific scene choreography
        if (sceneId === 'ch1') {
          const shootingStar = document.getElementById('ch1-shooting-star');
          const impactGlow = document.getElementById('ch1-impact-glow');
          if (shootingStar) shootingStar.classList.add('triggered');
          if (impactGlow) {
            setTimeout(() => impactGlow.classList.add('glowing'), 600);
          }
          if (state.audioEnabled) {
            playStoryNote(523.25, 2.0); // Chime on starfall
          }
        }

        if (sceneId === 'ch3') {
          if (state.audioEnabled) {
            playStoryNote(659.25, 1.8);
          }
        }

        if (sceneId === 'ch4') {
          const banner = document.getElementById('sweet-dreams-banner');
          if (banner) {
            banner.style.animation = 'starPulse 3s infinite ease-in-out';
          }
        }
      }
    });
  }, observerOptions);

  scenes.forEach((scene) => sceneObserver.observe(scene));

  /* ==========================================================================
     6. "REPLAY THE TALE" CONTROLLER
     ========================================================================== */
  const replayBtn = document.getElementById('replay-tale-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      // Reset shooting star and impact
      const shootingStar = document.getElementById('ch1-shooting-star');
      const impactGlow = document.getElementById('ch1-impact-glow');
      if (shootingStar) shootingStar.classList.remove('triggered');
      if (impactGlow) impactGlow.classList.remove('glowing');

      // Smooth scroll back to hero
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Play soft restart chime
      if (state.audioEnabled) {
        playStoryNote(440, 1.5);
      }
    });
  }

  // Log welcoming greeting for judges inspecting DevTools
  console.log(
    '%c⭐ Pip\'s Sleepy Nursery Tale ☁️\n%cAn interactive bedtime story among the stars.\nBaby\'s First Website 2026 • Track 1',
    'color: #ffd166; font-family: sans-serif; font-size: 16px; font-weight: bold;',
    'color: #bfaee3; font-family: sans-serif; font-size: 12px;'
  );
})();
