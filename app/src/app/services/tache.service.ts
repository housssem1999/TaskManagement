import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }
  create_tache(tache){
    return this.http.post(API + 'create', tache)
  }
  delete_tache(id: any){
    return this.http.delete(API + 'delete/' + id)
  }
  update_tache(id: any, tache){
    return this.http.put(API + 'update/' + id, tache)
  }
  get_taches(){
    return this.http.get(API + 'gettaches')
  }
  get_tache(id: any){
    return this.http.get(API + 'gettache' + id)
  }
  get_tache_from_searchbar(titre: any){
    return this.http.get(API + 'search' + '?titre=' + titre)
  }  
}
