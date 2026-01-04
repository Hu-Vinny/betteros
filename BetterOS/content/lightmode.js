console.log("[BetterOS]: lightmode loaded");

const style = document.createElement("style");
style.textContent = `
  #bar {
    background-color: #d4d3d0 !important;
  }
  #toolbar_element {
    background-color: white !important;
  }
  #user_member {
    color: black !important;
  }
  #top-bar-right {
    background-color: #d4d3d0 !important;
  }
  #sequencer_inner {
    background-color: #cac9c5 !important;
  }
  #selection_rect {
    background-color: #black !important;
  }
`;
document.head.appendChild(style);

