"use client";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function PokemonImage({
  params,
}: {
  params: GridRenderCellParams<any, string>;
}) {
  return (
    <img
      src={params.value}
      alt={`Pokemon ${params.row.name}`}
      style={{ width: 100, height: 100, objectFit: "cover" }}
    />
  );
}
