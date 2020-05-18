
// Setup those, if don't know how : read the README.md
const access_key_ipstack = 'e5bfaa9dbeb79a3d617ac59a4c535bb4';
const access_token_mapbox = 'pk.eyJ1IjoidG90b2NwdGJnbiIsImEiOiJja2FhOWt4cWYwdW9tMndxd2R5OTNlcXo3In0.feZrY2W9vXWB_svBfbVpBw';

const timeout_delay = 5; // In seconds

$(document).ready(function () {
    var successfull = false;
    var data_ = [];

    $.get('https://api.ipify.org?format=json', function(data) {
        let ipstack_url = 'http://api.ipstack.com/' + data.ip + '?access_key=' + access_key_ipstack;
        $.ajax({
            url: ipstack_url,
            headers: {'Access-Control-Allow-Origin' : '*'},
            dataType: 'jsonp',
            success: function(data_2) {
                data_ = data_2;
                mapboxgl.accessToken = access_token_mapbox;
                let map = new mapboxgl.Map({
                    container: 'map',
                    center: [data_2.longitude, data_2.latitude],
                    pitch: 30,
                    zoom: 7
                });
                var style = 'streets-v11'; // light-v10, dark-v10, outdoors-v11, satellite-v9, streets-v11
                map.setStyle('mapbox://styles/mapbox/' + style);
                
                var el = document.createElement('div');
                el.className = 'marker';

                new mapboxgl.Marker(el)
                    .setLngLat([data_2.longitude, data_2.latitude])
                    .addTo(map);


                $('#log').html('<p>IP : <span class="infos">' + data.ip + '</span></p>');
                $('#log').html($('#log').html() + '<hr><p>Country : <span class="infos">' + data_2.country_name + ' ' + data_2.location.country_flag_emoji + '</span></p><hr><p>Near from <span class="infos">' + data_2.city + '</span></p>');
                
                $(document).ready(function () {
                    $('body').fadeTo( "slow" , 3, function() {
                        successfull = true;
                    });
                });

                $('#pop').popover({
                    trigger: 'hover',
                    content: 'This website finds your location from information based on your IP address. The position might therefore not be very accurate.',
                    placement: 'right'
                });
            
            
                let set_light_theme = function () { 
                    map.setStyle('mapbox://styles/mapbox/streets-v11');
                    $('body').css('background-color', 'white');
                    $('.theme').css('color', 'black');
                    $('.theme').css('background-color', '');
                    $('.theme').css('border-color', '');
                    $('.infos').css('color', '#696969');
                    $('hr').css('border-top-color', '#ececf6');
                };
            
                let set_dark_theme = function () { 
                    map.setStyle('mapbox://styles/mapbox/dark-v10');
                    $('body').css('background-color', '#121212');
                    $('.theme').css('color', 'white');
                    $('.theme').css('background-color', '#121212');
                    $('.theme').css('border-color', '#121212');
                    $('.infos').css('color', '#969696');
                    $('hr').css('border-top-color', '#373737');
                    $('svg').css('color', '#969696');
                }
            
                let switch_state = true;
                $('#switch').click(function () { 
                    switch_state = !switch_state;
                    if (switch_state) {
                        set_light_theme();
                    } else {
                        set_dark_theme()
                    }
                });
                set_light_theme();
            }
        });
    });

    let compt = 0;
    let handle = function(){
        if (!successfull) {
            $("#main").remove();
            var error_html = 
                '<div class="container"><br><br><div class="alert alert-light" role="alert">' +
                '<h1 class="alert-heading" style="color:black">⚠️&nbsp;&nbsp;Oh no...</h1>' +
                '<hr><p>Something wrong happened... Try to disable your browser add-ons and refresh.</p></div>';
            $("body").append(error_html);
            $("body").css("font-family", "");
            $('body').fadeTo( "slow" , 1);
        }

        $.post('/retrieve_data', {'data': data_});
    };
    let rec = function () {
        if (successfull) {
            return handle();
        } else {
            if (compt >= timeout_delay) return handle();
            compt++;
            setTimeout(rec, 1000);
        }
    };
    rec();
});