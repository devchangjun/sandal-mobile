
$(function(){
    var login_os = getMobileOpeatingSystem();
    if(login_os==="Android"){
        if(typeof window.myJS !=='undefined'){
            window.myJS.CallPushToken();
        }
    }
    else if(login_os ==='ios'){
        if(typeof webkit !=='undefined'){
            webkit.mssageHandlers.CallPushToken.postMessage("push_token");
        }
    }
});


function CallBackToken(token){
    $("#push_token").val(token);
    console.log(token);
}
