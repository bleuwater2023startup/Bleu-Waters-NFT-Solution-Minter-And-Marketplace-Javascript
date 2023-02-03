import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Inputs from "../../../components/Create/Inputs/Inputs";
import { existingContract, newContract } from "../../../components/Create/Inputs/InputsSections";
import MintFlow from "../../../components/Create/MintFlow/MintFlow";
import {
  existingContractFlow,
  newContractFlow,
} from "../../../components/Create/MintFlow/MintFlowData";
import { setMintData } from "../../../context/state.actions";
import { StateContext } from "../../../context/state.context";
import classes from "../../../styles/Create.module.css";

const OneOfOneNFT = () => {
  const { dispatch, mintData } = useContext(StateContext);
  const router = useRouter();
  const [step, setStep] = useState(0);

  const flow = router.query.address === "create-new" ? newContractFlow : existingContractFlow;

  const collection = router.query.address === "create-new" ? newContract() : existingContract();

  useEffect(() => {
    let storedMintData = window.localStorage.getItem("mint_data");
    storedMintData = JSON.parse(storedMintData);
    dispatch(setMintData({ ...mintData, ...storedMintData, File: null }));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.mintContainer}>
        <MintFlow
          contract={router.query.address}
          stepId={step}
          flow={flow}
          offset={router.query.address === "existing"}
        />
        <Inputs
          collection={collection}
          handleStep={(val) => setStep((s) => (val ? val : s + 1))}
          flow={flow}
          stepId={step}
          mintType="Single"
        />
      </div>
    </div>
  );
};

export default OneOfOneNFT;
