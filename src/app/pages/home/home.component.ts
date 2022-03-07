import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Pokemon } from './../../shared/models/pokemon';
import { PokedexService } from './pokedex.service';
import { AuthService } from '@app/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pokedex: Pokemon[] = [];
  public editPkmn!: Pokemon;
  constructor(
    public authService: AuthService,
    public pokedexSvc: PokedexService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievePokedex();
  }

  onLogout(): void {
    this.authService.logout();
  }

  retrievePokedex(): void {
    this.pokedexSvc.getAllPokemon().subscribe({
      next: (data: Pokemon[]) => {
        this.pokedex = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message); //!Remove later
      },
    });
  }

  onAdd(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onSelect(pokemon: Pokemon): void {
    this.pokedexSvc.selectedPokemon(pokemon);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
