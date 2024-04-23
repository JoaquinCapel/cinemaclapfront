import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/tmdb.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().pipe(
      catchError(error => {
        console.error('Error fetching movies', error);
        return throwError(error);
      })
    ).subscribe((data: any) => {
      console.log(data);  // Log the data to see what's returned
      this.movies = data.results;
    });
  }

  sortByTitle = () => {
    this.movies.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortByGenre = () => {
    this.movies.sort((a, b) => a.genre_ids[0] - b.genre_ids[0]);
  }

  sortByLanguage = () => {
    this.movies.sort((a, b) => a.original_language.localeCompare(b.original_language));
  }
}
