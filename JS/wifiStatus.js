// var checkStatus = function(){
//     if(navigator.onLine)
//     {
//         console.log("user is online")
//         showNotification()
//         console.log("howdy partner")
//     }
//     else{
//         console.log("user is offline")
//     }
// }
//     checkStatus()
// window.addEventListener("online", function(){
//     checkStatus()
// })
// window.addEventListener("offline", function(){
//     checkStatus()
// })


//function showNotification()  {
   // const notification = new Notification("SkyBet",{
//       body:"Network connection is back online",
//       icon:"https://www.picks.org/wp-content/uploads/2017/01/skybet-logo.png"  
//     });

//   }



//   console.log(Notification.permission);

//   if(Notification.permission === "granted"){
//     //alert("We have permission!");
//     //showNotification();
//   }
//   else if(Notification.permission !== "denied"){
//     Notification.requestPermission().then(permission=>{

//       if(permission === "granted"){
//         //showNotification();
//       }

//     });
//   }

const checkOnlineStatus = async () => {
   try {
      
     const online = await fetch("/1pixel.png");
     return online.status >= 200 && online.status < 300; // either true or false
   } catch (err) {
     return false; // definitely offline
   }
 };

 setInterval(async () => {
   const result = await checkOnlineStatus();
   const statusDisplay = document.getElementById("status");
   statusDisplay.textContent = result ? "Online" : "OFFline";
 }, 3000);

 window.addEventListener("load", async (event) => {
   const statusDisplay = document.getElementById("status");
   statusDisplay.textContent = (await checkOnlineStatus())
     ? "Online"
     : "OFFline";
 });