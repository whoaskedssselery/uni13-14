document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('project-filter-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input[type="radio"][name="category"]');
  const cards = document.querySelectorAll('.project-card');

  const applyFilter = (category) => {
    const target = (category || 'all').toLowerCase();

    cards.forEach(card => {
      const raw = (card.dataset.category || '').toLowerCase();
      const cats = raw.split(/\s+/).filter(Boolean);
      const show = target === 'all' || cats.includes(target);

      card.style.display = show ? '' : 'none';
    });
  };

  inputs.forEach(input => {
    input.addEventListener('change', () => applyFilter(input.value));
  });

  const checked = form.querySelector('input[name="category"]:checked');
  applyFilter(checked ? checked.value : 'all');
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    if (!name.value.trim()) {
      showNotification('Введите имя', 'error');
      name.focus();
      return;
    }

    if (!validateEmail(email.value)) {
      showNotification('Введите корректный email', 'error');
      email.focus();
      return;
    }

    if (!message.value.trim()) {
      showNotification('Введите сообщение', 'error');
      message.focus();
      return;
    }

    showNotification('Сообщение успешно отправлено!', 'success');
    contactForm.reset();
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function showNotification(text, type = 'success') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const note = document.createElement('div');
  note.className = `notification ${type}`;
  note.textContent = text;

  document.body.appendChild(note);

  setTimeout(() => note.classList.add('show'), 10);
  setTimeout(() => {
    note.classList.remove('show');
    setTimeout(() => note.remove(), 300);
  }, 3000);
}

