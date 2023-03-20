const ipfsToGateway = (ipfsUrl: string) => {
  return `https://ipfs.dmtp.tech/ipfs/${ipfsUrl.replace("ipfs://", "")}`;
};

export { ipfsToGateway };
