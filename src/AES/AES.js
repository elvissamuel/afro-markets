
import CryptoJS from 'crypto-js';

export const encryptData1 = (data, secretKey) => {
    const jsonData = JSON.stringify(data); 
    const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
    return encrypted;
};

export const encryptData = (data, secretKey) => {
    const jsonData = JSON.stringify(data);
    console.log("data: ",jsonData)
    const key = CryptoJS.enc.Latin1.parse(secretKey)
    const stringIV = CryptoJS.enc.Latin1.parse("e8f24a9d0c731b5f")

    const encrypted = CryptoJS.AES.encrypt(jsonData, key, {
      iv: stringIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString()
};


function hexToUint8Array(hexString) {
  // Check if the hexString is of even length
  if (hexString.length % 2 !== 0) {
    throw new Error('Hex string length must be even.');
  }

  const uint8Array = new Uint8Array(hexString.length / 2);

  for (let i = 0; i < hexString.length; i += 2) {
    const byteValue = parseInt(hexString.substr(i, 2), 16);
    uint8Array[i / 2] = byteValue;
  }

  return uint8Array;
}

// Function to decrypt using Web Crypto API
export async function decryptAES(encryptedHex, key) {
  try {
    const iv = 'e8f24a9d0c731b5f'
    const keyBytes = new TextEncoder().encode(key);
    const ivBytes = new TextEncoder().encode(iv);
    const encryptedBytes = hexToUint8Array(encryptedHex);

    const importedKey = await window.crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-CBC' },
      false,
      ['encrypt', 'decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: ivBytes,
      },
      importedKey,
      encryptedBytes
    );

    const decryptedText = new TextDecoder().decode(decrypted);
    return decryptedText;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}


