import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

import User from "./backend/models/User.js";
import Mood from "./backend/models/Mood.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "views", "index.html"));
});

// =================== GEMINI ===================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const result = await model.generateContent(message);
    const response = await result.response.text();
    res.json({ reply: response });
  } catch (error) {
    console.error("❌ Erro Gemini:", error);
    res.status(500).json({ error: "Erro ao comunicar com o Gemini" });
  }
});

// =================== AUTH MIDDLEWARE ===================
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido!" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token inválido!" });

  try {
    const decoded = jwt.verify(token, "segredo123"); // ⚠️ depois troca por chave forte
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expirado ou inválido!" });
  }
}

// =================== ROTAS ===================
// Registrar novo usuário
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "E-mail já cadastrado!" });

    const hash = await bcrypt.hash(password, 10);
    const novoUser = new User({ name, email, password: hash });
    await novoUser.save();

    res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "E-mail ou senha incorretos!" });

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida) return res.status(401).json({ message: "E-mail ou senha incorretos!" });

    const token = jwt.sign({ id: user._id }, "segredo123", { expiresIn: "1h" });
    res.json({ message: "Login realizado com sucesso!", token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err });
  }
});

// Registrar humor
app.post("/api/humor", auth, async (req, res) => {
  try {
    const { humor, observacoes } = req.body;
    const date = new Date();

    // impede duplicado no mesmo dia
    await Mood.deleteOne({
      userId: req.userId,
      date: { $gte: new Date(date).setHours(0,0,0,0), $lte: new Date(date).setHours(23,59,59,999) }
    });

    const novoMood = new Mood({ userId: req.userId, mood: humor, notes: observacoes, date });
    await novoMood.save();

    res.json({ message: "Humor registrado com sucesso!", mood: novoMood });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err });
  }
});

// Listar humores
app.get("/api/humores", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.userId });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err });
  }
});

// Alterar senha
app.post("/api/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ message: "Usuário não encontrado!" });

    const senhaValida = await bcrypt.compare(currentPassword, user.password);
    if (!senhaValida) return res.status(400).json({ message: "Senha atual incorreta!" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Senha alterada com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err });
  }
});

// =================== CONEXÃO MONGO ===================
mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.error("Erro MongoDB:", err));

// =================== START SERVER ===================
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
