document.addEventListener("DOMContentLoaded", () => {
    const hexagonContainer = document.querySelector(".hexagon-background");

    // Create hexagons and append them to the background
    for (let i = 0; i < 50; i++) {
        const hex = document.createElement("div");
        hex.classList.add("hexagon");

        // Random positioning, ensuring they aren't too close together
        hex.style.left = `${Math.random() * 100}vw`;
        hex.style.top = `${Math.random() * 100}vh`;

        hexagonContainer.appendChild(hex);
    }
});

let moveTimeout;

document.addEventListener("mousemove", (event) => {
    clearTimeout(moveTimeout); // Reset delay if user keeps moving

    moveTimeout = setTimeout(() => {
        document.querySelectorAll(".hexagon").forEach((hex, index) => {
            const moveX = (event.clientX / window.innerWidth - 0.5) * (Math.random() * 100 + 80); // More spaced-out movement
            const moveY = (event.clientY / window.innerHeight - 0.5) * (Math.random() * 100 + 80);

            gsap.to(hex, {
                x: moveX,
                y: moveY,
                duration: 0.5, // Slower, smoother animation
                ease: "power3.out",
                delay: 0.1 + index * 0.005, // Adds small staggered delay
            });

            clearTimeout(window.hexagonResetTimeout);
            window.hexagonResetTimeout = setTimeout(() => {
                gsap.to(hex, { x: 0, y: 0, duration: 1.8, ease: "power2.out" });
            }, 400);
        });
    }, 100); // 0.1 second delay before movement starts
});