const containers = document.querySelectorAll("._bar-input");

containers.forEach((container) => {
  const count = parseInt(container.getAttribute("count"), 10);
  const type = container.getAttribute("type");
  const id = container.getAttribute("accessor");
  const label = container.getAttribute("label");
  const required =
    container.getAttribute("required") === null
      ? false
      : container.getAttribute("required").toString().toLowerCase() === "true"
      ? true
      : false;
  const wrapper = document.createElement("div");
  const valueInput = document.createElement("input");
  valueInput.hidden = true;
  valueInput.id = id;
  valueInput.required = required;
  wrapper.className = "_bar-input-wrapper";
  for (let index = 0; index < count; index++) {
    const barInput = document.createElement("input");
    barInput.maxLength = 1;
    barInput.className = `_bar-input-field _bar-input-${id} ${
      index === 0 ? "first" : index === count - 1 ? "last" : "inner"
    } `;
    barInput.type = type;
    wrapper.append(barInput);
  }
  const containerLabel = document.createElement("label");
  containerLabel.className = "_bar-input-label _bar-input-label" + id;
  containerLabel.innerText = label;
  container.append(valueInput);
  container.append(containerLabel);
  container.append(wrapper);

  const fields = document.querySelectorAll(`._bar-input-${id}`);
  fields.forEach((field, index) => {
    field.addEventListener("keyup", (event) => {
      handleFieldFocus(event, index, count, fields);
    });
    field.addEventListener("change", (event) => {
      handleFieldFocus(event, index, count, fields);
      let value = "";
      fields.forEach((item) => {
        if (item.value === null) {
          value += " ";
        } else {
          value += item.value;
        }
      });
      document.getElementById(id).setAttribute("value", value.trim());
    });
  });
});

function handleFieldFocus(e, index, count, fields) {
  if (
    e.target.value.length === 1 &&
    e.keyCode !== 38 &&
    e.keyCode !== 40 &&
    e.keyCode !== 37 &&
    e.keyCode !== 39
  ) {
    if (index === count - 1) {
      e.target.blur();
    } else {
      fields[index + 1].focus();
    }
  }
}

document.getElementById("form").addEventListener("submit", submitForm);

// eslint-disable-next-line
function submitForm(e) {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  document.getElementById("showLastName").innerText = lastName;
  document.getElementById("showFirstName").innerText = firstName;
}
