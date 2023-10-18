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
