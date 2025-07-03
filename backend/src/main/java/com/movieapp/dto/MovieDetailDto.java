package com.movieapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MovieDetailDto(
    @JsonProperty("imdbID") String imdbId,
    @JsonProperty("Title") String title,
    @JsonProperty("Year") String year,
    @JsonProperty("Rated") String rated,
    @JsonProperty("Released") String released,
    @JsonProperty("Runtime") String runtime,
    @JsonProperty("Genre") String genre,
    @JsonProperty("Director") String director,
    @JsonProperty("Writer") String writer,
    @JsonProperty("Actors") String actors,
    @JsonProperty("Plot") String plot,
    @JsonProperty("Language") String language,
    @JsonProperty("Country") String country,
    @JsonProperty("Awards") String awards,
    @JsonProperty("Poster") String poster,
    @JsonProperty("Ratings") String ratings,
    @JsonProperty("Metascore") String metascore,
    @JsonProperty("imdbRating") String imdbRating,
    @JsonProperty("imdbVotes") String imdbVotes,
    @JsonProperty("Type") String type,
    @JsonProperty("DVD") String dvd,
    @JsonProperty("BoxOffice") String boxOffice,
    @JsonProperty("Production") String production,
    @JsonProperty("Website") String website
) {
}
