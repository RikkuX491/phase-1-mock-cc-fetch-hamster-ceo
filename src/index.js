// write your code here
const hamsterMenu = document.getElementById("hamster-menu");

fetch("http://localhost:3000/hamsters")
.then(response => {
    return response.json();
})
.then(function (hamsterObject){
   hamsterObject.forEach(addHamster);
})

function addHamster(hamster){
    const hamsterImage = document.createElement("img");
    hamsterImage.src = hamster.image;
    hamsterImage.addEventListener("click", function() {
        displayDetails(hamster);
    });
    hamsterMenu.append(hamsterImage);
}

function displayDetails(hamster){
    const image = document.querySelector(".detail-image");
    image.src = hamster.image;

    const name = document.querySelector(".name");
    name.innerText = hamster.name;

    const occupation = document.querySelector(".occupation");
    occupation.innerText = hamster.occupation;
}

const form = document.getElementById("new-hamster");
form.addEventListener("submit", function(event){
    event.preventDefault();

    const hamsterName = document.getElementById("new-name").value;
    const hamsterOccupation = document.getElementById("new-occupation").value;
    const hamsterImage = document.getElementById("new-image").value;

    const hamster = {
        name: hamsterName,
        occupation: hamsterOccupation,
        image: hamsterImage
    };

    addHamster(hamster);
    form.reset();

    fetch("http://localhost:3000/hamsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(hamster)
    })
})