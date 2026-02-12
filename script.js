// Day → night transition: update --scroll-progress and --header-bg from scroll position
function updateScrollTheme() {
  const scrollY = window.scrollY;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

  document.documentElement.style.setProperty('--scroll-progress', String(progress));

  // Interpolate header background: day (warm paper) → night (dark glass)
  const dayBg = [251, 246, 239, 0.92];
  const nightBg = [26, 35, 50, 0.85];
  const r = Math.round(dayBg[0] + (nightBg[0] - dayBg[0]) * progress);
  const g = Math.round(dayBg[1] + (nightBg[1] - dayBg[1]) * progress);
  const b = Math.round(dayBg[2] + (nightBg[2] - dayBg[2]) * progress);
  const a = dayBg[3] + (nightBg[3] - dayBg[3]) * progress;
  document.documentElement.style.setProperty('--header-bg', "rgba(" + r + "," + g + "," + b + "," + a + ")");
}

// Scroll and resize
window.addEventListener('scroll', updateScrollTheme, { passive: true });
window.addEventListener('resize', updateScrollTheme);
document.addEventListener('DOMContentLoaded', function () {
  updateScrollTheme();

  // Card reveal (Ghibli-style)
  const cards = document.querySelectorAll('.timeline-card, .edu-card, .cert-badge');
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
  );

  cards.forEach(function (card) {
    card.classList.add('reveal');
    observer.observe(card);
  });
});
