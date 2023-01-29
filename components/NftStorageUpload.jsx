// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage } from "nft.storage";

import { useState } from "react";

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxNDQ2QWY3RWFCMTM3Yzg2MWJCRDdhNTNENzk2MjVGODEzOTdjOUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzQyNTQ1NDYxNiwibmFtZSI6IkJsZXV3YXRlcl9maXJzdF9iYXRjaCJ9.swhRJX3oRA4GO89fLCVnraayl2KSkUx9xvPEtENGfVg";

const NftStorageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
  };

  async function storeNFT(image, name, description, attributes) {
    // load the file from disk
    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

    // call client.store, passing in the image & metadata
    return nftstorage.store({
      image,
      name,
      description,
      attributes,
    });
  }

  async function main() {
    console.log(selectedFile[0]);

    return;
    const name = "First upload";
    const description = "awesome text";
    const attributes = [
      {
        trait_type: "Background",
        value: "black",
      },
      {
        trait_type: "Head",
        value: "Brown",
      },
    ];
    const result = await storeNFT(
      selectedFile[0],
      name,
      description,
      attributes
    );
    console.log(result);
  }

  return (
    <div>
      {" "}
      <label className="form-label">choose Folder</label>
      <input
        // directory=""
        // webkitdirectory=""
        type="file"
        accept="image/png"
        onChange={changeHandler}
      />
      <button onClick={main}>Submit</button>
    </div>
  );
};

export default NftStorageUpload;
