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
