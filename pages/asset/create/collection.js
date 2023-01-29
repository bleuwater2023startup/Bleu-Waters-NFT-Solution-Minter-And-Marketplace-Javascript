import { useContext, useState } from "react";
import Inputs from "../../../components/Create/Inputs/Inputs";
import MintFlow from "../../../components/Create/MintFlow/MintFlow";
import { collectionFlow } from "../../../components/Create/MintFlow/MintFlowData";
import classes from "../../../styles/Create.module.css";
import PreivewCollection from "../../../components/Create/PreviewCollection/PreviewCollection";
import { StateContext } from "../../../context/state.context";
import { newCollection } from "../../../components/Create/Inputs/InputsSections";

const CollectionNFT = () => {
  const [step, setStep] = useState(0);
  const { previewCollection, mintData } = useContext(StateContext);

  return (
    <>
      {previewCollection && <PreivewCollection assets={mintData.File} />}
      <div className={classes.container}>
        <div className={classes.mintContainer}>
          <MintFlow collection flow={collectionFlow} stepId={step} />
          <Inputs
            collection={newCollection()}
            handleStep={() => setStep((s) => s + 1)}
            flow={collectionFlow}
            stepId={step}
            mintType="Collection"
          />
        </div>
      </div>
    </>
  );
};

export default CollectionNFT;
