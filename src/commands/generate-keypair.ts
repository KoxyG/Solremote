import { Keypair } from "@solana/web3.js";
import fs from 'fs';
import path from 'path';
import base58 from 'bs58';

export default function generateKeypair() {
     console.log("Generating new keypair..")
    const keypair = Keypair.generate();
    const secretkey = base58.encode(keypair.secretKey);
    
    // Ensure the directory exists
    const dir = path.join(__dirname, '..', 'keypairs');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Save the keypair
    const filePath = path.join(dir, `keypair_${Date.now()}.json`);
    const keypairJson = JSON.stringify({
        publicKey: keypair.publicKey.toBase58(),
        secretKey: [...keypair.secretKey],
    });

    fs.writeFileSync(filePath, keypairJson, 'utf8');
    console.log(`Keypair generated and saved to: ${filePath}`);
    console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
    console.log(`Secret Key: ${secretkey}`);
}
