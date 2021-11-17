import { Dispatch } from "react";
import { BigNumber } from "ethers";
import { Bridge } from "@chainsafe/chainbridge-contracts";
import { BridgeConfig } from "../../../chainbridgeConfig";
import {
  AddMessageAction,
  ResetAction,
} from "../../../reducers/TransitMessageReducer";

const handleProposalVote = (
  destinationBridge: Bridge,
  homeChainConfig: BridgeConfig,
  depositNonce: string,
  depositVotes: number,
  tokensDispatch: Dispatch<AddMessageAction | ResetAction>,
  setDepositVotes: (input: number) => void
) => {
  destinationBridge.on(
    destinationBridge.filters.ProposalVote(
      homeChainConfig.domainId,
      BigNumber.from(depositNonce),
      null,
      null
    ),
    async (originChainId, depositNonce, status, resourceId, tx) => {
      const txReceipt = await tx.getTransactionReceipt();
      if (txReceipt.status === 1) {
        setDepositVotes(depositVotes + 1);
      }
      tokensDispatch({
        type: "addMessage",
        payload: {
          address: String(txReceipt.from),
          signed: txReceipt.status === 1 ? "Confirmed" : "Rejected",
          order: parseFloat(
            `1.${txReceipt.transactionIndex}${depositVotes + 1}$`
          ),
          eventType: "Vote",
        },
      });
    }
  );
};
export default handleProposalVote;
