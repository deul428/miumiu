var userAgent = navigator.userAgent.toLowerCase();
if(userAgent.indexOf('edge')>-1){
    $("html").addClass("edge");
}else if(userAgent.indexOf('whale')>-1){
    $("html").addClass("whale");
}else if(userAgent.indexOf('chrome')>-1){
    $("html").addClass("chrome");
}else if(userAgent.indexOf('firefox')>-1){
    $("html").addClass("firefox");
}else{
    $("html").addClass("ie");
}

function showWhatever(el, current_scroll, wh) { // showWhatever 함수는 총 3개의 파라미터를 필요로 한다
    var el_offset_t = el.offset().top; //el(여기서는 .show_trigger)의 좌표 값을 el_offset_t라는 변수에 저장함
    if(current_scroll > el_offset_t - wh){ //현재 스크롤 값이 (el의 좌표값 - 현재 화면 영역의 높이 값)보다 큰 경우 실행하라 
        el.parent().removeClass("wait_scroll"); //el(.show_trigger)의 부모에게서 wait_scroll 클래스를 삭제하고 
        el.remove(); //자신도 지워라
    }    
}

$(function(){
    $("#header .width_con ul.nav li").hover(function(){ //#header .width_con ul.nav li 영역에 마우스 오버 시 
        if (!$(this).hasClass("lang")) {
            $(this).parent(".nav").addClass("open"); //부모 .nav에게 open이라는 클래스를 추가해라
        }
    },function(){ //마우스 오버가 끝나면
        $(this).parent(".nav").removeClass("open"); //부모 .nav에게서 open이라는 클래스를 삭제해라
    });


    //show slick
    $('#show .width_con').each(function(){
        var text_area = $('.text_slide');
        var box_area = $('.box_slide');
        sliderSet(text_area, box_area);
    });
    function sliderSet(text_area, box_area){
        text_area.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 2,
            arrows: false,
            dots: false,
            fade: true,
            asNavFor: box_area
        });
        box_area.slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            draggable: false,
            dots: true,
            arrows:true,
            asNavFor: text_area,
            speed: 500,
            prevArrow:"<span class='material-symbols-outlined slick-prev'>arrow_back_ios</span>",
            nextArrow:"<span class='material-symbols-outlined slick-next'>arrow_forward_ios</span>"
        });
    };
    
    //store slick:: mouseWheel 제어 코드 일단 주석
    var now_slide = 0;
    var slide_count = $('#store .width_con .boxes .box').length;
    $('#store .width_con .boxes').slick({
        centerMode: true,
        variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: false,
        autoplay: true, 
        speed: 300,
        prevArrow:"<span class='material-symbols-outlined slick-prev'>arrow_back_ios</span>",
        nextArrow:"<span class='material-symbols-outlined slick-next'>arrow_forward_ios</span>"
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){// 슬라이드 아이템이 바뀌기전
    }).on('afterChange', function(event, slick, currentSlide, nextSlide){ // 슬라이드 아이템이 바뀌고 나서
        now_slide = $("#store .boxes .slick-current").attr("data-no"); // 현재 슬라이드는 #store .boxes .slick-current에서 date-no에 적힌 숫자순대로 진행됨
    });

    //캠페인 영상 재생
    $("#campaign.section_06 .width_con .boxes .box").each(function(){ // #campaign.section_06 .width_con .boxes .box를 선택
        var v_url = $(this).attr("data-v_url");
        $(this).hover(function(){
            $(this).find("iframe").attr("src", v_url); //마우스 hover시 iframe 안에 있는 src 속성의 v_url을 가져오기
        },function(){
            $(this).find("iframe").attr("src",""); //마우스커서가 떠났을시 iframe 안에 있는 src 속성의 빈주소를 가져오기 (영상재생X)
        });
    });
    
    //============== mousewheel area ===================
    // $("#store .width_con .boxes").on('mousewheel DOMMouseScroll', function(e) {
    //     if(now_slide >= slide_count){
    //         $(this).addClass("stop_scrolling");
    //     }
    //     if(!$(this).hasClass("stop_scrolling")){
    //         e.preventDefault();
    //         var E = e.originalEvent;
    //         delta = 0;
    //         if (E.detail) {
    //             delta = E.detail * -40;
    //         }else{
    //             // delta = E.detail * -40;
    //             delta = E.wheelDelta;
    //         };
    //         if(delta>0){
    //             //console.log("위로");
    //             $('#store .boxes').slick('slickGoTo', now_slide-2);
    //         }else{
    //             //console.log("아래로");
    //             $('#store .boxes').slick('slickGoTo', now_slide);
    //         }
    //     }
    // });
    //============== mousewheel area ===================
});

$(window).load(function(){ // 해당 문서와 관련된 모든 문서 및 파일을 읽어들인 후 실행
    // #header .width_con ul.nav li dl의 텍스트를 그대로 #header .width_con ul.nav li dl .txt_area dt에 뿌려 줌
    $("#header .width_con ul.nav li dl .txt_area dt").each(function(){
        $(this).text($(this).parents("dl").prev("a").text());
    });

    // 영상 auto play를 위한 코드
    // 영상 길이가 18초이기 때문에 18초마다 #video_con 속성 src를 자신으로 대체해 줌 -> #video_con 새로고침 효과
    setInterval(function(){
        $("#video_con").attr("src", $("#video_con").attr("src"));
    }, 17500);


    $("html, body").animate({scrollTop: 0}, 1); // 새로고침 시 스크롤 좌표 0으로 설정 - 새로고침 시 최상단 #visual 영역에서 스크롤 시작됨

    $(window).scroll(function(){ // 마우스 스크롤 시 실행
        var wh =  $(window).height(); //실제 화면에서 나타나는 영역의 높이 값을 wh라는 변수에 집어넣음
        var current_scroll = $(document).scrollTop(); // 현재 스크롤바의 위치 값을 current_scroll이라는 변수에 집어넣음

        $(".show_trigger").each(function(){ // .show_trigger마다 실행해라
            showWhatever($(this), current_scroll, wh); //showWhatever()라는 함수에 .show_trigger, 현재 스크롤바 위치 값, 실제 화면 영역의 높이 값을 파라미터로 던짐
        }); 
        
        if(current_scroll >= $("#visual").height() - $("#header").height()){ //현재 스크롤 값이 (#visual의 높이 값 - #header의 높이 값)보다 큰 경우
            $("#header").removeClass("transparent"); //#header의 transparent 클래스를 지워라
        }else{ // 아닌 경우
            $("#header").addClass("transparent"); //#header에 transparent 클래스를 추가해라
        }

        // js로 계산해서 사용하는 css 제어 코드. 
        $("#visual.section_01 h1.copy").css({transform: "translateY(" + $(document).scrollTop()/-2 + "px)", filter: "blur(" + $(document).scrollTop()*0.01 + "px)"}); // transform의 translateY 속성 값은 ((현재 스크롤바 위치 값 / (-2)) px), filter의 blur 속성 값은 (현재 스크롤바 위치 값*0.01 px)
    });
});