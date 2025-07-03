package com.movieapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record SearchResponseDto(
    @JsonProperty("Search") List<MovieDto> search,
    @JsonProperty("totalResults") String totalResults,
    @JsonProperty("Response") String response
) {
}
