import produce from "immer";
import { v4 } from "uuid";
export function formReducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "UPDATE_FORM": {
        return action.payload;
      }
      case "UPDATE_FIELD": {
        draft[action.payload.name] = action.payload.value;
        return draft;
      }
      case "ADD_QUESTION": {
        draft.questions.push({
          question: "",
          type: "SHORTANSWER",
          description: "",
          id: v4()
        });
        return draft;
      }
      case "UPDATE_QUESTION_FIELD": {
        const { index, name, value } = action.payload;
        draft.questions[index][name] = value;
        return draft;
      }
      case "UPDATE_QUESTION_CHOICE": {
        const index = draft.questions[action.payload.index].choices.findIndex(
          choice => choice.id === action.payload.id
        );
        draft.questions[action.payload.index].choices[index].text =
          action.payload.value;
        return draft;
      }
      case "REMOVE_QUESTION_PREVIEW_CHOICE": {
        const index = draft.questions[action.payload.index].choices.findIndex(
          choice => choice.id === action.payload.id
        );
        draft.questions[action.payload.index].choices.splice(index, 1);
        return draft;
      }
      default:
        throw new Error();
    }
  });
}

export function questionsReducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "UPDATE_FIELD": {
        const { index, name, value } = action.payload;
        draft[index][name] = draft[value];
        return draft;
      }
      case "UPDATE_QUESTION_CHOICE": {
        const index = draft.questions[action.payload.index].choices.findIndex(
          choice => choice.id === action.payload.id
        );
        draft.questions[action.payload.index].choices[index].text =
          action.payload.value;
        return draft;
      }
      case "REMOVE_QUESTION_PREVIEW_CHOICE": {
        const index = draft.questions[action.payload.index].choices.findIndex(
          choice => choice.id === action.payload.id
        );
        draft.questions[action.payload.index].choices.splice(index, 1);
        return draft;
      }
      default:
        throw new Error();
    }
  });
}
