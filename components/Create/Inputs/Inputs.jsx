import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../../context/state.context";
import Button from "../../Button/Button";
import classes from "./Inputs.module.css";
import {
  handleSession,
  _handleCreateCollection,
  _handleCreateRoyalty,
  _handleMint,
  _handleUploadToIpfs,
} from "./InputScript";

const Inputs = ({ collection, flow, handleStep, stepId, mintType }) => {
  const { account, walletProvider, chainId, mintData, dispatch } = useContext(StateContext);
  const [reset, setReset] = useState(true);
  const router = useRouter();

  const createProps = {
    account,
    walletProvider,
    chainId,
    mintData,
    dispatch,
    router,
    mintType,
    handleStep,
  };

  useEffect(() => {
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 650);
  }, [stepId]);

  useEffect(() => {
    handleSession(createProps);
  }, [mintData]);

  return (
    <div className={`${classes.container} ${reset && classes.reset}`}>
      {collection[stepId]}
      {flow[stepId] === "create-new" ? (
        <>
          {mintData["Collection Address"] ? (
            <div className={classes.button} onClick={() => handleStep()}>
              <Button accent>Next</Button>
            </div>
          ) : (
            <div className={classes.button} onClick={() => _handleCreateCollection(createProps)}>
              <Button accent>Create</Button>
            </div>
          )}
        </>
      ) : flow[stepId] === "upload" ? (
        <>
          {mintData["IpfsUrl"] ? (
            <div className={classes.button} onClick={() => handleStep()}>
              <Button accent>Next</Button>
            </div>
          ) : (
            <div className={classes.button} onClick={() => _handleUploadToIpfs(createProps)}>
              <Button accent>Upload to IPFS</Button>
            </div>
          )}
        </>
      ) : flow[stepId] === "royalty" ? (
        mintData["Payment_Splitter_Address"] ? (
          <div className={classes.button} onClick={() => handleStep()}>
            <Button accent>Next</Button>
          </div>
        ) : (
          <div className={classes.button} onClick={() => _handleCreateRoyalty(createProps)}>
            <Button accent>Create Royalty</Button>
          </div>
        )
      ) : collection.length - 1 > stepId ? (
        <div className={classes.button} onClick={handleStep}>
          <Button accent>Next</Button>
        </div>
      ) : (
        <div className={classes.button} onClick={() => _handleMint(createProps)}>
          <Button accent>Mint</Button>
        </div>
      )}
    </div>
  );
};

export default Inputs;
