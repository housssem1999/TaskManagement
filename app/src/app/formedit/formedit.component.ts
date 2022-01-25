import { NodeWithI18n } from '@angular/compiler';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TacheService } from '../services/tache.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'formedit',
  templateUrl: './formedit.component.html',
  styleUrls: ['./formedit.component.css']
})
export class FormeditComponent implements OnInit {
@Input () items: any;
@Input () option: String;
  modifieisopen: boolean = true
  key = JSON.parse(sessionStorage.getItem('USER_KEY'))['username']
  now_incorrect = new Date(Date.now())
  now = this.now_incorrect.getFullYear() + '-' + this.now_incorrect.getMonth() +'-'+this.now_incorrect.getDay()
  form: FormGroup;
  titre: FormControl;
  description: FormControl;
  date: FormControl;
  priorite: FormControl;
  categorie: FormControl;
  etat: FormControl;
  proprietaire: FormControl;

  constructor(private tacheService: TacheService, private UserService: UserService){}

  ngOnInit(): void {
    this.createFormControls()
    this.createForm()
   }

 createFormControls() {

  this.titre = new FormControl('', Validators.required);
  this.description = new FormControl('', Validators.required);
  this.date = new FormControl(this.now);
  this.priorite = new FormControl('', Validators.required);
  this.categorie = new FormControl('', Validators.required)
  this.etat = new FormControl('', Validators.required);
  this.proprietaire = new FormControl(this.key);
}

createForm() {
  this.form = new FormGroup({
    titre: this.titre,
    description: this.description,
    date: this.date,
    priorite: this.priorite,
    categorie: this.categorie,
    etat: this.etat,
    proprietaire: this.proprietaire
  })
}

submit(){
  if(this.option == "update"){
    console.log("d5il lil updte")
    this.update()
  }
  if(this.option == "add"){
    this.add()
  }
}

cancel(){
  this.form.reset()
  this.modifieisopen = false
}
  update(){
    this.tacheService.update_tache(this.items.id,this.form.value)
    .subscribe(data =>{
      window.location.reload();
    },err =>{
      console.log(err)
})}
  add(){
  this.tacheService.create_tache(this.form.value)
  .subscribe(data =>{
    window.location.reload();
  },err =>{
    console.log(err)
  })
  }
}