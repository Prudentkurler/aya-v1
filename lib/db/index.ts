import Dexie, { type Table } from "dexie";
import type { Measurement, Medication } from "@/lib/types";

export interface SyncQueueItem {
  id?: number;
  type: "measurement" | "medication";
  action: "create" | "update" | "delete";
  data: any;
  timestamp: Date;
  retries: number;
}

export class HealthDB extends Dexie {
  measurements!: Table<Measurement>;
  medications!: Table<Medication>;
  syncQueue!: Table<SyncQueueItem>;

  constructor() {
    super("healthdb");
    this.version(1).stores({
      measurements: "++id, type, timestamp",
      medications: "++id, active",
      syncQueue: "++id, type, timestamp",
    });
  }
}

export const db = new HealthDB();
