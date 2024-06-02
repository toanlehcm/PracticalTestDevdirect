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
export const renderersEdit = (field, setParagraphText, setButtonText, setMessage) => {
  switch (field.type) {
    case 'input':
      return (
        <>
          Paragraph Text
          <input type="text" onChange={(event) => setParagraphText(event.target.value)} />
        </>
      )


    case 'button':
      return (
        <>
          Button Text
          <input type="text" onChange={(event) => setButtonText(event.target.value)} />

          Alert message
          <input type="text" onChange={(event) => setMessage(event.target.value)} />
        </>
      )

    default:
      break;
  }
};

export const renderersView = (field, editField, paragraphText, buttonText) => {

  switch (field.type) {
    case 'input':
      return <button onClick={() => {
        editField(field)
      }}>{paragraphText ? paragraphText : 'Paragraph'}</button>


    case 'button':
      return <button onClick={() => {
        editField(field)
      }} >{buttonText ? buttonText : 'Button'}</button>

    default:
      break;
  }


};
