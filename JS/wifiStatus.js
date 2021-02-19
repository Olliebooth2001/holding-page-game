
  function showNotification()  {
  const notification = new Notification("SkyBet",{
  body:"Network connection is back online",
  icon:"https://www.picks.org/wp-content/uploads/2017/01/skybet-logo.png"  ,
  
  });
  notification.onclick = function(event) {
    event.preventDefault(); 
    window.open('https://m.skybet.com/');
  }
}
   
console.log(Notification.permission);

if(Notification.permission === "granted"){
  showNotification();
}
else if(Notification.permission !== "denied"){
    Notification.requestPermission().then(permission=>{
    if(permission === "granted"){
      showNotification();
    } 
  });
}

const checkOnlineStatus = async () => {
   try {
      
     const online = await fetch("1pixel.png");
     return online.status >= 200 && online.status < 300; 
   } catch (err) {
     return false; 
   }
 };

 setInterval(async () => {
   const result = await checkOnlineStatus();
   const statusDisplay = document.getElementById("status");
   statusDisplay.textContent = result ? "Online" : "Offline";
   if(result == true){
    document.getElementById("serverSymbol").style.display = "block";
    document.getElementById("serverSymbol").src='images/serverON.png';

    //document.getElementById("serverOFF").style.display = 'none';
   }
   else if(result == false){
    document.getElementById("serverSymbol").style.display = 'none';

   }
 }, 8000);

 window.addEventListener("load", async (event) => {
   const statusDisplay = document.getElementById("status");
   statusDisplay.textContent = (await checkOnlineStatus())
     ? "Online"
     : "Offline";
 });