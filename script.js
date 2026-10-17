/* ───
   Project: Secret Birthday Gift
   Author: @saklin_01
─── */

/* ─── CLOCK DIAL TICKS & NUMERALS ─── */
(function initClockFace() {
  const tg = document.getElementById('clock-ticks');
  for (let i = 0; i < 60; i++) {
    const ang = (i * 6) * Math.PI / 180;
    const isMajor = (i % 5 === 0);
    const r1 = 126, r2 = isMajor ? 116 : 121;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 140 + r1 * Math.sin(ang));
    line.setAttribute('y1', 140 - r1 * Math.cos(ang));
    line.setAttribute('x2', 140 + r2 * Math.sin(ang));
    line.setAttribute('y2', 140 - r2 * Math.cos(ang));
    line.setAttribute('stroke-width', isMajor ? '1.8' : '0.8');
    line.setAttribute('opacity', isMajor ? '0.9' : '0.45');
    tg.appendChild(line);
  }

  const ng = document.getElementById('clock-numerals');
  const nums = ['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
  nums.forEach((num, idx) => {
    const ang = (idx * 30) * Math.PI / 180;
    const r = 100;
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', 140 + r * Math.sin(ang));
    t.setAttribute('y', 140 - r * Math.cos(ang));
    t.textContent = num;
    ng.appendChild(t);
  });
})();

/* ─── AUDIO MUTED (PER USER REQUEST) ─── */
function playTick() {}
function playKeyClick() {}
function playMidnightChime() {}

/* ─── INTIMATE CANDLELIGHT MOTES & ROSE PETALS ─── */
(function createBackground() {
  const bg = document.getElementById('bg-ambient');
  if (!bg) return;
  for (let i = 0; i < 16; i++) {
    const m = document.createElement('div');
    m.className = 'candle-mote';
    const msz = Math.random() * 5 + 3;
    m.style.cssText = `width:${msz}px;height:${msz}px;left:${Math.random()*100}%;bottom:${Math.random()*25}%;--md:${Math.random()*5+6}s;--mdelay:-${Math.random()*6}s;`;
    bg.appendChild(m);
  }
  const colors = ['#8a1528','#6b0f1d','#a82035','#4f0b15'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.cssText = `left:${Math.random()*105}%;width:${Math.random()*12+10}px;height:${Math.random()*14+12}px;background:${colors[Math.floor(Math.random()*colors.length)]};--pd:${Math.random()*4+5}s;--pdelay:-${Math.random()*7}s;`;
    bg.appendChild(p);
  }
})();

/* ─── SHINCHAN PASSCODE VERIFICATION (4 DIGITS) ─── */
let TARGET_PASSCODE = "2005"; // overwritten by a creator-generated link

const SHINCHAN_GIFS = {
  ask: "assets/shinchan-birthday.png",
  wrong: "assets/shinchan-wrong.png"
};

let enteredDigits = "";

function updateDateBoxes() {
  for (let i = 0; i < 4; i++) {
    const box = document.getElementById(`b${i}`);
    if (!box) continue;
    box.textContent = enteredDigits[i] || "";
    if (i === enteredDigits.length && enteredDigits.length < 4) {
      box.classList.add('active');
    } else {
      box.classList.remove('active');
    }
  }
}
updateDateBoxes();

function pressKey(num) {
  if (enteredDigits.length < 4) {
    enteredDigits += num;
    updateDateBoxes();
    if (enteredDigits.length === 4) {
      setTimeout(submitBirthdayDate, 220);
    }
  }
}

function deleteDigit() {
  if (enteredDigits.length > 0) {
    enteredDigits = enteredDigits.slice(0, -1);
    updateDateBoxes();
  }
}

function submitBirthdayDate() {
  const img = document.getElementById('shinchan-img');
  const txt = document.getElementById('quiz-text');
  const card = document.getElementById('quiz-card');
  const keypad = document.getElementById('keypad');
  const retryBtn = document.getElementById('retry-btn');

  if (enteredDigits.length < 4) {
    txt.textContent = "Please enter all 4 digits! ✨";
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    return;
  }

  if (enteredDigits === TARGET_PASSCODE) {
    // Correct Passcode (2005) - Directly transition to the Surprise Question Screen
    const danceGif = document.getElementById('dance-gif');
    if (danceGif) {
      danceGif.src = DANCE_GIF_URL;
    }
    const archText = document.getElementById('arch-text-path');
    if (archText) {
      archText.textContent = "I have made something for you";
    }
    const textEl = document.querySelector('.arched-text');
    if (textEl) {
      textEl.classList.remove('excited-mode');
    }
    // Animate curved title with Distinct Page 1 Wave In
    triggerTitleAnim('anim-wave-drop');

    const promptEl = document.getElementById('surprise-prompt');
    if (promptEl) {
      promptEl.style.display = 'block';
      promptEl.innerHTML = "Do you wanna see it ?";
      triggerElementAnim(promptEl, 'prompt-entrance-pop');
    }
    const danceWrap = document.querySelector('.dance-gif-wrap');
    if (danceWrap) {
      triggerElementAnim(danceWrap, 'gif-entrance-pop');
    }
    const btnGroup = document.querySelector('.surprise-btn-group');
    if (btnGroup) {
      btnGroup.innerHTML = `
        <button id="btn-yes" class="pill-btn yes-btn" onclick="handleChoice('yes')">
          <span class="btn-shine-tr"></span>
          <span class="btn-label">YES</span>
          <span class="btn-shine-bl"></span>
        </button>
        <button id="btn-no" class="pill-btn no-btn" onclick="handleChoice('no')">
          <span class="btn-shine-tr"></span>
          <span class="btn-label">NO</span>
          <span class="btn-shine-bl"></span>
        </button>
      `;
      triggerElementAnim(btnGroup, 'btn-entrance-bounce');
    }
    document.getElementById('quiz-screen').classList.remove('show');
    document.getElementById('quiz-screen').classList.add('hidden');
    const surpriseEl = document.getElementById('surprise-screen');
    if (surpriseEl) {
      surpriseEl.classList.remove('hidden-screen');
      surpriseEl.classList.add('show-screen');
    }
    launchConfetti();
  } else {
    // Wrong Passcode
    img.src = SHINCHAN_GIFS.wrong;
    txt.textContent = "Oops! Wrong Passcode! Try again, cutie! 🥺";
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    keypad.classList.add('hidden-btn');
    retryBtn.classList.remove('hidden-btn');
  }
}

function resetQuiz() {
  enteredDigits = "";
  updateDateBoxes();
  const img = document.getElementById('shinchan-img');
  const txt = document.getElementById('quiz-text');
  const keypad = document.getElementById('keypad');
  const retryBtn = document.getElementById('retry-btn');

  img.src = SHINCHAN_GIFS.ask;
  txt.textContent = "Enter the 4-digit secret passcode 💖";
  keypad.classList.remove('hidden-btn');
  retryBtn.classList.add('hidden-btn');
}

function triggerTitleAnim(animClass) {
  const svg = document.querySelector('.curved-title-svg');
  if (!svg) return;
  svg.classList.remove('anim-wave-drop', 'anim-excited-bounce');
  svg.style.animation = 'none';
  void svg.offsetWidth;
  svg.style.animation = '';
  svg.classList.add(animClass);
}

function triggerElementAnim(el, animClass) {
  if (!el) return;
  el.classList.remove(animClass);
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
  el.classList.add(animClass);
}

/* ─── SURPRISE CHOICE INTERACTION (YES / NO) ─── */
const DANCE_GIF_URL = "assets/shinchan-dance.gif";
const PLEADING_GIF_URL = "assets/shinchan-pleading.gif";
const EXCITED_GIF_URL = "assets/shinchan-excited.gif";

function handleChoice(choice) {
  const danceGif = document.getElementById('dance-gif');

  if (choice === 'no') {
    if (danceGif) {
      danceGif.src = PLEADING_GIF_URL;
    }
    const promptEl = document.getElementById('surprise-prompt');
    if (promptEl) {
      promptEl.innerHTML = "Are you sure? 🥺 Please say YES! 💖";
      triggerElementAnim(promptEl, 'prompt-entrance-pop');
    }
    const noBtn = document.getElementById('btn-no');
    if (noBtn) {
      noBtn.style.animation = 'none';
      void noBtn.offsetWidth;
      noBtn.style.animation = 'cardShake 0.4s ease';
    }
    return;
  }

  // When choice === 'yes' -> Show "Are you really excited?" screen with distinct animation
  const archText = document.getElementById('arch-text-path');
  if (archText) {
    archText.textContent = "Are you really excited?";
  }
  const textEl = document.querySelector('.arched-text');
  if (textEl) {
    textEl.classList.add('excited-mode');
  }
  // Trigger Distinct Energetic Pop & Spring Bounce for "Are you really excited?"
  triggerTitleAnim('anim-excited-bounce');

  if (danceGif) {
    danceGif.src = EXCITED_GIF_URL;
  }
  const danceWrap = document.querySelector('.dance-gif-wrap');
  if (danceWrap) {
    triggerElementAnim(danceWrap, 'gif-entrance-pop');
  }
  const promptEl = document.getElementById('surprise-prompt');
  if (promptEl) {
    promptEl.style.display = 'none';
  }
  const btnGroup = document.querySelector('.surprise-btn-group');
  if (btnGroup) {
    btnGroup.innerHTML = `
      <button class="pill-btn yes-btn" onclick="handleExcitedChoice()">
        <span class="btn-shine-tr"></span>
        <span class="btn-label">YES</span>
        <span class="btn-shine-bl"></span>
      </button>
      <button class="pill-btn yes-btn" onclick="handleExcitedChoice()">
        <span class="btn-shine-tr"></span>
        <span class="btn-label">YES</span>
        <span class="btn-shine-bl"></span>
      </button>
    `;
    triggerElementAnim(btnGroup, 'btn-entrance-bounce');
  }
}

function handleExcitedChoice() {
  launchConfetti();
  const surpriseEl = document.getElementById('surprise-screen');
  const giftEl = document.getElementById('gift-screen');

  setTimeout(() => {
    if (surpriseEl) {
      surpriseEl.classList.remove('show-screen');
      surpriseEl.classList.add('hidden-screen');
    }
    if (giftEl) {
      giftEl.classList.remove('hidden-screen');
      giftEl.classList.add('show-screen');
      launchConfetti();
    }
  }, 400);
}

/* ─── CLOTHESLINE HANGING MEMORIES GALLERY (MATCHING REFERENCE IMAGE 2) ─── */
function openMemoriesModal() {
  launchConfetti();
  const modal = document.getElementById('memories-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const container = document.getElementById('memories-board-container');
    if (container) {
      container.style.animation = 'none';
      void container.offsetWidth;
      container.style.animation = 'clotheslineDropIn 0.55s cubic-bezier(0.34, 1.35, 0.64, 1)';
    }
    const track = document.getElementById('clothesline-photos-track');
    if (track) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }
}

function closeMemoriesModal() {
  const modal = document.getElementById('memories-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function scrollClothesline(direction) {
  const track = document.getElementById('clothesline-photos-track');
  if (track) {
    const scrollAmount = 260 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

function focusHangingPhoto(el) {
  if (!el) return;
  launchConfetti();
  el.classList.add('active-sway');
  setTimeout(() => {
    el.classList.remove('active-sway');
  }, 1200);
}

/* ─── MAKE A WISH: BIRTHDAY CAKE (BOX 2) ─── */
let isWishMade = false;
let blownCandlesCount = 0;

function openCakeModal() {
  launchConfetti();
  resetCake();
  const modal = document.getElementById('cake-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeCakeModal() {
  const modal = document.getElementById('cake-modal');
  if (modal) modal.classList.add('hidden');
}

function blowCandle(num, e) {
  if (e) e.stopPropagation();
  const flame = document.getElementById(`flame-${num}`);
  if (flame && !flame.classList.contains('extinguished') && !isWishMade) {
    flame.classList.add('extinguished');
    blownCandlesCount = Math.min(7, blownCandlesCount + 1);
    if (blownCandlesCount === 7) setTimeout(makeCakeWish, 250);
  }
}

function makeCakeWish(e) {
  if (isWishMade) return;
  isWishMade = true;

  // Extinguish all 7 candles
  for (let i = 1; i <= 7; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.add('extinguished');
  }

  // Celebratory confetti burst
  launchConfetti();
  setTimeout(launchConfetti, 350);

  // Update top arched text to celebration
  const archText = document.getElementById('cake-arch-text');
  if (archText) archText.textContent = "HAPPY BIRTHDAY ! 🎉";

  // Hide hint and show celebration ribbon
  const hint = document.getElementById('cake-footer-hint');
  if (hint) hint.style.display = 'none';

  setTimeout(() => {
    const banner = document.getElementById('cake-wish-banner');
    if (banner) banner.classList.remove('hidden');
  }, 300);
}

function resetCake() {
  isWishMade = false;
  blownCandlesCount = 0;

  for (let i = 1; i <= 7; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.remove('extinguished');
  }

  const archText = document.getElementById('cake-arch-text');
  if (archText) archText.textContent = "MAKE A WISH";

  const hint = document.getElementById('cake-footer-hint');
  if (hint) hint.style.display = 'block';

  const banner = document.getElementById('cake-wish-banner');
  if (banner) banner.classList.add('hidden');
}

const MYSTERY_GIFTS = {
  1: {
    isMemories: true
  },
  2: {
    isCake: true
  },
  3: {
    icon: "👑",
    title: "Gift #3: Lifetime Happiness Pass",
    desc: "Unlimited hugs, endless laughter, and all your deepest birthday wishes coming true! 🎁💫💖"
  }
};

function openMysteryBox(boxNum) {
  if (boxNum === 1) {
    openMemoriesModal();
    return;
  }
  if (boxNum === 2) {
    openCakeModal();
    return;
  }
  if (boxNum === 3) {
    openLetterModal();
    return;
  }

  launchConfetti();
  const gift = MYSTERY_GIFTS[boxNum] || MYSTERY_GIFTS[3];
  
  const modal = document.getElementById('gift-modal');
  const iconEl = document.getElementById('gift-modal-icon');
  const titleEl = document.getElementById('gift-modal-title');
  const descEl = document.getElementById('gift-modal-desc');

  if (iconEl) iconEl.textContent = gift.icon;
  if (titleEl) titleEl.textContent = gift.title;
  if (descEl) descEl.textContent = gift.desc;

  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeGiftModal() {
  const modal = document.getElementById('gift-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

/* ─── SPECIAL BOX 3: LOVE & BIRTHDAY LETTER (TYPEWRITER ANIMATION) ─── */
const LETTER_SECTIONS = [
  {
    id: 'letter-headline-el',
    text: "Happy birthday to my favourite\nperson! ❤️"
  },
  {
    id: 'letter-p1-el',
    text: "I hope this year brings you everything you've been wishing for and so much more. Thank you for making my days happier, my bad days easier, and my life a little more beautiful just by being in it. 🥺💖"
  },
  {
    id: 'letter-p2-el',
    text: "I'm so lucky to have you, and I can't wait to make a million more memories with you. Here's to you, your dreams, and all the happiness you deserve."
  },
  {
    id: 'letter-closing-el',
    text: "Happy birthday, my love. I love you more than you know. 🫶🏻🎂❤️"
  }
];

let letterTypewriterTimer = null;
let isLetterTyping = false;

function renderLetterInstant() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = false;
  LETTER_SECTIONS.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (!el) return;
    el.innerHTML = sec.text.replace(/\n/g, '<br>');
  });
  const existingCursor = document.getElementById('letter-typing-cursor');
  if (existingCursor) existingCursor.remove();
}

function skipLetterTypewriter() {
  if (isLetterTyping) {
    renderLetterInstant();
  }
}

function startLetterTypewriter() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = true;

  // Clear target containers
  LETTER_SECTIONS.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (el) el.innerHTML = '';
  });

  // Create or reuse blinking neon cursor
  let cursorEl = document.getElementById('letter-typing-cursor');
  if (!cursorEl) {
    cursorEl = document.createElement('span');
    cursorEl.id = 'letter-typing-cursor';
    cursorEl.className = 'typewriter-cursor';
  }

  let secIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    if (!isLetterTyping) return;

    if (secIndex >= LETTER_SECTIONS.length) {
      isLetterTyping = false;
      setTimeout(() => {
        if (cursorEl && cursorEl.parentNode) {
          cursorEl.style.transition = 'opacity 0.6s ease';
          cursorEl.style.opacity = '0';
          setTimeout(() => cursorEl.remove(), 600);
        }
      }, 1600);
      return;
    }

    const currentSection = LETTER_SECTIONS[secIndex];
    const el = document.getElementById(currentSection.id);
    const chars = Array.from(currentSection.text);

    if (charIndex < chars.length) {
      const ch = chars[charIndex];
      charIndex++;

      if (el) {
        if (ch === '\n') {
          el.appendChild(document.createElement('br'));
        } else {
          el.appendChild(document.createTextNode(ch));
        }
        el.appendChild(cursorEl);
      }

      // Natural emotional cadence (pause at punctuation/emojis)
      const delay = (ch === '.' || ch === '!' || ch === '?' || ch === '💖') ? 110 : (ch === ',' ? 50 : 16);
      letterTypewriterTimer = setTimeout(typeNextChar, delay);
    } else {
      secIndex++;
      charIndex = 0;
      letterTypewriterTimer = setTimeout(typeNextChar, 140);
    }
  }

  // Brief pause after polaroid drop before typing begins
  letterTypewriterTimer = setTimeout(typeNextChar, 380);
}

function openLetterModal() {
  launchConfetti();
  const modal = document.getElementById('letter-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const card = modal.querySelector('.letter-card-container');
    if (card) {
      card.classList.remove('animate-letter');
      void card.offsetWidth;
      card.classList.add('animate-letter');
    }
    // Launch dynamic live typewriter typing
    startLetterTypewriter();
  }
}

function closeLetterModal() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = false;
  const modal = document.getElementById('letter-modal');
  if (modal) modal.classList.add('hidden');
}

function handleLetterOverlayClick(e) {
  if (e.target.id === 'letter-modal' || e.target.classList.contains('letter-bg-backdrop')) {
    closeLetterModal();
  }
}

// Physical Keyboard Listener
window.addEventListener('keydown', (e) => {
  const letterModal = document.getElementById('letter-modal');
  if (letterModal && !letterModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeLetterModal();
      return;
    }
  }

  const cakeModal = document.getElementById('cake-modal');
  if (cakeModal && !cakeModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeCakeModal();
      return;
    } else if (e.key === ' ' || e.key === 'Enter') {
      makeCakeWish();
      return;
    }
  }

  const memModal = document.getElementById('memories-modal');
  if (memModal && !memModal.classList.contains('hidden')) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      scrollClothesline(1);
      return;
    } else if (e.key === 'ArrowLeft') {
      scrollClothesline(-1);
      return;
    } else if (e.key === 'Escape') {
      closeMemoriesModal();
      return;
    }
  }

  if (!document.getElementById('quiz-screen').classList.contains('show')) return;
  if (e.key >= '0' && e.key <= '9') {
    pressKey(e.key);
  } else if (e.key === 'Backspace') {
    deleteDigit();
  } else if (e.key === 'Enter') {
    submitBirthdayDate();
  }
});

/* ─── STAGE COUNTDOWN CLOCK (5 SECONDS) ─── */
const hhEl = document.getElementById('hh');
const mmEl = document.getElementById('mm');
const ssEl = document.getElementById('ss');
const secHand = document.getElementById('second-hand');
const minHand = document.getElementById('minute-hand');
const hrHand = document.getElementById('hour-hand');

const pad = n => String(n).padStart(2, '0');
let countLeft = 5;
let countdownTimer = null;

function updateClock(h, m, s) {
  hhEl.textContent = pad(h);
  mmEl.textContent = pad(m);
  ssEl.textContent = pad(s);

  secHand.style.transform = `rotate(${s === 0 ? 360 : s * 6}deg)`;
  minHand.style.transform = `rotate(${(m + s / 60) * 6}deg)`;
  hrHand.style.transform  = `rotate(${((h % 12) + m / 60) * 30}deg)`;
}

function startCountdown() {
  countLeft = 5;
  updateClock(11, 59, 55);

  countdownTimer = setInterval(() => {
    countLeft--;
    if (countLeft > 0) {
      updateClock(11, 59, 60 - countLeft);
      playTick();
    } else {
      clearInterval(countdownTimer);
      updateClock(12, 0, 0);
      playMidnightChime();
      setTimeout(triggerMidnight, 700);
    }
  }, 1000);
}

/* ─── MIDNIGHT REVEAL ─── */
function triggerMidnight() {
  document.getElementById('midnight-burst').classList.add('flash');
  setTimeout(() => {
    document.getElementById('curtain-left').classList.add('open');
    document.getElementById('curtain-right').classList.add('open');
    document.getElementById('countdown-wrap').classList.add('hidden');
  }, 400);
  setTimeout(() => {
    document.getElementById('quiz-screen').classList.add('show');
  }, 1000);
}

/* ─── CONFETTI SYSTEM ─── */
function launchConfetti() {
  const colors = ['#ff6b9d','#ffd700','#ff4db8','#00bcd4','#69f0ae','#ff5722'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const sz = Math.random() * 10 + 7;
    c.style.cssText = `left:${Math.random()*100}%;top:-20px;width:${sz}px;height:${sz}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'3px'};--cf-d:${Math.random()*3+2}s;--cf-delay:${Math.random()*2}s;`;
    document.body.appendChild(c);
  }
}

/* ─── MOUSE TRAIL HEARTS ─── */
let lastTrail = 0;
document.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastTrail < 120 || !document.getElementById('curtain-left').classList.contains('open')) return;
  lastTrail = now;
  const em = ['💖','💗','💕','✨','🌸'];
  const h = document.createElement('div');
  h.className = 'trail-heart';
  h.textContent = em[Math.floor(Math.random() * em.length)];
  h.style.left = (e.clientX - 10) + 'px';
  h.style.top = (e.clientY - 10) + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 800);
});

/* ─── START ON LOAD ─── */
startCountdown();


/* ─── Birthday Surprise 2.0 portal controller ─── */
(function birthdaySurprisePortal() {
  const portal = document.getElementById('creator-portal');
  if (!portal) return;
  const form = document.getElementById('creator-form');
  const creatorGender = document.getElementById('creator-gender');
  const favGender = document.getElementById('fav-gender');
  const favLabel = document.getElementById('fav-name-label');
  const favName = document.getElementById('fav-name');
  const error = document.getElementById('portal-error');
  const list = document.getElementById('created-links');
  const totalOpens = document.getElementById('total-opens');
  const storageKey = 'birthday-surprise-2-links-v1';
  const safeRead = () => {
    try { const value = JSON.parse(localStorage.getItem(storageKey) || '[]'); return Array.isArray(value) ? value.slice(0,3) : []; }
    catch (_) { return []; }
  };
  const safeWrite = items => { try { localStorage.setItem(storageKey, JSON.stringify(items.slice(0,3))); } catch (_) {} };
  const getPayload = () => {
    try {
      const raw = new URLSearchParams(location.hash.slice(1)).get('gift');
      if (!raw) return null;
      const base64 = raw.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(decodeURIComponent(escape(atob(base64))));
      if (!payload || payload.v !== 2 || !payload.id || !payload.passKey) return null;
      return payload;
    } catch (_) { return null; }
  };
  const payload = getPayload();
  const recipientMode = Boolean(payload);
  const hideOriginalApp = () => {
    ['bg-ambient','quiz-screen','surprise-screen','gift-screen'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.style.display = 'none'; el.classList.add('hidden-screen'); }
    });
    document.querySelectorAll('.curtain-overlay, #countdown-screen, #intro-screen').forEach(el => { el.style.display = 'none'; });
  };
  const showRecipientGate = () => {
    // Use the original game's passcode screen as the recipient gate.
    TARGET_PASSCODE = String(payload.passKey);
    portal.classList.add('portal-hidden');
    const quiz = document.getElementById('quiz-screen');
    if (quiz) {
      quiz.style.display = '';
      quiz.classList.remove('hidden', 'hidden-screen');
      quiz.classList.add('show');
    }
    const ambient = document.getElementById('bg-ambient');
    if (ambient) ambient.style.display = '';
    const title = document.getElementById('quiz-title');
    const txt = document.getElementById('quiz-text');
    if (title) title.textContent = 'A surprise from ' + (payload.creatorName || 'someone special');
    if (txt) txt.textContent = 'Enter the 4-digit pass key to unlock 💖';
    if (typeof window.resetQuiz === 'function') window.resetQuiz();
    if (title && payload.favName) title.setAttribute('aria-label', 'Surprise for ' + payload.favName);
  };
  const updateFavLabel = () => {
    const gender = creatorGender.value;
    const text = gender === 'male' ? 'Enter her name' : gender === 'female' ? 'Enter his name' : 'Your favourite person’s name';
    favLabel.firstChild.textContent = text + ' ';
    favName.placeholder = text;
  };
  const renderLinks = () => {
    const items = safeRead();
    document.getElementById('link-limit').textContent = items.length + ' / 3';
    totalOpens.textContent = 'Needs analytics setup';
    if (!items.length) {
      list.innerHTML = '<p class="portal-muted">Your created links will appear here.</p>';
      return;
    }
    list.innerHTML = '';
    items.forEach(item => {
      const row = document.createElement('article');
      row.className = 'created-link';
      const info = document.createElement('div');
      info.className = 'created-link-info';
      const name = document.createElement('strong');
      name.textContent = item.favName || 'Surprise link';
      const gender = document.createElement('span');
      gender.textContent = 'Favourite person: ' + (item.favGender || 'not specified');
      const url = document.createElement('input');
      url.readOnly = true; url.value = item.url; url.setAttribute('aria-label','Created surprise URL');
      info.append(name, gender, url);
      const actions = document.createElement('div');
      actions.className = 'created-link-actions';
      const copy = document.createElement('button');
      copy.type = 'button'; copy.textContent = 'Copy';
      copy.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(item.url); copy.textContent = 'Copied ✓'; }
        catch (_) { url.select(); try { document.execCommand('copy'); copy.textContent = 'Copied ✓'; } catch (e) { copy.textContent = 'Select link'; } }
        setTimeout(() => { copy.textContent = 'Copy'; }, 1600);
      });
      const remove = document.createElement('button');
      remove.type = 'button'; remove.textContent = 'Delete'; remove.className = 'portal-delete';
      remove.addEventListener('click', () => {
        safeWrite(safeRead().filter(link => link.id !== item.id));
        renderLinks();
      });
      actions.append(copy, remove);
      row.append(info, actions);
      list.appendChild(row);
    });
  };
  if (recipientMode) {
    hideOriginalApp();
    showRecipientGate();
    return;
  }
  hideOriginalApp();
  portal.classList.remove('portal-hidden');
  creatorGender.addEventListener('change', updateFavLabel);
  updateFavLabel();
  form.addEventListener('submit', event => {
    event.preventDefault();
    error.textContent = '';
    const items = safeRead();
    if (items.length >= 3) { error.textContent = 'You can create up to 3 links. Delete one first.'; return; }
    const name = document.getElementById('creator-name').value.trim();
    const target = favName.value.trim();
    const passKey = document.getElementById('creator-passkey').value.trim();
    if (!name || !target || !/^\\d{4}$/.test(passKey)) { error.textContent = 'Please fill every field. Pass key must be exactly 4 digits (0–9).'; return; }
    const id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    const data = { v:2, id, creatorGender:creatorGender.value, favGender:favGender.value, creatorName:name, favName:target, passKey };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data)))).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
    const url = location.origin + location.pathname + '#gift=' + encoded;
    items.push({ id, creatorName:name, favName:target, favGender:favGender.value, url, createdAt:Date.now() });
    safeWrite(items);
    renderLinks();
    error.textContent = 'Link created! Copy it below and send it to your favourite person 💗';
    document.getElementById('creator-passkey').value = '';
  });
  renderLinks();
})();
