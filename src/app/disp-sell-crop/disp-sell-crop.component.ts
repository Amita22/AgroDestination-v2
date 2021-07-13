import { Component, OnInit } from '@angular/core';
import { SellcropsService } from '../services/sellcrops.service';
import { Scrop } from '../model/sellModel'
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";


@Component({
  selector: 'app-disp-sell-crop',
  templateUrl: './disp-sell-crop.component.html',
  styleUrls: ['./disp-sell-crop.component.css']
})
export class DispSellCropComponent implements OnInit {

  scropDisplay: Scrop[] = [];
  private scropSub : Subscription;

  constructor(public scropService:SellcropsService) { }

  ngOnInit() {

    this.scropService.getScrops();
    this.scropSub = this.scropService.getScropUpdateListener().subscribe((scropDetails:Scrop[]) => {
      console.log("sellcropDetails cards",scropDetails);
      this.scropDisplay = scropDetails
    })
  }

  deleteItem(scropID:string){
    this.scropService.deleteSellItem(scropID);
  }

}
