import { pages } from "./page.fixture";
import { components } from "./components.fixture";
import { api } from "./api.fixture";
import { mergeTests } from "@playwright/test";

export const test = mergeTests(pages, components, api)

export{expect, Locator} from '@playwright/test'