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

/*function getArtistImage(name) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.spotify.com/v1/search?q=Radiohead&type=artist&market=NL&limit=2&offset=5",
        "method": "GET",
        "headers": {
            "Authorization": "Bearer BQAXaTai88fb8Qw0p82Zf4tRTmuezjnl_XRK3LeazmgehPFs6w7p23gPDjW-Ziti73QpP-ZH2qKYYXq_qYbtiM5pDOIuEPsn05mXuS7DfHAweZ6-IWooteBqWE37H6pjgBN3VuTVs20",
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        debugger;
    });
}*/

$(document).ready(function () {
    setEmail();

	$.get( "https://graph.instagram.com/me/media?access_token=IGQVJWNDUzLUxYN0FoQkRYRS03RXpWWjYxaHFnNmo1VG4wV2lFR1VnMUNobVFxcWRhWnlKVWZAWTkxMVy1RVzhtT0dWX3l1RTNjbnZAzcXNFU2QxRk50OWNiTlMzUGgxeWxoNHRqbHVnLUdqZAFVEX2VfNQZDZD&fields=media_url,media_type,caption,permalink", function( data ) {
		for (var i = 0; i < 10; i++)
	    {
            $('.instafeed').append('<a class="gallery-item" data-permalink="' + data.data[i].permalink + '" href="' + data.data[i].media_url + '"><img src="' + data.data[i].media_url + '"/></a>');
        }

        init_magnificPopup();
    });

    //get lastFM scrobble data
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=erwinvk&period=3month&api_key=78026a5c9cda529f9559d9e3d8c78695&limit=10&format=json&callback=?', function (data) {
        var artistTop10 = data.topartists.artist;
        var html = '';
        for (var i = 0; i < artistTop10.length; i++) {
            var imgArray = artistTop10[i].image;
            for (var j = 0; j < imgArray.length; j++) {
                if (imgArray[j].size == 'large') {
                    html += '<li data-mbid="' + artistTop10[i].mbid + '">' + artistTop10[i].name + ' ' + artistTop10[i].playcount + '</li>';

                    //getArtistImage(artistTop10[i].name);
                }
            }
        }

        $('#lastfmtop10').html(html);
        
    });
});
