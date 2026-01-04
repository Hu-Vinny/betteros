document.getElementById("set").addEventListener("click", () => {
  const value = Number(document.getElementById("timesig").value);
  if (!Number.isFinite(value)) return;

  chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "POPUP_SET_TIMESIG",
        value
      });
    }
  );
});
