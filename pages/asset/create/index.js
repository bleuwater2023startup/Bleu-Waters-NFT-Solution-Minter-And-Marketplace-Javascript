import classes from "../../../styles/Create.module.css";
import OneOfOne from "../../../assets/icon-1of1.svg";
import Collection from "../../../assets/icon-collection.svg";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import SelectContractModal from "../../../components/Modals/SelectContractModal/SelectContractModal";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_1of1_COLLECTIONS } from "../../../utils/subgraphQuery";
import { StateContext } from "../../../context/state.context";
import { setMintData } from "../../../context/state.actions";
import { INITIAL_STATE } from "../../../context/state.reducer";
import ResumeSessionModal from "../../../components/Modals/ResumeSessionModal/ResumeSessionModal";
import Loader from "../../../components/LoadingScreen/Loader/Loader";

const Create = () => {
  const [contractModal, setContractModal] = useState(false);
  const [contract, setContract] = useState("");
  const { account, dispatch } = useContext(StateContext);
  const [resumeSession, setResumeSession] = useState(false);

  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(GET_1of1_COLLECTIONS, {
    variables: { _id: account },
    notifyOnNetworkStatusChange: true,
  });

  const handleInit = () => {
    setResumeSession("");
    dispatch(setMintData(INITIAL_STATE.mintData));
  };

  const isSession = (data) =>
    data &&
    Object.values(data).some((val) => {
      if (val !== null && typeof val === "object") {
        return Object.keys(val).length;
      } else {
        return val;
      }
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

  useEffect(() => {
    let storedMintData = window.localStorage.getItem("mint_data");
    storedMintData = JSON.parse(storedMintData);
    if (isSession(storedMintData)) {
      if (storedMintData["Contract Name"]) {
        if (storedMintData.MintType === "Collection") {
          setResumeSession("/asset/create/collection");
        } else {
          setResumeSession("/asset/create/1of1?address=create-new");
        }
      } else if (storedMintData.Name) {
        setResumeSession("/asset/create/1of1?address=existing");
      } else {
        setResumeSession("");
      }
    }
    // dispatch(setMintData({ ...storedMintData, File: null }));
  }, []);

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
          <Loader overlay />
        )
      ) : null}
      {resumeSession ? <ResumeSessionModal onClose={handleInit} session={resumeSession} /> : null}
      <div className={classes.mainText}>Choose type</div>
      <div className={classes.subText}>
        Choose “1 of 1 collection” for one of a kind or “Collection” if you want to sell an
        assortment of digital assets with same art style
      </div>
      <div className={classes.mintTypeContainer}>
        <div onClick={() => setContractModal(true)} className={classes.mintType}>
          <OneOfOne />
          <div className={classes.name}>1 of 1 collection</div>
          <div className={classes.description}>
            If you want to sell your unique artworks as a 1-of-1 NFT inside a collection
          </div>
        </div>
        <Link onClick={handleInit} href="/asset/create/collection" className={classes.mintType}>
          <Collection />
          <div className={classes.name}>Collection</div>
          <div className={classes.description}>
            If you want to sell multiple NFTs of the same art styles, but with slight variations
            across each individual NFT
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Create;
