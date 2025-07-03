package com.movieapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MovieDto(
    @JsonProperty("imdbID") String imdbId,
    @JsonProperty("Title") String title,
    @JsonProperty("Year") String year,
    @JsonProperty("Type") String type,
    @JsonProperty("Poster") String poster
) {
}
