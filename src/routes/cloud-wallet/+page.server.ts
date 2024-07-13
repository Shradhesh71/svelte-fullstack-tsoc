import NeucronSDK from "neucron-sdk";

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();

    const neucron = new NeucronSDK();

    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;

    // const signUpResponse = await authModule.signUp({ email: "sales@timechainlabs.io", password: "string" });
    // console.log(signUpResponse);

    const loginResponse = await authModule.login({
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log(loginResponse);

    // const walletKeys = await walletModule.getWalletKeys({});
    // console.log(walletKeys);

    // For Default wallet balance
    const DefaultWalletBalance = await walletModule.getWalletBalance({});
    console.log(DefaultWalletBalance);

    // const addresses = await walletModule.getAddressesByWalletId({});
    // console.log(addresses);

    // const walletHistory = await walletModule.getWalletHistory({ });
    // console.log(walletHistory);

    return {
      success: true,
      balance: DefaultWalletBalance.data.balance.summary,
    };
  },
  pay: async ({ request }) => {
    try {
      const data = await request.formData();

      const neucron = new NeucronSDK();

      const authModule = neucron.authentication;
      // const walletModule = neucron.wallet;

      const loginResponse = await authModule.login({
        email: data.get("email"),
        password: data.get("password"),
      });
      console.log(loginResponse);

      const options = {
        outputs: [
          {
            address: data.get("paymail"),
            note: "chanda",
            amount: Number(data.get("amount")),
          },
        ],
      };
      // console.log(options);
      const payResponse = await neucron.pay.txSpend(options);
      console.log(payResponse);

      return { success: true, payment: payResponse.data.txid };
    } catch (error: any) {
        console.log(error.message);
        return { success: false, error: error.message };
      }
  },
};
