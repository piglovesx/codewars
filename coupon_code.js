function checkCoupon1(coupon) {
//var reg = /^\w+([June | May | January | February | March | April | July | Auguest | September | Octomber | November | December] (\d\d),(\d\d\d\d))$/g;
var reg = /^\w+[June | May | January | February | March | April | July | Auguest | September | Octomber | November | December] (\d\d),(\d\d\d\d)$/g;
if (coupon) {
	return reg.test(coupon);
}

return false;
}

//console.log(checkCoupon('sssJune 14,2014'));
//console.log(checkCoupon('May 14,2014'));
//console.log(checkCoupon('December 14,2014'));

function checkCoupon(enteredCode, correctCode, currentDate, expirationDate){
 if (enteredCode && correctCode && currentDate && expirationDate)  {
		return enteredCode === correctCode && new Date(currentDate) <= new Date(expirationDate);
	}
	return false;
}


console.log(checkCoupon('123','123','September 5, 2014','October 1, 2014'));
checkCoupon('123a','123','September 5, 2014','October 1, 2014');
