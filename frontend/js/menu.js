// Navegação do menu principal
document.getElementById('go-to-breathing')?.addEventListener('click', () => showScreen('breathing-screen'));
document.getElementById('go-to-chat')?.addEventListener('click', () => showScreen('chat-screen'));
document.getElementById('go-to-calendar')?.addEventListener('click', () => {
    showScreen('calendar-screen');
    renderCalendar();
});
document.getElementById('go-to-profile')?.addEventListener('click', () => {
    showScreen('profile-screen');
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-email').value = currentUser.email;
});

// Logout
document.getElementById('logout-button')?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('calma_ai_current_user');
    showScreen('login-screen');
});
