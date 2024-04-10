import { getLocalettings } from "./localSettings";
import { Settings, fetchSettings } from "./settings";

export async function getSettings(): Promise<Settings | null> {
    let rawSettings = null;
    let customization = null;
    try {
      rawSettings = await fetchSettings();
      customization = await getLocalettings();
    } catch (error) {
      throw error;
    }
    const {
      map: {
        baseLayers,
        group,
        bounds: [lat1, lng1, lat2, lng2],
      },
      flatpages,
      ...settings
    } = rawSettings;
    return {
      customization: {
        ...settings,
        ...customization,
      },
      flatpages,
      map: {
        baseLayers,
        layersTree: group,
        container: {
          bounds: [
            [lng1, lat1],
            [lng2, lat2],
          ],
        },
      },
    };
  }
