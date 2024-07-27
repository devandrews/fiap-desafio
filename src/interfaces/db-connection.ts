export interface DbConnection {
  query: <T = any>(query: string, values?: any[]) => Promise<T[]>
}
