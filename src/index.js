import { createCardHtml } from "./cardUI.js";

const CARDS_ROOT_ID = "cardsRoot";

// const TIME_FRAME_DAILY = 0;
// const TIME_FRAME_WEEKLY = 1;
// const TIME_FRAME_MONTHLY = 2;
let currentTimeFrame = "Daily";
let data;

document.addEventListener("DOMContentLoaded", loadContent);

async function fetchData() {
  const d = await fetch("../data.json");

  if (d.ok) return await d.json();
}

function getCardTitleIconURL(data) {
  switch (data.title) {
    case "Work":
      return "../images/icon-work.svg";
    case "Play":
      return "../images/icon-play.svg";
    case "Study":
      return "../images/icon-study.svg";
    case "Exercise":
      return "../images/icon-exercise.svg";
    case "Social":
      return "../images/icon-social.svg";
    case "Self Care":
      return "../images/icon-self-care.svg";
    default:
      throw new Error("default case reached, inspect for changes in data.json");
  }
}

async function loadContent() {
  const cardsRoot = document.getElementById(CARDS_ROOT_ID);
  data = await fetchData();

  if (data) {
    data.forEach((data) => {
      cardsRoot.appendChild(
        createCardHtml(
          getCardTitleIconURL(data),
          data.title,
          extractDataTimeFrame(data),
          extractPreviousTimeLabel(),
          data.titleBgColor
        )
      );
    });
  }

  const id = document.getElementById("id");

  for (let i = 0, len = id.childElementCount; i < len; i++) {
    const child = id.children.item(i);

    child.addEventListener("click", (e) => {
      onTimeFrameClick(child.textContent);
      for (let i = 0, len = id.childElementCount; i < len; i++)
        id.children.item(i).classList.remove("font-color-pale-white");

      e.target.classList.add("font-color-pale-white");
    });
  }
}

function onTimeFrameClick(timeframe) {
  switch (timeframe) {
    case "Daily":
      if (currentTimeFrame != "Daily") {
        currentTimeFrame = "Daily";
        updateTimeFrame();
      }
      break;
    case "Weekly":
      if (currentTimeFrame != "Weekly") {
        currentTimeFrame = "Weekly";
        updateTimeFrame();
      }
      break;
    case "Monthly":
      if (currentTimeFrame != "Monthly") {
        currentTimeFrame = "Monthly";
        updateTimeFrame();
      }
      break;
  }
}

function updateTimeFrame() {
  const currentTimeElements = document.querySelectorAll(".current-time");
  currentTimeElements.forEach((e, index) => {
    const timeFrame = extractDataTimeFrame(data[index]);
    e.textContent = `${timeFrame.current}hrs`;
  });
  const prevTimeElements = document.querySelectorAll(".previous-time");
  prevTimeElements.forEach((e, index) => {
    const timeFrame = extractDataTimeFrame(data[index]);
    e.textContent = `${extractPreviousTimeLabel()} - ${timeFrame.previous}hrs`;
  });
}

function extractDataTimeFrame(data) {
  switch (currentTimeFrame) {
    case "Daily":
      return data.timeframes.daily;
    case "Weekly":
      return data.timeframes.weekly;
    case "Monthly":
      return data.timeframes.monthly;
    default:
      throw new Error("default case reached ");
  }
}

function extractPreviousTimeLabel() {
  switch (currentTimeFrame) {
    case "Daily":
      return "Yesterday";
    case "Weekly":
      return "Last week";
    case "Monthly":
      return "Last month";
    default:
      throw new Error("default case reached ");
  }
}
