import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-properties',
  templateUrl: './latest-properties.component.html',
  styleUrls: ['./latest-properties.component.css']
})
export class LatestPropertiesComponent implements OnInit {

  imgUrl: string = "assets/img/property-6.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
