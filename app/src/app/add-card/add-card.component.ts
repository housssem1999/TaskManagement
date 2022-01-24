import { Component, OnInit } from '@angular/core';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  formisOpen: boolean = false
  form: object

  constructor(private tacheService: TacheService) { }

  ngOnInit(): void {
  }
  onClick(){
    this.formisOpen = true
  }


}
