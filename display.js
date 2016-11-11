// Function which clears the previous results
// Also to clear the table from the page, added a button to clear data which inturn calls DeleteRows()
function DeleteRows() {
  var table = document.getElementById("water");
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

// loads the data onto the table
function loadData(){
            var data_file = "employee.json";
            var http_request = new XMLHttpRequest();
            try{
               // Opera 8.0+, Firefox, Chrome, Safari
               http_request = new XMLHttpRequest();
             }
             catch (e){
               // Internet Explorer Browsers
               try{
                  http_request = new ActiveXObject("Msxml2.XMLHTTP");
               }
               catch (e){
                  try{
                     http_request = new ActiveXObject("Microsoft.XMLHTTP");
                  }
                  catch (e){
                     // Something went wrong
                     alert("Your browser broke!");
                     return false;
                  }
               }
            }
            http_request.onreadystatechange = function(){
               if (http_request.readyState == 4  ){
                  // Javascript function JSON.parse to parse JSON data
                  var jsonObj = JSON.parse(http_request.responseText);

                  // Name that is entered in the searchbox
                  var nameEntered = document.getElementById("name").value;
                  var table = document.getElementById("water");
                  var tbody = document.createElement("tbody");
                  var len = Object.keys(jsonObj).length; // Calculating length of Obj
                  DeleteRows();
                  for(var i=0;i<len;i++){
                     var tr = document.createElement("tr");
                     var pattern = new RegExp(nameEntered, 'i');
                     var my = jsonObj[i].name;
                     if(pattern.test(my)){
                       var result = jsonObj[i];
                       if(result.name === jsonObj[i].name){
                           for(var key in jsonObj[i]){
                             if (jsonObj[i].hasOwnProperty(key)) {
                             var td = document.createElement("td");
                             var txt = document.createTextNode(jsonObj[i][key]);
                             td.appendChild(txt);
                             tr.appendChild(td);
                             tbody.appendChild(tr);
                             table.appendChild(tbody);
                            }
                          }
                       }
                     }
                   }
               }
            }
            http_request.open("GET", data_file, true);
            http_request.send();
         }

// TODO
// Print no recourds found
