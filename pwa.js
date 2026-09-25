if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.error("Không thể đăng ký Service Worker:", error);
    });
  });
}
