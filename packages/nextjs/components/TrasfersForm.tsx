"use client";

import { useReducer } from "react";
import { TransfersFormAll } from "../app/debug/_components/contract/TransfersFormAll";
import { useDeployedContractInfo, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { ContractName } from "~~/utils/scaffold-eth/contract";

type ContractUIProps = {
  contractName: ContractName;
  className?: string;
};

export const TrasfersForm = ({ contractName, className = "" }: ContractUIProps) => {
  const [refreshDisplayVariables, triggerRefreshDisplayVariables] = useReducer(value => !value, false);
  const { targetNetwork } = useTargetNetwork();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);
  const networkColor = useNetworkColor();

  if (deployedContractLoading) {
    return (
      <div className="mt-14">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!deployedContractData) {
    return (
      <p className="text-3xl mt-14">
        {`No contract found by the name of "${contractName}" on chain "${targetNetwork.name}"!`}
      </p>
    );
  }
  return (
    <div className="max-w-[700px] mx-auto p-6 rounded-lg bg-black">
      <div className="p-5 divide-y divide-base-300">
        <TransfersFormAll deployedContractData={deployedContractData} onChange={triggerRefreshDisplayVariables} />
      </div>
    </div>
  );
};
