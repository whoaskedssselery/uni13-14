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

const diaryForm = document.getElementById('diary-form');
const diaryTable = document.getElementById('diary-table-body');

if (diaryForm && diaryTable) {
  diaryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = diaryForm.querySelector('#task-title').value.trim();
    const desc = diaryForm.querySelector('#task-desc').value.trim();
    const status = diaryForm.querySelector('#task-status').value;

    if (!title || !desc) {
      showNotification('Заполните все поля!', 'error');
      return;
    }

    const row = document.createElement('tr');
    const index = diaryTable.children.length + 1;

    row.innerHTML = `
      <td>${index}</td>
      <td>${title}</td>
      <td>${desc}</td>
      <td class="${status === 'Выполнено' ? 'done' : ''}">${status}</td>
    `;

    diaryTable.appendChild(row);
    showNotification('Запись добавлена!', 'success');
    diaryForm.reset();
  });
}

