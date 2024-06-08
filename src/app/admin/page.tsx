"use client";
import React from "react";
import { useRef, useState } from "react";
import { useImmer } from "use-immer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Announcements from "@/components/announcements";
import Canvas, { Field } from "@/components/canvas";
import Sidebar, { SidebarField } from "@/components/sidebar";
import { renderersEdit } from "@/components/field";
import { Box } from "@mui/material";
import Header from "@/components/Header/index";

export interface IAdminProps {}

function getData(prop: any) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id }) {
  return {
    id,
    type: "spacer",
    title: "spacer",
  };
}

export default function Admin(props: IAdminProps) {
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(Date.now());
  const spacerInsertedRef = useRef();
  const currentDragFieldRef = useRef();
  const [activeSidebarField, setActiveSidebarField] = useState(); // only for fields from the sidebar
  const [activeField, setActiveField] = useState(); // only for fields that are in the form.
  const [paragraphText, setParagraphText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [message, setMessage] = useState("");
  const [arrayFieldEdit, setArrayFieldEdit] = useState<any[]>([]);
  const [arrayFieldsConsumer, setArrayFieldsConsumer] = useState<any[]>();
  const [fieldEditing, setFieldEditing] = useState<any | null>();

  const [data, updateData] = useImmer({
    fields: [],
  });

  const cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  const handleDragStart = (e) => {
    const { active } = e;
    const activeData = getData(active);

    // This is where the cloning starts.
    // We set up a ref to the field we're dragging
    // from the sidebar so that we can finish the clone
    // in the onDragEnd handler.
    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type } = field;
      setActiveSidebarField(field);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.
      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${fields.length + 1}`,
        parent: null,
      };
      return;
    }

    // We aren't creating a new element so go ahead and just insert the spacer
    // since this field already belongs to the canvas.
    const { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    updateData((draft) => {
      draft.fields.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    const activeData = getData(active);

    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    // 🐑 CLONING 🐑
    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + "-spacer",
        });

        updateData((draft) => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            const nextIndex = overData.index > -1 ? overData.index : draft.fields.length;

            draft.fields.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        updateData((draft) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        });
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        updateData((draft) => {
          const spacerIndex = draft.fields.findIndex((f) => f.id === active.id + "-spacer");

          const nextIndex = overData.index > -1 ? overData.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
        });
      }
    }
  };

  const handleDragEnd = (e) => {
    const { over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    let nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = getData(over);

      updateData((draft) => {
        const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(draft.fields, spacerIndex, overData.index || 0);
        setArrayFieldsConsumer(draft.fields);
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  const { fields } = data;

  const editField = (field: any) => {
    setFieldEditing(field);

    // setArrayFieldEdit([...arrayFieldEdit, field]);
  };

  const handleSave = () => {
    // console.log("paragraphText", paragraphText);
    // const newArrayFieldsConsumer = [...arrayFieldsConsumer, ]

    localStorage.setItem("arrayFieldsConsumer", JSON.stringify(arrayFieldsConsumer));

    setFieldEditing(null);
  };

  return (
    <Box component="div">
      <Header handleSave={handleSave} />

      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} autoScroll>
        <Box
          component="div"
          sx={{
            display: "flex",
            height: "80vh",
            // background: "red",
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              // background: "green",
            }}
          >
            <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />
          </Box>

          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              // background: "blue",
              flex: "1 1 0",

              ".canvas": {
                alignItems: "center",
                ".canvas-fields": {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  ".canvas-field": {
                    button: {
                      width: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                },
              },
            }}
          >
            <Announcements />

            <SortableContext strategy={verticalListSortingStrategy} items={fields.map((f) => f.id)}>
              <Canvas fields={fields} editField={editField} paragraphText={paragraphText} buttonText={buttonText} />
            </SortableContext>

            <DragOverlay dropAnimation={false}>
              {activeSidebarField ? <SidebarField overlay field={activeSidebarField} /> : null}
              {activeField ? <Field overlay field={activeField} /> : null}
            </DragOverlay>

            <Box component="div" sx={{ padding: "20px", borderTop: "1px solid black" }}>
              {arrayFieldsConsumer &&
                fieldEditing &&
                arrayFieldsConsumer.map((field, index) => {
                  if (field.id == fieldEditing.id) {
                    return renderersEdit(field, setParagraphText, setButtonText, setMessage);
                  }
                })}
            </Box>
          </Box>
        </Box>
      </DndContext>
    </Box>
  );
}
