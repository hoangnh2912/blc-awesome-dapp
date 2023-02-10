import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import React from "react";
import ModalTransactionComponent from "../components/modal-transaction";
type TxStateProps = "pending" | "success" | "error";

interface TxResultProps {
  content: {
    title: string;
    value: string | React.ReactNode;
  }[];
  reason: string;
  receipt?: any;
  txState: TxStateProps;
}
export const defaultTxResult: TxResultProps = {
  content: [],
  reason: "",
  receipt: {},
  txState: "pending",
};
const ModalTransactionContext = React.createContext<
  UseDisclosureProps & {
    txResult: TxResultProps;
    setTxResult: React.Dispatch<React.SetStateAction<TxResultProps>>;
  }
>({
  txResult: defaultTxResult,
  setTxResult: () => {},
});
export const ModalTransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const disclosure = useDisclosure();
  const [txResult, setTxResult] =
    React.useState<TxResultProps>(defaultTxResult);
  return (
    <ModalTransactionContext.Provider
      value={{
        ...disclosure,
        txResult,
        setTxResult,
      }}
    >
      {children}
      <ModalTransactionComponent />
    </ModalTransactionContext.Provider>
  );
};
export default ModalTransactionContext;
