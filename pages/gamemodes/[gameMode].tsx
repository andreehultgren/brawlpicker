import Link from "next/link";
import Head from "next/head";
import {
  useGameMode,
  useMaps,
  assignMapToGameMode,
  removeMapFromGameMode,
} from "../../database";
import { useState } from "react";
import { useRouter } from "next/router";
import { IGameMode } from "../../interfaces";
import {
  Map,
  Layout,
  DraggableComponent,
  DroppableComponent,
} from "../../components";
import GameMode from "../../components/GameMode";

export default function () {
  const [draggingMap, setDraggingMap] = useState<string>("");
  const router = useRouter();
  const gameModeName: string =
    router.query.gameMode instanceof Array
      ? router.query.gameMode[0]
      : router.query.gameMode;
  const gameMode: IGameMode | null = useGameMode(gameModeName);

  const maps = useMaps();
  const gameMaps = maps.filter((map) =>
    gameMode?.maps?.includes(map.name.toLocaleLowerCase())
  );
  const remainingMaps = maps.filter(
    (map) => !(gameMode?.maps || []).includes(map.name.toLocaleLowerCase())
  );

  return (
    <Layout>
      <Head>
        <title>{gameModeName || "Game mode"}</title>
      </Head>
      <div className="center">
        <GameMode gameMode={gameMode} />
      </div>

      <DroppableComponent
        accept={["map"]}
        onDrop={() => {
          assignMapToGameMode(
            gameModeName.toLowerCase(),
            draggingMap.toLocaleLowerCase()
          );
          setDraggingMap("");
        }}
      >
        <h2>{gameMode?.name ?? "Mode"} maps</h2>
        <div className="flexWrap">
          {gameMaps.map((map) => (
            <DraggableComponent
              type="map"
              onPickup={() => {
                setDraggingMap(map.name);
              }}
            >
              <Link key={map.name} href={`/maps/${map.name.toLowerCase()}`}>
                <a>
                  <Map map={map} />
                </a>
              </Link>
            </DraggableComponent>
          ))}
        </div>
      </DroppableComponent>

      <DroppableComponent
        accept={["map"]}
        onDrop={() => {
          removeMapFromGameMode(
            gameModeName.toLowerCase(),
            draggingMap.toLowerCase()
          );
          setDraggingMap("");
        }}
      >
        <h2>Drag to add maps</h2>
        <div className="flexWrap">
          {remainingMaps.map((map) => (
            <DraggableComponent
              type="map"
              onPickup={() => {
                setDraggingMap(map.name);
              }}
            >
              <Map map={map} />
            </DraggableComponent>
          ))}
        </div>
      </DroppableComponent>
    </Layout>
  );
}
