import { Router, ActivatedRoute } from '@angular/router';
import { PokedexService } from './../pokedex.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '@app/shared/models/pokemon';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  api: string = environment.apiUrl;
  pkmn: Pokemon = this.pokedexSvc.pokemonToEdit;
  constructor(
    private pokedexSvc: PokedexService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  return(): void {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
