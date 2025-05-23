import { atom } from "jotai";
import { Sort } from "../../types/search.types";
import { AllDepartments } from "../../types/department.types";

const departmentFilterAtom = atom<AllDepartments | null>(null);
const sortFilterAtom = atom<Sort>("Recommended");

export { departmentFilterAtom, sortFilterAtom };
