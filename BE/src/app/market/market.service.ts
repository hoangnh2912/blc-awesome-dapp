export class MarketService {
    public async listSong(id: string, seller: string, price: string, amount: string, uri: string) { 
        console.log('listSong', id, seller, price, amount, uri);
    }

    public async createBuyHistory(id: string, buyer: string) {
        console.log('createBuyHistory', id, buyer);
     }
}
