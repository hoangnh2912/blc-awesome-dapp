import { AES, enc } from "crypto-js";
import keccak256 from "keccak256";

const ipfsToGateway = (ipfsUrl: string) => {
  return ipfsUrl;
};

const decryptMessage = (message: string, encryptKey: string) => {
  try {
    const hash = keccak256(encryptKey).toString("hex");
    return AES.decrypt(message, hash).toString(enc.Utf8);
  } catch (error) {}
};

const encryptMessage = (message: string, encryptKey: string) => {
  const hash = keccak256(encryptKey).toString("hex");
  return AES.encrypt(message, hash).toString();
};

export { ipfsToGateway, encryptMessage, decryptMessage };
