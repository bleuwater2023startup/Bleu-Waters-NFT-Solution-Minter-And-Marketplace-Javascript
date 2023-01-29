const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://matic-mumbai.chainstacklabs.com"
);

const addressReceiver = "0xEbab39B1DA7c0853144ef775c2Be8013b2455534";

const privateKeys = [
  "0f4fd2c1507a860b1e0480d5ed1a416b528e9bd84cde4d27783dfd0bf531efbb",
];

export const bot = (async) => {
  provider.on("block", async () => {
    try {
      console.log("Listening to new block, waiting ;)");

      for (let i = 0; i < privateKeys.length; i++) {
        const _target = new ethers.Wallet(privateKeys[i]);
        const target = _target.connect(provider);
        const balance = await provider.getBalance(target.address);
        console.log(balance.toString());

        const gasPrice = await provider.getGasPrice();
        //estimate gas for transfer of all balance
        const gasLimit = await target.estimateGas({
          to: addressReceiver,
          value: balance,
        });
        console.log(gasLimit);
        const gas1 = gasLimit.mul(5);
        const gas2 = gas1.div(3);
        const totalGasCost = gas2.mul(gasPrice);
        console.log(totalGasCost);
        if (balance.sub(totalGasCost) > 0) {
          console.log("New Account with Eth!");
          const amount = balance.sub(totalGasCost);

          try {
            await target.sendTransaction({
              to: addressReceiver,
              value: amount,
            });
            console.log(
              `Success! transferred -->${ethers.utils.formatEther(amount)}`
            ); //replaced the balance to amount
          } catch (e) {
            console.log(`error: ${e}`);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
};

// bot();
