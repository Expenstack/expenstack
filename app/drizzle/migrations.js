// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import m0000 from './20260706162559_normal_naoko/migration.sql';
import m0001 from './20260916120000_add_revenue/migration.sql';
import m0002 from './20260916121000_add_installment_flag/migration.sql';

  export default {
    migrations: {
      "20260706162559_normal_naoko": m0000,
      "20260916120000_add_revenue": m0001,
      "20260916121000_add_installment_flag": m0002
}
  }
  