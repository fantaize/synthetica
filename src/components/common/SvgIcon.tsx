interface SvgIconProps {
  name: string;
  size?: number;
  whiteFilter?: boolean;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  size = 24,
  whiteFilter = false,
}) => (
  <img
    src={new URL(`../../icons/${name}`, import.meta.url).href}
    alt=""
    width={size}
    height={size}
    style={{
      objectFit: "contain",
      filter: whiteFilter ? "brightness(0) invert(1)" : undefined,
    }}
  />
);
