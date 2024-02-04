const CARD_CONTAINER_STYLE = "flex flex-col w-full h-min font-rubik text-white";

const CARD_BAR_CONTAINER_STYLE =
  "w-full h-16 rounded-tl-2xl laptop:rounded-tl-lg rounded-tr-2xl laptop:rounded-tr-lg overflow-hidden";

const CARD_BAR_TITLE_ICON_STYLE = " object-none float-right mr-3 -mt-1.5";

const CARD_DATA_CONTAINER_STYLE =
  "flex flex-col gap-4 laptop:gap-16 bg-dark-blue w-full p-4 rounded-xl -mt-8 ";

const CARD_TITLE_AND_ELLIPSIS_STYLE = "flex justify-between items-center";

const CARD_TITLE_INFO_STYLE =
  "flex laptop:flex-col justify-between gap-16 laptop:gap-4 pr-12";

const ELLIPSIS_ICON_URL = "../images/icon-ellipsis.svg";

function createCardHtml(
  titleImageSrc,
  title,
  timeObject,
  previousTimeLabel,
  titleBarBackgroundColor
) {
  const container = document.createElement("div");
  container.className = CARD_CONTAINER_STYLE;

  container.appendChild(
    createTitleColorBar(titleImageSrc, titleBarBackgroundColor)
  );

  container.appendChild(createCardDataUI(title, timeObject, previousTimeLabel));

  return container;
}

function createTitleColorBar(titleImageSrc, titleBarBackgroundColor) {
  const categoryBar = document.createElement("div");
  categoryBar.className = CARD_BAR_CONTAINER_STYLE;
  categoryBar.style.backgroundColor = titleBarBackgroundColor;

  const titleIcon = document.createElement("img");
  titleIcon.src = titleImageSrc;
  titleIcon.alt = "title icon";
  titleIcon.className = CARD_BAR_TITLE_ICON_STYLE;

  categoryBar.appendChild(titleIcon);

  return categoryBar;
}

function createCardDataUI(title, timeObject, previousTimeLabel) {
  const root = document.createElement("div");
  root.className = CARD_DATA_CONTAINER_STYLE;

  const titleAndEllipsisContainer = document.createElement("div");
  titleAndEllipsisContainer.className = CARD_TITLE_AND_ELLIPSIS_STYLE;

  const titleElem = document.createElement("h1");
  titleElem.className = "text-sm laptop:text-base";
  titleElem.textContent = title;

  const ellipsisIcon = document.createElement("img");
  ellipsisIcon.src = ELLIPSIS_ICON_URL;
  ellipsisIcon.alt = "options";
  ellipsisIcon.className = "h-1";

  titleAndEllipsisContainer.appendChild(titleElem);
  titleAndEllipsisContainer.appendChild(ellipsisIcon);

  const categoryInfo = document.createElement("div");
  categoryInfo.className = CARD_TITLE_INFO_STYLE;

  const dataHeading = document.createElement("p");
  dataHeading.className = "current-time text-base laptop:text-4xl font-thin";
  dataHeading.textContent = `${timeObject.current}hrs`;

  const dataSubheading = document.createElement("p");
  dataSubheading.className =
    "previous-time text-sm laptop:text-xs font-thin text-pale-blue";
  dataSubheading.textContent = `${previousTimeLabel} - ${timeObject.previous}hrs`;

  categoryInfo.appendChild(dataHeading);
  categoryInfo.appendChild(dataSubheading);

  root.appendChild(titleAndEllipsisContainer);
  root.appendChild(categoryInfo);
  return root;
}

export { createCardHtml };
