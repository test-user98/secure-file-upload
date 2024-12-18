import crypto from 'crypto';

// Static key for encryption and decryption (it should be securely stored or shared between both processes)
const key = new Uint8Array(Buffer.from('12345678901234567890123456789012')); // Example 32-byte key (must be 32 bytes for AES-256-CBC)

export function encryptFile(content: Uint8Array): { encryptedContent: Uint8Array, iv: Uint8Array } {
    const algorithm = 'aes-256-cbc';

    // Generating a random initialization vector (IV) for each encryption
    const iv = crypto.randomBytes(16);

    // Create a cipher using the AES algorithm, the key, and the IV
    const cipher = crypto.createCipheriv(algorithm, key, new Uint8Array(iv));

    // Encrypt the content
    const encrypted = Buffer.concat([new Uint8Array(cipher.update(content)), new Uint8Array(cipher.final())]);

    return { encryptedContent: new Uint8Array(encrypted), iv: new Uint8Array(iv) };  // Returning encrypted content and IV
}

export function decryptFile(encryptedContent: Uint8Array, iv: Uint8Array): Uint8Array {
    const algorithm = 'aes-256-cbc';

    // Create a decipher using the AES algorithm, the same key, and the provided IV
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    // Decrypt the content
    const decrypted = Buffer.concat([new Uint8Array(decipher.update(encryptedContent)), new Uint8Array(decipher.final())]);

    return new Uint8Array(decrypted);  // Returning decrypted content
}
