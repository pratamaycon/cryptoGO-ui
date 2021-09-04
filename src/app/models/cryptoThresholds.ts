import { CryptoTipos } from "./cryptoTipos"
import { Usuario } from "./usuario"

export class CryptoThresholds {
  constructor(
    public threshold_minimo?: number,
    public threshold_maximo?: number,
    public data_atualizacao?: Date,
    public usuario?: Usuario,
    public criptoTipos?: CryptoTipos,
    public codigo?: number
  ){}
}
