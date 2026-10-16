/* Goodblend · Blend It — design tokens cho React Native.
 * File sinh tự động từ tokens/*.json bằng `node scripts/build.mjs`. Đừng sửa tay.
 */
import { Platform } from 'react-native';

export const palette = {
  "brand": {
    "50": "#FDF3F3",
    "100": "#FBE4E5",
    "200": "#F7C0C2",
    "300": "#EF8E92",
    "400": "#E15A5E",
    "500": "#C1272D",
    "600": "#A81F26",
    "700": "#88181F",
    "800": "#651217",
    "900": "#420B0E"
  },
  "graphite": {
    "100": "#EAEDF0",
    "200": "#D2D8DE",
    "300": "#A8B2BD",
    "400": "#6E7B89",
    "500": "#3A424A",
    "600": "#2F363D",
    "700": "#232930",
    "800": "#181D23",
    "900": "#121920",
    "950": "#0B0E12"
  },
  "ivory": {
    "100": "#FFFFFF",
    "200": "#FEFCF8",
    "300": "#FDF9F3",
    "400": "#F6EFE4",
    "500": "#EBE2D2",
    "600": "#D8CDB9",
    "700": "#B7AD98",
    "800": "#8A8270",
    "900": "#5C564A"
  },
  "orange": {
    "100": "#FFE8D1",
    "200": "#FFD4A8",
    "300": "#FFCB8F",
    "400": "#FEB872",
    "500": "#F59628",
    "600": "#F08100",
    "700": "#C26800",
    "800": "#944F00",
    "900": "#613400"
  },
  "green": {
    "100": "#EAF8EA",
    "200": "#C6ECC6",
    "300": "#A2DCA2",
    "400": "#87C987",
    "500": "#5AAE5A",
    "600": "#449444",
    "700": "#347434",
    "800": "#255425",
    "900": "#163516"
  },
  "pink": {
    "100": "#FDE3EB",
    "200": "#F8CEDC",
    "300": "#F0A8C2",
    "400": "#EC8DAD",
    "500": "#DC5E86",
    "600": "#C03060",
    "700": "#9E2750",
    "800": "#761C3B",
    "900": "#4E1227"
  },
  "yellow": {
    "100": "#FFFAEB",
    "200": "#FFE9AD",
    "300": "#FFDD8F",
    "400": "#FFC643",
    "500": "#FFBD24",
    "600": "#F0A700",
    "700": "#C28700",
    "800": "#946700",
    "900": "#614400"
  },
  "blue": {
    "100": "#E5EEFF",
    "200": "#CDDDFF",
    "300": "#8DB0FB",
    "400": "#5C8EFF",
    "500": "#2467FF",
    "600": "#3062D4",
    "700": "#003BC2",
    "800": "#002D94",
    "900": "#001E61"
  },
  "purple": {
    "100": "#F2E5FF",
    "200": "#E5D0FB",
    "300": "#C494F4",
    "400": "#AE5CFF",
    "500": "#9224FF",
    "600": "#8040BF",
    "700": "#6200C2",
    "800": "#4B0094",
    "900": "#310061"
  },
  "red": {
    "100": "#FEE9E7",
    "200": "#FCC9C4",
    "300": "#F59B93",
    "400": "#EE6459",
    "500": "#F0392C",
    "600": "#D21F16",
    "700": "#A81610",
    "800": "#7C0F0B",
    "900": "#4F0806"
  },
  "white": "#FFFFFF",
  "black": "#000000"
} as const;

export const spacing = {
  "0": 0,
  "2": 2,
  "4": 4,
  "6": 6,
  "8": 8,
  "10": 10,
  "12": 12,
  "16": 16,
  "20": 20,
  "24": 24,
  "32": 32,
  "40": 40,
  "48": 48
} as const;
export const radius = {
  "none": 0,
  "sm": 4,
  "md": 8,
  "lg": 12,
  "xl": 16,
  "xxl": 24,
  "pill": 999,
  "xxxl": 32
} as const;
export const touchTarget = {
  "min": 48,
  "compact": 44
} as const;
export const opacity = {
  "disabled": 0.38,
  "overlay": 0.55,
  "pressed": 0.12
} as const;
export const motion = {
  duration: {
    "fast": 120,
    "base": 200,
    "slow": 320
  },
  easing: {
    "standard": [
      0.2,
      0,
      0,
      1
    ],
    "decelerate": [
      0,
      0,
      0,
      1
    ],
    "accelerate": [
      0.3,
      0,
      1,
      1
    ]
  }, // dùng: Easing.bezier(...motion.easing.standard)
} as const;

export const typography = {
  "display": {
    "md": {
      "fontFamily": "BeVietnamPro-Bold",
      "fontWeight": "700",
      "fontSize": 36,
      "lineHeight": 42,
      "letterSpacing": -0.25
    },
    "lg": {
      "fontFamily": "BeVietnamPro-Bold",
      "fontWeight": "700",
      "fontSize": 40,
      "lineHeight": 46,
      "letterSpacing": -0.5
    },
    "sm": {
      "fontFamily": "BeVietnamPro-Bold",
      "fontWeight": "700",
      "fontSize": 32,
      "lineHeight": 38,
      "letterSpacing": -0.25
    }
  },
  "heading": {
    "lg": {
      "fontFamily": "BeVietnamPro-SemiBold",
      "fontWeight": "600",
      "fontSize": 28,
      "lineHeight": 34,
      "letterSpacing": 0
    },
    "md": {
      "fontFamily": "BeVietnamPro-SemiBold",
      "fontWeight": "600",
      "fontSize": 22,
      "lineHeight": 28,
      "letterSpacing": 0
    },
    "sm": {
      "fontFamily": "BeVietnamPro-SemiBold",
      "fontWeight": "600",
      "fontSize": 18,
      "lineHeight": 24,
      "letterSpacing": 0
    }
  },
  "body": {
    "lg": {
      "fontFamily": "BeVietnamPro-Regular",
      "fontWeight": "400",
      "fontSize": 14,
      "lineHeight": 22,
      "letterSpacing": 0
    },
    "md": {
      "fontFamily": "BeVietnamPro-Regular",
      "fontWeight": "400",
      "fontSize": 12,
      "lineHeight": 18,
      "letterSpacing": 0
    },
    "sm": {
      "fontFamily": "BeVietnamPro-Regular",
      "fontWeight": "400",
      "fontSize": 11,
      "lineHeight": 16,
      "letterSpacing": 0.1
    }
  },
  "label": {
    "lg": {
      "fontFamily": "BeVietnamPro-Medium",
      "fontWeight": "500",
      "fontSize": 14,
      "lineHeight": 20,
      "letterSpacing": -0.1
    },
    "md": {
      "fontFamily": "BeVietnamPro-Medium",
      "fontWeight": "500",
      "fontSize": 12,
      "lineHeight": 16,
      "letterSpacing": 0.2
    },
    "sm": {
      "fontFamily": "BeVietnamPro-Medium",
      "fontWeight": "500",
      "fontSize": 10,
      "lineHeight": 14,
      "letterSpacing": 0.4
    },
    "lgStrong": {
      "fontFamily": "BeVietnamPro-SemiBold",
      "fontWeight": "600",
      "fontSize": 14,
      "lineHeight": 20,
      "letterSpacing": -0.1
    },
    "mdStrong": {
      "fontFamily": "BeVietnamPro-SemiBold",
      "fontWeight": "600",
      "fontSize": 12,
      "lineHeight": 16,
      "letterSpacing": 0.2
    },
    "smStrong": {
      "fontFamily": "BeVietnamPro-SemiBold",
      "fontWeight": "600",
      "fontSize": 10,
      "lineHeight": 14,
      "letterSpacing": 0.4
    },
    "xlStrong": {
      "fontFamily": "BeVietnamPro-SemiBold",
      "fontWeight": "600",
      "fontSize": 16,
      "lineHeight": 22,
      "letterSpacing": 0.1
    }
  }
} as const;

const lightRaw = {
  "fill": {
    "background": "#FEFCF8",
    "surface": "#FFFFFF",
    "surfaceElevated": "#FFFFFF",
    "surfaceSunken": "#EAEDF0",
    "primary": "#C1272D",
    "primaryPressed": "#A81F26",
    "primaryDisabled": "#F7C0C2",
    "secondary": "#F6EFE4",
    "secondaryPressed": "#EBE2D2",
    "successSubtle": "#EAF8EA",
    "warningSubtle": "#FFFAEB",
    "errorSubtle": "#FCC9C4",
    "infoSubtle": "#E5EEFF",
    "successSolid": "#449444",
    "warningSolid": "#FFBD24",
    "errorSolid": "#D21F16",
    "infoSolid": "#3062D4",
    "scrim": {
      "default": "rgba(11, 14, 18, 0.8)",
      "light": "rgba(0, 0, 0, 0.35)"
    },
    "ghostPressed": "#FBE4E5",
    "overlayPressed": "#121920",
    "neutral": "#121920",
    "neutralPressed": "#232930",
    "primaryContainer": "#FBE4E5",
    "primaryContainerPressed": "#F7C0C2",
    "primaryContainerDisabled": "#EAEDF0",
    "neutralSubtle": "#D2D8DE",
    "surfaceSunkenPressed": "#D2D8DE",
    "accentSubtle": "#F2E5FF",
    "accentSolid": "#8040BF",
    "primaryContainerSubtle": "#FDF3F3",
    "onDark": {
      "a10": "rgba(255, 255, 255, 0.1)",
      "a14": "rgba(255, 255, 255, 0.14)",
      "a70": "rgba(255, 255, 255, 0.7)",
      "a90": "rgba(255, 255, 255, 0.9)"
    },
    "surfaceInset": "rgba(234, 237, 240, 0.5)"
  },
  "text": {
    "primary": "#121920",
    "secondary": "#232930",
    "muted": "#3A424A",
    "disabled": "#A8B2BD",
    "inverse": "#FFFFFF",
    "onPrimary": "#FFFFFF",
    "onSecondary": "#88181F",
    "brand": "#A81F26",
    "link": "#A81F26",
    "success": "#347434",
    "warning": "#944F00",
    "error": "#7C0F0B",
    "onSuccessSolid": "#EAF8EA",
    "onWarningSolid": "#613400",
    "onErrorSolid": "#FFFFFF",
    "onInfoSolid": "#FFFFFF",
    "info": "#002D94",
    "onPrimaryMuted": "#FBE4E5",
    "onPrimaryContainer": "#A81F26",
    "brandDisabled": "#A8B2BD",
    "onPrimaryDisabled": "#88181F",
    "accent": "#6200C2",
    "onAccentSolid": "#FFFFFF"
  },
  "icon": {
    "default": "#3A424A",
    "muted": "#6E7B89",
    "disabled": "#D2D8DE",
    "inverse": "#FFFFFF",
    "onPrimary": "#FFFFFF",
    "onSecondary": "#88181F",
    "brand": "#C1272D",
    "success": "#347434",
    "warning": "#C26800",
    "error": "#D21F16",
    "info": "#3062D4",
    "onPrimaryContainer": "#A81F26",
    "brandDisabled": "#A8B2BD",
    "onSuccessSolid": "#EAF8EA",
    "onWarningSolid": "#613400",
    "onErrorSolid": "#FFFFFF",
    "onInfoSolid": "#FFFFFF",
    "onPrimaryDisabled": "#88181F",
    "accent": "#6200C2",
    "onAccentSolid": "#FFFFFF"
  },
  "stroke": {
    "subtle": "#EAEDF0",
    "default": "#B7AD98",
    "strong": "#6E7B89",
    "disabled": "#D8CDB9",
    "focus": "#2467FF",
    "onPrimary": "#FFFFFF",
    "brand": "#C1272D",
    "error": "#F0392C",
    "success": "#449444",
    "warning": "#F08100",
    "info": "#3062D4",
    "brandDisabled": "#D2D8DE"
  },
  "component": {
    "goal": {
      "muscle": {
        "container": "#E5EEFF",
        "text": "#3062D4"
      },
      "lean": {
        "container": "#EAF8EA",
        "text": "#347434"
      },
      "skin": {
        "container": "#FDE3EB",
        "text": "#9E2750"
      },
      "maintain": {
        "container": "#F2E5FF",
        "text": "#8040BF"
      }
    },
    "neutralGradient": {
      "start": "#3A424A",
      "end": "#121920"
    },
    "toggle": {
      "off": "#D2D8DE"
    },
    "membershipCard": {
      "grad1": "#121920",
      "grad2": "#232930",
      "grad3": "#3A424A",
      "edge1": "#6E7B89",
      "edge2": "#2F363D"
    }
  },
  "shadow": {
    "level1": {
      "ambient": "rgba(18, 25, 32, 0.04)",
      "key": "rgba(18, 25, 32, 0.08)"
    },
    "level2": {
      "ambient": "rgba(18, 25, 32, 0.05)",
      "key": "rgba(18, 25, 32, 0.1)"
    },
    "level3": {
      "ambient": "rgba(18, 25, 32, 0.06)",
      "key": "rgba(18, 25, 32, 0.12)"
    },
    "level4": {
      "ambient": "rgba(18, 25, 32, 0.08)",
      "key": "rgba(18, 25, 32, 0.14)"
    }
  },
  "elevation": {
    "level1": {
      "ios": {
        "shadowColor": "rgb(18, 25, 32)",
        "shadowOpacity": 0.08,
        "shadowRadius": 3,
        "shadowOffset": {
          "width": 0,
          "height": 2
        }
      },
      "android": {
        "elevation": 2,
        "shadowColor": "rgb(18, 25, 32)"
      },
      "web": "0px 1px 2px 0px rgba(18, 25, 32, 0.04), 0px 2px 6px 0px rgba(18, 25, 32, 0.08)"
    },
    "level2": {
      "ios": {
        "shadowColor": "rgb(18, 25, 32)",
        "shadowOpacity": 0.1,
        "shadowRadius": 6,
        "shadowOffset": {
          "width": 0,
          "height": 4
        }
      },
      "android": {
        "elevation": 4,
        "shadowColor": "rgb(18, 25, 32)"
      },
      "web": "0px 1px 3px 0px rgba(18, 25, 32, 0.05), 0px 4px 12px 0px rgba(18, 25, 32, 0.1)"
    },
    "level3": {
      "ios": {
        "shadowColor": "rgb(18, 25, 32)",
        "shadowOpacity": 0.12,
        "shadowRadius": 12,
        "shadowOffset": {
          "width": 0,
          "height": 8
        }
      },
      "android": {
        "elevation": 6,
        "shadowColor": "rgb(18, 25, 32)"
      },
      "web": "0px 2px 6px 0px rgba(18, 25, 32, 0.06), 0px 8px 24px 0px rgba(18, 25, 32, 0.12)"
    },
    "level4": {
      "ios": {
        "shadowColor": "rgb(18, 25, 32)",
        "shadowOpacity": 0.14,
        "shadowRadius": 16,
        "shadowOffset": {
          "width": 0,
          "height": 12
        }
      },
      "android": {
        "elevation": 8,
        "shadowColor": "rgb(18, 25, 32)"
      },
      "web": "0px 4px 8px 0px rgba(18, 25, 32, 0.08), 0px 12px 32px 0px rgba(18, 25, 32, 0.14)"
    }
  }
};

const darkRaw = {
  "fill": {
    "background": "#0B0E12",
    "surface": "#181D23",
    "surfaceElevated": "#3A424A",
    "surfaceSunken": "#121920",
    "primary": "#C1272D",
    "primaryPressed": "#A81F26",
    "primaryDisabled": "#651217",
    "secondary": "#2F363D",
    "secondaryPressed": "#3A424A",
    "successSubtle": "#255425",
    "warningSubtle": "#614400",
    "errorSubtle": "#7C0F0B",
    "infoSubtle": "#002D94",
    "successSolid": "#5AAE5A",
    "warningSolid": "#FFC643",
    "errorSolid": "#EE6459",
    "infoSolid": "#5C8EFF",
    "scrim": {
      "default": "rgba(11, 14, 18, 0.8)",
      "light": "rgba(0, 0, 0, 0.35)"
    },
    "ghostPressed": "#88181F",
    "overlayPressed": "#FFFFFF",
    "neutral": "#FFFFFF",
    "neutralPressed": "#FDF9F3",
    "primaryContainer": "#88181F",
    "primaryContainerPressed": "#651217",
    "primaryContainerDisabled": "#232930",
    "neutralSubtle": "#232930",
    "surfaceSunkenPressed": "#232930",
    "accentSubtle": "#310061",
    "accentSolid": "#9224FF",
    "primaryContainerSubtle": "#651217",
    "onDark": {
      "a10": "rgba(255, 255, 255, 0.1)",
      "a14": "rgba(255, 255, 255, 0.14)",
      "a70": "rgba(255, 255, 255, 0.7)",
      "a90": "rgba(255, 255, 255, 0.9)"
    },
    "surfaceInset": "#232930"
  },
  "text": {
    "primary": "#FFFFFF",
    "secondary": "#FDF9F3",
    "muted": "#A8B2BD",
    "disabled": "#6E7B89",
    "inverse": "#121920",
    "onPrimary": "#FFFFFF",
    "onSecondary": "#F7C0C2",
    "brand": "#E15A5E",
    "link": "#EF8E92",
    "success": "#EAF8EA",
    "warning": "#FFE8D1",
    "error": "#FEE9E7",
    "onSuccessSolid": "#EAF8EA",
    "onWarningSolid": "#613400",
    "onErrorSolid": "#121920",
    "onInfoSolid": "#121920",
    "info": "#CDDDFF",
    "onPrimaryMuted": "#FBE4E5",
    "onPrimaryContainer": "#FDF3F3",
    "brandDisabled": "#6E7B89",
    "onPrimaryDisabled": "#EF8E92",
    "accent": "#F2E5FF",
    "onAccentSolid": "#FFFFFF"
  },
  "icon": {
    "default": "#6E7B89",
    "muted": "#6E7B89",
    "disabled": "#6E7B89",
    "inverse": "#121920",
    "onPrimary": "#FFFFFF",
    "onSecondary": "#EF8E92",
    "brand": "#E15A5E",
    "success": "#A2DCA2",
    "warning": "#FFCB8F",
    "error": "#F59B93",
    "info": "#8DB0FB",
    "onPrimaryContainer": "#FBE4E5",
    "brandDisabled": "#6E7B89",
    "onSuccessSolid": "#EAF8EA",
    "onWarningSolid": "#613400",
    "onErrorSolid": "#121920",
    "onInfoSolid": "#121920",
    "onPrimaryDisabled": "#EF8E92",
    "accent": "#C494F4",
    "onAccentSolid": "#FFFFFF"
  },
  "stroke": {
    "subtle": "#2F363D",
    "default": "#6E7B89",
    "strong": "#6E7B89",
    "disabled": "#232930",
    "focus": "#5C8EFF",
    "onPrimary": "#FFFFFF",
    "brand": "#EF8E92",
    "error": "#F59B93",
    "success": "#A2DCA2",
    "warning": "#FFCB8F",
    "info": "#8DB0FB",
    "brandDisabled": "#2F363D"
  },
  "component": {
    "goal": {
      "muscle": {
        "container": "#002D94",
        "text": "#8DB0FB"
      },
      "lean": {
        "container": "#255425",
        "text": "#C6ECC6"
      },
      "skin": {
        "container": "#761C3B",
        "text": "#F0A8C2"
      },
      "maintain": {
        "container": "#8040BF",
        "text": "#E5D0FB"
      }
    },
    "neutralGradient": {
      "start": "#FDF9F3",
      "end": "#FFFFFF"
    },
    "toggle": {
      "off": "#3A424A"
    },
    "membershipCard": {
      "grad1": "#E15A5E",
      "grad2": "#C1272D",
      "grad3": "#A81F26",
      "edge1": "#F7C0C2",
      "edge2": "#EF8E92"
    }
  },
  "shadow": {
    "level1": {
      "ambient": "rgba(0, 0, 0, 0.11)",
      "key": "rgba(0, 0, 0, 0.14)"
    },
    "level2": {
      "ambient": "rgba(0, 0, 0, 0.11)",
      "key": "rgba(0, 0, 0, 0.18)"
    },
    "level3": {
      "ambient": "rgba(0, 0, 0, 0.14)",
      "key": "rgba(0, 0, 0, 0.22)"
    },
    "level4": {
      "ambient": "rgba(0, 0, 0, 0.18)",
      "key": "rgba(0, 0, 0, 0.25)"
    }
  },
  "elevation": {
    "level1": {
      "ios": {
        "shadowColor": "rgb(0, 0, 0)",
        "shadowOpacity": 0.14,
        "shadowRadius": 3,
        "shadowOffset": {
          "width": 0,
          "height": 2
        }
      },
      "android": {
        "elevation": 2,
        "shadowColor": "rgb(0, 0, 0)"
      },
      "web": "0px 1px 2px 0px rgba(0, 0, 0, 0.11), 0px 2px 6px 0px rgba(0, 0, 0, 0.14)"
    },
    "level2": {
      "ios": {
        "shadowColor": "rgb(0, 0, 0)",
        "shadowOpacity": 0.18,
        "shadowRadius": 6,
        "shadowOffset": {
          "width": 0,
          "height": 4
        }
      },
      "android": {
        "elevation": 4,
        "shadowColor": "rgb(0, 0, 0)"
      },
      "web": "0px 1px 3px 0px rgba(0, 0, 0, 0.11), 0px 4px 12px 0px rgba(0, 0, 0, 0.18)"
    },
    "level3": {
      "ios": {
        "shadowColor": "rgb(0, 0, 0)",
        "shadowOpacity": 0.22,
        "shadowRadius": 12,
        "shadowOffset": {
          "width": 0,
          "height": 8
        }
      },
      "android": {
        "elevation": 6,
        "shadowColor": "rgb(0, 0, 0)"
      },
      "web": "0px 2px 6px 0px rgba(0, 0, 0, 0.14), 0px 8px 24px 0px rgba(0, 0, 0, 0.22)"
    },
    "level4": {
      "ios": {
        "shadowColor": "rgb(0, 0, 0)",
        "shadowOpacity": 0.25,
        "shadowRadius": 16,
        "shadowOffset": {
          "width": 0,
          "height": 12
        }
      },
      "android": {
        "elevation": 8,
        "shadowColor": "rgb(0, 0, 0)"
      },
      "web": "0px 4px 8px 0px rgba(0, 0, 0, 0.18), 0px 12px 32px 0px rgba(0, 0, 0, 0.25)"
    }
  }
};

type Elev = { ios: object; android: object; web: string };
const withShadows = <T extends { elevation: Record<string, Elev> }>(t: T) => ({
  ...t,
  shadow: Object.fromEntries(
    Object.entries(t.elevation).map(([k, v]) => [k, Platform.select({ ios: v.ios, android: v.android, default: { boxShadow: v.web } })]),
  ) as Record<keyof T['elevation'], object>,
});

export const lightTheme = withShadows(lightRaw);
export const darkTheme = withShadows(darkRaw);
export type Theme = typeof lightTheme;
export const themes = { light: lightTheme, dark: darkTheme } as const;
