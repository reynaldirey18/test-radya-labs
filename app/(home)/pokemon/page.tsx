"use client";
import { IconButton, Card, CardContent, Tooltip } from "@mui/material";
import { useGetPokemonList } from "./hooks";
import { DataGrid, GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useRef, useState } from "react";
import PokemonImage from "./(components)/pokeImage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";

export default function PokemonGo() {
  const router = useRouter();
  const columns: GridColDef[] = [
    { field: "pokemonNumber", headerName: "No", width: 150 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) =>
        PokemonImage({ params }),
    },
    { field: "name", headerName: "Name", width: 300, flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title="View Detail">
          <IconButton
            onClick={() => router.push(`/pokemon/${params.row.name}`)}
            color="primary"
            aria-label="view details"
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [items, setItems] = useState([]);

  const { data, error, isLoading } = useGetPokemonList({
    limit: paginationModel.pageSize,
    offset: paginationModel.page * paginationModel.pageSize,
  });
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    if (data) {
      const itemsWithId = data.results.map((item: any, index: number) => ({
        ...item,
        id: paginationModel.page * paginationModel.pageSize + index + 1,
        pokemonNumber: index + 1,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          paginationModel.page * paginationModel.pageSize + index + 1
        }.png`,
      }));
      setItems(itemsWithId);
      setRowCount(data.count);
    }
  }, [data]);

  const onPaginationChange = (pagination: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationModel({
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <div>
      <Card className="m-10">
        <CardContent>
          <p className="text-lg font-bold">Pokemon Go Go Go....</p>
          <DataGrid
            rows={items}
            columns={columns}
            rowCount={rowCount}
            loading={isLoading}
            pageSizeOptions={[5]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={onPaginationChange}
            rowHeight={100}
            disableColumnSorting
          />
        </CardContent>
      </Card>
    </div>
  );
}
