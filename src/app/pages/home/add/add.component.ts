import { HttpErrorResponse } from '@angular/common/http';
import { AddPokemon, PokedexService } from './../pokedex.service';
import { AuthService } from '@app/auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '@app/shared/models/pokemon';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  user = this.authService.userValue;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private pokedexSvc: PokedexService
  ) {}

  ngOnInit(): void {}

  onRegister(form: NgForm): void {
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
    // Extract userId
    const userId: string = formVal.userId;
    // A forEach function won't work due to unordered keys
    delete formVal.firstAbilityName;
    delete formVal.firstAbilityDesc;
    delete formVal.secondAbilityName;
    delete formVal.secondAbilityDesc;
    delete formVal.type;
    delete formVal.userId;
    // Construct new Pokémon data
    // const pokemon: Pokemon = {
    //   abilities: [...abilitiesValues],
    //   evolutionId: formVal.evolutionId,
    //   id: formVal.id,
    //   image: formVal.image,
    //   lvl: formVal.lvl,
    //   name: formVal.name,
    //   type: type,
    // };
    // Create AddPokemon object
    const addedPokemon: AddPokemon = {
      pokemon: {
        id: formVal.id,
        name: formVal.name,
        lvl: formVal.lvl,
        evolutionId: formVal.evolutionId,
        abilities: [...abilitiesValues],
        type: type,
        image: formVal.image,
      },
      userId: userId,
    };
    // Acá no logré conseguir que el método de añadir
    // funcione.
    // Testeando en Postman, incluso ingresando el body
    // correcto, en formato JSON, crea un Pokemon con
    // valor null.
    this.pokedexSvc.addPokemon(addedPokemon).subscribe({
      next: (res: Pokemon) => {
        // console.log(res);
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
