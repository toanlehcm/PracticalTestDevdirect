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
export const renderersEdit = (type) => {
  switch (type) {
    case 'input':
      return <input type="text" placeholder="This is a text input" />


    case 'button':
      return <button>Button</button>

    default:
      break;
  }
};

export const renderersView = (type, editField) => {

  switch (type) {
    case 'input':
      return <button onClick={() => {
        editField(type)
      }}>Input 1</button>


    case 'button':
      return <button onClick={() => {
        editField(type)
      }} >Button</button>

    default:
      break;
  }


};
