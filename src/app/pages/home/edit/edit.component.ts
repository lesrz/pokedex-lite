import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
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

  onSave(form: NgForm): void {
    // Get form value as variable for modification
    const formVal = form.value;
    // Extract values to match interface
    const abilitiesValues: { description: string; name: string }[] = [
      {
        description: formVal.firstAbilityDesc,
        name: formVal.firstAbilityName,
      },
      {
        description: formVal.secondAbilityDesc,
        name: formVal.secondAbilityName,
      },
    ];
    // Add empty string for split to work
    formVal.type += '';
    const type: string[] = formVal.type.split(/[ ,]+/);
    // A forEach function won't work due to unordered keys
    delete formVal.firstAbilityName;
    delete formVal.firstAbilityDesc;
    delete formVal.secondAbilityName;
    delete formVal.secondAbilityDesc;
    delete formVal.type;
    // Mientras programaba esta función, accidentalmente
    // creé un valor null en la base de datos y no hay
    // manera de eliminarlo desde la API
    const pokemon: Pokemon = {
      abilities: [...abilitiesValues],
      evolutionId: formVal.evolutionId,
      id: formVal.id,
      image: formVal.image,
      lvl: formVal.lvl,
      name: formVal.name,
      type: type,
    };
    this.pokedexSvc.updatePokemon(pokemon).subscribe({
      next: (res: Pokemon) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => {
        this.return();
      },
    });
  }

  return(): void {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
