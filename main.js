
function getfirstvalueAfterWord(string, word) {
  const regex1 = RegExp(`(${word}) ([0-9]{1,2}\.?[0-9]{1,2})`, 'gi');
  return regex1.exec(string)
}
function parseSample(sample) {
  
   const  html = sample.html.match(/<body.*?>(.*)<\/body>/g);
   const  withoutStyle = html[0].replace(/src="(.*?)"|<style.*?>(.*)<\/style>/g,'');
   const withoutTag =  withoutStyle.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
   const time = withoutTag.match(/[0-9]{1,2}:[0-9]{2}/g);
   const distance = getfirstvalueAfterWord(withoutTag, 'kilomètres')? parseFloat(withoutTag.match(/\d{1,2}\.\d{1,2}/g)[1]):0;
   const distanceFee = getfirstvalueAfterWord(withoutTag, 'Distance')? parseFloat(getfirstvalueAfterWord(withoutTag, 'Distance')[2].replace("," , ".")):0;
   const arrayTimeFee = getfirstvalueAfterWord(withoutTag, 'Temps');
   const timeFeeWithDot = arrayTimeFee? arrayTimeFee[2].replace(",", "."):null;
   const timeFee = timeFeeWithDot? parseFloat(timeFeeWithDot):0;
   const departureTime = time[0].length===4? `0${time[0]}`:time[0];
   const arrivalTime = time[1].length===4? `0${time[1]}`:time[1];
   const currency = withoutTag.match(/\€/g)? 'EUR': withoutTag.match(/[A-Z]{3}/g)[0];
   const duration = withoutTag.match(/[0-9]{1,2}:[0-9]{2}:[0-9]{2}/g)?withoutTag.match(/[0-9]{1,2}:[0-9]{2}:[0-9]{2}/g)[0]: "";
   const distanceUnit = distance? "kilomètres": "";
   const totalPricePaidString = withoutTag.match(/\d{1,2},\d{2}|\d{1,2}\.\d{1,2}/g)[0];
   const matchComma = totalPricePaidString.split(',');
   const totalPricePaid =  matchComma.length ===2 ? parseFloat(totalPricePaidString.replace(',','.')):parseFloat(totalPricePaidString);
   const address = withoutTag.match(/\s[a-zA-Z0-9/-\s]+(\,)?[a-zA-Z0-9.'-\s]+(\,)? [0-9]{5,6} [a-zA-Z]+(\,)? [a-zA-Z]+(\.)?|[a-zA-Z\s]+(\.)?(\d{1,})+(\,)+ [0-9]{4,6} [a-zA-Zè]+(\,)+ [a-zA-Z]+/g);
  return {  
  arrivalAddress: address[1].trim(),
  arrivalTime,
  currency,
  departureAddress: address[0].trim(),
  departureTime,
  distance,
  distanceFee,
  distanceUnit,
  duration,
  timeFee,
  totalPricePaid
};
}

exports.parseSample = parseSample;
