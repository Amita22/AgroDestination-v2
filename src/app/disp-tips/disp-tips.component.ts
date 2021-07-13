import { Component, OnInit } from '@angular/core';
import { TipsService} from '../services/tips.service';
import {Tip} from '../model/tipsModel'
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";

@Component({
  selector: 'app-disp-tips',
  templateUrl: './disp-tips.component.html',
  styleUrls: ['./disp-tips.component.css']
})
export class DispTipsComponent implements OnInit {

  tipDisplay: Tip[] = [];
  private tipSub : Subscription;

  constructor(public tipService:TipsService, private router: Router) { }

  ngOnInit() {

    this.tipService.getTips();
    this.tipSub = this.tipService.getTipUpdateListener().subscribe((tipDetails:Tip[]) => {
      console.log("tipDetails cards",tipDetails);
      this.tipDisplay = tipDetails
    })
  }

  farmer(){
    this.router.navigate(["/farmer"]);
  }

  tipDescription(tipID:any){
    console.log(tipID);
  
     this.tipService.getTip(tipID);
    // this.router.navigate(["/productDescription",productID])
     //this.cartService = productID
    }

}
