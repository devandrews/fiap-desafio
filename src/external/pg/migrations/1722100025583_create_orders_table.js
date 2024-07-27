exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('orders', {
    id: 'id',
    status: { type: 'varchar(100)', notNull: true },
    total: { type: 'decimal', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp' }
  })

  pgm.createTable('order_items', {
    id: 'id',
    order_id: { type: 'varchar(100)', notNull: true },
    product_id: { type: 'varchar(100)', notNull: true },
    quantity: { type: 'integer', notNull: true },
    price: { type: 'decimal', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp' }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('order_items')
  pgm.dropTable('orders')
}
