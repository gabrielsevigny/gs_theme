import {fixedScroll} from '../utilities/disableEnableScroll';

const $openNav = $('.c-burgerMenu, .c-navbar__bg');
const $burgerMenu = $('.c-burgerMenu');

function navbarAnim($interaction) {

    const $navbar = $('.c-navbar__nav');
    const $bg = $('.c-navbar__bg');

    if ($interaction === 'open') {
        TweenMax.to($navbar, .6, {
            x: '0%',
            ease: Power4.easeInOut
        });
        TweenMax.to($bg, .6, {
            opacity: .8,
            pointerEvents: 'auto',
            ease: Power4.easeInOut
        });
    } else if ($interaction === 'close') {

        TweenMax.to($navbar, .6, {
            x: '100%',
            clearProps: "all",
            ease: Power4.easeInOut
        });
        TweenMax.to($bg, .6, {
            opacity: 0,
            pointerEvents: 'none',
            clearProps: "all",
            ease: Power4.easeInOut
        });
    }
}

$openNav.click(function () {

    const $topBar = $('span:nth-child(1)');
    const $middleBar = $('span:nth-child(2)');
    const $bottomBar = $('span:nth-child(3)');

    if ($burgerMenu.hasClass('js-isActive')) {

        $burgerMenu.removeClass('js-isActive');
        fixedScroll('disable');
        navbarAnim('close');

        TweenMax.to($topBar, .3, {
            rotation: 0,
            ease: Power4.easeInOut
        });
        TweenMax.to($bottomBar, .3, {
            rotation: 0,
            ease: Power4.easeInOut
        });
        setTimeout(function () {
            TweenMax.to($topBar, .3, {
                y: 14,
                ease: Power4.easeInOut,
            });
            TweenMax.to($middleBar, .3, {
                opacity: 1,
                ease: Power4.easeInOut
            });
            TweenMax.to($bottomBar, .3, {
                y: -14,
                ease: Power4.easeInOut,
            });
        }, 300);
    } else {

        $burgerMenu.addClass('js-isActive');
        fixedScroll('enable');
        navbarAnim('open');

        TweenMax.to($topBar, .3, {
            y: 2,
            ease: Power4.easeInOut,
        });
        TweenMax.to($bottomBar, .3, {
            y: -2,
            ease: Power4.easeInOut,
        });
        setTimeout(function () {
            TweenMax.to($topBar, .3, {
                rotation: 45,
                ease: Power4.easeInOut
            });
            TweenMax.to($middleBar, .3, {
                opacity: 0,
                ease: Power4.easeInOut
            });
            TweenMax.to($bottomBar, .3, {
                rotation: -45,
                ease: Power4.easeInOut
            });
        }, 300);
    }
});

$(document).keyup(function (e) {

    const $topBar = $('span:nth-child(1)');
    const $middleBar = $('span:nth-child(2)');
    const $bottomBar = $('span:nth-child(3)');

    if (e.keyCode === 27) {
        
        $burgerMenu.removeClass('js-isActive');
        fixedScroll('disable');
        navbarAnim('close');

        TweenMax.to($topBar, .3, {
            rotation: 0,
            ease: Power4.easeInOut
        });
        TweenMax.to($bottomBar, .3, {
            rotation: 0,
            ease: Power4.easeInOut
        });
        setTimeout(function () {
            TweenMax.to($topBar, .3, {
                y: 14,
                ease: Power4.easeInOut,
            });
            TweenMax.to($middleBar, .3, {
                opacity: 1,
                ease: Power4.easeInOut
            });
            TweenMax.to($bottomBar, .3, {
                y: -14,
                ease: Power4.easeInOut,
            });
        }, 300);
    }
});

$(window).resize(function () {
    var width = $(window).width();
    if ($burgerMenu.hasClass('js-isActive')) {
        if (width < 991) {
            fixedScroll('enable');
        } else {
            fixedScroll('disable');
        }
    }
});