// ==UserScript==
// @name         chatGPT speechToText
// @namespace    https://github.com/LawOff/chatGPT-Snippets
// @version      0.1
// @description  Convert spoken words into written text with a single click.
// @author       LawOff
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// ==/UserScript==

class SpeechToText {
  constructor() {
    this.autoSend = true;
    this.recognition = new (window.webkitSpeechRecognition ||
      window.SpeechRecognition)();
    this.textarea = document.evaluate(
      '//*[@id="__next"]/div/div[1]/main/div[2]/form/div/div[2]/textarea',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    this.textarea.classList.add("pr-10");
    this.textarea.style.paddingRight = "50px";
    this.recognition.lang = "en-US";
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.addEventListener("result", this.handleResults.bind(this));
    this.addButton();
  }

  handleResults(event) {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    console.log(transcript);

    this.textarea.focus();
    this.textarea.value = transcript;
    this.textarea.dispatchEvent(new Event("input", { bubbles: true }));

    if (event.results[0].isFinal) {
      this.recognition.stop();
      this.enableButton();
    }
  }

  enableButton() {
    // envoie auto:
    var sendButton = document.evaluate(
      '//*[@id="__next"]/div/div[1]/main/div[2]/form/div/div[2]/button[1]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    if (this.autoSend) {
      sendButton.click();
    }

    var loadButton = document.evaluate(
      '//*[@id="__next"]/div/div[1]/main/div[2]/form/div/div[2]/button[2]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    loadButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" style="fill:#000000;" width="16" height="16" preserveAspectRatio="xMidYMid meet" focusable="false"> <g fill="#8e8ea0"> <path d="M 12 0 C 9.800781 0 8 1.800781 8 4 L 8 11 C 8 13.199219 9.800781 15 12 15 C 14.199219 15 16 13.199219 16 11 L 16 4 C 16 1.800781 14.199219 0 12 0 Z M 3 11 C 3 15.605469 6.523438 19.429688 11 19.9375 L 11 24 L 13 24 L 13 19.9375 C 17.476563 19.429688 21 15.605469 21 11 L 19 11 C 19 14.855469 15.855469 18 12 18 C 8.144531 18 5 14.855469 5 11 Z"></path></g> </svg>';
    loadButton.disabled = false;
    loadButton.classList.add(
      "hover:bg-gray-100",
      "dark:hover:text-gray-400",
      "dark:hover:bg-gray-900",
      "disabled:hover:bg-transparent",
      "dark:disabled:hover:bg-transparent"
    );
  }

  disableButton(button) {
    console.log(button);
    button.innerHTML =
      '<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="12 50 40 30" style="fill:#000000;" width="16" height="16" enable-background="new 0 0 0 0" xml:space="preserve"> <rect x="20" y="50" width="4" height="10" fill="#8e8ea0"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" /> </rect> <rect x="30" y="50" width="4" height="10" fill="#8e8ea0"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" /> </rect> <rect x="40" y="50" width="4" height="10" fill="#8e8ea0"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" /> </rect> </svg>';
    button.disabled = true;
    button.classList.remove(
      "hover:bg-gray-100",
      "dark:hover:text-gray-400",
      "dark:hover:bg-gray-900",
      "disabled:hover:bg-transparent",
      "dark:disabled:hover:bg-transparent"
    );
  }

  addButton() {
    var div = document.evaluate(
      '//*[@id="__next"]/div/div[1]/main/div[2]/form/div/div[2]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    var button = document.createElement("button");
    button.classList.add(
      "absolute",
      "p-1",
      "rounded-md",
      "text-gray-500",
      "bottom-1.5",
      "right-1",
      "md:bottom-2.5",
      "md:right-2",
      "hover:bg-gray-100",
      "dark:hover:text-gray-400",
      "dark:hover:bg-gray-900",
      "disabled:hover:bg-transparent",
      "dark:disabled:hover:bg-transparent"
    );
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" style="fill:#000000;" width="16" height="16" preserveAspectRatio="xMidYMid meet" focusable="false"> <g fill="#8e8ea0"> <path d="M 12 0 C 9.800781 0 8 1.800781 8 4 L 8 11 C 8 13.199219 9.800781 15 12 15 C 14.199219 15 16 13.199219 16 11 L 16 4 C 16 1.800781 14.199219 0 12 0 Z M 3 11 C 3 15.605469 6.523438 19.429688 11 19.9375 L 11 24 L 13 24 L 13 19.9375 C 17.476563 19.429688 21 15.605469 21 11 L 19 11 C 19 14.855469 15.855469 18 12 18 C 8.144531 18 5 14.855469 5 11 Z"></path></g> </svg>';
    button.style.right = "35px";
    button.addEventListener("click", (e) => {
      this.disableButton(button);
      e.preventDefault();
      console.log("STT start");
      this.recognition.start();
      return false;
    });
    div.appendChild(button);
  }
}

window.addEventListener("load", () => {
    const speechToText = new SpeechToText();
});
