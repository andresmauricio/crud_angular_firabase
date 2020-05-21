import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroeService } from 'src/app/services/heroe.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  public heroe = new HeroeModel();  
  
  constructor(private heroeService: HeroeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.validateHeroe();
  }

  private validateHeroe(): void {
    const id =this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroeService.getHeore(id).subscribe((response: any) => {
        this.heroe = response;
        this.heroe.id = id;
      })
    }
  }

  public save(form: NgForm): void {
    if (form.invalid) return;

    Swal.fire({title:'Cargando', allowOutsideClick: false, icon: 'info'});
    Swal.showLoading();
    let request$: Observable<any>;
    
    if (this.heroe.id) {
      request$ = this.heroeService.updateHeroe(this.heroe)
    } else {
      request$ = this.heroeService.saveHeore(this.heroe)
    }

    request$.subscribe((response: any) => {
      Swal.fire({ title: this.heroe.name, text: 'Se actualizo correctamente', icon: 'success'});
    })

  }

}
