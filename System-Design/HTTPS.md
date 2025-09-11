# TLS Handshake Steps

1. **Client Hello**  
   → Browser (client) sends a **Client Hello** message to the server.

2. **Server Hello + Certificate**  
   → Server responds with **Server Hello** and its **SSL certificate**, which:

   - Contains the server’s **public key**.
   - Contains information about the server.
   - Is **digitally signed by the Certificate Authority (CA)** using the CA’s private key.

3. **Certificate Verification**  
   → Browser verifies the server’s certificate by:

   - Decrypting the certificate using the CA’s **public key**.
   - Extracting the **server’s public key**.
   - Confirming that the certificate truly belongs to the server.
     **IMP - because third party CAs and browsers have a collab, the CA's public key is already available in most of the browsers, hence browser uses CA's public key to decrypt the SSL certificate, and since it was signed by CA's private key, and browser's trust CA's this validation is done**

4. **Pre-Master Secret Exchange**  
   → Browser generates a **pre-master secret**, encrypts it with the server’s **public key**, and sends it to the server.

5. **Session Key Generation**  
   → Both client and server use:

   - Client Hello
   - Server Hello
   - Pre-master secret  
     → to generate the same **session keys**.

6. **Secure Communication**  
   → All further communication is encrypted using these **symmetric session keys**.
   **IMP - note here both client and server are using symmetric keys for encryption and decryption, because symmetric key enc / dec is alwasy fatster then asymmetric key enc / dec, but the initial SSL handshake is done using assymetric key enc / dec, because the communction was not yet secure during initial handshake, once browser's trusts server, then both share common symmetric key using HTTPS**
