import { createCardHtml } from "./cardUI.js";

const CARDS_ROOT_ID = "cardsRoot";

const TIME_FRAME_DAILY = 0;
const TIME_FRAME_WEEKLY = 1;
const TIME_FRAME_MONTHLY = 2;
let currentTimeFrame = TIME_FRAME_DAILY;

document.addEventListener("DOMContentLoaded", loadContent);

async function fetchData() {
  const d = await fetch("../../data.json");
  if (d.ok) return await d.json();
}

async function loadContent() {
  const cardsRoot = document.getElementById(CARDS_ROOT_ID);
  const data = await fetchData();
  if (data) {
    data.forEach((data) => {
      cardsRoot.appendChild(
        createCardHtml(
          "../images/icon-work.svg",
          data.title,
          extractDataTimeFrame(data),
          extractPreviousTimeLabel()
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
