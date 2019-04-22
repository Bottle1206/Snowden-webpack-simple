const minuteMill = 1000 * 60;
const hourMill = minuteMill * 60;
const dayMill = hourMill * 24;
const weekMill = 7 * dayMill;

function inZero(num) {
  return num < 10 ? '0' + num : num
}

export const getNowDate = (sign = '-') => {
  const now = new Date();
  return now.getFullYear() + sign + inZero(now.getMonth() + 1) + sign + inZero(now.getDate())
}

export const getNowTime = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

export const getNowFullDate = (sign = '-') => {
  return getNowDate() + ' ' + getNowTime()
}

export const offsetDayFromToday = (n, type = 'date', sign = '-') => { // n为天数
  const now = new Date();
  let milliSec = now.getTime();
  milliSec += n * 1000 * 60 * 60 * 24;
  now.setTime(milliSec);
  let val = now.getFullYear() + sign + inZero(now.getMonth() + 1) + sign + inZero(now.getDate());
  if (type === 'datetime') {
    val += ' ' + now.toTimeString().split(' ')[0];
  }
  return val;
}

export const transferToStandDate = (DateObj, timeOffset, sign = '-') => {
  if (timeOffset && typeof timeOffset === 'string') {
    sign = timeOffset;
    timeOffset = null;
  }
  if (typeof DateObj === 'string') {
    if (!timeOffset) {
      return DateObj;
    }
    DateObj = new Date(DateObj);
  }
  if (timeOffset) {
    const offset = {
      month: 0,
      week: 0,
      day: 0,
      hour: 0,
      minute: 0,
      ...(timeOffset || {})
    }
    let milliSec = DateObj.getTime();
    milliSec += offset.week * weekMill + offset.day * dayMill + offset.hour * hourMill + offset.minute * minuteMill;
    DateObj.setTime(milliSec);
  }
  return DateObj.getFullYear() + sign + inZero(DateObj.getMonth() + 1) + sign + inZero(DateObj.getDate())
}

export const transferToStandFullDate = (DateObj, timeOffset, sign = '-') => {
  if (timeOffset && typeof timeOffset === 'string') {
    sign = timeOffset;
    timeOffset = null;
  }
  if (typeof DateObj === 'string') {
    if (!timeOffset) {
      return DateObj;
    }
    DateObj = new Date(DateObj);
  }
  const standardDate = transferToStandDate(DateObj, sign, timeOffset);
  return standardDate + ' ' + DateObj.toTimeString().split(' ')[0];
}

export const getTwoDayDistance = (startDate, endDate) => {
  if (startDate && endDate) {
    if (typeof startDate === 'string') startDate = new Date(startDate)
    if (typeof endDate === 'string') endDate = new Date(endDate)
    const distance = endDate.getTime() - startDate.getTime();
    return distance / (1000 * 60 * 60 * 24)
  }
  return 0;
}