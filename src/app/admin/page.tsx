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

    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type } = field;
      setActiveSidebarField(field);

      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${fields.length + 1}`,
        parent: null,
      };
      return;
    }

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
        updateData((draft) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        });
        spacerInsertedRef.current = false;
      } else {
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

    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      return;
    }

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
  };

  const handleSave = () => {
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
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
            }}
          >
            <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />
          </Box>

          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
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
