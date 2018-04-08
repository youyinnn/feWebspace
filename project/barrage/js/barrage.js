jQuery(function ($) {
    var wrapper = $('.wrapper')[0]
    var dmer = DanMuer(wrapper, {})

    function onload () {
        dmer.start();
    }
})