import { Component , OnInit, Inject} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AgenciaService } from './app.module.service';
import { PosicaoForm } from './app.module.model/app.module.posicaoform.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AppComponent implements OnInit{

  ngOnInit(): void {
    this.buscaLocalizacao();
  }
  
  public status: string;
  totalAgencias = 0;
  title = 'Busca Agências Itaú';
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = [ 'endereco'];
  raio = 0;

  public numeroAgencia: string;
  public horario: string;
 
  constructor(private agenciaService: AgenciaService, public dialog: MatDialog) {}
 
  public buscaAgenciasPorLocalidade(raio: number) :void{
    this.buscaLocalizacao();
    console.log('=> Entrou no metodo buscaAgenciasPorLocalidade');

		this.agenciaService.buscaAgenciasPorPosicao(latitude, longitude, raio)
		.subscribe(
			resultado =>{

        var periodicArray:PeriodicElement[] = []

        for (let index = 0; index < resultado.results.length; index++) {
             periodicArray.push(new PeriodicElement(resultado.results[index].place_id, resultado.results[index].vicinity))
        }
          this.dataSource = periodicArray;
          this.totalAgencias = resultado.results.length;
			},
			erro =>{
				if(erro.status == 400){
          console.log('=> Erro ao recuperar as Agências');

          alert('=> Erro ao recuperar as Agências');
				}
			}
		)
  }	

  public buscaEGravaDadosAgencia(placeId: string) :void{
    console.log('=> Entrou no metodo buscaEGravaDadosAgencia');
    
    var posicaoForm: PosicaoForm  = new PosicaoForm(placeId, this.buscaDevice(), this.identificaNavegador() ,latitude, longitude);

		this.agenciaService.buscaEGravaDadosAgencia(posicaoForm)
		.subscribe(
			resultado =>{
        this.numeroAgencia = resultado.formatted_phone_number
        this.horario = resultado.horario

        this.openDialog();

			},
			erro =>{
				if(erro.status == 400){
          console.log('=> Erro ao recuperar informações dos dados da Agência');

          alert('=> Erro ao recuperar informações dos dados da Agência');
				}
			}
		)
  }	

  openDialog(): void {
    console.log('=> Entrou no metodo openDialog');
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '280px',
      data: {numeroAgencia: this.numeroAgencia, horario: this.horario}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
  public buscaLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else { 
      // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  public identificaNavegador(){
    console.log('=> Entrou no metodo identificaNavegador');
    var nav = navigator.userAgent.toLowerCase();

    var resultado = '';
    if(nav.indexOf("msie") != -1){
      resultado = "Internet Explorer";
    }else if(nav.indexOf("opera") != -1){
      resultado = "opera";
    }else if(nav.indexOf("mozilla") != -1){
        if(nav.indexOf("firefox") != -1){
          resultado = "firefox";
        }else if(nav.indexOf("chrome") != -1){
          resultado = "chrome";
        }else if(nav.indexOf("safari") != -1){
          resultado = "safari";
        }
    }else{
      resultado = "Navegador desconhecido!";
    }

    return resultado;
}

public buscaDevice () {
  console.log('=> Entrou no metodo buscaDevice');
  return navigator.platform;
} 

  public showPosition(position) {
    console.log('=> Entrou no metodo showPosition');
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
  }
}
class PeriodicElement {
constructor (placeId: string, endereco: string) {
  this.placeId = placeId;
  this.endereco = endereco;
}

  placeId: string;
  endereco: string;
  numero: string;
  horario: string;
}

export interface DialogData {
  horario: string;
  numeroAgencia: string;
}

@Component({
  selector: 'dialog-overview',
  templateUrl: './app.component.dialog.html',
})

export class DialogOverview {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

 var ELEMENT_DATA: PeriodicElement[] = [];
 var latitude:  string = '';
 var longitude: string = '';
