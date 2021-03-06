import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://afroconexoes.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://afroconexoes.herokuapp.com/usuarios/cadastrar', user)
  }

  atualizar(user: User): Observable<User> {
    return this.http.put<User>('https://afroconexoes.herokuapp.com/usuarios', user, this.token)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://afroconexoes.herokuapp.com/usuarios/${id}`,{
      headers: {'Authorization':environment.token}
    })
  }

  logado() {
    let ok = false

    if (environment.token != '') {
      ok = true
    }

    return ok
  }

  fotoIsPresent() {
    let ok = false

    if (environment.foto != '' && environment.foto != null) {
      ok = true
    }
    
    return ok

  }

  fotoIsNotPresent() {
    let ok = false

    if (environment.foto == null) {
      ok = true
    }
    
    return ok

  }

  adm() {
    let ok = false

    if(environment.tipo == "adm") {
      ok = true
    }

    return ok
    
  }

}
