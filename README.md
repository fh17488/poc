# Backend - PoC

## Summary

The current PoC project aims to develop a working node backend based on a given set of business conditions.

## Entities

users, groups, collections and items

- Users can belong to multiple groups or be a global manager
- A group can link to multiple collections
- A collection can belong to a single group
- Items belong to a single collection

A global manager can:
- CRUD all roles users
- CRUD all groups, collections and items

A group manager can:
- CRUD regular and manager roles only under current group
- CRUD collections and items only under current group

## Schemas

RoleSchema = {
  role: String, // valid: 'regular', 'manager', 'globalManager'
  groupId: String, // for globalManager groupId is null
};

UserSchema = {
  email: String,
  roles: ArrayOf(RoleSchema),
};

GroupSchema = {
  name: String,
  collectionIds: ArrayOf(String),
};

CollectionSchema = {
  name: String,
};

ItemSchema = {
  name: String,
  parentId: String, /// collection id
}

## Requirements:

- Build CRUD API for all 4 entities
- All-access, filtering and relation logic should be implemented as an Authorization layer by way of middlewares 
- The authorization layer should be generic
- Use absolute paths
- Patterns: modules, services, dependency injection, multi-tier architecture
- (Optional) Whenever a user gets updated an email should be sent to him (this should be in service)
- (Optional) Must run in serverless (serverless.framework) with offline and warmup plugins
- (Optional) When an email is changed both old and new emails should get notified

## License

  Nest is [MIT licensed](LICENSE).
