import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotifierModule } from 'angular-notifier';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserModule } from '@angular/platform-browser';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { ServicesComponent } from './components/common/services/services.component';
import { TopHeaderComponent } from './components/common/top-header/top-header.component';
import { ProfileAuthenticationPageComponent } from './components/pages/profile-authentication-page/profile-authentication-page.component';
import { ServicesListComponent } from './components/pages/services-list/services-list.component';
import { FormularioEditComponent } from './components/pages/formulario-edit/formulario-edit.component';
import { RegistroUsuarioComponent } from './components/pages/registro-usuario/registro-usuario.component';
//import { EmailService } from './common/services/email.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NotFoundComponent,
        ServicesComponent,
        TopHeaderComponent,
        ProfileAuthenticationPageComponent,
        ServicesListComponent,
        FormularioEditComponent,
        RegistroUsuarioComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CarouselModule,
        BrowserAnimationsModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        FormsModule,
        NgxPaginationModule,
        HttpClientModule,
        NotifierModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }