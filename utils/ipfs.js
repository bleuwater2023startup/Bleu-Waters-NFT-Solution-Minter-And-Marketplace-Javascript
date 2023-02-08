import axios from "axios";

export const formatIpfsUrl = (ipfsUrl) =>
  ipfsUrl && ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/");

export const getNft = async (tokenURI) => {
  if (tokenURI) {
    const url = formatIpfsUrl(tokenURI);
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      logError(error);
      return null;
    }
  }
};

export const getNftDetails = async ({ storedIpfsData, nfts }) => {
  const ipfsData = {};
  const details = [];
  for (let i = 0; i < nfts.length; i++) {
    await new Promise(async (resolve) => {
      let uri = nfts[i].tokenURI;

      if (!storedIpfsData || !storedIpfsData[uri]) {
        try {
          const _res = await getNft(uri);
          details.push({ ...nfts[i], ..._res, usdPrice: 0 });
          ipfsData[uri] = _res;
        } catch (error) {
          logError(error);
        }
      } else {
        details.push({ ...nfts[i], ...storedIpfsData[uri] });
      }
      resolve();
    });
  }

  return { details, ipfsData };
};

export const logError = (error) => {
  console.log(
    "error is coming =======================*********=======================************====================",
    error.message
  );
};
