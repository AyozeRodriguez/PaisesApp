import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

 // Indica a Typescript que tiene datos o puede ser nulo, así deja de quejarse.
  pais!: Country;

  constructor(private activatedRoute: ActivatedRoute,
  private paisService: PaisService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log)  // el tap  recoje lo que devuelve el switchMap y lo imprime por consola como le indico
      )
      .subscribe(pais => this.pais = pais)
  }

}
