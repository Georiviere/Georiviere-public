import { useMapContext } from '@/context/map';

import { partition } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function MapFilters() {
  const { settings, toggleLayer } = useMapContext();

  if (settings === null || settings.layersTree.length === 0) {
    return null;
  }
  const [grouped, notGrouped] = partition(
    settings.layersTree,
    layer => layer.label !== null,
  );

  const handleChange = (id: number, isActive: boolean) => {
    toggleLayer(id, isActive);
  };

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
                        defaultChecked={layer.defaultActive}
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
      {notGrouped[0].layers.length !== 0 && (
        <ul className="bg-background px-4">
          {notGrouped[0].layers.map(layer => (
            <li
              key={layer.id}
              className="flex flex-1 items-center justify-between border-b py-4 font-medium hover:underline"
            >
              <Label htmlFor={`layerItem-${layer.id}`} className="w-full">
                {layer.label}
              </Label>
              <Switch
                id={`layerItem-${layer.id}`}
                defaultChecked={layer.defaultActive}
                onCheckedChange={isActive => handleChange(layer.id, isActive)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
