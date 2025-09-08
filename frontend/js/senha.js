// Formulário de recuperação de senha
document.getElementById('forgot-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    if (users.some(u => u.email === email)) {
        alert('Um link para redefinição de senha foi enviado para seu e-mail!');
        showScreen('login-screen');
    } else {
        alert('E-mail não encontrado!');
    }
});
