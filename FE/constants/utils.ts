const ipfsToGateway = (ipfsUrl: string) => {
  return `https://ipfs.dmtp.tech/ipfs/${ipfsUrl
    .split("ipfs")
    .pop()
    ?.replace("://", "")}`;
};

export { ipfsToGateway };
