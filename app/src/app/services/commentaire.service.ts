import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private http: HttpClient) { }

  create_comment(id_user, id_tache, rest){
    return this.http.post('http://localhost:3000/add_comments/' + id_user + '/' + id_tache, rest)
  }
  get_comments(){
    return this.http.get('http://localhost:3000/get_comments')
  }
  get_comment(id_tache){
    return this.http.get('http://localhost:3000/get_comments/' + id_tache)
  }
  delete_comment(id_com){
    return this.http.delete('http://localhost:3000/delete_comment/' + id_com)
  }
  update_comment(id_com, body){
    return this.http.put('http://localhost:3000/update_comment/'+ id_com, body)
  }
}
