const express = require('express');
const fs = require('fs');

const request = require('request-promise');
const PlodC = express();

PlodC.generate=async function()  {
    var characters = [];
    const BOOK_YEAR = 300;

    await getData();
    return calculation();

    async function getData() {
        console.log("getData started");

        await request("https://gotdata.northeurope.cloudapp.azure.com/api/book/characters")
            .then(function (res) {
                console.log("ajax1 is success");
                characters = JSON.parse(res);
                console.log("characters has type " + typeof characters);
                console.log(characters.length);
            })
            .catch(function (e) {
                console.log(e);
            });
        return;
    }

    function calculation() {
        var output = {
            plodDistribution: plodDistribution(),
            plodAge: plodAge(),
            plodDistributionPeasants: plodDistributionPeasants(),
            maleFemale: maleFemale()
        }

        fs.writeFile("./app/components/public/Statistics/tableData.json", JSON.stringify(output), (e) => console.log("Is this null? " + e));
    }

    function isCurrent(character) {
        if (character.alive || character.hasOwnProperty('birth') && character.birth > 250 || character.hasOwnProperty('death') && character.death >= 298) {
            return true;
        }

        return false;
    }

    function plodAge() {
        var returnArray = [
            ['Age Distribution', 'Averaged Likelihood of Death']
        ];

        var distribution = [];

        for (var i = 0; i < 10; i++) {
            distribution.push({ l: i * 10, u: i * 10 + 10, sum: 0, count: 0 });
        }

        var c = 0;
        for (var i in characters) {
            var char = characters[i];
            if (!isCurrent(char) || !char.hasOwnProperty('birth') || char.plodB == 0) {
                c++;
                continue;
            }

            var birth = char.birth;
            var age = !char.alive && char.hasOwnProperty('death') ? char.death - birth : BOOK_YEAR - birth;
            var plod = char.plodB;

            for (var j in distribution) {
                if (distribution[j].l < age && distribution[j].u >= age) {
                    distribution[j].sum += plod;
                    distribution[j].count++;
                    break;
                }
            }
        }

        for (var j in distribution) {
            if (distribution[j].count > 0) {
                var avg = distribution[j].sum / distribution[j].count;
            } else {
                var avg = 0;
            }
            returnArray.push([distribution[j].l + "-" + distribution[j].u, avg * 100]);
        }

        console.log("age avg plod", c, returnArray, distribution);
        return returnArray;
    }

    function plodDistribution() {
        console.log("plodDistribution started");
        let temp = [['PLOD', 'Male', 'Female']];
        let width = 10;
        for (let i = 0; i < (100 / width); i++) {
            temp.push(["" + (i * width) + "-" + ((i + 1) * width), 0, 0]);
        }
        let male = 0;
        let female = 0;
        for (let i = 0; i < characters.length; i++) {
            let c = characters[i];
            if (isCurrent(c)) {
                if (c.plodB === 0) {
                    continue;
                }
                if (c.plodB > 1) {
                    console.log("Error in char " + c.name);
                    continue;
                }
                //console.log(c.name + " " + c.plodB);
                let index = Math.floor(c.plodB * 100 / width)+1;
                if (index >= temp.length) {
                    index = temp.length - 1;
                }
                if (c.gender === "male") {
                    male++;
                    temp[index][1]++;
                } else if (c.gender === "female") {
                    female++;
                    temp[index][2]++;
                } else {
                    console.log("diversLOL " + c.gender);
                }
            }
        }
        for (let i = 1; i <= (100 / width); i++) {
            temp[i][1]*=100;
            temp[i][2]*=100;
            temp[i][1] /= male;
            temp[i][2] /= female;
        }
        console.log(temp);
        console.log("plodDistribution finished. All " + temp.length + " data points were generated using " + (male + female) + " characters.");
        return temp;
    }

    function isNoble(char) {
        if (!char.hasOwnProperty('titles') || char.titles.length === 0) {
            return false;
        }
        return true;
    }

    function plodDistributionPeasants() {
        let schritte = 10;
        let result = [['PLOD', 'Nobles', 'Peasants']];
        let noble = 0;
        let peasants = 0;

        for (let i = 0; i < Math.floor(100 / schritte); i++) {
            result.push(["" + (i * schritte) + "-" + ((i + 1) * schritte), 0, 0]);
        }

        for (let characterIndex in characters) {
            let character = characters[characterIndex];
            if (character.plodB != 0) {
                if (isNoble(character)) {
                    noble++;
                    result[Math.floor(character.plodB * 100 / schritte) + 1][1]++;
                } else {
                    result[Math.floor(character.plodB * 100 / schritte) + 1][2]++;
                    peasants++;
                }
            }
        }

        for (let i = 1; i <= (100 / schritte); i++) {
            result[i][1]*=100;
            result[i][2]*=100;
            result[i][1] /= noble;
            result[i][2] /= peasants;
        }
        console.log("===============\nplodDistributionPeasants\n===============\n");
        console.log(result)
        return result;


    }

    function maleFemale() {
        console.log("\n=================\nmaleFemale started.\n=================\n");
        var returnArray = [
            ['Category', 'Men', 'Women']
            // ['Dead', -366, 129],
            // ['Alive', -839, 612],
            // ['Peasants', -576, 473],
            // ['Nobles', -629, 268]
        ];
        var deadMale = aliveMale = peasantsMale = noblesMale = 0;
        var deadFemale = aliveFemale = peasantsFemale = noblesFemale = 0;

        for (var i in characters) {
            var char = characters[i];
            if (!isCurrent(char) || !char.hasOwnProperty('gender')) {
                continue;
            }
            if (char.gender) {
                if (char.gender === 'male') {
                    char.alive ? aliveMale-- : deadMale--;
                    if (char.titles) {
                        char.titles.length === 0 ? peasantsMale-- : noblesMale--;
                    }
                } else if (char.gender === 'female') {
                    char.alive ? aliveFemale++ : deadFemale++;
                    if (char.titles) {
                        char.titles.length === 0 ? peasantsFemale++ : noblesFemale++;
                    }
                }
            }
        }

        returnArray.push(['Dead', deadMale, deadFemale]);
        returnArray.push(['Alive', aliveMale, aliveFemale]);
        returnArray.push(['Peasants', peasantsMale, peasantsFemale]);
        returnArray.push(['Nobles', noblesMale, noblesFemale]);
        console.log(returnArray);
        console.log("\n=================\nmaleFemale finished.\n=================\n");
        return returnArray;
    }
}

PlodC.get('/statistic', function (req, res) {
    res.status(200).send(PlodC.generate());
})

// getda();  Uncomment to run automatically


module.exports = PlodC;
