document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#leaderTable tbody");

    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/scores/leaderboard", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            tableBody.innerHTML = "";

            if (data.length === 0) {
                let row = document.createElement("tr");
                row.innerHTML = `<td colspan="3">No scores yet</td>`;
                tableBody.appendChild(row);
                return;
            }

            data.sort((a, b) => b.highScore - a.highScore);

            data.forEach((player, index) => {
                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${player.username}</td>
                    <td>${player.highScore}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(err => {
            console.error("Error loading leaderboard:", err);
            let row = document.createElement("tr");
            row.innerHTML = `<td colspan="3">Invite Your Friends</td>`;
            tableBody.appendChild(row);
        });
});
