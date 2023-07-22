function showResult() {
    // kosongin setiap kali diklik
    $('#movie-list').html('');
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '82d098f2',
            's': $('#search-input').val()
        },
        success: function(result) {
            if(result.Response == "True") {
                let movies = result.Search;
                // console.log(movies);
                $.each(movies, function(i, data) {
                    console.log(data);
                    $('#movie-list').append(`
                    <div class="col-md-4">

                        <div class="card mb-3">
                            <img src="` + data.Poster + `" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">` + data.Title + `</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">`+ data.Year +`</h6>
                            

                            <button type="button" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.imdbID + `">
                            See Detail
                            </button>
                            </div>
                        </div>

                  </div>
                    `);
                });

                // hapus search bar

                $('#search-input').val('');
            }
            else {
                $('#movie-list').html(`
                <div class="col">
                <h2 class="text-center">` + result.Error +`</h2>
                </div>
                `);
            }
        }
    });
}

$('#search-btn').on('click', function() {
    showResult();
});

// biar kalo enter, bisa kepencet search jg
$('#search-input').on('keyup', function(event) {
    if(event.keyCode === 13) { // cuma saat pencet enter
        showResult();
    }
    
});

// kalo see detail diklik

// ada bindingnya, jd pindahin ke parent yaitu movie list
// lalu tambahin parameter see detail

// ini namanya event delegation
$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '82d098f2',
            // this adalah tombol yg diklik
            'i': $(this).data('id')
        },
        success: function(movie) {
            console.log(movie.imdbID);
            if(movie.Response === "True") {
                console.log('ok');
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster + `" class="card-img-top img-fluid" alt="">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                <li class="list-group-item">Title: ` + movie.Title + `</li>
                                <li class="list-group-item">Released: ` + movie.Released + `</li>
                                <li class="list-group-item">Genre: ` + movie.Genre + `</li>
                                <li class="list-group-item">Director: ` + movie.Director + `</li>
                                <li class="list-group-item">Actors: ` + movie.Actors + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});