import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useMemo } from "react";
import ModalContext, { defaultTxResult } from "../contexts/modal";

const ModalComponent = () => {
  const {
    isOpen,
    onClose = () => {},
    txResult,
    setTxResult,
  } = useContext(ModalContext);

  const handleTxState = useMemo(() => {
    switch (txResult.txState) {
      case "pending":
        return (
          <>
            <ModalHeader>Transaction processing</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Spinner color="green.500" />
            </ModalBody>
          </>
        );
      case "success":
        return (
          <>
            <ModalHeader>Transaction success</ModalHeader>
            <ModalCloseButton />
            <ModalBody>TxHash: {txResult.txHash}</ModalBody>
          </>
        );
      case "error":
        return (
          <>
            <ModalHeader>Transaction error</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Reason: {txResult.reason}</Text>
            </ModalBody>
          </>
        );

      default:
        break;
    }
  }, [txResult.txState, txResult.txHash, txResult.reason]);

  useEffect(() => {
    if (!!isOpen) clearTxResult();
  }, [!!isOpen]);

  const clearTxResult = useCallback(() => {
    setTxResult(defaultTxResult);
  }, [setTxResult]);
  return (
    <Modal
      isCentered
      isOpen={!!isOpen}
      closeOnOverlayClick={false}
      onClose={onClose}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
      <ModalContent>
        {handleTxState}
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const useModal = () => {
  return useContext(ModalContext);
};
export { useModal };
export default ModalComponent;
