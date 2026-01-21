import { useState } from "react";
import metaData from "./data/meta.json";
import labsData from "./data/labs.json";
import providersData from "./data/providers.json";
import appsData from "./data/apps.json";
import standardsData from "./data/standards.json";
import type { Lab, Meta, Provider, App as AppType, Protocol } from "./types";
import { Header, type TabType } from "./components/layout";
import { LabModal } from "./components/labs";
import {
  OverviewTab,
  LabsTab,
  ProvidersTab,
  AppsTab,
  ProtocolsTab,
  AnalyticsTab,
} from "./tabs";
import { useStats } from "./hooks/useStats";

export default function LLMLabsDashboard(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [modalLab, setModalLab] = useState<Lab | null>(null);

  const labs = labsData as Lab[];
  const providers = providersData as Provider[];
  const apps = appsData as AppType[];
  const protocols = standardsData as Protocol[];
  const meta = metaData as Meta;

  const stats = useStats(labs);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <LabModal lab={modalLab} onClose={() => setModalLab(null)} />

      <Header meta={meta} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <OverviewTab labs={labs} stats={stats} onLabClick={setModalLab} />
        )}
        {activeTab === "labs" && (
          <LabsTab labs={labs} onLabClick={setModalLab} />
        )}
        {activeTab === "providers" && <ProvidersTab providers={providers} />}
        {activeTab === "apps" && <AppsTab apps={apps} />}
        {activeTab === "protocols" && <ProtocolsTab protocols={protocols} />}
        {activeTab === "analytics" && (
          <AnalyticsTab stats={stats} labs={labs} />
        )}
      </main>
    </div>
  );
}
