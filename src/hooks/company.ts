import fetcher from 'src/fetcher';
import useSWR from 'swr';

export function useCompany() {
  return useSWR('/api/company', fetcher);
}
