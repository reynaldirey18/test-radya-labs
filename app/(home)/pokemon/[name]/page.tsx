"use client";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
} from "@mui/material";
import { useGetPokemonDetail } from "../hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function PokemonGoDetail({
  params,
}: {
  params: { name: string };
}) {
  const router = useRouter();

  const { data } = useGetPokemonDetail(params.name);
  return (
    <div className="m-5">
      <IconButton onClick={() => router.push(`/pokemon`)} color="primary">
        <ArrowBackIcon />
        <span className="ml-1">Back</span>
      </IconButton>
      <Card className="max-w-[80vh] mx-auto flex flex-row p-0">
        <CardMedia
          sx={{ height: 300, width: 400, objectFit: "contain" }}
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.order}.png`}
          title="Pokemon Image"
          className="bg-yellow-200"
        />
        <CardContent className=" w-full">
          <Typography gutterBottom variant="h3" component="div">
            {data?.name}
          </Typography>
          <Divider />
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap gap-2">
              <Typography variant="subtitle2">Type:</Typography>
              {data?.types.map((item: any, index: number) => (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  key={index}
                >
                  <span>
                    {item.type.name}
                    {index < data.types.length - 1 ? ", " : ""}
                  </span>
                </Typography>
              ))}
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              <Typography variant="subtitle2">Stats:</Typography>
              {data?.stats.map((item: any, index: number) => (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  key={index}
                >
                  <span>
                    {item.stat.name}
                    {index < data.stats.length - 1 ? ", " : ""}
                  </span>
                </Typography>
              ))}
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              <Typography variant="subtitle2">Abilities:</Typography>
              {data?.abilities.map((item: any, index: number) => (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  key={index}
                >
                  <span>
                    {item.ability.name}
                    {index < data.abilities.length - 1 ? ", " : ""}
                  </span>
                </Typography>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
