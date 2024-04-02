import {PublicKey} from '@solana/web3.js';

export async function getFamilies(myAddress: PublicKey) {
  const provider = new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  const program = new Program<Did>(IDL, DID_PROGRAM_ID, provider);
  const families = await program.account.family.all([
    {
      memcmp: {
        offset: 8,
        bytes: myAddress.toBase58(),
      },
    },
  ]);
  const families_upper = await program.account.family.all([
    {
      memcmp: {
        offset: 8 + 32,
        bytes: myAddress.toBase58(),
      },
    },
  ]);
  families.push(...families_upper);
}
