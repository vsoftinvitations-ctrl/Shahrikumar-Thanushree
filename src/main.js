import './style.css';
import { renderPreloader, initPreloader } from './components/Preloader.js';
import { initRosePetals } from './components/RosePetals.js';
import { renderCountdown, initCountdown } from './components/Countdown.js';
import { initScrollHint } from './components/ScrollHint.js';
import { W, PHOTOS } from './data.js';

const app = document.getElementById('app');

function coupleCard(person) {
  return `<div class="r couple-card">
    <h3 class="couple-name">${person.name}</h3>
    <div class="couple-rule line-x"></div>
    <p class="couple-sentence"><span class="relation-tag">${person.relation}</span> ${person.father} &amp; ${person.mother}</p>
  </div>`;
}

if (app) {
  const orn = '<svg class="orn r" viewBox="0 0 150 18" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M0 9h55M95 9h55"/><circle cx="75" cy="9" r="4"/><circle cx="65" cy="9" r="2.5"/><circle cx="85" cy="9" r="2.5"/></svg>';
  const pin = '<svg class="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
  const D = W.date;

  // 1. Put the preloader at the top of #app:
  app.innerHTML = `
    ${renderPreloader({
      name1: W.groom,
      name2: W.bride,
      date: "30 . NOVEMBER . 2026"
    })}
    <canvas id="rose-petals-canvas" aria-hidden="true"></canvas>

    <section id="intro">
      <div class="cover r">
        <img src="${PHOTOS.a}" alt="${W.short}" decoding="async">
      </div>
      <div class="wrap">
        <p class="label r">Together with their families</p>
        <div class="event-date-badge r" style="margin-bottom:24px">
          Invitation From: ${W.invitationFrom}
        </div>
        <h2 class="intro-names r" aria-label="${W.groom} & ${W.bride}">
          <div class="script-line script-groom">
            <span class="script-text">${W.groom}</span>
            <span class="calligraphy-spark" aria-hidden="true"></span>
          </div>
          <div class="script-line script-amp" aria-hidden="true">
            <span class="amp">&amp;</span>
          </div>
          <div class="script-line script-bride">
            <span class="script-text">${W.bride}</span>
            <span class="calligraphy-spark" aria-hidden="true"></span>
          </div>
          <div class="flourish-wrap" aria-hidden="true">
            <svg class="calligraphy-flourish" viewBox="0 0 280 26" fill="none" preserveAspectRatio="none">
              <path class="flourish-path" d="M14,14 C65,4 105,6 140,16 C175,24 215,10 266,8" stroke="url(#goldFlourishGrad)" stroke-width="2.2" stroke-linecap="round" />
              <defs>
                <linearGradient id="goldFlourishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(220, 201, 160, 0.2)" />
                  <stop offset="35%" stop-color="rgba(184, 152, 90, 0.95)" />
                  <stop offset="70%" stop-color="rgba(218, 165, 32, 0.95)" />
                  <stop offset="100%" stop-color="rgba(220, 201, 160, 0.2)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </h2>
        ${orn}
        <p class="quote r">“${W.quotes[0]}”</p>
      </div>
    </section>

    <section class="alt"><div class="wrap">
      <p class="label r">The Wedding Celebration</p>
      <div class="daynum r">${D.num}</div>
      <div class="month r">${D.month.toUpperCase()}</div>
      <div class="day r" style="margin-top:10px">${D.day}</div>
      <div class="rule line-x r"></div>
      <div class="time r">Muhurtham: ${W.ceremony.muhurtham}</div>
      ${renderCountdown()}
    </div></section>

    <section><div class="wrap">
      <p class="label r">Wedding Ceremony &amp; Muhurtham</p>
      <div class="r">${pin}</div>
      <h2 class="big r">${W.ceremony.venue}</h2>
      <div class="event-date-badge r">${D.day} &bull; ${D.full}</div>
      <div class="time r" style="margin-top:14px;font-size:clamp(1.2rem,4vw,1.55rem);color:var(--gold);font-family:var(--serif)">
        Muhurtham: ${W.ceremony.muhurtham}
      </div>
      <p class="small r" style="margin-top:12px;font-size:1.05rem;line-height:1.7;color:var(--mute)">
        ${W.ceremony.address}
      </p>
      <div style="margin-top:14px" class="r">
        <p style="font-size:0.98rem;color:var(--ink);max-width:440px;margin:0 auto;line-height:1.6;font-style:italic">
          ${W.ceremony.additional}
        </p>
      </div>
      <div style="margin-top:28px" class="r">
        <a class="btn" href="${W.ceremony.map}" target="_blank" rel="noopener noreferrer">View Location on Google Maps</a>
      </div>
    </div></section>

    <section class="alt"><div class="wrap">
      ${orn}
      <p class="label r" style="margin-top:16px;margin-bottom:14px">Cordially Inviting You</p>
      <p class="body r" style="font-size:clamp(1.1rem,3.4vw,1.3rem);line-height:1.8;color:var(--ink)">
        ${W.specialMessage}
      </p>
      <p class="serif r" style="margin-top:20px;font-size:1.25rem;color:var(--gold)">
        — ${W.invitationFrom} —
      </p>
      ${orn}
    </div></section>

    <section><div class="wrap" style="max-width:900px">
      <p class="label r">The Couple</p>
      <div class="fam">
        ${coupleCard(W.couple.groom)}
        <div class="sep line-x"></div>
        ${coupleCard(W.couple.bride)}
      </div>
    </div></section>

    <section class="alt" id="rsvp-section"><div class="wrap">
      <p class="label r">RSVP &amp; Contact</p>
      <h2 class="serif r" style="font-size:clamp(1.8rem,5vw,2.3rem);color:var(--ink);margin-bottom:12px">We Look Forward to Celebrating With You</h2>
      <p class="small r" style="color:var(--mute);margin-bottom:24px;font-size:1.05rem;line-height:1.6">
        Kindly RSVP or contact us for any assistance or blessings:
      </p>
      <div class="rsvp-actions r" style="display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:12px">
        <a class="btn" href="${W.rsvp.callUrl}">
          <svg style="width:14px;height:14px;vertical-align:-2px;margin-right:8px;fill:currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>Call: ${W.rsvp.phone}
        </a>
        <a class="btn" href="${W.rsvp.whatsappUrl}" target="_blank" rel="noopener noreferrer" style="border-color:#25D366;color:#128C7E">
          <svg style="width:14px;height:14px;vertical-align:-2px;margin-right:8px;fill:currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24z"/></svg>WhatsApp Us
        </a>
      </div>
    </div></section>

    <section style="background:linear-gradient(180deg,var(--ivory),var(--blush) 55%,var(--ivory))"><div class="wrap">
      <div class="rule line-x r" style="margin-top:0"></div>
      <p class="quote r">“${W.quotes[1]}”</p>
      <div class="rule line-x r"></div>
    </div></section>

    <section><div class="wrap" style="max-width:560px">
      <div class="gal">
        <div class="ph ga r"><img src="${PHOTOS.a}" alt="${W.short}" loading="lazy" decoding="async"></div>
        <div class="ph gb r"><img src="${PHOTOS.b}" alt="${W.short}" loading="lazy" decoding="async"></div>
      </div>
    </div></section>

    <section style="padding-block:clamp(100px,22vw,200px)"><div class="wrap">
      <h2 class="names r" style="font-size:clamp(2.2rem,9vw,3.4rem)">${W.short}</h2>
      <p class="serif r" style="font-size:1.4rem;letter-spacing:.2em;margin-top:24px">${D.dots}</p>
      <div class="rule line-x r"></div>
      <p class="quote r">Together, forever begins here.</p>
      <p class="small r" style="margin-top:28px">With love and blessings</p>
      ${orn}
    </div></section>
  `;

  const fmono = document.getElementById('fmono');
  if (fmono) fmono.textContent = W.footMono;
  const fdate = document.getElementById('fdate');
  if (fdate) fdate.textContent = D.dotted;

  // Scroll reveal
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });

  // 2. Initialize it:
  initPreloader(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.r').forEach(el => io.observe(el));
      const inames = document.querySelector('.intro-names');
      if (inames) inames.classList.add('in');
      setTimeout(() => {
        initRosePetals();
      }, 250);
      // Once the invitation is fully open, show the small subtle scroll down indicator
      setTimeout(() => {
        initScrollHint();
      }, 950);
    });
  });

  // 3. Initialize countdown timer
  initCountdown();
}
