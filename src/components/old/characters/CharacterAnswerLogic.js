class CharacterAnswerLogic {

    static checkEastSide = (obj, subject, response) => {
        // Check whether the suspect or murderer was on the East side of town and display the
        // appropriate response for the question
        const side = subject === "suspect" ?
            obj.characterData.location.address.side :
            obj.murdererData.location.address.side;

        const display = side === "East" ? response.affirmative : response.negative;

        return ({ answer: display });
    };


    static checkMurdererGender = (obj, subject, response) => {
        // Check whether the murderer is male and display the appropriate response
        const display = obj.murdererData.gender === "M" ? response.affirmative : response.negative;

        return ({ answer: display });
    };


    static checkTownLocation = (obj, subject, response) => {
        // Get the part of town the subject went to and append it to the affirmative
        // response for display (there is no negative response)
        let display;
        subject === "murderer" ?
            display = response.affirmative + obj.murdererData.location.address.town :
            display = response.affirmative + obj.characterData.location.address.town;

        return ({ answer: display });
    };


    static checkMurderWeapon = (obj, subject, response) => {
        // Check the victim to see whether the weapon used was a .38 and display the response
        const display = obj.characterData.weapon.type === ".38" ?
            response.affirmative : response.negative;

        return ({ answer: display });
    };


    static check38Location = (obj, subject, response) => {
        // Display the location of the .38 from the collection of weapons data
        let weapon;
        for (weapon of obj.weaponData) {
            if (weapon.type === ".38") break;
        }

        const display = response.affirmative + weapon.location.name;
        return ({ answer: display });
    };


    static check45Location = (obj, subject, response) => {
        // Display the location of the .45 from the collection of weapons data
        let weapon;
        for (weapon of obj.weaponData) {
            if (weapon.type === ".45") break;
        }

        const display = response.affirmative + weapon.location.name;
        return ({ answer: display });
    };


    static checkEmptySeat = (obj, subject, response) => {
        // Display the location name of the place with only three suspects
        let location;
        for (location of obj.locationData) {
            if (location.attendees.men.length + location.attendees.women.length === 3) break;
        }

        const display = response.affirmative + location.name;
        return ({ answer: display });
    };


    static checkPlaceNames = (obj, subject, response) => {
        // Check if the subject was at location A, B, or C and respond appropriately
        const locID = subject === "murderer" ?
            obj.murdererData.location.id :
            obj.characterData.location.id;

        const display = (locID === "A" || locID === "B" || locID === "C") ?
            response.affirmative : response.negative;
        return ({ answer: display });
    };


    static checkWeaponLocation = (obj, subject, response) => {
        // Check whether the character was at a location with a weapon
        const display = obj.characterData.location.weapon.type === null ?
            response.negative : response.affirmative;

        return ({ answer: display });
    };


    static checkPrints = (obj, subject, response) => {
        // This one is trickier. Only people who were at a location with a weapon can answer.
        if (obj.characterData.location.weapon.type === null ||
            obj.characterData.location.weapon.type !== subject) {
            return ({ answer: response.unknown });
        }

        // Get the weapon for the character's location
        const weapon = obj.characterData.location.weapon;

        // If the character is the same gender as the murderer then they have to give a truthful answer
        if (obj.characterData.gender === obj.murdererData.gender) {
            const display = weapon.print % 2 === 1 ? response.affirmative : response.negative;
            return ({ answer: display });
        }

        // If the character is not the same gender as the murderer then they might lie. It's a coin toss.
        const lie = this.getRandomInt(2);
        const display = lie ? response.negative : response.affirmative;
        return ({ answer: display });
    };


    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

}

export default CharacterAnswerLogic;