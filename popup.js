document.getElementById('toggle-dark-mode').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: toggleDarkMode
    });
  });
});

function toggleDarkMode() {
  const darkModeStyle = `
    html {
      filter: invert(1) hue-rotate(180deg);
      background-color: black !important;
    }
    img, video, iframe {
      filter: invert(1) hue-rotate(180deg);
    }
  `;

  if (!document.querySelector('#dark-mode-css')) {
    const style = document.createElement('style');
    style.id = 'dark-mode-css';
    style.textContent = darkModeStyle;
    document.head.appendChild(style);
  } else {
    document.querySelector('#dark-mode-css').remove();
  }
}
