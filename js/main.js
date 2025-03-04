var YEAR = "25";

$("wieecs-year").val(YEAR);
// prettier-ignore
fields = [
    ['#invoice-num-form', '.invoice-num', YEAR+'xx'],
    ['#po-num-form', '.po-num', 'PO #'],
    ['#tier-form', '.tier', 'Tier'],
    ['#deadline-form', '.deadline', 'deadline'],
    ['#company-name-form', '.company-name', 'Company Name'],
    ['#company-rep-form', '.company-rep', 'Company Rep Name'],
    ['#company-addr1-form', '.company-addr1', 'Company Address Line 1'],
    ['#company-addr2-form', '.company-addr2', 'Company Rep email']
];
// for indexing into perks in GenerateJSON who tf made this wack--
var tiers = { Bronze: 4, Silver: 5, Gold: 6 };
var perks = [
  [
    "ITEM",
    "sponsor",
    "root",
    "WiEECS 2025 Sponsor",
    "WiEECS 2025 Bronze Sponsor",
    "WiEECS 2025 Silver Sponsor",
    "WiEECS 2025 Gold Sponsor",
  ],
  [
    "ITEMPRICE",
    "sponsor-price",
    "sponsor",
    "0",
    "1000",
    "3000",
    "5000",
  ],
  [
    "SUBITEM",
    "resume",
    "sponsor",
    "Access to resume book",
    "Y",
    "Y",
    "Y",
  ],
  [
    "SUBITEM",
    "community",
    "sponsor",
    "Community events",
    "Y",
    "Y",
    "Y",
  ],
  [
    "SUBITEM",
    "sponsored-scholarships",
    "sponsor",
    "Sponsored scholarships",
    "",
    "",
    "Y",
  ],
  [
    "SUBITEM",
    "marketing",
    "sponsor",
    "Distribution of marketing materials",
    "Y",
    "Y",
    "Y",
  ],
  [
    "SUBITEM",
    "logo",
    "sponsor",
    "Logo on website",
    "",
    "Y",
    "Y",
  ],
  [
    "SUBITEM",
    "social-media",
    "sponsor",
    "Social media shout-out",
    "",
    "",
    "Y",
  ],
];
//SUBITEM: category for setting custom amounts for different tiers

//TIRED ME DONT MESS WITH THIS I THINK ITS FINE
function generatePerks() {
  // TYPE,SHORTNAME,PARENT,DEFAULT,Bronze,Silver,Gold,Platinum,Diamond, values (optional)
  YEAR = "25";
  var placer = $("#perks1");
  for (var i = 0; i < perks.length; i++) {
    // perk: ITEM, SUBITEM, ITEMPRICE, and now introducing SUBITEMVALUE yayyy
    // id: perk-SHORTNAME-form
    var perk = perks[i];
    var id = "perk-" + perk[1] + "-form";
    // ----ITEM-----
    if (perk[0] == "ITEM") {
      placer
        .append($("<input>").attr("type", "checkbox").attr("id", id))
        .append($("<label>").attr("for", id).text(perk[3]));
    } else if (perk[0] == "ITEMPRICE") {
      placer
        .append($("<label>").attr("for", id).text("Cost: "))
        .append(
          $("<input>")
            .attr("type", "number")
            .attr("parent", perk[2])
            .attr("id", id)
            .attr("value", perk[3])
        );
    } else if (perk[0] == "SUBITEM") {
      placer = $("#perks2");
      if (i > (perks.length * 2) / 3) {
        placer = $("#perks3");
      }
      placer
        .append($("<input>").attr("type", "checkbox").attr("id", id))
        .append($("<label>").attr("for", id).text(perk[3]));
      if (perk.length >= 10) {
        vals = perk[9];
        placer.append("<br>");
        placer.append($("<label>").attr("for", id)).append(
          $("<input>")
            .attr("type", "number")
            .attr("id", "perk-" + perk[1] + "num" + "-form")
            .attr("value", vals[1])
        );
      }
    }
    placer.append("<br>");
    // $('#perks-list').append("<li contenteditable='true' class=\"perk-" + perks[i][1] + "\">" + perks[i][0] + "</li>");
  }
}

var data = {
  tier: "",
  invoiceNum: YEAR + "xx",
  poNum: "",
  companyName: "",
  companyRep: "",
  companyAddress: "",
  companyEmail: "",
  deadline: "",
  items: [],
};
function generateJSON() {
  // TYPE,SHORTNAME,PARENT,DEFAULT,Bronze,Silver,Gold,Platinum,Diamond
  //index -- retrieving index value for respective input tier
  var index = tiers[data.tier];
  data.deadline = $("#deadline-form").val();
  perks.forEach(function (perk) {
    if (perk[0] === "ITEM") {
      //if perk is checked
      if ($("#perk-" + perk[1] + "-form").prop("checked")) {
        var added = false;
        for (var v = 0; v < data.items.length; v++) {
          if (data.items[v].key === perk[1]) {
            // Don't do anything if already added
            added = true;
            if (index !== undefined && perk[index] !== "") {
              data.items[v].name = perk[index];
            }
          }
        }
        if (!added) {
          var newItem = {
            key: perk[1],
            name: perk[3],
            items: [],
          };
          data.items.push(newItem);

          if (index !== undefined && perk[index] !== "") {
            newItem.name = perk[index];
          }
        }
      } else {
        for (var v = 0; v < data.items.length; v++) {
          if (data.items[v].key === perk[1]) {
            data.items.pop(v);
          }
        }
      }
    } else if (perk[0] == "ITEMPRICE") {
      for (var v = 0; v < data.items.length; v++) {
        if (data.items[v].key === perk[2]) {
          if ($("#perk-" + perk[1] + "-form").val() !== "0") {
            data.items[v].cost = $("#perk-" + perk[1] + "-form").val();
          } else if (index !== undefined && perk[index] !== "") {
            data.items[v].cost = perk[index];
          } else {
            data.items[v].cost = 0;
          }
        }
      }
    } else if (perk[0] == "SUBITEM") {
      for (var v = 0; v < data.items.length; v++) {
        if (data.items[v].key === perk[2]) {
          var items = data.items[v].items;
          if ($("#perk-" + perk[1] + "-form").prop("checked") === true) {
            var found = false;
            for (var i = 0; i < items.length; i++) {
              if (items[i].key === perk[1]) {
                found = true;
                break;
              }
            }
            if (!found) {
              if (perk.length > 10) {
                var value = 0;
                var text = perk[10][0];
                if (
                  String($("#perk-" + perk[1] + "num" + "-form").val()) !== "0"
                ) {
                  value = [text, $("#perk-" + perk[1] + "num" + "-form").val()];
                } else if (index !== undefined && perk[index] !== "") {
                  value = [text, perk[9][index - 2]];
                  if (value[1] == "5+") {
                    $("#perk-" + perk[1] + "num" + "-form").val("5");
                  } else {
                    $("#perk-" + perk[1] + "num" + "-form").val(value[1]);
                  }
                }
                items.push({ key: perk[1], name: perk[3], num: value });
              } else {
                items.push({ key: perk[1], name: perk[3] });
              }
            } else {
              if (perk.length > 10) {
                for (var v = 0; v < items.length; v++) {
                  if (items[v].key === perk[1]) {
                    var text = perk[10][0];
                    if ($("#perk-" + perk[1] + "num" + "-form").val() !== "0") {
                      items[v].num = [
                        text,
                        $("#perk-" + perk[1] + "num" + "-form").val(),
                      ];
                    } else if (index !== undefined && perk[index] !== "") {
                      items[v].num = [text, perk[9][index]];
                    }
                    break;
                  }
                }
              }
            }
          } else {
            for (var i = 0; i < items.length; i++) {
              if (items[i].key === perk[1]) {
                items.splice(i, 1);
                break;
              }
            }
          }
        }
      }
    }
  });
  $("#jsontextarea").val(JSON.stringify(data, null, 2));
  return data;
}
function listen(formElement, invoiceElement, defaultVal, change) {
  var event = change ? "input change" : "input";
  formElement.on(event, function (e) {
    var val = formElement.val();
    if (val) {
      if (formElement.attr("type") === "number") {
        val = val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      }
      if (formElement.attr("id") === "invoice-num-form") {
        data.invoiceNum = val;
      } else if (formElement.attr("id") === "po-num-form") {
        data.poNum = val;
      } else if (formElement.attr("id") === "tier-form") {
        data.tier = val;
        data.items = [];
        perks.forEach(function (perk) {
          if (String($("#perk-" + perk[1] + "num" + "-form").val()) !== "0") {
            $("#perk-" + perk[1] + "num" + "-form").val("0");
          }
        });
      } else if (formElement.attr("id") === "company-name-form") {
        data.companyName = val.replace(new RegExp(" ", "g"), "-");
      } else if (formElement.attr("id") === "company-addr1-form") {
        data.companyAddress = val;
      } else if (formElement.attr("id") === "company-addr2-form") {
        data.companyEmail = val;
      } else if (formElement.attr("id") === "company-rep-form") {
        data.companyRep = val;
      } else if (formElement.attr("id") === "deadline-form") {
        data.deadline = val;
      }
      document.title =
        data.invoiceNum + "_" + data.tier + "_" + data.companyName;
      invoiceElement.text(val);
      generateJSON();
    } else {
      invoiceElement.text(defaultVal);
    }
  });
}

function listenCheckbox(checkboxElement, invoiceElement) {
  checkboxElement.on("change", function (e) {
    if (checkboxElement.is(":checked")) {
      invoiceElement.removeClass("hide");
    } else {
      invoiceElement.addClass("hide");
    }
    generateJSON();
  });
}

function getPerksForTier(tier) {
  // TYPE,SHORTNAME,PARENT,DEFAULT,Bronze,Silver,Gold,Platinum,Diamond
  var index = tiers[tier];
  var tierPerks = [];
  perks.forEach(function (perk) {
    if (perk[0] === "SUBITEM" && perk[index].includes("Y")) {
      tierPerks.push(perk[1]);
    }
  });
  return tierPerks;
}

function updatePerks(tierFormElement) {
  var val = tierFormElement.val();
  var checked = getPerksForTier(val); // Use the first character of the tier to get perks
  if (checked && val !== "Custom") {
    perks.forEach(function (perk) {
      if (perk[0] === "SUBITEM") {
        if (checked.indexOf(perk[1]) > -1) {
          $("#perk-" + perk[1] + "-form").prop("checked", true);
          $(".perk-" + perk[1]).removeClass("hide");
        } else {
          $("#perk-" + perk[1] + "-form").prop("checked", false);
          $(".perk-" + perk[1]).addClass("hide");
        }
      }
    });
  } else {
  }
  generateJSON();
}

/* ---------------- MAIN ------------------------------- */

$(document).ready(function () {
  generatePerks(); //populate perks based on list in this JS file
  //update index.asdf for the new year hell yeah
  document.title += YEAR;
  $("wieecs-year").val(YEAR);
  // initialize datepicker
  $("#deadline-form").datepicker({
    dateFormat: "MM d, yy",
  });

  fields.forEach(function (field) {
    listen($(field[0]), $(field[1]), field[2], field[0] === "#deadline-form");
  });

  perks.forEach(function (item) {
    listenCheckbox($("#perk-" + item[1] + "-form"), $(".perk-" + item[1]));
  });

  var date = moment().format("MMMM D, YYYY");
  $(".date").text(date);

  $("#tier-form").on("input", function (e) {
    updatePerks($("#tier-form"));
  });

  $("#pdf-button").click(function () {
    const data = generateJSON();
    // Return data as minified JSON
    const mywindow = window.open(
      "generate.html?data=" + encodeURIComponent(JSON.stringify(data)),
      "Print",
      "height=600,width=800"
    );
  });
});
