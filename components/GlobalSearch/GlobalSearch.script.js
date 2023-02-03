import { chainIdToName } from "../../utils/supportedChains";

export const categories = ["Collection", "Address", "Account", "NFTs"];
export const params = {
  Collection: "name",
  Address: "id",
  Account: "id",
  NFTs: "id",
};

export const handleNavigate = ({ category, router, data }) => {
  if (category === "Collection") {
    router.push(`/collection/${data.name}?id=${data.id}`);
  } else if (category === "Address") {
    router.push(`/collection/${data.name}?id=${data.id}`);
  } else if (category === "Account") {
    router.push(`/${data.id}`);
  } else if (category === "NFTs") {
    router.push(
      `/assets/${chainIdToName[data.collection.chainId]}/${data.nftAddress}/${data.tokenId}`
    );
  }
};
