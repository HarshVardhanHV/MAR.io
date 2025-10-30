document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("CreateForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Profile created successfully! Please login now.");
                window.location.href = "login.html";
            } else {
                alert(data.message || "Error creating profile!");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong. Please try again.");
        }
    });
});
