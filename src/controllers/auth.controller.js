import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Herramienta para encriptar contraseñas
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  // Aquí podrías agregar la lógica para guardar el usuario en la base de datos
  // Instaciar un objeto de usario

  try {
    const { email, password, username } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound) {
      return res
        .status(400)
        .json({ message: ["The email is already in use."] });
    }

    const passwordHash = await bcrypt.hash(password, 10); // --> esto da un string random

    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });

    // Aquí podrías guardar el usuario en la base de datos
    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    // Solo devolvemos datos para el frontend sin la contraseña
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  //console.log(email, password, username);

  // Aquí podrías agregar la lógica para guardar el usuario en la base de datos
  // Instaciar un objeto de usario

  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password); // --> Devulve true o false

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    // Solo devolvemos datos para el frontend sin la contraseña
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", " ", {
    expires: new Date(0), // -> Expira inmediatamente
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

// Metodo para verificar el token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
