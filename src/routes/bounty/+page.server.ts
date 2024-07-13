import { Root } from "../../contracts/root";
import { DefaultProvider, sha256, bsv, toByteString } from "scrypt-ts";
import { NeucronSigner } from "neucron-signer";
import artifact from "../../../artifacts/root.json"

const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
const signer = new NeucronSigner(provider);
// await signer.login("sales@timechainlabs.io", "string");
await signer.login("shradeshjain123@gmail.com", "jainbun@71");
await Root.loadArtifact(artifact);
let instance: any;

export const actions = {
  // @ts-ignore
  deploy: async ({ request }) => {
    const data = await request.formData();
    console.log("data: ",data);

    const square = BigInt(Number(data.get("square")));
    instance = new Root(square);
    await instance.connect(signer);

    try {
      const deployTx = await instance.deploy(Number(data.get("bounty")));
      console.log(
        "smart lock deployed : https://whatsonchain.com/tx/" + deployTx.id
      );
      console.log("deployTx: ",deployTx)
      return { success: true, txid: deployTx.id };
    } catch (error:any) {
      return { success: false, txid: error.message };
    }
  },

  // @ts-ignore
  unlock: async ({ request }) => {
    // Retrieve data from the form
    const data = await request.formData();
    const root = Number(data.get("root"));

    await instance.connect(signer);
    // Call the unlock method
    try {
      const { tx: callTx } = await instance.methods.unlock(root);
      console.log(
        "contract unlocked successfully : https://whatsonchain.com/tx/" +
          callTx.id
      );
      return { success: true, txid: callTx.id };
    } catch (error: any) {
      console.log(error.message);
      return { success: false, txid: error.message };
    }
  },
};
