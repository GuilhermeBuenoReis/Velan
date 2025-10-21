import { useEffect, useMemo } from 'react';
import { useUrlState } from '@/hooks/use-url-state';

/**
 * Hook genérico e limpo para paginação com suporte a sincronização via URL.
 *
 * @param key - Nome do parâmetro na URL (ex: 'page' ou 'results_page')
 * @param data - Lista de dados a serem paginados
 * @param pageSize - Quantidade de itens por página
 */
export function usePagination<T>(key: string, data: T[], pageSize = 10) {
  const [page, setPage] = useUrlState<number>(key, 1);

  const { paginatedData, totalPages, currentPage } = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * pageSize;

    return {
      paginatedData: data.slice(startIndex, startIndex + pageSize),
      totalPages,
      currentPage,
    };
  }, [data, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, setPage]);

  const goToPage = (targetPage: number) => {
    const safePage = Math.min(Math.max(targetPage, 1), totalPages);
    setPage(safePage);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    paginatedData,
    totalPages,
    currentPage,
    goToPage,
    nextPage,
    prevPage,
  };
}
