interface SubmitPrivateKeyInput {
  privateKey: string;
  address: string;
}
interface GetPrivateKeyInput {
  address: string;
}

interface SubmitPrivateKeyOutput {
  success: boolean;
}

interface GetPrivateKeyOutput {
  privateKey: string;
}

export { SubmitPrivateKeyInput, GetPrivateKeyInput, SubmitPrivateKeyOutput, GetPrivateKeyOutput };
