async function loadWriteups() {
  const response = await fetch('data/writeups.json');
  const writeups = await response.json();
  return writeups;
}

function render(writeups) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  if (writeups.length === 0) {
    results.innerHTML = `<p>Bunday write-up hali mavjud emas 🕵️‍♂️</p>`;
    return;
  }

  writeups.forEach(w => {
    const div = document.createElement('div');
    div.className = 'writeup';
    div.innerHTML = `
      <h2><a href="${w.link}">${w.title}</a></h2>
      <p>${w.platform} • ${w.tags.join(', ')}</p>
    `;
    results.appendChild(div);
  });
}

document.getElementById('search').addEventListener('input', async (e) => {
  const query = e.target.value.toLowerCase();
  const writeups = await loadWriteups();
  const filtered = writeups.filter(w =>
    w.title.toLowerCase().includes(query) ||
    w.platform.toLowerCase().includes(query) ||
    w.tags.some(tag => tag.toLowerCase().includes(query))
  );
  render(filtered);
});

(async () => {
  const all = await loadWriteups();
  render(all);
})();
