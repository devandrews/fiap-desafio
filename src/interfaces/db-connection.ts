export interface DbConnection {
  query: <R = any>(query: string, values?: any[]) => Promise<R[]>
}
