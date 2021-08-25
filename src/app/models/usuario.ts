export class Usuario {
  constructor(
    public codigo: number,
    public nome: string,
    public sobrenome: string,
    public login: string,
    public senha: string,
    public email: string
  ){}
}
