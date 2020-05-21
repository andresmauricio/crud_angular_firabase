import { Component, OnInit } from '@angular/core';
import { HeroeService } from 'src/app/services/heroe.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  public heroes: HeroeModel[] = [];
  public loading: boolean;

  constructor(private heroesServices: HeroeService) { }

  ngOnInit(): void {
    this.getHeores();
  }

  private getHeores() {
    this.loading = true;
    this.heroesServices.getHeroes().subscribe((repsonse: any) => {
      console.log(repsonse);
      this.loading = false;
      this.heroes = repsonse;
    })
  }

  public deleteHeore(heroe: HeroeModel, index: number) {
    Swal.fire({
      title:'¿Está seguro?',
      text: `Está seguro que desa borra a ${heroe.name}`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then(res => {
      if(res.value) {
        this.heroes.splice(index, 1);
        this.heroesServices.deleteHeore(heroe.id).subscribe();
      }
    })
  }

}
