const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Conectar ao MongoDB (certifique-se de ter o MongoDB rodando)
mongoose.connect('mongodb://localhost:27017/autenticacao-api', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

// Definir o modelo do usuário
const User = mongoose.model('User', {
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  telefones: [
    {
      numero: { type: String, required: true },
      ddd: { type: String, required: true },
    },
  ],
  data_criacao: { type: Date, default: Date.now },
  data_atualizacao: { type: Date, default: Date.now },
  ultimo_login: { type: Date, default: Date.now },
});

// Rota de cadastro (sign up)
app.post('/signup', async (req, res) => {
  try {
    const { nome, email, senha, telefones } = req.body;

    // Verificar se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(String(senha), 10);
    const user = new User({
      nome,
      email,
      senha: hashedPassword,
      telefones,
    });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, 'secreto', { expiresIn: '1h' });

    res.status(201).json({
      id: user._id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar o usuário.' });
  }
});

// Rota de autenticação (sign in)
app.post('/signin', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    // Atualizar a última data de login
    user.ultimo_login = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, 'secreto', { expiresIn: '1h' });

    res.json({
      id: user._id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao autenticar o usuário.' });
  }
});

// Rota para recuperar informações do usuário (exige autenticação)
app.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secreto');

    // Verificar se o token pertence ao usuário
    const user = await User.findOne({ _id: decoded.id, email: decoded.email });

    if (!user) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    res.json({
      id: user._id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ mensagem: 'Sessão inválida' });
    }
    res.status(401).json({ mensagem: 'Não autorizado' });
  }
});

// Rota padrão para endpoint não encontrado
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Endpoint não encontrado.' });
});

// Lidar com erros
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ mensagem: 'Erro interno do servidor.' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app; // Exportar para testes
