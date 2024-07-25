import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export default async function airdrop(publicKey: any, amount: any) {
    const connection = new Connection(clusterApiUrl("devnet"));
    const userPublicKey = new PublicKey(publicKey);
    const airdropSignature = await connection.requestAirdrop(userPublicKey, amount * LAMPORTS_PER_SOL);
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
    });
    console.log(`Airdropped ${amount} SOL to ${publicKey}`);
}
