lucide.createIcons();

const modal = document.querySelector('#postModal');
const newPostButton = document.querySelector('#newPostButton');
const closeButtons = document.querySelectorAll('.close-modal');
const publishButton = document.querySelector('#publishButton');
const toast = document.querySelector('#toast');
const uploadZone = document.querySelector('#uploadZone');
const fileInput = document.querySelector('#fileInput');
const chooseFile = document.querySelector('#chooseFile');
const studioModal = document.querySelector('#studioModal');
const boostModal = document.querySelector('#boostModal');

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function togglePanel(panel, isOpen) {
  panel.classList.toggle('open', isOpen);
  panel.setAttribute('aria-hidden', String(!isOpen));
}

function showToast(message) {
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3600);
}

newPostButton.addEventListener('click', openModal);
closeButtons.forEach((button) => button.addEventListener('click', closeModal));
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
  if (event.key === 'Escape') {
    togglePanel(studioModal, false);
    togglePanel(boostModal, false);
  }
});

publishButton.addEventListener('click', () => {
  closeModal();
  showToast('Publication programmée sur vos 3 réseaux.');
});

chooseFile.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  if (fileInput.files.length) {
    uploadZone.querySelector('strong').textContent = fileInput.files[0].name;
    uploadZone.querySelector('span').textContent = 'Vidéo prête à être retouchée';
  }
});

['dragenter', 'dragover'].forEach((eventName) => {
  uploadZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    uploadZone.classList.add('dragging');
  });
});
['dragleave', 'drop'].forEach((eventName) => {
  uploadZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    uploadZone.classList.remove('dragging');
  });
});
uploadZone.addEventListener('drop', (event) => {
  const [file] = event.dataTransfer.files;
  if (file && file.type.startsWith('video/')) {
    uploadZone.querySelector('strong').textContent = file.name;
    uploadZone.querySelector('span').textContent = 'Vidéo prête à être retouchée';
  }
});

document.querySelectorAll('.platform-option').forEach((option) => {
  option.addEventListener('click', () => option.classList.toggle('selected'));
});

document.querySelector('#boostButton').addEventListener('click', () => {
  togglePanel(boostModal, true);
});

document.querySelectorAll('.close-studio').forEach((button) => button.addEventListener('click', () => togglePanel(studioModal, false)));
document.querySelectorAll('.close-boost').forEach((button) => button.addEventListener('click', () => togglePanel(boostModal, false)));
[studioModal, boostModal].forEach((panel) => panel.addEventListener('click', (event) => {
  if (event.target === panel) togglePanel(panel, false);
}));

document.querySelectorAll('.nav-item').forEach((item) => {
  if (item.getAttribute('href') === '#retouche') item.addEventListener('click', (event) => {
    event.preventDefault();
    togglePanel(studioModal, true);
  });
  if (item.getAttribute('href') === '#boost') item.addEventListener('click', (event) => {
    event.preventDefault();
    togglePanel(boostModal, true);
  });
});

document.querySelectorAll('.edit-tool').forEach((tool) => tool.addEventListener('click', () => {
  document.querySelectorAll('.edit-tool').forEach((item) => item.classList.remove('active'));
  tool.classList.add('active');
  const settings = {
    couleurs: ['Intensité', 'Ajustez la lumière et les couleurs'],
    recadrage: ['Zoom', 'Cadrez votre vidéo pour chaque réseau'],
    texte: ['Taille du texte', 'Ajoutez un message lisible et rythmé'],
    son: ['Volume', 'Équilibrez la musique et la voix']
  };
  const [title, hint] = settings[tool.dataset.edit];
  document.querySelector('#editSettingTitle').textContent = title;
  document.querySelector('#editSettingHint').textContent = hint;
}));

document.querySelector('#editRange').addEventListener('input', (event) => {
  document.querySelector('#editValue').textContent = `${event.target.value}%`;
});
document.querySelector('#saveEditButton').addEventListener('click', () => {
  togglePanel(studioModal, false);
  showToast('Retouches appliquées. Votre vidéo est prête à publier.');
});

document.querySelector('#budgetRange').addEventListener('input', (event) => {
  const budget = Number(event.target.value);
  document.querySelector('#budgetValue').textContent = `${budget} € / jour`;
  const low = Math.round(budget * 690);
  const high = Math.round(budget * 1590);
  document.querySelector('#reachEstimate').textContent = `${(low / 1000).toFixed(1).replace('.', ',')}K – ${(high / 1000).toFixed(1).replace('.', ',')}K`;
});
document.querySelector('#launchBoostButton').addEventListener('click', () => {
  togglePanel(boostModal, false);
  showToast('Campagne Boost lancée. Votre contenu est en cours de validation.');
});

document.querySelector('#calendarButton').addEventListener('click', () => {
  showToast('Calendrier synchronisé avec vos prochaines publications.');
});
document.querySelector('#viewCalendarButton').addEventListener('click', () => {
  document.querySelector('#calendrier').scrollIntoView({ behavior: 'smooth' });
  showToast('Votre calendrier est prêt à être consulté.');
});

document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((link) => link.classList.remove('active'));
    item.classList.add('active');
  });
});