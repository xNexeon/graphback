
const createTemplate = (fieldName: string, typeName: string, subscription: boolean): string => {
  return `${fieldName}: (_, args, context) => {
    return context.crudService.create(${typeName.toLowerCase()}, args, context);
  }`
}

const updateTemplate = (fieldName: string, typeName: string, subscription: boolean): string => {
  return `${fieldName}: (_, args, context) => {
    return context.crudService.update(${typeName.toLowerCase()}, args, context);
  }`
}

const deleteTemplate = (fieldName: string, typeName: string): string => {
  return `${fieldName}: (_, args, context) => {
    return context.crudService.delete(${typeName.toLowerCase()}, args, context);
  }`
}

const findAllTemplate = (fieldName: string, typeName: string): string => {
  return `${fieldName}: (_, args, context) => {
    return context.crudService.findAll(${typeName.toLowerCase()}, context);
  }`
}

const findTemplate = (fieldName: string, tableName: string): string => {
  return `${fieldName}: (_, args, context) => {
    return context.crudService.findAll(${typeName.toLowerCase()}, context);
  }`
}



const newSub = (typeName: string): string => {
  return `new${typeName}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        return ${this.pubsub}.asyncIterator(Subscriptions.NEW_${typeName.toUpperCase()})
      }
    }`
}

const updatedSub = (typeName: string): string => {
  return `updated${typeName}: {
      subscribe  : (_: any, __: any, context: GraphQLContext) => {
        return ${this.pubsub}.asyncIterator(Subscriptions.UPDATED_${typeName.toUpperCase()})
      }
    }`
}

const deletedSub = (typeName: string): string => {
  return `deleted${typeName}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        return ${this.pubsub}.asyncIterator(Subscriptions.DELETED_${typeName.toUpperCase()})
      }
    }`
}

// TODO
const typeRelation = (relation: string, columnName: string, fieldName: string, tableName: string): string => {
  if (relation === 'OneToOne') {
    return `${fieldName}: (parent: any, _: any, context: GraphQLContext) => {
      return ${this.knexContext}.select().from('${tableName}').where('${columnName}', '=', parent.id)
                                .then((result) => result[0])
    }`
  } else if (relation === 'OneToMany') {
    return `${fieldName}: (parent: any, _: any, context: GraphQLContext) => {
      return ${this.knexContext}.select().from('${tableName}').where('${columnName}', '=', parent.id)
    }`
  } else {
    return undefined
  }
}

const invertTypeRelation = (columnName: string, fieldName: string, tableName: string): string => {
  return `${fieldName}: async (parent: any, _: any, context: GraphQLContext) => {
      const result = await ${this.knexContext}.select().from('${tableName}').where('id', '=', parent.${columnName})
      return result[0]
    }`
}

const blankResolver = (name: string) => {
  return `${name}: (_, args, context) => {
      // Implementation here
    }`
}

const blankSubscription = (name: string) => {
  return `${name}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        // Implementation here
      }
    }`
}