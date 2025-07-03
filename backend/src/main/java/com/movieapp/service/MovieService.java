package com.movieapp.service;

import com.movieapp.dto.MovieDetailDto;
import com.movieapp.dto.MovieDto;
import com.movieapp.dto.SearchResponseDto;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final List<MovieDetailDto> mockMovies;

    public MovieService() {
        this.mockMovies = createMockMovies();
    }

    @Cacheable("movieSearch")
    public SearchResponseDto searchMovies(String title, String year, String type, int page) {
        List<MovieDto> filteredMovies = mockMovies.stream()
                .filter(movie -> title == null || movie.title().toLowerCase().contains(title.toLowerCase()))
                .filter(movie -> year == null || movie.year().equals(year))
                .filter(movie -> type == null || movie.type().equalsIgnoreCase(type))
                .map(this::convertToMovieDto)
                .collect(Collectors.toList());

        // Paginação simples
        int pageSize = 10;
        int start = (page - 1) * pageSize;
        int end = Math.min(start + pageSize, filteredMovies.size());
        
        List<MovieDto> paginatedMovies = new ArrayList<>();
        if (start < filteredMovies.size()) {
            paginatedMovies = filteredMovies.subList(start, end);
        }

        return new SearchResponseDto(
                paginatedMovies,
                String.valueOf(filteredMovies.size()),
                "True"
        );
    }

    @Cacheable("movieDetail")
    public Optional<MovieDetailDto> getMovieById(String imdbId) {
        return mockMovies.stream()
                .filter(movie -> movie.imdbId().equals(imdbId))
                .findFirst();
    }

    private MovieDto convertToMovieDto(MovieDetailDto detail) {
        return new MovieDto(
                detail.imdbId(),
                detail.title(),
                detail.year(),
                detail.type(),
                detail.poster()
        );
    }

    @Cacheable("allMovies")
    public SearchResponseDto getAllMovies(int page) {
        List<MovieDto> allMovies = mockMovies.stream()
                .map(movie -> new MovieDto(
                        movie.imdbId(),
                        movie.title(),
                        movie.year(),
                        movie.type(),
                        movie.poster()
                ))
                .skip((page - 1) * 10L)
                .limit(10)
                .toList();

        String totalResults = String.valueOf(mockMovies.size());
        return new SearchResponseDto(allMovies, totalResults, "True");
    }

    private List<MovieDetailDto> createMockMovies() {
        List<MovieDetailDto> movies = new ArrayList<>();
        
        movies.add(new MovieDetailDto(
                "tt0111161", "The Shawshank Redemption", "1994", "R",
                "14 Oct 1994", "142 min", "Drama",
                "Frank Darabont", "Stephen King, Frank Darabont",
                "Tim Robbins, Morgan Freeman, Bob Gunton",
                "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "English", "United States", "Nominated for 7 Oscars",
                "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
                "Internet Movie Database: 9.3/10", "82", "9.3", "2,804,105", "movie",
                "27 Mar 2001", "$16,000,000", "Castle Rock Entertainment",
                "https://www.warnerbros.com/movies/shawshank-redemption"
        ));

        movies.add(new MovieDetailDto(
                "tt0068646", "The Godfather", "1972", "R",
                "24 Mar 1972", "175 min", "Crime, Drama",
                "Francis Ford Coppola", "Mario Puzo, Francis Ford Coppola",
                "Marlon Brando, Al Pacino, James Caan",
                "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                "English, Italian", "United States", "Won 3 Oscars",
                "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
                "Internet Movie Database: 9.2/10", "100", "9.2", "1,945,213", "movie",
                "11 Oct 2001", "$134,966,411", "Paramount Pictures",
                "https://www.paramountpictures.com"
        ));

        movies.add(new MovieDetailDto(
                "tt0071562", "The Godfather Part II", "1974", "R",
                "20 Dec 1974", "202 min", "Crime, Drama",
                "Francis Ford Coppola", "Francis Ford Coppola, Mario Puzo",
                "Al Pacino, Robert Duvall, Diane Keaton",
                "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
                "English, Italian, Spanish", "United States", "Won 6 Oscars",
                "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
                "Internet Movie Database: 9.0/10", "90", "9.0", "1,346,875", "movie",
                "16 May 2006", "$57,300,000", "Paramount Pictures",
                "https://www.paramountpictures.com"
        ));

        movies.add(new MovieDetailDto(
                "tt0468569", "The Dark Knight", "2008", "PG-13",
                "18 Jul 2008", "152 min", "Action, Crime, Drama",
                "Christopher Nolan", "Jonathan Nolan, Christopher Nolan",
                "Christian Bale, Heath Ledger, Aaron Eckhart",
                "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "English, Mandarin", "United States, United Kingdom", "Won 2 Oscars",
                "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
                "Internet Movie Database: 9.0/10", "84", "9.0", "2,785,085", "movie",
                "09 Dec 2008", "$534,858,444", "Warner Bros.",
                "https://www.warnerbros.com"
        ));

        movies.add(new MovieDetailDto(
                "tt0167260", "The Lord of the Rings: The Return of the King", "2003", "PG-13",
                "17 Dec 2003", "201 min", "Action, Adventure, Drama",
                "Peter Jackson", "J.R.R. Tolkien, Fran Walsh",
                "Elijah Wood, Viggo Mortensen, Ian McKellen",
                "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
                "English, Quenya, Old English", "New Zealand, United States", "Won 11 Oscars",
                "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWI5MTktXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
                "Internet Movie Database: 9.0/10", "94", "9.0", "1,944,749", "movie",
                "26 May 2004", "$377,845,905", "New Line Cinema",
                "https://www.newline.com"
        ));

        movies.add(new MovieDetailDto(
                "tt0109830", "Forrest Gump", "1994", "PG-13",
                "06 Jul 1994", "142 min", "Drama, Romance",
                "Robert Zemeckis", "Winston Groom, Eric Roth",
                "Tom Hanks, Robin Wright, Gary Sinise",
                "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
                "English", "United States", "Won 6 Oscars",
                "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
                "Internet Movie Database: 8.8/10", "82", "8.8", "2,168,474", "movie",
                "28 Apr 2000", "$330,252,182", "Paramount Pictures",
                "https://www.paramountpictures.com"
        ));

        // Adicionando algumas séries
        movies.add(new MovieDetailDto(
                "tt0903747", "Breaking Bad", "2008–2013", "TV-MA",
                "20 Jan 2008", "49 min", "Crime, Drama, Thriller",
                "N/A", "Vince Gilligan",
                "Bryan Cranston, Aaron Paul, Anna Gunn",
                "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
                "English", "United States", "Won 2 Golden Globes",
                "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg",
                "Internet Movie Database: 9.5/10", "96", "9.5", "1,984,883", "series",
                "N/A", "N/A", "Sony Pictures Television",
                "https://www.amc.com/shows/breaking-bad"
        ));

        movies.add(new MovieDetailDto(
                "tt0944947", "Game of Thrones", "2011–2019", "TV-MA",
                "17 Apr 2011", "57 min", "Action, Adventure, Drama",
                "N/A", "David Benioff, D.B. Weiss",
                "Emilia Clarke, Peter Dinklage, Kit Harington",
                "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
                "English", "United States, United Kingdom", "Won 59 Primetime Emmys",
                "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg",
                "Internet Movie Database: 9.2/10", "94", "9.2", "2,236,506", "series",
                "N/A", "N/A", "HBO",
                "https://www.hbo.com/game-of-thrones"
        ));

        movies.add(new MovieDetailDto(
                "tt1475582", "Sherlock", "2010–2017", "TV-14",
                "25 Jul 2010", "88 min", "Crime, Drama, Mystery",
                "N/A", "Mark Gatiss, Steven Moffat",
                "Benedict Cumberbatch, Martin Freeman, Una Stubbs",
                "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
                "English", "United Kingdom", "Won 3 Primetime Emmys",
                "https://m.media-amazon.com/images/M/MV5BMWY3NTljMjEtYzRiMi00NWM2LTkzNjItZTVmZjE0MTdjMjJhL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTQ4NTc5OTU@._V1_SX300.jpg",
                "Internet Movie Database: 9.1/10", "91", "9.1", "1,046,882", "series",
                "N/A", "N/A", "BBC",
                "https://www.bbc.co.uk/programmes/b018ttws"
        ));

        movies.add(new MovieDetailDto(
                "tt1796960", "Stranger Things", "2016–2025", "TV-14",
                "15 Jul 2016", "51 min", "Drama, Fantasy, Horror",
                "N/A", "Matt Duffer, Ross Duffer",
                "Millie Bobby Brown, Finn Wolfhard, Winona Ryder",
                "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
                "English", "United States", "Won 6 Primetime Emmys",
                "https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_SX300.jpg",
                "Internet Movie Database: 8.7/10", "76", "8.7", "1,369,827", "series",
                "N/A", "N/A", "Netflix",
                "https://www.netflix.com/title/80057281"
        ));

        movies.add(new MovieDetailDto(
                "tt0110912", "Pulp Fiction", "1994", "R",
                "14 Oct 1994", "154 min", "Crime, Drama",
                "Quentin Tarantino", "Quentin Tarantino",
                "John Travolta, Uma Thurman, Samuel L. Jackson",
                "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
                "English, Spanish, French", "United States", "Won 1 Oscar. Another 69 wins & 71 nominations.",
                "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
                "Internet Movie Database: 8.9/10", "94", "8.9", "2,107,015", "movie",
                "19 May 2003", "$107,928,762", "Miramax", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0133093", "The Matrix", "1999", "R",
                "31 Mar 1999", "136 min", "Action, Sci-Fi",
                "Lana Wachowski, Lilly Wachowski", "Lilly Wachowski, Lana Wachowski",
                "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
                "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
                "English", "United States", "Won 4 Oscars. Another 37 wins & 51 nominations.",
                "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
                "Internet Movie Database: 8.7/10", "73", "8.7", "1,956,301", "movie",
                "21 Sep 1999", "$171,479,930", "Warner Bros.", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt1375666", "Inception", "2010", "PG-13",
                "16 Jul 2010", "148 min", "Action, Adventure, Sci-Fi",
                "Christopher Nolan", "Christopher Nolan",
                "Leonardo DiCaprio, Marion Cotillard, Tom Hardy",
                "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "English, Japanese, French", "United States, United Kingdom", "Won 4 Oscars. Another 152 wins & 218 nominations.",
                "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
                "Internet Movie Database: 8.8/10", "74", "8.8", "2,381,237", "movie",
                "13 Dec 2010", "$292,587,330", "Warner Bros.", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0317248", "City of God", "2002", "R",
                "13 Feb 2004", "130 min", "Crime, Drama",
                "Fernando Meirelles, Kátia Lund", "Paulo Lins, Bráulio Mantovani",
                "Alexandre Rodrigues, Leandro Firmino, Matheus Nachtergaele",
                "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
                "Portuguese", "Brazil, France", "Nominated for 4 Oscars. Another 72 wins & 50 nominations.",
                "https://m.media-amazon.com/images/M/MV5BOTMwYjc5ZmItYTFjZC00ZGQ3LWJkMTUtMzUxYTgzMzUyOTgxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
                "Internet Movie Database: 8.6/10", "79", "8.6", "753,732", "movie",
                "30 Jun 2003", "$7,564,459", "O2 Filmes", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0448115", "Shutter Island", "2010", "R",
                "19 Feb 2010", "138 min", "Mystery, Thriller",
                "Martin Scorsese", "Laeta Kalogridis, Dennis Lehane",
                "Leonardo DiCaprio, Emily Mortimer, Mark Ruffalo",
                "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
                "English, German", "United States", "13 wins & 36 nominations.",
                "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                "Internet Movie Database: 8.2/10", "63", "8.2", "1,290,778", "movie",
                "14 May 2010", "$128,012,934", "Paramount Pictures", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0099685", "Goodfellas", "1990", "R",
                "21 Sep 1990", "146 min", "Biography, Crime, Drama",
                "Martin Scorsese", "Nicholas Pileggi, Martin Scorsese",
                "Robert De Niro, Ray Liotta, Joe Pesci",
                "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
                "English, Italian", "United States", "Won 1 Oscar. Another 46 wins & 39 nominations.",
                "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
                "Internet Movie Database: 8.7/10", "90", "8.7", "1,155,770", "movie",
                "21 May 2003", "$46,836,394", "Warner Bros.", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0120815", "Saving Private Ryan", "1998", "R",
                "24 Jul 1998", "169 min", "Drama, War",
                "Steven Spielberg", "Robert Rodat",
                "Tom Hanks, Matt Damon, Tom Sizemore",
                "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
                "English, French, German, Czech", "United States", "Won 5 Oscars. Another 79 wins & 75 nominations.",
                "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
                "Internet Movie Database: 8.6/10", "91", "8.6", "1,395,996", "movie",
                "24 Sep 2007", "$216,540,909", "DreamWorks Pictures", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt1853728", "Django Unchained", "2012", "R",
                "25 Dec 2012", "165 min", "Drama, Western",
                "Quentin Tarantino", "Quentin Tarantino",
                "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio",
                "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.",
                "English, French, German, Italian", "United States", "Won 2 Oscars. Another 58 wins & 158 nominations.",
                "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg",
                "Internet Movie Database: 8.4/10", "81", "8.4", "1,530,967", "movie",
                "18 Jan 2013", "$162,805,434", "The Weinstein Company", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0816692", "Interstellar", "2014", "PG-13",
                "07 Nov 2014", "169 min", "Adventure, Drama, Sci-Fi",
                "Christopher Nolan", "Jonathan Nolan, Christopher Nolan",
                "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
                "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                "English", "United States, United Kingdom, Canada", "Won 1 Oscar. Another 44 wins & 148 nominations.",
                "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                "Internet Movie Database: 8.6/10", "74", "8.6", "1,849,896", "movie",
                "31 Mar 2015", "$188,020,017", "Paramount Pictures", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0361748", "Inglourious Basterds", "2009", "R",
                "21 Aug 2009", "153 min", "Adventure, Drama, War",
                "Quentin Tarantino", "Quentin Tarantino",
                "Brad Pitt, Diane Kruger, Eli Roth",
                "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
                "English, German, French, Italian", "United States, Germany", "Won 1 Oscar. Another 58 wins & 103 nominations.",
                "https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
                "Internet Movie Database: 8.3/10", "69", "8.3", "1,431,180", "movie",
                "19 Feb 2010", "$120,540,719", "The Weinstein Company", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0993846", "The Wolf of Wall Street", "2013", "R",
                "25 Dec 2013", "180 min", "Biography, Comedy, Crime",
                "Martin Scorsese", "Terence Winter, Jordan Belfort",
                "Leonardo DiCaprio, Jonah Hill, Margot Robbie",
                "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
                "English, French", "United States", "Nominated for 5 Oscars. Another 37 wins & 154 nominations.",
                "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX300.jpg",
                "Internet Movie Database: 8.2/10", "75", "8.2", "1,414,123", "movie",
                "09 Jan 2014", "$116,900,694", "Paramount Pictures", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt0245429", "Spirited Away", "2001", "PG",
                "20 Jul 2003", "125 min", "Animation, Adventure, Family",
                "Hayao Miyazaki", "Hayao Miyazaki",
                "Rumi Hiiragi, Miyu Irino, Mari Natsuki",
                "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
                "Japanese", "Japan", "Won 1 Oscar. Another 58 wins & 31 nominations.",
                "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                "Internet Movie Database: 9.2/10", "96", "9.2", "756,725", "movie",
                "15 Sep 2003", "$10,055,859", "Studio Ghibli", "N/A"
        ));

        movies.add(new MovieDetailDto(
                "tt6751668", "Parasite", "2019", "R",
                "08 Nov 2019", "132 min", "Comedy, Drama, Thriller",
                "Bong Joon Ho", "Bong Joon Ho, Han Jin-won",
                "Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo",
                "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
                "Korean, English", "South Korea", "Won 4 Oscars. Another 298 wins & 262 nominations.",
                "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
                "Internet Movie Database: 8.5/10", "96", "8.5", "806,494", "movie",
                "07 Feb 2020", "$53,367,375", "CJ Entertainment", "N/A"
        ));

        return movies;
    }
}
