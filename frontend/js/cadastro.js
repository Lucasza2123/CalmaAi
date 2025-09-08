// Formulário de cadastro
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;

    if (password !== confirmPassword) return alert('As senhas não coincidem!');
    if (users.some(u => u.email === email)) return alert('Este e-mail já está cadastrado!');

    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('calma_ai_users', JSON.stringify(users));

    alert('Conta criada com sucesso! Faça login para continuar.');
    showScreen('login-screen');
});
