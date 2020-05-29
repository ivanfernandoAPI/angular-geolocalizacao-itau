import { AgenciasResult } from './app.module.agencia.result.model';

export class DadosAgencia  {
	
	constructor(
		public formatted_phone_number: string,
		public name: string
		) {
	}
}