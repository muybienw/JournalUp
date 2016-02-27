//WB2.anyWhere(function(W) {
//    W.widget.connectButton({
//        id: "wb_connect_btn",
//        type: "2,2",
//        callback: {
//            login: function (o) {	//登录后的回调函数
//                console.log("weibo logged in");
//                console.log(o);
//            },
//            logout: function () {	//退出后的回调函数
//                console.log("weibo logged out");
//            }
//        }
//    });
//});


function login(response){	//登录后的回调函数
    console.log(response);
    console.log('weibo loged in');

    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++){
        var spcook =  cookies[i].split("=");
        console.log(spcook[0]);
        document.cookie = spcook[0] + "=;expires=Thu, 21 Sep 1979 00:00:01 UTC;";
    }

    console.log("after erasing the cookie");
    var theCookies = document.cookie.split(';');
    for (var i = 1 ; i <= theCookies.length; i++) {
        console.log(i + ' ' + theCookies[i-1] + "\n");
    }


    var wb_logout = $('#wb_btn');
    console.log(wb_logout);

    //var data = {
    //    "id": response.id,
    //    "name" : response.name,
    //    "first_name" : response.first_name,
    //    "profilePicUrl" : response.picture.data.url
    //};

    //$.post('/wbsignin', data , function(){
    //    window.location.replace('/myjournal');
    //});

}

function logout(){	//退出后的回调函数
    console.log('weibo loged out');
}

function onloadfun(){	//退出后的回调函数
    console.log('loaded');
    var wb_logout = $('a.login_a.loginout');
    console.log(wb_logout);
}