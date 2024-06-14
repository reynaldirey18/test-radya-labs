"use client";
import { IconButton, Button, Card, CardContent, Tooltip } from "@mui/material";
import { useGetPokemonList } from "./hooks";
import { DataGrid, GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useRef, useState } from "react";
import PokemonImage from "./(components)/pokeImage";
import ModalMyPokeList from "./(components)/ModalMyPokeList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

export default function PokemonGo() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
        <div>
          <Tooltip title="Tangkap">
            <IconButton
              onClick={() => handleAddPokemon(params?.row?.name)}
              color="primary"
            >
              <CatchingPokemonIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Detail">
            <IconButton
              onClick={() => router.push(`/pokemon/${params.row.name}`)}
              aria-label="view details"
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
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
  const handleAddPokemon = (val: string) => {
    if (typeof window !== "undefined") {
      const storedPokemon = localStorage.getItem("pokemon");
      const item = storedPokemon ? JSON.parse(storedPokemon) : [];
      if (!item.includes(val)) {
        item.push(val);
        localStorage.setItem("pokemon", JSON.stringify(item));
      }
    }
  };

  return (
    <div>
      <Card className="m-10">
        <CardContent>
          <div className="flex flex-row justify-between my-3">
            <p className="text-lg font-bold">Pokemon Go Go Go....</p>
            <Button variant="contained" onClick={() => setOpen(!open)}>
              View My Pokemon
            </Button>
          </div>
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
      <ModalMyPokeList open={open} handleClose={() => setOpen(false)} />
    </div>
  );
}
