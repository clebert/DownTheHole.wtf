import type { FunctionComponent } from "preact";
import { MainPage } from "#components/main-page.js";
import { AppState } from "#contexts/app-state.js";
import { useAppState } from "#hooks/use-app-state.js";

export const App: FunctionComponent = () => {
  return (
    <AppState.Provider value={useAppState()}>
      <MainPage />
    </AppState.Provider>
  );
};
