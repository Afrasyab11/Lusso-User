import CryptoJS from "crypto-js";

const useEncryptionHook = () => {
    const key = process.env.REACT_APP_SECRET_KEY_CRYPTO as string;
    const sKey = CryptoJS.enc.Base64.parse(key);
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');

    const encrypt = (plainText: string): string => {
        const encrypted = CryptoJS.AES.encrypt(plainText, sKey, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        }).toString();
        // alert(encrypted)
        return encrypted;
        // return plainText;
    };

    const decrypt = (cipherText: string): string => {
        const decrypted = CryptoJS.AES.decrypt(cipherText, sKey, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });
        const plainText = decrypted.toString(CryptoJS.enc.Utf8);
        return plainText;
    };

    return { encrypt, decrypt }
}

export default useEncryptionHook;
