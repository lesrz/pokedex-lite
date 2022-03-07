import { AuthService } from '@app/auth.service';
import { Pokemon } from './../../shared/models/pokemon';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  public pokemonToEdit!: Pokemon;
  constructor(private http: HttpClient, private authService: AuthService) {}
  private userId = this.authService.userValue?.userId;
  // Gets all Pokémon data for current user
  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      `${environment.apiUrl}/pokemon?userId=${this.userId}`
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<any> {
    return this.http.put(`${environment.apiUrl}/pokemon`, pokemon);
  }

  addPokemon(pokemon: Pokemon): Observable<any> {
    return this.http.post(`${environment.apiUrl}/pokemon`, pokemon);
  }

  selectedPokemon(pokemon: Pokemon): void {
    this.pokemonToEdit = pokemon;
  }

  getEditablePokemon(pokemon: Pokemon): Pokemon {
    return this.pokemonToEdit;
  }
}
