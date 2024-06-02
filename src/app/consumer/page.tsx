"use client";
import React, { useEffect, useState } from "react";

export default function Consumer(props: any) {
  const [arrayFieldsConsumer, setArrayFieldsConsumer] = useState<any[]>([]);

  // Load data from local storage on component mount.
  useEffect(() => {
    const savedData = localStorage.getItem("arrayFieldsConsumer");

    if (savedData) {
      setArrayFieldsConsumer(JSON.parse(savedData));
    }
  }, []);

  return (
    <div>
      {arrayFieldsConsumer.map((item, index) => {
        switch (item.type) {
          case "input":
            return <div>{item.type}</div>;

          case "button":
            return (
              <>
                <button onClick={() => {}}>Button</button>
              </>
            );

          default:
            return <></>;
        }
      })}
    </div>
  );
}
