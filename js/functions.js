const checkLength=function(str, maxLen) {
  return (str.length<=maxLen);
};
checkLength('abc', 3);

const isPalindrome=function(str) {
  str.replaceAll().toUpperCase();
  let secondStr='';
  for (let i=str.length-1; i>=0; i--){
    secondStr+=str[i];
  }
  return (str===secondStr);
};
isPalindrome('abc');

const getNumber=function(str) {
  str.replaceAll().toUpperCase();
  let result='';
  for (let i=0; i<str.length; i++){
    if (!Number.isNaN(parseInt(str[i], 10))){
      result+=str[i];}
  }
  return (result==='')? NaN: parseInt(result, 10);
};
getNumber('ab2c5');


const findTimeInMinutes = function (stringTime) {
  const [hour, minute] =  stringTime.split(':');
  return Number(hour) * 60 + Number(minute);
};

const checkMeeting = function (startDay, EndDay, startMeeting, timeMeeting) {
  const startDayInMinutes = findTimeInMinutes(startDay);
  const EndDayInMinutes = findTimeInMinutes(EndDay);
  const startMeetingInMinutes = findTimeInMinutes(startMeeting);
  return EndDayInMinutes >= startMeetingInMinutes + timeMeeting && startMeetingInMinutes >= startDayInMinutes;
};

checkMeeting('08:00', '17:30', '14:00', 90);

