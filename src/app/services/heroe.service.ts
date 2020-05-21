import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {
  private url = 'https://crud-angular-7042f.firebaseio.com/';

  constructor(private http: HttpClient) { }

  public saveHeore(heore: HeroeModel): Observable<any> {
    const url = `${this.url}heroes.json`;
    return this.http.post(url, heore)
      .pipe(map((response: any) => {
        heore.id = response.name
      }))
  }

  public updateHeroe(heore: HeroeModel): Observable<any>  {
    const temp = {
      ...heore
    }
    delete temp.id;
    const url = `${this.url}heroes/${heore.id}.json`;
    return this.http.put(url, temp);
  }

  public getHeroes(): Observable<any> {
    const url = `${this.url}heroes.json`
    return this.http.get(url)
      .pipe(map((response:any) => this.createArray(response)),
            delay(1500)
          )
  }

  public getHeore(id: string): Observable<any> {
    const url = `${this.url}heroes/${id}.json`;
    return this.http.get(url);
  }

  public deleteHeore(id: string): Observable<any> {
    const url = `${this.url}heroes/${id}.json`;
    return this.http.delete(url);
  }

  private createArray(heroeObject: object) {
    if (heroeObject === null) return [];

    const heroes: HeroeModel[] = [];

    Object.keys(heroeObject).forEach(key => {
      const heroe: HeroeModel = heroeObject[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }

}
