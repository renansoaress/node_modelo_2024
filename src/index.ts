import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

function encryptText(plaintext: string, key: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray) {
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, { mode: CryptoJS.mode.CBC, iv: iv });
  return encrypted.toString();
}

function decryptText(encryptText: string, key: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray) {
  const decrypted = CryptoJS.AES.decrypt(encryptText, key, { mode: CryptoJS.mode.CBC, iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

app.get('/:message', (req: Request, res: Response) => {
  const { message } = req.params;

  const plain_key = 'Minha chave aqui!!';

  // console.log('MD5', CryptoJS.MD5(plain_key).toString());
  // console.log('SHA1', CryptoJS.SHA1(plain_key).toString());
  // console.log('SHA256', CryptoJS.SHA256(plain_key).toString());

  const key = CryptoJS.SHA1(plain_key);
  const iv = CryptoJS.enc.Utf8.parse(new Date().getTime().toString());

  const encrypted = encryptText(message, key, iv);

  res.send(`Encrypt(${encrypted})<br>Decrypt(${decryptText(encrypted, key, iv)})`);
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port} :D`);
});
