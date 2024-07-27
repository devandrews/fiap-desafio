import express, { Express } from 'express'
import swaggerUi from 'swagger-ui-express'

import { PgOrderGatewayInterface } from '@/external/pg/repositories/order-repository'
import { PgProductGatewayInterface } from '@/external/pg/repositories/product-repository'
import { PgUserGatewayInterface } from '@/external/pg/repositories/user-repository'

import { OrderUsecase } from '@/usecases/order'
import { ProductUsecase } from '@/usecases/product'
import { UserUsecase } from '@/usecases/user'

import { DbConnection } from '@/interfaces/db-connection'

import { HttpOrdersRoutes } from './routes/orders'
import { HttpProductsRoutes } from './routes/products'
import { HttpUsersRoutes } from './routes/users'
import { HttpDocsRoutes } from './routes/docs'

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

const { APP_PORT = 3000 } = process.env

export class HttpDriver {
  constructor (
    private readonly db: DbConnection,
    private readonly openAPIRegistry: OpenAPIRegistry
  ) {}

  start (): void {
    const app = express()

    this.addMiddlewares(app)

    this.setupHttpUsersRoutes(app)
    this.setupHttpProductsRoutes(app)
    this.setupHttpOrdersRoutes(app)
    this.setupHttpDocsRoutes(app)

    app.listen(APP_PORT, () => {
      console.log(`Server is running on http://localhost:${APP_PORT}`)
    })
  }

  addMiddlewares (app: Express): void {
    app.use(express.json())
    app.use(express.text())
    app.use(express.urlencoded({ extended: false }))
    app.use(swaggerUi.serve)
  }

  setupHttpUsersRoutes (app: Express): void {
    const httpUsersUsecase = new UserUsecase(
      new PgUserGatewayInterface(this.db)
    )
    const httpUsersRoutes = new HttpUsersRoutes(
      app,
      httpUsersUsecase,
      this.openAPIRegistry
    )
    httpUsersRoutes.setup()
  }

  setupHttpProductsRoutes (app: Express): void {
    const httpProductsUsecase = new ProductUsecase(
      new PgProductGatewayInterface(this.db)
    )
    const httpProductsRoutes = new HttpProductsRoutes(
      app,
      httpProductsUsecase,
      this.openAPIRegistry
    )
    httpProductsRoutes.setup()
  }

  setupHttpOrdersRoutes (app: Express): void {
    const httpOrdersUsecase = new OrderUsecase(
      new PgOrderGatewayInterface(this.db)
    )
    const httpOrdersRoutes = new HttpOrdersRoutes(
      app,
      httpOrdersUsecase,
      this.openAPIRegistry
    )
    httpOrdersRoutes.setup()
  }

  setupHttpDocsRoutes (app: Express): void {
    const httpDocsRoutes = new HttpDocsRoutes(app)
    httpDocsRoutes.setup()
  }
}
