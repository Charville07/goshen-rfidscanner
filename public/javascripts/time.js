  tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  tmonth=new Array("01","02","03","04","05","06","07","08","09","10","11","12");

  function GetClock(){
  var d=new Date();
  var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
  var nhour=d.getHours(),nmin=d.getMinutes(),ap;
  if(nhour==0){ap=" AM";nhour=12;}
  else if(nhour<12){ap=" AM";}
  else if(nhour==12){ap=" PM";}
  else if(nhour>12){ap=" PM";nhour-=12;}
  if(ndate<10){ndate="0"+ndate}

  if(nmin<=9) nmin="0"+nmin;

  document.getElementById('clockbox').innerHTML=""+nhour+":"+nmin+"";
  document.getElementById('clockbox2').innerHTML=""+tmonth[nmonth]+"/"+ndate+"/"+nyear+" ";
  document.getElementById('clockbox3').innerHTML=""+tday[nday]+"";
  }



  window.onload=function(){
  GetClock();
  setInterval(GetClock,1000);
  }