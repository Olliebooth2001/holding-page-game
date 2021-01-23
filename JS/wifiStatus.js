var checkStatus = function(){
    if(navigator.onLine)
    {
        console.log("user is online")
        showNotification()
        console.log("howdy partner")
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
    const notification = new Notification("SkyBet",{
      body:"Network connection is back online",
      icon:"https://www.picks.org/wp-content/uploads/2017/01/skybet-logo.png"  
    });

  }



  console.log(Notification.permission);

  if(Notification.permission === "granted"){
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
