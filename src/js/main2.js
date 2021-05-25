/**
 * 
 * 
 * ページごとのイベント分岐に必要な要素を取得
 * 
 */
const listMenu = document.querySelector('.list-menu');
const container = document.querySelector('.container');
const slides = document.querySelector('.slides');
const canvas = document.getElementById('siteTopAnimation');
const mainVisual = document.querySelector('.main-visual');
const swiper = document.querySelector('.swiper-container');
const title =document.querySelectorAll('.accordion-title');
const svg = document.getElementById('svg');
const scrollOn = document.querySelectorAll('.content__block');
const gMenu = document.querySelector('.js-gMenu');
const circleBg = document.querySelector('.circle-bg');
let paginationCurrent = document.querySelector('.page-current');
let paginationTotal = document.querySelector('.page-total');
const scrollContainer = document.querySelector('.scroll-container');

mouseStorker();
mouseHover();
menuOpen();


/**
 * 
 * ローディングスプラッシュアニメーション
 * 
 */
window.addEventListener('load', function(){
    document.body.classList.add('appear');
});
/***
 * 
 * マウス追従カーソル
 * 
 */
function mouseStorker(){
    if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
        const cursor = document.querySelector(".js-cursor");
        const follower = document.querySelector(".js-follower");
        const link = document.querySelectorAll("a");
        const target = document.querySelectorAll('.hoverTarget');
        console.log(target);
        console.log(cursor);
        console.log(follower);
    
        let posX = 0;
        let posY = 0;
        let mouseX = 0;
        let mouseY = 0;
    
        gsap.to({}, 0.007, {
        repeat: -1,
        onRepeat: function () {
            posX += (mouseX - posX) / 8;
            posY += (mouseY - posY) / 8;
    
            gsap.set(follower, {
            css: {
                top: posY - 20,
                left: posX - 20
            }
            });
    
            gsap.set(cursor, {
            css: {
                top: mouseY,
                left: mouseX
            }
            });
        }
        });
    
        window.addEventListener("mousemove", (e) => {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });
    
        // マウスオーバー時の処理
        link.forEach(function(item){
            item.onmouseover = function(){
                follower.classList.add('is-hover');
            }
            item.onmouseout = function(){
                follower.classList.remove('is-hover');
            }
        });
        target.forEach(function(item){
            item.onmouseover = function(){
                follower.classList.add('is-hover');
            }
            item.onmouseout = function(){
                follower.classList.remove('is-hover');
            }
        });
    }
}
/**
 * 
 * 
 * galleryページ リンクホバーアニメーション
 * * 
 */
 function mouseHover(){
    const galleryLink = document.querySelectorAll('.gallery-item__link');
    const galleryImage = document.querySelectorAll('.gallery-item__image');
    galleryLink.forEach(function(item, index){
        item.onmouseover = function() {
            var index = [].slice.call(galleryLink).indexOf(item);
            console.log(index);
            let imageIndex = galleryImage[index];
            console.log(imageIndex);
            imageIndex.classList.add('is-hover');
            
        }
        item.onmouseout = function(){
            var index = [].slice.call(galleryLink).indexOf(item);
            console.log(index);
            let imageIndex = galleryImage[index];
            imageIndex.classList.remove('is-hover');
        }
    });
}


/**
 * 
 * 3Dメニューアニメーション
 * 
 * */
function menuOpen(){
    //イベントキャンセル関数（メニュー開放時のスクロールを防ぐため）
    function noScroll(e){
        e.preventDefault();
    }
    //メニューボタンがクリックされたとき
    listMenu.addEventListener('click', function(){
        //activeクラスの付与と削除を行う
        // container.classList.toggle('active');
        listMenu.classList.toggle('menu-active');
        // gMenu.classList.toggle('menu-open');
        if(gMenu.classList.contains('menu-open')){
            gMenu.classList.add('menu-close');
            gMenu.classList.remove('menu-open');
            setTimeout(function(){
                gMenu.style.display = 'none';
            }, 1700);
        } else {
            gMenu.classList.add('menu-open');
            gMenu.classList.remove('menu-close');
            gMenu.style.display = 'block';
        }
        
        circleBg.classList.toggle('circleActive');
        document.body.classList.toggle('fixed');
    
        //メニューが開いた状態でのスクロール禁止
        if(document.body.classList.contains('fixed')){
            // スクロール禁止(SP)
            document.addEventListener('touchmove', noScroll, { passive: false });
            // スクロール禁止(PC)
            document.addEventListener('mousewheel', noScroll, { passive: false });
        } else {
            // スクロール禁止(SP)
            document.removeEventListener('touchmove', noScroll, { passive: false });
            // スクロール禁止(PC)
            document.removeEventListener('mousewheel', noScroll, { passive: false });
        }
    });
    
    /**
     * 
     * メインコンテンツの立幅調整
     * 
     *  */
    window.addEventListener('load', function(){
        if(slides){
            let elem = document.querySelector('.slides');
            let vh = window.innerHeight;
            elem.style.height = vh + 'px';
        }
    });
    window.addEventListener('resize', function(){
        if(slides){
            let elem = document.querySelector('.slides');
            let vh = window.innerHeight;
            elem.style.height = vh + 'px';
        }
    });
    
    
    /**
     * 
     * メインビジュアルの立幅調整
     * 
     *  */
    window.addEventListener('load', function(){
        if(mainVisual){
            let elem = document.querySelector('.main-visual');
            let vh = window.innerHeight;
            elem.style.height = vh + 'px';
        }
    });
    window.addEventListener('resize', function(){
        if(mainVisual){
            let elem = document.querySelector('.main-visual');
            let vh = window.innerHeight;
            elem.style.height = vh + 'px';
        }
    });
}


/**
 * 
 * TOP画面CANVASアニメーション 
 * 
 * */
if(canvas){

    let stageW = 0;
    let stageH = 0;

    const context = canvas.getContext('2d');

    noise.seed(Math.random());

    resize();
    tick();

    //画面がリサイズされたとき、resize関数を流す
    window.addEventListener('resize', resize);

    //アニメーションのタイミング
    function tick(){
        requestAnimationFrame(tick);
        const time  = Date.now() / 2000
        draw(time);
    }

    //アニメーション描画の設定
    function draw(time){
        //画面をリセット
        context.clearRect(0, 0, stageW, stageH);

        context.lineWidth = 1;//線の太さ
        context.strokeStyle = "white";
        const amplitude = stageH / 3;//振幅の大きさ
        const lineNum = 150;//ラインの数
        const segmentNum = 150;//分割数

        //0からlineNum-1までの整数が順番に並んだ配列を得る
        [...Array(lineNum).keys()].forEach(function(j){

            const coefficient = 50 + j;
            context.beginPath();//線の開始

            const h = Math.round(j / lineNum * 60) + 275;
            const s = 100;
            const l = Math.round(j / lineNum * 47);

            context.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;

            [...Array(segmentNum).keys()].forEach(function(i){
                const x = (i / (segmentNum -1)) * stageW;
                const px = i / (50 + j);//水平方向の距離
                const py = j / 50 + time;//時間
                const y = amplitude * noise.perlin2(px, py) + stageH / 2;//求めたいY座標=振幅*乱数（パーリンノイズ）

                if(i === 0){
                    context.moveTo(x, y);//開始点
                } else {
                    context.lineTo(x, y);//終了点
                }
            });
            context.stroke();//線を描く
        });
        
    }
    //リサイズ時
    function resize(){
        stageW = innerWidth * devicePixelRatio;
        stageH = innerHeight * devicePixelRatio;

        canvas.width = stageW;
        canvas.height = stageH;
    }

}


/**
 * 
 * Slice Slider アニメーション
 * 
 * */
if(slides){

    var SliceSlider = {
        //オブジェクトの定義
        settings:{
            delta: 0,
            currentSlideIndex: 0,
            scrollThereshold: 2,
            slides: jQuery('.slide'),
            numSlides: jQuery('.slide').length,
            navPrev: jQuery('.js-prev'),
            navNext: jQuery('.js-next'),
            paginationCurrent: jQuery('.page-current'),
            paginationTotal: jQuery('page-total'),
        },

        //初期化
        init: function(){
            s = SliceSlider.settings;
            this.bindEvents();
        },

        //スクロールイベント・キーイベント・ボタンクリックイベントをバウンディング
        bindEvents: function(){
            //スクロール
            s.slides.on({'DOMMouseScroll mousewheel' : SliceSlider.handleScroll});
            //prev click
            s.navPrev.on({'click': SliceSlider.prevSlide});
            //next click
            s.navNext.on({'click': SliceSlider.nextSlide});
            //キーボタン
            jQuery(document).keyup(function(e){
                //左or上キー
                if((e.which === 37) || (e.which === 38)){
                    SliceSlider.prevSlide();
                }
                //右or下キー
                if((e.which === 39) || (e.which === 40)) {
                    SliceSlider.nextSlide();
                } 
            });
            //スマホのスワイプ(タッチ開始時のy座標の取得)
            let startY;
            let moveY;
            let dist = 100;
            document.querySelector('.slides').addEventListener('touchstart', function(e){
                // e.preventDefault();
                // e.stopPropagation();
                startY = e.touches[0].pageY;
                
            });
            //タッチ中のy座標の取得
            document.querySelector('.slides').addEventListener('touchmove', function(e){
                e.preventDefault();
                moveY = e.changedTouches[0].pageY;
                
            });
            document.querySelector('.slides').addEventListener('touchend', function(e){
                if(startY > moveY && startY > moveY + dist){
                    SliceSlider.nextSlide();
                }
                else if(startY < moveY && startY + dist < moveY){
                    SliceSlider.prevSlide();
                } else {
                    return false;
                }
            });
        },

        //スクロールイベント
        handleScroll: function(e){
            //.detailはDOMMouseScrollのスクロール量を取得---.wheelDeltaはmousewheelはマウスのホイールの方向を取得
            //つまり、上方向へのスクロールまたはマウスを奥にスクロールした場合
            if(e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0){
                if(document.body.classList.contains('is-sliding')){
                    s.delta = 0;
                } else {
                    s.delta--;
                    if(Math.abs(s.delta) >= s.scrollThereshold){
                        s.delta = 7;
                        SliceSlider.prevSlide();
                    }
                }
            }
            //スクロールダウンの場合
            else {
                if(document.body.classList.contains('is-sliding')){
                    s.delta = 0;
                } else {
                    s.delta++;
                    if(s.delta >= s.scrollThereshold){
                        s.delta = 7;
                        SliceSlider.nextSlide();
                    }
                }

            }
            //ページがスクロールしないようにする
            return false;
        },

        //クラス付与でアニメーション
        showSlide: function(){
            //リセット
            s.delta = 0;
            //既にクラスが付与されている場合は、処理続行
            if(jQuery('body').hasClass('is-sliding')){
                return;
            }
            //.slideクラスのついたオブジェクトのそれぞれに処理を加える
            //each(function(index, val))
            s.slides.each(function(i, slide){
                //i番目とcurrentSlideIndexの値がtrueなら「is-active」クラスを付与する
                jQuery(slide).toggleClass('is-active', (i === s.currentSlideIndex));
                jQuery(slide).toggleClass('is-prev', (i === s.currentSlideIndex - 1));
                jQuery(slide).toggleClass('is-next', (i === s.currentSlideIndex + 1));
                //「is-sliding」クラスの付与
                jQuery('body').addClass('is-sliding');
                //「is-sliding」クラスを1秒後に削除
                setTimeout(function(){
                    jQuery('body').removeClass('is-sliding');
                }, 1000);
            });
        },

        //スライドを手前に戻す
        prevSlide: function(){
            //現在のスライドナンバーがマイナスの値になったとき（つまりスライドが先頭まで行きさらにスクロールされたとき）
            if(s.currentSlideIndex <= 0){
                //現在のスライドはスライド全体の長さの最大値（つまりスライドの最後尾）
                s.currentSlideIndex = s.numSlides;
            }
            s.currentSlideIndex--;
            SliceSlider.showSlide();
            paginationCurrent.innerText = '0'+ (s.currentSlideIndex + 1);
        },

        //スライドを次に進める
        nextSlide: function(){
            //最後のスライダーまでスクロールしたときとき
            //currentSlideIndex=5
            //numSlides=6
            //となっている状態なのでこの時点でcurrentSlideIndex++を行って等しくする必要がある
            s.currentSlideIndex++;
            //現在のスライドナンバーがスライドの最大値を超えたとき（つまりスライドが最後尾まで行きさらにスクロールされたとき）
            if(s.currentSlideIndex >= s.numSlides){
                //現在のスライドは0番目（つまりスライドの先頭）
                s.currentSlideIndex = 0;
            }
            SliceSlider.showSlide();
            paginationCurrent.innerText = '0' + (s.currentSlideIndex + 1);
        },
    };
    SliceSlider.init();

}


/**
 * 
 * PCサイズのみブログコンテンツをスライダー形式で表示
 * 
 *  */
// function swiperToggle(){
//     let swiper;
//     jQuery(window).on('load resize', function(){
//         let w = jQuery(window).width();
//         if(w > 768){
//             if(swiper){
//                 return;
//             } else {
//                 swiper = new Swiper('.swiper-container', {
//                     // loop: true,
//                     // spaceBetween: 32,
//                     slidesPerView: 3,
//                     // slidesPerView: 1,
//                     speed: 1000,
//                     // effect: 'cube',
//                     autoplay:{
//                         delay: 5000,
//                     }
//                 });
//             }
//         } else {
//             if(swiper){
//                 swiper.destroy();
//                 swiper = undefined;
//             }
//         }
//     });
// }

/**
 * 
 * サービスページアコーディオン 
 * 
 * */
if(title){

    // for(let i = 0; i < title.length; i++){
    //     let titleEach = title[i];
    //     let textEach = titleEach.nextElementSibling;
    //     titleEach.addEventListener('click', function(){
    //         titleEach.classList.toggle('is-active');
    //         textEach.classList.toggle('is-open');
    //     });
    // }
    let faqItem = jQuery('.accordion-item')
    faqItem.click(function(){
        let answer = jQuery(this).find('.accordion-text');
        let title = jQuery(this).find('.accordion-title');
        if(answer.hasClass('open')){
            answer.removeClass('open');
            title.removeClass('is-active');
            answer.slideUp();
        } else {
            answer.addClass('open');
            title.addClass('is-active');
            answer.slideDown();
        }
    });

}


/**
 * 
 * vivusアニメーション
 * 
 * */
if(svg){

    ScrollTrigger.create({
        trigger: '#svg',
        start: 'top bottom-=10%',
        end: 'bottom center',
        // markers: true,
        onEnter: function(){
            new Vivus('svg', {
                delay: 0,
                duration: 80,
                start: 'autostart', 
                // type: 'scenario',
                type: 'async',
                pathTimingFunction: Vivus.EASE_OUT,
            }, function(){
                svg.classList.add('draw');
            });
        }
    
    });

}


/**
 * 
 * 
 * スクロールアニメーション
 * 
 */
if(scrollOn){

    scrollOn.forEach(function(item){
        gsap.to(item, {
            scrollTrigger:{
                trigger: item,
                start: 'top bottom-=25%',
                end:'center center',
                // markers: true,
                onEnter: function(){
                    item.classList.add('scroll-on');
                }
            }, 
        }); 
    });

}


if(scrollContainer){

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // let container = document.querySelector('.scroll-container');
    let height;

    function setHeight(){
        height = scrollContainer.clientHeight;
        document.body.style.height = `${height}px`;
        console.log(height);
    }

    ScrollTrigger.addEventListener('refreshInit', setHeight);
    gsap.to(scrollContainer, {
        y: () => -(height - document.documentElement.clientHeight),
        ease: 'none',
        scrollTrigger: {
            target: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true
        }
    });

}
