(() => {
  'use strict';
  const more = document.querySelector('#game-more');
  const extra = document.querySelector('#more-games');
  const en = document.documentElement.lang === 'en';
  more.addEventListener('click', () => {
    const open = more.getAttribute('aria-expanded') !== 'true';
    extra.hidden = !open;
    more.setAttribute('aria-expanded', String(open));
    more.textContent = open ? (en ? 'Show fewer games −' : '收合更多遊戲 −') : (en ? 'Want more? Explore more games ＋' : '想看更多，點開會展開 ＋');
  });
  const modal = document.querySelector('#game-preview');
  let selected = null;
  document.querySelectorAll('[data-game-preview]').forEach(button => button.addEventListener('click', () => {
    selected = button;
    const picture = document.querySelector('#game-preview-image');
    picture.src = button.querySelector('img').getAttribute('src');
    picture.alt = button.dataset.title;
    document.querySelector('#game-preview-title').textContent = button.dataset.title;
    document.querySelector('#game-preview-description').textContent = button.dataset.description;
    document.querySelector('#game-preview-use').textContent = button.dataset.use;
    modal.showModal();
    document.body.classList.add('dialog-open');
  }));
  document.querySelector('#game-preview-close').addEventListener('click', () => modal.close());
  modal.addEventListener('close', () => {document.body.classList.remove('dialog-open');selected?.focus({preventScroll:true});});
  modal.addEventListener('click', e => {if(e.target!==modal)return;const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();});
  document.querySelector('#game-preview-interest').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('proposal-interest', {detail:{note:selected.dataset.title}}));
    modal.close();
    document.querySelector('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    document.querySelector('#proposal-form [data-step]:not([hidden]) legend')?.focus({preventScroll:true});
  });
})();
