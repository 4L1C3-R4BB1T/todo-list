import { Tarefa } from "./tarefa";

export interface Lista {
    codigo?: number;
    titulo: string;
    dataCriacao?: string;
    usuarioId: number;
    tarefas?: Tarefa[];
    feitas?: number;
    naoFeitas?: number;
    vencidas?: number;
}
