import React, { useReducer } from "react";
import Error from "./ErrorMessage";
import Input from "./Input";
import Questions from "./Questions";
import Form from "./styles/LoginStyles";
import { formReducer } from "../lib/formReducers";

const updateField = (e, dispatch) => {
  dispatch({
    type: "UPDATE_FIELD",
    payload: {
      name: e.target.name,
      value: e.target.value
    }
  });
};

const uploadFile = async (e, dispatch) => {
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
  dispatch({
    type: "FILE_UPLOAD_SUCCESS",
    payload: {
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    }
  });
};

const initialState = {
  title: "",
  description: "",
  image: "",
  largeImage: "",
  questions: []
};

function FormInputs({ error, loading, submitData, formData, formId }) {
  const [form, dispatch] = useReducer(formReducer, {
    ...initialState,
    ...formData
  });
  const { title, description, questions, largeImage } = form;
  return (
    <Form onSubmit={e => submitData(e, form)} background={largeImage}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            onChange={e => uploadFile(e, dispatch)}
          />
        </label>
        <Input
          type="text"
          label="title"
          required
          value={title}
          onChange={e => updateField(e, dispatch)}
        />
        <Input
          type="text"
          label="description"
          required
          value={description}
          onChange={updateField}
        />
        <Questions formId={formId} />

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}

export default FormInputs;
