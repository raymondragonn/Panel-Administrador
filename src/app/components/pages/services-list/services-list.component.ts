import { Component } from '@angular/core';
import { ServiciosService } from '../../common/services/servicios.service';
// import { NotifierService } from 'angular-notifier';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent {

  // private readonly notifier: NotifierService;
  servicios: Array<any> = [];

  id: any;
  name: any;
  description: any;
  price: any;
  information: any;
  category: any;
  imgServicio: any;

  constructor(private servicioServices: ServiciosService,) {
      // this.notifier = notifierService;
  }

  ngOnInit(){
    this.servicioServices.getServicios().subscribe((data: any) => {
      console.log(data.data.service);
      this.servicios = data.data.service;
      // console.log(this.servicios);
      // this.servicios = data;
      // console.log(this.servicios);
    })
  }

  deleteService(servicio: any): void {
    if (confirm(`¿Está seguro de que desea eliminar el servicio: ${servicio.name}?`)) {
      this.servicioServices.deleteService(servicio.id).subscribe(data => {
        Notify.success('Servicio eliminado exitosamente');
        window.location.reload();
      });
    }
  }

  loadServices(): void {
    this.servicioServices.getServicios().subscribe(
      (data: any) => {
        this.servicios = data;
      }, 
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        // this.notifier.notify('error', 'Error al cargar los servicios: ' + error.message);
      }
    );
  }
}
