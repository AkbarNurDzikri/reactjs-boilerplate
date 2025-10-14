import { createContext } from "react-router";
import type { IUserContext } from "../interfaces/user-context.interface";

export const userContext = createContext<IUserContext | null>(null);
