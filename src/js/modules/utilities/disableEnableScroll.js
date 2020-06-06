//DOit être importer directemnt dans le module

export function fixedScroll($action) {

    if ($action == 'enable') {

        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };

        $('body').css('overflow-y', 'hidden');

    } else if ($action == 'disable') {
        window.onscroll = function () {
        };
        $('body').css('overflow-y', 'auto');
    }

}