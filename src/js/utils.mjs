export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn, //parameter is a function that represents an HTML template
  parentElement, //parameter that is the DOM element where the rendered list will be inserted
  data, //this is the array that contains the items that will be rendered
  callback, //It's a function that you can provide to specify what should happen after rendering and inserting the HTML content into the parentElement
  position = "afterbegin", //parameter is an optional parameter that specifies where the rendered HTML should be inserted
  clear = true //optional parameter that that means before inserting rendered HTML, the parentElement content will be cleared
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const string = await templateFn(data);
  parentElement.insertAdjacentHTML(position, string);
  if (callback) {
    callback(data);
  }
}

const loadTemplate = (path) => {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
};

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/public/partials/header.html");
  const footerTemplateFn = loadTemplate("/public/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  await renderWithTemplate(headerTemplateFn, headerElement);
  await renderWithTemplate(footerTemplateFn, footerElement);
}
