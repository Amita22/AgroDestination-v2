import { Component, OnInit } from '@angular/core';
import { SellcropsService } from '../services/sellcrops.service';
import { Scrop } from '../model/sellModel'
import { Subscription} from 'rxjs'
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewcroprequest',
  templateUrl: './viewcroprequest.component.html',
  styleUrls: ['./viewcroprequest.component.css']
})
export class ViewcroprequestComponent implements OnInit {

  scropDisplay: Scrop[] = [];
  private scropSub : Subscription;
  public message;


  constructor(public scropService:SellcropsService, private router: Router) { }

  ngOnInit() {

    
    this.scropService.getScrops();
    this.scropSub = this.scropService.getScropUpdateListener().subscribe((scropDetails:Scrop[]) => {
      console.log("sellcropDetails cards",scropDetails);
      this.scropDisplay = scropDetails
    })
  }

  farmer(){
    this.router.navigate(["/farmer"]);
  }

  notify(){
    this.message = new alert("Message has been send"); 
    this.scropService.generateMail();
    this.scropService.generateMessage();

  }

}


