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

$(document).ready(function () {
	$.get( "https://graph.instagram.com/me/media?access_token=IGQVJWNDUzLUxYN0FoQkRYRS03RXpWWjYxaHFnNmo1VG4wV2lFR1VnMUNobVFxcWRhWnlKVWZAWTkxMVy1RVzhtT0dWX3l1RTNjbnZAzcXNFU2QxRk50OWNiTlMzUGgxeWxoNHRqbHVnLUdqZAFVEX2VfNQZDZD&fields=media_url,media_type,caption,permalink", function( data ) {
		for (var i = 0; i < 10; i++)
	    {
            $('.instafeed').append('<a class="gallery-item" data-permalink="' + data.data[i].permalink + '" href="' + data.data[i].media_url + '"><img src="' + data.data[i].media_url + '"/></a>');
        }

        init_magnificPopup();
    });
});