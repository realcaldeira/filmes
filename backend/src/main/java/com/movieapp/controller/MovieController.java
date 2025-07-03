package com.movieapp.controller;

import com.movieapp.dto.MovieDetailDto;
import com.movieapp.dto.SearchResponseDto;
import com.movieapp.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@Tag(name = "Movies", description = "Movie API endpoints")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/search")
    @Operation(summary = "Search movies", description = "Search for movies by title with optional filters")
    @ApiResponse(responseCode = "200", description = "Search results returned successfully")
    public ResponseEntity<SearchResponseDto> searchMovies(
            @Parameter(description = "Movie title to search for", required = true)
            @RequestParam String s,
            
            @Parameter(description = "Year of release")
            @RequestParam(required = false) String y,
            
            @Parameter(description = "Type of result (movie/series)")
            @RequestParam(required = false) String type,
            
            @Parameter(description = "Page number (default: 1)")
            @RequestParam(defaultValue = "1") int page,
            
            @Parameter(description = "Plot length (short/full)")
            @RequestParam(defaultValue = "short") String plot) {
        
        SearchResponseDto response = movieService.searchMovies(s, y, type, page);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    @Operation(summary = "Get all movies", description = "Get all movies with pagination")
    @ApiResponse(responseCode = "200", description = "Movies returned successfully")
    public ResponseEntity<SearchResponseDto> getAllMovies(
            @Parameter(description = "Page number (default: 1)")
            @RequestParam(defaultValue = "1") int page) {
        
        SearchResponseDto response = movieService.getAllMovies(page);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{imdbId}")
    @Operation(summary = "Get movie details", description = "Get detailed information about a specific movie")
    @ApiResponse(responseCode = "200", description = "Movie details returned successfully")
    @ApiResponse(responseCode = "404", description = "Movie not found")
    public ResponseEntity<MovieDetailDto> getMovieById(
            @Parameter(description = "IMDb ID of the movie", required = true)
            @PathVariable String imdbId,
            
            @Parameter(description = "Plot length (short/full)")
            @RequestParam(defaultValue = "short") String plot) {
        
        return movieService.getMovieById(imdbId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
