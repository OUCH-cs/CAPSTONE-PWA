import { atom } from "jotai";
import { Department, Sort } from "../../search.types";

const departmentFilterAtom = atom<Department | null>(null);
const sortFilterAtom = atom<Sort>("Recommended");

export { departmentFilterAtom, sortFilterAtom };
