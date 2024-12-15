import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
// import { NotifierModule, NotifierOptions, NotifierService  } from 'angular-notifier';
import { Router } from '@angular/router';
// import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix';


@Component({
  selector: 'app-profile-authentication-page',
  templateUrl: './profile-authentication-page.component.html',
  styleUrls: ['./profile-authentication-page.component.scss']
})
export class ProfileAuthenticationPageComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private router: Router,private fb: FormBuilder,private userService: UserService) {
    
    this.formLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    Notify.success('Sol lucet omnibus');
  }
  

  mandarFormulario(){
    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      return;
    }else{
      this.userService.login(this.formLogin.value.email,this.formLogin.value.password).subscribe( (data: any) => {
        console.log(data);
        if(data.status == 'success'){
          this.router.navigate(['/admin']);
          // localStorage.setItem('token', data.data.token);
          localStorage.setItem('usuario', JSON.stringify(data.data.user.name));
        }else{
          // this.showNotification('error', data.message);
        }
      })
    }

    // //Checa si existe el usuario
    // this.userService.existsUser('hola').subscribe( data => {
    //   this.showNotification('success', 'Acesso Correct');
    // },(err: any)=> {
    //   this.showNotification('error', 'Error checa tus credenciales sean las correctas');
    // })
  

  }

  crearCuenta(){
    this.router.navigate(['/register']);
  }
}
