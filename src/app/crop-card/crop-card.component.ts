import { Component, OnInit } from '@angular/core';
import { CropService } from '../services/crop.service';
import { Crop } from '../model/cropModel'
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";

@Component({
  selector: 'app-crop-card',
  templateUrl: './crop-card.component.html',
  styleUrls: ['./crop-card.component.css']
})
export class CropCardComponent implements OnInit {

  cropDisplay: Crop[] = [];
  private cropSub : Subscription;

  constructor(public cropService:CropService,
    private router:Router) { }

  ngOnInit() {
    this.cropService.getCrops();
    this.cropSub = this.cropService.getCropUpdateListener().subscribe((cropDetails:Crop[]) => {
      console.log("cropDetails cards",cropDetails);
      this.cropDisplay = cropDetails
    })
  }

  cropDescription(cropID:any){
    console.log(cropID);
  
     this.cropService.getCrop(cropID)
     //this.router.navigate(["/productDescription",productID])
     //this.cartService = productID
    }

}
