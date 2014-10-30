
//    floatingMenu.add('floatdiv',
//        {
//            // Represents distance from left or right browser window  
//            // border depending upon property used. Only one should be  
//            // specified.  
//            // targetLeft: 0,  
//            targetRight: 10,

//            // Represents distance from top or bottom browser window  
//            // border depending upon property used. Only one should be  
//            // specified.  
//            targetTop: 10,
//            // targetBottom: 0,  

//            // Uncomment one of those if you need centering on  
//            // X- or Y- axis.  
//            // centerX: true,  
//            // centerY: true,  

//            // Remove this one if you don't want snap effect  
//            snap: true
//        });
$(function () {
    $(window).scroll(function () {
        $('#floatdiv').animate({ top: $(window).scrollTop() + 60 }, 10);
    });
});