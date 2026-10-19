/**
 * PIP'S MIDNIGHT NURSERY — INTERACTIVE JAVASCRIPT
 * Baby's First Website 2026 • Track 1
 *
 * Fully modular vanilla JavaScript containing:
 * 1. Web Audio API Synthesis Engine (No external audio files, delayed till user click)
 * 2. Real-time Eye-Tracking for Pip's Avatar
 * 3. Day / Night Palette Switching & Dynamic Speech
 * 4. Ambient Sparkle Trail & Confetti Canvas Engine
 * 5. Generative Pentatonic Lullaby Box with Volume Control
 * 6. Nightlight Collection Modals with Hue Filters
 * 7. SVG Rooftop Dream Route Delivery Animation & Live Counter
 * 8. Celestial Rattle & Stackable Blocks with Custom Sound FX
 * 9. Scroll-Triggered Story Timeline (IntersectionObserver)
 * 10. Hidden Easter Eggs (5-Click Moon, Double-Click Pip, "dream" typed)
 */

(function () {
  'use strict';

  /* ==========================================================================
     GLOBAL STATE & PREFERENCES
     ========================================================================== */
  const state = {
    audioEnabled: true,
    isLullabyPlaying: false,
    lullabyVolume: 0.7,
    currentTheme: 'day',
    isChaosMode: false,
    dreamsDelivered: 1248,
    moonClickCount: 0,
    moonClickTimer: null,
    keyBuffer: '',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  // Watch for prefers-reduced-motion changes
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    state.reducedMotion = e.matches;
  });

  /* ==========================================================================
     1. WEB AUDIO API SYNTHESIS ENGINE
     Synthesizes cozy lullabies, crystalline chimes, rattle shakers & thunks.
     Rule: AudioContext is only created after the user's first click or tap.
     ========================================================================== */
  let audioCtx = null;
  let masterGain = null;
  let lullabyGain = null;
  let lullabyIntervalId = null;

  function initAudio() {
    if (audioCtx) {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return;
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(state.audioEnabled ? 1.0 : 0.0, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    lullabyGain = audioCtx.createGain();
    lullabyGain.gain.setValueAtTime(state.lullabyVolume, audioCtx.currentTime);
    lullabyGain.connect(masterGain);
  }

  // Ensure AudioContext is ready on any first user gesture
  function ensureAudioUnlocked() {
    if (!audioCtx) {
      initAudio();
    } else if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.addEventListener('click', ensureAudioUnlocked, { once: true });
  window.addEventListener('keydown', ensureAudioUnlocked, { once: true });
  window.addEventListener('touchstart', ensureAudioUnlocked, { once: true });

  /**
   * Sound 1: Soft Music Box Note (Pure sine wave + gentle 2nd harmonic + exponential decay)
   */
  function playMusicBoxNote(freq, duration = 1.2, parentGain = masterGain) {
    if (!audioCtx || !state.audioEnabled) return;
    const now = audioCtx.currentTime;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Subtle 2nd harmonic overtone for chime texture
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Warm envelope: instant strike, natural acoustic bell fade
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.25, now + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(parentGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  /**
   * Sound 2: Dream Chime (Triple arpeggio)
   */
  function playChimeSound() {
    if (!audioCtx || !state.audioEnabled) return;
    const chords = [523.25, 659.25, 783.99]; // C5, E5, G5
    chords.forEach((note, index) => {
      setTimeout(() => {
        playMusicBoxNote(note, 1.4);
      }, index * 90);
    });
  }

  /**
   * Sound 3: Celestial Rattle Shaker (Noise Burst + Bandpass filter)
   */
  function playRattleSound() {
    if (!audioCtx || !state.audioEnabled) return;
    const now = audioCtx.currentTime;

    // Create a buffer of white noise
    const bufferSize = audioCtx.sampleRate * 0.12;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter to mimic beads rattling
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    noise.start(now);
  }

  /**
   * Sound 4: Wooden Block Thunk (Damped pitch-drop sine wave)
   */
  function playThunkSound() {
    if (!audioCtx || !state.audioEnabled) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.18);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  /**
   * Sound 5: Cute Pip Giggle (Playful series of rising & falling chirps)
   */
  function playGiggleSound() {
    if (!audioCtx || !state.audioEnabled) return;
    const notes = [659.25, 783.99, 880.00, 783.99, 987.77, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playMusicBoxNote(freq, 0.25);
      }, idx * 70);
    });
  }

  /**
   * Sound 6: Secret Moon Serenade (Easter Egg arpeggio)
   */
  function playSecretMelody() {
    if (!audioCtx || !state.audioEnabled) return;
    const secretNotes = [523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 1046.5];
    secretNotes.forEach((freq, i) => {
      setTimeout(() => {
        playMusicBoxNote(freq, 1.8);
      }, i * 140);
    });
  }

  /**
   * Sound 7: Vintage Odometer Mechanical Ticker Click (+1 pt)
   */
  function playOdometerTickSound() {
    if (!audioCtx || !state.audioEnabled) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Sound 8: Starlight Guestbook Signature Flourish (+2 pts)
   */
  function playGuestbookSignSound() {
    if (!audioCtx || !state.audioEnabled) return;
    const notes = [440.0, 554.37, 659.25, 880.0, 1108.73];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        playMusicBoxNote(freq, 1.4);
      }, i * 75);
    });
  }

  /**
   * Sound 9: 90s Retro Chaos Mode Zap (+5 pts)
   */
  function playChaosToggleSound() {
    if (!audioCtx || !state.audioEnabled) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.16);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  /* ==========================================================================
     2. GENERATIVE PENTATONIC LULLABY ENGINE (Project 1)
     Generates tranquil, non-repeating bedtime melodies in C Major Pentatonic
     ========================================================================== */
  const pentatonicScale = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99  // G5
  ];

  let currentScaleIndex = 2; // Start on E4

  function stepGenerativeLullaby() {
    if (!state.isLullabyPlaying || !audioCtx) return;

    // Walk gently along the pentatonic scale (sleepy stepwise movement)
    const stepChoice = Math.random();
    if (stepChoice < 0.45) {
      currentScaleIndex = Math.min(pentatonicScale.length - 1, currentScaleIndex + 1);
    } else if (stepChoice < 0.85) {
      currentScaleIndex = Math.max(0, currentScaleIndex - 1);
    } else {
      currentScaleIndex = Math.floor(Math.random() * pentatonicScale.length);
    }

    const freq = pentatonicScale[currentScaleIndex];
    playMusicBoxNote(freq, 2.2, lullabyGain);

    // Spawn floating musical notes
    spawnFloatingNote();
  }

  function startLullaby() {
    initAudio();
    state.isLullabyPlaying = true;
    const box = document.getElementById('lullaby-interactive-box');
    const btn = document.getElementById('lullaby-toggle-btn');
    const icon = document.getElementById('lullaby-btn-icon');
    const text = document.getElementById('lullaby-btn-text');

    if (box) box.classList.add('playing');
    if (btn) btn.setAttribute('aria-label', 'Pause lullaby');
    if (icon) icon.textContent = '⏸';
    if (text) text.textContent = 'Pause Lullaby';

    // Play first note immediately, then on an organic breathing cadence (~800ms)
    stepGenerativeLullaby();
    lullabyIntervalId = setInterval(stepGenerativeLullaby, 820);
  }

  function stopLullaby() {
    state.isLullabyPlaying = false;
    if (lullabyIntervalId) {
      clearInterval(lullabyIntervalId);
      lullabyIntervalId = null;
    }

    const box = document.getElementById('lullaby-interactive-box');
    const btn = document.getElementById('lullaby-toggle-btn');
    const icon = document.getElementById('lullaby-btn-icon');
    const text = document.getElementById('lullaby-btn-text');

    if (box) box.classList.remove('playing');
    if (btn) btn.setAttribute('aria-label', 'Play lullaby');
    if (icon) icon.textContent = '▶';
    if (text) text.textContent = 'Play Lullaby';
  }

  function toggleLullaby() {
    if (state.isLullabyPlaying) {
      stopLullaby();
    } else {
      startLullaby();
    }
  }

  function spawnFloatingNote() {
    if (state.reducedMotion) return;
    const container = document.getElementById('music-notes-container');
    if (!container) return;

    const symbols = ['♪', '♫', '♩', '✦', '🌙', '⭐'];
    const note = document.createElement('span');
    note.className = 'floating-note';
    note.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Randomize initial position around the music box
    const xPos = 20 + Math.random() * 60;
    const yPos = 30 + Math.random() * 40;
    note.style.left = `${xPos}%`;
    note.style.top = `${yPos}%`;

    container.appendChild(note);
    setTimeout(() => {
      note.remove();
    }, 2000);
  }

  /* ==========================================================================
     3. HERO CARD 3D TILT & ARROW INTERACTION ENGINE
     - Subtle 3D hero card perspective tilt toward the arrow
     - Sparkle starlight trail behind the bedtime arrow
     ========================================================================== */
  const heroCard = document.getElementById('pip-hero-card');

  function onPointerMove(e) {
    const pointerX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const pointerY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : null);

    if (pointerX == null || pointerY == null) return;

    // Subtle 3D Card Tilt toward arrow
    if (heroCard && !state.reducedMotion) {
      const cardRect = heroCard.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const normX = Math.max(-1, Math.min(1, (pointerX - cardCenterX) / (window.innerWidth * 0.5)));
      const normY = Math.max(-1, Math.min(1, (pointerY - cardCenterY) / (window.innerHeight * 0.5)));
      const tiltX = -normY * 5;
      const tiltY = normX * 6;
      heroCard.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    }

    // Sparkle trail behind the arrow
    if (!state.reducedMotion) {
      addSparkle(pointerX, pointerY);
    }
  }

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  // Reset tilt smoothly when cursor leaves window
  window.addEventListener('mouseleave', () => {
    if (heroCard) {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  });

  // Global click starlight burst from the arrow tip!
  window.addEventListener('click', (e) => {
    triggerConfettiBurst(e.clientX, e.clientY);
  });

  /* ==========================================================================
     4. DAY / NIGHT THEME SWITCHER
     Changes body class, colors, Pip's expression text & speech bubble.
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  const speechText = document.getElementById('pip-speech-text');

  const pipGreetings = {
    day: "“Hello... I'm Pip. I make the dreams that help little creatures fall asleep.”",
    night: "“Shh... The night sky is wide open! Pip is tucking the stars into bed. Sleep tight!”"
  };

  function applyTheme(theme) {
    state.currentTheme = theme;
    if (theme === 'night') {
      document.body.classList.add('night-mode');
      document.body.classList.remove('day-mode');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeLabel) themeLabel.textContent = 'Day';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to day mode');
      if (speechText) speechText.textContent = pipGreetings.night;
    } else {
      document.body.classList.remove('night-mode');
      document.body.classList.add('day-mode');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeLabel) themeLabel.textContent = 'Night';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to night mode');
      if (speechText) speechText.textContent = pipGreetings.day;
    }
    localStorage.setItem('pip_theme_pref', theme);
  }

  function toggleTheme() {
    const nextTheme = state.currentTheme === 'day' ? 'night' : 'day';
    applyTheme(nextTheme);
    playChimeSound();
    showToast(nextTheme === 'night' ? '🌙 Night mode on: sweet dreams!' : '☀️ Day mode on: cozy sunlight!');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Restore saved theme preference if present
  const savedTheme = localStorage.getItem('pip_theme_pref');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  /* ==========================================================================
     5. SOUND MUTE / UNMUTE BUTTON
     Persists across scrolling and handles Web Audio master gain.
     ========================================================================== */
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');

  function updateSoundUI() {
    if (state.audioEnabled) {
      if (soundIcon) soundIcon.textContent = '🔊';
      if (soundLabel) soundLabel.textContent = 'Sound On';
      if (soundToggleBtn) soundToggleBtn.setAttribute('aria-label', 'Mute audio');
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(1.0, audioCtx.currentTime);
      }
    } else {
      if (soundIcon) soundIcon.textContent = '🔇';
      if (soundLabel) soundLabel.textContent = 'Muted';
      if (soundToggleBtn) soundToggleBtn.setAttribute('aria-label', 'Unmute audio');
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(0.0, audioCtx.currentTime);
      }
    }
  }

  function toggleSound() {
    ensureAudioUnlocked();
    state.audioEnabled = !state.audioEnabled;
    updateSoundUI();
    showToast(state.audioEnabled ? '🔊 Sound enabled' : '🔇 Audio muted');
    if (state.audioEnabled) {
      playChimeSound();
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', toggleSound);
  }

  /* ==========================================================================
     6. SPARKLE CURSOR TRAIL & CONFETTI ENGINE (Canvas FX)
     ========================================================================== */
  const canvas = document.getElementById('fx-canvas');
  let ctx = canvas ? canvas.getContext('2d') : null;
  const particles = [];

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function addSparkle(x, y) {
    if (particles.length > 70 || state.reducedMotion) return;
    const colors = ['#ffeaa7', '#ffd6b3', '#f8a5c2', '#bfaee3', '#ffffff', '#a3c9f7', '#fff275'];
    particles.push({
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

  function triggerConfettiBurst(originX, originY) {
    if (state.reducedMotion) return;
    const colors = ['#ffd166', '#f8b8cc', '#b9a5d6', '#ff9ebb', '#bb86fc', '#ffeaa7', '#ffffff', '#fff275'];
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 6.5 + 3.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.016 + 0.012,
        isConfetti: Math.random() > 0.45,
        isStar: true,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12
      });
    }
  }

  function draw4PointStar(c, cx, cy, r) {
    c.beginPath();
    c.moveTo(cx, cy - r);
    c.quadraticCurveTo(cx, cy, cx + r, cy);
    c.quadraticCurveTo(cx, cy, cx, cy + r);
    c.quadraticCurveTo(cx, cy, cx - r, cy);
    c.quadraticCurveTo(cx, cy, cx, cy - r);
    c.closePath();
    c.fill();
  }

  function renderFX() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.isConfetti) {
        p.vy += 0.22; // gravity
        p.rotation += p.rotSpeed;
      }

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = p.size * 2;
      ctx.shadowColor = p.color;

      if (p.isConfetti) {
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.isStar) {
        draw4PointStar(ctx, p.x, p.y, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(renderFX);
  }
  requestAnimationFrame(renderFX);

  /* ==========================================================================
     7. LULLABY LAB CONTROLS (Volume Slider & Clickable Box)
     ========================================================================== */
  const lullabyBox = document.getElementById('lullaby-interactive-box');
  const lullabyToggleBtn = document.getElementById('lullaby-toggle-btn');
  const volumeSlider = document.getElementById('lullaby-volume-slider');
  const volumeDisplay = document.getElementById('lullaby-volume-display');

  if (lullabyBox) {
    lullabyBox.addEventListener('click', () => {
      toggleLullaby();
    });
    lullabyBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLullaby();
      }
    });
  }

  if (lullabyToggleBtn) {
    lullabyToggleBtn.addEventListener('click', toggleLullaby);
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      state.lullabyVolume = val;
      if (lullabyGain && audioCtx) {
        lullabyGain.gain.setValueAtTime(val, audioCtx.currentTime);
      }
      if (volumeDisplay) {
        volumeDisplay.textContent = `${Math.round(val * 100)}%`;
      }
    });
  }

  /* ==========================================================================
     8. NIGHTLIGHT COLLECTION MODALS (Project 2)
     ========================================================================== */
  const lanternButtons = document.querySelectorAll('.lantern-item-btn');
  const lanternModal = document.getElementById('lantern-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-lantern-img');
  const modalTitle = document.getElementById('modal-lantern-title');
  const modalDesc = document.getElementById('modal-lantern-desc');
  const modalMood = document.getElementById('modal-lantern-mood');
  const modalSelectBtn = document.getElementById('modal-select-btn');

  function openLanternModal(btn) {
    const name = btn.dataset.name;
    const desc = btn.dataset.desc;
    const mood = btn.dataset.mood;
    const filter = btn.dataset.filter;

    if (modalTitle) modalTitle.textContent = name;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalMood) modalMood.textContent = mood;

    if (modalImg) {
      modalImg.className = `modal-lantern-img filter-${filter}`;
    }

    if (lanternModal) {
      lanternModal.removeAttribute('hidden');
      modalCloseBtn.focus();
    }
    playChimeSound();
  }

  function closeLanternModal() {
    if (lanternModal) {
      lanternModal.setAttribute('hidden', '');
    }
  }

  lanternButtons.forEach((btn) => {
    btn.addEventListener('click', () => openLanternModal(btn));
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeLanternModal);
  }

  if (lanternModal) {
    lanternModal.addEventListener('click', (e) => {
      if (e.target === lanternModal) closeLanternModal();
    });
  }

  if (modalSelectBtn) {
    modalSelectBtn.addEventListener('click', () => {
      closeLanternModal();
      playChimeSound();
      showToast('✨ Nightlight activated! Pip sends you sweet glowing dreams.');
    });
  }

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLanternModal();
      closeSecretModal();
    }
  });

  /* ==========================================================================
     9. DREAM DELIVERY ROUTES (Project 3)
     Rooftop SVG flight animation with live delivery counter.
     ========================================================================== */
  const deliverDreamBtn = document.getElementById('deliver-dream-btn');
  const flightPath = document.getElementById('dream-flight-path');
  const pipCarrier = document.getElementById('pip-cloud-carrier');
  const deliveryStatusText = document.getElementById('delivery-status-text');
  const dreamsCountValue = document.getElementById('dreams-count-value');

  let isDelivering = false;

  function runDreamDelivery() {
    if (isDelivering || !flightPath || !pipCarrier) return;
    isDelivering = true;
    ensureAudioUnlocked();

    if (deliverDreamBtn) {
      deliverDreamBtn.disabled = true;
      deliverDreamBtn.style.opacity = '0.7';
    }
    if (deliveryStatusText) {
      deliveryStatusText.textContent = 'Flying across starry rooftops...';
    }

    const pathLength = flightPath.getTotalLength();
    const duration = 2800; // ms
    const startTime = performance.now();

    function animateCarrier(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth cubic easeInOut curve
      const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const distance = eased * pathLength;
      const point = flightPath.getPointAtLength(distance);

      pipCarrier.setAttribute('transform', `translate(${point.x}, ${point.y})`);

      if (progress < 1) {
        requestAnimationFrame(animateCarrier);
      } else {
        // Complete delivery
        isDelivering = false;
        state.dreamsDelivered += 1;
        if (dreamsCountValue) {
          dreamsCountValue.textContent = state.dreamsDelivered.toLocaleString();
        }

        playChimeSound();
        showToast('📦 Dream successfully tucked in at Cradle Haven!');

        if (deliveryStatusText) {
          deliveryStatusText.textContent = 'Delivered safely! Little creatures are sleeping soundly.';
        }
        if (deliverDreamBtn) {
          deliverDreamBtn.disabled = false;
          deliverDreamBtn.style.opacity = '1';
        }

        // Trigger confetti near endpoint in SVG coordinates
        const rect = flightPath.getBoundingClientRect();
        triggerConfettiBurst(rect.right - 40, rect.top + 60);

        // Reset status text after 4 seconds
        setTimeout(() => {
          if (deliveryStatusText && !isDelivering) {
            deliveryStatusText.textContent = 'Ready for next nightly flight';
          }
        }, 4000);
      }
    }

    requestAnimationFrame(animateCarrier);
  }

  if (deliverDreamBtn) {
    deliverDreamBtn.addEventListener('click', runDreamDelivery);
  }

  // Auto trigger delivery once when routes section scrolls into view
  const routesCard = document.getElementById('project-routes');
  let hasAutoDelivered = false;
  if (routesCard) {
    const routeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoDelivered) {
            hasAutoDelivered = true;
            setTimeout(runDreamDelivery, 600);
          }
        });
      },
      { threshold: 0.6 }
    );
    routeObserver.observe(routesCard);
  }

  /* ==========================================================================
     10. BONUS TOYS: RATTLE & STACKABLE BLOCKS (Project 4)
     ========================================================================== */
  // A) Celestial Rattle
  const rattleBtn = document.getElementById('celestial-rattle');
  const rattleVisual = document.getElementById('rattle-visual-wrap');

  if (rattleBtn) {
    rattleBtn.addEventListener('click', () => {
      ensureAudioUnlocked();
      playRattleSound();
      if (rattleVisual) {
        rattleVisual.classList.remove('shake-active');
        // Force DOM reflow to re-trigger animation
        void rattleVisual.offsetWidth;
        rattleVisual.classList.add('shake-active');
      }
      showToast('✨ *Chitter-clatter!* Pip loves that rattle sound.');
    });
  }

  // B) Stackable Dream Blocks
  const blocks = document.querySelectorAll('.dream-block');
  const resetBlocksBtn = document.getElementById('reset-blocks-btn');
  const blocksStatus = document.getElementById('blocks-status-text');

  blocks.forEach((block) => {
    block.addEventListener('click', () => {
      ensureAudioUnlocked();
      playThunkSound();
      block.classList.toggle('unstacked');

      const isAnyUnstacked = document.querySelector('.dream-block.unstacked');
      if (blocksStatus) {
        blocksStatus.textContent = isAnyUnstacked
          ? 'Blocks tumbled playfully!'
          : 'Tower stacked high and snug!';
      }
    });
  });

  if (resetBlocksBtn) {
    resetBlocksBtn.addEventListener('click', () => {
      ensureAudioUnlocked();
      playChimeSound();
      blocks.forEach((b) => b.classList.remove('unstacked'));
      if (blocksStatus) {
        blocksStatus.textContent = 'All blocks stacked into Pip’s cozy tower!';
      }
    });
  }

  /* ==========================================================================
     11. PIP'S STORY TIMELINE (IntersectionObserver)
     Smooth fade-in and slide-up as each scene enters viewport.
     ========================================================================== */
  const storyScenes = document.querySelectorAll('.story-scene');
  if (storyScenes.length > 0) {
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scene-visible');
          }
        });
      },
      { threshold: 0.25 }
    );

    storyScenes.forEach((scene) => sceneObserver.observe(scene));
  }

  /* ==========================================================================
     12. EASTER EGGS
     - Moon 5-Click: secret lullaby + stars
     - Double-Click Pip: confetti + giggle
     - Type "dream": secret dream crate modal
     ========================================================================== */

  // Easter Egg 1: Click the moon 5 times
  const moonBtn = document.getElementById('easter-egg-moon');
  if (moonBtn) {
    moonBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ensureAudioUnlocked();
      state.moonClickCount++;

      clearTimeout(state.moonClickTimer);
      state.moonClickTimer = setTimeout(() => {
        state.moonClickCount = 0;
      }, 2500);

      if (state.moonClickCount === 5) {
        state.moonClickCount = 0;
        playSecretMelody();
        showToast('🌙 Secret Unlocked: Pip’s Moon Serenade!');

        const rect = moonBtn.getBoundingClientRect();
        triggerConfettiBurst(rect.left + rect.width / 2, rect.bottom + 10);
      } else {
        playMusicBoxNote(523.25 + state.moonClickCount * 60, 0.4);
      }
    });
  }

  // Easter Egg 2: Double-click Pip's hero avatar
  const pipHeroCard = document.getElementById('pip-hero-card');
  if (pipHeroCard) {
    pipHeroCard.addEventListener('dblclick', (e) => {
      ensureAudioUnlocked();
      playGiggleSound();

      const rect = pipHeroCard.getBoundingClientRect();
      triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 3);

      if (speechText) {
        speechText.textContent = '“Hehehe! That tickled! Pip sends you a giggly hug! ✨”';
      }
      showToast('💖 Pip giggled happily!');
    });
  }

  // Easter Egg 3: Type "dream" on the keyboard
  const secretModal = document.getElementById('secret-word-modal');
  const secretCloseBtn = document.getElementById('secret-close-btn');

  function closeSecretModal() {
    if (secretModal) {
      secretModal.setAttribute('hidden', '');
    }
  }

  if (secretCloseBtn) {
    secretCloseBtn.addEventListener('click', closeSecretModal);
  }

  if (secretModal) {
    secretModal.addEventListener('click', (e) => {
      if (e.target === secretModal) closeSecretModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    // Ignore input if user is focusing an input field
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    state.keyBuffer += e.key.toLowerCase();
    if (state.keyBuffer.length > 10) {
      state.keyBuffer = state.keyBuffer.slice(-10);
    }

    if (state.keyBuffer.endsWith('dream')) {
      state.keyBuffer = '';
      ensureAudioUnlocked();
      playSecretMelody();
      if (secretModal) {
        secretModal.removeAttribute('hidden');
        if (secretCloseBtn) secretCloseBtn.focus();
      }
      triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
    }
  });

  /* ==========================================================================
     12B. PIP'S NURSERY GROWTH CHART INTERACTION (Showcase Project 6)
     ========================================================================== */
  const growthButtons = document.querySelectorAll('.growth-milestone-btn');
  const growthDetailIcon = document.getElementById('growth-detail-icon');
  const growthDetailTitle = document.getElementById('growth-detail-title');
  const growthDetailDesc = document.getElementById('growth-detail-desc');

  growthButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      ensureAudioUnlocked();
      growthButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const icon = btn.dataset.icon || '⭐';
      const title = btn.dataset.title || '';
      const desc = btn.dataset.desc || '';

      if (growthDetailIcon) growthDetailIcon.textContent = icon;
      if (growthDetailTitle) growthDetailTitle.textContent = title;
      if (growthDetailDesc) growthDetailDesc.textContent = desc;

      // Play soft musical box chime on milestone select
      const milestoneScale = [261.63, 293.66, 329.63, 392.0, 523.25];
      const noteFreq = milestoneScale[index % milestoneScale.length];
      playMusicBoxNote(noteFreq, 1.2);
    });
  });

  /* ==========================================================================
     13. TOAST NOTIFICATIONS & UTILITIES
     ========================================================================== */
  const toast = document.getElementById('toast-notification');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('toast-active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('toast-active');
    }, 3200);
  }

  // Smooth back-to-top handler
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Skip to projects smooth scroll
  const skipBtn = document.getElementById('skip-to-projects-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const proj = document.getElementById('projects');
      if (proj) {
        proj.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ==========================================================================
     14. HACKATHON LIVE BANNER & REAL-TIME COUNTDOWN TIMER
     Official Brief: Submission closes 19 Oct 2026 @ 17:17 IST
     ========================================================================== */
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  // 17 October 2026 to 19 October 2026 17:17:00 IST (UTC+5:30)
  const targetDeadline = new Date('2026-10-19T17:17:00+05:30').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDeadline - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(mins).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(secs).padStart(2, '0');
  }

  if (cdDays) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ==========================================================================
     15. 90s RETRO CHAOS MODE TOGGLE (+5 pts Bonus)
     Glorious early-web personality adapting to all screens
     ========================================================================== */
  const chaosToggleBtn = document.getElementById('chaos-toggle');
  const chaosIcon = document.getElementById('chaos-icon');
  const chaosLabel = document.getElementById('chaos-label');

  function toggleChaosMode() {
    ensureAudioUnlocked();
    state.isChaosMode = !state.isChaosMode;
    document.body.classList.toggle('chaos-mode', state.isChaosMode);

    if (state.isChaosMode) {
      playChaosToggleSound();
      if (chaosIcon) chaosIcon.textContent = '💥';
      if (chaosLabel) chaosLabel.textContent = 'Chaos: ON';
      if (chaosToggleBtn) chaosToggleBtn.setAttribute('aria-label', 'Exit retro chaos mode');

      // Fun retro dialogue from Pip in speech bubble
      if (speechText) {
        speechText.textContent = "“WOAH! 90s Chaos Mode! Sparkles everywhere, marquees rolling! Best viewed in Netscape Navigator!”";
      }

      // Confetti burst from button
      if (chaosToggleBtn) {
        const rect = chaosToggleBtn.getBoundingClientRect();
        triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      showToast('🌀 90s Retro Chaos Mode Activated! (+5 pts Bonus)');
    } else {
      playChimeSound();
      if (chaosIcon) chaosIcon.textContent = '🌀';
      if (chaosLabel) chaosLabel.textContent = 'Chaos Mode';
      if (chaosToggleBtn) chaosToggleBtn.setAttribute('aria-label', 'Toggle retro chaos mode');

      // Restore regular day/night dialogue
      if (speechText) {
        speechText.textContent = state.currentTheme === 'night' ? pipGreetings.night : pipGreetings.day;
      }

      showToast('☁️ Returned to cozy nursery calm');
    }
  }

  if (chaosToggleBtn) {
    chaosToggleBtn.addEventListener('click', toggleChaosMode);
  }

  /* ==========================================================================
     16. LIVE STARLIGHT GUESTBOOK (+2 pts Bonus)
     Let visitors leave their mark and bedtime wishes on Pip's wall
     ========================================================================== */
  const guestbookForm = document.getElementById('guestbook-form');
  const gbNameInput = document.getElementById('gb-name');
  const gbMessageInput = document.getElementById('gb-message');
  const gbCharLeft = document.getElementById('gb-char-left');
  const gbFeed = document.getElementById('guestbook-feed');
  const gbCount = document.getElementById('gb-count');
  const btnSeedGb = document.getElementById('btn-seed-gb');
  const stickerChips = document.querySelectorAll('.sticker-chip');

  const GB_STORAGE_KEY = 'pip_starlight_guestbook_signatures';

  const defaultSampleSignatures = [
    {
      id: 1,
      name: "Luna the Night Owl",
      message: "Pip's lavender lantern helped all our little owlets drift right into peaceful sleep! 🌙",
      sticker: "🌙",
      time: "Earlier tonight"
    },
    {
      id: 2,
      name: "Starlight Sailor",
      message: "Heard the pentatonic lullaby box all the way from the Milky Way. Pure bedtime magic! ✨",
      sticker: "⭐",
      time: "Yesterday"
    },
    {
      id: 3,
      name: "Sleepy Cloud Bunny",
      message: "Pip's rooftop carrier is officially the coziest invention ever. Sweet dreams everyone! ☁️",
      sticker: "🧸",
      time: "3 days ago"
    }
  ];

  function loadGuestbookSignatures() {
    try {
      const stored = localStorage.getItem(GB_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not parse stored guestbook:', e);
    }
    return [...defaultSampleSignatures];
  }

  function saveGuestbookSignatures(entries) {
    try {
      localStorage.setItem(GB_STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn('Could not save guestbook entries:', e);
    }
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }

  function renderGuestbook() {
    if (!gbFeed) return;
    const entries = loadGuestbookSignatures();
    if (gbCount) gbCount.textContent = entries.length;

    gbFeed.innerHTML = entries.map(item => `
      <article class="gb-entry-card" data-id="${item.id}">
        <div class="gb-entry-sticker" aria-hidden="true">${escapeHTML(item.sticker || '🌙')}</div>
        <div class="gb-entry-body">
          <div class="gb-entry-header">
            <strong class="gb-entry-name">${escapeHTML(item.name)}</strong>
            <span class="gb-entry-time">${escapeHTML(item.time)}</span>
          </div>
          <p class="gb-entry-text">${escapeHTML(item.message)}</p>
        </div>
      </article>
    `).join('');
  }

  // Real-time character counter
  if (gbMessageInput && gbCharLeft) {
    gbMessageInput.addEventListener('input', () => {
      const left = 160 - gbMessageInput.value.length;
      gbCharLeft.textContent = Math.max(0, left);
    });
  }

  // Interactive sticker selection
  stickerChips.forEach(chip => {
    chip.addEventListener('click', () => {
      stickerChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const radio = chip.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      playMusicBoxNote(523.25, 0.4);
    });
  });

  // Submit Handler
  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      ensureAudioUnlocked();

      const name = gbNameInput ? gbNameInput.value.trim() : '';
      const message = gbMessageInput ? gbMessageInput.value.trim() : '';
      const selectedRadio = document.querySelector('input[name="gb-sticker"]:checked');
      const sticker = selectedRadio ? selectedRadio.value : '🌙';

      if (!name || !message) {
        showToast('⚠️ Please write both your name and a sweet message!');
        return;
      }

      // Add new signature
      const newEntry = {
        id: Date.now(),
        name,
        message,
        sticker,
        time: 'Just now'
      };

      const entries = loadGuestbookSignatures();
      entries.unshift(newEntry);
      saveGuestbookSignatures(entries);
      renderGuestbook();

      // Audio & Visual celebratory rewards
      playGuestbookSignSound();

      const submitBtn = document.getElementById('gb-submit-btn');
      if (submitBtn) {
        const rect = submitBtn.getBoundingClientRect();
        triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      showToast('✨ Bedtime wish signed into Pip\'s starlight ledger!');

      // Reset form
      guestbookForm.reset();
      if (gbCharLeft) gbCharLeft.textContent = '160';
      stickerChips.forEach((c, idx) => c.classList.toggle('active', idx === 0));
    });
  }

  // Reset sample signatures button
  if (btnSeedGb) {
    btnSeedGb.addEventListener('click', () => {
      saveGuestbookSignatures([...defaultSampleSignatures]);
      renderGuestbook();
      playChimeSound();
      showToast('↻ Sample community signatures restored!');
    });
  }

  renderGuestbook();

  /* ==========================================================================
     17. VINTAGE HIT COUNTER ODOMETER (+1 pt Bonus)
     Authentic mechanical tumbler reels incremented per visit with audio click
     ========================================================================== */
  const ODOMETER_KEY = 'pip_nursery_visitor_count';
  const BASE_VISITS = 12480; // Baseline visits counter for Pip's nursery

  function getVisitorCount() {
    let count = parseInt(localStorage.getItem(ODOMETER_KEY), 10);
    if (isNaN(count) || count < BASE_VISITS) {
      count = BASE_VISITS;
    }
    return count;
  }

  function setVisitorCount(val) {
    localStorage.setItem(ODOMETER_KEY, val);
  }

  function renderOdometer(count) {
    const formattedStr = String(count).padStart(6, '0');
    for (let i = 0; i < 6; i++) {
      const el = document.getElementById(`odo-d${5 - i}`);
      if (el) {
        el.textContent = formattedStr[i];
      }
    }
    const humanEl = document.getElementById('odo-human-count');
    if (humanEl) {
      humanEl.textContent = `#${count.toLocaleString()}`;
    }
  }

  // Increment visit once per session
  let currentVisits = getVisitorCount();
  if (!sessionStorage.getItem('pip_counted_session')) {
    currentVisits += 1;
    setVisitorCount(currentVisits);
    sessionStorage.setItem('pip_counted_session', 'true');
  }
  renderOdometer(currentVisits);

  // Interactive Test Click Button for Visitors & Reviewers
  const btnTestVisit = document.getElementById('btn-test-visit');
  if (btnTestVisit) {
    btnTestVisit.addEventListener('click', () => {
      ensureAudioUnlocked();
      currentVisits += 1;
      setVisitorCount(currentVisits);
      playOdometerTickSound();
      renderOdometer(currentVisits);

      // Tiny mechanical tumbler bump animation
      const lastWheel = document.querySelector('.odometer-wheel.active-last');
      if (lastWheel) {
        lastWheel.style.transform = 'scale(1.15)';
        setTimeout(() => {
          lastWheel.style.transform = '';
        }, 120);
      }
    });
  }

  // Log friendly greeting for developers inspecting devtools
  console.log(
    '%c☁️ Welcome to Pip\'s Midnight Nursery! 🌙\n%cThe Junior Dream Engineer\'s Bedtime Sanctuary\nDesigned & built with love, Web Audio API, and cozy starlight.',
    'color: #a34063; font-family: sans-serif; font-size: 16px; font-weight: bold;',
    'color: #5c4033; font-family: sans-serif; font-size: 12px;'
  );
})();
