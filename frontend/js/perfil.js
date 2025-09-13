// Pegar telas
const profileScreen = document.getElementById("profile-screen");
const changePasswordScreen = document.getElementById("change-password-screen");

// Botões
const goToChangePasswordBtn = document.getElementById("go-to-change-password");
const backFromChangePasswordBtn = document.getElementById("back-from-change-password");
const backToMenuBtn = document.getElementById("back-to-menu");

// Mostrar a tela de Alterar Senha
goToChangePasswordBtn.addEventListener("click", () => {
    profileScreen.classList.add("hidden");
    changePasswordScreen.classList.remove("hidden");
});

// Voltar para a tela de Perfil
backFromChangePasswordBtn.addEventListener("click", () => {
    changePasswordScreen.classList.add("hidden");
    profileScreen.classList.remove("hidden");
});

// Voltar para o Menu (redireciona para menu.html)
backToMenuBtn.addEventListener("click", () => {
    window.location.href = "menu.html";
});
