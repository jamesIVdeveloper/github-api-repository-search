'use strict';

function displayRepos(responseJson, maxResults) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.value.length & i < maxResults; i++) {
        $('#results-list').append(`<li><h3>${responseJson.value[i].name}</h3><p><a href="${responseJson.value[i].url}"></a></p>`)
    }
    $('#results').removeClass('hidden');
}

function getRepos(searchCandidate, maxResults=10) {
    let requiredURL = `https://api.github.com/users/${searchCandidate}/repos`

    const url = requiredURL + '?per_page=' + maxResults;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayRepos(responseJson, maxResults))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let searchCandidate = $('#js-candidate').val();
        let maxResults = $('#js-max-results').val();
        getRepos(searchCandidate, maxResults);
    });
}

$(watchForm);

