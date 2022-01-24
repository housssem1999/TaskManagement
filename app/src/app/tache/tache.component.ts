import { Component, Input, OnInit } from '@angular/core';
import { TacheService } from '../services/tache.service';
import { CommentaireService } from '../services/commentaire.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {
  @Input () item: any;
  formisopen: boolean = false
  commentaireOpen: boolean = false
  commenUpdateOpen: boolean = false
  user = JSON.parse(sessionStorage.getItem('USER_KEY'))
  formCom: FormGroup;
  formComUpdate: FormGroup;
  body: FormControl;
  date: FormControl;
  commentService: any;
  comments: any;
  test: boolean = false
  test_com: boolean = false

constructor(private tacheService: TacheService,
            private ComService: CommentaireService,
            private UserService: UserService) { }

ngOnInit(): void {
  this.createFormControls()
  this.createForm()
  this.test = this.testDelete()
}
createFormControls() {
  this.body = new FormControl('', Validators.required);
  this.date = new FormControl(new Date(Date.now()));
}

createForm() {
  this.formCom= new FormGroup({
    body: this.body,  
    date_fin: this.date
  })
}
createFormUpdate() {
  this.formComUpdate= new FormGroup({
    body: this.body,
    date: this.date
  })
}

onEdit(){
    this.formisopen = true
  }

testDelete (){
  return (this.item.proprietaire == this.user.username)
 }

testCom (i){
  return (i == this.user.id)
 }
onDelete(){
    this.tacheService.delete_tache(this.item.id).subscribe(
      data=>{
        window.location.reload();
      },err =>{
        console.log(err)
      }
    )
  }

  cancel(){
    this.formCom.reset()
    this.commentaireOpen = false
    this.commenUpdateOpen = false
  }

  onCom(){
    this.commentaireOpen = true
  }

  EnterSubmit(event){
    if(event.keyCode == 13){
      console.log('onComment')
      this.onComment()
    }
  }

 onComment(){
   this.ComService.create_comment(this.item.id, this.user['id'], this.formCom.value).subscribe(
     data=>{
      window.location.reload();
     },err=>{
       console.log(err)
     }
   )
 }

 getComments(id_com){
  this.commentService.get_comments().subscribe(
    data=>{
      this.comments = data
    },err=>{
      console.log(err)
    })
  }
  DeleteCom(id_com){
    console.log(id_com)
    this.ComService.delete_comment(id_com).subscribe(
      data=>{
        window.location.reload() 
     },err=>{
         console.log(err) 
      }
    )
  }

  onUpdate(){
    this.commenUpdateOpen = true
    this.createFormUpdate()
  }

  UpdateCom(id_com){
    this.ComService.update_comment(id_com, this.formComUpdate.value).subscribe(
      data=>{
        window.location.reload()
      },err=>{
         console.log(err) 
      })
  }
}
