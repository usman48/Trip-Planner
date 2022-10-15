document.addEventListener("DOMContentLoaded", function() {
    // Load();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "popup"}, function(response) {
            if(response){
                (response.Data.hotel_name != '') ? document.getElementById("hotel_name").innerText = response.Data.hotel_name :'';
                (response.Data.hotel_street != '') ? document.getElementById("hotel_street").innerText = response.Data.hotel_street :'';
                (response.Data.hotel_country != '') ? document.getElementById("hotel_country").innerText = response.Data.hotel_country :'';
                (response.Data.total_reviews != '') ? document.getElementById("total_reviews").innerText = response.Data.total_reviews :'';
                (response.Data.rating != '') ? document.getElementById("rating").innerText = response.Data.rating :'';
                (response.Data.reviews != '') ? document.getElementById("reviews").innerText = response.Data.reviews :'';
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
// function checkRadio(event) {
//     if(event.target.id == "customRadioInline1"){
//         document.getElementById("customRadioInline1").checked = true;
//         document.getElementById("customRadioInline2").checked = false;
//         document.getElementById('custom').style.display = 'none';
//     } else if (event.target.id == "customRadioInline2"){
//         document.getElementById("customRadioInline1").checked = false;
//         document.getElementById("customRadioInline2").checked = true;
//         document.getElementById('custom').style.display = 'flex';
//     }
// }