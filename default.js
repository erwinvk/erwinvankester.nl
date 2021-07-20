function init_magnificPopup() {
    $('.gallery-item').magnificPopup
        (
            {
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                
                image:
                {
                    verticalFit: true,
                    titleSrc: function (item) {
                        return '<a class="image-source-link" href="' + item.el.attr('data-permalink') + '" target="_blank">View on instagram</a>';
                    }
                },
                gallery:
                {
                    enabled: true
                },
                zoom:
                {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function (element) {
                        return element.find('img');
                    }
                }
            }
        );
}

function setEmail() {
    var email = $('.emailaddress').text();
    email = email.replace('[at]', '@');
    email = email.replace('[dot]', '.');
    $('.emailaddress').attr('href', 'mailto:' + email);
    $('.emailaddress').text(email);
}

function GetLastFmScrobbleData() {
    //$.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=erwinvk&api_key=78026a5c9cda529f9559d9e3d8c78695&format=json', function (data) {
    //maybe get total plays some time or something.
    //});

    $.getJSON('https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=erwinvk&period=3month&api_key=78026a5c9cda529f9559d9e3d8c78695&limit=5&format=json&callback=?', function (data) {
        var artistTop = data.topartists.artist;
        var html = '';
        for (var i = 0; i < artistTop.length; i++) {
            var imgArray = artistTop[i].image;
            for (var j = 0; j < imgArray.length; j++) {
                if (imgArray[j].size == 'large') {
                    html += '<li data-artist="' + artistTop[i].name + '"> <div class="artist"><div class="name">' + artistTop[i].name + '</div><div class="plays"> ' + artistTop[i].playcount + ' plays</div></div></li>';

                    //getArtistImage(artistTop10[i].name);
                }
            }
        }

        //Artists don't have valid images on the api. so get top albums and display these if they match.
        GetTopAlbums();
        $('#lastfmtop10').html(html);
    });
}

function GetTopAlbums() {
    $.getJSON('https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=erwinvk&period=3month&api_key=78026a5c9cda529f9559d9e3d8c78695&limit=30&format=json&callback=?', function (data) {
        var albumTop = data.topalbums;

        for (var i = 0; i < albumTop.album.length; i++) {
            var artist = albumTop.album[i].artist.name;

            for (var j = 0; j < albumTop.album[i].image.length; j++) {
                if ($('#lastfmtop10 li[data-artist="' + artist + '"]').length > 0 && $('#lastfmtop10 li[data-artist="' + artist + '"]').html().toString().indexOf('img src') < 0) {
                    if (albumTop.album[i].image[j].size == 'medium') {
                        $('#lastfmtop10 li[data-artist="' + artist + '"]').prepend('<img src="' + albumTop.album[i].image[j]['#text'] + '"/>')
                    }
                }
            }

            //check if we have this mbid
        }
    });
}

function GetInstagramPhotos() {
    var accesstoken = 'IGQVJWMm5HelE4Ylh2VmtLZAWVrU2N3U1RLNXZACMkU3azJkdExMczUtc2FJaE1uVG1iRVpSVmgxeElCVEg5eHN4TkpLV3h0ajVKQlJzLWdERXlsbHRzNHJYclRTMHJrU2JfRW9zRnN1MjYzdFRDaEVSYQZDZD';
    
    $.get("https://graph.instagram.com/me/media?access_token=" + accesstoken + "&fields=media_url,media_type,caption,permalink", function (data) {
        for (var i = 0; i < 10; i++) {
            $('.instafeed').append('<a class="gallery-item" data-permalink="' + data.data[i].permalink + '" href="' + data.data[i].media_url + '"><img src="' + data.data[i].media_url + '"/></a>');
        }

        init_magnificPopup();
    });
}

$(document).ready(function () {
    setEmail();

    GetInstagramPhotos();
    GetLastFmScrobbleData();
});
