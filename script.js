// Get DOM elements
const form = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const celebrationMessage = document.getElementById("celebrationMessage");

// Create needed variable(s)
let count = 0;
const MAXIMUM_OCCUPANCY = 12;

// Listen for when the form is submitted
form.addEventListener("submit", function(event){
    // Suppress default behavior
    event.preventDefault();

    // Do not process applications once maximum occupancy is reached
    if (count >= MAXIMUM_OCCUPANCY) return;

    // Get data from the form
    const name = attendeeName.value;
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    // Increase attendance count
    count++;

    // Calculate percent to max occupancy
    const progress = Math.round((count / MAXIMUM_OCCUPANCY) * 100);
    progressBar.style.width = progress + "%";

    // Update team counter
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    // Add the attendee's name to their team list
    const teamAttendees = document.getElementById(team + "Attendees");
    const attendee = document.createElement("li");
    attendee.textContent = name;
    teamAttendees.appendChild(attendee);

    // Update the total attendee counter
    const totalCount = document.getElementById("attendeeCount");
    totalCount.textContent = parseInt(totalCount.textContent) + 1;

    // Welcome the attendee
    let welcomeMsg = "🎉 Welcome ";
    welcomeMsg += name;
    welcomeMsg += " from ";
    welcomeMsg += teamName;
    welcomeMsg += "! 🎉";
    greeting.textContent = welcomeMsg;
    greeting.classList.add("success-message");
    greeting.style.display = "block";

    // Display a message upon reaching the maximum occupancy
    if (count === MAXIMUM_OCCUPANCY) {
        // Find the team(s) with the most attendees
        const teamCards = document.querySelectorAll(".team-card");
        let highestTeamCount = 0;

        // Find what the highest count was
        for (let i = 0; i < teamCards.length; i++) {
            const teamCount = parseInt(teamCards[i].querySelector(".team-count").textContent);
            if (teamCount > highestTeamCount) {
                highestTeamCount = teamCount;
            }
        }

        // Outline all teams with the highest count
        for (let i = 0; i < teamCards.length; i++) {
            const teamCount = parseInt(teamCards[i].querySelector(".team-count").textContent);
            if (teamCount === highestTeamCount) {
                teamCards[i].classList.add("highest-attendance");
            }
        }

        celebrationMessage.textContent = "🥳 Congratualations! The Intel Sustainability Summit has reached it's maximum occupancy! 🥳";
        celebrationMessage.classList.add("success-message");
        celebrationMessage.style.display = "block";
        attendeeName.disabled = true;
        teamSelect.disabled = true;
        document.getElementById("checkInBtn").disabled = true;
    }

    // Clear the form's input field
    form.reset();
});