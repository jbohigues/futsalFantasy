import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() cards: Card[] = [];
  
  constructor() {}

  ngOnInit(): void {

  }

}
