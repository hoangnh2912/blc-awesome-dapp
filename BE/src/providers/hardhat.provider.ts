import { run } from 'hardhat';

import { exec } from 'child_process';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const runCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, function (error, stdout, stderr) {
      if (stderr) {
        console.error(stderr);
        reject(stderr);
      }
      if (error) {
        console.error(error);
        reject(error);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
};

const compile = async () => {
  await run('clean');
  await run('compile');
};

const verify = async (
  uuid: string,
  name: string,
  address: string,
  tryTime: number = 0,
): Promise<string | undefined> => {
  if (tryTime > 5) return undefined;
  try {
    const outputLogs = await runCommand(
      `yarn hardhat verify --contract contracts/${uuid}.sol:${name} --network mumbai ${address}`,
    );
    const verifyUrl = outputLogs.split('\n').find(log => log.includes('https://'));
    return verifyUrl;
  } catch (error) {
    await sleep(3000);
    return await verify(uuid, name, address, tryTime + 1);
  }
};

export { compile, verify };
