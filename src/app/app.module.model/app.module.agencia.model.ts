import { AgenciasResult } from './app.module.agencia.result.model';

export class Agencias  {
	
	constructor(
		public status: string,
		public agenciaResult: AgenciasResult
		) {
	}
}