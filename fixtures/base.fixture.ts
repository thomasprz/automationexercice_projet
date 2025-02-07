import { pages } from "./page.fixture";
import { components } from "./components.fixture";
import { mergeTests } from "@playwright/test";

export const test = mergeTests(pages, components)

export{expect, Locator} from '@playwright/test'