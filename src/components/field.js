// These will be available from the sidebar
export const fields = [
  {
    type: "input",
    title: "Text Input"
  },
  {
    type: "button",
    title: "Button"
  },
];

// These define how we render the field
export const renderersEdit = (type, setValueInput) => {
  switch (type) {
    case 'input':
      return <input type="text" placeholder="This is a text input" onChange={(event) => {
        setValueInput(event.target.value);
      }} />


    case 'button':
      return <button>Button</button>

    default:
      break;
  }
};

export const renderersView = (type, editField, valueInput) => {

  switch (type) {
    case 'input':
      return <button onClick={() => {
        editField(type)
      }}>{valueInput ? valueInput : 'paragraph'}</button>


    case 'button':
      return <button onClick={() => {
        editField(type)
      }} >Button</button>

    default:
      break;
  }


};
