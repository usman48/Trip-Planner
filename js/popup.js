document.addEventListener("DOMContentLoaded", function() {
    // Load();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "popup"}, function(response) {
            if(response){
                (response.Data.hotel_name != '') ? document.getElementById("hotel_name").value = response.Data.hotel_name :'';
                (response.Data.hotel_street != '') ? document.getElementById("hotel_street").value = response.Data.hotel_street :'';
                (response.Data.hotel_country != '') ? document.getElementById("hotel_country").value = response.Data.hotel_country :'';
                (response.Data.total_reviews != '') ? document.getElementById("total_reviews").value = response.Data.total_reviews :'';
                (response.Data.rating != '') ? document.getElementById("rating").value = response.Data.rating :'';
                (response.Data.reviews != '') ? document.getElementById("reviews").value = response.Data.reviews :'';
                (response.Data.room_rate != '') ? document.getElementById("room_rate").value = response.Data.room_rate :'';
            }
        });
      });
  });
  if(document.getElementById('save-btn')){
    document.getElementById('save-btn').addEventListener('click', function () {
        let url = document.getElementById('text-input').value;
        if (url != '') {
            let capturedId = url.match(/\/d\/(.+)\//);
            console.log(capturedId[1]);
            chrome.storage.local.set({sheetId: capturedId[1]});
            chrome.storage.local.set({sheetUrl: url});
            const SHEET_ID = chrome.storage.local.get(['accessToken']);
            SHEET_ID.then((res) => {
                console.log(res.accessToken);
                const base = `https://sheets.googleapis.com/v4/spreadsheets/${capturedId[1]}`;
                fetch(base,{
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${res.accessToken}`
                    }}).then(res => res.json()).then(rep => {
                            (document.getElementById("sheet_name").parentElement.style.display == 'none') ? document.getElementById("sheet_name").parentElement.style.display = 'block' : ''
                            document.getElementById("sheet_name").innerText = rep.properties.title;
                            // document.querySelector('select').innerHTML = "";
                            // rep.sheets.forEach(titles);
                            // function titles(item,index){
                            //     console.log(item.properties.title);
                            //     const option = document.createElement("OPTION");
                            //     const name = document.createTextNode(item.properties.title);
                            //     option.value = item.properties.title;
                            //     option.appendChild(name);
                            //     document.querySelector('select').appendChild(option);
                            //     }
                                // const sheetName = document.getElementById('select').value;
                                // browser.storage.local.set({'sheetName': sheetName});
                                // document.getElementById('select').addEventListener('change', function(e) {
                                //      browser.storage.local.set({'sheetName': e.target.value});
                                //             });
                        })
            })
        } 
    });
  }


// function Load(){
//     document.getElementById("customRadioInline1").checked = true;
//     document.getElementById('custom').style.display = 'none';
//     document.querySelectorAll("input[name='filter']").forEach((input) => {
//         input.addEventListener('change', checkRadio);
//     });
// }
