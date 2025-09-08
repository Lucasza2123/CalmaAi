let users = JSON.parse(localStorage.getItem('calma_ai_users')) || [];

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm').value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return;
  }

  if (users.some(u => u.email === email)) {
    alert('Este e-mail já está cadastrado!');
    return;
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem('calma_ai_users', JSON.stringify(users));

  alert('Conta criada com sucesso! Agora faça login.');
  window.location.href = "login.html"; // redireciona para login
});
