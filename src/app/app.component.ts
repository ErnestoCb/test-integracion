import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'integracion';
  url = 'https://apis.digital.gob.cl/dpa/';
  public regiones: any = [];
  public provincia: any = [];
  public comuna: any = [];
  

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.getRegiones();
  }

  

  getRegiones(){
    this.httpClient.get(this.url + 'regiones').subscribe((data) => {
      console.log(data);
      this.regiones = data;
    })
  }

  //ESTA FUNCION ME TRAE EL NUMERO DE LA REGION Y CAMBIA EL SIGUIENTE
  getProvincia(region: any){
    console.log(region.target.value);
    let regionSeleccionada : string = region.target.value;
    this.httpClient.get(this.url + 'provincias').subscribe((data: any[])=>{
      
      this.provincia = data.filter(element => {
        return element.codigo_padre == regionSeleccionada
      });
    })
  }

  getComuna(provincia: any){
    console.log(provincia.target.value);
    let provinciaSeleccionada : string = provincia.target.value;
    this.httpClient.get(this.url + 'comunas').subscribe((data: any[])=>{
      this.comuna = data.filter(element => {
        return element.codigo_padre == provinciaSeleccionada
      });
    })
  }


}
