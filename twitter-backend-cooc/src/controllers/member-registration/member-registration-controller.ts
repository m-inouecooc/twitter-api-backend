import express, { Application, Request, Response } from "express";
import { MemberRegistrationService } from "../../services/member-registration/member-registration-service";
import { ConstErrorMessages } from "../../consts/const-errors";
import { MemberRegistrationDto } from "../../classes/dtos/member-registration/member-registration-dto";
var log4js = require("log4js");
var logger = log4js.getLogger();

export class MemberRegistrationController {
  /**
   * 会員登録処理を行うController
   * @param req
   * @param res
   */
  public static async memberRegistrationController(
    req: Request,
    res: Response
  ) {
    try {
      logger.debug();
      const userName = req.query.userName as string; // ユーザーネーム
      const password = req.query.password as string; // パスワード
      const mailAddress = req.query.mailAddress as string; // メールアドレス

      console.log("aaaaa");
      console.log("bbbbb");
      console.log("cccc");

      console.log("パラメーターチェック");
      console.log(userName);
      console.log(password);
      console.log(mailAddress);

      // TODO
      // パスワードを暗号文から平文に戻す処理

      // パラメーターチェック
      const errorMessages = await MemberRegistrationController.parameterCheck(
        userName,
        password,
        mailAddress
      );

      if (errorMessages.length != 0) {
        return new MemberRegistrationDto(undefined, errorMessages);
      }

      // 登録処理準備
      const memberRegistration =
        await MemberRegistrationService.memberRegistrationService(mailAddress);

      res.json({ responseData: memberRegistration });

      if (memberRegistration.errorMessages?.length != 0) {
        console.log("同期処理内でエラーがあったため処理終了");
        return;
      }

      // 登録処理
      MemberRegistrationService.asyncMemberRegistrationService(
        userName,
        password,
        mailAddress
      );
    } catch (error: any) {
      console.log(error);
    }
  }

  // パラメーターチェック関数
  public static async parameterCheck(
    userName: string,
    password: string,
    mailAddress: string
  ): Promise<string[]> {
    let errorMessages: string[] = [];
    const mailAddressJudgement: string =
      "/^[a-zA-Z0-9_+-]+([a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*)+[a-zA-Z]{2,}$/";

    // ユーザー名未入力チェック
    if (!userName) {
      errorMessages.push(ConstErrorMessages.userNameNotEnterdError);
    }

    // ユーザー名文字数チェック
    if (userName.length <= 5) {
      errorMessages.push(ConstErrorMessages.userNameWordCountError);
    }

    // ユーザー名文字数チェック
    if (userName.length >= 21) {
      errorMessages.push(ConstErrorMessages.userNameWordCountError);
    }

    // passwordのパラメーターチェック

    // メールアドレス未入力チェック
    if (!mailAddress) {
      errorMessages.push(ConstErrorMessages.mailAddressNotEnterdError);
    }

    // メールアドレス入力チェック
    if (mailAddressJudgement.match(mailAddress)) {
      errorMessages.push(ConstErrorMessages.mailAddressBadValueError);
    }
    return errorMessages;
  }
}
