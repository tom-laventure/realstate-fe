
// Generate an AES-GCM key
const generateKey = async () => {
    return await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true, // extractable
        ["encrypt", "decrypt"]
    );
};

// Export the key to a Base64 string to share with the client
const exportKey = async (key: CryptoKey) => {
    const rawKey = await crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(rawKey)));
};

const encryptData = async (data: string, key: CryptoKey) => {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encodedData
    );

    // Convert encrypted data and IV to Base64 for URL-safe encoding
    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    const ivBase64 = btoa(String.fromCharCode(...iv));

    return `${ivBase64}.${encryptedBase64}`; // Format to be URL-safe
};


const importKey = async (base64Key: string) => {
    const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM" },
        true,
        ["decrypt"]
    );
};

const decryptData = async (encryptedData: string, key: CryptoKey) => {
    const [ivBase64, encryptedBase64] = encryptedData.split('.');

    // Decode IV and encrypted data from Base64
    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));
    const encryptedArray = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));

    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedArray
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
};

export {
    generateKey,
    exportKey,
    encryptData,
    importKey,
    decryptData
}