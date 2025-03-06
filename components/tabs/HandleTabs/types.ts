import type { MdiIconString } from "nuxt-mdi/dist/runtime/components/MdiIcon";

export type Tab = {
  value: string;
  label: string;
  component?: ReturnType<typeof defineComponent>;
  icon?: MdiIconString;
  props?: Record<string, any>;
};
