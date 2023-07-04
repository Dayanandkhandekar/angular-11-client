import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from './home/DialogBox/dialog-box.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ClientAddComponent } from './addClient/client-add.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CdkColumnDef } from '@angular/cdk/table';
import { AuthService } from './_services/auth.service';
import { ClientService } from './_services/client.service';
import { LayoutUtilsService } from './utils/layout-utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateStatusDialogComponent } from './view/content/crud/update-status-dialog/update-status-dialog.component';
import { DeleteEntityDialogComponent } from './view/content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { FetchEntityDialogComponent } from './view/content/crud/fetch-entity-dialog/fetch-entity-dialog.component';
import { ActionNotificationComponent, AlertComponent } from './view/content/crud';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { environment } from '../environments/environment';
import { TranslatePipe } from './translate/translate.pipe';
import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translations';
import { HTTPReqInterceptor } from './Interceptor/httpreq-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    DialogBoxComponent,
    ClientAddComponent,
    UpdateStatusDialogComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    AlertComponent,
    ActionNotificationComponent,
    TranslatePipe
    
    
    //ConvertToSpacesPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
	 MatProgressSpinnerModule,
   
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    
    Ng2SearchPipeModule,
    //TranslateModule.forRoot({

      // loader:{
      //   provide:TranslateLoader,
      //   useFactory:createTranslateLoader,
      //   deps:[HttpClient]
      // }
    //})
    //tran
    
    
   
    //TranslateModule.forRoot(),
    ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: "toast-bottom-right",
			preventDuplicates: true,
		}),
    MatPaginatorModule,
   
		
    
    
  ],
  providers: [authInterceptorProviders,
    AuthService,
		ClientService,
		CdkColumnDef,
    LayoutUtilsService,
    TRANSLATION_PROVIDERS, TranslateService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HTTPReqInterceptor, 
    multi: true
    },
      
  ],
  bootstrap: [AppComponent],
  entryComponents: [ActionNotificationComponent, DeleteEntityDialogComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
