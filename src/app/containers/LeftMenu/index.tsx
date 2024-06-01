"use client";
import React from "react";
import styles from "./style.module.scss";
import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";

import { fields } from "../../../components/field";

export interface ILeftMenuProps {}

export function SidebarField(props: any) {
  const { field, overlay } = props;
  const { title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }

  return <div className={className}>{title}</div>;
}

function DraggableSidebarField(props: any) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });

  return (
    <div ref={setNodeRef} className="sidebar-field" {...listeners} {...attributes}>
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function LeftMenu(props: any) {
  // return (
  //   <div className={styles.content_sidebar}>
  //     <div className={styles.content_paragraph}>
  //       <div className={styles.box}></div>
  //       <div>Paragraph</div>
  //     </div>

  //     <div className={styles.content_button}>
  //       <div className={styles.box}></div>
  //       <div>Button</div>
  //     </div>
  //   </div>
  // );
  // -----
  const { fieldsRegKey } = props;

  return (
    <div key={fieldsRegKey} className="sidebar">
      {fields.map((f) => (
        <DraggableSidebarField key={f.type} field={f} />
      ))}
    </div>
  );
}
