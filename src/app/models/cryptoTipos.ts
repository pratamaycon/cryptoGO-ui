import { CriptoTransactions } from "./criptoTransactions";

export class CryptoTipos {
  constructor(
    public nome?: string,
    public criptoTransactions?: CriptoTransactions[],
    public dataCadastro?: Date,
    public codigo?: number,
  ){}
}
