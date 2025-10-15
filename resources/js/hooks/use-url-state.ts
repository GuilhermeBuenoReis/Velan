import { useCallback, useEffect, useState } from 'react';

type Updater<T> = T | ((previous: T) => T);

const isBrowser = () => typeof window !== 'undefined';

function getInitialValue<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  const params = new URLSearchParams(window.location.search);
  const value = params.get(key);

  if (value === null) {
    return fallback;
  }

  if (typeof fallback === 'boolean') {
    return (value === 'true') as T;
  }

  if (typeof fallback === 'number') {
    const parsed = Number(value);
    return (Number.isNaN(parsed) ? fallback : (parsed as T)) as T;
  }

  return value as T;
}

function commitToHistory(key: string, value: unknown, fallback: unknown) {
  if (!isBrowser()) {
    return;
  }

  const params = new URLSearchParams(window.location.search);

  if (value === fallback || value === undefined || value === null) {
    params.delete(key);
  } else {
    params.set(key, String(value));
  }

  const query = params.toString();
  const hash = window.location.hash;
  const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${hash ?? ''}`;

  window.history.replaceState(null, '', nextUrl);
}

export function useUrlState<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(() => getInitialValue<T>(key, fallback));

  useEffect(() => {
    setState(getInitialValue<T>(key, fallback));
  }, [key, fallback]);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const handlePopState = () => {
      setState(getInitialValue<T>(key, fallback));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [key, fallback]);

  const updateState = useCallback(
    (value: Updater<T>) => {
      setState(previous => {
        const resolved =
          typeof value === 'function' ? (value as (prevState: T) => T)(previous) : value;

        commitToHistory(key, resolved, fallback);

        return resolved;
      });
    },
    [fallback, key]
  );

  return [state, updateState] as const;
}
