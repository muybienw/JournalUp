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

    //var status = WB2.checkLogin();
    //alert(status);
    //
    //WB2.logout(function(){
    //    alert("logged out!");
    //});


    var data = {
        "id": response.id,
        "name" : response.name,
        "first_name" : response.name,
        "profilePicUrl" : response.avatar_large
    };

    console.log(data);

    $.post('/fbsignin', data , function(){
        window.location.replace('/myjournal');
    });

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