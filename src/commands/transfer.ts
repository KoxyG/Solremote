import fs from 'fs';
import path from 'path';
import { Keypair, Connection, clusterApiUrl, Transaction, sendAndConfirmTransaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import base58 from 'bs58';

export default async function transfer(filePath: any, toPublicKey: any, amount: any) {
    const connection = new Connection(clusterApiUrl("devnet"));
    
    // Load the keypair from the file
    const keypairJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const secretKey = Uint8Array.from(keypairJson.secretKey);
    const fromKeypair = Keypair.fromSecretKey(secretKey);
    const userPublicKey = fromKeypair.publicKey;
    const receiverPublicKey = new PublicKey(toPublicKey);
    
    // Check balance
    const balanceInLamports = await connection.getBalance(userPublicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    
    if (balanceInSOL < amount) {
        console.log(`The balance for the wallet at address ${userPublicKey.toBase58()} is less than the amount`);
    } else {
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: userPublicKey,
                    toPubkey: receiverPublicKey,
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );
            const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
            console.log(`Transaction signature is ${signature}!`);
            console.log(`Sent ${amount} SOL from ${userPublicKey.toBase58()} to ${toPublicKey}`);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    }
}
