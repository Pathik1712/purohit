import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { SectionReveal } from "./SectionReveal";

const WIDTH = 960;
const HEIGHT = 470;

const HOME_ID = "356";
const MARKET_IDS = new Set(["840", "784", "036"]);
const ANTARCTICA_ID = "010";

const home = { label: "Jaipur", coords: [75.79, 26.91] as [number, number] };
const markets = [
  { label: "United States", coords: [-98.5, 39.5] as [number, number], anchor: "end" as const, dx: -12 },
  { label: "UAE", coords: [54.4, 24.4] as [number, number], anchor: "end" as const, dx: -12 },
  { label: "Australia", coords: [134, -25.5] as [number, number], anchor: "start" as const, dx: 12 },
];

const topology = world as unknown as Topology<{ countries: GeometryCollection }>;
const countries = (feature(topology, topology.objects.countries) as FeatureCollection<Geometry>).features.filter(
  (f) => f.id !== ANTARCTICA_ID,
);

const projection = geoNaturalEarth1().fitExtent(
  [
    [8, 8],
    [WIDTH - 8, HEIGHT - 8],
  ],
  { type: "FeatureCollection", features: countries } as FeatureCollection,
);
const path = geoPath(projection).digits(1);

function project(coords: [number, number]) {
  const [x, y] = projection(coords) ?? [0, 0];
  return { x, y };
}

function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const lift = Math.hypot(to.x - from.x, to.y - from.y) * 0.28;
  return `M${from.x.toFixed(1)},${from.y.toFixed(1)} Q${mx.toFixed(1)},${(my - lift).toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
}

function fillFor(f: Feature<Geometry>) {
  const id = String(f.id);
  if (id === HOME_ID) return "var(--color-primary)";
  if (MARKET_IDS.has(id)) return "var(--color-secondary)";
  return "var(--color-border)";
}

export function GlobalReach() {
  const origin = project(home.coords);

  return (
    <section className="section-padding overflow-hidden">
      <div className="container">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-bold uppercase leading-[1] tracking-[-0.02em] text-balance text-foreground">
            Made in Jaipur.
            <br />
            Loved in 20+ countries.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            From our roastery in Rajasthan to snack shelves in the US, UAE, Australia and beyond.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-10 md:mt-14">
          <div>
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              role="img"
              aria-labelledby="global-reach-title"
              className="block h-auto w-full"
            >
              <title id="global-reach-title">
                World map showing Roasty Tasty shipping from Jaipur, India to the United States, UAE and Australia
              </title>

              <g>
                {countries.map((f, i) => (
                  <path
                    key={String(f.id ?? i)}
                    d={path(f) ?? undefined}
                    fill={fillFor(f)}
                    stroke="var(--color-background)"
                    strokeWidth={0.6}
                  />
                ))}
              </g>

              <g fill="none" stroke="var(--color-accent)" strokeWidth={1.6} strokeLinecap="round">
                {markets.map((m) => (
                  <path
                    key={m.label}
                    d={arcPath(origin, project(m.coords))}
                    strokeDasharray="5 6"
                    className="animate-[route_1.4s_linear_infinite] motion-reduce:animate-none"
                  />
                ))}
              </g>

              {markets.map((m) => {
                const p = project(m.coords);
                return (
                  <g key={m.label}>
                    <circle cx={p.x} cy={p.y} r={5} fill="var(--color-accent)" stroke="white" strokeWidth={2} />
                    <text
                      x={p.x + m.dx}
                      y={p.y + 4}
                      textAnchor={m.anchor}
                      className="fill-foreground font-heading text-[13px] font-semibold max-sm:hidden"
                      paintOrder="stroke"
                      stroke="var(--color-background)"
                      strokeWidth={4}
                    >
                      {m.label}
                    </text>
                  </g>
                );
              })}

              <g>
                <circle
                  cx={origin.x}
                  cy={origin.y}
                  r={16}
                  fill="var(--color-accent)"
                  opacity={0.25}
                  className="origin-center animate-ping [transform-box:fill-box] motion-reduce:animate-none"
                />
                <circle cx={origin.x} cy={origin.y} r={7} fill="var(--color-accent)" stroke="white" strokeWidth={2.5} />
                <text
                  x={origin.x + 14}
                  y={origin.y + 22}
                  className="fill-foreground font-heading text-[14px] font-bold max-sm:hidden"
                  paintOrder="stroke"
                  stroke="var(--color-background)"
                  strokeWidth={4}
                >
                  {home.label}, India
                </text>
              </g>
            </svg>
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:hidden">
            {[`${home.label}, India`, ...markets.map((m) => m.label)].map((label, i) => (
              <li
                key={label}
                className={
                  i === 0
                    ? "rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground"
                    : "rounded-full bg-secondary/25 px-3.5 py-1.5 text-xs font-semibold text-foreground"
                }
              >
                {label}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-3 w-3 rounded-sm bg-primary" /> Home roastery
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-3 w-3 rounded-sm bg-secondary" /> Key export markets
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-0 w-5 border-t-2 border-dashed border-accent" /> Shipped from Jaipur
            </li>
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
