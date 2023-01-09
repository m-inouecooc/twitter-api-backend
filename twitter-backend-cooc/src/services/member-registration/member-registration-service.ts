import express, { Application, Request, Response } from "express";
require("dotenv").config();

export class MemberRegistrationService {
  public static async memberRegistrationService(req: Request, res: Response) {
    (async () => {
      const mysql = require("mysql2");
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      try {
        const getBlogInfo = "select * from twitterMemberRegistration";
        const [rows, fields] = await connection.query(getBlogInfo);
        for (const val of rows) {
          console.log(val.id, val.name);
        }
      } catch (e) {
        console.log(e);
      } finally {
        connection.end();
      }
    })();
  }
}
