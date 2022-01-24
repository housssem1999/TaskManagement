import { Component, OnInit } from '@angular/core';
import { CommentaireService } from '../services/commentaire.service';
import { TacheService } from '../services/tache.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private tacheService: TacheService,
    private userSevice: UserService,
    private commentService: CommentaireService
){}
      taches: any =[]
      users: any =[]
      comments: any =[]

  ngOnInit(): void {
    this.getTache()
    this.getUsers()
    this.getComments()
  }

  getTache(){
    this.tacheService.get_taches().subscribe(
      data=>{
        this.taches = data   
      },(err)=>{
        console.log(err)
      })
  }
  getUsers(){
    this.userSevice.getusers().subscribe(
      data=>{
        this.users = data
      },err=>{
        console.log(err)
      })
  }
  getComments(){
    this.commentService.get_comments().subscribe(
      data=>{
        this.comments = data
        this.taches.forEach(element => {
          element.com =[]
        })
        for (let i=0;i<this.comments.length;i++){
          for(let j=0;j<this.taches.length;j++){
            if(this.comments[i].id_tache == this.taches[j].id ){
              this.taches[j].com.push(this.comments[i])
          }         
        }
      }
      },err=>{
        console.log(err)
      })
  }
}