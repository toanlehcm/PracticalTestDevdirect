import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { renderers, renderersView } from "./field";

// function getRenderer(type, editField, paragraphText, buttonText) {
//   // if (type === "spacer") {
//   //   return () => {
//   //     return <div className="spacer">spacer</div>;
//   //   };
//   // }

//   return renderersView(type, editField, paragraphText, buttonText);
//   // return <renderersView type={type} editField={editField} /> || (() => <div>No renderer found for {type}</div>);
// }

export function Field(props) {
  const { field, overlay, editField, paragraphText, buttonText, ...rest } = props;
  const { type } = field;
  // const Component = getRenderer(type, editField);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className}>
      {renderersView(field, editField, paragraphText, buttonText)}
    </div>
  );
}

function SortableField(props) {
  const { id, index, field, editField, paragraphText, buttonText } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    data: {
      index,
      id,
      field
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleEdit = () => {
    const newValue = prompt('Enter new value:');
    editField(id, newValue);
  };

  return (
    <div ref={setNodeRef} style={style}
    // {...attributes} {...listeners}
    >
      <Field field={field} editField={editField} paragraphText={paragraphText} buttonText={buttonText} />
    </div>
  );
}

export default function Canvas(props) {
  const { fields, editField, paragraphText, buttonText } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      className="canvas"
    // style={style}
    // {...attributes}
    // {...listeners}
    >
      <div className="canvas-fields">
        {fields?.map((f, i) => (
          <SortableField key={f.id} id={f.id} field={f} index={i} editField={editField} paragraphText={paragraphText} buttonText={buttonText} />
        ))}
      </div>
    </div>
  );
}
