// === Configuration ===
const allowedPhones = ['7655801366','7655808495','7652774397'];
const ADMIN_USER  = 'gameadmin';
const ADMIN_PASS  = '13241324Aa!';
const GUEST_PASS  = '132456';

// === Element References ===
const gate      = document.getElementById('gate');
const phoneIn   = document.getElementById('phoneInput');
const phoneBtn  = document.getElementById('phoneBtn');
const phoneMsg  = document.getElementById('phoneMsg');

const login     = document.getElementById('login');
const userSection = document.getElementById('userSection');
const passSection = document.getElementById('passSection');
const userIn    = document.getElementById('userInput');
const passIn    = document.getElementById('passInput');
const loginBtn  = document.getElementById('loginBtn');
const loginMsg  = document.getElementById('loginMsg');

const appDiv    = document.getElementById('app');
const canvas    = document.getElementById('gameCanvas');
const linkIn    = document.getElementById('linkInput');
const addBtn    = document.getElementById('addLinkBtn');
const list      = document.getElementById('linksList');

let currentPhone = '';

// 1) Phone Gate
phoneBtn.onclick = () => {
  const p = phoneIn.value.replace(/\D/g,'');
  if (allowedPhones.includes(p)) {
    currentPhone = p;
    gate.classList.add('hidden');
    login.classList.remove('hidden');
    if (p === '7655801366') {
      userSection.classList.remove('hidden');
    } else {
      userSection.classList.add('hidden');
    }
    passIn.value = '';
    loginMsg.textContent = '';
  } else {
    phoneMsg.textContent = 'Access Denied';
  }
};

// 2) Login
loginBtn.onclick = () => {
  if (currentPhone === '7655801366') {
    if (userIn.value === ADMIN_USER && passIn.value === ADMIN_PASS) success();
    else loginMsg.textContent = 'Invalid credentials';
  } else {
    if (passIn.value === GUEST_PASS) success();
    else loginMsg.textContent = 'Invalid guest password';
  }
};

function success() {
  login.classList.add('hidden');
  appDiv.classList.remove('hidden');
  drawGamePlaceholder();
  loadInitialLinks();
}

// 3) Link Manager
function loadInitialLinks() {
  fetch('links.json')
    .then(r => r.json())
    .then(baseLinks => {
      const stored = JSON.parse(localStorage.getItem('links') || '[]');
      renderLinks(baseLinks.concat(stored));
    })
    .catch(() => renderLinks(JSON.parse(localStorage.getItem('links')||'[]')));
}

function renderLinks(links) {
  list.innerHTML = '';
  links.forEach(url => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href   = url; a.textContent = url; a.target = '_blank';
    li.appendChild(a); list.appendChild(li);
  });
}

addBtn.onclick = () => {
  const url = linkIn.value.trim();
  if (!url) return;
  const stored = JSON.parse(localStorage.getItem('links') || '[]');
  stored.push(url);
  localStorage.setItem('links', JSON.stringify(stored));
  renderLinks(stored);
  linkIn.value = '';
};

// 4) Canvas
function drawGamePlaceholder() {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0f0';
  ctx.font = '20px monospace';
  ctx.fillText('Game goes here!', 100, 150);
}
