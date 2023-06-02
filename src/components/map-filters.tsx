import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMapContext } from '@/context/map';

import { getUrlSearchParamsForLayers, partition } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function MapFilters() {
  const { settings } = useMapContext();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const layersFromParams = params.get('layers') ?? '';

  const handleChange = useCallback(
    (id: number, isActive: boolean) => {
      const nextLayerSearchParams = getUrlSearchParamsForLayers(
        layersFromParams,
        [id],
        isActive,
      );
      router.push(`${pathname}${nextLayerSearchParams}`);
    },
    [pathname, router, layersFromParams],
  );

  if (settings === null || settings.layersTree.length === 0) {
    return null;
  }

  const [grouped, [notGrouped]] = partition(
    settings.layersTree,
    layer => layer.label !== null,
  );

  const defaultActivatedLayers = layersFromParams
    .split(',')
    .filter(Boolean)
    .map(Number);

  return (
    <>
      {grouped.length !== 0 && (
        <Accordion
          type="multiple"
          className="w-full bg-background"
          defaultValue={grouped.map((_, index) => `item-${index}`)}
        >
          {grouped.map((group, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="px-4">
              <AccordionTrigger>{group.label}</AccordionTrigger>
              <AccordionContent>
                <ul className="pl-6">
                  {group.layers.map(layer => (
                    <li
                      key={layer.id}
                      className="my-2 flex items-center space-x-2"
                    >
                      <Label
                        htmlFor={`layerItem-${layer.id}`}
                        className="w-full"
                      >
                        {layer.label}
                      </Label>
                      <Switch
                        id={`layerItem-${layer.id}`}
                        checked={defaultActivatedLayers.includes(layer.id)}
                        onCheckedChange={isActive =>
                          handleChange(layer.id, isActive)
                        }
                      />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      {notGrouped.layers.length !== 0 && (
        <ul className="bg-background px-4">
          {notGrouped.layers.map(layer => (
            <li
              key={layer.id}
              className="flex flex-1 items-center justify-between border-b py-4 font-medium hover:underline"
            >
              <Label htmlFor={`layerItem-${layer.id}`} className="w-full">
                {layer.label}
              </Label>
              <Switch
                id={`layerItem-${layer.id}`}
                checked={defaultActivatedLayers.includes(layer.id)}
                onCheckedChange={isActive => handleChange(layer.id, isActive)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
