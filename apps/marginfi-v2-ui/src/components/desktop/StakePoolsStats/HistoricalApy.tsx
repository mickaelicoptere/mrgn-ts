import { percentFormatterDyn, shortenAddress } from "@mrgnlabs/mrgn-common";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from "chart.js";
import chroma from "chroma-js";
import { FC, useState } from "react";
import { Line } from "react-chartjs-2";
import { MrgnContainedSwitch } from "~/components/common";
import { APY_THRESHOLD } from "~/pages/lstats";
import { STAKE_POOLS_METAS } from "~/store/stakePoolStatsStore";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const HistoricalApy: FC<{
  epochs: number[];
  historicalApys: Record<string, { effective: number; baseline: number }[]>;
}> = ({ epochs, historicalApys }) => {
  const [showBaseline, setShowBaseline] = useState<boolean>(true);

  const colors = chroma
    .scale(["#663399", "#00A86B"])
    .mode("lab")
    .colors(Object.keys(historicalApys).length)
    .map((color) => chroma(color).alpha(0.9).hex());
  const datasets = Object.entries(historicalApys)
    .filter(([_, historicalApys]) => historicalApys.every((apy) => apy.effective > APY_THRESHOLD))
    .sort(
      (a, b) =>
        a[1].reduce((sum, e) => {
          sum += showBaseline ? e.baseline : e.effective;
          return sum;
        }, 0) -
        b[1].reduce((sum, e) => {
          sum += showBaseline ? e.baseline : e.effective;
          return sum;
        }, 0)
    )
    .map(([spAddress, spApys], i) => {
      const spName = Object.keys(STAKE_POOLS_METAS).includes(spAddress)
        ? STAKE_POOLS_METAS[spAddress].name
        : shortenAddress(spAddress);

      return {
        label: spName,
        fill: true,
        data: spApys.map((apy) => (showBaseline ? apy.baseline * 100 : apy.effective * 100)),
        borderColor: chroma(colors[i]).darken().hex(),
        backgroundColor: colors[i],
      };
    });

  const historicalApyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "left" as const,
      },
      title: {
        display: true,
        text: `Historical APY - ${showBaseline ? "baseline" : "effective"} (%)`,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"line">) =>
            `${tooltipItem.dataset.label}: ${percentFormatterDyn.format(tooltipItem.parsed.y / 100)}`,
        },
      },
    },
    interaction: {
      mode: "point" as const,
    },
  };

  return (
    <div className="flex flex-col justify-start">
      <div className="flex justify-start gap-2 items-center">
        <MrgnContainedSwitch
          checked={showBaseline}
          onChange={(event) => {
            setShowBaseline(event.target.checked);
          }}
        />
        Show baseline APY
      </div>
      <Line
        options={historicalApyOptions}
        data={{
          labels: epochs,
          datasets: datasets,
        }}
      />
    </div>
  );
};
