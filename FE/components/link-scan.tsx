import { Link } from "@chakra-ui/react";
const LinkScan = ({
  transactionHash,
  address,
}: {
  transactionHash?: string;
  address?: string;
}) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={
        transactionHash
          ? `https://mumbai.polygonscan.com/tx/${transactionHash}`
          : `https://mumbai.polygonscan.com/address/${address}`
      }
    >
      {transactionHash}
    </Link>
  );
};

export default LinkScan;
