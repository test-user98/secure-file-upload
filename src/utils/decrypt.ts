const decryptData = async (
    encryptedData: string,
    initVector: string,
  ) => {
    // Prepare the decryption key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      Buffer.from(process.env.AES_KEY as string, "base64"),
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  
    try {
      const decodedData = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: Buffer.from(initVector, "base64"),
        },
        cryptoKey,
        Buffer.from(encryptedData, "base64")
      );
      return new TextDecoder().decode(decodedData);
    } catch (error) {
      return JSON.stringify({ payload: null });
    }
  };
  
  const handleDecryption = async ({ encryptedData, initVector }: any) => {
    const decryptedString = await decryptData(
      encryptedData!,
      initVector!,
    );
  
    const responseData = JSON.parse(decryptedString)?.data;
  
    return responseData;
  };