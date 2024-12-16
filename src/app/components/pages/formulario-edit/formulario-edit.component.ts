import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
// import { NotifierService } from 'angular-notifier';
import { ServiciosService } from '../../common/services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-formulario-edit',
  templateUrl: './formulario-edit.component.html',
  styleUrls: ['./formulario-edit.component.scss']
})
export class FormularioEditComponent implements OnInit{
    servicioForm: FormGroup;

  
    productsUrl: any = [];

    name: any;
    description: any;
    price: any;
    information: any;
    category: any;

    id: any = null;
    titulo: string = '';
    servicio: any;
    imgServicio: any;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private http: HttpClient,
    
        private servicioServices: ServiciosService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.servicioForm = this.formBuilder.group({
            name: ['', Validators.required],
            category: ['', Validators.required],
            price: ['', [Validators.required]],
            description: ['', [Validators.required]],
            information: ['', [Validators.required]],
        });
    
    }

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');  
        console.log(this.id);
        if(this.id){
            this.titulo = 'Modificar servicio';
        }else{
            this.titulo = 'Nuevo servicio';
        }
        
        if(this.id){
            this.servicioServices.getProductoById(this.id).subscribe((data: any) => {
                this.servicio = data.data.service[0];
 
                let name = this.servicio.name;
                let categoria = this.servicio.category[0];
                let description = this.servicio.description;
                let price = this.servicio.price;
                let information = this.servicio.information[0];
                this.imgServicio = this.servicio.images.primary[0];
  
                this.servicioForm = this.formBuilder.group({
                    name: [name, Validators.required],
                    category: [categoria, Validators.required],
                    price: [price, [Validators.required]],
                    description: [description, [Validators.required]],
                    information: [information, [Validators.required]],
                });
            });
        }
    }

    regresar(){
        window.history.back();
    }

    updateServicio(): void {
        console.log(this.id);
        if (this.servicioForm.invalid) {
            this.servicioForm.markAllAsTouched();
        } else {
            let id = this.servicio.id;
            const name = this.servicioForm.get('name')?.value;
            const category = this.servicioForm.get('category')?.value;
            const price = this.servicioForm.get('price')?.value;
            const description = this.servicioForm.get('description')?.value;
            const information = this.servicioForm.get('information')?.value;

            if (this.id) {
                this.servicioServices.updateService(id, name, category, price, description, information)
                    .subscribe(
                        (data: any) => {
                            let respuesta = data[0];
                            console.log(data);
                            if (respuesta === 'error') {
                                Notify.failure('Error en la actualizacion del servicio');
                                // this.notifier.notify('error', 'Ups! Hubo un error al guardar cambios');
                                Notify.failure('Ups! Hubo un error al guardar cambios');
                            } else {
                                Notify.success('Servicio actualizado exitosamente');
                                // this.notifier.notify('success', 'Guardado exitosamente');
                                Notify.success('Guardado exitosamente');
                                this.router.navigate(['/admin']);
                            }
                        },
                        (error: HttpErrorResponse) => {
                            console.error('Error:', error);
                            // this.notifier.notify('error', 'Error en el servidor: ' + error.message);
                        }
                    );
            } else {
                this.servicioServices.createService(name, category, price, description, information)
                    .subscribe(
                        (data: any) => {
                            let respuesta = data[0];
                            console.log(data);
                            if (respuesta === 'error') {
                                // this.notifier.notify('error', 'Ups! Hubo un error al crear el servicio');
                                Notify.failure('Ups! Hubo un error al crear el servicio');
                            } else {
                                // this.notifier.notify('success', 'Creado exitosamente');
                                Notify.success('Creado exitosamente');
                                this.router.navigate(['/admin']);
                            }
                        },
                        (error: HttpErrorResponse) => {
                            console.error('Error:', error);
                            Notify.warning('Error en el servidor: ' + error.message);
                            // this.notifier.notify('error', 'Error en el servidor: ' + error.message);
                        }
                    );
            }
        }
    }
}
