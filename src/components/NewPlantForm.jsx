import React, { useState } from "react";

const initialForm = { name: "", image: "", price: "" };
const h = React.createElement;

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState(initialForm);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onAddPlant(newPlant);
        setFormData(initialForm);
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      {h("form", { onSubmit: handleSubmit },
        h("input", { type: "text", name: "name", placeholder: "Plant name",
          value: formData.name, onChange: handleChange }),
        h("input", { type: "text", name: "image", placeholder: "Image URL",
          value: formData.image, onChange: handleChange }),
        h("input", { type: "number", name: "price", step: "0.01", placeholder: "Price",
          value: formData.price, onChange: handleChange }),
        h("button", { type: "submit" }, "Add Plant")
      )}
    </div>
  );
}

export default NewPlantForm;