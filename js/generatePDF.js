function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

/* ---------------- MAIN ------------------------------- */
window.onload = function () {
  document.date += $("wieecs-year").val();
  data = JSON.parse(decodeURIComponent(getUrlParam("data")));
  $("#invoice-space").height($("#editor").height() + 20); //add extra space for the editor div
  $(window).resize(function () {
    $("#invoice-space").height($("#editor").height() + 20);
  });
  $("#pdf-button").click(function () {
    window.print();
  });
  $("#json-button").click(function () {
    var dataStr = "data:text/json;charset=utf-8," + getUrlParam("data");
    var dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", document.title + ".json");
    dlAnchorElem.click();
  });
  console.log("ur mom");
  console.log(data);
  $(".tier").text(data.tier);
  $(".company-name").text(data.companyName);
  $(".company-rep").text(data.companyRep);
  $(".company-addr1").text(data.companyAddress);
  $(".company-addr2").text(data.companyEmail);
  $(".deadline").text(data.deadline);
  $(".invoice-num").text(data.invoiceNum);
  $(".po-num").text(data.poNum);
  var date = moment().format("MMMM D, YYYY");
  $(".date").text(date);
  document.title =
    data.invoiceNum + "_" + data.tier + "_" + data.companyName + "-WiEECS";
  var totalCost = 0;
  for (var i = 0; i < data.items.length; i++) {
    var itemJSON = data.items[i];
    if (itemJSON.items.length === 0) {
      $(".details tr:last").before(
        $("<tr>")
          .attr("class", "details-info")
          .append($("<td>").text("1"))
          .append($("<td>").text(itemJSON.name))
          .append(
            $("<td>").text("$" + parseInt(itemJSON.cost).toLocaleString())
          )
      );
    } else {
      var obj = $("<ul>").attr("class", "description");
      itemJSON.items.forEach(function (e) {
        let text = new String(e.name);
        // if ("num" in e) {
        //   if (e.num[0] !== "Number of Reps: ") {
        //     console.log("poggers ", e.num);
        //     text =
        //       text + " (" + String(e.num[1]) + ")";
        //   } else {
        //     let reps = String(e.num[1]);
        //     if (e.num[1] == 5) {
        //       reps += "+";
        //     }
        //     text = reps + " " + text;
        //   }
        // }
        obj.append($("<li>").text(text));
      });
      $(".details tr:last").before(
        $("<tr>")
          .attr("class", "details-info")
          .append($("<td>").text("1"))
          .append($("<td>").text(itemJSON.name).append(obj))
          .append(
            $("<td>").text("$" + parseInt(itemJSON.cost).toLocaleString())
          )
      );
    }
    totalCost += parseInt(itemJSON.cost);
  }
  $(".amt").text(totalCost.toLocaleString());
};
