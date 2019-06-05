import './assets/scss/app.scss'

import Popper from 'popper.js/dist/umd/popper.js';
import jquery from 'jquery'

import 'bootstrap';


jquery(function () {
    jquery(document).scroll(function () {
        var $nav = jquery(".navbar");
        $nav.toggleClass('scrolled', jquery(this).scrollTop() > $nav.height());
    });
});