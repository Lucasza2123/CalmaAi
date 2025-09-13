// Formulário de login
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('calma_ai_current_user', JSON.stringify(user));

        const today = new Date().toDateString();
        const todayMood = moods.find(m => m.userId === user.id && new Date(m.date).toDateString() === today);

        showScreen(todayMood ? 'menu-screen' : 'mood-screen');
    } else {
        alert('E-mail ou senha incorretos!');
    }
});
