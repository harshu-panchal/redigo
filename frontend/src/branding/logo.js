import { createElement } from "react";
import brandLogoAsset from "@/assets/REdigo_logo.png";

export const BRAND_LOGO_SRC = brandLogoAsset;

export const BRAND_LOGO_ALT = "Redigo";

export function BrandLogo({
  className = "",
  alt = BRAND_LOGO_ALT,
  ...props
}) {
  const resolvedClassName = ["object-contain", className]
    .filter(Boolean)
    .join(" ");

  return createElement("img", {
    src: BRAND_LOGO_SRC,
    alt,
    className: resolvedClassName,
    ...props,
  });
}
