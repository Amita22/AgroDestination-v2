import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router } from '@angular/router';

import { TipsService } from '../services/tips.service'
import { Tip }  from '../model/tipsModel'

@Component({
  selector: 'app-farming-tips',
  templateUrl: './farming-tips.component.html',
  styleUrls: ['./farming-tips.component.css']
})
export class FarmingTipsComponent implements OnInit {

  form: FormGroup;

  constructor(public tipsService:TipsService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,{validators:[Validators.required]
      }),
  
      description:new FormControl(null,{validators:[Validators.required]
      }),
  
    });
  }

  admin(){
    this.router.navigate(["/admin"]);
  }

  onSaveTip(){
    if(this.form.invalid){
      return;
    }

    this.tipsService.addTip(
      this.form.value.title,
      this.form.value.description,
      
    )
     
  }

}
