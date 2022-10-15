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
  document.addEventListener('mouseup', (event) => {
    event.preventDefault();
    // if (window.getSelection) {
    //   if (window.getSelection().empty) {  // Chrome
    //         window.getSelection().empty();
    //               } else if (window.getSelection().removeAllRanges) {  // Firefox
    //                   window.getSelection().removeAllRanges();
    //               }
    //           } else if (document.selection) {  // IE?
    //               document.selection.empty();
    //           }else{
                (document.querySelector("#ttdiv")) ? document.querySelector("#ttdiv").remove() : '';
                let Selection = window.getSelection().toString();
                (Selection.length > 5) ? tooltip() : '';
              // }

  });
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

  var x = null;
  var y = null;
  
  document.addEventListener('mousemove', onMouseUpdate, false);
  document.addEventListener('mouseenter', onMouseUpdate, false);
  
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
  function tooltip() {
    (document.querySelector("#ttdiv")) ?.remove();
    var tooltip = document.createElement("span");
    tooltip.id = 'ttdiv'
    tooltip.style.position = 'absolute';
    tooltip.style.border = '0px solid';
    tooltip.style.padding = '4px';
    tooltip.style.zIndex = '999999';
    tooltip.style.background = 'rgba(17, 24, 39, 0.6)';
    tooltip.style.borderRadius = '6px';
    tooltip.style.color = '#FFFFFF'
    tooltip.style.top = (getMouseY()) + 'px';
    tooltip.style.left = getMouseX() + 'px';
    tooltip.innerHTML = 'Selected text is too short for our AI 😅';
    document.body.appendChild(tooltip);
    return;
  }

 