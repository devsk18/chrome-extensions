var to = 'INR';
var from = 'USD';

amountInput = document.getElementById('amount');
currency = document.getElementById('currency');
resultData = document.getElementById('result');
rate = document.getElementById('rate');
resultData.value = '';

var API_KEY = config.API_KEY;

var myHeaders = new Headers();
myHeaders.append("apikey", API_KEY);

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

currency.addEventListener('change', function handleChange(event) { 

    if(event.target.value == 1) {
        to = 'INR'
        from = 'USD'
    } else {
        to = 'USD'
        from = 'INR'
    }
    convert(amountInput.value);

});

amountInput.addEventListener('input', function handleChange(event) { 
    convert(amountInput.value)
});

function convert(amount) {

  coin_rate = getCookie("rate");
  coin_rate = Number(coin_rate);
  console.log(typeof(coin_rate)); 

  if(currency.selectedOptions[0].value == 1){
    resultData.value = (amount*coin_rate).toFixed(3);
    rate.innerHTML = "1 " + from + " is equal to " + coin_rate.toFixed(3) + " " + to + ".";
  } else {
    resultData.value = (amount/coin_rate).toFixed(3);
    rate.innerHTML = "1 " + from + " is equal to " + (1/coin_rate).toFixed(3) + " " + to + ".";
  }

}

function GetData(){

  amount = 1

  if(!getCookie("rate")){
      fetch('https://api.apilayer.com/exchangerates_data/convert?to=INR&from=USD&amount=' + amount , requestOptions)
      .then(response => response.json())
    .then(result => {
      console.log(result);
      setCookie("rate",result.info.rate,1);
    })
    .catch(error => console.log('error', error));
  }
  
}


function setCookie(cname, cvalue, exdays) {

  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}

function getCookie(cname) {

  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;

}

window.onload = function() {
  GetData();
}

amountInput.onkeydown = function(key) {
	var keycode = (key.which) ? key.which : key.keyCode;

	if (keycode == 189)
		return false;
	else
		return true;
}