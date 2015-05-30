require.config({
    baseUrl: '../',
    paths: {
        'jasmine': 'lib/jasmine/jasmine',
        'jasmine-html': 'lib/jasmine/jasmine-html',
        'jasmine-boot': 'lib/jasmine/boot'
    },
    shim: {
        'jasmine-html': {
            deps: ['jasmine'],
        },
        'jasmine-boot': {
            deps : ['jasmine', 'jasmine-html']
        }
    }
});

require(['jasmine-boot'], function () {
    require(['specs/hit_test'], function() {
        var load_event = document.createEvent('Event');  
        load_event.initEvent('load', false, false);  
        window.dispatchEvent(load_event);
    });
});