import { WHITE_FILTER_ICONS } from "../../constants/icons";

interface SvgIconProps {
  name: string;
  size?: number;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ name, size = 24 }) => (
  <img
    src={`/icons/${name}`}
    alt=""
    width={size}
    height={size}
    style={{
      objectFit: "contain",
      filter: WHITE_FILTER_ICONS.has(name)
        ? "brightness(0) invert(1)"
        : undefined,
    }}
  />
);
