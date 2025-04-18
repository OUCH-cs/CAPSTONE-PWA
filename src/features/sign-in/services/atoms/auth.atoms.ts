import { atomWithStorage } from "jotai/utils";

const isAuthAtom = atomWithStorage<boolean>("isAuth", false);

export { isAuthAtom };
