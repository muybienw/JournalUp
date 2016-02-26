//WB2.anyWhere(function(W){
//
//    console.log('weibo login');
//
//    W.widget.connectButton({
//        id: "wb_connect_btn",
//        type:"2,5",
//        callback : {
//            login:function(o){	//登录后的回调函数
//                console.log(o);
//                console.log('weibo loged in');
//            },
//            logout:function(){	//退出后的回调函数
//                console.log('weibo loged out');
//            }
//        }
//    });
//});

function login(o){	//登录后的回调函数
    console.log(o);
    console.log('weibo loged in');
}

function logout(){	//退出后的回调函数
    console.log('weibo loged out');
}