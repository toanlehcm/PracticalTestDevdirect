// These will be available from the sidebar
export const fields = [
  {
    type: "input",
    title: "Text Input",
  },
  {
    type: "button",
    title: "Button",
  },
];

// These define how we render the field
export const renderersEdit = (field, setParagraphText, setButtonText, setMessage) => {
  switch (field.type) {
    case "input":
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          Paragraph Text
          <input id={field.id} type="text" name={field.name} onChange={(event) => setParagraphText(event.target.value)} style={{ width: '300px', padding: '10px' }} />
        </div>
      );

    case "button":
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            Button Text
            <input type="text" onChange={(event) => setButtonText(event.target.value)} style={{ width: '300px', padding: '10px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', }}>
            Alert message
            <input type="text" onChange={(event) => setMessage(event.target.value)} style={{ width: '300px', padding: '10px' }} />
          </div>

        </div>
      );

    default:
      break;
  }
};

export const renderersView = (field, editField, paragraphText, buttonText) => {
  switch (field.type) {
    case "input":
      return (
        <button
          onClick={() => {
            editField(field);
          }}
        >
          {paragraphText ? paragraphText : "Paragraph"}
        </button>
      );

    case "button":
      return (
        <button
          onClick={() => {
            editField(field);
          }}
        >
          {buttonText ? buttonText : "Button"}
        </button>
      );

    default:
      break;
  }
};
