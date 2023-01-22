export class CommonService {
  public static TeturnTimeStamp(): string {
    //Dateオブジェクトを利用
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;
    //返却例：2011/10/14 00:00:00
  }

  public static async databaseAccessInfo() {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    return await connection;
  }
}
