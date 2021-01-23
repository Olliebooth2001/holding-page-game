var checkStatus = function(){
    if(navigator.onLine)
    {
        console.log("user is online")
    }
    else{
        console.log("user is offline")
    }
}
    checkStatus()
window.addEventListener("online", function(){
    checkStatus()
})
window.addEventListener("offline", function(){
    checkStatus()
})

