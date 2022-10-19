var ScrapeData = {};
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "popup"){
        Scraping();
        sendResponse({Data: ScrapeData});
      }
    }
  );
  var x = null;
  var y = null;
  document.addEventListener('mousemove', onMouseUpdate, false);
  document.addEventListener('mouseenter', onMouseUpdate, false); 
  document.addEventListener('mouseup', (event) => {
    event.preventDefault();
    let Selection = window.getSelection().toString();
    if(!document.querySelector("#ttdiv") && Selection.length > 5){
      tooltip(Selection);
    }else{
      // document.querySelector("#ttdiv").remove();
    }
  });
  function Scraping(){
    get_prices();
    var reviews = [];
    function get_reviews(){
      document.querySelectorAll('[data-testid=featuredreview-text]').forEach(element=>{ reviews.push(element.innerText.replace('”','').replace('“','')); })
      return reviews;
    }
    var Date = false;
    if(document.querySelector('[data-placeholder="Check-in Date"]')){
      document.querySelector('[data-placeholder="Check-in Date"]').innerText == 'Check-in Date';
      Date = true;
    }
    
    chrome.storage.local.get(['hotel_detail'], function(result) {
    ScrapeData = {
        'hotel_name' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : result.hotel_detail.hotel_name,
        'hotel_street' :  (document.querySelector('[data-node_tt_id=location_score_tooltip]'))  ? document.querySelector('[data-node_tt_id=location_score_tooltip]').textContent.trim().split(',').slice(0, -1).join(' ') : result.hotel_detail.hotel_address,
        'hotel_country' :  (document.querySelector('[data-node_tt_id=location_score_tooltip]')) ? document.querySelector('[data-node_tt_id=location_score_tooltip]').textContent.trim().split(',').pop().trim() : result.hotel_detail.hotel_country,
        'room_rate' :  (Date) ? get_prices() : 'Please Select Dates',
        // 'tax' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        'rating' :  (document.querySelector('[data-testid=rating-stars]')) ? document.querySelector('[data-testid=rating-stars]').childNodes.length : '0',
        'total_reviews' : (document.querySelector('[rel=reviews]')) ? document.querySelector('[rel=reviews]').textContent.trim().split('(')[1].replace(')','') : '',
        'reviews' :  (document.querySelectorAll('[data-testid=featuredreview-text]')[0]) ? get_reviews() : result.hotel_detail.reviews,
        // All Reviews
        // document.querySelectorAll('[data-testid=featuredreview-text]').forEach(element=>{ console.log(element.innerText); })
        // document.getElementsByClassName('hp-price-left-align hprt-table-cell hprt-table-cell-price')[0].innerText.split('\n')
    }
  });
  }
  function get_prices(){
    const prices_arr = [];
    var rooms_arr = {};
    var prices_ele = document.getElementsByClassName('hp-price-left-align hprt-table-cell hprt-table-cell-price');
    var room_ele = document.getElementsByClassName('hprt-table-cell -first hprt-table-cell-roomtype');
    var arr_len = prices_ele.length;
    var room_types = room_ele.length;
    var rooms_prices = {};
    for(var i = 0; i < arr_len; i++){
      prices_arr.push(prices_ele[i].innerText.split('\n')[0]);
    }
    for(var i = 0; i < room_types; i++){
      rooms_arr[room_ele[i].getElementsByClassName('hprt-roomtype-icon-link')[0].innerText] = room_ele[i].getAttribute('rowspan');
    }
    var get_keys = Object.entries(rooms_arr);
    for(var i = 0; i < get_keys.length; i++){
      rooms_prices[get_keys[i][0]] = prices_arr.splice(0,get_keys[i][1])
    }
    return JSON.stringify(rooms_prices);
  }
  function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY + 10;
  }
  function getMouseX() {
    return x;
  }
  function getMouseY() {
    return y;
  }
  function tooltip_fields(){
    var string = '';
    var fields = [
      'Hotel Name',
      'Hotel Address',
      'Hotel Country',
      'Total Reviews',
      'Room Rate',
      'Rating',
      'Reviews',
      'Tax'
    ];
    for(var i = 0; i < fields.length; i++){
      string += '<a class="nav-item" id="'+fields[i].toLowerCase().replace(' ','_')+'">'+fields[i]+'</a>';
    }
    return string;
  }
  var hotel_detail = {};
  function tooltip(selectionText) {
    let tooltip_style = '<style>@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap");.nav,.nav-item{position:relative}.nav-item:before,.nav1 .nav-item:before{width:100%;height:5px;background-color:#dfe2ea;opacity:0}*{-webkit-box-sizing:border-box;box-sizing:border-box}body{margin:0;padding:0}.wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.nav{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;overflow:hidden;max-width:730px;background-color:#f5f5f5;padding:0 20px;border-radius:20px}.nav-item{cursor:pointer;color:#83818c;padding:7px 14px;text-decoration:none;-webkit-transition:.3s;-o-transition:.3s;transition:.3s;margin:0 6px;z-index:1;font-family:"Open Sans",sans-serif;font-weight:700}.nav-item:before{content:"";position:absolute;-webkit-transition:.3s;-o-transition:.3s;transition:.3s}.nav-item:not(.active):hover:before{opacity:1;bottom:0}.nav-item:not(.active):hover{color:#333}.nav-indicator{position:absolute;bottom:0;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;height:5px;z-index:1}.nav1 .nav-indicator{height:5px;left:0;border-radius:8px 8px 0 0}.nav1 .nav-item:before{bottom:-6px;left:0;border-radius:8px 8px 0 0;-webkit-transition:.3s;-o-transition:.3s;transition:.3s}@media (max-width:992px){.wrapper{padding:30px 0}}@media only screen and (max-width:768px){.nav{min-width:100%}.nav1{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.nav-item{padding:25px 15px}}@media (max-width:580px){.nav1{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;overflow-x:auto}}'
    +'</style>';
    let tooltip_menu = tooltip_style
    +'<div class="wrapper"> <nav class="nav nav1">'
    +tooltip_fields()
    +'<span class="nav-indicator"></span> </nav></div>';
    (document.querySelector("#ttdiv")) ?.remove();
    var tooltip = document.createElement("span");
    tooltip.id = 'ttdiv'
    tooltip.style.position = 'absolute';
    tooltip.style.color = '#FFFFFF'
    tooltip.style.top = getMouseY() + 'px';
    tooltip.style.left = getMouseX() + 'px';
    tooltip.style.display = 'inline-flex';
    tooltip.innerHTML = tooltip_menu;
    document.body.appendChild(tooltip);
    document.getElementById("hotel_name").onclick = function(){
      set_storage('hotel_name', selectionText); 
    }
    document.getElementById("hotel_address").onclick = function(){
      set_storage('hotel_address', selectionText); 
    }
    document.getElementById("hotel_country").onclick = function(){
      set_storage('hotel_country', selectionText); 
    }
    document.getElementById("total_reviews").onclick = function(){
      set_storage('total_reviews', selectionText); 
    }
    document.getElementById("room_rate").onclick = function(){
      set_storage('room_rate', selectionText); 
    }
    document.getElementById("rating").onclick = function(){
      set_storage('rating', selectionText); 
    }
    document.getElementById("tax").onclick = function(){
      set_storage('tax', selectionText); 
    }
    document.getElementById("reviews").onclick = function(){
      set_storage('reviews', selectionText); 
    }
    return;
  }
  function set_storage(key, value){
    hotel_detail[key] = value;
    chrome.storage.local.set({hotel_detail});
    document.querySelector("#ttdiv").remove();
  }
  
//   document.addEventListener('mousedown', (event) => {
//     event.preventDefault();
//     setTimeout(() => {
//         if (window.getSelection) {
//             if (window.getSelection().empty) {  // Chrome
//                 window.getSelection().empty();
//             } else if (window.getSelection().removeAllRanges) {  // Firefox
//                 window.getSelection().removeAllRanges();
//             }
//         } else if (document.selection) {  // IE?
//             document.selection.empty();
//         }
//         (document.querySelector("#ttdiv")) ? document.querySelector("#ttdiv").remove() : '';
//     }, 100)
// })
