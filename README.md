# 🎁 Secret Birthday Gift

> An interactive, beautifully animated Shinchan-themed birthday surprise web application designed with pure HTML, CSS, and Vanilla JavaScript.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Overview

**Secret Birthday Gift** is a heartfelt digital birthday experience built to create an unforgettable midnight surprise. It takes the viewer through an interactive journey featuring theatrical stage curtains, a Shinchan-style secret lockscreen, playful teaser interactions, and three unlocked mystery gifts.

Everything runs smoothly on desktop, tablet, and mobile browsers with zero external frameworks or heavy dependencies.

---

## 🌟 Interactive Journey & Features

### 1. 🕛 The Midnight Countdown & Grand Reveal
* **Analog & Digital Stage Clock**: Accurate ticking clock face counting down the final 5 seconds to midnight (12:00:00 AM).
* **Theatrical Velvet Curtains**: Split-opening red velvet stage curtains with light burst effects revealing the secret verification screen.
* **Warm Ambient Effects**: Floating golden candlelight motes, falling rose petals, and interactive cursor sparkle hearts.

### 2. 🔐 Shinchan Secret Passcode Screen
* **Cameo Portrait**: Cameo frame starring Shinchan.
* **4-Digit Secret PIN Entry**: Interactive circular phone-style dial pad and full physical keyboard support.
* **Playful Error Handling**: Custom Shinchan reaction expressions with gentle card shake animations for incorrect passcodes.

### 3. 💖 Interactive Teaser Transition
* **Dynamic Curved SVG Typography**: Fluid arched headers that react and bounce.
* **Shinchan Reactions**: Dynamic dancing GIFs that change if the user hesitates between "YES" and "NO".

### 4. 🎁 3 Floating Mystery Gift Boxes
Once unlocked, users are greeted by three floating neon-accented heart gift boxes:

* **📸 Box 1: Hanging Polaroid Clothesline Gallery**
  * Aesthetic wooden clothesline with mini wooden clothespins.
  * Real photo frames with gentle sway physics when clicked or tapped.
  * Smooth horizontal scroll controls (buttons and left/right keyboard arrows).

* **🎂 Box 2: Interactive Birthday Cake & Make A Wish**
  * Hand-crafted 2-tier pastel birthday cake topped with 7 flickering candle flames.
  * Click/tap each candle to blow it out individually, or press `Space`/`Enter` to extinguish all at once.
  * Triggers a celebratory confetti explosion and reveals a birthday banner.

* **💌 Box 3: 3D Perspective Polaroid & Live Typewriter Letter**
  * 3D tilted Polaroid photo adorned with an ornate purple ribbon bow.
  * Real-time emotional typewriter animation typing out the heartfelt birthday message line-by-line.
  * Click-to-reveal instant skip option for quick reading.

---

## 🛠️ Tech Stack

* **HTML5**: Semantic tags, SVG vector illustrations, and responsive layout containers.
* **CSS3**: Custom keyframe animations, glassmorphism, flexbox/grid architecture, responsive media queries, and vintage gingham patterns.
* **Vanilla JavaScript (ES6+)**: Event listeners, dynamic DOM manipulation, math-based particle systems, and keyboard navigation.

---

## 📂 Project Structure

```text
secret-birthday-gift/
│
├── assets/                       # Image assets and animated GIFs
│   ├── memory1.jpg               # Polaroid memory photo 1
│   ├── memory2.jpg               # Polaroid memory photo 2
│   ├── memory3.jpg               # Polaroid memory photo 3
│   ├── memory4.jpg               # Polaroid memory photo 4
│   ├── memory5.jpg               # Polaroid memory photo 5
│   ├── shinchan-birthday.png     # Cameo lockscreen mascot
│   ├── shinchan-dance.gif        # Dancing Shinchan celebration
│   ├── shinchan-excited.gif      # Excited reaction GIF
│   ├── shinchan-gift.gif         # Gift box mascot
│   ├── shinchan-pleading.gif     # Pleading Shinchan when 'No' is clicked
│   └── shinchan-wrong.png        # Wrong passcode reaction
│
├── index.html                    # Main HTML application markup
├── style.css                     # Complete design system & custom animations
├── script.js                     # Interaction logic, animations & state handling
└── README.md                     # Documentation
```

---

## 🚀 Getting Started

No build tools or installation needed!

### Running Locally
1. Clone or download this repository:
   ```bash
   git clone https://github.com/saklincodes/secret-birthday-gift.git
   ```
2. Navigate into the project folder:
   ```bash
   cd secret-birthday-gift
   ```
3. Open `index.html` directly in your favorite web browser (Chrome, Edge, Firefox, Safari).
   * Or use VS Code's **Live Server** extension for the best local development experience.

---

## ⚙️ How to Personalize for Someone Special

You can easily adapt this project for your loved one:

### 1. Change the 4-Digit Passcode
Open `script.js` and edit line 57:
```javascript
const TARGET_PASSCODE = "2005"; // Set your desired 4-digit code (e.g. birth year or date)
```

### 2. Replace Memory Photos
Replace the files inside `assets/` with your own photos, keeping the same file names:
* `assets/memory1.jpg` to `assets/memory5.jpg`

### 3. Edit the Birthday Letter Text
Open `script.js` and customize the `LETTER_SECTIONS` array:
```javascript
const LETTER_SECTIONS = [
  {
    id: 'letter-headline-el',
    text: "Happy birthday to my favourite\nperson! ❤️"
  },
  {
    id: 'letter-p1-el',
    text: "Your custom sweet message here..."
  },
  ...
];
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `0` - `9` | Type passcode on the lockscreen |
| `Backspace` | Delete last entered passcode digit |
| `Enter` | Submit passcode / Extinguish all cake candles |
| `Space` | Extinguish cake candles / Scroll memories right |
| `←` / `→` | Scroll through hanging memory polaroids |
| `Escape` | Close any open modal |

---

## 💖 Contributing & Feedback

Feel free to fork this repository, add your own twists, or submit issues and pull requests to improve the experience.

---

## 👨‍💻 Author

Created with 💖 by **[@saklincodes](https://github.com/saklincodes)**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use and customize it to make someone smile on their special day!