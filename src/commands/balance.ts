import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export default async function balance(publicKey: any) {
    const connection = new Connection(clusterApiUrl("devnet"));
    const userPublicKey = new PublicKey(publicKey);
    const balanceInLamports = await connection.getBalance(userPublicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log(`The balance for the wallet at address ${userPublicKey.toBase58()} is ${balanceInSOL}`);
}
