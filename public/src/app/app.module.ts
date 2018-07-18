// native core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx';
import { CapitalizePipe } from './capitalize.pipe'; // import our pipe here

//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios
import { apiService } from './services/api.service';
import { MessagesService } from './services/messages.service';
import { TrackerService } from './services/tracker.service';


//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { AddExcersiceComponent } from './components/add-excersice/add-excersice.component';
import { ManageExcersicesComponent } from './components/manage-excersices/manage-excersices.component';
import { EditExcersiceComponent } from './components/edit-excersice/edit-excersice.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { EditWorkoutComponent } from './components/edit-workout/edit-workout.component';
import { ViewTrackerComponent } from './components/view-tracker/view-tracker.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  //componentes
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SettingsComponent,
    CapitalizePipe,
    AddWorkoutComponent,
    AddExcersiceComponent,
    ManageExcersicesComponent,
    EditExcersiceComponent,
    WorkoutComponent,
    EditWorkoutComponent,
    ViewTrackerComponent
  ],
  // modulos y routing
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTING,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [apiService, MessagesService, TrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
