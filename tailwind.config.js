/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "racing-black": "#0D0D0D",
        "racing-dark": "#1A1A1A",
        "racing-red": "#E4002B",
        "racing-orange": "#FF6B35",
        "racing-text": "#F5F5F5",
      },
      fontFamily: {
        heading: ["Rajdhani", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "speed-lines": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(228, 0, 43, 0.55)" },
          "50%": { boxShadow: "0 0 0 12px rgba(228, 0, 43, 0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        "tron-sweep": {
          "0%": { left: "-10%", opacity: "0" },
          "5%": { opacity: "1" },
          "22%": { left: "100%", opacity: "1" },
          "26%, 100%": { left: "100%", opacity: "0" },
        },
        "tron-trail": {
          "0%": { transform: "scaleX(0)", opacity: "1" },
          "22%, 55%": { transform: "scaleX(1)", opacity: "1" },
          "75%, 100%": { transform: "scaleX(1)", opacity: "0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out both",
        "speed-lines": "speed-lines 1.8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        flicker: "flicker 3s ease-in-out infinite",
        "tron-sweep": "tron-sweep 7s ease-in-out infinite",
        "tron-trail": "tron-trail 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
