#!/usr/bin/env node

import { Command } from "commander"
import { Keypair, Connection, clusterApiUrl, sendAndConfirmTransaction, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import fs from 'fs';
import path from 'path';
import crypto from "crypto";

// commands
import airdrop from "./commands/airdrop";
import balance from "./commands/balance";
import generateKeypair from "./commands/generate-keypair";
import transfer from "./commands/transfer";

//declare program
const program = new Command();

const defaultDirectory = path.join(__dirname, 'keypairs');

//generate random keypair
program
.command('generate-keypair')
.description('Generate a random keypair')
.action(generateKeypair)

// handle airdropp
program
.command("airdrop <publickey> <amount>")
.description("request-airdrop")
.action(airdrop)

// check balance
program
.command("balance <publickey>")
.description("balance")
.action(balance)

// transfer
program
  .command("transfer <file> <to-publickey> <amount>")
  .description("Transfer SOL from a keypair stored in a file to another public key")
  .action(transfer)

.version("1.0.1")
//execute the cli with the argument
program.parse(process.argv);