import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {
  formLogin: FormGroup;
  
    constructor(private router: Router,private fb: FormBuilder,private userService: UserService) {
      // this.notifier = notifier;
      this.formLogin = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      })
    }
  
    ngOnInit(): void {
      
    }

  
    public showNotification( type: string, message: string ): void {
      // this.notifier.notify( type, message );
    }
  
    crearCuenta(){
      if(this.formLogin.invalid){
        this.formLogin.markAllAsTouched();
        return;
      }else{
        let formulario = this.formLogin.value;
        this.userService.signup(formulario.name,formulario.email,formulario.password,formulario.repeatPassword).subscribe( (data: any) => {
          // console.log(data.status == 'success');
          console.log(data);
          if(data.status == 'success'){
            console.log(data.status)
            this.router.navigate(['/login']);
            this.showNotification('success', 'Acesso Correcto');
          }else{
            console.log('error');
            this.showNotification('error', 'Error checa tus credenciales sean las correctas');

          }
          // let respuesta = data[0];
          // console.log(data);
          // if(respuesta == 'error'){
          //   this.showNotification('error', 'Error checa tus credenciales sean las correctas');
          // }else{
          //   this.showNotification('success', 'Acesso Correcto');
          //   localStorage.setItem('usuario', JSON.stringify(data.user.user))
          //   this.router.navigate(['/admin']);
          // }
        })
      }
  
      // //Checa si existe el usuario
      // this.userService.existsUser('hola').subscribe( data => {
      //   this.showNotification('success', 'Acesso Correct');
      // },(err: any)=> {
      //   this.showNotification('error', 'Error checa tus credenciales sean las correctas');
      // })
    
  
    }
  
    IniciarSession(){
      this.router.navigate(['/login']);
    }
}
