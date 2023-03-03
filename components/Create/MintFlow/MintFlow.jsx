import { useContext } from "react";
import { StateContext } from "../../../context/state.context";
import { formatAccount } from "../../../utils";
import supportedChains from "../../../utils/supportedChains";
import Indicator from "../../Button/Indicator/Indicator";
import classes from "./MintFlow.module.css";

const MintFlow = ({ collection, contract, flow, stepId, offset }) => {
  const { account, chainId } = useContext(StateContext);

  return (
    <div className={classes.container}>
      <div className={classes.heading1}>Create New {offset ? "Nft" : "Collection"}</div>
      {account ? (
        <div className={classes.network}>
          <div className={classes.chain}>{supportedChains[parseInt(chainId)]?.name}</div>
          <div className={classes.address}>{`(${formatAccount(account)})`}</div>
        </div>
      ) : (
        <div className={classes.notConnected}>Not connected</div>
      )}

      <div className={classes.heading}>Next Steps</div>
      <div className={classes.innerContainer}>
        {(collection || contract === "create-new") && (
          <div className={classes.flowContainer}>
            <Indicator complete={stepId > 0} active={flow[stepId] === "create-new"} withLine />
            <div className={classes.detail}>
              <div className={classes.name}>Create Contract</div>
              <div className={classes.description}>Create new contract</div>
            </div>
          </div>
        )}
        <div className={classes.flowContainer}>
          <Indicator
            complete={offset ? stepId > 0 : stepId > 1}
            active={flow[stepId] === "upload"}
            withLine
          />
          <div className={classes.detail}>
            <div className={classes.name}>{collection ? "Upload collection" : "Upload Art"}</div>
            <div className={classes.description}>
              {collection
                ? "Upload a .json file containing your art and metadata"
                : "Upload an image file"}
            </div>
          </div>
        </div>
        {(collection || contract === "create-new") && (
          <div className={classes.flowContainer}>
            <Indicator complete={stepId > 2} active={flow[stepId] === "royalty"} withLine />
            <div className={classes.detail}>
              <div className={classes.name}>Set up Royalties</div>
              <div className={classes.description}>
                Specify who should get paid when a token is sold
              </div>
            </div>
          </div>
        )}
        <div className={classes.flowContainer}>
          <Indicator
            complete={offset ? stepId > 1 : stepId > 3}
            active={flow[stepId] === "review"}
          />
          <div className={classes.detail}>
            <div className={classes.name}>Review and Mint</div>
            <div className={classes.description}>Send transaction to mint your assets</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintFlow;
