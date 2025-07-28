const cursor = document.getElementById("cursor");

// Center the cursor element
gsap.set(cursor, {
  xPercent: -50,
  yPercent: -50,
});

// Move with mouse
document.addEventListener("mousemove", function (e) {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 1.5,
    ease: "power2.out",
  });
});
