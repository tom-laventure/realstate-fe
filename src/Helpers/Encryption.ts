const getKeyForEncryption = async (keyString: string): Promise<CryptoKey> => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keyString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', keyData);
    return crypto.subtle.importKey(
        'raw',
        hashBuffer,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
};

const urlSafeBase64ToBase64 = (urlSafeBase64: string): string => {
    let base64 = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if necessary
    while (base64.length % 4) {
        base64 += '=';
    }

    return base64;
};

// Function to encrypt the ID
const encryptData = async (id: string): Promise<string> => {
    const secretKey = process.env.REACT_APP_SECRET_KEY || '123'
    const key = await getKeyForEncryption(secretKey);
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const encodedId = encoder.encode(id);
    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encodedId
    );

    // Convert encrypted data and IV to Base64 and make them URL-safe
    const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));
    const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
    const ivBase64 = btoa(String.fromCharCode(...iv));

    return `${ivBase64}.${encryptedBase64}`.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const decryptData = async (encryptedId: string): Promise<string> => {
    const secretKey = process.env.REACT_APP_SECRET_KEY || '123';
    const [ivBase64, encryptedBase64] = encryptedId.split('.');

    if (!ivBase64 || !encryptedBase64) {
        throw new Error('Invalid encrypted ID format.');
    }

    // Revert URL-safe Base64 to standard Base64
    const ivBase64Standard = urlSafeBase64ToBase64(ivBase64);
    const encryptedBase64Standard = urlSafeBase64ToBase64(encryptedBase64);

    // Decode the Base64 data and IV
    const iv = Uint8Array.from(atob(ivBase64Standard), c => c.charCodeAt(0));
    const encryptedData = Uint8Array.from(atob(encryptedBase64Standard), c => c.charCodeAt(0));

    const key = await getKeyForEncryption(secretKey);
    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
};

export {
    encryptData,
    decryptData
}