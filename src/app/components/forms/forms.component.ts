import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitServices: GetUnitsService){

  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: new FormControl('', [Validators.required]),
      showClosed: true
    });

    this.unitServices.getAllUnits().subscribe((data) => {
      this.results = data.locations;
      this.filteredResults = data.locations;
    });
  }

  onSubmit(){
    if(!this.formGroup.value.showClosed){
      this.filteredResults = this.results.filter(location => location.opened === true);
    } else [
      this.filteredResults = this.results
    ]
  }

  onClean(){
    this.formGroup.reset();
  }

}
