import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName
      ? userSpecifiedName
      : snakeCase(
          targetName.endsWith('Entity') ? targetName.substring(0, targetName.lastIndexOf('Entity')) : targetName
        );
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    const name = customName ? customName : snakeCase(propertyName),
      prefix = snakeCase(embeddedPrefixes.join('_'));

    return `${prefix}${name}`;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(`${tableName}_${columnName ? columnName : propertyName}`);
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    return `${alias}__${propertyPath.replace('.', '_')}`;
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[]
  ): string {
    return super.foreignKeyName(tableOrName, columnNames, _referencedTablePath, _referencedColumnNames);
  }

  indexName(tableOrName: Table | string, columnNames: string[], where?: string): string {
    const originColumnNames = [...columnNames],
      tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName,
      replacedTableName = tableName.replace('.', '-');

    const keys = ['IDX', replacedTableName, ...originColumnNames];

    if (where) {
      keys.push(where);
    }

    return keys.join('-');
  }
}
