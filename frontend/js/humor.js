// Seleção de humor
const moodOptions = document.querySelectorAll('.mood-option');
let selectedMood = null;
moodOptions.forEach(option => option.addEventListener('click', () => {
    moodOptions.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    selectedMood = option.dataset.mood;
}));

// Salvar humor
document.getElementById('save-mood')?.addEventListener('click', () => {
    if (!selectedMood) return alert('Por favor, selecione como você está se sentindo!');

    const notes = document.getElementById('mood-notes').value;
    const today = new Date();
    // Remove entradas antigas do mesmo dia
    moods = moods.filter(m => !(m.userId === currentUser.id && new Date(m.date).toDateString() === today.toDateString()));
    // Adiciona nova entrada
    moods.push({ id: Date.now().toString(), userId: currentUser.id, mood: selectedMood, notes, date: today.toISOString() });
    localStorage.setItem('calma_ai_moods', JSON.stringify(moods));

    showScreen('menu-screen');
});
