/**SVGアニメーションの設定 */
jQuery(document).ready(function () {
    if (window.location.pathname == '/') {
        new Vivus('mask', {
            // type: 'oneByOne',
            type: 'scenario-sync',
            delay: 0,
            duration: 150,
            forceRender: false,
            pathTimingFunction: Vivus.EASE_OUT,
        });
    } else {
        return false;
    }
});
/**loading */
jQuery(window).on('load', function(){
    jQuery('#loading').addClass('loaded')
});
jQuery(document).ready(function () {
    function deleteTitle() {
        jQuery('#main').addClass('not-active');
    }
    setTimeout(deleteTitle, 7600);
});

/**humberger-menuの設定 */
new Vue({
    el: "#wrap",
    data: {
        active: false,
        navi: false,
        show: false,
        tabNumber: '1',

    },
    methods: {
        naviOpen: function(){
            // 現在の状態とは逆の値を代入する
            this.active = !this.active;
            this.navi = !this.navi;
            this.show = !this.show;
        },
        changeNum: function(num){
            this.tabNumber = num;
        }
        
    }
});
/**メインタイトルの消去 */
jQuery(document).ready(function(){
    jQuery('.humberger-menu').on('click', function(){
        var mainTitle = jQuery('#main');
        if (mainTitle.hasClass('is-disappear')){
            mainTitle.removeClass('is-disappear');
        } else {
            mainTitle.addClass('is-disappear');
        }
    })
})
//ページインジケーター
jQuery(document).ready(function () {
    jQuery('.global-nav a').each(function () {
        if (this.href == location.href) {
            jQuery(this).parents('li').addClass('current');
        }
    });
});

/**fullpage.jsの設定 */
jQuery(document).ready(function(){
    if(window.location.pathname == '/'){
        jQuery('#section-wrap').fullpage({
            resize: true,
            scrollingSpeed: 1000,
            fixedElements: '#particle-background',
            // fixedElements:'canvasOverlay',
            recordHistory: false,
            scrollOverflow: true,
            loopBottom: true,
            navigation: true,
        });
    }
});

/**particle.jsの設定 */
particlesJS('particle-background', {
    "particles": {

        //---------シェイプの設定-------------//
        "number": {
            "value": 43, //シェイプの数
            "density": {
                "enable": true, //シェイプの密集度を変更するか否か
                "value_area": 395 //シェイプの密集度
            }
        },
        "shape": {
            "type": "circle", //シェイプの形(circle:丸、edge:四角、triangle:三角、polygon：多角形、star：星形、image：画像)
            "stroke": {
                "width": 0, //シェイプの外線の太さ
                "color": "#ffcc00" //シェイプの外線の色
            },
            //typeをpolygonにした時の設定
            "polygon": {
                "nb_sides": 5 //多角形の角の数
            },
            //typeをimageにした時の設定
            "image": {
                "src": "images/hoge.png",
                "width": 100,
                "height": 100
            }
        },
        "color": {
            "value": "#ffffff"//シェイプの色
        },
        "opacity": {
            "value": 0.3,//シェイプの透明度
            "random": false,//シェイプの透明度をランダムにするか否か
            "anim": {
                "enable": false, //シェイプの透明度をアニメーションさせるか否か
                "speed": 1, //アニメーションのスピード
                "opacity_min": 0.1, //透明度の最小値
                "sync": false//全てのシェイプを同時にアニメーションさせるか否か
            }
        },
        "size": {
            "value": 8, //シェイプの大きさ
            "random": true, //シェイプの大きさをランダムにするか否か
            "anim": {
                "enable": false,//シェイプの大きさをアニメーションさせるか否か
                "speed": 28,//アニメーションのスピード
                "size_min": 43.16,//大きさの最小値
                "sync": false //全てのシェイプを同時にアニメーションさせるか否か
            }
        },
        //---------線の設定-------------//
        "line_linked": {
            "enable": true,//線を表示するか否か
            "distance": 150, //線をつなぐシェイプの感覚
            "color": "#ffffff", //線の色
            "opacity": 0.4, //線の透明度
            "width": 1 //線の太さ
        },

        //---------動きの設定-------------//
        "move": {
            "speed": 1.5,//シェイプの動くスピード
            "straihgt": false,//個々のシェイプの動きを止めるか否か
            "direction": "none",//エリア全体の動き
            "out_mode": "out",//エリア外に出たシェイプの動き(out, bouceより選択)
            "attract.rotateX": 600,
            "attract.rotateY": 1200,
        },
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            //---------マウスオーバー時の処理-------------//
            "onhover": {
                "enable": true,//マウスオーバーが有効か否か
                "mode": "repulse"//マウスオーバー時に発動する動き(下記modes内のgrab, repulse, bubbleより選択)
            },

            //---------クリック時の設定-------------//
            "onclick": {
                "enable": true,//クリックが有効か否か
                "mode": "push"//クリック時に発動する動き(下記modes内のgrab, repulse, bubble, push, removeより選択)
            },
        },
        "modes": {
            //---------カーソルとシェイプの間に線が表示される-------------//
            "grab": {
                "distance": 400,//カーソルからの反応距離
                "line_linked": {
                    "opacity": 1 //線の透明度
                }
            },
            //---------シェイプがカーソルから逃げる-------------//
            "repulse": {
                "distance": 200//カーソルからの反応距離
            },
            //---------シェイプが膨らむ-------------//
            "bubble": {
                "distance": 400,//カーソルからの反応距離
                "size": 40,//シェイプの膨らむ大きさ
                "opacity": 8,//膨らむシェイプの透明度
                "duration": 2, //膨らむシェイプの持続時間(onclick時のみ)
                "speed": 3//膨らむシェイプの速度(onclick時のみ)
            },
            //---------シェイプが増える-------------//
            "push": {
                "particles_nb": 4//増えるシェイプの数
            },
            //---------シェイプが減る-------------//
            "remove": {
                "particle_nb": 2//減るシェイプの数
            }
        },
    },
    "retina_detect": true,//retina displayを対応するか否か
    "resize": true//canvasのサイズ変更に合わせて拡大す縮小するか否か
}
);

/**Swiper.jsの設定 */
jQuery(document).ready(function(){
    if(window.location.pathname == '/'){
        //swiper1024px以下で起動
        let swiper;
        jQuery(window).on('load resize', function () {
            let w = jQuery(window).width();
            // 横幅1024px以下の時
            if (w <= 1024) {
                // swiperが存在すれば
                if (swiper) {
                    return;
                } else {
                    swiper = new Swiper('.blog-slider-sp', {
                        loop: true,
                        slidesPerView: 1,
                        initialSlide: 1,
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                        },
                    });
                }
                // 横幅1024px以上の時
            } else {
                // swiperがONなら
                if (swiper) {
                    // swiperを消滅させる
                    swiper.destroy();
                    swiper = undefined;
                }
            }
        });
    }
});

/**トップに戻るボタン */
jQuery(document).ready(function(){
    if(window.location.pathname == '/'){
        jQuery(".to-top").addClass("top-page");
    } else {
        jQuery(".to-top").removeClass("top-page").addClass("other-page").find("p").text("Click");
        jQuery(".other-page").click(function(){
            jQuery("body,html").animate({
                scrollTop: 0
            }, 500);
            return false;
        })
    }
})

/**モーダル画面 */
jQuery(document).ready(function(){
    jQuery('.main-image').on('click', function(){
        jQuery('.js-modal').fadeIn();
        return false;
    });
    jQuery('.center-modal').on('click', function () {
        jQuery('.modal__content').addClass('modal__content__center');
    });
    jQuery('.js-modal-close').on('click', function(){
        jQuery('.js-modal').fadeOut();
        jQuery('.modal__content').removeClass('modal__content__center');
        return false;
    });   
});