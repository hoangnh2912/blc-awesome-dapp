import { AbiItem } from 'web3-utils';

interface TimelockControllerInput {
  name: string;
  min_delay: number;
  proposers: string[];
  executors: string[];
  admin: string;
}

interface GovernorInput {
  name: string;
  voting_delay: number;
  voting_period: number;
  block_time: number;
  proposal_threshold: number;
  quorum_type: string;
  quorum_value: number;
  create_token: boolean;
  token_address?: string;
  timelock: boolean;
  timelock_setting?: TimelockControllerInput;
}

export { TimelockControllerInput, GovernorInput };
