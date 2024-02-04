import { createCardHtml } from "./cardUI.js";

const CARDS_ROOT_ID = "cardsRoot";

const TIME_FRAME_DAILY = 0;
const TIME_FRAME_WEEKLY = 1;
const TIME_FRAME_MONTHLY = 2;
let currentTimeFrame = TIME_FRAME_DAILY;

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
  const data = await fetchData();

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
}

function extractDataTimeFrame(data) {
  switch (currentTimeFrame) {
    case TIME_FRAME_DAILY:
      return data.timeframes.daily;
    case TIME_FRAME_WEEKLY:
      return data.timeframes.weekly;
    case TIME_FRAME_MONTHLY:
      return data.timeframes.monthly;
    default:
      throw new Error("default case reached ");
  }
}

function extractPreviousTimeLabel() {
  switch (currentTimeFrame) {
    case TIME_FRAME_DAILY:
      return "Yesterday";
    case TIME_FRAME_WEEKLY:
      return "Last week";
    case TIME_FRAME_MONTHLY:
      return "Last month";
    default:
      throw new Error("default case reached ");
  }
}
