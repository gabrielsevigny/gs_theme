var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // alert('Pour une meilleure expérience, veuillez utiliser autre navigateur qu\'internet explorer');
} else {
    function injectLinkPrefetchIn4g(url) {

        if (window.navigator.connection.effectiveType === '4g') {
            //generate link prefetch tag
            let linkTag = document.createElement('link');
            linkTag.rel = 'prefetch';
            linkTag.href = url;
            linkTag.as = 'document';

            //inject tag in the head of the document
            document.head.appendChild(linkTag);
        }
    }

    const array = [];

    $("a").each(function () {
        if (!array.includes($(this)[0].pathname)) {
            array.push($(this)[0].pathname);
            injectLinkPrefetchIn4g($(this)[0].pathname);
        }
    });

}


