import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UserService } from '../../common/services/user.service';
import { Notify } from 'notiflix';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  return password && repeatPassword && password.value !== repeatPassword.value ? { 'passwordMismatch': true } : null;
};

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
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      }, { validators: passwordMatchValidator });
    }

    
  
    ngOnInit(): void {
      this.showNotification('success', 'Acesso Correcto');
    }

  
    public showNotification( type: string, message: string ): void {
      // this.notifier.notify( type, message );
    }


  
    crearCuenta(){
      if(this.formLogin.invalid){
        this.formLogin.markAllAsTouched();
        Notify.failure('Las contraseñas no coinciden o son menores a 8 caracteres');
        return;
      }else{
        let formulario = this.formLogin.value;
        this.userService.signup(formulario.name,formulario.email,formulario.password,formulario.repeatPassword).subscribe( (data: any) => {
          // console.log(data.status == 'success');
          console.log(data);
          if(data.status == 'success'){
            console.log(data.status)
            Notify.success('Registro de usuario exitoso');
            this.router.navigate(['/login']);
            
          }else{
            console.log(data.status)
           

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
