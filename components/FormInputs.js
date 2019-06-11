import React, { useReducer } from "react";
import Error from "./ErrorMessage";
import Input from "./Input";
import Questions from "./Questions";
import Form from "./styles/LoginStyles";
import { formReducer } from "../lib/formReducers";

const uploadFile = async (e, updateData) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "formimages");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/nicholas-guest-jelley/image/upload",
    {
      method: "POST",
      body: data
    }
  );
  const file = await res.json();
  updateData({
    image: file.secure_url,
    largeImage: file.eager[0].secure_url
  });
};

const initialState = {
  title: "",
  description: "",
  image: "",
  largeImage: "",
  questions: []
};

function FormInputs({ error, loading, updateData, formData, formId }) {
  const [form, dispatch] = useReducer(formReducer, {
    ...initialState,
    ...formData
  });
  const { title, description, questions, largeImage } = form;
  return (
    <Form background={largeImage}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            onChange={e => uploadFile(e, updateData)}
          />
        </label>
        <Input
          type="text"
          label="title"
          required
          defaultValue={title}
          onBlur={e => updateData({ [e.target.name]: e.target.value })}
        />
        <Input
          type="text"
          label="description"
          defaultValue={description}
          onBlur={e => updateData({ [e.target.name]: e.target.value })}
        />
        <Questions formId={formId} />
      </fieldset>
    </Form>
  );
}

export default FormInputs;
