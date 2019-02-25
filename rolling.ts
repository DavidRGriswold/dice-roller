const TLN = {
    eventList: {},
    update_line_numbers: function (ta, el) {
        let lines = ta.value.split("\n").length;
        let child_count = el.children.length;
        let difference = lines - child_count;

        if (difference > 0) {
            let frag = document.createDocumentFragment();
            while (difference > 0) {
                let line_number = document.createElement("span");
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
        let ta = document.getElementById(id);
        if (ta == null) {
            return console.warn("[tln.js] Couldn't find textarea of id '" + id + "'");
        }
        if (ta.className.indexOf("tln-active") != -1) {
            return console.warn("[tln.js] textarea of id '" + id + "' is already numbered");
        }
        ta.classList.add("tln-active");
        ta.style = {};

        let el = document.createElement("div");
        ta.parentNode.insertBefore(el, ta);
        el.className = "tln-wrapper";
        TLN.update_line_numbers(ta, el);
        TLN.eventList[id] = [];

        const __change_evts = [
            "propertychange", "input", "keydown", "keyup"
        ];
        const __change_hdlr = function (ta, el) {
            return function (e) {
                if ((+ta.scrollLeft == 10 && (e.keyCode == 37 || e.which == 37
                    || e.code == "ArrowLeft" || e.key == "ArrowLeft"))
                    || e.keyCode == 36 || e.which == 36 || e.code == "Home" || e.key == "Home"
                    || e.keyCode == 13 || e.which == 13 || e.code == "Enter" || e.key == "Enter"
                    || e.code == "NumpadEnter")
                    ta.scrollLeft = 0;
                TLN.update_line_numbers(ta, el);
            }
        }(ta, el);
        for (let i = __change_evts.length - 1; i >= 0; i--) {
            ta.addEventListener(__change_evts[i], __change_hdlr);
            TLN.eventList[id].push({
                evt: __change_evts[i],
                hdlr: __change_hdlr
            });
        }

        const __scroll_evts = ["change", "mousewheel", "scroll"];
        const __scroll_hdlr = function (ta, el) {
            return function () { el.scrollTop = ta.scrollTop; }
        }(ta, el);
        for (let i = __scroll_evts.length - 1; i >= 0; i--) {
            ta.addEventListener(__scroll_evts[i], __scroll_hdlr);
            TLN.eventList[id].push({
                evt: __scroll_evts[i],
                hdlr: __scroll_hdlr
            });
        }
    },
    remove_line_numbers: function (id) {
        let ta = document.getElementById(id);
        if (ta == null) {
            return console.warn("[tln.js] Couldn't find textarea of id '" + id + "'");
        }
        if (ta.className.indexOf("tln-active") == -1) {
            return console.warn("[tln.js] textarea of id '" + id + "' isn't numbered");
        }
        ta.classList.remove("tln-active");

        ta.previousSibling.remove();

        if (!TLN.eventList[id]) return;
        for (let i = TLN.eventList[id].length - 1; i >= 0; i--) {
            const evt = TLN.eventList[id][i];
            ta.removeEventListener(evt.evt, evt.hdlr);
        }
        delete TLN.eventList[id];
    }
}

var animationID: number;
var randomNumbers: number[] = [];

async function rolldice() {
    //the lines below read the elements from the web page to get the
    //number of dice and list of sides. The ".trim()" removes any extra blank
    //lines while the ".split("\n")" breaks the list of dice into
    //an array of individual values

    var numDice: number =
        parseInt((document.getElementById("numDice") as HTMLInputElement).value);
    var sides: string[] =
        (document.getElementById("sideList") as HTMLInputElement)
            .value.trim().split("\n");

    //outputValue will contain the HTML for the outcomes
    var outputValue: string = "";
    var animationOut: string = "";

    //If there aren't a positive number of dice or sides, give up
    if (numDice < 1 || sides.length == 0) {
        document.getElementById("outcomes").innerHTML = "Something isn't right, check your data."
    } else if ((document.getElementById("animateCheck") as HTMLInputElement).checked == false) {
        doAnimation(10);
    } else {
        doAnimation(1);
    }
}

var randomizeDiceList = async function () {
    var numDice: number = parseInt((<HTMLInputElement>document.getElementById("numDice")).value);
    var sides: string[] = (<HTMLInputElement>document.getElementById("sideList")).value.trim().split("\n");
    var dl: string[] = [];
    var nums: number[] = await getRandomNumbers(numDice, sides.length);
    for (let i = 0; i < numDice; i++) {
        dl.push(sides[nums[i]].trim());
    }
    return dl;
}

//callback takes the numbers as an argument
var getRandomNumbers = async function (n: number,
    mx: number) {

    var numbers: number[] = [];
    for (let i = 0; i < n; i++) {
        numbers.push(Math.floor(Math.random() * mx));
    }
    return numbers;
}

var buildDiceTable = async function (dl: string[]) {
    //if not animating, go ahead and build a table
    var numDice = dl.length;
    //this makes the header of our table
    var outputValue = "<table>\n<tr>\n<th>Dice #</th>\n<th>Outcome</th>\n</tr>"
    // this loops through and picks an outcome for each die, building new rows
    // of the HTML table as it goes
    for (let i = 0; i < numDice; i++) {
        outputValue += "<tr>\n<td>" + (i + 1) + "</td>\n<td>" + dl[i] + "</td>\n</tr>\n";
    }
    outputValue += "</table>\n";
    document.getElementById("outcomes").innerHTML = outputValue;
}

var doAnimation = async function (frame: number) {
    //go ahead and clear any intervals to avoid accidental duplication
    clearInterval(animationID);
    var dl: string[] = await randomizeDiceList();
    var animateDiv = document.getElementById("animations");
    var html = "";
    for (var i = 0; i < dl.length; i++) {
        html += "<div class='die'>" + dl[i] + "</div>"
    }
    animateDiv.innerHTML = html;
    if (frame >= 10) {
        buildDiceTable(dl);
    } else {
        animationID = setInterval(function () { doAnimation(frame + 1) }, 100);
    }

}