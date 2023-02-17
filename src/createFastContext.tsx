import {
  createContext,
  useCallback,
  useContext,
  useRef,
  // useState,
  // useEffect,
  useSyncExternalStore,
} from "react";
import "./App.css";

type StoreType = { first: string; last: string };

export default function createFastContext<StoreType>(initialStore: StoreType) {
  function useStoreData(): {
    get: () => StoreType;
    set: (value: Partial<StoreType>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialStore);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());
    const set = useCallback((value: Partial<StoreType>) => {
      store.current = {
        ...store.current,
        ...value,
      };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseStoreDataType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataType | null>(null);

  const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  };

  const useStore = (): [StoreType, (value: Partial<StoreType>) => void] => {
    const store = useContext(StoreContext);
    if (!store) throw new Error("Store not found!!");

    // const [state, setState] = useState(store.get());

    // useEffect(() => {
    //   return store.subscribe(() => setState(store.get()));
    // }, []);

    const state = useSyncExternalStore(store.subscribe, store.get);

    return [state, store.set];
  };

  return {
    Provider,
    useStore
  }
};
