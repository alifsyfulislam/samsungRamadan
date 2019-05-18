var swipe_gallery = document.querySelector('.swipe_gallery');
var swipe_box = document.querySelector('.swipe_box');



var leftData = [];
var preData = [];
for (var i = 0; i < 6; i++) {
    leftData[i] = i*300;
}
var x = 0;
var curX = 0;

var dx=1;
var myMoveHandler = (event) => {
    if(event.clientX) {
        var diff = event.clientX - curX;
        if(clicked && leftData[0]+diff<=0 && leftData[0]+diff>=-1500) {
            for(var i=0; i<document.getElementsByClassName("sliderItem").length; i++) {
                document.getElementsByClassName("sliderItem")[i].style.left = (leftData[i]*1+diff)+"px";
                leftData[i]=leftData[i]*1+diff;
            }
            curX = event.clientX;
        }
        if (clicked && (event.clientX<10 || event.clientX>290)) {
            clicked = false;
            if (x + 20 < event.clientX) {
                //right
                dx = 5;
            } else if (x - 20 > event.clientX) {
                //left
                dx = -5;
            }
            scrollImage();
        }
    }

}
var scrollImage = () => {
    if (Math.abs(leftData[0])>= 1215) {
        swipe_box.style.display = "none";
    }
    else {
        swipe_box.style.display = "block";
    }
    setTimeout( ()=> {
        if((dx<0 && preData[0]-300<leftData[0] && leftData[0]<=0 && leftData[0]>=-1500)
            || (dx>0 && preData[0]+300>leftData[0] && leftData[0]<=0 && leftData[0]>=-1500)) {
            for (var i = 0; i < document.getElementsByClassName("sliderItem").length; i++) {
                document.getElementsByClassName("sliderItem")[i].style.left = (leftData[i] * 1 + dx) + "px";
                leftData[i]=leftData[i]*1+dx;
            }
            scrollImage();
        }
    }, 5);
}
var clicked = false;
swipe_gallery.addEventListener('mousedown', (event)=> {
    if (event.clientX>10 && event.clientX<290) {
        clicked = true;
        x = event.clientX;
        curX = x;
        for (var i = 0; i < document.getElementsByClassName("sliderItem").length; i++) {
            preData[i] = leftData[i];
        }
    }
});

swipe_gallery.addEventListener('mouseup', (event)=> {
    if (clicked &&event.clientX>10 && event.clientX<290) {
        clicked = false;
        if (x + 20 < event.clientX) {
            //right
            dx = 5;
        } else if (x - 20 > event.clientX) {
            //left
            dx = -5;
        }
        scrollImage();
    }
});
swipe_gallery.addEventListener('mousemove', myMoveHandler);
swipe_gallery.addEventListener('touchstart', function (event) {
    clicked = true;
    x = Math.round(event.touches[0].clientX);
    curX = x;
    for(var i=0; i<document.getElementsByClassName("sliderItem").length; i++) {
        preData[i] = leftData[i];
    }
});
swipe_gallery.addEventListener('touchend', function (event) {
    clicked = false;
    if(x+20<curX) {
        //right
        dx = 5;
    } else if(x-20>curX) {
        //left
        dx = -5;
    }
    scrollImage();
});


swipe_gallery.addEventListener('touchmove', function (e) {
    // stop touch event
    e.stopPropagation();
    e.preventDefault();

    // translate to mouse event
    var clkEvt = document.createEvent('MouseEvent');
    clkEvt.initMouseEvent('mousemove', true, true, window, e.detail,
        e.touches[0].screenX, e.touches[0].screenY,
        e.touches[0].clientX, e.touches[0].clientY,
        false, false, false, false,
        0, null);
    swipe_gallery.dispatchEvent(clkEvt);

    // or just handle touch event
    myMoveHandler(e);
}, false);







//call
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.querySelector('.call_now').addEventListener('click',function () {
        var link = "tel:08000300300";
        window.location.href = link;
        console.log(link);
    })
}















var title = document.querySelector('.title');
var counter = document.querySelector('.counter');
var sehriSet = [
    "0:0","3:39","3:39","3:39","3:39","3:39","3:39",
    "3:52","3:51","3:50","3:50","3:49",
    "3:49","3:48","3:48","3:47","3:47",
    "3:46","3:46","3:45","3:44","3:44",
    "3:43","3:43","3:42","3:42","3:41",
    "3:41","3:40","3:40","3:40","3:39",
    "3:39"
];
var iftarSet = [
    "0:0","18:46","18:46","18:46","18:47","18:47",
    "18:47","18:34","18:34","18:35","18:35",
    "18:36","18:36","18:36","18:37","18:37",
    "18:38","18:38","18:39","18:39","18:40",
    "18:40","18:41","18:42","18:42","18:42",
    "18:43","18:43","18:44","18:44","18:45",
    "18:45"
];
setInterval(function () {
    var today = new Date();
    var curDate = today.getDate();
    var curDate2 = Number(curDate);
    var curTime = today.getHours()*60*60+ today.getMinutes()*60+today.getSeconds();

    var checkIftar = iftarSet[curDate].split(":");
    var checkSehri = sehriSet[curDate].split(":");
    var timeIftar = checkIftar[0]*60*60 + checkIftar[1]*60;
    var timeSehri = checkSehri[0]*60*60 + checkSehri[1]*60;



    if (timeSehri<timeIftar && timeSehri>curTime && timeSehri>=0){
        checkSehriTime(curDate, curTime);
    }
    else if (timeSehri<timeIftar && timeIftar<curTime) {
        checkSehriTime(curDate, curTime);
    }
    else {
        checkIftarTime(curDate, curTime);
    }

},1000);

function checkIftarTime(todayDate, curTime) {
    var time = iftarSet[todayDate].split(":");
    var setTime = time[0]*60*60 + time[1]*60;
    var diffTime = setTime - curTime;
    if (diffTime<setTime && diffTime>=0){
        title.innerHTML = " ইফতারের সময় বাকি ";
        counter.innerHTML = printTimer(diffTime);
    }
}

function checkSehriTime(todayDate, curTime) {
    var time = sehriSet[todayDate].split(":");
    var setTime = time[0]*60*60 + time[1]*60;
    var diffTime = setTime - curTime;

    if (diffTime<setTime && diffTime>=0){
        title.innerHTML = " সেহেরীর সময় বাকি ";
        counter.innerHTML = printTimer(diffTime);
    }
    else {
        var lastTime = setTime+24*60*60;
        var sehriEnd = lastTime - curTime;
        title.innerHTML = " সেহেরীর সময় বাকি ";
        counter.innerHTML = printTimer(sehriEnd);
    }
}

function printTimer(sec) {
    hr = Math.floor(sec / 3600) % 24;
    mm = Math.floor(sec / 60) % 60;
    ss = sec % 60;

    var x = hr < 10? "0"+hr : hr;
    var y = mm < 10? "0"+mm : mm;
    var z = ss < 10? "0"+ss : ss;
    return ( x+":"+y+":"+z)
}
