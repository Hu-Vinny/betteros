window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data?.type === "SET_TIMESIG") {
    if (typeof window.setTimeSig === "function") {
      window.setTimeSig(event.data.value);
    } else {
      console.warn("setTimeSig not found on page");
    }
  }
});

if (typeof toolsUpload === "function") {
    const originalToolsUpload = toolsUpload;

    toolsUpload = function () {
        const input = document.getElementById("file_upload_input");

        if (input) {
            input.accept = ".midi,.sequence";
        }

        return originalToolsUpload();
    };
}
