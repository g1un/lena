(function(){
"use strict";
App.run(function(){
    $(document).ready(function() {

        var tweenDestroyed = true;

        if($(window).width() > 640) {
            var controller = new ScrollMagic.Controller();

            // build tween posts
            var tween = new TimelineMax ()
                .add([
                    TweenMax.fromTo(".post-0", 1, {y: 70}, {y: 0, ease: Linear.easeNone}),
                    TweenMax.fromTo(".post-1", 1, {y: 170}, {y: -50, ease: Linear.easeNone}),
                    TweenMax.fromTo(".post-2", 1, {y: 270}, {y: -170, ease: Linear.easeNone}),
                    TweenMax.fromTo(".post-3", 1, {y: 40}, {y: -120, ease: Linear.easeNone}),
                    // TweenMax.fromTo(".image-0", 1, {y: 220}, {y: -170, ease: Linear.easeNone}),
                    // TweenMax.fromTo(".image-1", 1, {y: 50}, {y: -50, ease: Linear.easeNone}),
                    // TweenMax.fromTo(".image-2", 1, {y: 220}, {y: -270, ease: Linear.easeNone}),
                    // TweenMax.fromTo(".instagram-image.image-8", 1, {y: 150}, {y: -50, ease: Linear.easeNone}),
                    // TweenMax.fromTo(".instagram-image.image-9", 1, {y: 120}, {y: -70, ease: Linear.easeNone}),
                ]);

            var containerScene1 = new ScrollMagic.Scene({
                triggerElement: '.js-parallax-1',
                duration: 1100
            })
                .setTween(tween)
                .triggerHook(0.7)
                .addTo(controller);

            // build tween images
            var tween1 = new TimelineMax ()
                .add([
                    TweenMax.fromTo(".image-0", 1, {y: 220}, {y: -170, ease: Linear.easeNone}),
                    TweenMax.fromTo(".image-1", 1, {y: 50}, {y: -50, ease: Linear.easeNone}),
                    TweenMax.fromTo(".image-2", 1, {y: 220}, {y: -270, ease: Linear.easeNone})
                ]);

            var containerScene2 = new ScrollMagic.Scene({
                triggerElement: '.js-parallax-2',
                duration: 1100
            })
                .setTween(tween1)
                .triggerHook(0.7)
                .addTo(controller);

            tweenDestroyed = false;
        }

        App.onResize(function() {
            if($(window).width() <= 640 && !tweenDestroyed) {
                containerScene1.destroy(true);
                containerScene2.destroy(true);
                console.log($(window).width());
                tweenDestroyed = true;
            } else if($(window).width() > 640 && tweenDestroyed) {
                var controller = new ScrollMagic.Controller();

                // build tween posts
                var tween = new TimelineMax ()
                    .add([
                        TweenMax.fromTo(".post-0", 1, {y: 70}, {y: 0, ease: Linear.easeNone}),
                        TweenMax.fromTo(".post-1", 1, {y: 170}, {y: -50, ease: Linear.easeNone}),
                        TweenMax.fromTo(".post-2", 1, {y: 270}, {y: -170, ease: Linear.easeNone}),
                        TweenMax.fromTo(".post-3", 1, {y: 40}, {y: -120, ease: Linear.easeNone}),
                        // TweenMax.fromTo(".image-0", 1, {y: 220}, {y: -170, ease: Linear.easeNone}),
                        // TweenMax.fromTo(".image-1", 1, {y: 50}, {y: -50, ease: Linear.easeNone}),
                        // TweenMax.fromTo(".image-2", 1, {y: 220}, {y: -270, ease: Linear.easeNone}),
                        // TweenMax.fromTo(".instagram-image.image-8", 1, {y: 150}, {y: -50, ease: Linear.easeNone}),
                        // TweenMax.fromTo(".instagram-image.image-9", 1, {y: 120}, {y: -70, ease: Linear.easeNone}),
                    ]);

                var containerScene1 = new ScrollMagic.Scene({
                    triggerElement: '.js-parallax-1',
                    duration: 1100
                })
                    .setTween(tween)
                    .triggerHook(0.7)
                    .addTo(controller);

                // build tween images
                var tween1 = new TimelineMax ()
                    .add([
                        TweenMax.fromTo(".image-0", 1, {y: 220}, {y: -170, ease: Linear.easeNone}),
                        TweenMax.fromTo(".image-1", 1, {y: 50}, {y: -50, ease: Linear.easeNone}),
                        TweenMax.fromTo(".image-2", 1, {y: 220}, {y: -270, ease: Linear.easeNone})
                    ]);

                var containerScene2 = new ScrollMagic.Scene({
                    triggerElement: '.js-parallax-2',
                    duration: 1100
                })
                    .setTween(tween1)
                    .triggerHook(0.7)
                    .addTo(controller);

                tweenDestroyed = false;
            }
        });
    });
});


})();