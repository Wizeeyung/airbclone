"use client";


import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import type { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  // Memoize storeRef to create store only once
  const storeRef = useMemo(() => makeStore(), []);

  // Create a persistor from the same store instance
  const persistor = useMemo(() => persistStore(storeRef), [storeRef]);

  useEffect(() => {
    if (storeRef != null) {
      // Setup listeners (optional, if needed for RTK Query features)
      const unsubscribe = setupListeners(storeRef.dispatch);
      return unsubscribe;
    }
  }, [storeRef]);

  return (
    <Provider store={storeRef}>
      <PersistGate  persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider
