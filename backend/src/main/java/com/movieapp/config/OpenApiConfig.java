package com.movieapp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI movieApiOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Movie API Gateway")
                        .description("API Gateway para busca e consulta de filmes e séries")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Movie App Team")
                                .email("contact@movieapp.com")
                                .url("https://movieapp.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}
