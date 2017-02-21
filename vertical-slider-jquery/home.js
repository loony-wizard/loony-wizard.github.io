
var slideCount;
var slideWidth;
var slideHeight;
var sliderUlWidth;
var sliderUlHeight;


$(document).ready(function () {
    
    setPageSize();


    /*
    * Эта часть скрипта задаёт поведение слайдеру
    * взял код из интернета, переделал горизонтальный слайдер в вертикальный, 
    *
    * TODO: необходимо заменить элементы управления слайдером
    *
    */
    
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveUp() {
        $('#slider ul').animate({
            top: + slideHeight
        }, 500, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('top', '');
        });
    };

    function moveDown() {
        $('#slider ul').animate({
            top: - slideHeight
        }, 500, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('top', '');
        });
    };

    
    $("body").keyup().keydown(function(event) {
        if($('#slider ul').queue("fx").length < 2)
        {
            if(event.which == 38)
                moveUp();
            else if(event.which == 40)
                moveDown();
        } 
    });
}); 


function setPageSize() {
    /*
    * Тут я подгоняю картинку под размер окна браузера у пользователя
    * но так как нужно после этого ещё подогнать ещё и 
    * родительский li, то код получился довольно большой
    * также картинка центрируется в родительском элементе
    */
    var h = document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;
    
    $("#slider ul li").css({ height: h, width: w });

    for(var i = 0; i < $("#slider ul li").length; i++)
    {

        var img = $("#slider ul li img").eq(i);

        if(parseInt(img.css("height")) < h)
        {
            img.css("height", "100%");
            img.css("width", "auto");
        }

        if(parseInt(img.css("width")) < w)
        {
            img.css("width", "100%");
            img.css("height", "auto");       
        }

        img.css('top', h/2 - parseInt(img.css("height"))/2 );
        img.css('left', w/2 - parseInt(img.css("width"))/2 );

    }
    $('#slider').css({ height: h, width: w });

    slideCount = $('#slider ul li').length;
    slideWidth = $('#slider ul li').width();
    slideHeight = $('#slider ul li').height();
    sliderUlWidth = slideCount * slideWidth;
    sliderUlHeight = slideCount * slideHeight;
    
    $('#slider').css({ width: slideWidth, height: slideHeight });
    
    $('#slider ul').css({ height: sliderUlHeight, marginTop: - slideHeight });
};


$( window ).resize(function()
{
    setPageSize();
});
