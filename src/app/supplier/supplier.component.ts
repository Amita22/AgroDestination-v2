import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CropService } from '../services/crop.service'
import { Crop } from '../model/cropModel'


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  form: FormGroup;

  constructor(public cropService:CropService,
    public route:ActivatedRoute) { }

  ngOnInit() {
  

  this.form = new FormGroup({
    title: new FormControl(null,{validators:[Validators.required]
    }),
    
    quantity: new FormControl(null,{validators:[Validators.required]
    }),

    description:new FormControl(null,{validators:[Validators.required]
    }),

    imagePath:new FormControl(null,{validators:[Validators.required]
    }),
  });
}


onSaveProduct(){
  if(this.form.invalid){
    return;
  }

  this.cropService.addCrop(
    this.form.value.title,
    this.form.value.description,
    this.form.value.quantity,
    this.form.value.imagePath
  )
   
}



}
