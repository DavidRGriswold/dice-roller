var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TLN = {
    eventList: {},
    update_line_numbers: function (ta, el) {
        var lines = ta.value.split("\n").length;
        var child_count = el.children.length;
        var difference = lines - child_count;
        if (difference > 0) {
            var frag = document.createDocumentFragment();
            while (difference > 0) {
                var line_number = document.createElement("span");
                line_number.className = "tln-line";
                frag.appendChild(line_number);
                difference--;
            }
            el.appendChild(frag);
        }
        while (difference < 0) {
            el.removeChild(el.firstChild);
            difference++;
        }
    },
    append_line_numbers: function (id) {
        var ta = document.getElementById(id);
        if (ta == null) {
            return console.warn("[tln.js] Couldn't find textarea of id '" + id + "'");
        }
        if (ta.className.indexOf("tln-active") != -1) {
            return console.warn("[tln.js] textarea of id '" + id + "' is already numbered");
        }
        ta.classList.add("tln-active");
        ta.style = {};
        var el = document.createElement("div");
        ta.parentNode.insertBefore(el, ta);
        el.className = "tln-wrapper";
        TLN.update_line_numbers(ta, el);
        TLN.eventList[id] = [];
        var __change_evts = [
            "propertychange", "input", "keydown", "keyup"
        ];
        var __change_hdlr = function (ta, el) {
            return function (e) {
                if ((+ta.scrollLeft == 10 && (e.keyCode == 37 || e.which == 37
                    || e.code == "ArrowLeft" || e.key == "ArrowLeft"))
                    || e.keyCode == 36 || e.which == 36 || e.code == "Home" || e.key == "Home"
                    || e.keyCode == 13 || e.which == 13 || e.code == "Enter" || e.key == "Enter"
                    || e.code == "NumpadEnter")
                    ta.scrollLeft = 0;
                TLN.update_line_numbers(ta, el);
            };
        }(ta, el);
        for (var i = __change_evts.length - 1; i >= 0; i--) {
            ta.addEventListener(__change_evts[i], __change_hdlr);
            TLN.eventList[id].push({
                evt: __change_evts[i],
                hdlr: __change_hdlr
            });
        }
        var __scroll_evts = ["change", "mousewheel", "scroll"];
        var __scroll_hdlr = function (ta, el) {
            return function () { el.scrollTop = ta.scrollTop; };
        }(ta, el);
        for (var i = __scroll_evts.length - 1; i >= 0; i--) {
            ta.addEventListener(__scroll_evts[i], __scroll_hdlr);
            TLN.eventList[id].push({
                evt: __scroll_evts[i],
                hdlr: __scroll_hdlr
            });
        }
    },
    remove_line_numbers: function (id) {
        var ta = document.getElementById(id);
        if (ta == null) {
            return console.warn("[tln.js] Couldn't find textarea of id '" + id + "'");
        }
        if (ta.className.indexOf("tln-active") == -1) {
            return console.warn("[tln.js] textarea of id '" + id + "' isn't numbered");
        }
        ta.classList.remove("tln-active");
        ta.previousSibling.remove();
        if (!TLN.eventList[id])
            return;
        for (var i = TLN.eventList[id].length - 1; i >= 0; i--) {
            var evt = TLN.eventList[id][i];
            ta.removeEventListener(evt.evt, evt.hdlr);
        }
        delete TLN.eventList[id];
    }
};
var animationID;
var randomNumbers = [];
function rolldice() {
    return __awaiter(this, void 0, void 0, function () {
        var numDice, sides, outputValue, animationOut;
        return __generator(this, function (_a) {
            numDice = parseInt(document.getElementById("numDice").value);
            sides = document.getElementById("sideList")
                .value.trim().split("\n");
            outputValue = "";
            animationOut = "";
            //If there aren't a positive number of dice or sides, give up
            if (numDice < 1 || sides.length == 0) {
                document.getElementById("outcomes").innerHTML = "Something isn't right, check your data.";
            }
            else if (document.getElementById("animateCheck").checked == false) {
                doAnimation(10);
            }
            else {
                doAnimation(1);
            }
            return [2 /*return*/];
        });
    });
}
var randomizeDiceList = function () {
    return __awaiter(this, void 0, void 0, function () {
        var numDice, sides, dl, nums, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numDice = parseInt(document.getElementById("numDice").value);
                    sides = document.getElementById("sideList").value.trim().split("\n");
                    dl = [];
                    return [4 /*yield*/, getRandomNumbers(numDice, sides.length)];
                case 1:
                    nums = _a.sent();
                    for (i = 0; i < numDice; i++) {
                        dl.push(sides[nums[i]].trim());
                    }
                    return [2 /*return*/, dl];
            }
        });
    });
};
//callback takes the numbers as an argument
var getRandomNumbers = function (n, mx) {
    return __awaiter(this, void 0, void 0, function () {
        var numbers, i;
        return __generator(this, function (_a) {
            numbers = [];
            for (i = 0; i < n; i++) {
                numbers.push(Math.floor(Math.random() * mx));
            }
            return [2 /*return*/, numbers];
        });
    });
};
var buildDiceTable = function (dl) {
    return __awaiter(this, void 0, void 0, function () {
        var numDice, outputValue, i;
        return __generator(this, function (_a) {
            numDice = dl.length;
            outputValue = "<table>\n<tr>\n<th>Dice #</th>\n<th>Outcome</th>\n</tr>";
            // this loops through and picks an outcome for each die, building new rows
            // of the HTML table as it goes
            for (i = 0; i < numDice; i++) {
                outputValue += "<tr>\n<td>" + (i + 1) + "</td>\n<td>" + dl[i] + "</td>\n</tr>\n";
            }
            outputValue += "</table>\n";
            document.getElementById("outcomes").innerHTML = outputValue;
            return [2 /*return*/];
        });
    });
};
var doAnimation = function (frame) {
    return __awaiter(this, void 0, void 0, function () {
        var dl, animateDiv, html, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //go ahead and clear any intervals to avoid accidental duplication
                    clearInterval(animationID);
                    return [4 /*yield*/, randomizeDiceList()];
                case 1:
                    dl = _a.sent();
                    animateDiv = document.getElementById("animations");
                    html = "";
                    for (i = 0; i < dl.length; i++) {
                        html += "<div class='die'>" + dl[i] + "</div>";
                    }
                    animateDiv.innerHTML = html;
                    if (frame >= 10) {
                        buildDiceTable(dl);
                    }
                    else {
                        animationID = setInterval(function () { doAnimation(frame + 1); }, 100);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=rolling.js.map