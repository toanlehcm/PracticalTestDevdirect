"use client";
import "./page.module.css";
import Link from "next/link";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box component="div">
      <Link href="/admin">Admin Page</Link>
    </Box>
  );
}
