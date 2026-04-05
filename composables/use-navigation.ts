export function useNavigation() {
  const isAffilaeOpen = useState("isAffilaeOpen", () => false);
  const affilaeDone = useState("affilaeDone", () => false);
  const affilaeTotal = useState("affilaeTotal", () => 0);
  const affilaeCount = useState("affilaeCount", () => 0);
  const affilaeFinishedBlocks = useState<number[]>("affilaeFinishedBlocks", () => []);

  const isEspaceQGOpen = useState("isEspaceQGOpen", () => false);
  const EspaceQGDone = useState("EspaceQGDone", () => false);
  const EspaceQGTotal = useState("EspaceQGTotal", () => 0);
  const EspaceQGCount = useState("EspaceQGCount", () => 0);
  const EspaceQGFinishedBlocks = useState<number[]>("EspaceQGFinishedBlocks", () => []);

  const isGeneaSphereOpen = useState("isGeneaSphereOpen", () => false);
  const GeneaSphereDone = useState("GeneaSphereDone", () => false);
  const GeneaSphereTotal = useState("GeneaSphereTotal", () => 0);
  const GeneaSphereCount = useState("GeneaSphereCount", () => 0);
  const GeneaSphereFinishedBlocks = useState<number[]>("GeneaSphereFinishedBlocks", () => []);

  const isGolfOpen = useState("isGolfOpen", () => false);
  const GolfDone = useState("GolfDone", () => false);
  const GolfTotal = useState("GolfTotal", () => 0);
  const GolfCount = useState("GolfCount", () => 0);
  const GolfFinishedBlocks = useState<number[]>("GolfFinishedBlocks", () => []);

  const isMusbaOpen = useState("isMusbaOpen", () => false);
  const MusbaDone = useState("MusbaDone", () => false);
  const MusbaTotal = useState("MusbaTotal", () => 0);
  const MusbaCount = useState("MusbaCount", () => 0);
  const MusbaFinishedBlocks = useState<number[]>("MusbaFinishedBlocks", () => []);

  return {
    isAffilaeOpen,
    affilaeDone,
    affilaeTotal,
    affilaeCount,
    affilaeFinishedBlocks,
    isEspaceQGOpen,
    EspaceQGDone,
    EspaceQGTotal,
    EspaceQGCount,
    EspaceQGFinishedBlocks,
    isGeneaSphereOpen,
    GeneaSphereDone,
    GeneaSphereTotal,
    GeneaSphereCount,
    GeneaSphereFinishedBlocks,
    isGolfOpen,
    GolfDone,
    GolfTotal,
    GolfCount,
    GolfFinishedBlocks,
    isMusbaOpen,
    MusbaDone,
    MusbaTotal,
    MusbaCount,
    MusbaFinishedBlocks,
  };
}
