var currentStep = 0;
var licNumber = ''; // for licenses contact us hi@steppedform.com
var steps =[
  {
    "stepNumber": "1",
    "stepLabel": "Place Order",
    "activeStep": true,
    "stepHidden": false
  },
  {
    "stepNumber": "2",
    "stepLabel": "Address",
    "activeStep": false,
    "stepHidden": false
  },
  {
    "stepNumber": "3",
    "stepLabel": "Payment",
    "activeStep": false,
    "stepHidden": false
  },
  {
    "stepNumber": "4",
    "stepLabel": "Confirm",
    "activeStep": false,
    "stepHidden": false
  },
  {
    "stepNumber": "5",
    "stepLabel": "Thank You",
    "activeStep": false,
    "stepHidden": true // Step exists but will not be added in the Stepper
  },
];

var paymentOptions = [
  {
    "radioLabel": "Same as shipping",
    "radioName": "sameAddress",
    "radioModel": "paymentAddress"
  },
  {
    "radioLabel": "Different Address",
    "radioName": "differentAddress",
    "radioModel": "paymentAddress"
  },
];

var shippingDatesOptions = [
{
    "radioLabel": "Today before 08:00 PM",
    "radioName": deliveryDates().todayFormatted,
    "radioModel": "shippingDate",
    "radioTitle": "FREE Prime Delivery."
  },
  {
    "radioLabel": deliveryDates().tomorrowFullDate,
    "radioName": deliveryDates().tomorrowFormatted,
    "radioModel": "shippingDate",
    "radioTitle": "FREE Amazon Day Delivery",
    "radioSubTitle": "Get your order in fewer boxes."
  },
  {
    "radioLabel": deliveryDates().afterTomorrowFullDate,
    "radioName": deliveryDates().afterTomorrowFormatted,
    "radioModel": "shippingDate",
    "radioTitle": "FREE No-rush shipping",
    "radioSubTitle": "Get US$1 reward for select digital purchases."
  },
];

var productPriceOptions = [
{
    "optionLabel": "1",
    "optionValue": "1",
  },
  {
    "optionLabel": "2",
    "optionValue": "2",
  },
  {
    "optionLabel": "3",
    "optionValue": "3",
  },
  {
    "optionLabel": "4",
    "optionValue": "4",
  },
  {
    "optionLabel": "5",
    "optionValue": "5",
  },
  {
    "optionLabel": "6",
    "optionValue": "6",
  },
  {
    "optionLabel": "7",
    "optionValue": "7",
  },
  {
    "optionLabel": "8",
    "optionValue": "8",
  },
  {
    "optionLabel": "9",
    "optionValue": "9",
  },
  {
    "optionLabel": "10",
    "optionValue": "10",
  },
];

var selectProductLabels = {
  "selectLabel": "QTY",
  "selectName": "product-qty",
}

// Methods starts here
function onConfirmOrder() {
  const items = { ...sessionStorage };
  return items;
}

function dateFormatted(date) {
  return (date.getMonth() + 1) + '/' +  date.getDate() + '/' +  date.getFullYear();
}

function dateTomorrow(date) {
  const tomorrow = new Date(date);
  return new Date(tomorrow.setDate(tomorrow.getDate() + 1));
}

function fullDate(date) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayOrder = date.getDay();
  const dayOfDate = date.getDate();
  const monthOrder = date.getMonth();
  const year = date.getFullYear();

  const day = daysOfWeek[dayOrder];
  const month = monthsOfYear[monthOrder];

  //Example: Tuesday (Apr 27, 2021)
  const fullDate = day + ' (' + month + ' ' + dayOfDate + ', ' + year + ')';

  return fullDate;
}

function deliveryDates(){
  const today = new Date();
  const tomorrow = dateTomorrow(today);
  const afterTomorrow = dateTomorrow(tomorrow);

  const todayFormatted = dateFormatted(today);
  const tomorrowFormatted = dateFormatted(tomorrow);
  const afterTomorrowFormatted = dateFormatted(afterTomorrow);

  const todayFullDate = fullDate(today);
  const tomorrowFullDate = fullDate(tomorrow);
  const afterTomorrowFullDate = fullDate(afterTomorrow);
  
  return { todayFormatted, tomorrowFormatted, afterTomorrowFormatted, todayFullDate, tomorrowFullDate, afterTomorrowFullDate }
}

function roundDecimals(value) {
  const n = 2;
  return parseFloat(Math.round(value * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
}

function checkOutReady() {
  const price = sessionStorage.getItem('price');
  const quantities = sessionStorage.getItem('quantities');
  const subtl = +sessionStorage.getItem('subtotal');
  const subtotal = roundDecimals(subtl);
  const shipping = roundDecimals(subtotal * 0.15);
  const tax = roundDecimals(subtotal * 0.10);
  const globalTotal = Number(subtotal) + Number(shipping) + Number(tax);
  const total = roundDecimals(globalTotal);
  // Define is session Storage
  sessionStorage.setItem('shipping', shipping);
  sessionStorage.setItem('tax', tax);
  sessionStorage.setItem('total', total);
  return {subtotal, shipping, tax, total, price, quantities};
}

// Horizontal Elements

var horizontalStepper = document.getElementById('h-stepper-001');
horizontalStepper.stepsData = steps;
horizontalStepper.lic = licNumber;

var paymentConfig = document.getElementById('cc-01');
paymentConfig.paymentAddressConfig = paymentOptions;

var shipingDates = document.getElementById('shipping-dates-001');
shipingDates.radioGroupData = shippingDatesOptions;

var productMenu = document.getElementById('prod-quan-001');
productMenu.selectMenuData = productPriceOptions;
productMenu.selectMenuLabels = selectProductLabels;

// Main Functionality for each btn in the flow 

// Step 1: Start Order 
// Horizontal Stepper 
function calcOrder(price, quantity) {
  // Convert to number
  var prFormat = +price.replace(/[^0-9.]+/g,'');
  var pr = roundDecimals(prFormat);
  var qt = +quantity;
  // Calculate subtotal
  var num = pr * qt;
  var subtotal = roundDecimals(num);
  // Save data to sessionStorage
  sessionStorage.setItem('price', pr);
  sessionStorage.setItem('quantities', qt);
  sessionStorage.setItem('subtotal', subtotal);
  // Assign values (update values on the UI)
  document.querySelector('#sum-price-001').textContent = 'US$ ' + pr;
  document.querySelector('#sum-quan-001').textContent = qt;
  document.querySelector('#sum-subtotal-001').textContent = 'US$ ' + subtotal;
}

var startOrderBtn = document.querySelector('#h-stepper-001 #btn-stepper-001');
var price = document.querySelector('#prod-price-001').textContent;
productMenu.addEventListener('selectMenuValue', event => { 
  calcOrder(price, event.detail);
});
startOrderBtn.addEventListener('click', event => {
  // onNextStep is defined in stepper wc, 1 is the current step (index)
  goNext();
})
horizontalStepper.addEventListener('updateStep', event => { 
 // Stepper emited new value so update current Step
 currentStep = event.detail;
});

function onSubmitOrder(index) {
  (async () => {
    await customElements.whenDefined('sf-stepper');
    const horizontalStepper = document.querySelector('sf-stepper');
    await horizontalStepper.onNextStep(index);
  })();
}

function goNext(){
  currentStep++;
  onSubmitOrder(currentStep);
}

function goBack(){
  currentStep--;
  onSubmitOrder(currentStep);
}

// Step 2: Continue (Address) 
var fullAddressWC = document.querySelector('#ad-01');
fullAddressWC.addEventListener('addressSubmitted', event => { 
  goNext(); //horizontal
});
fullAddressWC.addEventListener('backBtnPressed', event => { 
  goBack(); //horizontal
});

// Step 3: Continue (Credit Card) 
var fullCreditCardWC = document.querySelector('#cc-01');
fullCreditCardWC.addEventListener('ccSubmitted', event => { 
  goNext(); //horizontal
  // Print Data in Step 4
  printCheckout(); //horizontal
});
fullCreditCardWC.addEventListener('backBtnPressed', event => { 
  goBack(); //horizontal
});

// Common methods ends here

// Horizontal Stepper 
function printCheckout() {
  const subtotal = (checkOutReady().subtotal) ? checkOutReady().subtotal : 0;
  const shipping = (checkOutReady().shipping) ? checkOutReady().shipping : 0;
  const tax = (checkOutReady().tax) ? checkOutReady().tax : 0;
  const total = (checkOutReady().total) ? checkOutReady().total : 0;
  const price = (checkOutReady().price) ? checkOutReady().price : 0;
  const quantities = (checkOutReady().quantities) ? checkOutReady().quantities : 0;
  document.querySelector('#conf-price-001').textContent = 'US$ ' + price;
  document.querySelector('#conf-quan-001').textContent = quantities;
  document.querySelector('#conf-subtotal-001').textContent = 'US$ ' + subtotal;
  document.querySelector('#conf-shipping-001').textContent = 'US$ ' + shipping;
  document.querySelector('#conf-tax-001').textContent = 'US$ ' + tax;
  document.querySelector('#conf-total-001').textContent = 'US$ ' + total;
}

// Step 4: Confirm & Submit 
shipingDates.addEventListener('radioValueSelected', event => {
  if (event && event.detail){
    const shippingDate = new Date(event.detail);
    sessionStorage.setItem('delivery-date', shippingDate);
  }
})

var confirmOrderBtn = document.querySelector('#h-stepper-001 #btn-stepper-004');

confirmOrderBtn.addEventListener('click', event => {
  // onNextStep is defined in stepper wc, 4 is the current step (index)
  let payload = onConfirmOrder();
  (payload) ? console.log(payload) : console.log('Transaction Canceled');
  // Remove all saved data from sessionStorage
  sessionStorage.clear();
  goNext(); //horizontal
})

var goBackBtn = document.querySelector('#h-stepper-001 #btn-stepper-005');

goBackBtn.addEventListener('click', event => {
  // onNextStep is defined in stepper wc, 4 is the current step (index)
  onSubmitOrder(0);
})
