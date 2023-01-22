import { CommonService } from "../../services/common";
var log4js = require("log4js");
var logger = log4js.getLogger();

export class MemberRegistrationDB {
  public static async getAccountInfoSentence(
    mailAddress: string
  ): Promise<string[]> {
    try {
      let errorMessage: string[] = [];
      const connection = await CommonService.databaseAccessInfo();

      const getAccountInfoSentence = `select * from mail_address_registration_history where mail_address = "${mailAddress}"`;

      console.log("DBから一致するmailAddressがあれば取得する");
      const getAccountInfo = await connection.query(getAccountInfoSentence);

      console.log("既に mailAddress が登録されていた場合、エラー文を返却する");
      if (getAccountInfo[0].length !== 0) {
        errorMessage.push("このメールアドレスは既に登録されています");
      }

      return errorMessage;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public static async createAccountInfoSentence(
    mailAddress: string,
    timeStamp: string
  ): Promise<void> {
    try {
      const connection = await CommonService.databaseAccessInfo();
      const createAccountInfoSentence = `insert into mail_address_registration_history (mail_address, insert_at) values ("${mailAddress}", "${timeStamp}")`;
      await connection.query(createAccountInfoSentence);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public static async createAccountInfo(
    userName: string,
    password: string,
    mailAddress: string,
    timeStamp: string
  ): Promise<void> {
    try {
      const connection = await CommonService.databaseAccessInfo();
      const createAccountInfo = `INSERT 
    INTO twitter_db.account(register_status, user_name, password, mail_address, account_authorization, subscription_on, is_delete, update_at) VALUES ('2', "${userName}", "${password}", "${mailAddress}", '2', "${timeStamp}", '0', "${timeStamp}")`;
      await connection.query(createAccountInfo);
      console.log("会員登録処理完了");
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
