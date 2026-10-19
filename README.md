# 🌙 Pip's Midnight Nursery
> **Baby's First Website 2026 — Track 1 Entry**  
> *“I build the dreams you fall asleep inside.”*

Welcome to **Pip's Midnight Nursery**, a cozy, sleepy, and playful single-page website hosted and narrated by **Pip**, an adorable chibi skull baby who works as a **Junior Dream Engineer** floating high above the city in the clouds.

---

## ✨ Features & Architecture

### 1. ☁️ Tech Stack
- **Pure Vanilla Web**: Plain HTML5, CSS3, and vanilla JavaScript (no npm, no frameworks, zero build step).
- **Web Audio API Engine**: Generates all lullabies, chimes, rattle shakes, wooden thunks, and giggles mathematically with oscillators, custom audio buffers, and gain envelopes. No external `.mp3` or `.wav` files required.
- **Strict Audio Etiquette**: AudioContext is never initialized before the user's first click or tap.
- **Accessibility & Mobile-First**:
  - Touch-friendly tap targets (`>= 44px`).
  - Full keyboard accessibility with `:focus-visible` styling and ARIA attributes.
  - Full `prefers-reduced-motion` support: disables floating keyframes, cursor sparkle trails, and timeline transitions.

### 2. 🎨 Style & Theme System
- **Day Palette**: Cozy cream background (`#fff8f1`), berry pink accent (`#a34063`), cocoa text (`#5c4033`), pastel lilac, butter yellow, and baby pink.
- **Night Palette**: Deep plum/navy night sky (`#120e24`), soft cream text (`#fbf4e8`), and glowing starlight yellow (`#ffd166`).
- **Image Integration**:
  - In Day Mode: `mix-blend-mode: multiply` seamlessly blends the baked cream backgrounds of the assets.
  - In Night Mode: Illuminated storybook picture frames with gentle starlight ambient glows.
- **Typography**: Google Fonts — **Fredoka** for headings, **Nunito** for warm, readable body copy.

### 3. 🛠️ Interactive Dream Projects
1. **The Lullaby Lab**: A clickable vintage lullaby box that synthesizes a calming pentatonic lullaby sequence via Web Audio, complete with a smooth volume slider and floating musical notes.
2. **Nightlight Collection**: 4 lantern variations created from a single image using CSS filters (`hue-rotate`, `brightness`), with interactive hover glows and expandable modal dialogs.
3. **Dream Delivery Routes**: An illustrated SVG rooftop map with a glowing dashed flight path. Pip's cloud carrier flies across chimneys and rooftops, delivering dreams and incrementing the live delivery counter.
4. **Bonus — Rattle & Block Toys**: An interactive celestial rattle with realistic shaker sounds + shake physics, and 3 stackable dream blocks with satisfying wooden thunk audio.

### 4. 📖 Pip's Story & Interactive Touches
- **Interactive Eye Tracking**: Two glowing pupils in Pip's hero avatar gently follow your mouse cursor and touch movements.
- **Day/Night Expression Shift**: Toggling the theme changes Pip's live speech bubble dialogue.
- **Scroll-Triggered Timeline**: 4 chapters that softly fade in and slide up using an `IntersectionObserver`.
- **Fullscreen Bedtime Story Movie (`story.html`)**: Cinematic bedtime story mode with waking animations and lullaby music.

### 5. ⭐ Hackathon Side Quests Completed (+13 / +13 Bonus Points!)
1. **Live Guestbook (+2 pts)**: Visitors can sign Pip's wall with custom handles, bedtime wishes, and sticker badges (🌙, ⭐, 🧸, 🍼, ☁️, 🎀) stored in `localStorage`, accompanied by celestial confetti and harp chimes.
2. **Sparkle Cursor Trail (+2 pts)**: Canvas particle engine rendering pastel stardust drifting behind the cursor.
3. **Hit Counter Odometer (+1 pt)**: Vintage mechanical 6-digit tumbler odometer with 3D bevels, session counting, and an interactive `[+1 Click]` test button with mechanical sound.
4. **Click Sounds + Mute Switch (+3 pts)**: Mathematical Web Audio sound synthesis for every action, with an easy-to-spot Sound On / Mute toggle in the top bar.
5. **Responsive Chaos Mode (+5 pts)**: One-click header toggle activating authentic 90s early-web glory (scrolling marquee strip, comic/pixel typography, warning stripes, and retro wobble) fully responsive on mobile and desktop.

### 6. 🎁 Secret Easter Eggs & Early-Web Nostalgia
- **Click the Moon 5 Times**: Fast-click the sleepy crescent moon in the top navigation to trigger Pip's Secret Moon Serenade with starry confetti.
- **Double-Click Pip**: Double-click Pip's hero cloud avatar for a giggly sound effect and confetti celebration.
- **Type "dream"**: Type `d-r-e-a-m` anywhere on your keyboard to reveal a secret VIP celestial dream crate.
- **88x31 Vintage Web Badges**: Classic Netscape 4.0, 800x600, 100% Pure Vanilla Web, and haX.baby badges in the footer.
- **Live Submission Countdown**: Real-time ticker counting down to **19 October 2026 at 17:17 IST** with the **11,081 registrations milestone**.

---

## 🚀 How to Run Locally

You do **not** need Node, npm, or any build tools!

### Option 1: Just Open in Browser
Double-click `index.html` (or right-click → Open With → Chrome / Edge / Firefox / Safari).

### Option 2: Run a Local Static Server
If you prefer running via a local server:
```bash
# Using Python (built-in on most machines)
python -m http.server 8080

# Or using Node
npx serve .
```
Then visit: `http://localhost:8080` in your web browser.

---

## 🌐 How to Publish to GitHub Pages

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Pip's Midnight Nursery - Track 1 Baby's First Website 2026"
   ```

### 2. Live GitHub Deployment
- **Public GitHub Repository**: [github.com/amanSingh123119/babys-first-website](https://github.com/amanSingh123119/babys-first-website)
- **Live Demo (GitHub Pages)**: [amansingh123119.github.io/babys-first-website](https://amansingh123119.github.io/babys-first-website/)

### 3. How to Enable GitHub Pages (One-time Setup)
1. Go to [Repository Settings](https://github.com/amanSingh123119/babys-first-website/settings/pages).
2. Under **Build and deployment** > **Branch**, select `main` branch and `/ (root)` folder.
3. Click **Save**.
4. In ~60 seconds, your website will be live at:
   `https://amansingh123119.github.io/babys-first-website/`

---

## 📂 Project Directory Structure

```
├── index.html                   # Semantic, accessible HTML5 structure
├── style.css                    # Day/Night design tokens, layout & animations
├── script.js                    # Web Audio synthesis, eye tracking, interactions
├── assets/
│   ├── pip_avatar_cloud.png     # Hero section: Pip waving on a cloud
│   ├── pip_portrait.png         # About section: Close-up storybook portrait
│   ├── pip_lullaby_box.png      # Project 1: Vintage lullaby music box
│   └── pip_dream_lantern.png    # Project 2: Dream nightlight lantern
└── README.md                    # Project documentation & instructions
```

---

## 💖 Credits
- **Host & Narrator**: Pip, Junior Dream Engineer
- **Official Assets**: haX.baby
- **Fonts**: Fredoka & Nunito via Google Fonts
- **Built For**: Baby's First Website 2026 (Track 1)
