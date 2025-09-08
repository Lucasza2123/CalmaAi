const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const dataPath = path.join(__dirname, "data.json");

app.use(express.json());

function readData() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ users: [], moods: [] }, null, 2));
    }
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
}

function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Registrar novo usuário
app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;
    const data = readData();

    if (data.users.some(u => u.email === email)) {
        return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    data.users.push(newUser);
    saveData(data);

    res.json({ message: "Usuário cadastrado com sucesso!", user: newUser });
});

// Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const data = readData();

    const user = data.users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "E-mail ou senha incorretos!" });
    }

    res.json({ message: "Login realizado com sucesso!", user });
});

// Registrar humor
app.post("/api/mood", (req, res) => {
    const { userId, mood, notes, date } = req.body;
    const data = readData();

    data.moods = data.moods.filter(m => {
        const moodDate = new Date(m.date).toDateString();
        return !(m.userId === userId && moodDate === new Date(date).toDateString());
    });

    const newMood = { id: Date.now().toString(), userId, mood, notes, date };
    data.moods.push(newMood);
    saveData(data);

    res.json({ message: "Humor registrado com sucesso!", mood: newMood });
});

// Listar humores de um usuário
app.get("/api/moods/:userId", (req, res) => {
    const { userId } = req.params;
    const data = readData();
    res.json(data.moods.filter(m => m.userId === userId));
});

// Alterar senha
app.post("/api/change-password", (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    const data = readData();

    const userIndex = data.users.findIndex(u => u.id === userId && u.password === currentPassword);
    if (userIndex === -1) {
        return res.status(400).json({ message: "Senha atual incorreta!" });
    }

    data.users[userIndex].password = newPassword;
    saveData(data);

    res.json({ message: "Senha alterada com sucesso!" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
