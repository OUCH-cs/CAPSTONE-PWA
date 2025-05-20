import { atomWithStorage } from "jotai/utils";

const isAuthAtom = atomWithStorage<boolean | null>("isAuth", null);

export { isAuthAtom };
