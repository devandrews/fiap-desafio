exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    category: { type: 'varchar(100)', notNull: true },
    price: { type: 'decimal', notNull: true },
    description: { type: 'text' },
    images: { type: 'text[]' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp' }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('products')
}
