import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import {
  useMap,
  assignBrawlerToMap,
  useBrawlers,
  removeBrawlerFromMap,
} from "../../database";
import { useRouter } from "next/router";
import { IMap, IBrawler } from "../../interfaces";
import {
  Map,
  Brawler,
  Layout,
  DraggableComponent,
  DroppableComponent,
} from "../../components";
import styles from "../../styles/Map.module.css";

export default function MapView() {
  const [draggingBrawler, setDraggingBrawler] = useState<string>("");
  const router = useRouter();
  const mapName: string =
    router.query.map instanceof Array ? router.query.map[0] : router.query.map;
  const map: IMap | null = useMap(mapName?.toLowerCase());

  const brawlers: IBrawler[] = useBrawlers();

  const sTierBrawlers = brawlers.filter((brawler) =>
    (map?.sTier ?? []).includes(brawler.name.toLocaleLowerCase())
  );
  const aTierBrawlers = brawlers.filter((brawler) =>
    (map?.aTier ?? []).includes(brawler.name.toLocaleLowerCase())
  );
  const bTierBrawlers = brawlers.filter((brawler) =>
    (map?.bTier ?? []).includes(brawler.name.toLocaleLowerCase())
  );
  const otherBrawlers = brawlers.filter((brawler) => {
    return (
      !(map?.sTier ?? []).includes(brawler.name.toLocaleLowerCase()) &&
      !(map?.aTier ?? []).includes(brawler.name.toLocaleLowerCase()) &&
      !(map?.bTier ?? []).includes(brawler.name.toLocaleLowerCase())
    );
  });

  return (
    <Layout>
      <Head>
        <title>{map?.name ?? "Map name"}</title>
      </Head>
      <div className={styles.split}>
        <div className={styles.left}>
          {!!map ? <Map map={map} /> : <p>Loading</p>}
        </div>
        <div className={styles.right}>
          <h2>S tier</h2>
          <DroppableComponent
            accept={["brawler"]}
            onDrop={() => {
              assignBrawlerToMap(
                mapName.toLowerCase(),
                draggingBrawler.toLowerCase(),
                "s"
              );
              setDraggingBrawler("");
            }}
          >
            <div className="flexWrap" style={{ minHeight: 80 }}>
              {sTierBrawlers.map((brawler) => (
                <DraggableComponent
                  key={brawler.name}
                  type="brawler"
                  onPickup={() => setDraggingBrawler(brawler.name)}
                >
                  <Brawler key={brawler.name} brawler={brawler} />
                </DraggableComponent>
              ))}
            </div>
          </DroppableComponent>
          <DroppableComponent
            accept={["brawler"]}
            onDrop={() => {
              assignBrawlerToMap(
                mapName.toLowerCase(),
                draggingBrawler.toLowerCase(),
                "a"
              );
              setDraggingBrawler("");
            }}
          >
            <h2>A tier</h2>
            <div className="flexWrap" style={{ minHeight: 80 }}>
              {aTierBrawlers.map((brawler) => (
                <DraggableComponent
                  key={brawler.name}
                  type="brawler"
                  onPickup={() => setDraggingBrawler(brawler.name)}
                >
                  <Brawler key={brawler.name} brawler={brawler} />
                </DraggableComponent>
              ))}
            </div>
          </DroppableComponent>
          <DroppableComponent
            accept={["brawler"]}
            onDrop={() => {
              assignBrawlerToMap(
                mapName.toLowerCase(),
                draggingBrawler.toLowerCase(),
                "b"
              );
              setDraggingBrawler("");
            }}
          >
            <h2>B tier</h2>
            <div className="flexWrap" style={{ minHeight: 80 }}>
              {bTierBrawlers.map((brawler) => (
                <DraggableComponent
                  key={brawler.name}
                  type="brawler"
                  onPickup={() => setDraggingBrawler(brawler.name)}
                >
                  <Brawler key={brawler.name} brawler={brawler} />
                </DraggableComponent>
              ))}
            </div>
          </DroppableComponent>
        </div>
      </div>

      <DroppableComponent
        accept={["brawler"]}
        onDrop={() => {
          removeBrawlerFromMap(
            mapName.toLowerCase(),
            draggingBrawler.toLowerCase()
          );
          setDraggingBrawler("");
        }}
      >
        <h2>Not used brawlers</h2>
        <div className="flexWrap">
          {otherBrawlers.map((brawler) => (
            <DraggableComponent
              key={brawler.name}
              type="brawler"
              onPickup={() => setDraggingBrawler(brawler.name)}
            >
              <Brawler key={brawler.name} brawler={brawler} />
            </DraggableComponent>
          ))}
        </div>
      </DroppableComponent>
    </Layout>
  );
}
