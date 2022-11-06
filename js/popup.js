document.addEventListener("DOMContentLoaded", function() {
    // Load();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "popup"}, function(response) {
            if(response){
                chrome.storage.local.get(null, function(result) {
                    console.log(result);
                (result.sheet_detail) ? (
                    document.getElementById("sheet_url").value = result.sheet_detail.sheetUrl,
                    document.getElementById("sheet_name").value = result.sheet_detail.sheetName,
                    document.querySelector('select').innerHTML = '<option value="Sheet1">Sheet1</option>'
                    ) :'';
                (response.Data.hotel_name != '') ? document.getElementById("hotel_name").value = response.Data.hotel_name : document.getElementById("hotel_name").value = result.hotel_detail.hotel_name;
                (response.Data.hotel_street != '') ? document.getElementById("hotel_street").value = response.Data.hotel_street : document.getElementById("hotel_street").value = result.hotel_detail.hotel_address;
                (response.Data.hotel_country != '') ? document.getElementById("hotel_country").value = response.Data.hotel_country : document.getElementById("hotel_country").value = result.hotel_detail.hotel_country;
                (response.Data.total_reviews != '') ? document.getElementById("total_reviews").value = response.Data.total_reviews : document.getElementById("total_reviews").value = result.hotel_detail.total_reviews;
                (response.Data.rating != '') ? document.getElementById("rating").value = response.Data.rating : document.getElementById("rating").value = result.hotel_detail.rating;
                (response.Data.reviews != '') ? document.getElementById("reviews").value = response.Data.reviews : document.getElementById("reviews").value = result.hotel_detail.reviews;
                (response.Data.room_rate != '') ? document.getElementById("room_rate").value = response.Data.room_rate : document.getElementById("room_rate").value = result.hotel_detail.room_rate;
            });
            }
        });
      });
  });
  if(document.getElementById('save-btn')){
    document.getElementById('save-btn').addEventListener('click', function (e) {
        e.preventDefault();
        let url = document.getElementById('sheet_url').value;
        if (url != '') {
            var sheet_detail = {};
            let capturedId = url.match(/\/d\/(.+)\//);
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
                            document.getElementById("sheet_name").value = rep.properties.title;
                            document.querySelector('select').innerHTML = "";
                            rep.sheets.forEach(titles);
                            function titles(item,index){
                                console.log(item.properties.title);
                                const option = document.createElement("OPTION");
                                const name = document.createTextNode(item.properties.title);
                                option.value = item.properties.title;
                                option.appendChild(name);
                                document.querySelector('select').appendChild(option);
                                sheet_detail = {
                                    'sheetId' : capturedId[1],
                                    'sheetUrl' : url,
                                    'sheetName' : rep.properties.title,
                                    'subSheet' : item.properties.title
                                }
                                chrome.storage.local.set({sheet_detail: sheet_detail});
                                }
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
  if(document.getElementById('planner_form')){
    document.getElementById('planner_form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
            ...memo,
            [key]: value,
        }), {});
        console.log(JSON.stringify(data));
       const SHEET_ID = chrome.storage.local.get(['sheetId', 'accessToken', 'data']);
        SHEET_ID.then((res) => {
                let sheet = res.sheetId;
                const token = res.accessToken;
                res.data = data;
                f(sheet,token,res);
                })
            });
        }
function f(sheet,token, res){
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheet}/values/Sheet1!A:B:append?valueInputOption=USER_ENTERED`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
                    },
            body: JSON.stringify({
                majorDimension: 'ROWS',
                values: [res.data]
                })

})
}