import { useRouter } from "next/router";
import { useState } from "react";
import Inputs from "../../../components/Create/Inputs/Inputs";
import {
  existingContract,
  newContract,
} from "../../../components/Create/Inputs/InputsSections";
import MintFlow from "../../../components/Create/MintFlow/MintFlow";
import {
  existingContractFlow,
  newContractFlow,
} from "../../../components/Create/MintFlow/MintFlowData";
import classes from "../../../styles/Create.module.css";

const OneOfOneNFT = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const flow =
    router.query.address === "create-new"
      ? newContractFlow
      : existingContractFlow;

  const collection =
    router.query.address === "create-new" ? newContract() : existingContract();

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
          handleStep={() => setStep((s) => s + 1)}
          flow={flow}
          stepId={step}
          mintType="Single"
        />
      </div>
    </div>
  );
};

export default OneOfOneNFT;
