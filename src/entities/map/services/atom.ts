import { atom } from "jotai";

const departmentAtom = atom<"hospital" | "pharmacy" | null>(null);

export { departmentAtom };
