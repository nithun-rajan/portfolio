// Hero trace: a carrier with additive noise is drawn, then the clean signal
// fades in over it. Deterministic noise so the page looks the same each visit.
(function () {
  const scope = document.querySelector('.scope');
  if (!scope) return;
  const noisy = scope.querySelector('.trace-noisy');
  const clean = scope.querySelector('.trace-clean');

  const W = 1200, H = 220, MID = H / 2, N = 600;
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

  // A gently modulated carrier: amplitude swells towards the right.
  const signal = (t) => {
    const env = 0.35 + 0.65 * Math.sin(Math.PI * t * 0.9 + 0.2) ** 2;
    return env * (0.62 * Math.sin(2 * Math.PI * 4.2 * t) + 0.18 * Math.sin(2 * Math.PI * 11 * t + 0.7));
  };

  const path = (fn) => {
    let d = '';
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const y = MID - fn(t) * (H * 0.46);
      d += (i ? 'L' : 'M') + (t * W).toFixed(1) + ' ' + y.toFixed(1);
    }
    return d;
  };

  noisy.setAttribute('d', path((t) => signal(t) + 0.16 * gauss()));
  clean.setAttribute('d', path(signal));

  const len = noisy.getTotalLength();
  noisy.style.setProperty('--len', len);
  noisy.style.strokeDasharray = len;
  noisy.style.strokeDashoffset = len;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    noisy.style.strokeDashoffset = 0;
    return;
  }
  requestAnimationFrame(() => scope.classList.add('run'));
})();
