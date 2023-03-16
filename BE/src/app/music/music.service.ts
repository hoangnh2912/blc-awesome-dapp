export class MusicService {
  public async mintEvent(to_address: string, id: string) {
    console.log('mintEvent', to_address, id);
  } public async mintBatchEvent(to_address: string, ids: string[]) {
    console.log('mintBatchEvent', to_address, ids);
  }
  public async transferEvent(from_address: string, to_address: string, id: string) {
    console.log('transferEvent', from_address, to_address, id);
  } public async transferBatchEvent(from_address: string, to_address: string, ids: string[]) {
    console.log('transferBatchEvent', from_address, to_address, ids);
  }
}
