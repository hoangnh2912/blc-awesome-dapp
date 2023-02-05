import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import React from "react";
import ModalComponent from "../components/modal";
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
const ModalContext = React.createContext<
  UseDisclosureProps & {
    txResult: TxResultProps;
    setTxResult: React.Dispatch<React.SetStateAction<TxResultProps>>;
  }
>({
  txResult: defaultTxResult,
  setTxResult: () => {},
});
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const disclosure = useDisclosure();
  const [txResult, setTxResult] =
    React.useState<TxResultProps>(defaultTxResult);
  return (
    <ModalContext.Provider
      value={{
        ...disclosure,
        txResult,
        setTxResult,
      }}
    >
      {children}
      <ModalComponent />
    </ModalContext.Provider>
  );
};
export default ModalContext;
