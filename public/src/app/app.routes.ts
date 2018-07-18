import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { AddExcersiceComponent } from './components/add-excersice/add-excersice.component';
import { ManageExcersicesComponent } from './components/manage-excersices/manage-excersices.component';
import { EditExcersiceComponent } from './components/edit-excersice/edit-excersice.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { EditWorkoutComponent } from './components/edit-workout/edit-workout.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-workout', component: AddWorkoutComponent },
  { path: 'add-excersice', component: AddExcersiceComponent },
  { path: 'manage-excersices', component: ManageExcersicesComponent },
  { path: 'excersice/edit/:id', component: EditExcersiceComponent },
  { path: 'workout/:id', component: WorkoutComponent },
  { path: 'workout/edit/:id', component: EditWorkoutComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true } );
