import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Registrar usuário
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // verifica se já existe
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ msg: "Email já cadastrado!" });

    // hash na senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUser = new User({ nome, email, senha: senhaHash });
    await novoUser.save();

    res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(400).json({ msg: "Senha inválida" });

    // gera token
    const token = jwt.sign({ id: user._id }, "segredo123", { expiresIn: "1h" });

    res.json({ msg: "Login realizado!", token });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err });
  }
});

export default router;
