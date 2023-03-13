export interface StoresMap {
  Code: {
    id: number
    mobile: string
  }
  Lottery: {
    id: number
    memo: string
    options: string[]
  }
}

const dbWriteError = (e: any, rej: (reason?: Error) => void) => {
  const error = new ReferenceError("IndexDB write error:", e)
  rej(error)
}

class DBHelper {
  _name = 'toolsDB'
  _version = 2
  DB = window.indexedDB
  db: IDBDatabase | undefined
  dbLinkFn: Promise<boolean> | undefined

  constructor() {
    const request = this.DB.open(this._name, this._version)
    let res: (value: boolean | PromiseLike<boolean>) => void, rej: (reason?: Error) => void
    this.dbLinkFn = new Promise<boolean>((resolve, reject) => (res = resolve, rej = reject))

    request.onsuccess = () => {
      console.log("Success creating/accessing IndexedDB database");
      this.db = request.result
      res(true)
    }
    request.onerror = () => {
      const error = new ReferenceError('Error creating/accessing IndexedDB database')
      console.error(error);
      rej(error)
    }
    request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      console.log(111)
      this.db = (e.target! as unknown as { result: IDBDatabase }).result
      /**
       * @description Code 手机号
       */
      if (!this.db!.objectStoreNames.contains("Code")) {
        const objectStore = this.db.createObjectStore("Code", {
          keyPath: "id",
          autoIncrement: true
        });

        objectStore.createIndex("id", "id", { unique: true });
        objectStore.createIndex("mobile", "mobile", { unique: false });
      }
      /**
       * @description 抽奖
       */
      if (!this.db!.objectStoreNames.contains("Lottery")) {
        const objectStore = this.db.createObjectStore("Lottery", {
          keyPath: "id",
          autoIncrement: true
        });

        objectStore.createIndex("id", "id", { unique: true });
        objectStore.createIndex("memo", "memo", { unique: true });
        objectStore.createIndex("options", "options", { unique: false });
      }
    }
  }

  async addData<T extends keyof StoresMap>(storeName: T, data: Omit<StoresMap[T], 'id'>) {
    await this.dbLinkFn!
    let res: (value: boolean) => void, rej: (reason?: Error) => void
    const p = new Promise((resolve, reject) => (res = resolve, rej = reject))

    const request = this.db!
      .transaction(storeName, "readwrite")
      .objectStore(storeName)
      .add(data)
    request.onsuccess = () => res(true)
    request.onerror = (e) => {
      const error = new ReferenceError("IndexDB write error:", e as any)
      rej(error)
    };

    return p
  }

  async getData<T extends keyof StoresMap>(storeName: T): Promise<StoresMap[T][]> {
    await this.dbLinkFn!
    let res: (value: StoresMap[T][]) => void, rej: (reason?: Error) => void
    const p = new Promise<StoresMap[T][]>((resolve, reject) => (res = resolve, rej = reject))

    let list: StoresMap[T][] = [];
    const store = this.db!
      .transaction(storeName, "readwrite")
      .objectStore(storeName)
    const request = store.openCursor();
    request.onerror = (e) => dbWriteError(e, rej)
    request.onsuccess = (e) => {
      var cursor = (e.target! as any).result;
      if (cursor) {
        list.push(cursor.value);
        cursor.continue();
      } else res(list)
    };

    return p
  }

  async deleteData<T extends keyof StoresMap>(storeName: T, key: StoresMap[T]['id']) {
    await this.dbLinkFn!
    let res: (value: boolean) => void, rej: (reason?: Error) => void
    const p = new Promise<boolean>((resolve, reject) => (res = resolve, rej = reject))

    const request = this.db!.transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .delete(key);
    request.onerror = (e) => dbWriteError(e, rej)
    request.onsuccess = () => res(true)

    return p
  }

  async updateData<T extends keyof StoresMap>(storeName: T, data: StoresMap[T]) {
    await this.dbLinkFn!
    let res: (value: boolean) => void, rej: (reason?: Error) => void
    const p = new Promise<boolean>((resolve, reject) => (res = resolve, rej = reject))

    const request = this.db!
      .transaction([storeName], "readwrite")
      .objectStore(storeName)
      .put(data);
    request.onsuccess = () => res(true)
    request.onerror = (e) => dbWriteError(e, rej)
    return p
  }
}

export default new DBHelper()