import { Lista } from "./lista";

export interface Usuario {
    codigo?: number;
    apelido: string;
    senha: string;
    listas?: Lista[];
}
