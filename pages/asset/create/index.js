import classes from "../../../styles/Create.module.css";
import OneOfOne from "../../../assets/icon-1of1.svg";
import Collection from "../../../assets/icon-collection.svg";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import SelectContractModal from "../../../components/Modals/SelectContractModal/SelectContractModal";
import { useRouter } from "next/router";
import Button from "../../../components/Button/Button";
import { useQuery } from "@apollo/client";
import { GET_1of1_COLLECTIONS } from "../../../utils/subgraphQuery";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import { StateContext } from "../../../context/state.context";

const Create = () => {
  const [contractModal, setContractModal] = useState(false);
  const [contract, setContract] = useState("");
  const { account } = useContext(StateContext);

  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(GET_1of1_COLLECTIONS, {
    variables: { _id: account },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!contract) return;
    router.push({
      pathname: "/asset/create/1of1",
      query: { address: contract },
    });
  }, [contract]);

  useEffect(() => {
    refetch();
  }, [router.asPath]);

  if (!account) {
    return <div>Please connect your wallet to continue</div>;
  }

  return (
    <div className={classes.container}>
      {contractModal ? (
        !error && !loading ? (
          <SelectContractModal
            onClose={() => setContractModal(false)}
            onContractSelect={setContract}
            collections={data.collections}
          />
        ) : (
          <LoadingScreen show />
        )
      ) : null}
      <div className={classes.mainText}>Choose type</div>
      <div className={classes.subText}>
        Choose “1 of 1 collection” for one of a kind or “Collection” if you want
        to sell an assortment of digital assets with same art style
      </div>
      <div className={classes.mintTypeContainer}>
        <div
          onClick={() => setContractModal(true)}
          className={classes.mintType}
        >
          <OneOfOne />
          <div className={classes.name}>1 of 1 collection</div>
          <div className={classes.description}>
            If you want to sell your unique artworks as a 1-of-1 NFT inside a
            collection
          </div>
        </div>
        <Link href="/asset/create/collection" className={classes.mintType}>
          <Collection />
          <div className={classes.name}>Collection</div>
          <div className={classes.description}>
            If you want to sell multiple NFTs of the same art styles, but with
            slight variations across each individual NFT
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Create;
