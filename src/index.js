import './assets/scss/app.scss'

import Popper from 'popper.js/dist/umd/popper.js';
import jquery from 'jquery'

import 'bootstrap';


jquery(function () {
    const $ = jquery;
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    function startAnimation() {
        $("[data-animate]:visible").each(function(d, e) {
            if($(e).isInViewport()) {
                $(e).addClass("animated fadeInUp");
            }
        })
    }

    /************************
     * navbar
     ************************/
    jquery(document).scroll(function () {
        var $nav = jquery(".navbar");
        $nav.toggleClass('scrolled', jquery(this).scrollTop() > $nav.height());

        startAnimation();
    });

    /************************
     * scrollspy
     ************************/
    $('body').scrollspy({target: ".navbar", offset: 50});

    $(".navbar a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {

                window.location.hash = hash;
            });

        } // End if

    });

    /************************
     * gmaps
     ************************/
    function initMap() {
        var location = new google.maps.LatLng(50.0875726, 14.4189987);

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: location,
            zoom: 16,
            panControl: false,
            zoomControl: false,
            scaleControl: false,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP
        });

        var contentString = '<div class="info-window">' +
            '<h3>Info Window Content</h3>' +
            '<div class="info-content">' +
            '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
        });

        infowindow.open(map, marker);

    }

    google.maps.event.addDomListener(window, 'load', initMap);
});