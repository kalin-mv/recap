import { xRead } from 'src/fetcher';
import useSWR from 'swr';

export function useIdentity() {
    return useSWR('/identity', xRead);
}
