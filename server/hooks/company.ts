import fetcher from 'server/fetcher';
import useSWR from 'swr';

export function useCompany() {
  return useSWR('/api/company', fetcher);
}
