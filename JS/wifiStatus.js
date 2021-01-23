var checkStatus = function(){
    if(navigator.onLine)
    {
        console.log("user is online")
        showNotification();
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


function showNotification()  {
    const notification = new Notification("New message from ollie",{
      body:"heya mate u okay"

    });

  }



  console.log(Notification.permission);

  if(Notification.permission === "granted" && navigator == onLine){
    //alert("We have permission!");
    //showNotification();
  }
  else if(Notification.permission !== "denied"){
    Notification.requestPermission().then(permission=>{

      if(permission === "granted"){
        //showNotification();
      }

    });
  }
