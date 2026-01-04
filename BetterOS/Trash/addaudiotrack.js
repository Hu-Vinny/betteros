console.log("[BetterOS]: content script loaded");

// Inject page.js ONCE
if (!document.getElementById("betteros-page")) {
    const script = document.createElement("script");
    script.id = "betteros-page";
    script.src = chrome.runtime.getURL("page.js");
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
}

// Inject menu items
function injectIntoVisibleMenu() {
    const menus = document.querySelectorAll(".os-dropdown-menu");

    for (const menu of menus) {
        // Only touch visible menus
        if (menu.offsetParent === null) continue;

        // ---- Set Time Signature ----
        if (!menu.querySelector(".custom-timesig-item")) {
            const li = document.createElement("li");
            li.textContent = "Set Time Signature";
            li.className = "custom-timesig-item";
            li.tabIndex = 0;

            li.onclick = () => {
                const val = prompt("Enter integer");
                if (!val) return;

                const num = Number(val);
                if (!Number.isFinite(num)) return;

                window.postMessage(
                    { type: "SET_TIMESIG", value: num },
                    "*"
                );
            };

            menu.appendChild(li);
            console.log("[BetterOS]: Injected time signature item");
        }

        // ---- Add Audio Track ----
        if (!menu.querySelector(".addaudiotrack")) {
            const li = document.createElement("li");
            li.textContent = "Add Audio Track";
            li.className = "addaudiotrack";
            li.tabIndex = 0;

            li.onclick = () => {
                const input = document.querySelector("#audio_track_file");
                if (!input) {
                    console.error("[BetterOS]: audio input not found");
                    return;
                }

                const prev = input.style.display;
                input.style.display = "block";
                input.click();
                input.style.display = prev;
            };

            menu.appendChild(li);
            console.log("[BetterOS]: Injected audio track item");
        }
    }
}

// Create ONE observer only
if (!window.betterOSMenuObserver) {
    window.betterOSMenuObserver = new MutationObserver(() => {
        injectIntoVisibleMenu();
    });

    window.betterOSMenuObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}
