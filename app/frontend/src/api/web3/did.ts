import {PublicKey} from '@solana/web3.js';
import {AnchorProvider, Program} from '@coral-xyz/anchor';
import {DID_PROGRAM_ID} from '../../config/web3Config.tsx';
import {Did, IDL} from '../../config/web3Types/did.ts';
import {findFamilyInfo} from './wallet.ts';

export async function getFamilies(
  myAddress: PublicKey,
  connection: any,
  anchorWallet: any,
) {
  console.log('[getFamiliesApi request] = ', connection);
  console.log('[getFamiliesApi request] = anchorWallet ', anchorWallet);
  const families = [];
  const provider = new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  console.log('[getFamiliesApi request] = provider', provider);
  const program = new Program<Did>(IDL, DID_PROGRAM_ID, provider);
  console.log('[getFamiliesApi request] = program', program);

  const familiesLowerIsMe = await program.account.family.all([
    {
      memcmp: {
        offset: 8,
        bytes: myAddress.toBase58(),
      },
    },
  ]);
  console.log(
    '[getFamiliesApi request] = familiesLowerIsMe',
    familiesLowerIsMe,
  );
  for (const familiesLowerIsMeElement of familiesLowerIsMe) {
    const data = await findFamilyInfo(
      String(familiesLowerIsMeElement.account.upper),
    );
    families.push({
      id: familiesLowerIsMeElement.account.upperId,
      email: data.email,
      name: data.name,
      wallet: String(familiesLowerIsMeElement.account.upper),
    });
  }

  const familiesUpperIsMe = await program.account.family.all([
    {
      memcmp: {
        offset: 8 + 32,
        bytes: myAddress.toBase58(),
      },
    },
  ]);

  for (const familiesUpperIsMeElement of familiesUpperIsMe) {
    const data = await findFamilyInfo(
      String(familiesUpperIsMeElement.account.lower),
    );
    families.push({
      id: familiesUpperIsMeElement.account.lowerId,
      email: data.email,
      name: data.name,
      wallet: String(familiesUpperIsMeElement.account.lower),
    });
  }
  console.log('[getFamiliesApi response] = ', families);
  return families;
}
