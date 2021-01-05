/* Agrupo los pedidos por clientes */ 
db.ventas.aggregate({
    $group: {_id: "$cliente"}
})

/* Agrupo los pedidos por proveedores */ 
db.ventas.aggregate({
    $group: {_id: "$proveedor"}
})

/* Agrupo los pedidos por la fecha de la venta y cuento cuantos pedidos se han hecho en las mismas fechas */ 
db.ventas.aggregate({
    $group: {_id: "$fechaventa",
    count: {$sum: 1}}
})

/* Agrupo los pedidos por clientes y cuento cuantos ha hecho cada uno */ 
db.ventas.aggregate({
    $group: {_id: "$cliente",
    count: {$sum: 1}}
})

/* Calculo cuantos pedidos le han hecho a cada proveedor */
db.ventas.aggregate({
    $group: {_id: "$proveedor",
    count: {$sum: 1}}
})

/* Calculo el total gastado en cada pedido mostrando la fecha de venta y el nombre del cliente */
db.ventas.aggregate([
    {$project: {fechaventa: 1, cliente: 1, total: {$multiply: ["$preciounidad", "$unidades"]}}}
])

/* Calculo la media de dinero total gastado por cliente en todos sus pedidos */ 
db.ventas.aggregate([
    {$group: {_id: "$cliente",
    avgPedidos: {$avg: {$multiply: ["$preciounidad", "$unidades"]}}}}
])

/* Calcula el máximo dinero gastado por cliente en un único pedido*/ 
db.ventas.aggregate([
    {$group: {_id: "$cliente",
    maxPedidos: {$max: {$multiply: ["$preciounidad", "$unidades"]}}}}
])

/* Muestra el pedido más caro realizado de cada día */
db.ventas.aggregate([
    {$group: {_id: "$fechaventa",
    importeTotal: {$max: {$multiply: ["$preciounidad", "$unidades"]}}}}
])

/* Beneficios de proveedores con cada artículo */
db.ventas.aggregate([
    {$project: {articulo: 1, beneficio: {$subtract: ["$preciounidad", "$precioproveedor"]}}}
])

/* Margen de beneficio de los proveedores con cada artículo */ 
//NOTA: El resultado está expresado en % (4= beneficio del 4%)
db.ventas.aggregate([
    {$project: {articulo: 1, beneficio: {$divide: ["$preciounidad", "$precioproveedor"]}}}
])