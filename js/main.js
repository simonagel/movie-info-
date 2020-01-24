$( document ).ready(function() {
    console.log( "ready!" );
    $("#searchForm").on("submit", (e) => {
        var searchText = ($("#searchText").val());
        getMovies(searchText);
        e.preventDefault();
    })
});

function getMovies(searchText){
    $.ajax({
        type: "GET",
        url:  "https://www.omdbapi.com/?apikey=f4eee305&s=" + searchText,
        //https://www.omdbapi.com/?apikey=f4eee305&s=Manhattan
        success: function (response) {
          console.log(response);
            var movies = response.Search;
            console.log("MOVIEEESSS");
           console.log(movies);
            var output = '';
            $.each(movies, (index, movie) => {
                console.log(movie);
                console.log(movie.Poster);
                let poster = movie.Poster
                let title = movie.Title
                let movieId = movie.imdbID
               // const username = 'johndoe'
               // const age = 32
    
  //  console.log(`The name of the user is ${username} and his age is ${age} and title ${title}.`)
               
                output += `
                <div class = "col-md-3"> 
                    <div class = " well text-center"> 
                        <img src = "${movie.Poster}">
                        <h6> ${movie.Title} </h6>
                        <a onclick = "movieSelected('${movie.imdbID}')" id = "link" class = "btn-primary" 
                            href = "#">Movie Info</a></div></div>
                `;

              console.log(output);
            });

            $("#movies").html(output);
            console.log(movies);

            $("img").hover(function() { 
                $(this).css("transform", "scale(1.5)"); 
            }, function() { 
                $(this).css("transform", "scale(1)"); 
            }); 
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });    
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    console.log("sessionStorage");
    console.log(sessionStorage);
    window.location = "movie.html";
    return false;
}

function getMovie(){
    let movieOneId = sessionStorage.getItem('movieId');
    $.ajax({
        type: "GET",
        url:  "https://www.omdbapi.com/?apikey=f4eee305&i=" + movieOneId,
        success: function (response) {
            let movieOne = response;     
            console.log(movieOne);
            outputOne = `
                <div class = "row1">
                   <div class = "col-md-4">
                        <img src = "${movieOne.Poster}">
                  </div>
                  <div class = "col-md-8">
                    <span>"${movieOne.Title}"</span><br>
                    <br><br>
                    <span>Genre: "${movieOne.Genre}"</span><br>
                    <span>Year: "${movieOne.Year}"</span><br>
                    <span>Runtime: "${movieOne.Runtime}"</span><br>
                    <span>Writer: "${movieOne.Writer}"</span><br>
                    <span>Director: "${movieOne.Director}"</span><br>
                    <span>Actors: "${movieOne.Actors}"</span><br>
                    <span>Country: "${movieOne.Country}"</span><br>
                    <span>imdbRating: "${movieOne.imdbRating}"</span><br>
                    <span>Awards: "${movieOne.Awards}"</span><br>
                    <legend>Synopsis:</legend> 
                    <div class = "plot">
                        <p>"${movieOne.Plot}"</p>
                    </div>
                  </div>
               </div>
            `;
            //console.log(outputOne);
            $("#movie").html(outputOne);
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });    
}


