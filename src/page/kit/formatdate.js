
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12 + 5;

export function timeformat(timet){
	let date = new Date(timet.replace(/-/g, '/'));
	let time = date.getTime();
	// let now = new Date().getTime();
	let UTC = new Date();
	let UTCTime = Date.now() + UTC.getTimezoneOffset()*minute;
	let diff = UTCTime - time;

	let mind = diff/minute;
	let hourd = diff/hour;
	let dayd = diff/day;
	let weekd = diff/(7*day);
	let monthd = diff/month;
	let yeard = diff/year;

	let str = ''

	if (yeard > 2){
		str = timet;
	} else if (yeard  >=  1) {
		str = Math.floor(yeard) + "年前";
	} else if(monthd >= 1){
		str = Math.floor(monthd) + "月前";
	} else if(weekd >= 1){
		str= Math.floor(weekd) + "周前";
	} else if(dayd >= 1){
		str= Math.floor(dayd) + "天前";
	} else if(hourd >= 1){
		str= Math.floor(hourd) + "小时前";
	} else if(mind >= 1){
		str= Math.floor(mind) + "分钟前";
	} else {
		str="刚刚";
	}
	return str;
}