import { CryptoTransactions } from "./cryptoTransactions";

export class CryptoTipos {
  constructor(
    public nome?: string,
    public criptoTransactions?: CryptoTransactions[],
    public dataCadastro?: Date,
    public codigo?: number,
  ){}
}
