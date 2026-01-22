export interface Headquarters {
  city: string | null;
  country: string;
}

export interface Lab {
  id: string;
  name: string;
  headquarters: Headquarters;
  founded: number | null;
  flagship: string;
  modelFamilies: string[];
  openSource: boolean | "partial";
  apiAvailable: boolean;
  focus: string[];
  tier: 1 | 2 | 3;
  chat?: string;
  icon?: string;
  whiteFilter?: boolean;
}

export interface Meta {
  title: string;
  description: string;
  version: string;
  lastUpdated: string;
  source: string;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  category:
    | "neo-cloud"
    | "big-cloud"
    | "inference"
    | "platform"
    | "gpu-cloud"
    | "local"
    | "router"
    | "search";
  headquarters: Headquarters;
  founded: number | null;
  website: string;
  apiDocs: string;
  modelsAvailable: number | null;
  pricing: string;
  features: string[];
  status?: "alive" | "dead" | "beta" | "merged";
  icon?: string;
  whiteFilter?: boolean;
}

export interface App {
  id: string;
  name: string;
  description: string;
  category:
    | "ide"
    | "cli"
    | "extension"
    | "browser"
    | "productivity"
    | "terminal"
    | "desktop"
    | "web"
    | "plugin"
    | "physical"
    | "agent";
  platform: string[];
  website: string;
  pricing: string;
  features: string[];
  status?: "alive" | "dead" | "beta" | "merged";
  icon?: string;
  whiteFilter?: boolean;
}

export interface Protocol {
  id: string;
  name: string;
  acronym: string | null;
  description: string;
  organization: string;
  website: string;
  github: string | null;
  docs: string;
  status?: string;
  features: string[];
}

export interface Data {
  meta: Meta;
  labs: Lab[];
  providers: Provider[];
  apps: App[];
  protocols: Protocol[];
}

export interface Stats {
  tierCounts: Record<number, number>;
  countryCounts: Record<string, number>;
  openSourceCounts: Record<string, number>;
  apiCounts: Record<string, number>;
  chatCounts: Record<string, number>;
  focusAreas: Record<string, number>;
}

export interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

export interface FocusDataItem {
  name: string;
  count: number;
}

export interface LabModalProps {
  lab: Lab | null;
  onClose: () => void;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export interface LabCardProps {
  lab: Lab;
  onClick: () => void;
}
