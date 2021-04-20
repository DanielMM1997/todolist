const enum stateTask {
  Pendiente = 'Pendiente',
  Proceso = 'En proceso',
  Terminado = 'Terminado'
}

export class Task {
  key?: string;
  label: string;
  priority: number;
  state: stateTask.Pendiente;
  created_at: string
}

