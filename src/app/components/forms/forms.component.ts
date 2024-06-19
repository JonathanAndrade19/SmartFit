import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  results = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: new FormControl('', [Validators.required]),
      showClosed: false
    })
  }

  onSubmit(){
    if(this.formGroup.valid){
      console.log("Submit ok! => ", this.formGroup.value);
    } else {
      alert('Formulário invalido, Selecione um Período do dia.');
    }
  }

  onClean(){
    this.formGroup.reset();
  }

}
