/**
 * Sticky Navbar
 * Permet la vérification du scroll et ajouter une class si plus haut de 100px
 */

export function stickyNav() {
    if (Math.floor(window.scrollY) > 100) {
        $('.c-navbar').addClass('js-isSticky');
    }

    $(window).on('scroll', function () {

        let $windowScroll = Math.floor(window.scrollY);
        let $navbar = $('.c-navbar');

        if ($windowScroll < 100) {
            $navbar.removeClass('js-isSticky');
        } else {
            $navbar.addClass('js-isSticky');
        }
    });
}