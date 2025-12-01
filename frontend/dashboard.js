document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "index.html";
        return;
    }

    const usernameEl = document.getElementById("username");
    const highScoreEl = document.getElementById("highScore");
    const logoutBtn = document.getElementById("logoutBtn");

    fetch("https://mario-4c9y.onrender.com/api/auth/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Unauthorized");
        }
        return res.json();
    })
    .then(data => {
        usernameEl.textContent = data.username;
        highScoreEl.textContent = data.highScore || 0;
    })
    .catch(err => {
        console.error(err);
        alert("Session expired, please login again.");
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");

        window.location.href = "index.html";
    });
});