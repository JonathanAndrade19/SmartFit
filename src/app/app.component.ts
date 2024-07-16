import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsComponent } from './components/forms/forms.component';
import { BehaviorSubject } from 'rxjs';
import { CardsListComponent } from "./components/cards-list/cards-list.component";
import { CommonModule } from '@angular/common';
import { Location } from './types/location';
import { GetUnitsService } from './services/get-units.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsComponent, CardsListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService){}

  onSubmit(){
    this.unitsList = this.unitService.getFilteredUnits();
    this.showList.next(true);
  }
}
