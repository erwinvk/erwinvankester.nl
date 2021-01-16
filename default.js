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
		for (var i = 0; i < data.data.length; i++)
	    {
            $('.instafeed').append('<a class="gallery-item" href="' + data.data[i].media_url + '"><img src="' + data.data[i].media_url + '"/></a>');
        }

        init_magnificPopup();
    });
});