import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private unitServices: GetUnitsService, 
    private filterUnitsServices: FilterUnitsService){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: new FormControl('', [Validators.required]),
      showClosed: true
    });

    this.unitServices.getAllUnits().subscribe((data) => {
      this.results = data;
      this.filteredResults = data;
    });
  }  

  onSubmit(): void{
    let { showClosed, hour } = this.formGroup.value
    this.filteredResults = this.filterUnitsServices.filter(this.results, showClosed, hour);
    this.unitServices.setFilteredUnits(this.filteredResults);
    
    this.submitEvent.emit();
  }

  onClean(){
    this.formGroup.reset();
  }

}
