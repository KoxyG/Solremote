# SolRemote

SolRemote is a command-line interface (CLI) tool designed to interact with the Solana blockchain. It allows users to perform essential wallet operations such as generating keypairs, requesting airdrops of SOL tokens, and sending SOL tokens to other wallets. The tool is built Commander leveraging Solana's Web3.js library for blockchain interactions.


## Usage

### Installation

```bash
$ npm install -g solremote
```
## General Usage

$ solremote COMMAND
running command...
```
$ solremote --version
```
Look for help 
```
$ solremote help
```

## Commands 
```
solremote generate-keypair // Generate a random keypair
solremote airdrop <publickey> <amount>   //request-airdrop 
solremote balance <publickey>  // balance 
solremote transfer [options] <file> <to-publickey> <amount> // Transfer SOL from a keypair stored in a file to another public key
```
# Solremote
