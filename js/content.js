var ScrapeData = {};
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "popup"){
        Scraping();
        sendResponse({Data: ScrapeData});
      }
    }
  );
  function Scraping(){
    ScrapeData = {
        'hotel_name' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        // 'hotel_street' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        // 'hotel_city' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        // 'hotel_country' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        // 'room_rate' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        // 'tax' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        // 'rating' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        // 'total_reviews' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
        // 'reviews' :  (document.querySelector("h2.d2fee87262.pp-header__title")) ? document.querySelector("h2.d2fee87262.pp-header__title").textContent : '',
    }
    console.log(ScrapeData);
  }